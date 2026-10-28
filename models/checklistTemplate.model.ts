import mongoose, { Document, Schema, Types } from "mongoose";

export type ChecklistTemplateStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";
export type ChecklistServiceType = "BUSINESS" | "CELEBRATION" | "MC_LIVE" | "WOW" | "SPECIAL_PROGRAMME";
export interface IChecklistTemplateItem { itemId: string; title: string; requirement?: string; required: boolean; sortOrder: number }
export interface IChecklistTemplate extends Document {
  _id: Types.ObjectId; name: string; description?: string; serviceTypes: ChecklistServiceType[]; version: number;
  status: ChecklistTemplateStatus; items: IChecklistTemplateItem[]; createdBy: Types.ObjectId; createdAt: Date; updatedAt: Date;
}

const checklistTemplateItemSchema = new Schema<IChecklistTemplateItem>({
  itemId: { type: String, required: true, trim: true, minlength: 1 },
  title: { type: String, required: true, trim: true, maxlength: 200 },
  requirement: { type: String, trim: true, default: "", maxlength: 2000 },
  required: { type: Boolean, default: true, required: true },
  sortOrder: { type: Number, default: 0, min: 0, validate: Number.isInteger, required: true },
}, { _id: false });

const checklistTemplateSchema = new Schema<IChecklistTemplate>({
  name: { type: String, required: true, trim: true, maxlength: 160 },
  description: { type: String, trim: true, default: "", maxlength: 2000 },
  serviceTypes: {
    type: [{ type: String, enum: ["BUSINESS", "CELEBRATION", "MC_LIVE", "WOW", "SPECIAL_PROGRAMME"] }],
    required: true,
    validate: [(values: string[]) => values.length > 0, "Select at least one applicable service type."],
  },
  version: { type: Number, required: true, min: 1, validate: Number.isInteger },
  status: { type: String, enum: ["DRAFT", "ACTIVE", "ARCHIVED"], default: "DRAFT", required: true, index: true },
  items: {
    type: [checklistTemplateItemSchema], default: [],
    validate: [(items: IChecklistTemplateItem[]) => items.length > 0, "A checklist template must contain at least one item."],
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

checklistTemplateSchema.index({ name: 1, version: 1 }, { unique: true, name: "unique_checklist_template_version" });
checklistTemplateSchema.pre("validate", function () {
  if (new Set(this.serviceTypes).size !== this.serviceTypes.length) this.invalidate("serviceTypes", "Service types must not contain duplicates.");
  const ids = this.items.map((item) => item.itemId.trim());
  if (new Set(ids).size !== ids.length) this.invalidate("items", "Checklist item IDs must be unique within a template version.");
});


const ChecklistTemplate = mongoose.models.ChecklistTemplate || mongoose.model<IChecklistTemplate>("ChecklistTemplate", checklistTemplateSchema);
export default ChecklistTemplate;
