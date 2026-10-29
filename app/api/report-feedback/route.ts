import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "@/utils/db";
import { getCurrentUser, requireRole } from "@/utils/auth";
import ReportFeedback from "@/models/reportFeedback.model";
import ServiceReport from "@/models/serviceReport.model";
import Notification from "@/models/notification.model";
import User from "@/models/user.model";

export const runtime = "nodejs";

const ALLOWED_ROLES = ["pastor", "other"] as const;
const OBJECT_ID_REGEX = /^[a-f\d]{24}$/i;

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Authentication required." },
        { status: 401 }
      );
    }

    // 2. Only pastor and other roles may submit visitor feedback.
    const forbidden = requireRole(user, [...ALLOWED_ROLES]);

    if (forbidden) {
      return forbidden;
    }

    // 3. Parse and validate the request body.
    let body: { reportId?: unknown; message?: unknown };

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    const reportId =
      typeof body.reportId === "string" ? body.reportId.trim() : "";

    const message =
      typeof body.message === "string" ? body.message.trim() : "";

    if (!OBJECT_ID_REGEX.test(reportId)) {
      return NextResponse.json(
        { success: false, message: "A valid report ID is required." },
        { status: 400 }
      );
    }

    if (message.length < 3 || message.length > 3000) {
      return NextResponse.json(
        {
          success: false,
          message: "Feedback must contain between 3 and 3000 characters.",
        },
        { status: 400 }
      );
    }

    // 4. Only accept feedback for published public reports.
    const report = await ServiceReport.findOne({
      _id: new mongoose.Types.ObjectId(reportId),
      status: "PUBLISHED",
      visibility: "PUBLIC",
    })
      .select("_id title")
      .lean();

    if (!report) {
      return NextResponse.json(
        {
          success: false,
          message: "The requested public report was not found.",
        },
        { status: 404 }
      );
    }

    // 5. Save feedback before attempting notifications.
    const feedback = await ReportFeedback.create({
      reportId: report._id,
      authorId: user._id,
      message,
      status: "VISIBLE",
    });

    // 6. Notify administrators independently.
    // Notification failures must not invalidate the saved feedback.
    try {
      const admins = await User.find({ role: "admin" })
        .select("_id")
        .lean();

      if (admins.length > 0) {
        const notificationResults = await Promise.allSettled(
          admins.map((admin) => {
            const eventKey = `report-feedback:${feedback._id}`;

            return Notification.updateOne(
              {
                recipient: admin._id,
                eventKey,
              },
              {
                $setOnInsert: {
                  recipient: admin._id,
                  actor: user._id,
                  type: "REPORT_FEEDBACK_SUBMITTED",
                  title: "New report feedback",
                  message: `A visitor submitted feedback on "${report.title}".`,
                  resourceType: "REPORT_FEEDBACK",
                  resourceId: feedback._id,
                  href: `/admin/ratings/${report._id}`,
                  eventKey,
                  read: false,
                  readAt: null,
                },
              },
              { upsert: true }
            );
          })
        );

        const failedNotifications = notificationResults.filter(
          (result) => result.status === "rejected"
        );

        if (failedNotifications.length > 0) {
          console.error(
            `${failedNotifications.length} feedback notification(s) could not be saved.`
          );
        }
      }
    } catch (notificationError) {
      console.error(
        "Feedback was saved, but administrator notifications could not be processed:",
        notificationError
      );
    }

    // 7. Return success because the feedback itself was saved.
    return NextResponse.json(
      {
        success: true,
        message: "Your feedback has been submitted successfully.",
        data: {
          id: feedback._id,
          reportId: feedback.reportId,
          message: feedback.message,
          status: feedback.status,
          createdAt: feedback.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Report feedback submission failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit feedback at this time.",
      },
      { status: 500 }
    );
  }
}
