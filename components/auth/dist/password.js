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
exports.PasswordForm = void 0;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
function PasswordForm(_a) {
    var _b;
    var mode = _a.mode;
    var router = navigation_1.useRouter();
    var searchParams = navigation_1.useSearchParams();
    var token = (_b = searchParams.get("token")) !== null && _b !== void 0 ? _b : "";
    var isSetup = mode === "setup";
    var _c = react_1.useState(""), password = _c[0], setPassword = _c[1];
    var _d = react_1.useState(""), confirmPassword = _d[0], setConfirmPassword = _d[1];
    var _e = react_1.useState(false), showPassword = _e[0], setShowPassword = _e[1];
    var _f = react_1.useState(false), showConfirmation = _f[0], setShowConfirmation = _f[1];
    var _g = react_1.useState(false), isSubmitting = _g[0], setIsSubmitting = _g[1];
    var _h = react_1.useState(""), error = _h[0], setError = _h[1];
    var _j = react_1.useState(false), success = _j[0], setSuccess = _j[1];
    var inputClassName = "h-12 rounded-xl border-slate-200 bg-transparent px-4 text-sm text-[#0C2340] shadow-sm shadow-slate-900/[0.02] transition-colors placeholder:text-slate-400 hover:border-slate-300 focus-visible:border-[#00A3E0] focus-visible:ring-2 focus-visible:ring-[#00A3E0]/20 focus-visible:ring-offset-0";
    function handleSubmit(event) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, response, result, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        event.preventDefault();
                        if (isSubmitting)
                            return [2 /*return*/];
                        setError("");
                        if (!token) {
                            setError(isSetup
                                ? "This invitation link is missing its token. Please request a new invitation."
                                : "This password reset link is missing its token. Please request another reset email.");
                            return [2 /*return*/];
                        }
                        if (password.length < 8) {
                            setError("Your password must contain at least 8 characters.");
                            return [2 /*return*/];
                        }
                        if (new TextEncoder().encode(password).length > 72) {
                            setError("Your password must not exceed 72 bytes.");
                            return [2 /*return*/];
                        }
                        if (password !== confirmPassword) {
                            setError("Your passwords do not match.");
                            return [2 /*return*/];
                        }
                        setIsSubmitting(true);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, 5, 6]);
                        endpoint = isSetup
                            ? "/api/auth/setup-password"
                            : "/api/auth/reset-password";
                        return [4 /*yield*/, fetch(endpoint, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                credentials: "same-origin",
                                body: JSON.stringify({ token: token, password: password })
                            })];
                    case 2:
                        response = _c.sent();
                        return [4 /*yield*/, response.json()["catch"](function () { return null; })];
                    case 3:
                        result = _c.sent();
                        if (!response.ok) {
                            setError((result === null || result === void 0 ? void 0 : result.error) || (result === null || result === void 0 ? void 0 : result.message) ||
                                "We couldn't update your password. The link may have expired or already been used.");
                            return [2 /*return*/];
                        }
                        setSuccess(true);
                        if (isSetup) {
                            // Setup endpoint should create the authenticated cookie.
                            router.replace(((_a = result === null || result === void 0 ? void 0 : result.user) === null || _a === void 0 ? void 0 : _a.role) === "admin" ? "/admin" : "/portal");
                            router.refresh();
                        }
                        return [3 /*break*/, 6];
                    case 4:
                        _b = _c.sent();
                        setError("Unable to connect. Please check your connection and try again.");
                        return [3 /*break*/, 6];
                    case 5:
                        setIsSubmitting(false);
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    if (success && !isSetup) {
        return (React.createElement("div", { className: "rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center" },
            React.createElement("div", { className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm" },
                React.createElement(lucide_react_1.CheckCircle2, { className: "h-6 w-6" })),
            React.createElement("h2", { className: "mt-4 text-lg font-semibold text-[#0C2340]" }, "Password updated"),
            React.createElement("p", { className: "mt-2 text-sm leading-6 text-slate-600" }, "Your password has been changed. You can now sign in with your new password."),
            React.createElement(button_1.Button, { type: "button", onClick: function () { return router.replace("/login"); }, className: "mt-5 h-11 w-full rounded-xl bg-[#0C2340] text-white hover:bg-[#00A3E0]" },
                "Return to sign in",
                React.createElement(lucide_react_1.ArrowRight, { className: "ml-2 h-4 w-4" }))));
    }
    return (React.createElement("form", { onSubmit: handleSubmit, className: "space-y-5", "aria-busy": isSubmitting },
        React.createElement("div", { className: "space-y-2 mb-4" },
            React.createElement(label_1.Label, { htmlFor: "new-password", className: "text-[13px] font-semibold text-[#0C2340]" }, "New password"),
            React.createElement("div", { className: "relative" },
                React.createElement(input_1.Input, { id: "new-password", name: "new-password", type: showPassword ? "text" : "password", autoComplete: "new-password", placeholder: "At least 8 characters", value: password, onChange: function (event) {
                        setPassword(event.target.value);
                        setError("");
                    }, minLength: 8, maxLength: 72, required: true, disabled: isSubmitting, className: inputClassName + " pr-12" }),
                React.createElement("button", { type: "button", onClick: function () { return setShowPassword(function (value) { return !value; }); }, "aria-label": showPassword ? "Hide new password" : "Show new password", className: "absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-slate-400 hover:text-[#007FAF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00A3E0]" }, showPassword ? React.createElement(lucide_react_1.EyeOff, { className: "h-[17px] w-[17px]" }) : React.createElement(lucide_react_1.Eye, { className: "h-[17px] w-[17px]" }))),
            React.createElement("p", { className: "text-xs leading-5 text-slate-500 mt-4" }, "Use at least 8 characters. Avoid reusing a password from another account.")),
        React.createElement("div", { className: "space-y-2 mb-4" },
            React.createElement(label_1.Label, { htmlFor: "confirm-password", className: "text-[13px] font-semibold text-[#0C2340]" }, "Confirm new password"),
            React.createElement("div", { className: "relative" },
                React.createElement(input_1.Input, { id: "confirm-password", name: "confirm-password", type: showConfirmation ? "text" : "password", autoComplete: "new-password", placeholder: "Enter your password again", value: confirmPassword, onChange: function (event) {
                        setConfirmPassword(event.target.value);
                        setError("");
                    }, required: true, disabled: isSubmitting, className: inputClassName + " pr-12" }),
                React.createElement("button", { type: "button", onClick: function () { return setShowConfirmation(function (value) { return !value; }); }, "aria-label": showConfirmation ? "Hide confirmation" : "Show confirmation", className: "absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-slate-400 hover:text-[#007FAF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00A3E0]" }, showConfirmation ? React.createElement(lucide_react_1.EyeOff, { className: "h-[17px] w-[17px]" }) : React.createElement(lucide_react_1.Eye, { className: "h-[17px] w-[17px]" })))),
        error && (React.createElement("div", { role: "alert", "aria-live": "polite", className: "rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-5 text-rose-700" }, error)),
        React.createElement(button_1.Button, { type: "submit", disabled: isSubmitting ||
                !password ||
                !confirmPassword ||
                !token, className: "group h-12 w-full rounded-xl bg-[#0C2340] text-sm font-semibold text-white shadow-md shadow-[#0C2340]/10 transition-all hover:bg-[#00A3E0] focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60" }, isSubmitting ? (React.createElement(React.Fragment, null,
            React.createElement(lucide_react_1.LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
            "Updating password...")) : (React.createElement(React.Fragment, null,
            isSetup ? "Set up my password" : "Reset my password",
            React.createElement(lucide_react_1.ArrowRight, { className: "ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" })))),
        React.createElement("div", { className: "rounded-xl border border-slate-200/80 bg-slate-50/80 p-4 mt-4" },
            React.createElement("div", { className: "flex items-start gap-3" },
                React.createElement("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#00A3E0]/10 bg-white text-[#007FAF] shadow-sm" }, isSetup ? (React.createElement(lucide_react_1.ShieldCheck, { className: "h-[18px] w-[18px]" })) : (React.createElement(lucide_react_1.KeyRound, { className: "h-[18px] w-[18px]" }))),
                React.createElement("div", null,
                    React.createElement("p", { className: "text-xs font-semibold text-[#0C2340] mt-4" }, isSetup ? "Secure account activation" : "Secure password recovery"),
                    React.createElement("p", { className: "mt-1.5 text-[11px] leading-[1.7] text-slate-500" }, isSetup
                        ? "Your invitation link is single-use and expires after 30 minutes."
                        : "Your reset link must be valid and unused. If it expires, request another email."))))));
}
exports.PasswordForm = PasswordForm;
