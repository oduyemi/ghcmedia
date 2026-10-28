"use client";
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ChecklistResults = void 0;
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var checklist_1 = require("@/data/checklist");
var statusConfig = {
    COMPLETED: {
        label: "Completed",
        className: "border-emerald-200/80 bg-emerald-50 text-emerald-700",
        icon: lucide_react_1.CheckCircle2
    },
    NOT_COMPLETED: {
        label: "Not completed",
        className: "border-rose-200/80 bg-rose-50 text-rose-700",
        icon: lucide_react_1.XCircle
    },
    NOT_APPLICABLE: {
        label: "Not applicable",
        className: "border-slate-200 bg-slate-100 text-slate-600",
        icon: lucide_react_1.MinusCircle
    },
    PENDING_REVIEW: {
        label: "Pending review",
        className: "border-amber-200/80 bg-amber-50 text-amber-700",
        icon: lucide_react_1.Clock3
    }
};
var submissionConfig = {
    SUBMITTED: {
        label: "Submitted",
        className: "border-sky-200 bg-sky-50 text-sky-700",
        icon: lucide_react_1.FileCheck2
    },
    PENDING_REVIEW: {
        label: "Pending review",
        className: "border-amber-200 bg-amber-50 text-amber-700",
        icon: lucide_react_1.Clock3
    },
    APPROVED: {
        label: "Approved",
        className: "border-emerald-200 bg-emerald-50 text-emerald-700",
        icon: lucide_react_1.ShieldCheck
    }
};
var ease = [0.22, 1, 0.36, 1];
exports.ChecklistResults = function (_a) {
    var records = _a.records;
    var _b = react_1.useState([]), expandedIds = _b[0], setExpandedIds = _b[1];
    var shouldReduceMotion = framer_motion_1.useReducedMotion();
    function toggleRecord(id) {
        setExpandedIds(function (current) {
            return current.includes(id)
                ? current.filter(function (item) { return item !== id; })
                : __spreadArrays(current, [id]);
        });
    }
    return (React.createElement("section", { "aria-labelledby": "checklist-results-title" },
        React.createElement("div", { className: "mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between" },
            React.createElement("div", { className: "max-w-2xl" },
                React.createElement("div", { className: "flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#007FAF] sm:text-[11px]" },
                    React.createElement("span", { className: "h-1.5 w-1.5 rounded-full bg-[#00A3E0]" }),
                    "Reporting archive"),
                React.createElement("h2", { id: "checklist-results-title", className: "mt-2 text-2xl font-bold tracking-[-0.035em] text-[#0C2340] sm:text-3xl" }, "Checklist results"),
                React.createElement("p", { className: "mt-2 text-sm leading-6 text-slate-500 sm:leading-7" }, "Explore recorded service checklists, review individual item statuses, and follow up on areas that need attention.")),
            React.createElement("div", { className: "flex items-center gap-3 self-start rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-sm shadow-slate-900/[0.02] sm:self-auto" },
                React.createElement("div", { className: "flex h-9 w-9 items-center justify-center rounded-xl bg-[#00A3E0]/[0.08] text-[#007FAF]" },
                    React.createElement(lucide_react_1.FileCheck2, { className: "h-4.5 w-4.5" })),
                React.createElement("div", null,
                    React.createElement("p", { className: "text-lg font-bold leading-none tabular-nums text-[#0C2340]" }, records.length),
                    React.createElement("p", { className: "mt-1 text-[10px] font-medium uppercase tracking-wider text-slate-400" }, records.length === 1 ? "Record" : "Records")))),
        records.length === 0 ? (React.createElement(framer_motion_1.motion.div, { initial: shouldReduceMotion ? false : { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, className: "relative overflow-hidden rounded-[26px] border border-dashed border-slate-300 bg-white px-6 py-12 text-center sm:py-16" },
            React.createElement("div", { "aria-hidden": "true", className: "absolute -right-12 -top-16 h-40 w-40 rounded-full bg-[#41B6E6]/10 blur-3xl" }),
            React.createElement("div", { className: "relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#00A3E0]/15 bg-[#00A3E0]/[0.06] text-[#007FAF]" },
                React.createElement(lucide_react_1.FileCheck2, { className: "h-6 w-6" })),
            React.createElement("h3", { className: "relative mt-5 text-base font-bold text-[#0C2340]" }, "No checklist records found"),
            React.createElement("p", { className: "relative mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500" }, "There are no recorded results for the selected reporting period. Try another timeframe if you expected to see records here."))) : (React.createElement("div", { className: "space-y-3" }, records.map(function (record, index) {
            var isExpanded = expandedIds.includes(record.id);
            var effectiveService = checklist_1.getEffectiveServiceType(record);
            var completed = record.items.filter(function (item) { return item.status === "COMPLETED"; }).length;
            var incomplete = record.items.filter(function (item) { return item.status === "NOT_COMPLETED"; }).length;
            var pending = record.items.filter(function (item) { return item.status === "PENDING_REVIEW"; }).length;
            var notApplicable = record.items.filter(function (item) { return item.status === "NOT_APPLICABLE"; }).length;
            var itemTotal = record.items.length;
            var completionRate = itemTotal > 0
                ? Math.round((completed / itemTotal) * 100)
                : 0;
            var submission = submissionConfig[record.submissionStatus];
            var SubmissionIcon = submission.icon;
            return (React.createElement(framer_motion_1.motion.article, { key: record.id, layout: !shouldReduceMotion, initial: shouldReduceMotion
                    ? false
                    : { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: {
                    duration: 0.4,
                    delay: shouldReduceMotion ? 0 : Math.min(index * 0.045, 0.25),
                    ease: ease
                }, className: "group/record relative overflow-hidden rounded-[22px] border bg-white transition-colors duration-200 " + (isExpanded
                    ? "border-[#00A3E0]/30 shadow-[0_16px_50px_-36px_rgba(12,35,64,0.32)]"
                    : "border-slate-200/80 shadow-sm shadow-slate-900/[0.025] hover:border-slate-300 hover:shadow-md") },
                React.createElement(framer_motion_1.motion.div, { initial: false, animate: { opacity: isExpanded ? 1 : 0 }, transition: { duration: 0.2 }, "aria-hidden": "true", className: "absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#007FAF] via-[#00A3E0] to-[#41B6E6]" }),
                React.createElement("button", { type: "button", "aria-expanded": isExpanded, "aria-controls": "record-details-" + record.id, onClick: function () { return toggleRecord(record.id); }, className: "flex w-full items-start gap-3.5 p-4 text-left outline-none transition-colors hover:bg-slate-50/40 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00A3E0] sm:items-center sm:gap-4 sm:p-5" },
                    React.createElement(framer_motion_1.motion.span, { animate: shouldReduceMotion
                            ? undefined
                            : { scale: isExpanded ? 1.04 : 1 }, className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 sm:h-12 sm:w-12 sm:rounded-2xl " + (isExpanded
                            ? "bg-[#0C2340] text-white"
                            : "bg-[#00A3E0]/[0.08] text-[#007FAF] group-hover/record:bg-[#00A3E0]/[0.13]") },
                        React.createElement(lucide_react_1.FileCheck2, { className: "h-5 w-5" })),
                    React.createElement("span", { className: "min-w-0 flex-1" },
                        React.createElement("span", { className: "flex flex-wrap items-center gap-2" },
                            React.createElement("span", { className: "text-sm font-bold text-[#0C2340] sm:text-base" }, checklist_1.getServiceName(effectiveService)),
                            record.submissionStatus === "APPROVED" && (React.createElement("span", { className: "hidden items-center gap-1 text-[10px] font-semibold text-emerald-700 sm:inline-flex" },
                                React.createElement(lucide_react_1.CheckCircle2, { className: "h-3.5 w-3.5" }),
                                "Verified"))),
                        React.createElement("span", { className: "mt-1.5 block text-xs text-slate-500" }, checklist_1.formatServiceDate(record.serviceDate)),
                        React.createElement("span", { className: "mt-3 flex flex-wrap gap-1.5 sm:gap-2" },
                            React.createElement("span", { className: "inline-flex items-center gap-1.5 rounded-lg border border-emerald-100 bg-emerald-50/80 px-2 py-1 text-[10px] font-semibold text-emerald-700 sm:text-[11px]" },
                                React.createElement(lucide_react_1.CheckCircle2, { className: "h-3 w-3" }),
                                completed,
                                " completed"),
                            incomplete > 0 && (React.createElement("span", { className: "inline-flex items-center gap-1.5 rounded-lg border border-rose-100 bg-rose-50/80 px-2 py-1 text-[10px] font-semibold text-rose-700 sm:text-[11px]" },
                                React.createElement(lucide_react_1.XCircle, { className: "h-3 w-3" }),
                                incomplete,
                                " incomplete")),
                            pending > 0 && (React.createElement("span", { className: "inline-flex items-center gap-1.5 rounded-lg border border-amber-100 bg-amber-50/80 px-2 py-1 text-[10px] font-semibold text-amber-700 sm:text-[11px]" },
                                React.createElement(lucide_react_1.Clock3, { className: "h-3 w-3" }),
                                pending,
                                " pending")))),
                    React.createElement("span", { className: "flex shrink-0 items-center gap-3 self-center" },
                        React.createElement("span", { className: "hidden items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[10px] font-semibold sm:inline-flex " + submission.className },
                            React.createElement(SubmissionIcon, { className: "h-3.5 w-3.5" }),
                            submission.label),
                        React.createElement(framer_motion_1.motion.span, { animate: shouldReduceMotion
                                ? undefined
                                : { rotate: isExpanded ? 180 : 0 }, transition: { duration: 0.22 }, className: "flex h-8 w-8 items-center justify-center rounded-xl transition-colors " + (isExpanded
                                ? "bg-[#00A3E0]/10 text-[#007FAF]"
                                : "text-slate-400 group-hover/record:bg-slate-100 group-hover/record:text-[#0C2340]") },
                            React.createElement(lucide_react_1.ChevronDown, { className: "h-4 w-4" })))),
                React.createElement(framer_motion_1.AnimatePresence, { initial: false }, isExpanded && (React.createElement(framer_motion_1.motion.div, { id: "record-details-" + record.id, key: "details", initial: shouldReduceMotion
                        ? false
                        : { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: shouldReduceMotion
                        ? undefined
                        : { opacity: 0, height: 0 }, transition: {
                        duration: shouldReduceMotion ? 0 : 0.3,
                        ease: ease
                    }, className: "overflow-hidden" },
                    React.createElement("div", { className: "border-t border-slate-100 px-4 py-5 sm:px-5 sm:py-6" },
                        React.createElement("div", { className: "mb-5 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center" },
                            React.createElement("div", null,
                                React.createElement("p", { className: "text-[10px] font-bold uppercase tracking-[0.16em] text-[#007FAF]" }, "Record breakdown"),
                                React.createElement("h3", { className: "mt-1 text-sm font-bold text-[#0C2340]" }, "Checklist item details")),
                            React.createElement("span", { className: "inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-semibold text-slate-600" },
                                React.createElement(SubmissionIcon, { className: "h-3.5 w-3.5" }),
                                submission.label)),
                        itemTotal > 0 && (React.createElement("div", { className: "mb-5 rounded-2xl border border-slate-200/70 bg-slate-50/60 p-4" },
                            React.createElement("div", { className: "flex items-center justify-between gap-3" },
                                React.createElement("div", null,
                                    React.createElement("p", { className: "text-xs font-semibold text-[#0C2340]" }, "Completion overview"),
                                    React.createElement("p", { className: "mt-1 text-[11px] text-slate-500" },
                                        completed,
                                        " of ",
                                        itemTotal,
                                        " items completed")),
                                React.createElement("span", { className: "text-lg font-bold tabular-nums text-[#007FAF]" },
                                    completionRate,
                                    "%")),
                            React.createElement("div", { role: "progressbar", "aria-label": "Record checklist completion", "aria-valuemin": 0, "aria-valuemax": itemTotal, "aria-valuenow": completed, className: "mt-3 h-2 overflow-hidden rounded-full bg-slate-200" },
                                React.createElement(framer_motion_1.motion.div, { initial: shouldReduceMotion
                                        ? false
                                        : { width: 0 }, animate: {
                                        width: completionRate + "%"
                                    }, transition: {
                                        duration: shouldReduceMotion ? 0 : 0.55,
                                        ease: ease
                                    }, className: "h-full rounded-full bg-gradient-to-r from-[#007FAF] to-[#00A3E0]" })),
                            (pending > 0 || notApplicable > 0) && (React.createElement("div", { className: "mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-500" },
                                pending > 0 && (React.createElement("span", null,
                                    pending,
                                    " pending review")),
                                notApplicable > 0 && (React.createElement("span", null,
                                    notApplicable,
                                    " not applicable")))))),
                        record.items.length > 0 ? (React.createElement("div", { className: "space-y-2.5" }, record.items.map(function (item, itemIndex) {
                            var config = statusConfig[item.status];
                            var StatusIcon = config.icon;
                            return (React.createElement(framer_motion_1.motion.div, { key: item.id, initial: shouldReduceMotion
                                    ? false
                                    : { opacity: 0, y: 7 }, animate: { opacity: 1, y: 0 }, transition: {
                                    duration: 0.25,
                                    delay: shouldReduceMotion
                                        ? 0
                                        : Math.min(itemIndex * 0.035, 0.2),
                                    ease: ease
                                }, className: "rounded-2xl border border-slate-200/70 bg-white p-4 transition-colors hover:border-slate-300 sm:p-5" },
                                React.createElement("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between" },
                                    React.createElement("div", { className: "min-w-0" },
                                        React.createElement("div", { className: "flex items-start gap-2.5" },
                                            React.createElement("span", { className: "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500" },
                                                React.createElement("span", { className: "text-[10px] font-bold tabular-nums" }, String(itemIndex + 1).padStart(2, "0"))),
                                            React.createElement("div", { className: "min-w-0" },
                                                React.createElement("h4", { className: "text-sm font-semibold leading-6 text-[#0C2340]" }, item.title),
                                                item.requirement && (React.createElement("p", { className: "mt-1.5 text-xs leading-6 text-slate-500" }, item.requirement))))),
                                    React.createElement("span", { className: "inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[10px] font-semibold " + config.className },
                                        React.createElement(StatusIcon, { className: "h-3.5 w-3.5" }),
                                        config.label)),
                                item.notes && (React.createElement("div", { className: "mt-4 flex items-start gap-2.5 rounded-xl bg-slate-50 px-3.5 py-3" },
                                    React.createElement(lucide_react_1.AlertCircle, { className: "mt-0.5 h-4 w-4 shrink-0 text-slate-400" }),
                                    React.createElement("p", { className: "text-xs leading-6 text-slate-600" },
                                        React.createElement("span", { className: "font-semibold text-slate-700" },
                                            "Note:",
                                            " "),
                                        item.notes)))));
                        }))) : (React.createElement("div", { className: "rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 px-4 py-8 text-center" },
                            React.createElement(lucide_react_1.FileCheck2, { className: "mx-auto h-6 w-6 text-slate-400" }),
                            React.createElement("p", { className: "mt-3 text-sm font-semibold text-[#0C2340]" }, "No checklist item details"),
                            React.createElement("p", { className: "mt-1 text-xs leading-5 text-slate-500" }, "This record does not contain any individual checklist items."))),
                        record.observations && (React.createElement("div", { className: "relative mt-5 overflow-hidden rounded-2xl border border-[#00A3E0]/15 bg-[#F1F9FD] p-4 sm:p-5" },
                            React.createElement("div", { "aria-hidden": "true", className: "absolute -right-8 -top-12 h-32 w-32 rounded-full bg-[#41B6E6]/10 blur-2xl" }),
                            React.createElement("div", { className: "relative flex items-start gap-3" },
                                React.createElement("span", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#007FAF] shadow-sm ring-1 ring-[#00A3E0]/10" },
                                    React.createElement(lucide_react_1.FileCheck2, { className: "h-4 w-4" })),
                                React.createElement("div", { className: "min-w-0" },
                                    React.createElement("h3", { className: "text-sm font-bold text-[#0C2340]" }, "Approved observations or notes"),
                                    React.createElement("p", { className: "mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-600" }, record.observations))))),
                        (record.submittedAt ||
                            record.reviewedAt ||
                            record.reviewedBy) && (React.createElement("div", { className: "mt-5 border-t border-slate-100 pt-4" },
                            React.createElement("div", { className: "mb-3 flex items-center gap-2" },
                                React.createElement(lucide_react_1.ShieldCheck, { className: "h-4 w-4 text-[#007FAF]" }),
                                React.createElement("h3", { className: "text-xs font-bold text-[#0C2340]" }, "Record history")),
                            React.createElement("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3" },
                                record.submittedAt && (React.createElement("div", { className: "rounded-xl bg-slate-50 p-3" },
                                    React.createElement("p", { className: "text-[10px] font-semibold uppercase tracking-wider text-slate-400" }, "Submitted"),
                                    React.createElement("p", { className: "mt-1.5 text-xs font-medium text-slate-700" }, checklist_1.formatServiceDate(record.submittedAt.slice(0, 10))))),
                                record.reviewedAt && (React.createElement("div", { className: "rounded-xl bg-slate-50 p-3" },
                                    React.createElement("p", { className: "text-[10px] font-semibold uppercase tracking-wider text-slate-400" }, "Reviewed"),
                                    React.createElement("p", { className: "mt-1.5 text-xs font-medium text-slate-700" }, checklist_1.formatServiceDate(record.reviewedAt.slice(0, 10))))),
                                record.reviewedBy && (React.createElement("div", { className: "rounded-xl bg-slate-50 p-3" },
                                    React.createElement("p", { className: "text-[10px] font-semibold uppercase tracking-wider text-slate-400" }, "Reviewed by"),
                                    React.createElement("p", { className: "mt-1.5 break-words text-xs font-medium text-slate-700" }, record.reviewedBy)))))),
                        React.createElement("div", { className: "mt-5 flex justify-end border-t border-slate-100 pt-4" },
                            React.createElement("button", { type: "button", onClick: function () { return toggleRecord(record.id); }, className: "inline-flex min-h-10 items-center gap-2 rounded-xl px-3 text-xs font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#0C2340] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2" },
                                "Close details",
                                React.createElement(lucide_react_1.ArrowUpRight, { className: "h-3.5 w-3.5 rotate-45" })))))))));
        })))));
};
