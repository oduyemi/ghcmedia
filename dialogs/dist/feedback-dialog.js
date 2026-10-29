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
exports.ReportFeedbackDialog = void 0;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var formatFeedbackDate = function (value) {
    var date = new Date(value);
    if (Number.isNaN(date.getTime()))
        return "Date unavailable";
    return new Intl.DateTimeFormat("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZone: "Africa/Lagos"
    }).format(date);
};
exports.ReportFeedbackDialog = function (_a) {
    var reportId = _a.reportId, reportTitle = _a.reportTitle, open = _a.open, onClose = _a.onClose;
    var _b = react_1.useState([]), feedback = _b[0], setFeedback = _b[1];
    var _c = react_1.useState(""), message = _c[0], setMessage = _c[1];
    var _d = react_1.useState(false), loading = _d[0], setLoading = _d[1];
    var _e = react_1.useState(false), submitting = _e[0], setSubmitting = _e[1];
    var _f = react_1.useState(null), error = _f[0], setError = _f[1];
    var _g = react_1.useState(null), success = _g[0], setSuccess = _g[1];
    var _h = react_1.useState(0), total = _h[0], setTotal = _h[1];
    var loadFeedback = react_1.useCallback(function (signal) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, err_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setLoading(true);
                    setError(null);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch("/api/report-feedback/" + encodeURIComponent(reportId) + "?page=1&limit=20", {
                            method: "GET",
                            credentials: "same-origin",
                            cache: "no-store",
                            signal: signal,
                            headers: { Accept: "application/json" }
                        })];
                case 2:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = (_b.sent());
                    if (!response.ok || !data.success || !data.data) {
                        throw new Error((_a = data.message) !== null && _a !== void 0 ? _a : "Unable to load feedback for this report.");
                    }
                    setFeedback(data.data.feedback);
                    setTotal(data.data.pagination.total);
                    return [3 /*break*/, 6];
                case 4:
                    err_1 = _b.sent();
                    if (err_1 instanceof Error && err_1.name === "AbortError")
                        return [2 /*return*/];
                    setError(err_1 instanceof Error ? err_1.message : "Unable to load feedback.");
                    return [3 /*break*/, 6];
                case 5:
                    if (!(signal === null || signal === void 0 ? void 0 : signal.aborted))
                        setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); }, [reportId]);
    react_1.useEffect(function () {
        if (!open)
            return;
        var controller = new AbortController();
        void loadFeedback(controller.signal);
        return function () { return controller.abort(); };
    }, [open, loadFeedback]);
    react_1.useEffect(function () {
        if (!open)
            return;
        var handleKeyDown = function (event) {
            if (event.key === "Escape" && !submitting)
                onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return function () { return window.removeEventListener("keydown", handleKeyDown); };
    }, [open, submitting, onClose]);
    react_1.useEffect(function () {
        if (!open)
            return;
        var previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return function () {
            document.body.style.overflow = previousOverflow;
        };
    }, [open]);
    var handleSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var trimmedMessage, response, data, err_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    event.preventDefault();
                    trimmedMessage = message.trim();
                    if (trimmedMessage.length < 3 || trimmedMessage.length > 3000) {
                        setError("Feedback must contain between 3 and 3000 characters.");
                        return [2 /*return*/];
                    }
                    setSubmitting(true);
                    setError(null);
                    setSuccess(null);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 5, 6, 7]);
                    return [4 /*yield*/, fetch("/api/report-feedback", {
                            method: "POST",
                            credentials: "same-origin",
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                reportId: reportId,
                                message: trimmedMessage
                            })
                        })];
                case 2:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = (_b.sent());
                    if (!response.ok || !data.success) {
                        throw new Error((_a = data.message) !== null && _a !== void 0 ? _a : "Unable to submit your feedback.");
                    }
                    setMessage("");
                    setSuccess("Your feedback has been submitted successfully.");
                    return [4 /*yield*/, loadFeedback()];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 7];
                case 5:
                    err_2 = _b.sent();
                    setError(err_2 instanceof Error
                        ? err_2.message
                        : "Unable to submit your feedback.");
                    return [3 /*break*/, 7];
                case 6:
                    setSubmitting(false);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    if (!open)
        return null;
    return (React.createElement("div", { className: "fixed inset-0 z-[100] flex items-end justify-center bg-[#0C2340]/60 p-0 backdrop-blur-sm sm:items-center sm:p-4 md:p-6", onMouseDown: function (event) {
            if (event.target === event.currentTarget && !submitting) {
                onClose();
            }
        } },
        React.createElement("section", { role: "dialog", "aria-modal": "true", "aria-labelledby": "report-feedback-title", "aria-describedby": "report-feedback-description", className: "flex max-h-[94dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[1.5rem] bg-white shadow-2xl sm:max-h-[90dvh] sm:rounded-[1.5rem] lg:max-h-[88dvh]" },
            React.createElement("header", { className: "relative shrink-0 overflow-hidden bg-[#0C2340] px-5 py-5 text-white sm:px-7 sm:py-6" },
                React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full border border-white/10" }),
                React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute -bottom-20 right-20 h-36 w-36 rounded-full border border-[#41B6E6]/10" }),
                React.createElement("div", { className: "relative flex items-start justify-between gap-4" },
                    React.createElement("div", { className: "min-w-0 flex-1" },
                        React.createElement("span", { className: "inline-flex max-w-full items-center gap-2 rounded-full border border-[#41B6E6]/25 bg-[#41B6E6]/10 px-3 py-1.5 text-xs font-semibold text-[#8CDEFA]" },
                            React.createElement(lucide_react_1.MessageSquareText, { size: 14, className: "shrink-0", "aria-hidden": "true" }),
                            React.createElement("span", null, "Community feedback")),
                        React.createElement("h2", { id: "report-feedback-title", className: "mt-4 text-xl font-bold tracking-tight sm:text-2xl" }, "Share your feedback"),
                        React.createElement("p", { id: "report-feedback-description", className: "mt-2 max-w-lg break-words text-sm leading-6 text-white/70" }, reportTitle)),
                    React.createElement("button", { type: "button", onClick: onClose, disabled: submitting, "aria-label": "Close feedback dialog", className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#41B6E6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C2340] disabled:cursor-not-allowed disabled:opacity-50" },
                        React.createElement(lucide_react_1.X, { size: 19, "aria-hidden": "true" })))),
            React.createElement("div", { className: "min-h-0 flex-1 space-y-6 overflow-y-auto overscroll-contain p-4 sm:p-6 md:p-7" },
                React.createElement("form", { onSubmit: handleSubmit, className: "space-y-3.5" },
                    React.createElement("div", { className: "space-y-1.5" },
                        React.createElement("label", { htmlFor: "report-feedback-message", className: "block text-sm font-bold text-[#0C2340]" }, "Your comments"),
                        React.createElement("p", { className: "text-xs leading-5 text-slate-500" }, "Tell us what you think about this service report.")),
                    React.createElement("textarea", { id: "report-feedback-message", value: message, onChange: function (event) {
                            setMessage(event.target.value);
                            setError(null);
                            setSuccess(null);
                        }, minLength: 3, maxLength: 3000, required: true, rows: 5, "aria-invalid": Boolean(error), "aria-describedby": "report-feedback-hint report-feedback-count", placeholder: "Share your thoughts about this service report...", className: "min-h-32 w-full resize-y rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 py-3.5 text-sm leading-6 text-[#0C2340] outline-none transition placeholder:text-slate-400 focus:border-[#00A3E0] focus:bg-white focus:ring-4 focus:ring-[#00A3E0]/10 sm:min-h-36" }),
                    React.createElement("div", { className: "flex flex-col gap-1.5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:gap-3" },
                        React.createElement("span", { id: "report-feedback-hint", className: "leading-5" }, "Keep your feedback respectful and constructive."),
                        React.createElement("span", { id: "report-feedback-count", className: "shrink-0 self-end tabular-nums sm:self-auto " + (message.length >= 2800 ? "font-semibold text-amber-700" : "text-slate-400"), "aria-live": "polite" },
                            message.length.toLocaleString(),
                            "/3,000")),
                    error && (React.createElement("div", { role: "alert", className: "flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700" },
                        React.createElement(lucide_react_1.AlertCircle, { size: 17, className: "mt-0.5 shrink-0", "aria-hidden": "true" }),
                        React.createElement("p", { className: "min-w-0 break-words leading-5" }, error))),
                    success && (React.createElement("div", { role: "status", className: "flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-3 text-sm text-emerald-800" },
                        React.createElement(lucide_react_1.CheckCircle2, { size: 17, className: "mt-0.5 shrink-0", "aria-hidden": "true" }),
                        React.createElement("p", { className: "min-w-0 break-words leading-5" }, success))),
                    React.createElement("button", { type: "submit", disabled: submitting ||
                            message.trim().length < 3 ||
                            message.trim().length > 3000, className: "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0C2340] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#16395F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-55" }, submitting ? (React.createElement(React.Fragment, null,
                        React.createElement(lucide_react_1.LoaderCircle, { size: 17, className: "shrink-0 animate-spin", "aria-hidden": "true" }),
                        React.createElement("span", null, "Submitting feedback..."))) : (React.createElement(React.Fragment, null,
                        React.createElement(lucide_react_1.Send, { size: 16, className: "shrink-0", "aria-hidden": "true" }),
                        React.createElement("span", null, "Submit feedback"))))),
                React.createElement("div", { className: "border-t border-slate-100 pt-5 sm:pt-6" },
                    React.createElement("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" },
                        React.createElement("div", { className: "min-w-0" },
                            React.createElement("h3", { className: "text-sm font-bold text-[#0C2340]" }, "Community responses"),
                            React.createElement("p", { className: "mt-1 text-xs text-slate-500" },
                                total.toLocaleString(),
                                " ",
                                total === 1 ? "response" : "responses")),
                        React.createElement("button", { type: "button", onClick: function () { return void loadFeedback(); }, disabled: loading, className: "inline-flex min-h-9 w-full items-center justify-center gap-2 self-start rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-[#087FAD] transition-colors hover:bg-[#EAF7FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:self-auto" },
                            loading && (React.createElement(lucide_react_1.LoaderCircle, { size: 14, className: "animate-spin", "aria-hidden": "true" })),
                            loading ? "Refreshing..." : "Refresh responses")),
                    loading ? (React.createElement("div", { role: "status", className: "mt-5 space-y-3" },
                        [0, 1].map(function (item) { return (React.createElement("div", { key: item, className: "animate-pulse rounded-xl border border-slate-100 p-4" },
                            React.createElement("div", { className: "h-3 w-28 rounded bg-slate-200" }),
                            React.createElement("div", { className: "mt-3 h-3 w-full rounded bg-slate-100" }),
                            React.createElement("div", { className: "mt-2 h-3 w-3/4 rounded bg-slate-100" }))); }),
                        React.createElement("span", { className: "sr-only" }, "Loading feedback..."))) : feedback.length === 0 ? (React.createElement("div", { className: "mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center sm:px-6" },
                        React.createElement("div", { className: "mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FC] text-[#087FAD]" },
                            React.createElement(lucide_react_1.MessageSquareText, { size: 22, "aria-hidden": "true" })),
                        React.createElement("p", { className: "mt-3 text-sm font-semibold text-[#0C2340]" }, "No feedback yet"),
                        React.createElement("p", { className: "mx-auto mt-1 max-w-xs text-xs leading-5 text-slate-500" }, "Be the first to share constructive feedback on this report."))) : (React.createElement("ul", { className: "mt-4 space-y-3" }, feedback.map(function (item) {
                        var authorName = item.author
                            ? (item.author.firstName + " " + item.author.lastName).trim()
                            : "Community member";
                        return (React.createElement("li", { key: item.id, className: "rounded-2xl border border-slate-100 bg-[#F8FAFC] p-3.5 transition-colors hover:border-slate-200 sm:p-4" },
                            React.createElement("div", { className: "flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3" },
                                React.createElement("p", { className: "min-w-0 break-words text-sm font-semibold text-[#0C2340]" }, authorName || "Community member"),
                                React.createElement("time", { dateTime: item.createdAt, className: "shrink-0 text-[11px] leading-5 text-slate-400 sm:text-right" }, formatFeedbackDate(item.createdAt))),
                            React.createElement("p", { className: "mt-3 whitespace-pre-wrap break-words [overflow-wrap:anywhere] text-sm leading-6 text-slate-600" }, item.message)));
                    }))))))));
};
