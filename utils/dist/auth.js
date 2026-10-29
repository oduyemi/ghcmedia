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
exports.handleLogin = exports.clearAuthCookie = exports.setAuthCookie = exports.requireRole = exports.getCurrentUser = exports.verifyToken = exports.createAuthToken = void 0;
var server_1 = require("next/server");
var headers_1 = require("next/headers");
var jose_1 = require("jose");
var bcryptjs_1 = require("bcryptjs");
var user_model_1 = require("@/models/user.model");
var TOKEN_COOKIE = "token";
var TOKEN_MAX_AGE = 60 * 60 * 24 * 7;
var JWT_ALGORITHM = "HS256";
function getJwtSecret() {
    var secret = process.env.JWT_SECRET;
    if (!secret || secret.length < 32) {
        throw new Error("JWT_SECRET must be configured with at least 32 characters.");
    }
    return new TextEncoder().encode(secret);
}
function createAuthToken(payload) {
    return __awaiter(this, void 0, Promise, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new jose_1.SignJWT({
                    userId: payload.userId,
                    role: payload.role,
                    sessionVersion: payload.sessionVersion,
                    firstLogin: payload.firstLogin
                })
                    .setProtectedHeader({ alg: JWT_ALGORITHM })
                    .setSubject(payload.userId)
                    .setIssuedAt()
                    .setExpirationTime("7d")
                    .sign(getJwtSecret())];
        });
    });
}
exports.createAuthToken = createAuthToken;
function verifyToken(token) {
    var _a;
    return __awaiter(this, void 0, Promise, function () {
        var payload, allowedRoles, sessionVersion, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, jose_1.jwtVerify(token, getJwtSecret(), {
                            algorithms: [JWT_ALGORITHM]
                        })];
                case 1:
                    payload = (_c.sent()).payload;
                    allowedRoles = [
                        "member",
                        "admin",
                        "pastor",
                        "other",
                    ];
                    if (typeof payload.userId !== "string" ||
                        payload.sub !== payload.userId ||
                        typeof payload.role !== "string" ||
                        !allowedRoles.includes(payload.role)) {
                        return [2 /*return*/, null];
                    }
                    sessionVersion = (_a = payload.sessionVersion) !== null && _a !== void 0 ? _a : 0;
                    if (typeof sessionVersion !== "number" ||
                        !Number.isInteger(sessionVersion) ||
                        sessionVersion < 0) {
                        return [2 /*return*/, null];
                    }
                    if (payload.firstLogin !== undefined &&
                        typeof payload.firstLogin !== "boolean") {
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, {
                            userId: payload.userId,
                            role: payload.role,
                            sessionVersion: sessionVersion,
                            firstLogin: payload.firstLogin === true
                        }];
                case 2:
                    _b = _c.sent();
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.verifyToken = verifyToken;
function getCurrentUser() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var headerList, authorization, token, decoded, user, currentVersion;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, headers_1.headers()];
                case 1:
                    headerList = _c.sent();
                    authorization = headerList.get("authorization");
                    if (authorization === null || authorization === void 0 ? void 0 : authorization.startsWith("Bearer ")) {
                        token = authorization.slice(7).trim();
                    }
                    if (!!token) return [3 /*break*/, 3];
                    return [4 /*yield*/, headers_1.cookies()];
                case 2:
                    token = (_a = (_c.sent()).get(TOKEN_COOKIE)) === null || _a === void 0 ? void 0 : _a.value;
                    _c.label = 3;
                case 3:
                    if (!token) {
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, verifyToken(token)];
                case 4:
                    decoded = _c.sent();
                    if (!decoded) {
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, user_model_1["default"].findById(decoded.userId).select("-password")];
                case 5:
                    user = _c.sent();
                    if (!user) {
                        return [2 /*return*/, null];
                    }
                    if (user.role !== decoded.role) {
                        return [2 /*return*/, null];
                    }
                    currentVersion = (_b = user.sessionVersion) !== null && _b !== void 0 ? _b : 0;
                    if (currentVersion !== decoded.sessionVersion) {
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, user];
            }
        });
    });
}
exports.getCurrentUser = getCurrentUser;
function requireRole(user, roles) {
    if (!user || !roles.includes(user.role)) {
        return server_1.NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return null;
}
exports.requireRole = requireRole;
function setAuthCookie(response, token) {
    response.cookies.set(TOKEN_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: TOKEN_MAX_AGE,
        path: "/"
    });
}
exports.setAuthCookie = setAuthCookie;
function clearAuthCookie(response) {
    response.cookies.set(TOKEN_COOKIE, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0,
        expires: new Date(0),
        path: "/"
    });
}
exports.clearAuthCookie = clearAuthCookie;
function handleLogin(req) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var secret, body, _b, _c, email, password, normalizedEmail, user, _d, token, response, error_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 10, , 11]);
                    secret = process.env.JWT_SECRET;
                    if (!secret || secret.length < 32) {
                        console.error("JWT_SECRET must be configured with at least 32 characters.");
                        return [2 /*return*/, server_1.NextResponse.json({ error: "Authentication is temporarily unavailable." }, { status: 500 })];
                    }
                    body = void 0;
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, req.json()];
                case 2:
                    body = _e.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _b = _e.sent();
                    return [2 /*return*/, server_1.NextResponse.json({ error: "A valid JSON request body is required." }, { status: 400 })];
                case 4:
                    if (!body ||
                        typeof body !== "object" ||
                        !("email" in body) ||
                        !("password" in body)) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "Email and password are required." }, { status: 400 })];
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
                case 5:
                    user = _e.sent();
                    _d = !user;
                    if (_d) return [3 /*break*/, 7];
                    return [4 /*yield*/, bcryptjs_1["default"].compare(password, user.password)];
                case 6:
                    _d = !(_e.sent());
                    _e.label = 7;
                case 7:
                    if (_d) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "Invalid email or password." }, { status: 401 })];
                    }
                    user.lastLogin = new Date();
                    return [4 /*yield*/, user.save()];
                case 8:
                    _e.sent();
                    return [4 /*yield*/, createAuthToken({
                            userId: user._id.toString(),
                            role: user.role,
                            sessionVersion: (_a = user.sessionVersion) !== null && _a !== void 0 ? _a : 0,
                            firstLogin: user.firstLogin
                        })];
                case 9:
                    token = _e.sent();
                    response = server_1.NextResponse.json({
                        message: "Login successful.",
                        user: {
                            _id: user._id.toString(),
                            fname: user.fname,
                            lname: user.lname,
                            email: user.email,
                            role: user.role,
                            image: user.image,
                            firstLogin: user.firstLogin
                        },
                        firstLogin: user.firstLogin
                    });
                    setAuthCookie(response, token);
                    return [2 /*return*/, response];
                case 10:
                    error_1 = _e.sent();
                    console.error("LOGIN ERROR:", error_1);
                    return [2 /*return*/, server_1.NextResponse.json({ error: "Internal server error." }, { status: 500 })];
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.handleLogin = handleLogin;
