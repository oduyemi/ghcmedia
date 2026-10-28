"use client";
"use strict";
exports.__esModule = true;
exports.ReportingControls = void 0;
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var periods = [
    {
        value: "weekly",
        label: "Weekly",
        description: "Review a single service week.",
        icon: lucide_react_1.CalendarDays,
        eyebrow: "7-day view"
    },
    {
        value: "monthly",
        label: "Monthly",
        description: "Review a complete calendar month.",
        icon: lucide_react_1.CalendarRange,
        eyebrow: "Monthly view"
    },
    {
        value: "custom",
        label: "Custom range",
        description: "Choose a specific date range.",
        icon: lucide_react_1.Clock3,
        eyebrow: "Flexible dates"
    },
];
var inputClassName = "mt-2.5 block h-12 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-[#0C2340] shadow-sm shadow-slate-900/[0.02] outline-none transition duration-200 hover:border-slate-300 focus:border-[#00A3E0] focus:ring-4 focus:ring-[#00A3E0]/10";
exports.ReportingControls = function (_a) {
    var period = _a.period, onPeriodChange = _a.onPeriodChange, selectedWeek = _a.selectedWeek, onWeekChange = _a.onWeekChange, selectedMonth = _a.selectedMonth, onMonthChange = _a.onMonthChange, startDate = _a.startDate, onStartDateChange = _a.onStartDateChange, endDate = _a.endDate, onEndDateChange = _a.onEndDateChange;
    var shouldReduceMotion = framer_motion_1.useReducedMotion();
    var invalidRange = Boolean(startDate && endDate && startDate > endDate);
    var rangeIncomplete = period === "custom" && (!startDate || !endDate);
    var selectedPeriod = periods.find(function (option) { return option.value === period; });
    return (React.createElement("section", { "aria-labelledby": "reporting-period-title", className: "group relative isolate overflow-hidden rounded-[26px] border border-slate-200/80 bg-white shadow-[0_20px_65px_-45px_rgba(12,35,64,0.28)] sm:rounded-[30px]" },
        React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute inset-0 -z-10 overflow-hidden" },
            React.createElement("div", { className: "absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#41B6E6]/[0.08] blur-3xl transition-transform duration-700 group-hover:translate-y-2" }),
            React.createElement("div", { className: "absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#00A3E0]/30 to-transparent" })),
        React.createElement("div", { className: "p-5 sm:p-7 lg:p-8" },
            React.createElement("div", { className: "flex items-start gap-4" },
                React.createElement(framer_motion_1.motion.div, { whileHover: shouldReduceMotion ? undefined : { rotate: -5, scale: 1.04 }, transition: { type: "spring", stiffness: 300, damping: 20 }, className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0C2340] text-white shadow-lg shadow-[#0C2340]/10 sm:h-14 sm:w-14" },
                    React.createElement(lucide_react_1.CalendarRange, { className: "h-5 w-5 sm:h-6 sm:w-6" })),
                React.createElement("div", { className: "min-w-0 flex-1" },
                    React.createElement("div", { className: "flex flex-wrap items-center gap-2" },
                        React.createElement("span", { className: "text-[10px] font-bold uppercase tracking-[0.18em] text-[#007FAF] sm:text-[11px]" }, "Reporting period"),
                        React.createElement("span", { className: "h-1 w-1 rounded-full bg-slate-300" }),
                        React.createElement("span", { className: "text-[10px] font-medium uppercase tracking-wider text-slate-400" }, "Filter records")),
                    React.createElement("h2", { id: "reporting-period-title", className: "mt-2 text-xl font-bold tracking-[-0.03em] text-[#0C2340] sm:text-2xl" }, "Choose your reporting view"),
                    React.createElement("p", { className: "mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:leading-7" }, "Narrow your checklist records to the period you want to review. Your selection determines the reporting timeframe."))),
            React.createElement("div", { className: "mt-7" },
                React.createElement("div", { className: "mb-3 flex items-center justify-between gap-3" },
                    React.createElement("h3", { className: "text-xs font-bold text-[#0C2340]" }, "Select a timeframe"),
                    React.createElement("span", { className: "text-[10px] font-medium text-slate-400" }, "Choose one")),
                React.createElement("div", { className: "grid gap-3 md:grid-cols-3" }, periods.map(function (option) {
                    var active = period === option.value;
                    var Icon = option.icon;
                    return (React.createElement("button", { key: option.value, type: "button", "aria-pressed": active, onClick: function () { return onPeriodChange(option.value); }, className: "group/period relative flex min-h-[132px] flex-col overflow-hidden rounded-2xl border p-4 text-left outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2 sm:p-5 " + (active
                            ? "border-[#00A3E0]/50 bg-[#00A3E0]/[0.055]"
                            : "border-slate-200/80 bg-white hover:border-[#00A3E0]/35 hover:bg-slate-50/80") },
                        active && (React.createElement(framer_motion_1.motion.div, { layoutId: "reporting-period-indicator", transition: shouldReduceMotion
                                ? { duration: 0 }
                                : {
                                    type: "spring",
                                    stiffness: 340,
                                    damping: 30
                                }, className: "absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#007FAF] via-[#00A3E0] to-[#41B6E6]" })),
                        React.createElement("div", { className: "flex w-full items-start justify-between gap-3" },
                            React.createElement(framer_motion_1.motion.span, { animate: shouldReduceMotion
                                    ? undefined
                                    : { scale: active ? 1.04 : 1 }, className: "flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200 " + (active
                                    ? "bg-[#00A3E0]/10 text-[#007FAF]"
                                    : "bg-slate-100 text-slate-500 group-hover/period:bg-[#00A3E0]/[0.07] group-hover/period:text-[#007FAF]") },
                                React.createElement(Icon, { className: "h-[19px] w-[19px]" })),
                            React.createElement("span", { className: "flex h-5 w-5 items-center justify-center rounded-full border transition-colors duration-200 " + (active
                                    ? "border-[#00A3E0] bg-[#00A3E0] text-white"
                                    : "border-slate-300 bg-white text-transparent") }, active && (React.createElement(lucide_react_1.Check, { className: "h-3 w-3", strokeWidth: 3 })))),
                        React.createElement("span", { className: "mt-4 flex items-center gap-2 text-sm font-bold text-[#0C2340]" },
                            option.label,
                            active && (React.createElement(framer_motion_1.motion.span, { initial: shouldReduceMotion ? false : { opacity: 0 }, animate: { opacity: 1 }, className: "rounded-full bg-[#00A3E0]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#007FAF]" }, "Active"))),
                        React.createElement("span", { className: "mt-1 text-xs leading-5 text-slate-500" }, option.description)));
                }))),
            React.createElement("div", { className: "mt-6 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 sm:p-5" },
                React.createElement("div", { className: "flex items-start gap-3" },
                    React.createElement("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#007FAF] shadow-sm" },
                        React.createElement(lucide_react_1.CalendarDays, { className: "h-4 w-4" })),
                    React.createElement("div", { className: "min-w-0 flex-1" },
                        React.createElement("div", { className: "flex flex-wrap items-center gap-2" },
                            React.createElement("h3", { className: "text-sm font-bold text-[#0C2340]" }, "Choose your dates"),
                            selectedPeriod && (React.createElement("span", { className: "rounded-full border border-[#00A3E0]/15 bg-white px-2.5 py-1 text-[10px] font-semibold text-[#007FAF]" }, selectedPeriod.eyebrow))),
                        React.createElement("p", { className: "mt-1 text-xs leading-5 text-slate-500" },
                            period === "weekly" &&
                                "Select a week to review records from Monday through Sunday.",
                            period === "monthly" &&
                                "Select a month to review its complete calendar period.",
                            period === "custom" &&
                                "Set a start and end date to define your reporting window."))),
                React.createElement(framer_motion_1.AnimatePresence, { mode: "wait", initial: false },
                    React.createElement(framer_motion_1.motion.div, { key: period, initial: shouldReduceMotion
                            ? false
                            : { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: shouldReduceMotion
                            ? undefined
                            : { opacity: 0, y: -5 }, transition: { duration: 0.22, ease: "easeOut" }, className: "mt-5" },
                        period === "weekly" && (React.createElement("div", { className: "max-w-sm" },
                            React.createElement("label", { htmlFor: "report-week", className: "text-xs font-semibold text-[#0C2340]" }, "Select week"),
                            React.createElement("input", { id: "report-week", type: "week", value: selectedWeek, onChange: function (event) {
                                    return onWeekChange(event.target.value);
                                }, className: inputClassName }),
                            React.createElement("p", { className: "mt-2 text-[11px] leading-5 text-slate-400" }, "The reporting week runs from Monday to Sunday."))),
                        period === "monthly" && (React.createElement("div", { className: "max-w-sm" },
                            React.createElement("label", { htmlFor: "report-month", className: "text-xs font-semibold text-[#0C2340]" }, "Select month"),
                            React.createElement("input", { id: "report-month", type: "month", value: selectedMonth, onChange: function (event) {
                                    return onMonthChange(event.target.value);
                                }, className: inputClassName }),
                            React.createElement("p", { className: "mt-2 text-[11px] leading-5 text-slate-400" }, "Includes the entire selected calendar month."))),
                        period === "custom" && (React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
                            React.createElement("div", null,
                                React.createElement("label", { htmlFor: "report-start", className: "text-xs font-semibold text-[#0C2340]" }, "Start date"),
                                React.createElement("input", { id: "report-start", type: "date", value: startDate, max: endDate || undefined, onChange: function (event) {
                                        return onStartDateChange(event.target.value);
                                    }, "aria-invalid": invalidRange, className: inputClassName })),
                            React.createElement("div", null,
                                React.createElement("label", { htmlFor: "report-end", className: "text-xs font-semibold text-[#0C2340]" }, "End date"),
                                React.createElement("input", { id: "report-end", type: "date", value: endDate, min: startDate || undefined, onChange: function (event) {
                                        return onEndDateChange(event.target.value);
                                    }, "aria-invalid": invalidRange, className: inputClassName })))))),
                React.createElement(framer_motion_1.AnimatePresence, { initial: false },
                    invalidRange && (React.createElement(framer_motion_1.motion.p, { initial: shouldReduceMotion ? false : { opacity: 0, y: -4 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -4 }, role: "alert", className: "mt-3 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs leading-5 text-red-700" }, "The start date must be on or before the end date.")),
                    !invalidRange && rangeIncomplete && (React.createElement(framer_motion_1.motion.p, { initial: shouldReduceMotion ? false : { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "mt-3 flex items-center gap-2 text-xs text-amber-700" }, "Choose both dates to complete your reporting range.")))),
            React.createElement("div", { className: "mt-5 flex flex-wrap items-center justify-between gap-3" },
                React.createElement("p", { className: "flex items-center gap-2 text-[11px] leading-5 text-slate-400" },
                    React.createElement(ShieldCheckIcon, null),
                    "Reports reflect recorded checklist results."),
                React.createElement("div", { className: "inline-flex items-center gap-1.5 text-xs font-semibold text-[#007FAF]" },
                    React.createElement("span", null, "Reporting filters"),
                    React.createElement(lucide_react_1.ChevronRight, { className: "h-3.5 w-3.5" }))))));
};
function ShieldCheckIcon() {
    return (React.createElement("span", { className: "flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00A859]/10 text-[#00A859]" },
        React.createElement(lucide_react_1.Check, { className: "h-3 w-3", strokeWidth: 2.5 })));
}
