import mongoose, { Schema, Types } from "mongoose";

export type NotificationType =
  | "CHECKLIST_SUBMITTED"
  | "CHECKLIST_APPROVED"
  | "ASSESSMENT_SUBMITTED"
  | "ASSESSMENT_APPROVED"
  | "ASSESSMENT_REJECTED"
  | "REPORT_APPROVED"
  | "REPORT_PUBLISHED";

export type NotificationResourceType =
  | "CHECKLIST"
  | "ASSESSMENT"
  | "SERVICE_REPORT";

export interface INotification {
  recipient: Types.ObjectId;
  actor: Types.ObjectId | null;
  type: NotificationType;
  title: string;
  message: string;
  resourceType: NotificationResourceType;
  resourceId: Types.ObjectId;
  href: string;
  eventKey: string;
  read: boolean;
  readAt: Date | null;
}

const notificationSchema = new Schema<INotification>(
  {
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    actor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    type: {
      type: String,
      enum: [
        "CHECKLIST_SUBMITTED",
        "CHECKLIST_APPROVED",
        "ASSESSMENT_SUBMITTED",
        "ASSESSMENT_APPROVED",
        "ASSESSMENT_REJECTED",
        "REPORT_APPROVED",
        "REPORT_PUBLISHED",
      ],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    resourceType: {
      type: String,
      enum: ["CHECKLIST", "ASSESSMENT", "SERVICE_REPORT"],
      required: true,
    },
    resourceId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    eventKey: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
      index: true,
    },
    readAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

notificationSchema.index(
  { recipient: 1, eventKey: 1 },
  { unique: true }
);

const Notification =
  mongoose.models.Notification ||
  mongoose.model<INotification>("Notification", notificationSchema);

export default Notification;
