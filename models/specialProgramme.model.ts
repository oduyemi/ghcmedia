import mongoose, { Document, Schema, Types } from "mongoose";

export type SpecialProgrammeStatus = "DRAFT" | "PENDING_REVIEW" | "APPROVED" | "PUBLISHED";
export type ReportVisibility = "PRIVATE" | "PUBLIC";
export interface ISpecialProgramme extends Document {
  _id: Types.ObjectId; title: string; slug: string; category: string; startDate: Date; endDate: Date; description: string; venue: string;
  status: SpecialProgrammeStatus; visibility: ReportVisibility; reportId?: Types.ObjectId | null; createdBy: Types.ObjectId; createdAt: Date; updatedAt: Date;
}

const specialProgrammeSchema = new Schema<ISpecialProgramme>({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  slug: { type: String, required: true, lowercase: true, trim: true, maxlength: 220, match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/ },
  category: { type: String, required: true, trim: true, maxlength: 100 },
  startDate: { type: Date, required: true, index: true }, endDate: { type: Date, required: true, index: true },
  description: { type: String, required: true, trim: true, maxlength: 10000 }, venue: { type: String, required: true, trim: true, maxlength: 300 },
  status: { type: String, enum: ["DRAFT", "PENDING_REVIEW", "APPROVED", "PUBLISHED"], default: "DRAFT", required: true, index: true },
  visibility: { type: String, enum: ["PRIVATE", "PUBLIC"], default: "PRIVATE", required: true, index: true },
  reportId: { type: Schema.Types.ObjectId, ref: "ServiceReport", default: null },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

specialProgrammeSchema.index({ slug: 1 }, { unique: true, name: "unique_special_programme_slug" });
specialProgrammeSchema.index({ status: 1, visibility: 1, startDate: -1 });
specialProgrammeSchema.pre("validate", function () {
  if (this.startDate && this.endDate && this.endDate < this.startDate) this.invalidate("endDate", "End date cannot precede start date.");
  if (this.status === "PUBLISHED" && this.visibility !== "PUBLIC") this.invalidate("visibility", "Published programmes must have PUBLIC visibility.");
});

const SpecialProgramme = mongoose.models.SpecialProgramme || mongoose.model<ISpecialProgramme>("SpecialProgramme", specialProgrammeSchema);
export default SpecialProgramme;
