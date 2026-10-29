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
exports.POST = void 0;
var server_1 = require("next/server");
var mongoose_1 = require("mongoose");
var db_1 = require("@/utils/db");
var auth_1 = require("@/utils/auth");
var reportFeedback_model_1 = require("@/models/reportFeedback.model");
var serviceReport_model_1 = require("@/models/serviceReport.model");
var notification_model_1 = require("@/models/notification.model");
var user_model_1 = require("@/models/user.model");
var ALLOWED_ROLES = ["pastor", "other"];
var OBJECT_ID_REGEX = /^[a-f\d]{24}$/i;
function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var user_1, forbidden, body, _a, reportId, message, report_1, feedback_1, admins, notificationResults, failedNotifications, notificationError_1, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 15, , 16]);
                    return [4 /*yield*/, db_1.dbConnect()];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, auth_1.getCurrentUser()];
                case 2:
                    user_1 = _b.sent();
                    if (!user_1) {
                        return [2 /*return*/, server_1.NextResponse.json({ success: false, message: "Authentication required." }, { status: 401 })];
                    }
                    forbidden = auth_1.requireRole(user_1, __spreadArrays(ALLOWED_ROLES));
                    if (forbidden) {
                        return [2 /*return*/, forbidden];
                    }
                    body = void 0;
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, req.json()];
                case 4:
                    body = _b.sent();
                    return [3 /*break*/, 6];
                case 5:
                    _a = _b.sent();
                    return [2 /*return*/, server_1.NextResponse.json({ success: false, message: "Invalid JSON request body." }, { status: 400 })];
                case 6:
                    reportId = typeof body.reportId === "string" ? body.reportId.trim() : "";
                    message = typeof body.message === "string" ? body.message.trim() : "";
                    if (!OBJECT_ID_REGEX.test(reportId)) {
                        return [2 /*return*/, server_1.NextResponse.json({ success: false, message: "A valid report ID is required." }, { status: 400 })];
                    }
                    if (message.length < 3 || message.length > 3000) {
                        return [2 /*return*/, server_1.NextResponse.json({
                                success: false,
                                message: "Feedback must contain between 3 and 3000 characters."
                            }, { status: 400 })];
                    }
                    return [4 /*yield*/, serviceReport_model_1["default"].findOne({
                            _id: new mongoose_1["default"].Types.ObjectId(reportId),
                            status: "PUBLISHED",
                            visibility: "PUBLIC"
                        })
                            .select("_id title")
                            .lean()];
                case 7:
                    report_1 = _b.sent();
                    if (!report_1) {
                        return [2 /*return*/, server_1.NextResponse.json({
                                success: false,
                                message: "The requested public report was not found."
                            }, { status: 404 })];
                    }
                    return [4 /*yield*/, reportFeedback_model_1["default"].create({
                            reportId: report_1._id,
                            authorId: user_1._id,
                            message: message,
                            status: "VISIBLE"
                        })];
                case 8:
                    feedback_1 = _b.sent();
                    _b.label = 9;
                case 9:
                    _b.trys.push([9, 13, , 14]);
                    return [4 /*yield*/, user_model_1["default"].find({ role: "admin" })
                            .select("_id")
                            .lean()];
                case 10:
                    admins = _b.sent();
                    if (!(admins.length > 0)) return [3 /*break*/, 12];
                    return [4 /*yield*/, Promise.allSettled(admins.map(function (admin) {
                            var eventKey = "report-feedback:" + feedback_1._id;
                            return notification_model_1["default"].updateOne({
                                recipient: admin._id,
                                eventKey: eventKey
                            }, {
                                $setOnInsert: {
                                    recipient: admin._id,
                                    actor: user_1._id,
                                    type: "REPORT_FEEDBACK_SUBMITTED",
                                    title: "New report feedback",
                                    message: "A visitor submitted feedback on \"" + report_1.title + "\".",
                                    resourceType: "REPORT_FEEDBACK",
                                    resourceId: feedback_1._id,
                                    href: "/admin/ratings/" + report_1._id,
                                    eventKey: eventKey,
                                    read: false,
                                    readAt: null
                                }
                            }, { upsert: true });
                        }))];
                case 11:
                    notificationResults = _b.sent();
                    failedNotifications = notificationResults.filter(function (result) { return result.status === "rejected"; });
                    if (failedNotifications.length > 0) {
                        console.error(failedNotifications.length + " feedback notification(s) could not be saved.");
                    }
                    _b.label = 12;
                case 12: return [3 /*break*/, 14];
                case 13:
                    notificationError_1 = _b.sent();
                    console.error("Feedback was saved, but administrator notifications could not be processed:", notificationError_1);
                    return [3 /*break*/, 14];
                case 14: 
                // 7. Return success because the feedback itself was saved.
                return [2 /*return*/, server_1.NextResponse.json({
                        success: true,
                        message: "Your feedback has been submitted successfully.",
                        data: {
                            id: feedback_1._id,
                            reportId: feedback_1.reportId,
                            message: feedback_1.message,
                            status: feedback_1.status,
                            createdAt: feedback_1.createdAt
                        }
                    }, { status: 201 })];
                case 15:
                    error_1 = _b.sent();
                    console.error("Report feedback submission failed:", error_1);
                    return [2 /*return*/, server_1.NextResponse.json({
                            success: false,
                            message: "Unable to submit feedback at this time."
                        }, { status: 500 })];
                case 16: return [2 /*return*/];
            }
        });
    });
}
exports.POST = POST;
