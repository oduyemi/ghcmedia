
import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import ServiceOccurrence from "@/models/serviceOccurence.model";
import ChecklistTemplate from "@/models/checklistTemplate.model";
import AssessmentTemplate from "@/models/assessmentTemplate.model";
import ChecklistSubmission from "@/models/checklistSubmission.model";
import { authorize, validId } from "@/utils/reporting";

type Context = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Context) {
  try {
    const { user, forbidden } = await authorize(["member"]);
    if (forbidden) return forbidden;

    await dbConnect();

    const { id } = await params;
    if (!validId(id)) {
      return NextResponse.json({ error: "Invalid service occurrence ID." }, { status: 400 });
    }

    const occurrence = await ServiceOccurrence.findOne({
      _id: id,
      assignedReporterId: user!._id,
      status: { $ne: "CANCELLED" },
    }).lean();

    if (!occurrence) {
      return NextResponse.json(
        { error: "Service not found or you are not its assigned reporter." },
        { status: 404 }
      );
    }

    const checklistTemplates = await ChecklistTemplate.find({
      status: "ACTIVE",
      serviceTypes: occurrence.serviceType,
    })
      .sort({ name: 1, version: -1 })
      .lean();

    const assessmentTemplates = await AssessmentTemplate.find({
      status: "ACTIVE",
    })
      .sort({ kind: 1, name: 1, version: -1 })
      .lean();

    const existingChecklist = await ChecklistSubmission.findOne({
      serviceOccurrenceId: occurrence._id,
      submittedBy: user!._id,
    })
      .select("_id submissionStatus submittedAt")
      .lean();

    return NextResponse.json({
      occurrence,
      checklistTemplates,
      assessmentTemplates,
      existingChecklist,
    });
  } catch (error) {
    console.error("GET ASSIGNMENT DETAILS ERROR:", error);
    return NextResponse.json({ error: "Unable to load assignment details." }, { status: 500 });
  }
}
