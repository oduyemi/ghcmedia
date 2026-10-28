import mongoose, { Document, Schema, Types } from "mongoose";

export type MessageContextType =
  | "GENERAL"
  | "ASSESSMENT"
  | "CHECKLIST"
  | "SERVICE_REPORT";

export interface IMessage extends Document {
  _id: Types.ObjectId;
  threadId: string;
  contextType: MessageContextType;
  assessment?: Types.ObjectId | null;
  checklistSubmission?: Types.ObjectId | null;
  serviceReport?: Types.ObjectId | null;
  sender: Types.ObjectId;
  recipient: Types.ObjectId;
  content: string;
  read: boolean;
  readAt?: Date | null;
  replyTo?: Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    threadId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    contextType: {
      type: String,
      enum: ["GENERAL", "ASSESSMENT", "CHECKLIST", "SERVICE_REPORT"],
      default: "GENERAL",
      required: true,
      index: true,
    },

    assessment: {
      type: Schema.Types.ObjectId,
      ref: "Assessment",
      default: null,
    },

    checklistSubmission: {
      type: Schema.Types.ObjectId,
      ref: "ChecklistSubmission",
      default: null,
    },

    serviceReport: {
      type: Schema.Types.ObjectId,
      ref: "ServiceReport",
      default: null,
    },

    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 10000,
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

    replyTo: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
  },
  { timestamps: true }
);

messageSchema.pre("validate", function () {
  const references = [
    this.assessment,
    this.checklistSubmission,
    this.serviceReport,
  ].filter(Boolean);

  if (references.length > 1) {
    this.invalidate(
      "contextType",
      "A message can reference only one contextual resource."
    );
  }

  const expectedReference = {
    GENERAL: null,
    ASSESSMENT: this.assessment,
    CHECKLIST: this.checklistSubmission,
    SERVICE_REPORT: this.serviceReport,
  }[this.contextType];

  if (this.contextType !== "GENERAL" && !expectedReference) {
    this.invalidate(
      "contextType",
      "The selected context requires its corresponding resource reference."
    );
  }

  if (this.contextType === "GENERAL" && references.length) {
    this.invalidate(
      "contextType",
      "General messages cannot reference a contextual resource."
    );
  }

  if (this.sender && this.recipient && this.sender.equals(this.recipient)) {
    this.invalidate("recipient", "You cannot message yourself.");
  }
});

messageSchema.index({ threadId: 1, createdAt: 1 });
messageSchema.index({ recipient: 1, read: 1, createdAt: -1 });
messageSchema.index({ sender: 1, recipient: 1, createdAt: -1 });

messageSchema.index(
  { sender: 1, recipient: 1, contextType: 1, assessment: 1 }
);

const Message =
  mongoose.models.Message ||
  mongoose.model<IMessage>("Message", messageSchema);

export default Message;
