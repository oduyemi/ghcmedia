import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {dbConnect} from "@/utils/db";
import ServiceOccurrence from "@/models/serviceOccurence.model";
import ServiceReport from "@/models/serviceReport.model";
import Assessment from "@/models/assessment.model";
import ChecklistSubmission from "@/models/checklistSubmission.model";
import Notification from "@/models/notification.model";
import { authorize, getAdmins } from "@/utils/reporting";
import { sendEmailWithRetry } from "@/helper/emailLogic";



export async function POST(request: Request) {
  try {
    const { user, forbidden } = await authorize(["member"]);
    if (forbidden) return forbidden;

    await dbConnect();

    const body = await request.json().catch(() => null);

    if (
      !body ||
      typeof body.serviceOccurrenceId !== "string" ||
      !mongoose.isValidObjectId(body.serviceOccurrenceId) ||
      typeof body.title !== "string" ||
      !body.title.trim()
    ) {
      return NextResponse.json({ error: "A service occurrence and report title are required." }, { status: 400 });
    }

    const occurrence = await ServiceOccurrence.findOne({
      _id: body.serviceOccurrenceId,
      assignedReporterId: user!._id,
      status: { $ne: "CANCELLED" },
    });

    if (!occurrence) {
      return NextResponse.json({ error: "You are not assigned to this service." }, { status: 403 });
    }

    const assessmentIds = Array.isArray(body.sourceAssessmentIds)
      ? body.sourceAssessmentIds
      : [];
    const checklistIds = Array.isArray(body.sourceChecklistSubmissionIds)
      ? body.sourceChecklistSubmissionIds
      : [];

    if (
      !assessmentIds.every((id: unknown) => typeof id === "string" && mongoose.isValidObjectId(id)) ||
      !checklistIds.every((id: unknown) => typeof id === "string" && mongoose.isValidObjectId(id))
    ) {
      return NextResponse.json({ error: "Invalid source record IDs." }, { status: 400 });
    }

    const [assessments, checklists] = await Promise.all([
      Assessment.find({
        _id: { $in: assessmentIds },
        serviceOccurrenceId: occurrence._id,
        assessorUserId: user!._id,
        status: "APPROVED",
      }).select("_id"),
      ChecklistSubmission.find({
        _id: { $in: checklistIds },
        serviceOccurrenceId: occurrence._id,
        submittedBy: user!._id,
        submissionStatus: "APPROVED",
      }).select("_id"),
    ]);

    if (assessments.length !== new Set(assessmentIds).size ||
        checklists.length !== new Set(checklistIds).size) {
      return NextResponse.json({
        error: "Source records must be approved records belonging to this service and submitted by you.",
      }, { status: 400 });
    }

    const report = await ServiceReport.create({
      title: body.title.trim().slice(0, 200),
      reportType: "SERVICE",
      serviceType: occurrence.serviceType,
      serviceOccurrenceId: occurrence._id,
      date: occurrence.startsAt,
      status: "PENDING_REVIEW",
      visibility: "PRIVATE",
      summary: {
        completedAssessments: assessments.length,
        pendingAssessments: 0,
        checklistCompletionPercentage: null,
        approvedAverageRating: null,
      },
      highlights: [],
      approvedPublicSummary: "",
      sourceAssessmentIds: assessments.map((item) => item._id),
      sourceChecklistSubmissionIds: checklists.map((item) => item._id),
      createdBy: user!._id,
    });

    const admins = await getAdmins();
    const eventTime = new Date().toISOString();

    await Promise.allSettled(admins.map(async (admin) => {
      await Notification.create({
        recipient: admin._id,
        actor: user!._id,
        type: "REPORT_SUBMITTED",
        title: "Service report submitted",
        message: `${user!.fname} ${user!.lname} submitted "${report.title}" for review.`,
        resourceType: "SERVICE_REPORT",
        resourceId: report._id,
        href: `/admin/service-reports/${report._id}`,
        eventKey: `REPORT_SUBMITTED:${report._id}:${admin._id}:${eventTime}`,
      });

      if (admin.email) {
        await sendEmailWithRetry(
          admin.email,
          "Service report submitted for review",
          `<p>The service report <strong>${report.title}</strong> is awaiting review.</p><p><a href="${process.env.APP_URL || "https://ghcmedia.vercel.app"}/admin/service-reports/${report._id}">Review report</a></p>`
        );
      }
    }));

    return NextResponse.json({ message: "Report submitted for review.", report }, { status: 201 });
  } catch (error) {
    console.error("SUBMIT SERVICE REPORT ERROR:", error);
    return NextResponse.json({ error: "Unable to submit service report." }, { status: 500 });
  }
}
