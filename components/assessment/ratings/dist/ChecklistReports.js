"use client";
"use strict";
exports.__esModule = true;
exports.ChecklistReports = void 0;
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var ease = [0.22, 1, 0.36, 1];
var statusConfig = {
    draft: {
        label: "Draft",
        description: "Not yet submitted for review.",
        className: "bg-slate-100 text-slate-600",
        icon: lucide_react_1.Clock3
    },
    submitted: {
        label: "Submitted",
        description: "Awaiting checklist review.",
        className: "bg-amber-50 text-amber-700",
        icon: lucide_react_1.ClipboardCheck
    },
    reviewed: {
        label: "Reviewed",
        description: "Review completed; approval may still be pending.",
        className: "bg-sky-50 text-sky-700",
        icon: lucide_react_1.Search
    },
    approved: {
        label: "Approved",
        description: "Checklist report approved.",
        className: "bg-emerald-50 text-emerald-700",
        icon: lucide_react_1.ShieldCheck
    }
};
function formatDate(date) {
    var parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) {
        return "Date unavailable";
    }
    return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "Africa/Lagos"
    }).format(parsedDate);
}
function getCompletion(report) {
    var completedItems = report.completedItems, applicableItems = report.applicableItems;
    if (completedItems === null ||
        applicableItems === null ||
        !Number.isFinite(completedItems) ||
        !Number.isFinite(applicableItems) ||
        applicableItems <= 0 ||
        completedItems < 0 ||
        completedItems > applicableItems) {
        return null;
    }
    return Math.round((completedItems / applicableItems) * 100);
}
function isValidItemCount(value) {
    return (value !== null &&
        Number.isFinite(value) &&
        Number.isInteger(value) &&
        value >= 0);
}
exports.ChecklistReports = function (_a) {
    var _b = _a.reports, reports = _b === void 0 ? [] : _b, _c = _a.loading, loading = _c === void 0 ? false : _c, onViewReport = _a.onViewReport, _d = _a.className, className = _d === void 0 ? "" : _d;
    var shouldReduceMotion = framer_motion_1.useReducedMotion();
    var reduceMotion = shouldReduceMotion !== null && shouldReduceMotion !== void 0 ? shouldReduceMotion : false;
    var submittedReports = reports.filter(function (report) { return report.status !== "draft"; });
    var reviewedReports = reports.filter(function (report) {
        return report.status === "reviewed" ||
            report.status === "approved";
    });
    var approvedReports = reports.filter(function (report) { return report.status === "approved"; });
    var reportsWithCompletion = reports.filter(function (report) { return getCompletion(report) !== null; });
    var averageCompletion = reportsWithCompletion.length > 0
        ? Math.round(reportsWithCompletion.reduce(function (total, report) { var _a; return total + ((_a = getCompletion(report)) !== null && _a !== void 0 ? _a : 0); }, 0) / reportsWithCompletion.length)
        : null;
    return (React.createElement("section", { id: "checklist-reports", "aria-labelledby": "checklist-reports-heading", className: "relative isolate overflow-hidden bg-white py-16 sm:py-20 lg:py-24 " + className },
        React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute -right-24 top-20 -z-10 h-72 w-72 rounded-full bg-[#DDF5FF]/60 blur-3xl" }),
        React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute -left-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-[#EDE5FF]/40 blur-3xl" }),
        React.createElement("div", { className: "mx-auto max-w-7xl px-5 sm:px-8 lg:px-10" },
            React.createElement("div", { className: "grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end" },
                React.createElement("div", { className: "max-w-2xl" },
                    React.createElement("div", { className: "mb-5 inline-flex items-center gap-2 rounded-full border border-[#D8CBFF] bg-[#F7F3FF] px-3.5 py-2" },
                        React.createElement(lucide_react_1.ListChecks, { className: "h-4 w-4 text-[#7651C9]", "aria-hidden": "true" }),
                        React.createElement("span", { className: "text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#6943BB]" }, "Service readiness")),
                    React.createElement("h2", { id: "checklist-reports-heading", className: "text-3xl font-black tracking-[-0.05em] text-[#0C2340] sm:text-4xl lg:text-5xl" },
                        "The details that make",
                        React.createElement("span", { className: "text-[#7651C9]" }, " great services.")),
                    React.createElement("p", { className: "mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base" }, "Follow checklist submissions, see how many applicable items have been completed, and track reports through review and approval.")),
                React.createElement("div", { className: "flex items-center gap-3 rounded-2xl border border-[#E5DDFB] bg-[#FAF8FF] p-4" },
                    React.createElement("span", { className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EDE5FF] text-[#7651C9]" },
                        React.createElement(lucide_react_1.ClipboardCheck, { className: "h-6 w-6", "aria-hidden": "true" })),
                    React.createElement("div", null,
                        React.createElement("p", { className: "text-2xl font-black tracking-tight text-[#0C2340]" }, loading ? "—" : reports.length),
                        React.createElement("p", { className: "text-xs font-medium text-slate-500" }, "Checklist reports")))),
            React.createElement("div", { className: "mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" },
                React.createElement("div", { className: "relative overflow-hidden rounded-[1.5rem] bg-[#0C2340] p-5 text-white sm:p-6" },
                    React.createElement("div", { "aria-hidden": "true", className: "absolute -right-7 -top-8 h-28 w-28 rounded-full bg-[#00A3E0]/20" }),
                    React.createElement(lucide_react_1.ClipboardCheck, { className: "h-5 w-5 text-[#41B6E6]", "aria-hidden": "true" }),
                    React.createElement("p", { className: "mt-6 text-3xl font-black tracking-tight" }, loading ? "—" : reports.length),
                    React.createElement("p", { className: "mt-2 text-sm font-bold" }, "All records"),
                    React.createElement("p", { className: "mt-1 text-xs leading-5 text-slate-300" }, "Checklist reports provided to this section.")),
                React.createElement(SummaryCard, { icon: lucide_react_1.FileCheck2, label: "Submitted", value: loading ? "—" : submittedReports.length, description: "Drafts excluded.", theme: "cyan" }),
                React.createElement(SummaryCard, { icon: lucide_react_1.CheckCheck, label: "Reviewed or approved", value: loading ? "—" : reviewedReports.length, description: "Review completed.", theme: "green" }),
                React.createElement("div", { className: "relative overflow-hidden rounded-[1.5rem] border border-[#E5DDFB] bg-[#F8F5FF] p-5 sm:p-6" },
                    React.createElement("div", { "aria-hidden": "true", className: "absolute -bottom-10 -right-8 h-28 w-28 rounded-full bg-[#D8CAFF]/45" }),
                    React.createElement("div", { className: "relative" },
                        React.createElement("div", { className: "flex items-center justify-between gap-3" },
                            React.createElement("span", { className: "text-xs font-bold text-[#6943BB]" }, "Average completion"),
                            React.createElement("span", { className: "flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#7651C9]" },
                                React.createElement(lucide_react_1.ListChecks, { className: "h-4 w-4", "aria-hidden": "true" }))),
                        React.createElement("p", { className: "mt-5 text-3xl font-black tracking-tight text-[#0C2340]" }, loading
                            ? "—"
                            : averageCompletion === null
                                ? "—"
                                : averageCompletion + "%"),
                        React.createElement("p", { className: "mt-2 text-xs leading-5 text-slate-500" }, averageCompletion === null
                            ? "Available when valid checklist item counts are recorded."
                            : "Calculated from " + reportsWithCompletion.length + " report" + (reportsWithCompletion.length === 1 ? "" : "s") + " with valid completion data.")))),
            React.createElement("div", { className: "mt-12" },
                React.createElement("div", { className: "mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between" },
                    React.createElement("div", null,
                        React.createElement("h3", { className: "text-xl font-black tracking-tight text-[#0C2340] sm:text-2xl" }, "Checklist activity"),
                        React.createElement("p", { className: "mt-1 text-sm text-slate-500" }, "From preparation to final review.")),
                    React.createElement("div", { className: "inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-500" },
                        React.createElement("span", { className: "h-2 w-2 rounded-full bg-[#7651C9]" }),
                        loading ? "Loading records" : reports.length + " records")),
                loading ? (React.createElement("div", { role: "status", className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3" },
                    [1, 2, 3].map(function (item) { return (React.createElement("div", { key: item, className: "animate-pulse rounded-[1.5rem] border border-slate-200 p-6" },
                        React.createElement("div", { className: "h-10 w-10 rounded-xl bg-slate-100" }),
                        React.createElement("div", { className: "mt-6 h-4 w-2/3 rounded bg-slate-100" }),
                        React.createElement("div", { className: "mt-3 h-3 w-1/2 rounded bg-slate-100" }),
                        React.createElement("div", { className: "mt-7 h-2 rounded-full bg-slate-100" }),
                        React.createElement("div", { className: "mt-7 h-10 rounded-xl bg-slate-100" }))); }),
                    React.createElement("span", { className: "sr-only" }, "Loading checklist reports."))) : reports.length === 0 ? (React.createElement("div", { className: "relative overflow-hidden rounded-[1.75rem] border border-dashed border-[#D9D0F2] bg-[#FCFBFF] px-6 py-12 text-center sm:px-12 sm:py-16" },
                    React.createElement("div", { "aria-hidden": "true", className: "absolute -right-12 -top-16 h-40 w-40 rounded-full bg-[#EDE5FF]/60" }),
                    React.createElement("div", { "aria-hidden": "true", className: "absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-[#DDF5FF]/60" }),
                    React.createElement("div", { className: "relative mx-auto flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-[#EDE5FF] text-[#7651C9]" },
                        React.createElement(lucide_react_1.ClipboardCheck, { className: "h-8 w-8", "aria-hidden": "true" })),
                    React.createElement("h3", { className: "relative mt-6 text-xl font-black tracking-tight text-[#0C2340] sm:text-2xl" }, "The checklist story starts here."),
                    React.createElement("p", { className: "relative mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-500" }, reports.length === 0
                        ? "Checklist reports will appear here once submissions are connected. No completion figures are shown until real checklist records are available."
                        : "No checklist reports match the current view."),
                    React.createElement("div", { className: "relative mt-6 inline-flex items-center gap-2 rounded-full border border-[#E5DDFB] bg-white px-4 py-2 text-xs font-bold text-[#6943BB]" },
                        React.createElement(SparkleMark, null),
                        "Ready for your first report"))) : (React.createElement("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3" }, reports.map(function (report, index) {
                    var completion = getCompletion(report);
                    var status = statusConfig[report.status];
                    var StatusIcon = status.icon;
                    var hasValidCounts = isValidItemCount(report.completedItems) &&
                        isValidItemCount(report.applicableItems) &&
                        report.applicableItems !== null &&
                        report.applicableItems > 0 &&
                        report.completedItems !== null &&
                        report.completedItems <= report.applicableItems;
                    return (React.createElement(framer_motion_1.motion.article, { key: report.id, initial: reduceMotion ? false : { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.1 }, transition: {
                            duration: reduceMotion ? 0 : 0.45,
                            delay: reduceMotion ? 0 : index * 0.05,
                            ease: ease
                        }, className: "group flex flex-col overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#D9D0F2] hover:shadow-xl hover:shadow-[#0C2340]/[0.05]" },
                        React.createElement("div", { className: "h-1.5 bg-gradient-to-r from-[#7651C9] via-[#41B6E6] to-[#00A3E0]" }),
                        React.createElement("div", { className: "flex flex-1 flex-col p-5 sm:p-6" },
                            React.createElement("div", { className: "flex items-start justify-between gap-3" },
                                React.createElement("span", { className: "flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F0EBFF] text-[#7651C9]" },
                                    React.createElement(lucide_react_1.ClipboardCheck, { className: "h-5 w-5", "aria-hidden": "true" })),
                                React.createElement("span", { className: "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold " + status.className },
                                    React.createElement(StatusIcon, { className: "h-3.5 w-3.5", "aria-hidden": "true" }),
                                    status.label)),
                            React.createElement("div", { className: "mt-6" },
                                React.createElement("p", { className: "text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#7651C9]" }, report.serviceName),
                                React.createElement("h4", { className: "mt-2 line-clamp-2 text-lg font-extrabold leading-6 tracking-tight text-[#0C2340]" }, report.title),
                                React.createElement("div", { className: "mt-4 flex items-center gap-2 text-xs font-medium text-slate-500" },
                                    React.createElement(lucide_react_1.CalendarDays, { className: "h-4 w-4 shrink-0 text-slate-400", "aria-hidden": "true" }),
                                    React.createElement("span", null, formatDate(report.date)))),
                            React.createElement("div", { className: "mt-6 rounded-2xl bg-[#F8F7FC] p-4" },
                                React.createElement("div", { className: "flex items-end justify-between gap-3" },
                                    React.createElement("div", null,
                                        React.createElement("p", { className: "text-xs font-bold text-[#0C2340]" }, "Completion"),
                                        React.createElement("p", { className: "mt-1 text-xs text-slate-500" }, "Applicable items only")),
                                    React.createElement("p", { className: "text-xl font-black tracking-tight text-[#7651C9]" }, completion === null
                                        ? "—"
                                        : completion + "%")),
                                React.createElement("div", { className: "mt-3 h-2 overflow-hidden rounded-full bg-[#E8E3F3]", role: completion === null ? undefined : "progressbar", "aria-label": "Checklist completion", "aria-valuemin": completion === null ? undefined : 0, "aria-valuemax": completion === null ? undefined : 100, "aria-valuenow": completion !== null && completion !== void 0 ? completion : undefined },
                                    React.createElement("div", { className: "h-full rounded-full bg-gradient-to-r from-[#7651C9] to-[#41B6E6] transition-[width] duration-500", style: {
                                            width: completion === null
                                                ? "0%"
                                                : completion + "%"
                                        } })),
                                React.createElement("p", { className: "mt-3 text-xs text-slate-500" }, hasValidCounts
                                    ? report.completedItems + " of " + report.applicableItems + " applicable items completed"
                                    : "Completion details are unavailable")),
                            (report.submittedBy || report.reviewedBy) && (React.createElement("div", { className: "mt-4 space-y-2" },
                                report.submittedBy && (React.createElement("p", { className: "text-xs text-slate-500" },
                                    "Submitted by",
                                    " ",
                                    React.createElement("span", { className: "font-semibold text-slate-700" }, report.submittedBy))),
                                report.reviewedBy && (React.createElement("p", { className: "text-xs text-slate-500" },
                                    "Reviewed by",
                                    " ",
                                    React.createElement("span", { className: "font-semibold text-slate-700" }, report.reviewedBy))))),
                            React.createElement("div", { className: "mt-auto border-t border-slate-100 pt-5" },
                                React.createElement("div", { className: "mb-4 flex items-center gap-2 text-xs leading-5 text-slate-500" },
                                    React.createElement(StatusIcon, { className: "h-4 w-4 shrink-0", "aria-hidden": "true" }),
                                    status.description),
                                React.createElement("button", { type: "button", onClick: function () { return onViewReport === null || onViewReport === void 0 ? void 0 : onViewReport(report); }, disabled: !onViewReport, className: "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#0C2340] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#163B60] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" },
                                    "View checklist report",
                                    React.createElement(lucide_react_1.ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1", "aria-hidden": "true" }))))));
                })))),
            React.createElement("p", { className: "mt-6 text-xs leading-6 text-slate-400 text-center" }, "Completion excludes items marked not applicable. Missing answers are not automatically treated as zero, and checklist completion is separate from camera assessment ratings."))));
};
function SummaryCard(_a) {
    var Icon = _a.icon, label = _a.label, value = _a.value, description = _a.description, theme = _a.theme;
    var styles = {
        cyan: {
            card: "border-[#D5EFF9] bg-[#F1FAFE]",
            icon: "bg-[#DDF5FF] text-[#0087BD]"
        },
        green: {
            card: "border-[#D7F0E2] bg-[#F1FBF5]",
            icon: "bg-[#DDF6E7] text-[#008A4B]"
        }
    }[theme];
    return (React.createElement("div", { className: "rounded-[1.5rem] border p-5 sm:p-6 " + styles.card },
        React.createElement("div", { className: "flex items-center justify-between gap-3" },
            React.createElement("span", { className: "text-xs font-bold text-slate-600" }, label),
            React.createElement("span", { className: "flex h-9 w-9 items-center justify-center rounded-xl " + styles.icon },
                React.createElement(Icon, { className: "h-4 w-4", "aria-hidden": "true" }))),
        React.createElement("p", { className: "mt-5 text-3xl font-black tracking-tight text-[#0C2340]" }, value),
        React.createElement("p", { className: "mt-2 text-xs leading-5 text-slate-500" }, description)));
}
function SparkleMark() {
    return (React.createElement("span", { "aria-hidden": "true", className: "flex h-4 w-4 items-center justify-center text-[#7651C9]" },
        React.createElement(lucide_react_1.Check, { className: "h-3.5 w-3.5" })));
}
