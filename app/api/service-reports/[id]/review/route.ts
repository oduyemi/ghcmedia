import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {dbConnect} from "@/utils/db";
import ServiceReport from "@/models/serviceReport.model";
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
      return NextResponse.json({ error: "Invalid report ID." }, { status: 400 });
    }

    const body = await request.json().catch(() => null);
    const decision = body?.decision;

    if (!["APPROVED", "REJECTED", "PUBLISHED"].includes(decision)) {
      return NextResponse.json({ error: "decision must be APPROVED, REJECTED, or PUBLISHED." }, { status: 400 });
    }

    const report = await ServiceReport.findById(id);

    if (!report) {
      return NextResponse.json({ error: "Report not found." }, { status: 404 });
    }

    const now = new Date();

    if (decision === "REJECTED") {
      report.status = "PENDING_REVIEW";
      report.visibility = "PRIVATE";
      report.approvedPublicSummary = "";
    } else {
      report.approvedBy = user!._id;
      report.approvedAt = now;

      if (decision === "APPROVED") {
        report.status = "APPROVED";
        report.visibility = "PRIVATE";
      } else {
        if (report.status !== "APPROVED" && report.status !== "PUBLISHED") {
          return NextResponse.json({
            error: "Approve the report before publishing it.",
          }, { status: 409 });
        }

        if (
          typeof body.approvedPublicSummary !== "string" ||
          !body.approvedPublicSummary.trim()
        ) {
          return NextResponse.json({
            error: "An approved public summary is required before publication.",
          }, { status: 400 });
        }

        report.approvedPublicSummary = body.approvedPublicSummary.trim().slice(0, 10000);
        report.status = "PUBLISHED";
        report.visibility = "PUBLIC";
        report.publishedAt = now;

        if (Array.isArray(body.highlights)) {
          report.highlights = body.highlights.map((item: any, index: number) => ({
            highlightId: typeof item.highlightId === "string"
              ? item.highlightId
              : `public-${index + 1}`,
            title: String(item.title ?? "").slice(0, 200),
            description: String(item.description ?? "").slice(0, 3000),
            category: String(item.category ?? "").slice(0, 100),
          }));
        }
      }
    }

    await report.save();

    const recipient = report.createdBy;
    const notificationType =
      decision === "REJECTED"
        ? "REPORT_REJECTED"
        : decision === "PUBLISHED"
          ? "REPORT_PUBLISHED"
          : "REPORT_APPROVED";

    await Notification.create({
      recipient,
      actor: user!._id,
      type: notificationType,
      title:
        decision === "REJECTED"
          ? "Report returned for revision"
          : decision === "PUBLISHED"
            ? "Report published"
            : "Report approved",
      message:
        decision === "REJECTED"
          ? (typeof body.feedback === "string" && body.feedback.trim())
            ? body.feedback.trim().slice(0, 2000)
            : "Your report needs revision."
          : decision === "PUBLISHED"
            ? `Your report "${report.title}" has been published.`
            : `Your report "${report.title}" has been approved for internal use.`,
      resourceType: "SERVICE_REPORT",
      resourceId: report._id,
      href: `/portal/service-reports/${report._id}`,
      eventKey: `REPORT_${decision}:${report._id}:${now.toISOString()}`,
    });

    return NextResponse.json({
      message: `Report ${decision.toLowerCase()}.`,
      report,
    });
  } catch (error) {
    console.error("REVIEW SERVICE REPORT ERROR:", error);
    return NextResponse.json({ error: "Unable to review service report." }, { status: 500 });
  }
}
