"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var notificationSchema = new mongoose_1.Schema({
    recipient: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    actor: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        "default": null
    },
    type: {
        type: String,
        "enum": [
            "CHECKLIST_SUBMITTED",
            "CHECKLIST_APPROVED",
            "ASSESSMENT_SUBMITTED",
            "ASSESSMENT_APPROVED",
            "ASSESSMENT_REJECTED",
            "REPORT_APPROVED",
            "REPORT_PUBLISHED",
        ],
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    resourceType: {
        type: String,
        "enum": ["CHECKLIST", "ASSESSMENT", "SERVICE_REPORT"],
        required: true
    },
    resourceId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    href: {
        type: String,
        required: true
    },
    eventKey: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        "default": false,
        index: true
    },
    readAt: {
        type: Date,
        "default": null
    }
}, { timestamps: true });
notificationSchema.index({ recipient: 1, eventKey: 1 }, { unique: true });
var Notification = mongoose_1["default"].models.Notification ||
    mongoose_1["default"].model("Notification", notificationSchema);
exports["default"] = Notification;
