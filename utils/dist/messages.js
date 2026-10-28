"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.sendMessage = exports.validateMessageContext = void 0;
var mongoose_1 = require("mongoose");
var user_model_1 = require("@/models/user.model");
var message_model_1 = require("@/models/message.model");
var assessment_model_1 = require("@/models/assessment.model");
var checklistSubmission_model_1 = require("@/models/checklistSubmission.model");
var serviceReport_model_1 = require("@/models/serviceReport.model");
var auth_1 = require("@/utils/auth");
function isValidId(id) {
    return Boolean(id && mongoose_1["default"].Types.ObjectId.isValid(id));
}
function buildThreadId(senderId, recipientId, contextType, contextId) {
    var participants = [senderId, recipientId].sort();
    return __spreadArrays(participants, [
        contextType,
        contextId !== null && contextId !== void 0 ? contextId : "general",
    ]).join(":");
}
function validateMessageContext(context, user, recipientId) {
    return __awaiter(this, void 0, void 0, function () {
        var references, recipient, contextId, assessment, allowedParticipants, checklist, report;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    references = [
                        context.assessmentId,
                        context.checklistSubmissionId,
                        context.serviceReportId,
                    ].filter(Boolean);
                    if (references.length > 1) {
                        return [2 /*return*/, { error: "A message can reference only one resource.", status: 400 }];
                    }
                    return [4 /*yield*/, user_model_1["default"].findById(recipientId)
                            .select("_id role")
                            .lean()];
                case 1:
                    recipient = _a.sent();
                    if (!recipient) {
                        return [2 /*return*/, { error: "Recipient not found.", status: 404 }];
                    }
                    if (String(user._id) === String(recipient._id)) {
                        return [2 /*return*/, { error: "You cannot message yourself.", status: 400 }];
                    }
                    if (!context.assessmentId) return [3 /*break*/, 3];
                    if (!isValidId(context.assessmentId)) {
                        return [2 /*return*/, { error: "Invalid assessment ID.", status: 400 }];
                    }
                    return [4 /*yield*/, assessment_model_1["default"].findById(context.assessmentId).lean()];
                case 2:
                    assessment = _a.sent();
                    if (!assessment) {
                        return [2 /*return*/, { error: "Assessment not found.", status: 404 }];
                    }
                    allowedParticipants = [
                        String(assessment.subjectUserId),
                        String(assessment.assessorUserId),
                    ];
                    if (user.role === "member" && !allowedParticipants.includes(String(user._id))) {
                        return [2 /*return*/, { error: "You cannot access this assessment.", status: 403 }];
                    }
                    if (user.role === "admin" &&
                        !allowedParticipants.includes(String(recipient._id))) {
                        return [2 /*return*/, { error: "The recipient is not associated with this assessment.", status: 403 }];
                    }
                    if (user.role === "member" &&
                        recipient.role !== "admin") {
                        return [2 /*return*/, { error: "Members can only message administrators.", status: 403 }];
                    }
                    if (user.role === "admin" &&
                        recipient.role !== "member") {
                        return [2 /*return*/, { error: "Admins can only message members in this conversation.", status: 403 }];
                    }
                    contextId = String(assessment._id);
                    return [3 /*break*/, 8];
                case 3:
                    if (!context.checklistSubmissionId) return [3 /*break*/, 5];
                    if (!isValidId(context.checklistSubmissionId)) {
                        return [2 /*return*/, { error: "Invalid checklist submission ID.", status: 400 }];
                    }
                    return [4 /*yield*/, checklistSubmission_model_1["default"].findById(context.checklistSubmissionId).lean()];
                case 4:
                    checklist = _a.sent();
                    if (!checklist) {
                        return [2 /*return*/, { error: "Checklist submission not found.", status: 404 }];
                    }
                    if (user.role === "member" &&
                        String(checklist.submittedBy) !== String(user._id)) {
                        return [2 /*return*/, { error: "You cannot access this checklist submission.", status: 403 }];
                    }
                    if (user.role === "member" && recipient.role !== "admin") {
                        return [2 /*return*/, { error: "Members can only message administrators.", status: 403 }];
                    }
                    if (user.role === "admin") {
                        if (recipient.role !== "member" || String(recipient._id) !== String(checklist.submittedBy)) {
                            return [2 /*return*/, { error: "Admins can only message the checklist submitter in this conversation.", status: 403 }];
                        }
                    }
                    contextId = String(checklist._id);
                    return [3 /*break*/, 8];
                case 5:
                    if (!context.serviceReportId) return [3 /*break*/, 7];
                    if (!isValidId(context.serviceReportId)) {
                        return [2 /*return*/, { error: "Invalid report ID.", status: 400 }];
                    }
                    return [4 /*yield*/, serviceReport_model_1["default"].findById(context.serviceReportId).lean()];
                case 6:
                    report = _a.sent();
                    if (!report) {
                        return [2 /*return*/, { error: "Service report not found.", status: 404 }];
                    }
                    if (user.role === "member" &&
                        String(report.createdBy) !== String(user._id) &&
                        report.visibility !== "PUBLIC") {
                        return [2 /*return*/, { error: "You cannot access this report.", status: 403 }];
                    }
                    if (user.role === "member" && recipient.role !== "admin") {
                        return [2 /*return*/, { error: "Members can only message administrators.", status: 403 }];
                    }
                    if (user.role === "admin" &&
                        (recipient.role !== "member" || String(recipient._id) !== String(report.createdBy))) {
                        return [2 /*return*/, { error: "Admins can only message the report creator in this conversation.", status: 403 }];
                    }
                    contextId = String(report._id);
                    return [3 /*break*/, 8];
                case 7:
                    if (user.role === recipient.role) {
                        return [2 /*return*/, { error: "General conversations are only available between members and admins.", status: 403 }];
                    }
                    _a.label = 8;
                case 8: return [2 /*return*/, {
                        error: null,
                        status: 200,
                        recipient: recipient,
                        contextId: contextId
                    }];
            }
        });
    });
}
exports.validateMessageContext = validateMessageContext;
function sendMessage(input) {
    var _a, _b, _c, _d, _e, _f, _g;
    return __awaiter(this, void 0, void 0, function () {
        var currentUser, content, context, validation, refs, parent, threadId, message;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0: return [4 /*yield*/, auth_1.getCurrentUser()];
                case 1:
                    currentUser = _h.sent();
                    if (!currentUser) {
                        return [2 /*return*/, { error: "Unauthorized.", status: 401, message: null }];
                    }
                    content = (_a = input.content) === null || _a === void 0 ? void 0 : _a.trim();
                    if (!content || content.length > 10000) {
                        return [2 /*return*/, { error: "Message content must be between 1 and 10000 characters.", status: 400, message: null }];
                    }
                    if (!isValidId(input.recipientId)) {
                        return [2 /*return*/, { error: "Invalid recipient ID.", status: 400, message: null }];
                    }
                    context = {
                        contextType: (_b = input.contextType) !== null && _b !== void 0 ? _b : "GENERAL",
                        assessmentId: input.assessmentId,
                        checklistSubmissionId: input.checklistSubmissionId,
                        serviceReportId: input.serviceReportId
                    };
                    return [4 /*yield*/, validateMessageContext(context, currentUser, input.recipientId)];
                case 2:
                    validation = _h.sent();
                    if (validation.error || !validation.recipient) {
                        return [2 /*return*/, {
                                error: (_c = validation.error) !== null && _c !== void 0 ? _c : "Invalid message context.",
                                status: validation.status,
                                message: null
                            }];
                    }
                    refs = [
                        input.assessmentId,
                        input.checklistSubmissionId,
                        input.serviceReportId,
                    ].filter(Boolean);
                    if (context.contextType === "GENERAL" && refs.length) {
                        return [2 /*return*/, { error: "General messages cannot reference a resource.", status: 400, message: null }];
                    }
                    if (context.contextType !== "GENERAL" && refs.length !== 1) {
                        return [2 /*return*/, { error: "Select exactly one resource for this message.", status: 400, message: null }];
                    }
                    if (!input.replyToId) return [3 /*break*/, 4];
                    if (!isValidId(input.replyToId)) {
                        return [2 /*return*/, { error: "Invalid reply reference.", status: 400, message: null }];
                    }
                    return [4 /*yield*/, message_model_1["default"].findById(input.replyToId).lean()];
                case 3:
                    parent = _h.sent();
                    if (!parent ||
                        parent.threadId !== buildThreadId(String(currentUser._id), input.recipientId, context.contextType, validation.contextId)) {
                        return [2 /*return*/, { error: "The referenced message does not belong to this conversation.", status: 400, message: null }];
                    }
                    _h.label = 4;
                case 4:
                    threadId = buildThreadId(String(currentUser._id), input.recipientId, context.contextType, validation.contextId);
                    return [4 /*yield*/, message_model_1["default"].create({
                            threadId: threadId,
                            contextType: context.contextType,
                            assessment: (_d = input.assessmentId) !== null && _d !== void 0 ? _d : null,
                            checklistSubmission: (_e = input.checklistSubmissionId) !== null && _e !== void 0 ? _e : null,
                            serviceReport: (_f = input.serviceReportId) !== null && _f !== void 0 ? _f : null,
                            sender: currentUser._id,
                            recipient: input.recipientId,
                            content: content,
                            replyTo: (_g = input.replyToId) !== null && _g !== void 0 ? _g : null
                        })];
                case 5:
                    message = _h.sent();
                    return [2 /*return*/, { error: null, status: 201, message: message }];
            }
        });
    });
}
exports.sendMessage = sendMessage;
