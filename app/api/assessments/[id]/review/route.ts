import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {dbConnect} from "@/utils/db";
import Assessment from "@/models/assessment.model";
import Notification from "@/models/notification.model";
import { authorize } from "@/utils/reporting";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Context) {
  try {
    const { user, forbidden } = await authorize(["admin"]);
    if (forbidden) return forbidden;

    await dbConnect();

    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid assessment ID." }, { status: 400 });
    }

    const body = await request.json().catch(() => null);

    if (!body || !["APPROVED", "REJECTED"].includes(body.decision)) {
      return NextResponse.json({ error: "decision must be APPROVED or REJECTED." }, { status: 400 });
    }

    const assessment = await Assessment.findById(id);

    if (!assessment) {
      return NextResponse.json({ error: "Assessment not found." }, { status: 404 });
    }

    if (["APPROVED", "REJECTED"].includes(assessment.status)) {
      return NextResponse.json({ error: "This assessment has already been reviewed." }, { status: 409 });
    }

    assessment.status = body.decision;
    assessment.reviewedAt = new Date();
    assessment.reviewedBy = user!._id;
    assessment.reviewSummary = typeof body.reviewSummary === "string"
      ? body.reviewSummary.slice(0, 5000)
      : "";

    await assessment.save();

    await Notification.create({
      recipient: assessment.assessorUserId,
      actor: user!._id,
      type: body.decision === "APPROVED" ? "ASSESSMENT_APPROVED" : "ASSESSMENT_REJECTED",
      title: body.decision === "APPROVED" ? "Assessment approved" : "Assessment rejected",
      message: body.decision === "APPROVED"
        ? "Your submitted assessment has been approved."
        : "Your submitted assessment was rejected. Review the administrator's feedback.",
      resourceType: "ASSESSMENT",
      resourceId: assessment._id,
      href: `/portal/assessments/${assessment._id}`,
      eventKey: `ASSESSMENT_${body.decision}:${assessment._id}:${assessment.reviewedAt.toISOString()}`,
    });

    return NextResponse.json({
      message: `Assessment ${body.decision.toLowerCase()}.`,
      assessment,
    });
  } catch (error) {
    console.error("REVIEW ASSESSMENT ERROR:", error);
    return NextResponse.json({ error: "Unable to review assessment." }, { status: 500 });
  }
}
