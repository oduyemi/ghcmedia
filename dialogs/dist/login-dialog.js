"use client";
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
exports.RatingsLoginDialog = void 0;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var dialog_1 = require("@/components/ui/dialog");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
exports.RatingsLoginDialog = function (_a) {
    var open = _a.open, onAuthenticated = _a.onAuthenticated;
    var router = navigation_1.useRouter();
    var _b = react_1.useState(""), email = _b[0], setEmail = _b[1];
    var _c = react_1.useState(""), password = _c[0], setPassword = _c[1];
    var _d = react_1.useState(false), showPassword = _d[0], setShowPassword = _d[1];
    var _e = react_1.useState(false), isSubmitting = _e[0], setIsSubmitting = _e[1];
    var _f = react_1.useState(""), error = _f[0], setError = _f[1];
    var handleSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, sessionResponse, err_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    event.preventDefault();
                    if (isSubmitting)
                        return [2 /*return*/];
                    setIsSubmitting(true);
                    setError("");
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 5, 6, 7]);
                    return [4 /*yield*/, fetch("/api/auth/login", {
                            method: "POST",
                            credentials: "same-origin",
                            cache: "no-store",
                            headers: {
                                "Content-Type": "application/json",
                                Accept: "application/json"
                            },
                            body: JSON.stringify({
                                email: email.trim(),
                                password: password
                            })
                        })];
                case 2:
                    response = _c.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = (_c.sent());
                    if (!response.ok) {
                        throw new Error((_b = (_a = data.error) !== null && _a !== void 0 ? _a : data.message) !== null && _b !== void 0 ? _b : "Unable to sign in. Check your details and try again.");
                    }
                    return [4 /*yield*/, fetch("/api/auth/me", {
                            method: "GET",
                            credentials: "same-origin",
                            cache: "no-store",
                            headers: { Accept: "application/json" }
                        })];
                case 4:
                    sessionResponse = _c.sent();
                    if (!sessionResponse.ok) {
                        throw new Error("Login was accepted, but your session could not be verified. Please try again.");
                    }
                    setPassword("");
                    onAuthenticated();
                    router.refresh();
                    return [3 /*break*/, 7];
                case 5:
                    err_1 = _c.sent();
                    setError(err_1 instanceof Error
                        ? err_1.message
                        : "Something went wrong. Please try again.");
                    return [3 /*break*/, 7];
                case 6:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(dialog_1.Dialog, { open: open, onOpenChange: function (nextOpen) {
            if (!nextOpen && !open)
                return;
        } },
        React.createElement(dialog_1.DialogContent, { showCloseButton: false, className: "w-[calc(100%-2rem)] max-w-md rounded-2xl border border-slate-200 bg-white p-0 shadow-2xl sm:rounded-3xl" },
            React.createElement("div", { className: "overflow-hidden rounded-2xl sm:rounded-3xl" },
                React.createElement("div", { className: "bg-[#0C2340] px-6 py-8 text-white sm:px-8" },
                    React.createElement("div", { className: "mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00A3E0]/15 text-[#41B6E6]" },
                        React.createElement("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", className: "h-6 w-6" },
                            React.createElement("path", { d: "M12 3 19 6V11.5C19 16 16 19 12 21C8 19 5 16 5 11.5V6L12 3Z", stroke: "currentColor", strokeWidth: "1.7", strokeLinejoin: "round" }),
                            React.createElement("path", { d: "m9 12 2 2 4-4", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }))),
                    React.createElement(dialog_1.DialogHeader, { className: "space-y-2 text-left" },
                        React.createElement(dialog_1.DialogTitle, { className: "text-2xl font-bold tracking-tight text-white" }, "Sign in to continue"),
                        React.createElement(dialog_1.DialogDescription, { className: "text-sm leading-6 text-slate-300" }, "Sign in with your Media Team account to access Ratings & Reports."))),
                React.createElement("form", { onSubmit: handleSubmit, className: "space-y-5 p-6 sm:p-8" },
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement(label_1.Label, { htmlFor: "ratings-login-email", className: "text-slate-700" }, "Email address"),
                        React.createElement(input_1.Input, { id: "ratings-login-email", type: "email", autoComplete: "username", placeholder: "you@example.com", value: email, onChange: function (event) { return setEmail(event.target.value); }, required: true, disabled: isSubmitting, className: "h-12 my-4 rounded-xl border-slate-200 focus-visible:ring-[#00A3E0]" })),
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement(label_1.Label, { htmlFor: "ratings-login-password", className: "text-slate-700" }, "Password"),
                        React.createElement("div", { className: "relative" },
                            React.createElement(input_1.Input, { id: "ratings-login-password", type: showPassword ? "text" : "password", autoComplete: "current-password", placeholder: "Enter your password", value: password, onChange: function (event) { return setPassword(event.target.value); }, required: true, disabled: isSubmitting, className: "h-12 my-4 rounded-xl border-slate-200 pr-20 focus-visible:ring-[#00A3E0]" }),
                            React.createElement("button", { type: "button", onClick: function () { return setShowPassword(function (current) { return !current; }); }, className: "absolute inset-y-0 right-3 text-sm font-medium text-slate-500 transition-colors hover:text-[#0C2340]", "aria-label": showPassword ? "Hide password" : "Show password" }, showPassword ? "Hide" : "Show"))),
                    error && (React.createElement("div", { role: "alert", className: "rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700" }, error)),
                    React.createElement(button_1.Button, { type: "submit", disabled: isSubmitting, className: "h-12 w-full rounded-xl bg-[#0C2340] font-semibold text-white transition-colors hover:bg-[#15385F] focus-visible:ring-[#00A3E0]" }, isSubmitting ? (React.createElement("span", { className: "flex items-center gap-2" },
                        React.createElement("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" }),
                        "Signing in\u2026")) : ("Sign in to view reports")),
                    React.createElement("p", { className: "text-center text-xs leading-5 text-slate-500" }, "Access is available to authorized Media Team accounts. Contact the team leadership if you need an account."))))));
};
