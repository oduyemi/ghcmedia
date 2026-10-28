import mongoose, { Document, Schema, Types } from "mongoose";

export type AssessmentKind = "CAMERA_TECHNICAL" | "MONTHLY_PERFORMANCE";
export type AssessmentFrequency = "WEEKLY" | "MONTHLY";
export type AssessmentTemplateStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";

export interface IAssessmentCriterion {
  criterionId: string;
  label: string;
  description: string;
  required: boolean;
  sortOrder: number;
}

export interface IAssessmentTemplate extends Document {
  _id: Types.ObjectId;
  name: string;
  kind: AssessmentKind;
  frequency: AssessmentFrequency;
  version: number;
  status: AssessmentTemplateStatus;
  criteria: IAssessmentCriterion[];
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const assessmentCriterionSchema = new Schema<IAssessmentCriterion>(
  {
    criterionId: { type: String, required: true, trim: true, minlength: 1 },
    label: { type: String, required: true, trim: true, maxlength: 160 },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
    required: { type: Boolean, default: true, required: true },
    sortOrder: { type: Number, default: 0, min: 0, required: true },
  },
  { _id: false }
);

const assessmentTemplateSchema = new Schema<IAssessmentTemplate>(
  {
    name: { type: String, required: true, trim: true, maxlength: 160 },
    kind: { type: String, enum: ["CAMERA_TECHNICAL", "MONTHLY_PERFORMANCE"], required: true, index: true },
    frequency: { type: String, enum: ["WEEKLY", "MONTHLY"], required: true },
    version: { type: Number, required: true, min: 1, validate: Number.isInteger },
    status: { type: String, enum: ["DRAFT", "ACTIVE", "ARCHIVED"], default: "DRAFT", required: true, index: true },
    criteria: {
      type: [assessmentCriterionSchema],
      required: true,
      validate: [
        (criteria: IAssessmentCriterion[]) => criteria.length > 0,
        "An assessment template must contain criteria.",
      ],
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

assessmentTemplateSchema.index({ name: 1, version: 1 }, { unique: true, name: "unique_assessment_template_version" });
assessmentTemplateSchema.pre("validate", function () {
  const ids = this.criteria.map((criterion) => criterion.criterionId.trim());
  if (new Set(ids).size !== ids.length) {
    this.invalidate("criteria", "Criterion IDs must be unique within a template version.");
  }
});

const AssessmentTemplate = mongoose.models.AssessmentTemplate || mongoose.model<IAssessmentTemplate>("AssessmentTemplate", assessmentTemplateSchema);
export default AssessmentTemplate;
