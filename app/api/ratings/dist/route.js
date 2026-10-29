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
function GET() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, user, forbidden, reports_1, assessments, reports, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, reporting_1.authorize([
                            "admin",
                            "member",
                            "pastor",
                            "other",
                        ])];
                case 1:
                    _a = _b.sent(), user = _a.user, forbidden = _a.forbidden;
                    if (forbidden)
                        return [2 /*return*/, forbidden];
                    return [4 /*yield*/, db_1.dbConnect()];
                case 2:
                    _b.sent();
                    if (!(user.role === "pastor" || user.role === "other")) return [3 /*break*/, 4];
                    return [4 /*yield*/, serviceReport_model_1["default"].find({
                            status: "PUBLISHED",
                            visibility: "PUBLIC"
                        })
                            .select("title reportType serviceType date approvedPublicSummary highlights summary publishedAt")
                            .sort({ publishedAt: -1 })
                            .lean()];
                case 3:
                    reports_1 = _b.sent();
                    return [2 /*return*/, server_1.NextResponse.json({ reports: reports_1 })];
                case 4: return [4 /*yield*/, assessment_model_1["default"].find({
                        status: "APPROVED"
                    })
                        .select("kind subjectUserId assessorUserId serviceOccurrenceId cameraPosition totalScore maximumScore percentage ratingBand submittedAt reviewedAt")
                        .sort({ reviewedAt: -1 })
                        .lean()];
                case 5:
                    assessments = _b.sent();
                    return [4 /*yield*/, serviceReport_model_1["default"].find({
                            status: { $in: ["APPROVED", "PUBLISHED"] }
                        })
                            .select("title reportType serviceType date status visibility summary approvedPublicSummary highlights publishedAt")
                            .sort({ date: -1 })
                            .lean()];
                case 6:
                    reports = _b.sent();
                    return [2 /*return*/, server_1.NextResponse.json({ assessments: assessments, reports: reports })];
                case 7:
                    error_1 = _b.sent();
                    console.error("GET RATINGS ERROR:", error_1);
                    return [2 /*return*/, server_1.NextResponse.json({ error: "Unable to load ratings." }, { status: 500 })];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.GET = GET;
