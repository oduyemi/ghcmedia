import { NextResponse } from "next/server";
import {dbConnect} from "@/utils/db";
import ServiceReport from "@/models/serviceReport.model";
import Assessment from "@/models/assessment.model";
import { authorize } from "@/utils/reporting";

export async function GET() {
  try {
    const { user, forbidden } = await authorize([
      "admin",
      "member",
      "pastor",
      "other",
    ]);

    if (forbidden) return forbidden;

    await dbConnect();

    // Pastors and authorized visitors see published public content only.
    if (user!.role === "pastor" || user!.role === "other") {
      const reports = await ServiceReport.find({
        status: "PUBLISHED",
        visibility: "PUBLIC",
      })
        .select(
          "title reportType serviceType date approvedPublicSummary highlights summary publishedAt"
        )
        .sort({ publishedAt: -1 })
        .lean();

      return NextResponse.json({ reports });
    }

    // Admins and members can see approved assessments.
    // Raw private notes should remain behind more restrictive detail endpoints.
    const assessments = await Assessment.find({
      status: "APPROVED",
    })
      .select(
        "kind subjectUserId assessorUserId serviceOccurrenceId cameraPosition totalScore maximumScore percentage ratingBand submittedAt reviewedAt"
      )
      .sort({ reviewedAt: -1 })
      .lean();

    const reports = await ServiceReport.find({
      status: { $in: ["APPROVED", "PUBLISHED"] },
    })
      .select(
        "title reportType serviceType date status visibility summary approvedPublicSummary highlights publishedAt"
      )
      .sort({ date: -1 })
      .lean();

    return NextResponse.json({ assessments, reports });
  } catch (error) {
    console.error("GET RATINGS ERROR:", error);
    return NextResponse.json({ error: "Unable to load ratings." }, { status: 500 });
  }
}
