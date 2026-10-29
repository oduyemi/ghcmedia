import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {dbConnect} from "@/utils/db";
import ChecklistSubmission from "@/models/checklistSubmission.model";
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
      return NextResponse.json({ error: "Invalid checklist ID." }, { status: 400 });
    }

    const body = await request.json().catch(() => null);

    if (!body || !["APPROVED", "REJECTED"].includes(body.decision)) {
      return NextResponse.json({ error: "decision must be APPROVED or REJECTED." }, { status: 400 });
    }

    const submission = await ChecklistSubmission.findById(id);

    if (!submission) {
      return NextResponse.json({ error: "Checklist not found." }, { status: 404 });
    }

    if (submission.submissionStatus === "APPROVED") {
      return NextResponse.json({ error: "This checklist has already been approved." }, { status: 409 });
    }

    if (body.decision === "APPROVED") {
      submission.submissionStatus = "APPROVED";
      submission.reviewedAt = new Date();
      submission.reviewedBy = user!._id;
      submission.observations = typeof body.observations === "string"
        ? body.observations.slice(0, 5000)
        : "";
    } else {
      // Requires the REJECTED model enum change described above.
      submission.submissionStatus = "REJECTED" as typeof submission.submissionStatus;
      submission.reviewedAt = new Date();
      submission.reviewedBy = user!._id;
      submission.observations = typeof body.observations === "string"
        ? body.observations.slice(0, 5000)
        : "Please revise and resubmit.";
    }

    await submission.save();

    await Notification.create({
      recipient: submission.submittedBy,
      actor: user!._id,
      type: body.decision === "APPROVED" ? "CHECKLIST_APPROVED" : "CHECKLIST_REJECTED",
      title: body.decision === "APPROVED" ? "Checklist approved" : "Checklist needs revision",
      message: body.decision === "APPROVED"
        ? "Your preproduction checklist has been approved."
        : "Your preproduction checklist was returned for revision.",
      resourceType: "CHECKLIST",
      resourceId: submission._id,
      href: `/portal/checklists/${submission._id}`,
      eventKey: `CHECKLIST_${body.decision}:${submission._id}:${submission.reviewedAt!.toISOString()}`,
    });

    return NextResponse.json({
      message: body.decision === "APPROVED" ? "Checklist approved." : "Checklist rejected.",
      submission,
    });
  } catch (error) {
    console.error("REVIEW CHECKLIST ERROR:", error);
    return NextResponse.json({ error: "Unable to review checklist." }, { status: 500 });
  }
}
