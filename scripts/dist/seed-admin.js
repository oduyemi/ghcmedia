"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var dotenv_1 = require("dotenv");
var mongoose_1 = require("mongoose");
var bcryptjs_1 = require("bcryptjs");
var user_model_1 = require("@/models/user.model");
dotenv_1["default"].config({ path: ".env.local" });
var _a = process.env, MONGODB_URI = _a.MONGODB_URI, ADMIN_EMAIL = _a.ADMIN_EMAIL, ADMIN_PASSWORD = _a.ADMIN_PASSWORD, ADMIN_FNAME = _a.ADMIN_FNAME, ADMIN_LNAME = _a.ADMIN_LNAME, ADMIN_PHONE = _a.ADMIN_PHONE;
var MIN_PASSWORD_LENGTH = 8;
var BCRYPT_ROUNDS = 12;
function seedAdmin() {
    return __awaiter(this, void 0, Promise, function () {
        var email, connected, existingUser, hashedPassword, admin;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Validate required configuration before connecting to MongoDB.
                    if (!(MONGODB_URI === null || MONGODB_URI === void 0 ? void 0 : MONGODB_URI.trim())) {
                        throw new Error("MONGODB_URI is not defined. Check your .env.local file.");
                    }
                    if (!(ADMIN_EMAIL === null || ADMIN_EMAIL === void 0 ? void 0 : ADMIN_EMAIL.trim())) {
                        throw new Error("ADMIN_EMAIL is not defined. Check your .env.local file.");
                    }
                    if (!ADMIN_PASSWORD) {
                        throw new Error("ADMIN_PASSWORD is not defined. Check your .env.local file.");
                    }
                    if (ADMIN_PASSWORD.length < MIN_PASSWORD_LENGTH) {
                        throw new Error("ADMIN_PASSWORD must be at least " + MIN_PASSWORD_LENGTH + " characters long.");
                    }
                    email = ADMIN_EMAIL.trim().toLowerCase();
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                        throw new Error("ADMIN_EMAIL must be a valid email address.");
                    }
                    connected = false;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 6, 9]);
                    console.log("Connecting to MongoDB...");
                    return [4 /*yield*/, mongoose_1["default"].connect(MONGODB_URI.trim())];
                case 2:
                    _a.sent();
                    connected = true;
                    console.log("Connected to MongoDB.");
                    return [4 /*yield*/, user_model_1["default"].findOne({ email: email })];
                case 3:
                    existingUser = _a.sent();
                    if (existingUser) {
                        if (existingUser.role !== "admin") {
                            throw new Error("An account already exists for " + email + ", but it is not an administrator. " +
                                "No changes have been made to the existing account.");
                        }
                        console.log("Admin already exists: " + email);
                        console.log("No changes have been made to the existing account.");
                        return [2 /*return*/];
                    }
                    console.log("Creating administrator account...");
                    return [4 /*yield*/, bcryptjs_1["default"].hash(ADMIN_PASSWORD, BCRYPT_ROUNDS)];
                case 4:
                    hashedPassword = _a.sent();
                    return [4 /*yield*/, user_model_1["default"].create(__assign({ fname: (ADMIN_FNAME === null || ADMIN_FNAME === void 0 ? void 0 : ADMIN_FNAME.trim()) || "Admin", lname: (ADMIN_LNAME === null || ADMIN_LNAME === void 0 ? void 0 : ADMIN_LNAME.trim()) || "User", email: email, password: hashedPassword, role: "admin", firstLogin: false }, ((ADMIN_PHONE === null || ADMIN_PHONE === void 0 ? void 0 : ADMIN_PHONE.trim()) ? { phone: ADMIN_PHONE.trim() }
                            : {})))];
                case 5:
                    admin = _a.sent();
                    console.log("");
                    console.log("=================================");
                    console.log("Administrator created successfully");
                    console.log("=================================");
                    console.log("ID:    " + admin._id.toString());
                    console.log("Name:  " + admin.fname + " " + admin.lname);
                    console.log("Email: " + admin.email);
                    console.log("Role:  " + admin.role);
                    console.log("=================================");
                    console.log("");
                    return [3 /*break*/, 9];
                case 6:
                    if (!connected) return [3 /*break*/, 8];
                    return [4 /*yield*/, mongoose_1["default"].disconnect()];
                case 7:
                    _a.sent();
                    console.log("MongoDB connection closed.");
                    _a.label = 8;
                case 8: return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    });
}
seedAdmin()["catch"](function (error) {
    var message = error instanceof Error
        ? error.message
        : String(error);
    console.error("");
    console.error("=================================");
    console.error("ADMIN SEED ERROR");
    console.error("=================================");
    console.error(message);
    console.error("=================================");
    process.exitCode = 1;
});
