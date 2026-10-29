import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "@/utils/db";
import Assessment from "@/models/assessment.model";
import { authorize } from "@/utils/reporting";

type Context = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Context) {
  try {
    const { user, forbidden } = await authorize(["admin", "member"]);
    if (forbidden) return forbidden;

    await dbConnect();

    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid assessment ID." }, { status: 400 });
    }

    const assessment = await Assessment.findById(id).lean();

    if (!assessment) {
      return NextResponse.json({ error: "Assessment not found." }, { status: 404 });
    }

    const isAdmin = user!.role === "admin";
    const isParticipant =
      assessment.assessorUserId.toString() === user!._id.toString() ||
      assessment.subjectUserId.toString() === user!._id.toString();

    if (!isAdmin && !isParticipant) {
      return NextResponse.json({ error: "You are not authorized to view this assessment." }, { status: 403 });
    }

    return NextResponse.json({ assessment });
  } catch (error) {
    console.error("GET ASSESSMENT ERROR:", error);
    return NextResponse.json({ error: "Unable to retrieve assessment." }, { status: 500 });
  }
}
