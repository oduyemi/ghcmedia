import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "@/utils/db";
import ServiceOccurrence from "@/models/serviceOccurence.model";
import User from "@/models/user.model";
import Notification from "@/models/notification.model";
import { getCurrentUser, requireRole } from "@/utils/auth";
import { sendReporterAssignedMail } from "@/helper/sendReporterAssignedMail";
import { authorize, validId } from "@/utils/reporting";

type Context = {
  params: Promise<{ id: string }>;
};

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET(_: Request, { params }: Context) {
  try {
    const { user, forbidden } = await authorize(["admin"]);
    if (forbidden) return forbidden;

    await dbConnect();

    const { id } = await params;
    if (!validId(id)) {
      return NextResponse.json({ error: "Invalid service occurrence ID." }, { status: 400 });
    }

    const occurrence = await ServiceOccurrence.findById(id)
      .populate("assignedReporterId", "fname lname email phone role image")
      .lean();

    if (!occurrence) {
      return NextResponse.json({ error: "Service occurrence not found." }, { status: 404 });
    }

    return NextResponse.json({
      occurrence: {
        _id: occurrence._id,
        title: occurrence.title,
        serviceType: occurrence.serviceType,
        serviceDateKey: occurrence.serviceDateKey,
        startsAt: occurrence.startsAt,
        endsAt: occurrence.endsAt,
        status: occurrence.status,
        assignedReporter: occurrence.assignedReporterId ?? null,
      },
    });
  } catch (error) {
    console.error("GET REPORTER ERROR:", error);
    return NextResponse.json({ error: "Unable to retrieve assignment." }, { status: 500 });
  }
}



export async function POST(request: NextRequest, { params }: Context) {
  try {
    const admin = await getCurrentUser();
    const forbidden = requireRole(admin, ["admin"]);
    if (forbidden) return forbidden;
    await dbConnect();
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) {
      return errorResponse("Invalid service occurrence ID.", 400);
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return errorResponse("A valid JSON request body is required.", 400);
    }

    if (
      !body ||
      typeof body !== "object" ||
      !("reporterId" in body) ||
      typeof body.reporterId !== "string" ||
      !mongoose.isValidObjectId(body.reporterId)
    ) {
      return errorResponse(
        "A valid reporterId is required.",
        400
      );
    }

    const reporterId = body.reporterId;

    const occurrence = await ServiceOccurrence.findById(id);

    if (!occurrence) {
      return errorResponse("Service occurrence not found.", 404);
    }

    if (occurrence.status === "CANCELLED") {
      return errorResponse(
        "A reporter cannot be assigned to a cancelled service.",
        409
      );
    }

    const reporter = await User.findById(reporterId).select(
      "fname lname email role"
    );

    if (!reporter) {
      return errorResponse("The selected user was not found.", 404);
    }

    if (reporter.role !== "member") {
      return errorResponse(
        "Only media team members can be assigned as service reporters.",
        400
      );
    }

    const previousReporterId =
      occurrence.assignedReporterId?.toString() ?? null;

    if (previousReporterId === reporter._id.toString()) {
      return NextResponse.json({
        message: "This member is already assigned to the service.",
        occurrenceId: occurrence._id.toString(),
        reporter: {
          _id: reporter._id.toString(),
          fname: reporter.fname,
          lname: reporter.lname,
          email: reporter.email,
        },
      });
    }

    const isReassignment = previousReporterId !== null;

    // Persist the assignment first. All future submission endpoints
    // must compare the authenticated member against this field.
    occurrence.assignedReporterId = reporter._id;
    await occurrence.save();

    const serviceTitle =
      occurrence.title?.trim() ||
      occurrence.serviceType.replaceAll("_", " ");

    const serviceDate = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "full",
      timeZone: "Africa/Lagos",
    }).format(new Date(occurrence.startsAt));

    const occurrenceId = occurrence._id.toString();
    const eventKey = [
      isReassignment ? "REPORTER_REASSIGNED" : "REPORTER_ASSIGNED",
      occurrenceId,
      reporter._id.toString(),
      new Date().toISOString(),
    ].join(":");

    // Notification failures must not undo an already-saved assignment.
    const notificationPromise = Notification.create({
      recipient: reporter._id,
      actor: admin!._id,
      type: isReassignment
        ? "REPORTER_REASSIGNED"
        : "REPORTER_ASSIGNED",
      title: isReassignment
        ? "Service reporter assignment updated"
        : "New service reporting assignment",
      message: isReassignment
        ? `You have been assigned to report on ${serviceTitle}, replacing the previous assignment.`
        : `You have been assigned to report on ${serviceTitle}.`,
      resourceType: "SERVICE_REPORT",
      resourceId: occurrence._id,
      href: `/portal/assignments/${occurrenceId}`,
      eventKey,
    });

    const emailPromise = sendReporterAssignedMail({
      recipient: reporter.email,
      fname: reporter.fname,
      serviceTitle,
      serviceDate,
      serviceUrl: `/portal/assignments/${occurrenceId}`,
      assignedByName:
        `${admin!.fname ?? ""} ${admin!.lname ?? ""}`.trim() ||
        "Portal administrator",
    });

    const [notificationResult, emailResult] =
      await Promise.allSettled([
        notificationPromise,
        emailPromise,
      ]);

    if (notificationResult.status === "rejected") {
      console.error(
        "REPORTER ASSIGNMENT NOTIFICATION ERROR:",
        notificationResult.reason
      );
    }

    if (emailResult.status === "rejected") {
      console.error(
        "REPORTER ASSIGNMENT EMAIL ERROR:",
        emailResult.reason
      );
    }

    return NextResponse.json(
      {
        message: isReassignment
          ? "Reporter reassigned successfully."
          : "Reporter assigned successfully.",
        occurrenceId,
        reporter: {
          _id: reporter._id.toString(),
          fname: reporter.fname,
          lname: reporter.lname,
          email: reporter.email,
        },
        previousReporterId,
        notificationCreated:
          notificationResult.status === "fulfilled",
        emailSent: emailResult.status === "fulfilled",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("ASSIGN REPORTER ERROR:", error);

    return errorResponse("Unable to assign the service reporter.", 500);
  }
}
