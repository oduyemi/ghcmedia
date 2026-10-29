"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var reportFeedbackSchema = new mongoose_1.Schema({
    reportId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "ServiceReport",
        required: true,
        index: true
    },
    authorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    message: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 3000
    },
    status: {
        type: String,
        "enum": ["VISIBLE", "HIDDEN"],
        "default": "VISIBLE",
        required: true
    }
}, {
    timestamps: true
});
reportFeedbackSchema.index({ reportId: 1, createdAt: -1 });
reportFeedbackSchema.index({ authorId: 1, createdAt: -1 });
var ReportFeedback = mongoose_1.models.ReportFeedback ||
    mongoose_1.model("ReportFeedback", reportFeedbackSchema);
exports["default"] = ReportFeedback;
