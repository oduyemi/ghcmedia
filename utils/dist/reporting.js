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
exports.getAdmins = exports.getAssignedOccurrence = exports.validId = exports.badRequest = exports.authorize = void 0;
var mongoose_1 = require("mongoose");
var server_1 = require("next/server");
var user_model_1 = require("@/models/user.model");
var serviceOccurence_model_1 = require("@/models/serviceOccurence.model");
var auth_1 = require("@/utils/auth");
function authorize(roles) {
    return __awaiter(this, void 0, void 0, function () {
        var user, forbidden;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, auth_1.getCurrentUser()];
                case 1:
                    user = _a.sent();
                    forbidden = auth_1.requireRole(user, roles);
                    return [2 /*return*/, { user: user, forbidden: forbidden }];
            }
        });
    });
}
exports.authorize = authorize;
function badRequest(message, status) {
    if (status === void 0) { status = 400; }
    return server_1.NextResponse.json({ error: message }, { status: status });
}
exports.badRequest = badRequest;
function validId(id) {
    return mongoose_1["default"].isValidObjectId(id);
}
exports.validId = validId;
function getAssignedOccurrence(occurrenceId, userId) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var occurrence;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!validId(occurrenceId))
                        return [2 /*return*/, { error: "Invalid service occurrence ID.", status: 400 }];
                    return [4 /*yield*/, serviceOccurence_model_1["default"].findById(occurrenceId)];
                case 1:
                    occurrence = _b.sent();
                    if (!occurrence)
                        return [2 /*return*/, { error: "Service occurrence not found.", status: 404 }];
                    if (((_a = occurrence.assignedReporterId) === null || _a === void 0 ? void 0 : _a.toString()) !== userId) {
                        return [2 /*return*/, { error: "You are not the assigned reporter for this service.", status: 403 }];
                    }
                    if (occurrence.status === "CANCELLED") {
                        return [2 /*return*/, { error: "This service has been cancelled.", status: 409 }];
                    }
                    return [2 /*return*/, { occurrence: occurrence }];
            }
        });
    });
}
exports.getAssignedOccurrence = getAssignedOccurrence;
function getAdmins() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, user_model_1["default"].find({ role: "admin" })
                    .select("_id fname lname email")
                    .lean()];
        });
    });
}
exports.getAdmins = getAdmins;
