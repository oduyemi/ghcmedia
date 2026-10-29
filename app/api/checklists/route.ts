import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "@/utils/db";
import ServiceOccurrence from "@/models/serviceOccurence.model";
import ChecklistTemplate, { type IChecklistTemplateItem } from "@/models/checklistTemplate.model";
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
      typeof body.templateId !== "string" ||
      !Array.isArray(body.items)
    ) {
      return NextResponse.json({ error: "Invalid checklist submission." }, { status: 400 });
    }

    const occurrence = await ServiceOccurrence.findOne({
      _id: body.serviceOccurrenceId,
      assignedReporterId: user!._id,
      status: { $ne: "CANCELLED" },
    });

    if (!occurrence) {
      return NextResponse.json({ error: "You are not assigned to this service." }, { status: 403 });
    }

    if (!mongoose.isValidObjectId(body.templateId)) {
      return NextResponse.json({ error: "Invalid checklist template." }, { status: 400 });
    }

    const template = await ChecklistTemplate.findOne({
      _id: body.templateId,
      status: "ACTIVE",
      serviceTypes: occurrence.serviceType,
    });

    if (!template) {
      return NextResponse.json({ error: "Active checklist template not found for this service." }, { status: 404 });
    }

    const templateItems: IChecklistTemplateItem[] = template.items;

const allowedItems = new Map<string, IChecklistTemplateItem>(
  templateItems.map(
    (item): [string, IChecklistTemplateItem] => [item.itemId, item]
  )
);

const seen = new Set<string>();

const items: {
  itemId: string;
  title: string;
  requirement: string;
  required: boolean;
  status: string;
  notes: string;
}[] = [];

    for (const submitted of body.items) {
      if (
        !submitted ||
        typeof submitted.itemId !== "string" ||
        seen.has(submitted.itemId)
      ) {
        return NextResponse.json({ error: "Checklist items must have unique item IDs." }, { status: 400 });
      }

      seen.add(submitted.itemId);

      const source = allowedItems.get(submitted.itemId);
      if (!source) {
        return NextResponse.json({ error: "A submitted item does not belong to this template." }, { status: 400 });
      }

      const statuses = ["COMPLETED", "NOT_COMPLETED", "NOT_APPLICABLE"];
      if (!statuses.includes(submitted.status)) {
        return NextResponse.json({ error: `Invalid status for checklist item ${submitted.itemId}.` }, { status: 400 });
      }

      if (source.required && submitted.status === "NOT_APPLICABLE") {
        return NextResponse.json({ error: `Required item "${source.title}" cannot be marked not applicable.` }, { status: 400 });
      }

      items.push({
        itemId: source.itemId,
        title: source.title,
        requirement: source.requirement ?? "",
        required: source.required,
        status: submitted.status,
        notes: typeof submitted.notes === "string" ? submitted.notes.slice(0, 2000) : "",
      });
    }

    const missingRequired = templateItems.filter(
      (item: IChecklistTemplateItem) =>
        item.required && !seen.has(item.itemId)
    );

    if (missingRequired.length) {
      return NextResponse.json(
        { error: "Complete all required checklist items before submitting.", missingItemIds: missingRequired.map((item) => item.itemId) },
        { status: 400 }
      );
    }

    const submission = await ChecklistSubmission.create({
      serviceOccurrenceId: occurrence._id,
      templateId: template._id,
      templateVersion: template.version,
      submittedBy: user!._id,
      items,
      submissionStatus: "PENDING_REVIEW",
      submittedAt: new Date(),
    });

    const admins = await getAdmins();
    const eventTime = submission.submittedAt!.toISOString();

    await Promise.allSettled(
      admins.map(async (admin) => {
        await Notification.create({
          recipient: admin._id,
          actor: user!._id,
          type: "CHECKLIST_SUBMITTED",
          title: "Checklist submitted for review",
          message: `${user!.fname} ${user!.lname} submitted the preproduction checklist for ${occurrence.title || occurrence.serviceType}.`,
          resourceType: "CHECKLIST",
          resourceId: submission._id,
          href: `/admin/checklists/${submission._id}`,
          eventKey: `CHECKLIST_SUBMITTED:${submission._id}:${admin._id}:${eventTime}`,
        });

        if (admin.email) {
          await sendEmailWithRetry(
            admin.email,
            "Media checklist submitted for review",
            `<p>A checklist was submitted for <strong>${occurrence.title || occurrence.serviceType}</strong>.</p><p><a href="${process.env.APP_URL || "https://ghcmedia.vercel.app"}/admin/checklists/${submission._id}">Review submission</a></p>`
          );
        }
      })
    );

    return NextResponse.json(
      { message: "Checklist submitted for review.", submission },
      { status: 201 }
    );
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === 11000) {
      return NextResponse.json({ error: "A checklist has already been submitted by you for this service." }, { status: 409 });
    }

    console.error("SUBMIT CHECKLIST ERROR:", error);
    return NextResponse.json({ error: "Unable to submit checklist." }, { status: 500 });
  }
}
