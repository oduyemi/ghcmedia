import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "@/utils/db";
import { getCurrentUser, requireRole } from "@/utils/auth";
import ReportFeedback from "@/models/reportFeedback.model";
import ServiceReport from "@/models/serviceReport.model";

type RouteContext = {
  params: Promise<{ id: string }>;
};

const ALLOWED_ROLES = ["admin", "pastor", "other"] as const;
const OBJECT_ID_REGEX = /^[a-f\d]{24}$/i;

export async function GET(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    await dbConnect();

    // 1. Authenticate the requester.
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Authentication required." },
        { status: 401 }
      );
    }

    // 2. Allow administrators and visitor roles.
    const forbidden = requireRole(user, [...ALLOWED_ROLES]);

    if (forbidden) {
      return forbidden;
    }

    // 3. Validate the report ID.
    const { id } = await params;

    if (!OBJECT_ID_REGEX.test(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid report ID." },
        { status: 400 }
      );
    }

    const reportId = new mongoose.Types.ObjectId(id);
    const isAdmin = user.role === "admin";

    // 4. Administrators may inspect any report.
    // Visitors may access only published public reports.
    const reportFilter = isAdmin
      ? { _id: reportId }
      : {
          _id: reportId,
          status: "PUBLISHED" as const,
          visibility: "PUBLIC" as const,
        };

    const report = await ServiceReport.findOne(reportFilter)
      .select("_id title status visibility date reportType")
      .lean();

    if (!report) {
      return NextResponse.json(
        { success: false, message: "Report not found." },
        { status: 404 }
      );
    }

    // 5. Parse pagination parameters.
    const searchParams = req.nextUrl.searchParams;

    const requestedLimit = Number(searchParams.get("limit") ?? 20);
    const limit =
      Number.isFinite(requestedLimit) && requestedLimit > 0
        ? Math.min(Math.floor(requestedLimit), 100)
        : 20;

    const requestedPage = Number(searchParams.get("page") ?? 1);
    const page =
      Number.isFinite(requestedPage) && requestedPage > 0
        ? Math.floor(requestedPage)
        : 1;

    const skip = (page - 1) * limit;

    // 6. Visitors see visible feedback only.
    // Administrators can inspect visible and hidden feedback.
    const feedbackFilter = isAdmin
      ? { reportId }
      : { reportId, status: "VISIBLE" as const };

    const [feedback, total] = await Promise.all([
      ReportFeedback.find(feedbackFilter)
        .populate({
          path: "authorId",
          select: "fname lname",
        })
        .sort({ createdAt: -1, _id: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      ReportFeedback.countDocuments(feedbackFilter),
    ]);

    const totalPages = Math.ceil(total / limit);

    // 7. Return feedback and pagination metadata.
    return NextResponse.json(
      {
        success: true,
        data: {
          report: {
            id: report._id,
            title: report.title,
            status: report.status,
            visibility: report.visibility,
            date: report.date,
            reportType: report.reportType,
          },
          feedback: feedback.map((item) => {
            const author =
              item.authorId &&
              typeof item.authorId === "object" &&
              "fname" in item.authorId
                ? item.authorId
                : null;

            return {
              id: item._id,
              message: item.message,
              status: item.status,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              author: author
                ? {
                    firstName: author.fname,
                    lastName: author.lname,
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
    console.error("Failed to retrieve report feedback:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to retrieve report feedback.",
      },
      { status: 500 }
    );
  }
}
