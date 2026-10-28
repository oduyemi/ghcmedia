"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var messageSchema = new mongoose_1.Schema({
    threadId: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    contextType: {
        type: String,
        "enum": ["GENERAL", "ASSESSMENT", "CHECKLIST", "SERVICE_REPORT"],
        "default": "GENERAL",
        required: true,
        index: true
    },
    assessment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Assessment",
        "default": null
    },
    checklistSubmission: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "ChecklistSubmission",
        "default": null
    },
    serviceReport: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "ServiceReport",
        "default": null
    },
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    recipient: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    content: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 10000
    },
    read: {
        type: Boolean,
        "default": false,
        index: true
    },
    readAt: {
        type: Date,
        "default": null
    },
    replyTo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Message",
        "default": null
    }
}, { timestamps: true });
messageSchema.pre("validate", function () {
    var references = [
        this.assessment,
        this.checklistSubmission,
        this.serviceReport,
    ].filter(Boolean);
    if (references.length > 1) {
        this.invalidate("contextType", "A message can reference only one contextual resource.");
    }
    var expectedReference = {
        GENERAL: null,
        ASSESSMENT: this.assessment,
        CHECKLIST: this.checklistSubmission,
        SERVICE_REPORT: this.serviceReport
    }[this.contextType];
    if (this.contextType !== "GENERAL" && !expectedReference) {
        this.invalidate("contextType", "The selected context requires its corresponding resource reference.");
    }
    if (this.contextType === "GENERAL" && references.length) {
        this.invalidate("contextType", "General messages cannot reference a contextual resource.");
    }
    if (this.sender && this.recipient && this.sender.equals(this.recipient)) {
        this.invalidate("recipient", "You cannot message yourself.");
    }
});
messageSchema.index({ threadId: 1, createdAt: 1 });
messageSchema.index({ recipient: 1, read: 1, createdAt: -1 });
messageSchema.index({ sender: 1, recipient: 1, createdAt: -1 });
messageSchema.index({ sender: 1, recipient: 1, contextType: 1, assessment: 1 });
var Message = mongoose_1["default"].models.Message ||
    mongoose_1["default"].model("Message", messageSchema);
exports["default"] = Message;
