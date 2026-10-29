
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import User from "@/models/user.model";
import ServiceOccurrence from "@/models/serviceOccurence.model";
import { getCurrentUser, requireRole } from "@/utils/auth";


export async function authorize(
  roles: Array<"member" | "admin" | "pastor" | "other">
) {
  const user = await getCurrentUser();
  const forbidden = requireRole(user, roles);

  return { user, forbidden };
}

export function badRequest(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function validId(id: string) {
  return mongoose.isValidObjectId(id);
}

export async function getAssignedOccurrence(
  occurrenceId: string,
  userId: string
) {
  if (!validId(occurrenceId)) return { error: "Invalid service occurrence ID.", status: 400 as const };

  const occurrence = await ServiceOccurrence.findById(occurrenceId);

  if (!occurrence) return { error: "Service occurrence not found.", status: 404 as const };

  if (occurrence.assignedReporterId?.toString() !== userId) {
    return { error: "You are not the assigned reporter for this service.", status: 403 as const };
  }

  if (occurrence.status === "CANCELLED") {
    return { error: "This service has been cancelled.", status: 409 as const };
  }

  return { occurrence };
}

export async function getAdmins() {
  return User.find({ role: "admin" })
    .select("_id fname lname email")
    .lean();
}
