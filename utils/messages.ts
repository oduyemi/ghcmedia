import mongoose, { Types } from "mongoose";
import User from "@/models/user.model";
import Message, {
  type MessageContextType,
} from "@/models/message.model";
import Assessment from "@/models/assessment.model";
import ChecklistSubmission from "@/models/checklistSubmission.model";
import ServiceReport from "@/models/serviceReport.model";
import { getCurrentUser } from "@/utils/auth";

type CurrentUser = {
  _id: Types.ObjectId | string;
  role: "member" | "admin";
};

type MessageContext = {
  contextType: MessageContextType;
  assessmentId?: string;
  checklistSubmissionId?: string;
  serviceReportId?: string;
};

function isValidId(id?: string) {
  return Boolean(id && mongoose.Types.ObjectId.isValid(id));
}

function buildThreadId(
  senderId: string,
  recipientId: string,
  contextType: MessageContextType,
  contextId?: string
) {
  const participants = [senderId, recipientId].sort();
  return [
    ...participants,
    contextType,
    contextId ?? "general",
  ].join(":");
}

export async function validateMessageContext(
  context: MessageContext,
  user: CurrentUser,
  recipientId: string
) {
  const references = [
    context.assessmentId,
    context.checklistSubmissionId,
    context.serviceReportId,
  ].filter(Boolean);

  if (references.length > 1) {
    return { error: "A message can reference only one resource.", status: 400 };
  }

  const recipient = await User.findById(recipientId)
    .select("_id role")
    .lean();

  if (!recipient) {
    return { error: "Recipient not found.", status: 404 };
  }

  if (String(user._id) === String(recipient._id)) {
    return { error: "You cannot message yourself.", status: 400 };
  }

  let contextId: string | undefined;

  if (context.assessmentId) {
    if (!isValidId(context.assessmentId)) {
      return { error: "Invalid assessment ID.", status: 400 };
    }

    const assessment = await Assessment.findById(context.assessmentId).lean();

    if (!assessment) {
      return { error: "Assessment not found.", status: 404 };
    }

    const allowedParticipants = [
      String(assessment.subjectUserId),
      String(assessment.assessorUserId),
    ];

    if (user.role === "member" && !allowedParticipants.includes(String(user._id))) {
      return { error: "You cannot access this assessment.", status: 403 };
    }

    if (
      user.role === "admin" &&
      !allowedParticipants.includes(String(recipient._id))
    ) {
      return { error: "The recipient is not associated with this assessment.", status: 403 };
    }

    if (
      user.role === "member" &&
      recipient.role !== "admin"
    ) {
      return { error: "Members can only message administrators.", status: 403 };
    }

    if (
      user.role === "admin" &&
      recipient.role !== "member"
    ) {
      return { error: "Admins can only message members in this conversation.", status: 403 };
    }

    contextId = String(assessment._id);
  } else if (context.checklistSubmissionId) {
    if (!isValidId(context.checklistSubmissionId)) {
      return { error: "Invalid checklist submission ID.", status: 400 };
    }

    const checklist = await ChecklistSubmission.findById(
      context.checklistSubmissionId
    ).lean();

    if (!checklist) {
      return { error: "Checklist submission not found.", status: 404 };
    }

    if (
      user.role === "member" &&
      String(checklist.submittedBy) !== String(user._id)
    ) {
      return { error: "You cannot access this checklist submission.", status: 403 };
    }

    if (user.role === "member" && recipient.role !== "admin") {
      return { error: "Members can only message administrators.", status: 403 };
    }

    if (user.role === "admin") {
      if (recipient.role !== "member" || String(recipient._id) !== String(checklist.submittedBy)) {
        return { error: "Admins can only message the checklist submitter in this conversation.", status: 403 };
      }
    }

    contextId = String(checklist._id);
  } else if (context.serviceReportId) {
    if (!isValidId(context.serviceReportId)) {
      return { error: "Invalid report ID.", status: 400 };
    }

    const report = await ServiceReport.findById(context.serviceReportId).lean();

    if (!report) {
      return { error: "Service report not found.", status: 404 };
    }

    if (
      user.role === "member" &&
      String(report.createdBy) !== String(user._id) &&
      report.visibility !== "PUBLIC"
    ) {
      return { error: "You cannot access this report.", status: 403 };
    }

    if (user.role === "member" && recipient.role !== "admin") {
      return { error: "Members can only message administrators.", status: 403 };
    }

    if (
      user.role === "admin" &&
      (recipient.role !== "member" || String(recipient._id) !== String(report.createdBy))
    ) {
      return { error: "Admins can only message the report creator in this conversation.", status: 403 };
    }

    contextId = String(report._id);
  } else {
    if (user.role === recipient.role) {
      return { error: "General conversations are only available between members and admins.", status: 403 };
    }
  }

  return {
    error: null,
    status: 200,
    recipient,
    contextId,
  };
}

export async function sendMessage(input: {
  recipientId: string;
  content: string;
  contextType?: MessageContextType;
  assessmentId?: string;
  checklistSubmissionId?: string;
  serviceReportId?: string;
  replyToId?: string;
}) {
  const currentUser = await getCurrentUser() as CurrentUser | null;

  if (!currentUser) {
    return { error: "Unauthorized.", status: 401, message: null };
  }

  const content = input.content?.trim();

  if (!content || content.length > 10000) {
    return { error: "Message content must be between 1 and 10000 characters.", status: 400, message: null };
  }

  if (!isValidId(input.recipientId)) {
    return { error: "Invalid recipient ID.", status: 400, message: null };
  }

  const context: MessageContext = {
    contextType: input.contextType ?? "GENERAL",
    assessmentId: input.assessmentId,
    checklistSubmissionId: input.checklistSubmissionId,
    serviceReportId: input.serviceReportId,
  };

  const validation = await validateMessageContext(
    context,
    currentUser,
    input.recipientId
  );

  if (validation.error || !validation.recipient) {
    return {
      error: validation.error ?? "Invalid message context.",
      status: validation.status,
      message: null,
    };
  }

  const refs = [
    input.assessmentId,
    input.checklistSubmissionId,
    input.serviceReportId,
  ].filter(Boolean);

  if (context.contextType === "GENERAL" && refs.length) {
    return { error: "General messages cannot reference a resource.", status: 400, message: null };
  }

  if (context.contextType !== "GENERAL" && refs.length !== 1) {
    return { error: "Select exactly one resource for this message.", status: 400, message: null };
  }

  if (input.replyToId) {
    if (!isValidId(input.replyToId)) {
      return { error: "Invalid reply reference.", status: 400, message: null };
    }

    const parent = await Message.findById(input.replyToId).lean();

    if (
      !parent ||
      parent.threadId !== buildThreadId(
        String(currentUser._id),
        input.recipientId,
        context.contextType,
        validation.contextId
      )
    ) {
      return { error: "The referenced message does not belong to this conversation.", status: 400, message: null };
    }
  }

  const threadId = buildThreadId(
    String(currentUser._id),
    input.recipientId,
    context.contextType,
    validation.contextId
  );

  const message = await Message.create({
    threadId,
    contextType: context.contextType,
    assessment: input.assessmentId ?? null,
    checklistSubmission: input.checklistSubmissionId ?? null,
    serviceReport: input.serviceReportId ?? null,
    sender: currentUser._id,
    recipient: input.recipientId,
    content,
    replyTo: input.replyToId ?? null,
  });

  return { error: null, status: 201, message };
}
