import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import ServiceReport from "@/models/serviceReport.model";
import Assessment from "@/models/assessment.model";
import { authorize } from "@/utils/reporting";


function average(values: Array<number | null | undefined>): number | null {
  const validValues = values.filter(
    (value): value is number =>
      typeof value === "number" &&
      Number.isFinite(value) &&
      value >= 0 &&
      value <= 100
  );

  if (validValues.length === 0) return null;

  return (
    validValues.reduce((sum, value) => sum + value, 0) /
    validValues.length
  );
}

export async function GET() {
  try {
    const { user, forbidden } = await authorize([
      "admin",
      "member",
      "pastor",
      "other",
    ]);

    if (forbidden) return forbidden;
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    await dbConnect();

    // Pastors and other authorized visitors receive published public reports
    // only. Do not expose private assessment or review metrics to these roles.
    if (user.role === "pastor" || user.role === "other") {
      const reports = await ServiceReport.find({
        status: "PUBLISHED",
        visibility: "PUBLIC",
      })
        .select(
          "title reportType serviceType serviceOccurrenceId date status visibility summary approvedPublicSummary highlights publishedAt"
        )
        .sort({ publishedAt: -1 })
        .lean();

      const metrics = {
        approvedAverageRating: average(
          reports.map((report) => report.summary?.approvedAverageRating)
        ),
        servicesAssessed: new Set(
          reports
            .map((report) => report.serviceOccurrenceId?.toString())
            .filter((id): id is string => Boolean(id))
        ).size,
        checklistCompletion: average(
          reports.map(
            (report) => report.summary?.checklistCompletionPercentage
          )
        ),
        areasForImprovement: null as number | null,
        outstandingReviews: null as number | null,
        assessmentsCount: null as number | null,
      };

      return NextResponse.json({ reports, metrics });
    }

    // Admins and members can see approved assessment results.
    // Private assessment notes remain behind more restrictive endpoints.
    const [
      approvedAssessments,
      outstandingReviews,
      reports,
    ] = await Promise.all([
      Assessment.find({ status: "APPROVED" })
        .select(
          "percentage serviceOccurrenceId areasForImprovement"
        )
        .lean(),

      Assessment.countDocuments({
        status: { $in: ["SUBMITTED", "PENDING_REVIEW"] },
      }),

      ServiceReport.find({
        status: { $in: ["APPROVED", "PUBLISHED"] },
      })
        .select(
          "title reportType serviceType serviceOccurrenceId date status visibility summary approvedPublicSummary highlights publishedAt"
        )
        .sort({ date: -1 })
        .lean(),
    ]);

    const metrics = {
      approvedAverageRating: average(
        approvedAssessments.map((assessment) => assessment.percentage)
      ),

      servicesAssessed: new Set(
        approvedAssessments
          .map((assessment) => assessment.serviceOccurrenceId?.toString())
          .filter((id): id is string => Boolean(id))
      ).size,

      checklistCompletion: average(
        reports.map(
          (report) => report.summary?.checklistCompletionPercentage
        )
      ),

      areasForImprovement: approvedAssessments.filter(
        (assessment) =>
          typeof assessment.areasForImprovement === "string" &&
          assessment.areasForImprovement.trim().length > 0
      ).length,

      outstandingReviews,

      assessmentsCount: approvedAssessments.length,
    };

    return NextResponse.json({
      reports,
      assessments: approvedAssessments,
      metrics,
    });
  } catch (error) {
    console.error("GET RATINGS ERROR:", error);

    return NextResponse.json(
      { error: "Unable to load ratings." },
      { status: 500 }
    );
  }
}
