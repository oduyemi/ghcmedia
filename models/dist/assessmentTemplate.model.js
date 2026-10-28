"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var assessmentCriterionSchema = new mongoose_1.Schema({
    criterionId: { type: String, required: true, trim: true, minlength: 1 },
    label: { type: String, required: true, trim: true, maxlength: 160 },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
    required: { type: Boolean, "default": true, required: true },
    sortOrder: { type: Number, "default": 0, min: 0, required: true }
}, { _id: false });
var assessmentTemplateSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true, maxlength: 160 },
    kind: { type: String, "enum": ["CAMERA_TECHNICAL", "MONTHLY_PERFORMANCE"], required: true, index: true },
    frequency: { type: String, "enum": ["WEEKLY", "MONTHLY"], required: true },
    version: { type: Number, required: true, min: 1, validate: Number.isInteger },
    status: { type: String, "enum": ["DRAFT", "ACTIVE", "ARCHIVED"], "default": "DRAFT", required: true, index: true },
    criteria: {
        type: [assessmentCriterionSchema],
        required: true,
        validate: [
            function (criteria) { return criteria.length > 0; },
            "An assessment template must contain criteria.",
        ]
    },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });
assessmentTemplateSchema.index({ name: 1, version: 1 }, { unique: true, name: "unique_assessment_template_version" });
assessmentTemplateSchema.pre("validate", function () {
    var ids = this.criteria.map(function (criterion) { return criterion.criterionId.trim(); });
    if (new Set(ids).size !== ids.length) {
        this.invalidate("criteria", "Criterion IDs must be unique within a template version.");
    }
});
var AssessmentTemplate = mongoose_1["default"].models.AssessmentTemplate || mongoose_1["default"].model("AssessmentTemplate", assessmentTemplateSchema);
exports["default"] = AssessmentTemplate;
