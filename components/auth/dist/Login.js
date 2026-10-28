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
exports.LoginForm = void 0;
var react_1 = require("react");
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
exports.LoginForm = function () {
    var router = navigation_1.useRouter();
    var _a = react_1.useState(""), email = _a[0], setEmail = _a[1];
    var _b = react_1.useState(""), password = _b[0], setPassword = _b[1];
    var _c = react_1.useState(false), showPassword = _c[0], setShowPassword = _c[1];
    var _d = react_1.useState(false), isSubmitting = _d[0], setIsSubmitting = _d[1];
    var _e = react_1.useState(""), error = _e[0], setError = _e[1];
    function handleSubmit(event) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, result, role, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        event.preventDefault();
                        if (isSubmitting)
                            return [2 /*return*/];
                        setError("");
                        setIsSubmitting(true);
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 4, 5, 6]);
                        return [4 /*yield*/, fetch("/api/auth/login", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                credentials: "same-origin",
                                body: JSON.stringify({
                                    email: email.trim(),
                                    password: password
                                })
                            })];
                    case 2:
                        response = _d.sent();
                        return [4 /*yield*/, response.json()["catch"](function () { return null; })];
                    case 3:
                        result = _d.sent();
                        if (!response.ok) {
                            setError((result === null || result === void 0 ? void 0 : result.message) || (result === null || result === void 0 ? void 0 : result.error) ||
                                "We couldn't sign you in. Check your credentials and try again.");
                            return [2 /*return*/];
                        }
                        // First-time users must use their invitation link to set a password.
                        if ((_a = result === null || result === void 0 ? void 0 : result.user) === null || _a === void 0 ? void 0 : _a.firstLogin) {
                            setError("Your account setup is not complete. Please use the password setup link sent to your email, or contact church leadership for a new invitation.");
                            return [2 /*return*/];
                        }
                        role = (_b = result === null || result === void 0 ? void 0 : result.user) === null || _b === void 0 ? void 0 : _b.role;
                        if (role !== "admin" && role !== "member") {
                            setError("Your account role could not be verified. Please contact church leadership.");
                            return [2 /*return*/];
                        }
                        router.replace(role === "admin" ? "/admin" : "/portal");
                        router.refresh();
                        return [3 /*break*/, 6];
                    case 4:
                        _c = _d.sent();
                        setError("We couldn't connect to the sign-in service. Check your connection and try again.");
                        return [3 /*break*/, 6];
                    case 5:
                        setIsSubmitting(false);
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    var inputClassName = "h-12 rounded-xl border-slate-200 bg-transparent px-4 text-sm text-[#0C2340] shadow-sm shadow-slate-900/[0.02] transition-[border-color,box-shadow] duration-200 placeholder:text-slate-400 hover:border-slate-300 focus-visible:border-[#00A3E0] focus-visible:ring-2 focus-visible:ring-[#00A3E0]/20 focus-visible:ring-offset-0";
    return (React.createElement("form", { onSubmit: handleSubmit, className: "space-y-5", "aria-busy": isSubmitting },
        React.createElement("div", { className: "space-y-2" },
            React.createElement(label_1.Label, { htmlFor: "email", className: "text-[13px] font-semibold text-[#0C2340]" }, "Email address"),
            React.createElement(input_1.Input, { id: "email", name: "email", type: "email", autoComplete: "username", inputMode: "email", placeholder: "you@example.com", value: email, onChange: function (event) {
                    setEmail(event.target.value);
                    if (error)
                        setError("");
                }, required: true, maxLength: 254, disabled: isSubmitting, className: inputClassName })),
        React.createElement("div", { className: "my-4 space-y-4" },
            React.createElement("div", { className: "flex items-center justify-between gap-3" },
                React.createElement(label_1.Label, { htmlFor: "password", className: "text-[13px] font-semibold text-[#0C2340]" }, "Password"),
                React.createElement(link_1["default"], { href: "/forgot-password", className: "text-xs font-semibold text-[#007FAF] underline-offset-4 transition-colors hover:text-[#0C2340] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2" }, "Forgot password?")),
            React.createElement("div", { className: "relative mb-4" },
                React.createElement(input_1.Input, { id: "password", name: "password", type: showPassword ? "text" : "password", autoComplete: "current-password", placeholder: "Enter your password", value: password, onChange: function (event) {
                        setPassword(event.target.value);
                        if (error)
                            setError("");
                    }, required: true, disabled: isSubmitting, className: inputClassName + " pr-12" }),
                React.createElement("button", { type: "button", onClick: function () { return setShowPassword(function (current) { return !current; }); }, "aria-label": showPassword ? "Hide password" : "Show password", "aria-pressed": showPassword, "aria-controls": "password", disabled: isSubmitting, className: "absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-slate-400 transition-colors hover:text-[#007FAF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00A3E0] disabled:cursor-not-allowed disabled:opacity-50" }, showPassword ? (React.createElement(lucide_react_1.EyeOff, { "aria-hidden": "true", className: "h-[17px] w-[17px]" })) : (React.createElement(lucide_react_1.Eye, { "aria-hidden": "true", className: "h-[17px] w-[17px]" }))))),
        error && (React.createElement("div", { role: "alert", "aria-live": "polite", className: "flex items-start gap-3 rounded-xl border border-rose-200/80 bg-rose-50 px-4 py-3.5 text-sm text-rose-700" },
            React.createElement("span", { className: "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100" },
                React.createElement("span", { className: "text-xs font-bold" }, "!")),
            React.createElement("p", { className: "leading-5" }, error))),
        React.createElement(button_1.Button, { type: "submit", disabled: isSubmitting || !email.trim() || !password, className: "my-4 group h-12 w-full rounded-xl bg-[#0C2340] text-sm font-semibold text-white shadow-md shadow-[#0C2340]/10 transition-all duration-200 hover:bg-[#00A3E0] hover:shadow-lg hover:shadow-[#00A3E0]/15 focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none" }, isSubmitting ? (React.createElement(React.Fragment, null,
            React.createElement(lucide_react_1.LoaderCircle, { "aria-hidden": "true", className: "mr-2 h-4 w-4 animate-spin motion-reduce:animate-none" }),
            "Signing you in...")) : (React.createElement(React.Fragment, null,
            "Sign in to your account",
            React.createElement(lucide_react_1.ArrowRight, { "aria-hidden": "true", className: "ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" })))),
        React.createElement("div", { className: "relative overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50/80 p-4" },
            React.createElement("div", { "aria-hidden": "true", className: "absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-[#00A3E0] to-[#41B6E6]" }),
            React.createElement("div", { className: "flex items-start gap-3 pl-1" },
                React.createElement("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#00A3E0]/10 bg-white text-[#007FAF] shadow-sm" },
                    React.createElement(lucide_react_1.LockKeyhole, { "aria-hidden": "true", className: "h-[18px] w-[18px]" })),
                React.createElement("div", { className: "min-w-0 flex-1" },
                    React.createElement("p", { className: "text-xs font-semibold text-[#0C2340]" }, "Private team access"),
                    React.createElement("p", { className: "mt-1.5 text-[11px] leading-[1.7] text-slate-500" }, "This portal is exclusively for authorized Media Team members. Access is managed by church leadership."))))));
};
