"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var assessmentScoreSchema = new mongoose_1.Schema({
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
        trim: true, "default": "",
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
        "default": "",
        maxlength: 2000
    }
}, { _id: false });
var assessmentFollowUpSchema = new mongoose_1.Schema({
    recommendation: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000
    },
    status: {
        type: String,
        "enum": ["OPEN", "IN_PROGRESS", "COMPLETED", "CARRIED_FORWARD"],
        "default": "OPEN",
        required: true
    },
    evidence: {
        type: String,
        trim: true, "default": "",
        maxlength: 2000
    },
    dueDate: { type: Date, "default": null }
}, { _id: false });
var assessmentSchema = new mongoose_1.Schema({
    kind: {
        type: String,
        "enum": ["CAMERA_TECHNICAL", "MONTHLY_PERFORMANCE"],
        required: true,
        index: true
    },
    status: {
        type: String, "enum": ["DRAFT", "SUBMITTED", "PENDING_REVIEW", "APPROVED", "REJECTED"], "default": "DRAFT", required: true, index: true
    },
    templateId: { type: mongoose_1.Schema.Types.ObjectId, ref: "AssessmentTemplate", required: true },
    templateVersion: { type: Number, required: true, min: 1, validate: Number.isInteger },
    subjectUserId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    assessorUserId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    serviceOccurrenceId: { type: mongoose_1.Schema.Types.ObjectId, ref: "ServiceOccurrence", "default": null, index: true },
    cameraPosition: { type: String, "enum": ["MASTER_CAM_1", "MASTER_CAM_2", "ROVE_CAM", "CRANE_CAM"], "default": null },
    periodStart: { type: Date, "default": null }, periodEnd: { type: Date, "default": null },
    previousAssessmentId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Assessment", "default": null },
    criteriaScores: { type: [assessmentScoreSchema], "default": [] },
    totalScore: { type: Number, min: 0, "default": null }, maximumScore: { type: Number, min: 1, "default": null },
    percentage: { type: Number, min: 0, max: 100, "default": null },
    ratingBand: { type: String, "enum": ["Excellent", "Very Good", "Good", "Fair", "Needs Improvement"], "default": null },
    keyStrengths: { type: String, trim: true, "default": "", maxlength: 5000 }, areasForImprovement: { type: String, trim: true, "default": "", maxlength: 5000 },
    specificFeedback: { type: String, trim: true, "default": "", maxlength: 5000 }, actionPlan: { type: String, trim: true, "default": "", maxlength: 5000 },
    followUps: { type: [assessmentFollowUpSchema], "default": [] }, reviewSummary: { type: String, trim: true, "default": "", maxlength: 5000 },
    submittedAt: { type: Date, "default": null }, reviewedAt: { type: Date, "default": null },
    reviewedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", "default": null }
}, { timestamps: true });
assessmentSchema.pre("validate", function () {
    if (this.periodStart && this.periodEnd && this.periodEnd < this.periodStart)
        this.invalidate("periodEnd", "Assessment period end cannot precede its start.");
    if (this.kind === "CAMERA_TECHNICAL" && !this.cameraPosition)
        this.invalidate("cameraPosition", "Camera technical assessments require a camera position.");
    if (this.kind === "MONTHLY_PERFORMANCE" && (!this.periodStart || !this.periodEnd))
        this.invalidate("periodStart", "Monthly performance assessments require a start and end date.");
    if (this.subjectUserId && this.assessorUserId && this.subjectUserId.equals(this.assessorUserId))
        this.invalidate("assessorUserId", "A user cannot assess themselves.");
    var ids = this.criteriaScores.map(function (item) { return item.criterionId; });
    if (new Set(ids).size !== ids.length)
        this.invalidate("criteriaScores", "Criterion IDs must be unique within an assessment.");
    var scoresProvided = this.criteriaScores.length > 0;
    if (scoresProvided) {
        var calculatedTotal = this.criteriaScores.reduce(function (sum, item) { return sum + item.score; }, 0);
        if (this.totalScore != null && this.totalScore !== calculatedTotal)
            this.invalidate("totalScore", "Total score must equal the sum of criterion scores.");
        if (this.maximumScore != null && this.maximumScore < calculatedTotal)
            this.invalidate("maximumScore", "Maximum score cannot be less than total score.");
        if (this.totalScore != null && this.maximumScore != null && this.maximumScore > 0) {
            var calculatedPercentage = Math.round((this.totalScore / this.maximumScore) * 10000) / 100;
            if (this.percentage != null && Math.abs(this.percentage - calculatedPercentage) > 0.01)
                this.invalidate("percentage", "Percentage must match totalScore / maximumScore.");
        }
    }
    if (["SUBMITTED", "PENDING_REVIEW", "APPROVED", "REJECTED"].includes(this.status) && !this.submittedAt)
        this.invalidate("submittedAt", "Submitted assessments require submittedAt.");
    if (["APPROVED", "REJECTED"].includes(this.status) && (!this.reviewedAt || !this.reviewedBy))
        this.invalidate("reviewedAt", "Reviewed assessments require reviewedAt and reviewedBy.");
});
assessmentSchema.index({ subjectUserId: 1, kind: 1, status: 1, createdAt: -1 });
assessmentSchema.index({ assessorUserId: 1, status: 1, createdAt: -1 });
assessmentSchema.index({ serviceOccurrenceId: 1, cameraPosition: 1, kind: 1 });
assessmentSchema.index({ subjectUserId: 1, kind: 1, periodStart: 1, periodEnd: 1 });
var Assessment = mongoose_1["default"].models.Assessment || mongoose_1["default"].model("Assessment", assessmentSchema);
exports["default"] = Assessment;
