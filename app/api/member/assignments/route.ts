
import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import ServiceOccurrence from "@/models/serviceOccurence.model";
import { authorize } from "@/utils/reporting";


export async function GET() {
  try {
    const { user, forbidden } = await authorize(["member"]);
    if (forbidden) return forbidden;

    await dbConnect();

    const assignments = await ServiceOccurrence.find({
      assignedReporterId: user!._id,
      status: { $ne: "CANCELLED" },
    })
      .sort({ startsAt: -1 })
      .select(
        "title serviceType serviceDateKey startsAt endsAt status specialProgrammeId assignedReporterId"
      )
      .lean();

    return NextResponse.json({ assignments });
  } catch (error) {
    console.error("GET MEMBER ASSIGNMENTS ERROR:", error);
    return NextResponse.json({ error: "Unable to load assignments." }, { status: 500 });
  }
}
