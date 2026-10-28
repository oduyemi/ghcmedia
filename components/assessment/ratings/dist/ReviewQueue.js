"use client";
"use strict";
exports.__esModule = true;
exports.ReviewQueue = void 0;
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var ratings_1 = require("@/data/ratings");
var StatusBadge_1 = require("@/components/assessment/ratings/shared/StatusBadge");
var ease = [0.22, 1, 0.36, 1];
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
function getServiceName(report) {
    var _a, _b;
    if (!report.serviceType) {
        return ratings_1.reportStatusLabels[report.status] === "Approved"
            ? "Approved report"
            : "General assessment";
    }
    return ((_b = (_a = ratings_1.serviceDefinitions.find(function (service) { return service.id === report.serviceType; })) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "Media team service");
}
function getQueueLabel(report) {
    if (report.status === "draft") {
        return {
            label: "Needs submission",
            description: "This report is still a draft.",
            icon: lucide_react_1.ClipboardCheck,
            color: "text-slate-600",
            background: "bg-slate-100"
        };
    }
    if (report.status === "pending-review") {
        return {
            label: "Awaiting review",
            description: "Leadership review is pending.",
            icon: lucide_react_1.Clock3,
            color: "text-amber-700",
            background: "bg-amber-50"
        };
    }
    return {
        label: "Awaiting publication",
        description: "Approved, but not yet publicly available.",
        icon: lucide_react_1.ShieldCheck,
        color: "text-sky-700",
        background: "bg-sky-50"
    };
}
exports.ReviewQueue = function (_a) {
    var _b = _a.reports, reports = _b === void 0 ? [] : _b, _c = _a.loading, loading = _c === void 0 ? false : _c, onViewReport = _a.onViewReport, _d = _a.className, className = _d === void 0 ? "" : _d;
    var shouldReduceMotion = framer_motion_1.useReducedMotion();
    var reduceMotion = shouldReduceMotion !== null && shouldReduceMotion !== void 0 ? shouldReduceMotion : false;
    // Include only records that still require a workflow step.
    var queueReports = reports.filter(function (report) {
        return report.status === "draft" ||
            report.status === "pending-review" ||
            (report.status === "approved" &&
                report.visibility !== "public");
    });
    var pendingReviewCount = queueReports.filter(function (report) { return report.status === "pending-review"; }).length;
    var draftCount = queueReports.filter(function (report) { return report.status === "draft"; }).length;
    var publicationCount = queueReports.filter(function (report) {
        return report.status === "approved" &&
            report.visibility !== "public";
    }).length;
    return (React.createElement("section", { id: "review-queue", "aria-labelledby": "review-queue-heading", className: "relative isolate overflow-hidden bg-[#F8FAFD] py-16 sm:py-20 lg:py-24 " + className },
        React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute -right-24 top-10 -z-10 h-72 w-72 rounded-full bg-[#D9F4FF]/50 blur-3xl" }),
        React.createElement("div", { className: "mx-auto max-w-7xl px-5 sm:px-8 lg:px-10" },
            React.createElement("div", { className: "flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between" },
                React.createElement("div", { className: "max-w-2xl" },
                    React.createElement("div", { className: "mb-4 inline-flex items-center gap-2 rounded-full border border-[#C8EAF7] bg-white px-3.5 py-2 shadow-sm" },
                        React.createElement(lucide_react_1.ShieldCheck, { className: "h-4 w-4 text-[#0087BD]", "aria-hidden": "true" }),
                        React.createElement("span", { className: "text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#087FBA]" }, "Leadership workspace")),
                    React.createElement("h2", { id: "review-queue-heading", className: "text-3xl font-black tracking-[-0.045em] text-[#0C2340] sm:text-4xl lg:text-5xl" }, "The review room."),
                    React.createElement("p", { className: "mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base" }, "A central place to inspect submitted assessments, follow up on drafts, and identify reports awaiting publication.")),
                React.createElement("div", { className: "flex items-center gap-3 rounded-2xl border border-[#DCE8F0] bg-white p-4 shadow-sm" },
                    React.createElement("span", { className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E5F7FC] text-[#0087BD]" },
                        React.createElement(lucide_react_1.Inbox, { className: "h-5 w-5", "aria-hidden": "true" })),
                    React.createElement("div", null,
                        React.createElement("p", { className: "text-2xl font-black tracking-tight text-[#0C2340]" }, loading ? "—" : queueReports.length),
                        React.createElement("p", { className: "text-xs font-medium text-slate-500" }, queueReports.length === 1
                            ? "Report in queue"
                            : "Reports in queue")))),
            React.createElement("div", { className: "mt-9 grid gap-3 sm:grid-cols-3" }, [
                {
                    label: "Drafts",
                    count: draftCount,
                    icon: lucide_react_1.ClipboardCheck,
                    iconClass: "bg-slate-100 text-slate-600",
                    borderClass: "border-slate-200"
                },
                {
                    label: "Pending review",
                    count: pendingReviewCount,
                    icon: lucide_react_1.Clock3,
                    iconClass: "bg-amber-50 text-amber-700",
                    borderClass: "border-amber-100"
                },
                {
                    label: "Awaiting publication",
                    count: publicationCount,
                    icon: lucide_react_1.ShieldCheck,
                    iconClass: "bg-sky-50 text-sky-700",
                    borderClass: "border-sky-100"
                },
            ].map(function (item, index) {
                var Icon = item.icon;
                return (React.createElement(framer_motion_1.motion.div, { key: item.label, initial: reduceMotion ? false : { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: {
                        duration: reduceMotion ? 0 : 0.4,
                        delay: reduceMotion ? 0 : index * 0.06,
                        ease: ease
                    }, className: "flex items-center justify-between gap-4 rounded-2xl border " + item.borderClass + " bg-white p-4 sm:p-5" },
                    React.createElement("div", { className: "flex items-center gap-3" },
                        React.createElement("span", { className: "flex h-11 w-11 items-center justify-center rounded-2xl " + item.iconClass },
                            React.createElement(Icon, { className: "h-5 w-5", "aria-hidden": "true" })),
                        React.createElement("span", { className: "text-sm font-bold text-[#0C2340]" }, item.label)),
                    React.createElement("span", { className: "text-2xl font-black tabular-nums text-[#0C2340]" }, loading ? "—" : item.count)));
            })),
            React.createElement("div", { className: "mt-8" }, loading ? (React.createElement("div", { role: "status", className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3" },
                [1, 2, 3].map(function (item) { return (React.createElement("div", { key: item, className: "animate-pulse rounded-[1.5rem] border border-slate-200 bg-white p-6" },
                    React.createElement("div", { className: "h-10 w-10 rounded-xl bg-slate-100" }),
                    React.createElement("div", { className: "mt-6 h-4 w-2/3 rounded bg-slate-100" }),
                    React.createElement("div", { className: "mt-3 h-3 w-1/2 rounded bg-slate-100" }),
                    React.createElement("div", { className: "mt-8 h-10 rounded-xl bg-slate-100" }))); }),
                React.createElement("span", { className: "sr-only" }, "Loading review queue."))) : queueReports.length === 0 ? (React.createElement("div", { className: "relative overflow-hidden rounded-[1.75rem] border border-dashed border-[#C8DDE9] bg-white px-6 py-12 text-center sm:px-12 sm:py-16" },
                React.createElement("div", { "aria-hidden": "true", className: "absolute -right-12 -top-16 h-40 w-40 rounded-full bg-[#E5F7FC]/70" }),
                React.createElement("div", { "aria-hidden": "true", className: "absolute -bottom-20 -left-12 h-40 w-40 rounded-full bg-[#F0EBFF]/60" }),
                React.createElement("div", { className: "relative mx-auto flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-[#E5F7FC] text-[#0087BD] shadow-sm" },
                    React.createElement(lucide_react_1.CheckCircle2, { className: "h-8 w-8", "aria-hidden": "true" })),
                React.createElement("h3", { className: "relative mt-6 text-xl font-black tracking-tight text-[#0C2340] sm:text-2xl" }, "Nothing waiting in the wings."),
                React.createElement("p", { className: "relative mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500" }, reports.length === 0
                    ? "Review records will appear here when assessment data is connected."
                    : "There are no drafts, pending reviews, or unpublished approved reports in the records provided."),
                React.createElement("div", { className: "relative mt-6 inline-flex items-center gap-2 rounded-full bg-[#F0FAF5] px-4 py-2 text-xs font-bold text-[#008A4B]" },
                    React.createElement(lucide_react_1.CheckCircle2, { className: "h-4 w-4", "aria-hidden": "true" }),
                    "You\u2019re all caught up"))) : (React.createElement("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3" }, queueReports.map(function (report, index) {
                var queueState = getQueueLabel(report);
                var QueueIcon = queueState.icon;
                return (React.createElement(framer_motion_1.motion.article, { key: report.id, initial: reduceMotion ? false : { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.1 }, transition: {
                        duration: reduceMotion ? 0 : 0.45,
                        delay: reduceMotion ? 0 : index * 0.05,
                        ease: ease
                    }, className: "group flex flex-col rounded-[1.5rem] border border-slate-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#BFE8FA] hover:shadow-xl hover:shadow-[#0C2340]/[0.05] sm:p-6" },
                    React.createElement("div", { className: "flex items-start justify-between gap-3" },
                        React.createElement("span", { className: "flex h-11 w-11 items-center justify-center rounded-2xl " + queueState.background + " " + queueState.color },
                            React.createElement(QueueIcon, { className: "h-5 w-5", "aria-hidden": "true" })),
                        React.createElement(StatusBadge_1.StatusBadge, { status: report.status })),
                    React.createElement("div", { className: "mt-6" },
                        React.createElement("p", { className: "text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400" }, getServiceName(report)),
                        React.createElement("h3", { className: "mt-2 line-clamp-2 text-lg font-extrabold leading-6 tracking-tight text-[#0C2340]" }, report.title),
                        React.createElement("div", { className: "mt-4 flex items-center gap-2 text-xs font-medium text-slate-500" },
                            React.createElement(lucide_react_1.CalendarDays, { className: "h-4 w-4 shrink-0 text-slate-400", "aria-hidden": "true" }),
                            React.createElement("span", null, formatDate(report.date))),
                        React.createElement("p", { className: "mt-4 text-xs font-semibold " + queueState.color }, queueState.description)),
                    React.createElement("div", { className: "mt-auto border-t border-slate-100 pt-5" },
                        React.createElement("div", { className: "flex items-center justify-between gap-3" },
                            React.createElement("span", { className: "text-xs text-slate-400" },
                                "Report ID: ",
                                report.id),
                            React.createElement("button", { type: "button", onClick: function () { return onViewReport === null || onViewReport === void 0 ? void 0 : onViewReport(report); }, disabled: !onViewReport, className: "inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#0C2340] px-3.5 py-2 text-xs font-bold text-white transition hover:bg-[#163B60] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" },
                                React.createElement(lucide_react_1.FileSearch, { className: "h-4 w-4", "aria-hidden": "true" }),
                                "Inspect report",
                                React.createElement(lucide_react_1.ArrowRight, { className: "h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5", "aria-hidden": "true" }))))));
            })))),
            React.createElement("div", { className: "mt-6 flex items-start gap-3 rounded-2xl border border-[#E0E8F0] bg-white/75 p-4" },
                React.createElement(lucide_react_1.LockKeyhole, { className: "mt-0.5 h-4 w-4 shrink-0 text-slate-400", "aria-hidden": "true" }),
                React.createElement("p", { className: "text-xs leading-5 text-slate-500" },
                    React.createElement("span", { className: "font-bold text-[#0C2340]" }, "Leadership access only."),
                    " ",
                    "Protect this queue with server-side authentication and authorization. Hiding the component in the interface alone does not secure review records.")))));
};
