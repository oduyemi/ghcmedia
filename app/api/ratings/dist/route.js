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
exports.GET = void 0;
var server_1 = require("next/server");
var db_1 = require("@/utils/db");
var serviceReport_model_1 = require("@/models/serviceReport.model");
var assessment_model_1 = require("@/models/assessment.model");
var reporting_1 = require("@/utils/reporting");
function average(values) {
    var validValues = values.filter(function (value) {
        return typeof value === "number" &&
            Number.isFinite(value) &&
            value >= 0 &&
            value <= 100;
    });
    if (validValues.length === 0)
        return null;
    return (validValues.reduce(function (sum, value) { return sum + value; }, 0) /
        validValues.length);
}
function GET() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, user, forbidden, reports_1, metrics_1, _b, approvedAssessments, outstandingReviews, reports, metrics, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, reporting_1.authorize([
                            "admin",
                            "member",
                            "pastor",
                            "other",
                        ])];
                case 1:
                    _a = _c.sent(), user = _a.user, forbidden = _a.forbidden;
                    if (forbidden)
                        return [2 /*return*/, forbidden];
                    if (!user) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "Authentication required." }, { status: 401 })];
                    }
                    return [4 /*yield*/, db_1.dbConnect()];
                case 2:
                    _c.sent();
                    if (!(user.role === "pastor" || user.role === "other")) return [3 /*break*/, 4];
                    return [4 /*yield*/, serviceReport_model_1["default"].find({
                            status: "PUBLISHED",
                            visibility: "PUBLIC"
                        })
                            .select("title reportType serviceType serviceOccurrenceId date status visibility summary approvedPublicSummary highlights publishedAt")
                            .sort({ publishedAt: -1 })
                            .lean()];
                case 3:
                    reports_1 = _c.sent();
                    metrics_1 = {
                        approvedAverageRating: average(reports_1.map(function (report) { var _a; return (_a = report.summary) === null || _a === void 0 ? void 0 : _a.approvedAverageRating; })),
                        servicesAssessed: new Set(reports_1
                            .map(function (report) { var _a; return (_a = report.serviceOccurrenceId) === null || _a === void 0 ? void 0 : _a.toString(); })
                            .filter(function (id) { return Boolean(id); })).size,
                        checklistCompletion: average(reports_1.map(function (report) { var _a; return (_a = report.summary) === null || _a === void 0 ? void 0 : _a.checklistCompletionPercentage; })),
                        areasForImprovement: null,
                        outstandingReviews: null,
                        assessmentsCount: null
                    };
                    return [2 /*return*/, server_1.NextResponse.json({ reports: reports_1, metrics: metrics_1 })];
                case 4: return [4 /*yield*/, Promise.all([
                        assessment_model_1["default"].find({ status: "APPROVED" })
                            .select("percentage serviceOccurrenceId areasForImprovement")
                            .lean(),
                        assessment_model_1["default"].countDocuments({
                            status: { $in: ["SUBMITTED", "PENDING_REVIEW"] }
                        }),
                        serviceReport_model_1["default"].find({
                            status: { $in: ["APPROVED", "PUBLISHED"] }
                        })
                            .select("title reportType serviceType serviceOccurrenceId date status visibility summary approvedPublicSummary highlights publishedAt")
                            .sort({ date: -1 })
                            .lean(),
                    ])];
                case 5:
                    _b = _c.sent(), approvedAssessments = _b[0], outstandingReviews = _b[1], reports = _b[2];
                    metrics = {
                        approvedAverageRating: average(approvedAssessments.map(function (assessment) { return assessment.percentage; })),
                        servicesAssessed: new Set(approvedAssessments
                            .map(function (assessment) { var _a; return (_a = assessment.serviceOccurrenceId) === null || _a === void 0 ? void 0 : _a.toString(); })
                            .filter(function (id) { return Boolean(id); })).size,
                        checklistCompletion: average(reports.map(function (report) { var _a; return (_a = report.summary) === null || _a === void 0 ? void 0 : _a.checklistCompletionPercentage; })),
                        areasForImprovement: approvedAssessments.filter(function (assessment) {
                            return typeof assessment.areasForImprovement === "string" &&
                                assessment.areasForImprovement.trim().length > 0;
                        }).length,
                        outstandingReviews: outstandingReviews,
                        assessmentsCount: approvedAssessments.length
                    };
                    return [2 /*return*/, server_1.NextResponse.json({
                            reports: reports,
                            assessments: approvedAssessments,
                            metrics: metrics
                        })];
                case 6:
                    error_1 = _c.sent();
                    console.error("GET RATINGS ERROR:", error_1);
                    return [2 /*return*/, server_1.NextResponse.json({ error: "Unable to load ratings." }, { status: 500 })];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.GET = GET;
