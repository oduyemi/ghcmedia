import mongoose, {
  Schema,
  Types,
  model,
  models,
  type Document,
} from "mongoose";

export type NotificationType =
  | "REPORTER_ASSIGNED"
  | "REPORTER_REASSIGNED"
  | "CHECKLIST_SUBMITTED"
  | "CHECKLIST_APPROVED"
  | "CHECKLIST_REJECTED"
  | "ASSESSMENT_SUBMITTED"
  | "ASSESSMENT_APPROVED"
  | "ASSESSMENT_REJECTED"
  | "REPORT_SUBMITTED"
  | "REPORT_APPROVED"
  | "REPORT_REJECTED"
  | "REPORT_PUBLISHED"
  | "REPORT_FEEDBACK_SUBMITTED"
  | "REPORT_FEEDBACK_HIDDEN";

export type NotificationResourceType =
  | "CHECKLIST"
  | "ASSESSMENT"
  | "SERVICE_REPORT"
  | "REPORT_FEEDBACK";

export interface INotification extends Document {
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
  createdAt: Date;
  updatedAt: Date;
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
        "REPORTER_ASSIGNED",
        "REPORTER_REASSIGNED",
        "CHECKLIST_SUBMITTED",
        "CHECKLIST_APPROVED",
        "CHECKLIST_REJECTED",
        "ASSESSMENT_SUBMITTED",
        "ASSESSMENT_APPROVED",
        "ASSESSMENT_REJECTED",
        "REPORT_SUBMITTED",
        "REPORT_APPROVED",
        "REPORT_REJECTED",
        "REPORT_PUBLISHED",
        "REPORT_FEEDBACK_SUBMITTED",
        "REPORT_FEEDBACK_HIDDEN",
      ],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    resourceType: {
      type: String,
      enum: [
        "CHECKLIST",
        "ASSESSMENT",
        "SERVICE_REPORT",
        "REPORT_FEEDBACK",
      ],
      required: true,
    },
    resourceId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    href: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    eventKey: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
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
  {
    timestamps: true,
  },
);

notificationSchema.index(
  { recipient: 1, eventKey: 1 },
  { unique: true },
);

notificationSchema.index({
  recipient: 1,
  read: 1,
  createdAt: -1,
});

const Notification =
  models.Notification ||
  model<INotification>("Notification", notificationSchema);

export default Notification;
