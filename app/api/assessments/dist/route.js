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
exports.__esModule = true;
exports.POST = void 0;
var server_1 = require("next/server");
var mongoose_1 = require("mongoose");
var db_1 = require("@/utils/db");
var serviceOccurence_model_1 = require("@/models/serviceOccurence.model");
var assessment_model_1 = require("@/models/assessment.model");
var assessmentTemplate_model_1 = require("@/models/assessmentTemplate.model");
var user_model_1 = require("@/models/user.model");
var notification_model_1 = require("@/models/notification.model");
var reporting_1 = require("@/utils/reporting");
var emailLogic_1 = require("@/helper/emailLogic");
function ratingBand(percentage) {
    if (percentage >= 90)
        return "Excellent";
    if (percentage >= 80)
        return "Very Good";
    if (percentage >= 70)
        return "Good";
    if (percentage >= 60)
        return "Fair";
    return "Needs Improvement";
}
function POST(request) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, user_1, forbidden, body, occurrence, template, subject_1, criteria, criteriaMap, seen_1, scores, _i, _b, submitted, criterion, missingRequired, totalScore, maximumScore, percentage, assessment_1, admins, eventTime_1, error_1;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 10, , 11]);
                    return [4 /*yield*/, reporting_1.authorize(["member"])];
                case 1:
                    _a = _c.sent(), user_1 = _a.user, forbidden = _a.forbidden;
                    if (forbidden)
                        return [2 /*return*/, forbidden];
                    return [4 /*yield*/, db_1.dbConnect()];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, request.json()["catch"](function () { return null; })];
                case 3:
                    body = _c.sent();
                    if (!body ||
                        !mongoose_1["default"].isValidObjectId(body === null || body === void 0 ? void 0 : body.serviceOccurrenceId) ||
                        !mongoose_1["default"].isValidObjectId(body === null || body === void 0 ? void 0 : body.templateId) ||
                        !mongoose_1["default"].isValidObjectId(body === null || body === void 0 ? void 0 : body.subjectUserId) ||
                        !Array.isArray(body === null || body === void 0 ? void 0 : body.criteriaScores)) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "Invalid assessment submission." }, { status: 400 })];
                    }
                    if (body.subjectUserId === user_1._id.toString()) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "You cannot assess yourself." }, { status: 400 })];
                    }
                    return [4 /*yield*/, serviceOccurence_model_1["default"].findOne({
                            _id: body.serviceOccurrenceId,
                            assignedReporterId: user_1._id,
                            status: { $ne: "CANCELLED" }
                        })];
                case 4:
                    occurrence = _c.sent();
                    if (!occurrence) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "You are not assigned to this service." }, { status: 403 })];
                    }
                    return [4 /*yield*/, assessmentTemplate_model_1["default"].findOne({
                            _id: body.templateId,
                            kind: "CAMERA_TECHNICAL",
                            status: "ACTIVE"
                        })];
                case 5:
                    template = _c.sent();
                    if (!template) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "Active camera assessment template not found." }, { status: 404 })];
                    }
                    return [4 /*yield*/, user_model_1["default"].findOne({
                            _id: body.subjectUserId,
                            role: "member"
                        }).select("_id")];
                case 6:
                    subject_1 = _c.sent();
                    if (!subject_1) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "Assessment subject must be a media team member." }, { status: 400 })];
                    }
                    criteria = template.criteria;
                    criteriaMap = new Map(criteria.map(function (criterion) { return [
                        criterion.criterionId,
                        criterion,
                    ]; }));
                    seen_1 = new Set();
                    scores = [];
                    for (_i = 0, _b = body.criteriaScores; _i < _b.length; _i++) {
                        submitted = _b[_i];
                        if (!submitted ||
                            typeof submitted.criterionId !== "string" ||
                            seen_1.has(submitted.criterionId)) {
                            return [2 /*return*/, server_1.NextResponse.json({ error: "Criterion IDs must be valid and unique." }, { status: 400 })];
                        }
                        seen_1.add(submitted.criterionId);
                        criterion = criteriaMap.get(submitted.criterionId);
                        if (!criterion) {
                            return [2 /*return*/, server_1.NextResponse.json({ error: "A criterion does not belong to the selected template." }, { status: 400 })];
                        }
                        if (!Number.isInteger(submitted.score) ||
                            submitted.score < 1 ||
                            submitted.score > 5) {
                            return [2 /*return*/, server_1.NextResponse.json({ error: "Criterion scores must be integers between 1 and 5." }, { status: 400 })];
                        }
                        scores.push({
                            criterionId: criterion.criterionId,
                            label: criterion.label,
                            description: criterion.description,
                            score: submitted.score,
                            comment: typeof submitted.comment === "string"
                                ? submitted.comment.slice(0, 2000)
                                : ""
                        });
                    }
                    missingRequired = criteria.filter(function (criterion) {
                        return criterion.required && !seen_1.has(criterion.criterionId);
                    });
                    if (missingRequired.length > 0) {
                        return [2 /*return*/, server_1.NextResponse.json({
                                error: "Complete all required assessment criteria.",
                                missingCriterionIds: missingRequired.map(function (criterion) { return criterion.criterionId; })
                            }, { status: 400 })];
                    }
                    totalScore = scores.reduce(function (sum, item) { return sum + item.score; }, 0);
                    maximumScore = scores.length * 5;
                    percentage = maximumScore
                        ? Math.round((totalScore / maximumScore) * 10000) / 100
                        : 0;
                    return [4 /*yield*/, assessment_model_1["default"].create({
                            kind: "CAMERA_TECHNICAL",
                            status: "PENDING_REVIEW",
                            templateId: template._id,
                            templateVersion: template.version,
                            subjectUserId: subject_1._id,
                            assessorUserId: user_1._id,
                            serviceOccurrenceId: occurrence._id,
                            cameraPosition: body.cameraPosition,
                            criteriaScores: scores,
                            totalScore: totalScore,
                            maximumScore: maximumScore,
                            percentage: percentage,
                            ratingBand: ratingBand(percentage),
                            keyStrengths: typeof body.keyStrengths === "string" ? body.keyStrengths.slice(0, 5000) : "",
                            areasForImprovement: typeof body.areasForImprovement === "string" ? body.areasForImprovement.slice(0, 5000) : "",
                            specificFeedback: typeof body.specificFeedback === "string" ? body.specificFeedback.slice(0, 5000) : "",
                            actionPlan: typeof body.actionPlan === "string" ? body.actionPlan.slice(0, 5000) : "",
                            followUps: Array.isArray(body.followUps) ? body.followUps : [],
                            submittedAt: new Date()
                        })];
                case 7:
                    assessment_1 = _c.sent();
                    return [4 /*yield*/, reporting_1.getAdmins()];
                case 8:
                    admins = _c.sent();
                    eventTime_1 = assessment_1.submittedAt.toISOString();
                    return [4 /*yield*/, Promise.allSettled(admins.map(function (admin) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, notification_model_1["default"].create({
                                            recipient: admin._id,
                                            actor: user_1._id,
                                            type: "ASSESSMENT_SUBMITTED",
                                            title: "Assessment submitted for review",
                                            message: user_1.fname + " " + user_1.lname + " submitted a camera assessment for " + subject_1._id + ".",
                                            resourceType: "ASSESSMENT",
                                            resourceId: assessment_1._id,
                                            href: "/admin/assessments/" + assessment_1._id,
                                            eventKey: "ASSESSMENT_SUBMITTED:" + assessment_1._id + ":" + admin._id + ":" + eventTime_1
                                        })];
                                    case 1:
                                        _a.sent();
                                        if (!admin.email) return [3 /*break*/, 3];
                                        return [4 /*yield*/, emailLogic_1.sendEmailWithRetry(admin.email, "Media assessment submitted for review", "<p>A camera assessment has been submitted for review.</p><p><a href=\"" + (process.env.APP_URL || "https://ghcmedia.vercel.app") + "/admin/assessments/" + assessment_1._id + "\">Review assessment</a></p>")];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 9:
                    _c.sent();
                    return [2 /*return*/, server_1.NextResponse.json({ message: "Assessment submitted for review.", assessment: assessment_1 }, { status: 201 })];
                case 10:
                    error_1 = _c.sent();
                    console.error("SUBMIT ASSESSMENT ERROR:", error_1);
                    return [2 /*return*/, server_1.NextResponse.json({ error: "Unable to submit assessment." }, { status: 500 })];
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.POST = POST;
