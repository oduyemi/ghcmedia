import { NextRequest, NextResponse } from "next/server";
import {dbConnect} from "@/utils/db";
import ReportFeedback from "@/models/reportFeedback.model";
import ServiceReport from "@/models/serviceReport.model";
import { getCurrentUser, requireRole } from "@/utils/auth";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  req: NextRequest,
  context: RouteContext,
) {
  try {
    await dbConnect();

    // 1. Authenticate the requester.
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 },
      );
    }

    // 2. Only authorized portal roles may access report feedback.
    const forbidden = requireRole(user, [
      "admin",
      "pastor",
      "other",
    ]);

    if (forbidden) {
      return forbidden;
    }

    // 3. Validate the report ID.
    const { id } = await context.params;

    if (!/^[a-f\d]{24}$/i.test(id)) {
      return NextResponse.json(
        { error: "Invalid report ID." },
        { status: 400 },
      );
    }

    // 4. Visitors may only access feedback on public,
    // published reports. Admins can moderate private reports too.
    const reportFilter =
      user.role === "admin"
        ? { _id: id }
        : {
            _id: id,
            status: "PUBLISHED",
            visibility: "PUBLIC",
          };

    const report = await ServiceReport.findOne(reportFilter)
      .select("_id")
      .lean();

    if (!report) {
      return NextResponse.json(
        { error: "Report not found or unavailable." },
        { status: 404 },
      );
    }

    // 5. Hidden feedback is only visible to admins.
    const feedbackFilter =
      user.role === "admin"
        ? { reportId: report._id }
        : {
            reportId: report._id,
            status: "VISIBLE",
          };

    const { searchParams } = new URL(req.url);
    const requestedLimit = Number(
      searchParams.get("limit") ?? "20",
    );
    const limit = Number.isFinite(requestedLimit)
      ? Math.min(100, Math.max(1, Math.floor(requestedLimit)))
      : 20;

    const feedback = await ReportFeedback.find(feedbackFilter)
      .sort({ createdAt: -1, _id: -1 })
      .limit(limit)
      .populate("authorId", "fname lname")
      .lean();

    return NextResponse.json({
      feedback: feedback.map((entry) => {
        const author = entry.authorId as unknown as {
          _id: { toString(): string };
          fname?: string;
          lname?: string;
        } | null;

        return {
          id: entry._id.toString(),
          reportId: entry.reportId.toString(),
          author: author
            ? {
                id: author._id.toString(),
                name: [author.fname, author.lname]
                  .filter(Boolean)
                  .join(" "),
              }
            : null,
          message: entry.message,
          status: entry.status,
          createdAt: entry.createdAt,
          updatedAt: entry.updatedAt,
        };
      }),
    });
  } catch (error) {
    console.error("GET /api/ratings/[id]/feedback error:", error);

    return NextResponse.json(
      { error: "Unable to retrieve report feedback." },
      { status: 500 },
    );
  }
}
