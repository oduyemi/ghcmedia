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
var node_crypto_1 = require("node:crypto");
var bcryptjs_1 = require("bcryptjs");
var db_1 = require("@/utils/db");
var user_model_1 = require("@/models/user.model");
var auth_1 = require("@/utils/auth");
var sendOnboardingMail_1 = require("@/helper/sendOnboardingMail");
var VALID_ROLES = [
    "member",
    "admin",
    "pastor",
    "other",
];
var SETUP_TOKEN_TTL_MS = 30 * 60 * 1000;
var BCRYPT_ROUNDS = 12;
var ROLE_LABELS = {
    member: "Member",
    admin: "Administrator",
    pastor: "Pastor",
    other: "Other"
};
function hashSetupToken(token) {
    return node_crypto_1.createHash("sha256").update(token).digest("hex");
}
function isDuplicateKeyError(error) {
    return (typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === 11000);
}
function isValidRole(value) {
    return (typeof value === "string" &&
        VALID_ROLES.includes(value));
}
function isValidEmail(email) {
    return /^\S+@\S+\.\S+$/.test(email);
}
function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var currentUser, body, _a, _b, fname, lname, email, role, phone, firstName, lastName, normalizedEmail, normalizedPhone, requestedRole, existingUser, setupToken, setupTokenHash, setupTokenExpiresAt, unusableInitialPassword, hashedInitialPassword, newUser, error_1, emailError_1, error_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 16, , 17]);
                    return [4 /*yield*/, db_1.dbConnect()];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, auth_1.getCurrentUser()];
                case 2:
                    currentUser = _c.sent();
                    if (!currentUser || currentUser.role !== "admin") {
                        return [2 /*return*/, server_1.NextResponse.json({
                                error: "Forbidden. Only administrators can create accounts."
                            }, { status: 403 })];
                    }
                    body = void 0;
                    _c.label = 3;
                case 3:
                    _c.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, req.json()];
                case 4:
                    body = _c.sent();
                    return [3 /*break*/, 6];
                case 5:
                    _a = _c.sent();
                    return [2 /*return*/, server_1.NextResponse.json({ error: "A valid JSON request body is required." }, { status: 400 })];
                case 6:
                    if (!body ||
                        typeof body !== "object" ||
                        Array.isArray(body)) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "Invalid request body." }, { status: 400 })];
                    }
                    _b = body, fname = _b.fname, lname = _b.lname, email = _b.email, role = _b.role, phone = _b.phone;
                    if (typeof fname !== "string" ||
                        typeof lname !== "string" ||
                        typeof email !== "string" ||
                        typeof phone !== "string" ||
                        !fname.trim() ||
                        !lname.trim() ||
                        !email.trim() ||
                        !phone.trim()) {
                        return [2 /*return*/, server_1.NextResponse.json({
                                error: "First name, last name, email and phone are required."
                            }, { status: 400 })];
                    }
                    firstName = fname.trim();
                    lastName = lname.trim();
                    normalizedEmail = email.trim().toLowerCase();
                    normalizedPhone = phone.trim();
                    if (firstName.length > 80 ||
                        lastName.length > 80 ||
                        normalizedEmail.length > 254 ||
                        normalizedPhone.length > 80) {
                        return [2 /*return*/, server_1.NextResponse.json({
                                error: "One or more fields exceed the allowed length."
                            }, { status: 400 })];
                    }
                    if (!isValidEmail(normalizedEmail)) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 })];
                    }
                    requestedRole = "member";
                    if (role !== undefined) {
                        if (!isValidRole(role)) {
                            return [2 /*return*/, server_1.NextResponse.json({
                                    error: "Invalid role. Role must be member, admin, pastor, or other."
                                }, { status: 400 })];
                        }
                        requestedRole = role;
                    }
                    return [4 /*yield*/, user_model_1["default"].findOne({
                            email: normalizedEmail
                        }).select("_id")];
                case 7:
                    existingUser = _c.sent();
                    if (existingUser) {
                        return [2 /*return*/, server_1.NextResponse.json({
                                error: "An account with this email already exists."
                            }, { status: 409 })];
                    }
                    setupToken = node_crypto_1.randomBytes(48).toString("hex");
                    setupTokenHash = hashSetupToken(setupToken);
                    setupTokenExpiresAt = new Date(Date.now() + SETUP_TOKEN_TTL_MS);
                    unusableInitialPassword = node_crypto_1.randomBytes(48).toString("hex");
                    return [4 /*yield*/, bcryptjs_1["default"].hash(unusableInitialPassword, BCRYPT_ROUNDS)];
                case 8:
                    hashedInitialPassword = _c.sent();
                    newUser = void 0;
                    _c.label = 9;
                case 9:
                    _c.trys.push([9, 11, , 12]);
                    return [4 /*yield*/, user_model_1["default"].create({
                            fname: firstName,
                            lname: lastName,
                            email: normalizedEmail,
                            phone: normalizedPhone,
                            password: hashedInitialPassword,
                            role: requestedRole,
                            firstLogin: true,
                            setupTokenHash: setupTokenHash,
                            setupTokenExpiresAt: setupTokenExpiresAt,
                            sessionVersion: 0
                        })];
                case 10:
                    newUser = _c.sent();
                    return [3 /*break*/, 12];
                case 11:
                    error_1 = _c.sent();
                    // The unique database index handles concurrent registrations
                    // attempting to create accounts with the same email.
                    if (isDuplicateKeyError(error_1)) {
                        return [2 /*return*/, server_1.NextResponse.json({
                                error: "An account with this email already exists."
                            }, { status: 409 })];
                    }
                    throw error_1;
                case 12:
                    _c.trys.push([12, 14, , 15]);
                    return [4 /*yield*/, sendOnboardingMail_1.sendOnboardingMail(newUser.email, setupToken, newUser.role, newUser.fname)];
                case 13:
                    _c.sent();
                    return [3 /*break*/, 15];
                case 14:
                    emailError_1 = _c.sent();
                    // Do not log or return the raw setup token.
                    console.error("ONBOARDING EMAIL ERROR:", emailError_1);
                    return [2 /*return*/, server_1.NextResponse.json({
                            message: "The account was created, but the invitation email could not be sent. Please resend the invitation.",
                            emailSent: false,
                            user: {
                                _id: newUser._id.toString(),
                                fname: newUser.fname,
                                lname: newUser.lname,
                                email: newUser.email,
                                phone: newUser.phone,
                                role: newUser.role,
                                firstLogin: newUser.firstLogin
                            }
                        }, { status: 201 })];
                case 15: return [2 /*return*/, server_1.NextResponse.json({
                        message: ROLE_LABELS[requestedRole] + " account created successfully. An invitation email has been sent.",
                        emailSent: true,
                        user: {
                            _id: newUser._id.toString(),
                            fname: newUser.fname,
                            lname: newUser.lname,
                            email: newUser.email,
                            phone: newUser.phone,
                            role: newUser.role,
                            firstLogin: newUser.firstLogin
                        }
                    }, { status: 201 })];
                case 16:
                    error_2 = _c.sent();
                    console.error("REGISTER ERROR:", error_2);
                    return [2 /*return*/, server_1.NextResponse.json({ error: "Internal server error." }, { status: 500 })];
                case 17: return [2 /*return*/];
            }
        });
    });
}
exports.POST = POST;
