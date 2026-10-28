import mongoose, { Document, Schema, Types } from "mongoose";


export type AssessmentKind = "CAMERA_TECHNICAL" | "MONTHLY_PERFORMANCE";
export type AssessmentStatus = "DRAFT" | "SUBMITTED" | "PENDING_REVIEW" | "APPROVED" | "REJECTED";
export type RatingBand = "Excellent" | "Very Good" | "Good" | "Fair" | "Needs Improvement";
export type CameraPosition = "MASTER_CAM_1" | "MASTER_CAM_2" | "ROVE_CAM" | "CRANE_CAM";

export interface IAssessmentScore { 
    criterionId: string; 
    label: string; 
    description?: string; 
    score: number; 
    comment?: string 
}
export interface IAssessmentFollowUp { 
    recommendation: string; 
    status: "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CARRIED_FORWARD"; 
    evidence?: string; 
    dueDate?: Date | null 
}

export interface IAssessment extends Document {
  _id: Types.ObjectId; 
  kind: AssessmentKind; 
  status: AssessmentStatus; 
  templateId: Types.ObjectId; 
  templateVersion: number;
  subjectUserId: Types.ObjectId; 
  assessorUserId: Types.ObjectId; 
  serviceOccurrenceId?: Types.ObjectId | null;
  cameraPosition?: CameraPosition | null; 
  periodStart?: Date | null; 
  periodEnd?: Date | null; 
  previousAssessmentId?: Types.ObjectId | null;
  criteriaScores: IAssessmentScore[]; 
  totalScore?: number | null; 
  maximumScore?: number | null; 
  percentage?: number | null;
  ratingBand?: RatingBand | null; 
  keyStrengths?: string; 
  areasForImprovement?: string; 
  specificFeedback?: string; 
  actionPlan?: string;
  followUps: IAssessmentFollowUp[]; 
  reviewSummary?: string; 
  submittedAt?: Date | null; 
  reviewedAt?: Date | null;
  reviewedBy?: Types.ObjectId | null; 
  createdAt: Date; 
  updatedAt: Date;
}

const assessmentScoreSchema = new Schema<IAssessmentScore>({
  criterionId: { 
    type: String, 
    required: true, 
    trim: true 
}, 
label: { 
    type: String, 
    required: true, 
    trim: true 
},
  description: { 
    type: String, 
    trim: true, default: "", 
    maxlength: 1000 
}, 
score: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5, 
    validate: Number.isInteger 
},
  comment: { 
    type: String, 
    trim: true, 
    default: "", 
    maxlength: 2000 
},
}, { _id: false });

const assessmentFollowUpSchema = new Schema<IAssessmentFollowUp>({
  recommendation: { 
    type: String, 
    required: true, 
    trim: true, 
    maxlength: 2000 
},
  status: { 
    type: String, 
    enum: ["OPEN", "IN_PROGRESS", "COMPLETED", "CARRIED_FORWARD"], 
    default: "OPEN", 
    required: true 
},
  evidence: { 
    type: String, 
    trim: true, default: "", 
    maxlength: 2000 }, 
    dueDate: { type: Date, default: null },
}, { _id: false });

const assessmentSchema = new Schema<IAssessment>({
  kind: { 
    type: String, 
    enum: ["CAMERA_TECHNICAL", "MONTHLY_PERFORMANCE"], 
    required: true, 
    index: true 
},
  status: { 
    type: String, enum: ["DRAFT", "SUBMITTED", "PENDING_REVIEW", "APPROVED", "REJECTED"], default: "DRAFT", required: true, index: true },
  templateId: { type: Schema.Types.ObjectId, ref: "AssessmentTemplate", required: true },
  templateVersion: { type: Number, required: true, min: 1, validate: Number.isInteger },
  subjectUserId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  assessorUserId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  serviceOccurrenceId: { type: Schema.Types.ObjectId, ref: "ServiceOccurrence", default: null, index: true },
  cameraPosition: { type: String, enum: ["MASTER_CAM_1", "MASTER_CAM_2", "ROVE_CAM", "CRANE_CAM"], default: null },
  periodStart: { type: Date, default: null }, periodEnd: { type: Date, default: null },
  previousAssessmentId: { type: Schema.Types.ObjectId, ref: "Assessment", default: null },
  criteriaScores: { type: [assessmentScoreSchema], default: [] },
  totalScore: { type: Number, min: 0, default: null }, maximumScore: { type: Number, min: 1, default: null },
  percentage: { type: Number, min: 0, max: 100, default: null },
  ratingBand: { type: String, enum: ["Excellent", "Very Good", "Good", "Fair", "Needs Improvement"], default: null },
  keyStrengths: { type: String, trim: true, default: "", maxlength: 5000 }, areasForImprovement: { type: String, trim: true, default: "", maxlength: 5000 },
  specificFeedback: { type: String, trim: true, default: "", maxlength: 5000 }, actionPlan: { type: String, trim: true, default: "", maxlength: 5000 },
  followUps: { type: [assessmentFollowUpSchema], default: [] }, reviewSummary: { type: String, trim: true, default: "", maxlength: 5000 },
  submittedAt: { type: Date, default: null }, reviewedAt: { type: Date, default: null },
  reviewedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
}, { timestamps: true });

assessmentSchema.pre("validate", function () {
  if (this.periodStart && this.periodEnd && this.periodEnd < this.periodStart) this.invalidate("periodEnd", "Assessment period end cannot precede its start.");
  if (this.kind === "CAMERA_TECHNICAL" && !this.cameraPosition) this.invalidate("cameraPosition", "Camera technical assessments require a camera position.");
  if (this.kind === "MONTHLY_PERFORMANCE" && (!this.periodStart || !this.periodEnd)) this.invalidate("periodStart", "Monthly performance assessments require a start and end date.");
  if (this.subjectUserId && this.assessorUserId && this.subjectUserId.equals(this.assessorUserId)) this.invalidate("assessorUserId", "A user cannot assess themselves.");
  const ids = this.criteriaScores.map((item) => item.criterionId);
  if (new Set(ids).size !== ids.length) this.invalidate("criteriaScores", "Criterion IDs must be unique within an assessment.");
  const scoresProvided = this.criteriaScores.length > 0;
  if (scoresProvided) {
    const calculatedTotal = this.criteriaScores.reduce((sum, item) => sum + item.score, 0);
    if (this.totalScore != null && this.totalScore !== calculatedTotal) this.invalidate("totalScore", "Total score must equal the sum of criterion scores.");
    if (this.maximumScore != null && this.maximumScore < calculatedTotal) this.invalidate("maximumScore", "Maximum score cannot be less than total score.");
    if (this.totalScore != null && this.maximumScore != null && this.maximumScore > 0) {
      const calculatedPercentage = Math.round((this.totalScore / this.maximumScore) * 10000) / 100;
      if (this.percentage != null && Math.abs(this.percentage - calculatedPercentage) > 0.01) this.invalidate("percentage", "Percentage must match totalScore / maximumScore.");
    }
  }
  if (["SUBMITTED", "PENDING_REVIEW", "APPROVED", "REJECTED"].includes(this.status) && !this.submittedAt) this.invalidate("submittedAt", "Submitted assessments require submittedAt.");
  if (["APPROVED", "REJECTED"].includes(this.status) && (!this.reviewedAt || !this.reviewedBy)) this.invalidate("reviewedAt", "Reviewed assessments require reviewedAt and reviewedBy.");
});

assessmentSchema.index({ subjectUserId: 1, kind: 1, status: 1, createdAt: -1 });
assessmentSchema.index({ assessorUserId: 1, status: 1, createdAt: -1 });
assessmentSchema.index({ serviceOccurrenceId: 1, cameraPosition: 1, kind: 1 });
assessmentSchema.index({ subjectUserId: 1, kind: 1, periodStart: 1, periodEnd: 1 });

const Assessment = mongoose.models.Assessment || mongoose.model<IAssessment>("Assessment", assessmentSchema);
export default Assessment;
