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
var bcryptjs_1 = require("bcryptjs");
var db_1 = require("@/utils/db");
var user_model_1 = require("@/models/user.model");
var auth_1 = require("@/utils/auth");
var ALLOWED_ROLES = ["pastor", "other"];
function POST(req) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var secret, body, _b, _c, email, password, normalizedEmail, user, _d, token, response, error_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 11, , 12]);
                    return [4 /*yield*/, db_1.dbConnect()];
                case 1:
                    _e.sent();
                    secret = process.env.JWT_SECRET;
                    if (!secret || secret.length < 32) {
                        console.error("JWT_SECRET must be configured with at least 32 characters.");
                        return [2 /*return*/, server_1.NextResponse.json({ error: "Authentication is temporarily unavailable." }, { status: 500 })];
                    }
                    body = void 0;
                    _e.label = 2;
                case 2:
                    _e.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, req.json()];
                case 3:
                    body = _e.sent();
                    return [3 /*break*/, 5];
                case 4:
                    _b = _e.sent();
                    return [2 /*return*/, server_1.NextResponse.json({ error: "A valid JSON request body is required." }, { status: 400 })];
                case 5:
                    if (!body ||
                        typeof body !== "object" ||
                        Array.isArray(body)) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "Invalid request body." }, { status: 400 })];
                    }
                    _c = body, email = _c.email, password = _c.password;
                    if (typeof email !== "string" ||
                        typeof password !== "string" ||
                        !email.trim() ||
                        !password) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "Email and password are required." }, { status: 400 })];
                    }
                    normalizedEmail = email.trim().toLowerCase();
                    return [4 /*yield*/, user_model_1["default"].findOne({
                            email: normalizedEmail
                        }).select("+password")];
                case 6:
                    user = _e.sent();
                    _d = !user;
                    if (_d) return [3 /*break*/, 8];
                    return [4 /*yield*/, bcryptjs_1["default"].compare(password, user.password)];
                case 7:
                    _d = !(_e.sent());
                    _e.label = 8;
                case 8:
                    if (_d) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "Invalid email or password." }, { status: 401 })];
                    }
                    if (!ALLOWED_ROLES.includes(user.role)) {
                        return [2 /*return*/, server_1.NextResponse.json({
                                error: "This sign-in is only available to pastors and other authorized visitors. Please use your regular sign-in."
                            }, { status: 403 })];
                    }
                    if (user.firstLogin) {
                        return [2 /*return*/, server_1.NextResponse.json({
                                error: "Please complete your password setup before signing in.",
                                code: "PASSWORD_SETUP_REQUIRED",
                                redirectTo: "/setup-password"
                            }, { status: 403 })];
                    }
                    user.lastLogin = new Date();
                    return [4 /*yield*/, user.save()];
                case 9:
                    _e.sent();
                    return [4 /*yield*/, auth_1.createAuthToken({
                            userId: user._id.toString(),
                            role: user.role,
                            sessionVersion: (_a = user.sessionVersion) !== null && _a !== void 0 ? _a : 0,
                            firstLogin: user.firstLogin
                        })];
                case 10:
                    token = _e.sent();
                    response = server_1.NextResponse.json({
                        message: "Ratings sign-in successful.",
                        redirectTo: "/ratings",
                        user: {
                            _id: user._id.toString(),
                            fname: user.fname,
                            lname: user.lname,
                            email: user.email,
                            role: user.role,
                            image: user.image,
                            firstLogin: user.firstLogin
                        }
                    }, { status: 200 });
                    auth_1.setAuthCookie(response, token);
                    return [2 /*return*/, response];
                case 11:
                    error_1 = _e.sent();
                    console.error("RATINGS LOGIN ERROR:", error_1);
                    return [2 /*return*/, server_1.NextResponse.json({ error: "Internal server error." }, { status: 500 })];
                case 12: return [2 /*return*/];
            }
        });
    });
}
exports.POST = POST;
