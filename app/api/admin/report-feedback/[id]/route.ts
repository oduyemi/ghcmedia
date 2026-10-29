import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "@/utils/db";
import { getCurrentUser, requireRole } from "@/utils/auth";
import ReportFeedback from "@/models/reportFeedback.model";
import Notification from "@/models/notification.model";



type RouteContext = {
  params: Promise<{ id: string }>;
};

const OBJECT_ID_REGEX = /^[a-f\d]{24}$/i;


export async function PATCH(
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

    // 2. Only administrators may moderate feedback.
    const forbidden = requireRole(user, ["admin"]);

    if (forbidden) {
      return forbidden;
    }

    // 3. Validate the feedback ID.
    const { id } = await params;

    if (!OBJECT_ID_REGEX.test(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid feedback ID." },
        { status: 400 }
      );
    }

    // 4. Parse and validate the requested status.
    let body: { status?: unknown };

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    if (body.status !== "VISIBLE" && body.status !== "HIDDEN") {
      return NextResponse.json(
        {
          success: false,
          message: 'Status must be either "VISIBLE" or "HIDDEN".',
        },
        { status: 400 }
      );
    }

    const requestedStatus = body.status;
    const feedbackId = new mongoose.Types.ObjectId(id);

    // 5. Read the existing record so we can detect a real transition.
    const existingFeedback = await ReportFeedback.findById(feedbackId);

    if (!existingFeedback) {
      return NextResponse.json(
        { success: false, message: "Feedback not found." },
        { status: 404 }
      );
    }

    const previousStatus = existingFeedback.status;

    // 6. Update only when the status actually changes.
    if (previousStatus !== requestedStatus) {
      existingFeedback.status = requestedStatus;
      await existingFeedback.save();
    }

    // 7. Notify the author only when feedback is newly hidden.
    if (
      previousStatus === "VISIBLE" &&
      requestedStatus === "HIDDEN"
    ) {
      try {
        const eventKey = `report-feedback-hidden:${existingFeedback._id}`;

        await Notification.updateOne(
          {
            recipient: existingFeedback.authorId,
            eventKey,
          },
          {
            $setOnInsert: {
              recipient: existingFeedback.authorId,
              actor: user._id,
              type: "REPORT_FEEDBACK_HIDDEN",
              title: "Your report feedback was hidden",
              message:
                "An administrator has hidden your feedback from public view.",
              resourceType: "REPORT_FEEDBACK",
              resourceId: existingFeedback._id,
              href: "/ratings",
              eventKey,
              read: false,
              readAt: null,
            },
          },
          { upsert: true }
        );
      } catch (notificationError) {
        // Moderation succeeded even if notification delivery fails.
        console.error(
          "Feedback visibility was updated, but the author notification failed:",
          notificationError
        );
      }
    }

    return NextResponse.json(
      {
        success: true,
        message:
          requestedStatus === "HIDDEN"
            ? "Feedback hidden successfully."
            : "Feedback restored successfully.",
        data: {
          id: existingFeedback._id,
          status: existingFeedback.status,
          updatedAt: existingFeedback.updatedAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to moderate report feedback:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update feedback visibility.",
      },
      { status: 500 }
    );
  }
}
