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
exports.GET = exports.runtime = void 0;
var server_1 = require("next/server");
var db_1 = require("@/utils/db");
var auth_1 = require("@/utils/auth");
var reportFeedback_model_1 = require("@/models/reportFeedback.model");
exports.runtime = "nodejs";
var ALLOWED_ROLES = ["admin", "member", "pastor", "other"];
function GET(req) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var user, forbidden, searchParams, requestedPage, requestedLimit, page, limit, skip, filter, _c, feedback, total, totalPages, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, db_1.dbConnect()];
                case 1:
                    _d.sent();
                    return [4 /*yield*/, auth_1.getCurrentUser()];
                case 2:
                    user = _d.sent();
                    if (!user) {
                        return [2 /*return*/, server_1.NextResponse.json({ success: false, message: "Authentication required." }, { status: 401 })];
                    }
                    forbidden = auth_1.requireRole(user, __spreadArrays(ALLOWED_ROLES));
                    if (forbidden) {
                        return [2 /*return*/, forbidden];
                    }
                    searchParams = req.nextUrl.searchParams;
                    requestedPage = Number((_a = searchParams.get("page")) !== null && _a !== void 0 ? _a : 1);
                    requestedLimit = Number((_b = searchParams.get("limit")) !== null && _b !== void 0 ? _b : 20);
                    page = Number.isFinite(requestedPage) && requestedPage > 0
                        ? Math.floor(requestedPage)
                        : 1;
                    limit = Number.isFinite(requestedLimit) && requestedLimit > 0
                        ? Math.min(Math.floor(requestedLimit), 100)
                        : 20;
                    skip = (page - 1) * limit;
                    filter = { authorId: user._id };
                    return [4 /*yield*/, Promise.all([
                            reportFeedback_model_1["default"].find(filter)
                                .populate({
                                path: "reportId",
                                select: "title status visibility date reportType"
                            })
                                .sort({ createdAt: -1, _id: -1 })
                                .skip(skip)
                                .limit(limit)
                                .lean(),
                            reportFeedback_model_1["default"].countDocuments(filter),
                        ])];
                case 3:
                    _c = _d.sent(), feedback = _c[0], total = _c[1];
                    totalPages = Math.ceil(total / limit);
                    // 5. Return feedback with its associated report details.
                    return [2 /*return*/, server_1.NextResponse.json({
                            success: true,
                            data: {
                                feedback: feedback.map(function (item) {
                                    var report = item.reportId &&
                                        typeof item.reportId === "object" &&
                                        "title" in item.reportId
                                        ? item.reportId
                                        : null;
                                    return {
                                        id: item._id,
                                        message: item.message,
                                        status: item.status,
                                        createdAt: item.createdAt,
                                        updatedAt: item.updatedAt,
                                        report: report
                                            ? {
                                                id: report._id,
                                                title: report.title,
                                                status: report.status,
                                                visibility: report.visibility,
                                                date: report.date,
                                                reportType: report.reportType
                                            }
                                            : null
                                    };
                                }),
                                pagination: {
                                    page: page,
                                    limit: limit,
                                    total: total,
                                    totalPages: totalPages,
                                    hasNextPage: page < totalPages,
                                    hasPreviousPage: page > 1
                                }
                            }
                        }, { status: 200 })];
                case 4:
                    error_1 = _d.sent();
                    console.error("Failed to retrieve user's report feedback:", error_1);
                    return [2 /*return*/, server_1.NextResponse.json({
                            success: false,
                            message: "Unable to retrieve your report feedback."
                        }, { status: 500 })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.GET = GET;
