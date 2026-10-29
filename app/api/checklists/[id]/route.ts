
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "@/utils/db";
import ChecklistSubmission from "@/models/checklistSubmission.model";
import ServiceOccurrence from "@/models/serviceOccurence.model";
import { authorize } from "@/utils/reporting";

type Context = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Context) {
  try {
    const { user, forbidden } = await authorize(["admin", "member"]);
    if (forbidden) return forbidden;

    await dbConnect();

    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid checklist ID." }, { status: 400 });
    }

    const submission = await ChecklistSubmission.findById(id).lean();

    if (!submission) {
      return NextResponse.json({ error: "Checklist not found." }, { status: 404 });
    }

    if (user!.role !== "admin") {
      const occurrence = await ServiceOccurrence.findOne({
        _id: submission.serviceOccurrenceId,
        assignedReporterId: user!._id,
      }).select("_id");

      if (
        !occurrence ||
        submission.submittedBy.toString() !== user!._id.toString()
      ) {
        return NextResponse.json({ error: "You are not authorized to view this checklist." }, { status: 403 });
      }
    }

    return NextResponse.json({ submission });
  } catch (error) {
    console.error("GET CHECKLIST ERROR:", error);
    return NextResponse.json({ error: "Unable to retrieve checklist." }, { status: 500 });
  }
}
