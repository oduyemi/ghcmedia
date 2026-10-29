import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import { getCurrentUser, requireRole } from "@/utils/auth";
import ReportFeedback from "@/models/reportFeedback.model";

export const runtime = "nodejs";

const ALLOWED_ROLES = ["admin", "member", "pastor", "other"] as const;

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Authentication required." },
        { status: 401 }
      );
    }

    // 2. Allow authenticated users with supported roles.
    const forbidden = requireRole(user, [...ALLOWED_ROLES]);

    if (forbidden) {
      return forbidden;
    }

    // 3. Parse pagination parameters.
    const searchParams = req.nextUrl.searchParams;

    const requestedPage = Number(searchParams.get("page") ?? 1);
    const requestedLimit = Number(searchParams.get("limit") ?? 20);

    const page =
      Number.isFinite(requestedPage) && requestedPage > 0
        ? Math.floor(requestedPage)
        : 1;

    const limit =
      Number.isFinite(requestedLimit) && requestedLimit > 0
        ? Math.min(Math.floor(requestedLimit), 100)
        : 20;

    const skip = (page - 1) * limit;

    // 4. Restrict results to the authenticated user's own feedback.
    const filter = { authorId: user._id };

    const [feedback, total] = await Promise.all([
      ReportFeedback.find(filter)
        .populate({
          path: "reportId",
          select: "title status visibility date reportType",
        })
        .sort({ createdAt: -1, _id: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      ReportFeedback.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit);

    // 5. Return feedback with its associated report details.
    return NextResponse.json(
      {
        success: true,
        data: {
          feedback: feedback.map((item) => {
            const report =
              item.reportId &&
              typeof item.reportId === "object" &&
              "title" in item.reportId
                ? item.reportId
                : null;

            return {
              id: item._id,
              message: item.message,
              status: item.status,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              report: report
                ? {
                    id: report._id,
                    title: report.title,
                    status: report.status,
                    visibility: report.visibility,
                    date: report.date,
                    reportType: report.reportType,
                  }
                : null,
            };
          }),
          pagination: {
            page,
            limit,
            total,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to retrieve user's report feedback:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to retrieve your report feedback.",
      },
      { status: 500 }
    );
  }
}
