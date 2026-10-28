import mongoose, { Document, Schema, Types } from "mongoose";

export type OccurrenceServiceType = "BUSINESS" | "CELEBRATION" | "MC_LIVE" | "WOW" | "SPECIAL_PROGRAMME";
export type OccurrenceStatus = "SCHEDULED" | "COMPLETED" | "CANCELLED";
export interface IServiceOccurrence extends Document {
  _id: Types.ObjectId; serviceType: OccurrenceServiceType; serviceDateKey: string; startsAt: Date; endsAt?: Date | null;
  status: OccurrenceStatus; specialProgrammeId?: Types.ObjectId | null; title?: string | null; notes?: string | null;
  createdBy: Types.ObjectId; createdAt: Date; updatedAt: Date;
}

function isRealDateKey(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

const serviceOccurrenceSchema = new Schema<IServiceOccurrence>({
  serviceType: { type: String, enum: ["BUSINESS", "CELEBRATION", "MC_LIVE", "WOW", "SPECIAL_PROGRAMME"], required: true, index: true },
  serviceDateKey: { type: String, required: true, validate: { validator: isRealDateKey, message: "serviceDateKey must be a real date in YYYY-MM-DD format." }, index: true },
  startsAt: { type: Date, required: true }, endsAt: { type: Date, default: null },
  status: { type: String, enum: ["SCHEDULED", "COMPLETED", "CANCELLED"], default: "SCHEDULED", required: true, index: true },
  specialProgrammeId: { type: Schema.Types.ObjectId, ref: "SpecialProgramme", default: null },
  title: { type: String, trim: true, default: null, maxlength: 200 }, notes: { type: String, trim: true, default: null, maxlength: 3000 },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

serviceOccurrenceSchema.pre("validate", function () {
  if (this.endsAt && this.startsAt && this.endsAt < this.startsAt) this.invalidate("endsAt", "Occurrence end time cannot precede its start time.");
  if (this.serviceType === "SPECIAL_PROGRAMME" && !this.specialProgrammeId) this.invalidate("specialProgrammeId", "Special-programme occurrences must reference a special programme.");
  if (this.serviceType !== "SPECIAL_PROGRAMME" && this.specialProgrammeId) this.invalidate("specialProgrammeId", "Only special-programme occurrences may reference a special programme.");
});

const regularServiceTypes = ["BUSINESS", "CELEBRATION", "MC_LIVE", "WOW"] as const;
for (const serviceType of regularServiceTypes) {
  serviceOccurrenceSchema.index({ serviceDateKey: 1 }, {
    unique: true,
    partialFilterExpression: { serviceType },
    name: `unique_${serviceType.toLowerCase()}_occurrence_per_day`,
  });
}
serviceOccurrenceSchema.index({ status: 1, startsAt: 1 });
serviceOccurrenceSchema.index({ specialProgrammeId: 1, startsAt: 1 });

const ServiceOccurrence = mongoose.models.ServiceOccurrence || mongoose.model<IServiceOccurrence>("ServiceOccurrence", serviceOccurrenceSchema);
export default ServiceOccurrence;
