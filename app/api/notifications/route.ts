import { NextResponse } from "next/server";
import {dbConnect} from "@/utils/db";
import Notification from "@/models/notification.model";
import { authorize } from "@/utils/reporting";

export async function GET(request: Request) {
  try {
    const { user, forbidden } = await authorize([
      "admin",
      "member",
      "pastor",
      "other",
    ]);

    if (forbidden) return forbidden;

    await dbConnect();

    const url = new URL(request.url);
    const limitParam = Number(url.searchParams.get("limit") ?? 20);
    const limit = Number.isInteger(limitParam)
      ? Math.max(1, Math.min(limitParam, 100))
      : 20;

    const unreadOnly = url.searchParams.get("unread") === "true";

    const filter: Record<string, unknown> = {
      recipient: user!._id,
    };

    if (unreadOnly) filter.read = false;

    const [notifications, unreadCount] = await Promise.all([
      Notification.find(filter)
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean(),

      Notification.countDocuments({
        recipient: user!._id,
        read: false,
      }),
    ]);

    return NextResponse.json({
      notifications,
      unreadCount,
    });
  } catch (error) {
    console.error("GET NOTIFICATIONS ERROR:", error);
    return NextResponse.json({ error: "Unable to load notifications." }, { status: 500 });
  }
}
