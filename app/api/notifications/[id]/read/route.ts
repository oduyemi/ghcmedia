import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {dbConnect} from "@/utils/db";
import Notification from "@/models/notification.model";
import { authorize } from "@/utils/reporting";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(_: Request, { params }: Context) {
  try {
    const { user, forbidden } = await authorize([
      "admin",
      "member",
      "pastor",
      "other",
    ]);

    if (forbidden) return forbidden;

    await dbConnect();

    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid notification ID." }, { status: 400 });
    }

    const notification = await Notification.findOneAndUpdate(
      {
        _id: id,
        recipient: user!._id,
      },
      {
        $set: {
          read: true,
          readAt: new Date(),
        },
      },
      { new: true }
    ).lean();

    if (!notification) {
      return NextResponse.json(
        { error: "Notification not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Notification marked as read.",
      notification,
    });
  } catch (error) {
    console.error("MARK NOTIFICATION READ ERROR:", error);
    return NextResponse.json({ error: "Unable to update notification." }, { status: 500 });
  }
}
