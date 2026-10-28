"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var ratings_1 = require("@/data/ratings");
var StatusBadge_1 = require("@/components/assessment/ratings/shared/StatusBadge");
function formatDate(value) {
    var date = new Date(value);
    if (Number.isNaN(date.getTime()))
        return "Date unavailable";
    return new Intl.DateTimeFormat("en-NG", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Africa/Lagos"
    }).format(date);
}
function getServiceName(serviceType) {
    var _a, _b;
    if (!serviceType)
        return "General report";
    return ((_b = (_a = ratings_1.serviceDefinitions.find(function (service) { return service.id === serviceType; })) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "Service report");
}
function ReportDetailDialog(_a) {
    var report = _a.report, open = _a.open, onClose = _a.onClose, _b = _a.publicOnly, publicOnly = _b === void 0 ? true : _b;
    var dialogRef = react_1.useRef(null);
    var closeButtonRef = react_1.useRef(null);
    var shouldReduceMotion = framer_motion_1.useReducedMotion();
    var reduceMotion = shouldReduceMotion !== null && shouldReduceMotion !== void 0 ? shouldReduceMotion : false;
    var canDisplayReport = !!report &&
        (!publicOnly ||
            (report.visibility === "public" && report.status === "published"));
    react_1.useEffect(function () {
        var _a;
        if (!open || !canDisplayReport)
            return;
        var previousActiveElement = document.activeElement;
        (_a = closeButtonRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        var handleKeyDown = function (event) {
            if (event.key === "Escape") {
                onClose();
            }
            if (event.key !== "Tab" || !dialogRef.current)
                return;
            var focusableElements = dialogRef.current.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
            if (focusableElements.length === 0)
                return;
            var firstElement = focusableElements[0];
            var lastElement = focusableElements[focusableElements.length - 1];
            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }
            else if (!event.shiftKey &&
                document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";
        return function () {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
            previousActiveElement === null || previousActiveElement === void 0 ? void 0 : previousActiveElement.focus();
        };
    }, [open, canDisplayReport, onClose]);
    if (!open || !report || !canDisplayReport)
        return null;
    var score = report.summary.approvedAverageRating;
    var completion = report.summary.checklistCompletionPercentage;
    return (React.createElement(framer_motion_1.AnimatePresence, null, open && (React.createElement(framer_motion_1.motion.div, { key: "report-detail-overlay", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: reduceMotion ? 0 : 0.2 }, className: "fixed inset-0 z-[100] flex items-end justify-center bg-[#071629]/70 p-0 backdrop-blur-sm sm:items-center sm:p-5", onMouseDown: function (event) {
            if (event.target === event.currentTarget)
                onClose();
        } },
        React.createElement(framer_motion_1.motion.div, { ref: dialogRef, role: "dialog", "aria-modal": "true", "aria-labelledby": "report-dialog-title", "aria-describedby": "report-dialog-description", initial: reduceMotion
                ? false
                : { opacity: 0, y: 24, scale: 0.985 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 16, scale: 0.99 }, transition: { duration: reduceMotion ? 0 : 0.25 }, className: "relative max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:max-h-[88vh] sm:rounded-3xl" },
            React.createElement("div", { className: "sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-slate-100 bg-white/95 px-5 py-4 backdrop-blur sm:px-7" },
                React.createElement("div", { className: "flex items-center gap-2 text-sm font-semibold text-[#0C2340]" },
                    React.createElement(lucide_react_1.FileBarChart2, { size: 18, className: "text-[#00A3E0]", "aria-hidden": "true" }),
                    "Report details"),
                React.createElement("button", { ref: closeButtonRef, type: "button", onClick: onClose, "aria-label": "Close report details", className: "flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-[#0C2340] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0]" },
                    React.createElement(lucide_react_1.X, { size: 19, "aria-hidden": "true" }))),
            React.createElement("div", { className: "p-5 sm:p-7" },
                React.createElement("div", { className: "flex flex-wrap items-center gap-2" },
                    React.createElement("span", { className: "rounded-full bg-[#E7F7FC] px-3 py-1.5 text-xs font-semibold text-[#087FAD]" }, ratings_1.reportTypeLabels[report.reportType]),
                    React.createElement(StatusBadge_1.StatusBadge, { status: report.status })),
                React.createElement("h2", { id: "report-dialog-title", className: "mt-5 text-2xl font-bold leading-tight tracking-tight text-[#0C2340] sm:text-3xl" }, report.title),
                React.createElement("p", { id: "report-dialog-description", className: "mt-3 max-w-2xl text-sm leading-7 text-slate-600" }, report.approvedPublicSummary ||
                    "No approved public summary has been provided for this report."),
                React.createElement("div", { className: "mt-6 grid gap-3 sm:grid-cols-2" },
                    React.createElement("div", { className: "flex items-start gap-3 rounded-xl border border-slate-200 p-4" },
                        React.createElement(lucide_react_1.CalendarDays, { size: 18, className: "mt-0.5 shrink-0 text-[#00A3E0]", "aria-hidden": "true" }),
                        React.createElement("div", null,
                            React.createElement("p", { className: "text-xs font-semibold uppercase tracking-wide text-slate-500" }, "Report date"),
                            React.createElement("p", { className: "mt-1 text-sm font-semibold text-[#0C2340]" }, formatDate(report.date)))),
                    React.createElement("div", { className: "flex items-start gap-3 rounded-xl border border-slate-200 p-4" },
                        React.createElement(lucide_react_1.ClipboardList, { size: 18, className: "mt-0.5 shrink-0 text-[#00A3E0]", "aria-hidden": "true" }),
                        React.createElement("div", null,
                            React.createElement("p", { className: "text-xs font-semibold uppercase tracking-wide text-slate-500" }, "Service"),
                            React.createElement("p", { className: "mt-1 text-sm font-semibold text-[#0C2340]" }, getServiceName(report.serviceType))))),
                React.createElement("section", { className: "mt-8", "aria-labelledby": "report-metrics-heading" },
                    React.createElement("h3", { id: "report-metrics-heading", className: "text-base font-bold text-[#0C2340]" }, "Report metrics"),
                    React.createElement("div", { className: "mt-4 grid gap-3 sm:grid-cols-2" },
                        React.createElement("div", { className: "rounded-2xl bg-[#F7F9FC] p-5" },
                            React.createElement("p", { className: "text-xs font-semibold uppercase tracking-wide text-slate-500" }, "Approved average rating"),
                            React.createElement("p", { className: "mt-3 text-3xl font-bold tracking-tight text-[#0C2340]" }, typeof score === "number" && Number.isFinite(score)
                                ? score.toFixed(1) + "%"
                                : "—"),
                            React.createElement("p", { className: "mt-1 text-xs text-slate-500" }, typeof score === "number"
                                ? "Recorded in the report"
                                : "No approved rating available")),
                        React.createElement("div", { className: "rounded-2xl bg-[#F7F9FC] p-5" },
                            React.createElement("p", { className: "text-xs font-semibold uppercase tracking-wide text-slate-500" }, "Checklist completion"),
                            React.createElement("p", { className: "mt-3 text-3xl font-bold tracking-tight text-[#0C2340]" }, typeof completion === "number" &&
                                Number.isFinite(completion)
                                ? completion + "%"
                                : "—"),
                            React.createElement("p", { className: "mt-1 text-xs text-slate-500" }, typeof completion === "number"
                                ? "Recorded in the report"
                                : "No completion figure available")))),
                React.createElement("section", { className: "mt-8", "aria-labelledby": "report-highlights-heading" },
                    React.createElement("div", { className: "flex items-center gap-2" },
                        React.createElement(lucide_react_1.CheckCircle2, { size: 19, className: "text-[#008A4B]", "aria-hidden": "true" }),
                        React.createElement("h3", { id: "report-highlights-heading", className: "text-base font-bold text-[#0C2340]" }, "Highlights and observations")),
                    report.highlights.length > 0 ? (React.createElement("ul", { className: "mt-4 space-y-3" }, report.highlights.map(function (highlight) { return (React.createElement("li", { key: highlight.id, className: "rounded-xl border border-slate-200 p-4" },
                        highlight.category && (React.createElement("p", { className: "text-[11px] font-bold uppercase tracking-wide text-[#0087BD]" }, highlight.category)),
                        React.createElement("p", { className: "font-semibold text-[#0C2340]" }, highlight.title),
                        React.createElement("p", { className: "mt-1 text-sm leading-6 text-slate-600" }, highlight.description))); }))) : (React.createElement("div", { className: "mt-4 rounded-xl border border-dashed border-slate-300 px-4 py-6 text-center" },
                        React.createElement("p", { className: "text-sm text-slate-500" }, "No highlights have been added to this report.")))),
                React.createElement("div", { className: "mt-8 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4" },
                    React.createElement(lucide_react_1.LockKeyhole, { size: 17, className: "mt-0.5 shrink-0 text-slate-500", "aria-hidden": "true" }),
                    React.createElement("p", { className: "text-xs leading-5 text-slate-500" }, "Only approved information should be published. Detailed assessor notes, private feedback, and identifiable team member information must remain restricted unless access is explicitly authorized.")),
                React.createElement("div", { className: "mt-6 flex justify-end" },
                    React.createElement("button", { type: "button", onClick: onClose, className: "inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0C2340] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#16395F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2" }, "Close report"))))))));
}
exports["default"] = ReportDetailDialog;
