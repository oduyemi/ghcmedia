import mongoose, { Document, Schema, Types } from "mongoose";

export type ReportType = "SERVICE" | "WEEKLY" | "MONTHLY" | "SPECIAL_PROGRAMME";
export type ReportStatus = "DRAFT" | "PENDING_REVIEW" | "APPROVED" | "PUBLISHED";
export type ReportVisibility = "PRIVATE" | "PUBLIC";
export type ReportServiceType = "BUSINESS" | "CELEBRATION" | "MC_LIVE" | "WOW" | "SPECIAL_PROGRAMME";

export interface IReportSummary { approvedAverageRating?: number | null; checklistCompletionPercentage?: number | null; completedAssessments: number; pendingAssessments: number }
export interface IReportHighlight { highlightId: string; title: string; description: string; category?: string }
export interface IServiceReport extends Document {
  _id: Types.ObjectId; title: string; reportType: ReportType; serviceType?: ReportServiceType | null;
  serviceOccurrenceId?: Types.ObjectId | null; specialProgrammeId?: Types.ObjectId | null; date: Date;
  periodStart?: Date | null; periodEnd?: Date | null; status: ReportStatus; visibility: ReportVisibility; summary: IReportSummary;
  highlights: IReportHighlight[]; approvedPublicSummary?: string; sourceAssessmentIds: Types.ObjectId[];
  sourceChecklistSubmissionIds: Types.ObjectId[]; createdBy: Types.ObjectId; approvedBy?: Types.ObjectId | null;
  approvedAt?: Date | null; publishedAt?: Date | null; createdAt: Date; updatedAt: Date;
}

const reportSummarySchema = new Schema<IReportSummary>({
  approvedAverageRating: { type: Number, min: 0, max: 100, default: null },
  checklistCompletionPercentage: { type: Number, min: 0, max: 100, default: null },
  completedAssessments: { type: Number, min: 0, validate: Number.isInteger, default: 0, required: true },
  pendingAssessments: { type: Number, min: 0, validate: Number.isInteger, default: 0, required: true },
}, { _id: false });

const reportHighlightSchema = new Schema<IReportHighlight>({
  highlightId: { type: String, required: true, trim: true }, title: { type: String, required: true, trim: true, maxlength: 200 },
  description: { type: String, required: true, trim: true, maxlength: 3000 }, category: { type: String, trim: true, default: "", maxlength: 100 },
}, { _id: false });

const serviceReportSchema = new Schema<IServiceReport>({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  reportType: { type: String, enum: ["SERVICE", "WEEKLY", "MONTHLY", "SPECIAL_PROGRAMME"], required: true, index: true },
  serviceType: { type: String, enum: ["BUSINESS", "CELEBRATION", "MC_LIVE", "WOW", "SPECIAL_PROGRAMME"], default: null },
  serviceOccurrenceId: { type: Schema.Types.ObjectId, ref: "ServiceOccurrence", default: null, index: true },
  specialProgrammeId: { type: Schema.Types.ObjectId, ref: "SpecialProgramme", default: null, index: true },
  date: { type: Date, required: true, index: true }, periodStart: { type: Date, default: null }, periodEnd: { type: Date, default: null },
  status: { type: String, enum: ["DRAFT", "PENDING_REVIEW", "APPROVED", "PUBLISHED"], default: "DRAFT", required: true, index: true },
  visibility: { type: String, enum: ["PRIVATE", "PUBLIC"], default: "PRIVATE", required: true, index: true },
  summary: { type: reportSummarySchema, default: () => ({ completedAssessments: 0, pendingAssessments: 0 }) },
  highlights: { type: [reportHighlightSchema], default: [] },
  approvedPublicSummary: { type: String, trim: true, default: "", maxlength: 10000 },
  sourceAssessmentIds: [{ type: Schema.Types.ObjectId, ref: "Assessment" }],
  sourceChecklistSubmissionIds: [{ type: Schema.Types.ObjectId, ref: "ChecklistSubmission" }],
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  approvedBy: { type: Schema.Types.ObjectId, ref: "User", default: null }, approvedAt: { type: Date, default: null }, publishedAt: { type: Date, default: null },
}, { timestamps: true });

serviceReportSchema.index({ status: 1, visibility: 1, date: -1 });
serviceReportSchema.index({ reportType: 1, serviceType: 1, date: -1 });
serviceReportSchema.pre("validate", function () {
  if (this.periodStart && this.periodEnd && this.periodEnd < this.periodStart) this.invalidate("periodEnd", "Report period end cannot precede its start.");
  if (["WEEKLY", "MONTHLY"].includes(this.reportType) && (!this.periodStart || !this.periodEnd)) this.invalidate("periodStart", "Weekly and monthly reports require a period start and end.");
  if (this.reportType === "SERVICE" && !this.serviceOccurrenceId) this.invalidate("serviceOccurrenceId", "Service reports must reference a service occurrence.");
  if (this.reportType === "SPECIAL_PROGRAMME" && !this.specialProgrammeId) this.invalidate("specialProgrammeId", "Special-programme reports must reference a special programme.");
  if (this.reportType === "SPECIAL_PROGRAMME" && this.serviceOccurrenceId) this.invalidate("serviceOccurrenceId", "Special-programme reports should reference the programme, not a regular service occurrence.");
  if (this.reportType !== "SPECIAL_PROGRAMME" && this.specialProgrammeId) this.invalidate("specialProgrammeId", "Only special-programme reports may reference a special programme.");
  if (this.status === "APPROVED" || this.status === "PUBLISHED") {
    if (!this.approvedBy) this.invalidate("approvedBy", "Approved or published reports require approvedBy.");
    if (!this.approvedAt) this.invalidate("approvedAt", "Approved or published reports require approvedAt.");
  }
  if (this.status === "PUBLISHED") {
    if (!this.publishedAt) this.invalidate("publishedAt", "Published reports require publishedAt.");
    if (this.visibility !== "PUBLIC") this.invalidate("visibility", "Published reports must have PUBLIC visibility.");
    if (!this.approvedPublicSummary?.trim()) this.invalidate("approvedPublicSummary", "Published reports require an approved public summary.");
  }
  const highlightIds = this.highlights.map((highlight) => highlight.highlightId);
  if (new Set(highlightIds).size !== highlightIds.length) this.invalidate("highlights", "Highlight IDs must be unique within a report.");
  if (new Set(this.sourceAssessmentIds.map(String)).size !== this.sourceAssessmentIds.length) this.invalidate("sourceAssessmentIds", "Source assessment IDs must not contain duplicates.");
  if (new Set(this.sourceChecklistSubmissionIds.map(String)).size !== this.sourceChecklistSubmissionIds.length) this.invalidate("sourceChecklistSubmissionIds", "Source checklist submission IDs must not contain duplicates.");
});

const ServiceReport = mongoose.models.ServiceReport || mongoose.model<IServiceReport>("ServiceReport", serviceReportSchema);
export default ServiceReport;
