import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "@/utils/db";
import ServiceOccurrence from "@/models/serviceOccurence.model";
import Assessment from "@/models/assessment.model";
import AssessmentTemplate, { type IAssessmentCriterion } from "@/models/assessmentTemplate.model";
import User from "@/models/user.model";
import Notification from "@/models/notification.model";
import { authorize, getAdmins } from "@/utils/reporting";
import { sendEmailWithRetry } from "@/helper/emailLogic";


function ratingBand(percentage: number) {
  if (percentage >= 90) return "Excellent";
  if (percentage >= 80) return "Very Good";
  if (percentage >= 70) return "Good";
  if (percentage >= 60) return "Fair";
  return "Needs Improvement";
}

export async function POST(request: Request) {
  try {
    const { user, forbidden } = await authorize(["member"]);
    if (forbidden) return forbidden;

    await dbConnect();

    const body = await request.json().catch(() => null);

    if (
      !body ||
      !mongoose.isValidObjectId(body?.serviceOccurrenceId) ||
      !mongoose.isValidObjectId(body?.templateId) ||
      !mongoose.isValidObjectId(body?.subjectUserId) ||
      !Array.isArray(body?.criteriaScores)
    ) {
      return NextResponse.json({ error: "Invalid assessment submission." }, { status: 400 });
    }

    if (body.subjectUserId === user!._id.toString()) {
      return NextResponse.json({ error: "You cannot assess yourself." }, { status: 400 });
    }

    const occurrence = await ServiceOccurrence.findOne({
      _id: body.serviceOccurrenceId,
      assignedReporterId: user!._id,
      status: { $ne: "CANCELLED" },
    });

    if (!occurrence) {
      return NextResponse.json({ error: "You are not assigned to this service." }, { status: 403 });
    }

    const template = await AssessmentTemplate.findOne({
      _id: body.templateId,
      kind: "CAMERA_TECHNICAL",
      status: "ACTIVE",
    });

    if (!template) {
      return NextResponse.json({ error: "Active camera assessment template not found." }, { status: 404 });
    }

    const subject = await User.findOne({
      _id: body.subjectUserId,
      role: "member",
    }).select("_id");

    if (!subject) {
      return NextResponse.json({ error: "Assessment subject must be a media team member." }, { status: 400 });
    }

    const criteria: IAssessmentCriterion[] = template.criteria;

const criteriaMap = new Map<string, IAssessmentCriterion>(
  criteria.map(
    (criterion): [string, IAssessmentCriterion] => [
      criterion.criterionId,
      criterion,
    ]
  )
);

const seen = new Set<string>();

const scores: {
  criterionId: string;
  label: string;
  description?: string;
  score: number;
  comment: string;
}[] = [];

for (const submitted of body.criteriaScores) {
  if (
    !submitted ||
    typeof submitted.criterionId !== "string" ||
    seen.has(submitted.criterionId)
  ) {
    return NextResponse.json(
      { error: "Criterion IDs must be valid and unique." },
      { status: 400 }
    );
  }

  seen.add(submitted.criterionId);

  const criterion = criteriaMap.get(submitted.criterionId);

  if (!criterion) {
    return NextResponse.json(
      { error: "A criterion does not belong to the selected template." },
      { status: 400 }
    );
  }

  if (
    !Number.isInteger(submitted.score) ||
    submitted.score < 1 ||
    submitted.score > 5
  ) {
    return NextResponse.json(
      { error: "Criterion scores must be integers between 1 and 5." },
      { status: 400 }
    );
  }

  scores.push({
    criterionId: criterion.criterionId,
    label: criterion.label,
    description: criterion.description,
    score: submitted.score,
    comment:
      typeof submitted.comment === "string"
        ? submitted.comment.slice(0, 2000)
        : "",
  });
}

const missingRequired = criteria.filter(
  (criterion) =>
    criterion.required && !seen.has(criterion.criterionId)
);

if (missingRequired.length > 0) {
  return NextResponse.json(
    {
      error: "Complete all required assessment criteria.",
      missingCriterionIds: missingRequired.map(
        (criterion) => criterion.criterionId
      ),
    },
    { status: 400 }
  );
}

    const totalScore = scores.reduce((sum, item) => sum + item.score, 0);
    const maximumScore = scores.length * 5;
    const percentage = maximumScore
      ? Math.round((totalScore / maximumScore) * 10000) / 100
      : 0;

    const assessment = await Assessment.create({
      kind: "CAMERA_TECHNICAL",
      status: "PENDING_REVIEW",
      templateId: template._id,
      templateVersion: template.version,
      subjectUserId: subject._id,
      assessorUserId: user!._id,
      serviceOccurrenceId: occurrence._id,
      cameraPosition: body.cameraPosition,
      criteriaScores: scores,
      totalScore,
      maximumScore,
      percentage,
      ratingBand: ratingBand(percentage),
      keyStrengths: typeof body.keyStrengths === "string" ? body.keyStrengths.slice(0, 5000) : "",
      areasForImprovement: typeof body.areasForImprovement === "string" ? body.areasForImprovement.slice(0, 5000) : "",
      specificFeedback: typeof body.specificFeedback === "string" ? body.specificFeedback.slice(0, 5000) : "",
      actionPlan: typeof body.actionPlan === "string" ? body.actionPlan.slice(0, 5000) : "",
      followUps: Array.isArray(body.followUps) ? body.followUps : [],
      submittedAt: new Date(),
    });

    const admins = await getAdmins();
    const eventTime = assessment.submittedAt!.toISOString();

    await Promise.allSettled(admins.map(async (admin) => {
      await Notification.create({
        recipient: admin._id,
        actor: user!._id,
        type: "ASSESSMENT_SUBMITTED",
        title: "Assessment submitted for review",
        message: `${user!.fname} ${user!.lname} submitted a camera assessment for ${subject._id}.`,
        resourceType: "ASSESSMENT",
        resourceId: assessment._id,
        href: `/admin/assessments/${assessment._id}`,
        eventKey: `ASSESSMENT_SUBMITTED:${assessment._id}:${admin._id}:${eventTime}`,
      });

      if (admin.email) {
        await sendEmailWithRetry(
          admin.email,
          "Media assessment submitted for review",
          `<p>A camera assessment has been submitted for review.</p><p><a href="${process.env.APP_URL || "https://ghcmedia.vercel.app"}/admin/assessments/${assessment._id}">Review assessment</a></p>`
        );
      }
    }));

    return NextResponse.json({ message: "Assessment submitted for review.", assessment }, { status: 201 });
  } catch (error) {
    console.error("SUBMIT ASSESSMENT ERROR:", error);
    return NextResponse.json({ error: "Unable to submit assessment." }, { status: 500 });
  }
}
