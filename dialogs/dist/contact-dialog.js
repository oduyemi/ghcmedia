"use client";
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
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var dialog_1 = require("@/components/ui/dialog");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var textarea_1 = require("@/components/ui/textarea");
var select_1 = require("@/components/ui/select");
var CONTACT_OPTIONS = [
    { value: "general-enquiry", label: "General enquiry" },
    { value: "media-team", label: "Joining the media team" },
    { value: "photography-videography", label: "Photography or videography" },
    { value: "livestream", label: "Livestream or technical support" },
    { value: "website-social-media", label: "Website or social media" },
    { value: "event-coverage", label: "Event coverage" },
    { value: "volunteering", label: "Volunteering or collaboration" },
    { value: "other", label: "Something else" },
];
var initialForm = {
    name: "",
    email: "",
    phone: "",
    enquiryType: "",
    subject: "",
    message: ""
};
function ContactMediaDialog(_a) {
    var onSubmit = _a.onSubmit, controlledOpen = _a.open, onOpenChange = _a.onOpenChange;
    var _b = react_1.useState(false), internalOpen = _b[0], setInternalOpen = _b[1];
    var isControlled = controlledOpen !== undefined;
    var open = isControlled ? controlledOpen : internalOpen;
    var _c = react_1.useState(initialForm), form = _c[0], setForm = _c[1];
    var _d = react_1.useState(false), isSubmitting = _d[0], setIsSubmitting = _d[1];
    var _e = react_1.useState(""), error = _e[0], setError = _e[1];
    var _f = react_1.useState(false), success = _f[0], setSuccess = _f[1];
    function updateField(field, value) {
        setForm(function (current) {
            var _a;
            return (__assign(__assign({}, current), (_a = {}, _a[field] = value, _a)));
        });
        setError("");
    }
    function handleSubmit(event) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        event.preventDefault();
                        setError("");
                        if (!form.enquiryType) {
                            setError("Please select how we can help you.");
                            return [2 /*return*/];
                        }
                        if (!onSubmit) {
                            setError("The contact form is not connected to a submission service yet.");
                            return [2 /*return*/];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, 4, 5]);
                        setIsSubmitting(true);
                        return [4 /*yield*/, onSubmit(form)];
                    case 2:
                        _b.sent();
                        setSuccess(true);
                        setForm(initialForm);
                        return [3 /*break*/, 5];
                    case 3:
                        _a = _b.sent();
                        setError("We couldn't send your message. Please try again in a moment.");
                        return [3 /*break*/, 5];
                    case 4:
                        setIsSubmitting(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    function handleOpenChange(nextOpen) {
        if (!isControlled) {
            setInternalOpen(nextOpen);
        }
        onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(nextOpen);
        if (!nextOpen) {
            setError("");
            setSuccess(false);
        }
    }
    return (React.createElement(dialog_1.Dialog, { open: open, onOpenChange: handleOpenChange },
        !isControlled && (React.createElement(button_1.Button, { type: "button", variant: "outline", onClick: function () { return handleOpenChange(true); }, className: "inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#0C2340]/35 bg-transparent px-7 text-sm font-semibold text-[#0C2340] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0C2340] hover:bg-[#0C2340]/[0.04] focus-visible:ring-2 focus-visible:ring-[#00A3E0] sm:w-auto sm:min-w-[190px]" },
            "Contact Media Leadership",
            React.createElement(lucide_react_1.MessageCircle, { className: "ml-2 h-4 w-4" }))),
        React.createElement(dialog_1.DialogContent, { className: "max-h-[90dvh] overflow-y-auto border-0 bg-white p-0 shadow-2xl sm:max-w-[640px] sm:rounded-3xl" }, success ? (React.createElement("div", { className: "px-6 py-12 text-center sm:px-10 sm:py-16" },
            React.createElement("div", { className: "mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600" },
                React.createElement(lucide_react_1.CheckCircle2, { className: "h-8 w-8" })),
            React.createElement(dialog_1.DialogHeader, { className: "items-center space-y-3" },
                React.createElement(dialog_1.DialogTitle, { className: "text-2xl font-bold tracking-tight text-[#0C2340] sm:text-3xl" }, "Message received!"),
                React.createElement(dialog_1.DialogDescription, { className: "max-w-sm text-base leading-7 text-slate-600" }, "Thank you for reaching out to the Media Team. We appreciate your message and look forward to connecting with you.")),
            React.createElement(button_1.Button, { type: "button", onClick: function () {
                    setSuccess(false);
                    handleOpenChange(false);
                }, className: "mt-8 min-h-11 rounded-full bg-[#0C2340] px-7 text-white hover:bg-[#00A3E0]" }, "Close"))) : (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "relative overflow-hidden bg-[#0C2340] px-6 py-7 text-white sm:px-9 sm:py-9" },
                React.createElement("div", { className: "pointer-events-none absolute -right-12 -top-20 h-48 w-48 rounded-full border border-white/10" }),
                React.createElement("div", { className: "pointer-events-none absolute -right-2 -top-10 h-32 w-32 rounded-full border border-[#00A3E0]/40" }),
                React.createElement("div", { className: "relative" },
                    React.createElement("div", { className: "mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[#41B6E6] ring-1 ring-white/15" },
                        React.createElement(lucide_react_1.MessageCircle, { className: "h-5 w-5" })),
                    React.createElement(dialog_1.DialogHeader, { className: "space-y-3 text-left" },
                        React.createElement("p", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-[#41B6E6]" }, "Let's connect"),
                        React.createElement(dialog_1.DialogTitle, { className: "max-w-md text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl" }, "Get in touch with Media Leadership"),
                        React.createElement(dialog_1.DialogDescription, { className: "max-w-md text-sm leading-6 text-white/70 sm:text-base" }, "Have a question, an idea, or want to serve with us? Tell us a little about what you need.")))),
            React.createElement("form", { onSubmit: handleSubmit, className: "space-y-5 px-6 py-7 sm:px-9 sm:py-8" },
                React.createElement("div", { className: "grid gap-5 sm:grid-cols-2" },
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement(label_1.Label, { htmlFor: "contact-name", className: "text-sm font-semibold text-[#0C2340]" },
                            "Full name ",
                            React.createElement("span", { className: "text-rose-500" }, "*")),
                        React.createElement(input_1.Input, { id: "contact-name", name: "name", autoComplete: "name", placeholder: "Your full name", value: form.name, onChange: function (event) { return updateField("name", event.target.value); }, required: true, maxLength: 100, className: "h-12 rounded-xl border-slate-200 bg-slate-50/70 px-4 placeholder:text-slate-400 focus-visible:ring-[#00A3E0]" })),
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement(label_1.Label, { htmlFor: "contact-email", className: "text-sm font-semibold text-[#0C2340]" },
                            "Email address ",
                            React.createElement("span", { className: "text-rose-500" }, "*")),
                        React.createElement(input_1.Input, { id: "contact-email", name: "email", type: "email", autoComplete: "email", placeholder: "you@example.com", value: form.email, onChange: function (event) { return updateField("email", event.target.value); }, required: true, maxLength: 254, className: "h-12 rounded-xl border-slate-200 bg-slate-50/70 px-4 placeholder:text-slate-400 focus-visible:ring-[#00A3E0]" }))),
                React.createElement("div", { className: "grid gap-5 sm:grid-cols-2" },
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement(label_1.Label, { htmlFor: "contact-phone", className: "text-sm font-semibold text-[#0C2340]" }, "Phone number"),
                        React.createElement(input_1.Input, { id: "contact-phone", name: "phone", type: "tel", autoComplete: "tel", placeholder: "Your phone number", value: form.phone, onChange: function (event) { return updateField("phone", event.target.value); }, maxLength: 30, className: "h-12 rounded-xl border-slate-200 bg-slate-50/70 px-4 placeholder:text-slate-400 focus-visible:ring-[#00A3E0]" })),
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement(label_1.Label, { htmlFor: "contact-enquiry", className: "text-sm font-semibold text-[#0C2340]" },
                            "How can we help you? ",
                            React.createElement("span", { className: "text-rose-500" }, "*")),
                        React.createElement(select_1.Select, { value: form.enquiryType, onValueChange: function (value) {
                                if (value !== null) {
                                    updateField("enquiryType", value);
                                }
                            } },
                            React.createElement(select_1.SelectTrigger, { id: "contact-enquiry", className: "h-12 rounded-xl border-slate-200 bg-slate-50/70 px-4 focus:ring-[#00A3E0]", "aria-label": "How can we help you?" },
                                React.createElement(select_1.SelectValue, { placeholder: "Choose an option" })),
                            React.createElement(select_1.SelectContent, null, CONTACT_OPTIONS.map(function (option) { return (React.createElement(select_1.SelectItem, { key: option.value, value: option.value }, option.label)); }))))),
                React.createElement("div", { className: "space-y-2" },
                    React.createElement(label_1.Label, { htmlFor: "contact-subject", className: "text-sm font-semibold text-[#0C2340]" },
                        "Subject ",
                        React.createElement("span", { className: "text-rose-500" }, "*")),
                    React.createElement(input_1.Input, { id: "contact-subject", name: "subject", placeholder: "What is your message about?", value: form.subject, onChange: function (event) { return updateField("subject", event.target.value); }, required: true, maxLength: 150, className: "h-12 rounded-xl border-slate-200 bg-slate-50/70 px-4 placeholder:text-slate-400 focus-visible:ring-[#00A3E0]" })),
                React.createElement("div", { className: "space-y-2" },
                    React.createElement(label_1.Label, { htmlFor: "contact-message", className: "text-sm font-semibold text-[#0C2340]" },
                        "Message ",
                        React.createElement("span", { className: "text-rose-500" }, "*")),
                    React.createElement(textarea_1.Textarea, { id: "contact-message", name: "message", placeholder: "Share a few details so we can better assist you...", value: form.message, onChange: function (event) { return updateField("message", event.target.value); }, required: true, minLength: 10, maxLength: 3000, rows: 4, className: "min-h-32 resize-y rounded-xl border-slate-200 bg-slate-50/70 px-4 py-3 placeholder:text-slate-400 focus-visible:ring-[#00A3E0]" }),
                    React.createElement("p", { className: "text-right text-xs text-slate-400" },
                        form.message.length,
                        "/3000")),
                error && (React.createElement("p", { role: "alert", className: "rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700" }, error)),
                React.createElement("div", { className: "flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between" },
                    React.createElement("p", { className: "max-w-xs text-xs leading-5 text-slate-500" }, "Your details will only be used to respond to your enquiry."),
                    React.createElement(button_1.Button, { type: "submit", disabled: isSubmitting, className: "min-h-12 rounded-full bg-[#0C2340] px-7 text-sm font-semibold text-white shadow-md shadow-[#0C2340]/10 transition-all hover:bg-[#00A3E0] disabled:opacity-60" }, isSubmitting ? (React.createElement(React.Fragment, null,
                        React.createElement(lucide_react_1.LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
                        "Sending...")) : (React.createElement(React.Fragment, null,
                        "Send message",
                        React.createElement(lucide_react_1.ArrowRight, { className: "ml-2 h-4 w-4" })))))))))));
}
exports["default"] = ContactMediaDialog;
