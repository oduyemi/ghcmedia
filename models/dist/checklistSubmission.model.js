"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var checklistItemRecordSchema = new mongoose_1.Schema({
    itemId: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    requirement: {
        type: String,
        trim: true,
        "default": "",
        maxlength: 2000
    },
    required: {
        type: Boolean,
        "default": true,
        required: true
    },
    status: {
        type: String,
        "enum": ["COMPLETED", "NOT_COMPLETED", "NOT_APPLICABLE", "PENDING_REVIEW"],
        required: true,
        "default": "PENDING_REVIEW"
    },
    notes: {
        type: String,
        trim: true,
        "default": "",
        maxlength: 2000
    }
}, { _id: false });
var checklistSubmissionSchema = new mongoose_1.Schema({
    serviceOccurrenceId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "ServiceOccurrence",
        required: true,
        index: true
    },
    templateId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "ChecklistTemplate",
        required: true
    },
    templateVersion: {
        type: Number,
        required: true,
        min: 1,
        validate: Number.isInteger
    },
    submittedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    items: {
        type: [checklistItemRecordSchema],
        "default": [],
        validate: [
            function (items) {
                return items.length > 0;
            },
            "A submission must contain checklist items."
        ]
    },
    submissionStatus: {
        type: String,
        "enum": ["SUBMITTED", "PENDING_REVIEW", "APPROVED", "REJECTED"],
        "default": "SUBMITTED",
        required: true,
        index: true
    },
    submittedAt: {
        type: Date,
        "default": null
    },
    reviewedAt: {
        type: Date,
        "default": null
    },
    reviewedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        "default": null
    },
    observations: {
        type: String,
        trim: true,
        "default": "",
        maxlength: 5000
    }
}, { timestamps: true });
checklistSubmissionSchema.pre("validate", function () {
    var ids = this.items.map(function (item) { return item.itemId.trim(); });
    if (new Set(ids).size !== ids.length)
        this.invalidate("items", "Checklist item IDs must be unique within a submission.");
    if (!this.submittedAt && this.isNew)
        this.submittedAt = new Date();
    if (this.submissionStatus === "APPROVED" && (!this.reviewedAt || !this.reviewedBy)) {
        this.invalidate("reviewedAt", "Approved submissions require reviewedAt and reviewedBy.");
    }
    if (this.submissionStatus !== "APPROVED" && (this.reviewedAt || this.reviewedBy)) {
        this.invalidate("reviewedAt", "Review metadata is only allowed after approval.");
    }
});
// Intentional rule: one checklist submission per user per service occurrence, regardless of template.
checklistSubmissionSchema.index({ serviceOccurrenceId: 1, submittedBy: 1 }, { unique: true, name: "one_checklist_submission_per_user_occurrence" });
checklistSubmissionSchema.index({ submissionStatus: 1, submittedAt: -1 });
var ChecklistSubmission = mongoose_1["default"].models.ChecklistSubmission || mongoose_1["default"].model("ChecklistSubmission", checklistSubmissionSchema);
exports["default"] = ChecklistSubmission;
