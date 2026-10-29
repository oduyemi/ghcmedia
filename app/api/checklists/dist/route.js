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
var checklistTemplate_model_1 = require("@/models/checklistTemplate.model");
var checklistSubmission_model_1 = require("@/models/checklistSubmission.model");
var notification_model_1 = require("@/models/notification.model");
var reporting_1 = require("@/utils/reporting");
var emailLogic_1 = require("@/helper/emailLogic");
function POST(request) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var _b, user_1, forbidden, body, occurrence_1, template, templateItems, allowedItems, seen_1, items, _i, _c, submitted, source, statuses, missingRequired, submission_1, admins, eventTime_1, error_1;
        var _this = this;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 9, , 10]);
                    return [4 /*yield*/, reporting_1.authorize(["member"])];
                case 1:
                    _b = _d.sent(), user_1 = _b.user, forbidden = _b.forbidden;
                    if (forbidden)
                        return [2 /*return*/, forbidden];
                    return [4 /*yield*/, db_1.dbConnect()];
                case 2:
                    _d.sent();
                    return [4 /*yield*/, request.json()["catch"](function () { return null; })];
                case 3:
                    body = _d.sent();
                    if (!body ||
                        typeof body.serviceOccurrenceId !== "string" ||
                        typeof body.templateId !== "string" ||
                        !Array.isArray(body.items)) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "Invalid checklist submission." }, { status: 400 })];
                    }
                    return [4 /*yield*/, serviceOccurence_model_1["default"].findOne({
                            _id: body.serviceOccurrenceId,
                            assignedReporterId: user_1._id,
                            status: { $ne: "CANCELLED" }
                        })];
                case 4:
                    occurrence_1 = _d.sent();
                    if (!occurrence_1) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "You are not assigned to this service." }, { status: 403 })];
                    }
                    if (!mongoose_1["default"].isValidObjectId(body.templateId)) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "Invalid checklist template." }, { status: 400 })];
                    }
                    return [4 /*yield*/, checklistTemplate_model_1["default"].findOne({
                            _id: body.templateId,
                            status: "ACTIVE",
                            serviceTypes: occurrence_1.serviceType
                        })];
                case 5:
                    template = _d.sent();
                    if (!template) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "Active checklist template not found for this service." }, { status: 404 })];
                    }
                    templateItems = template.items;
                    allowedItems = new Map(templateItems.map(function (item) { return [item.itemId, item]; }));
                    seen_1 = new Set();
                    items = [];
                    for (_i = 0, _c = body.items; _i < _c.length; _i++) {
                        submitted = _c[_i];
                        if (!submitted ||
                            typeof submitted.itemId !== "string" ||
                            seen_1.has(submitted.itemId)) {
                            return [2 /*return*/, server_1.NextResponse.json({ error: "Checklist items must have unique item IDs." }, { status: 400 })];
                        }
                        seen_1.add(submitted.itemId);
                        source = allowedItems.get(submitted.itemId);
                        if (!source) {
                            return [2 /*return*/, server_1.NextResponse.json({ error: "A submitted item does not belong to this template." }, { status: 400 })];
                        }
                        statuses = ["COMPLETED", "NOT_COMPLETED", "NOT_APPLICABLE"];
                        if (!statuses.includes(submitted.status)) {
                            return [2 /*return*/, server_1.NextResponse.json({ error: "Invalid status for checklist item " + submitted.itemId + "." }, { status: 400 })];
                        }
                        if (source.required && submitted.status === "NOT_APPLICABLE") {
                            return [2 /*return*/, server_1.NextResponse.json({ error: "Required item \"" + source.title + "\" cannot be marked not applicable." }, { status: 400 })];
                        }
                        items.push({
                            itemId: source.itemId,
                            title: source.title,
                            requirement: (_a = source.requirement) !== null && _a !== void 0 ? _a : "",
                            required: source.required,
                            status: submitted.status,
                            notes: typeof submitted.notes === "string" ? submitted.notes.slice(0, 2000) : ""
                        });
                    }
                    missingRequired = templateItems.filter(function (item) {
                        return item.required && !seen_1.has(item.itemId);
                    });
                    if (missingRequired.length) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "Complete all required checklist items before submitting.", missingItemIds: missingRequired.map(function (item) { return item.itemId; }) }, { status: 400 })];
                    }
                    return [4 /*yield*/, checklistSubmission_model_1["default"].create({
                            serviceOccurrenceId: occurrence_1._id,
                            templateId: template._id,
                            templateVersion: template.version,
                            submittedBy: user_1._id,
                            items: items,
                            submissionStatus: "PENDING_REVIEW",
                            submittedAt: new Date()
                        })];
                case 6:
                    submission_1 = _d.sent();
                    return [4 /*yield*/, reporting_1.getAdmins()];
                case 7:
                    admins = _d.sent();
                    eventTime_1 = submission_1.submittedAt.toISOString();
                    return [4 /*yield*/, Promise.allSettled(admins.map(function (admin) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, notification_model_1["default"].create({
                                            recipient: admin._id,
                                            actor: user_1._id,
                                            type: "CHECKLIST_SUBMITTED",
                                            title: "Checklist submitted for review",
                                            message: user_1.fname + " " + user_1.lname + " submitted the preproduction checklist for " + (occurrence_1.title || occurrence_1.serviceType) + ".",
                                            resourceType: "CHECKLIST",
                                            resourceId: submission_1._id,
                                            href: "/admin/checklists/" + submission_1._id,
                                            eventKey: "CHECKLIST_SUBMITTED:" + submission_1._id + ":" + admin._id + ":" + eventTime_1
                                        })];
                                    case 1:
                                        _a.sent();
                                        if (!admin.email) return [3 /*break*/, 3];
                                        return [4 /*yield*/, emailLogic_1.sendEmailWithRetry(admin.email, "Media checklist submitted for review", "<p>A checklist was submitted for <strong>" + (occurrence_1.title || occurrence_1.serviceType) + "</strong>.</p><p><a href=\"" + (process.env.APP_URL || "https://ghcmedia.vercel.app") + "/admin/checklists/" + submission_1._id + "\">Review submission</a></p>")];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 8:
                    _d.sent();
                    return [2 /*return*/, server_1.NextResponse.json({ message: "Checklist submitted for review.", submission: submission_1 }, { status: 201 })];
                case 9:
                    error_1 = _d.sent();
                    if (error_1 && typeof error_1 === "object" && "code" in error_1 && error_1.code === 11000) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "A checklist has already been submitted by you for this service." }, { status: 409 })];
                    }
                    console.error("SUBMIT CHECKLIST ERROR:", error_1);
                    return [2 /*return*/, server_1.NextResponse.json({ error: "Unable to submit checklist." }, { status: 500 })];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.POST = POST;
