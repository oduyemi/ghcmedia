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
var serviceReport_model_1 = require("@/models/serviceReport.model");
var assessment_model_1 = require("@/models/assessment.model");
var checklistSubmission_model_1 = require("@/models/checklistSubmission.model");
var notification_model_1 = require("@/models/notification.model");
var reporting_1 = require("@/utils/reporting");
var emailLogic_1 = require("@/helper/emailLogic");
function POST(request) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, user_1, forbidden, body, occurrence, assessmentIds, checklistIds, _b, assessments, checklists, report_1, admins, eventTime_1, error_1;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 9, , 10]);
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
                        typeof body.serviceOccurrenceId !== "string" ||
                        !mongoose_1["default"].isValidObjectId(body.serviceOccurrenceId) ||
                        typeof body.title !== "string" ||
                        !body.title.trim()) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "A service occurrence and report title are required." }, { status: 400 })];
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
                    assessmentIds = Array.isArray(body.sourceAssessmentIds)
                        ? body.sourceAssessmentIds
                        : [];
                    checklistIds = Array.isArray(body.sourceChecklistSubmissionIds)
                        ? body.sourceChecklistSubmissionIds
                        : [];
                    if (!assessmentIds.every(function (id) { return typeof id === "string" && mongoose_1["default"].isValidObjectId(id); }) ||
                        !checklistIds.every(function (id) { return typeof id === "string" && mongoose_1["default"].isValidObjectId(id); })) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "Invalid source record IDs." }, { status: 400 })];
                    }
                    return [4 /*yield*/, Promise.all([
                            assessment_model_1["default"].find({
                                _id: { $in: assessmentIds },
                                serviceOccurrenceId: occurrence._id,
                                assessorUserId: user_1._id,
                                status: "APPROVED"
                            }).select("_id"),
                            checklistSubmission_model_1["default"].find({
                                _id: { $in: checklistIds },
                                serviceOccurrenceId: occurrence._id,
                                submittedBy: user_1._id,
                                submissionStatus: "APPROVED"
                            }).select("_id"),
                        ])];
                case 5:
                    _b = _c.sent(), assessments = _b[0], checklists = _b[1];
                    if (assessments.length !== new Set(assessmentIds).size ||
                        checklists.length !== new Set(checklistIds).size) {
                        return [2 /*return*/, server_1.NextResponse.json({
                                error: "Source records must be approved records belonging to this service and submitted by you."
                            }, { status: 400 })];
                    }
                    return [4 /*yield*/, serviceReport_model_1["default"].create({
                            title: body.title.trim().slice(0, 200),
                            reportType: "SERVICE",
                            serviceType: occurrence.serviceType,
                            serviceOccurrenceId: occurrence._id,
                            date: occurrence.startsAt,
                            status: "PENDING_REVIEW",
                            visibility: "PRIVATE",
                            summary: {
                                completedAssessments: assessments.length,
                                pendingAssessments: 0,
                                checklistCompletionPercentage: null,
                                approvedAverageRating: null
                            },
                            highlights: [],
                            approvedPublicSummary: "",
                            sourceAssessmentIds: assessments.map(function (item) { return item._id; }),
                            sourceChecklistSubmissionIds: checklists.map(function (item) { return item._id; }),
                            createdBy: user_1._id
                        })];
                case 6:
                    report_1 = _c.sent();
                    return [4 /*yield*/, reporting_1.getAdmins()];
                case 7:
                    admins = _c.sent();
                    eventTime_1 = new Date().toISOString();
                    return [4 /*yield*/, Promise.allSettled(admins.map(function (admin) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, notification_model_1["default"].create({
                                            recipient: admin._id,
                                            actor: user_1._id,
                                            type: "REPORT_SUBMITTED",
                                            title: "Service report submitted",
                                            message: user_1.fname + " " + user_1.lname + " submitted \"" + report_1.title + "\" for review.",
                                            resourceType: "SERVICE_REPORT",
                                            resourceId: report_1._id,
                                            href: "/admin/service-reports/" + report_1._id,
                                            eventKey: "REPORT_SUBMITTED:" + report_1._id + ":" + admin._id + ":" + eventTime_1
                                        })];
                                    case 1:
                                        _a.sent();
                                        if (!admin.email) return [3 /*break*/, 3];
                                        return [4 /*yield*/, emailLogic_1.sendEmailWithRetry(admin.email, "Service report submitted for review", "<p>The service report <strong>" + report_1.title + "</strong> is awaiting review.</p><p><a href=\"" + (process.env.APP_URL || "https://ghcmedia.vercel.app") + "/admin/service-reports/" + report_1._id + "\">Review report</a></p>")];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 8:
                    _c.sent();
                    return [2 /*return*/, server_1.NextResponse.json({ message: "Report submitted for review.", report: report_1 }, { status: 201 })];
                case 9:
                    error_1 = _c.sent();
                    console.error("SUBMIT SERVICE REPORT ERROR:", error_1);
                    return [2 /*return*/, server_1.NextResponse.json({ error: "Unable to submit service report." }, { status: 500 })];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.POST = POST;
