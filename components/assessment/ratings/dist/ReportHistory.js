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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ReportHistory = void 0;
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var ratings_1 = require("@/data/ratings");
var Heading_1 = require("@/components/assessment/ratings/shared/Heading");
var ReportFilters_1 = require("@/components/assessment/ratings/ReportFilters");
var StatusBadge_1 = require("@/components/assessment/ratings/shared/StatusBadge");
var TIME_ZONE = "Africa/Lagos";
var initialFilterValues = {
    search: "",
    reportType: "all",
    serviceType: "all",
    status: "all",
    period: "all"
};
function parseDate(value) {
    if (!(value === null || value === void 0 ? void 0 : value.trim()))
        return null;
    var date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
}
function getLagosDateKey(date) {
    var parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: TIME_ZONE,
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).formatToParts(date);
    var values = Object.fromEntries(parts.map(function (_a) {
        var type = _a.type, value = _a.value;
        return [type, value];
    }));
    return values.year + "-" + values.month + "-" + values.day;
}
function formatDate(value) {
    var date = parseDate(value);
    if (!date)
        return "Date unavailable";
    return new Intl.DateTimeFormat("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: TIME_ZONE
    }).format(date);
}
function shiftDateKey(value, days) {
    var _a = value.split("-").map(Number), year = _a[0], month = _a[1], day = _a[2];
    var date = new Date(Date.UTC(year, month - 1, day));
    date.setUTCDate(date.getUTCDate() + days);
    return [
        date.getUTCFullYear(),
        String(date.getUTCMonth() + 1).padStart(2, "0"),
        String(date.getUTCDate()).padStart(2, "0"),
    ].join("-");
}
function getServiceName(serviceType) {
    var _a, _b;
    if (!serviceType)
        return "General report";
    return ((_b = (_a = ratings_1.serviceDefinitions.find(function (service) { return service.id === serviceType; })) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "Service report");
}
function matchesPeriod(report, period, todayKey) {
    if (period === "all" || period === "custom")
        return true;
    var date = parseDate(report.date);
    if (!date)
        return false;
    var reportKey = getLagosDateKey(date);
    if (reportKey > todayKey)
        return false;
    if (period === "this-week") {
        var _a = todayKey.split("-").map(Number), year = _a[0], month = _a[1], day = _a[2];
        var today = new Date(Date.UTC(year, month - 1, day));
        var dayOfWeek = today.getUTCDay();
        var daysSinceMonday = (dayOfWeek + 6) % 7;
        var weekStart = shiftDateKey(todayKey, -daysSinceMonday);
        return reportKey >= weekStart && reportKey <= todayKey;
    }
    if (period === "this-month") {
        return reportKey.slice(0, 7) === todayKey.slice(0, 7);
    }
    if (period === "last-month") {
        var _b = todayKey.split("-").map(Number), year = _b[0], month = _b[1];
        var lastMonthDate = new Date(Date.UTC(year, month - 2, 1));
        var lastMonth = [
            lastMonthDate.getUTCFullYear(),
            String(lastMonthDate.getUTCMonth() + 1).padStart(2, "0"),
        ].join("-");
        return reportKey.slice(0, 7) === lastMonth;
    }
    return true;
}
function getValidPercentage(value) {
    if (typeof value !== "number" ||
        !Number.isFinite(value) ||
        value < 0 ||
        value > 100) {
        return null;
    }
    return Number(value.toFixed(1)) + "%";
}
function getReportScore(report) {
    var _a;
    var score = (_a = report.summary) === null || _a === void 0 ? void 0 : _a.approvedAverageRating;
    if (typeof score !== "number" ||
        !Number.isFinite(score) ||
        score < 0 ||
        score > 100) {
        return null;
    }
    return score.toFixed(1) + "%";
}
function hasActiveFilters(filters) {
    return (Boolean(filters.search.trim()) ||
        filters.reportType !== "all" ||
        filters.serviceType !== "all" ||
        filters.status !== "all" ||
        filters.period !== "all");
}
function ReportSkeleton() {
    return (React.createElement("div", { "aria-hidden": "true", className: "min-w-0 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white" },
        React.createElement("div", { className: "h-1.5 animate-pulse bg-slate-200" }),
        React.createElement("div", { className: "p-4 sm:p-6" },
            React.createElement("div", { className: "flex items-center justify-between gap-3" },
                React.createElement("div", { className: "h-7 w-28 animate-pulse rounded-full bg-slate-100" }),
                React.createElement("div", { className: "h-6 w-20 animate-pulse rounded-full bg-slate-100" })),
            React.createElement("div", { className: "mt-6 h-6 w-4/5 animate-pulse rounded-lg bg-slate-200" }),
            React.createElement("div", { className: "mt-3 h-4 w-2/3 animate-pulse rounded bg-slate-100" }),
            React.createElement("div", { className: "mt-6 h-20 animate-pulse rounded-2xl bg-slate-100" }),
            React.createElement("div", { className: "mt-5 grid grid-cols-2 gap-3" },
                React.createElement("div", { className: "h-20 animate-pulse rounded-xl bg-slate-100" }),
                React.createElement("div", { className: "h-20 animate-pulse rounded-xl bg-slate-100" })),
            React.createElement("div", { className: "mt-6 h-11 animate-pulse rounded-xl bg-slate-100" }))));
}
exports.ReportHistory = function (_a) {
    var _b = _a.reports, reports = _b === void 0 ? [] : _b, _c = _a.loading, loading = _c === void 0 ? false : _c, initialFilters = _a.initialFilters, onViewReport = _a.onViewReport, onLeaveFeedback = _a.onLeaveFeedback, _d = _a.showFilters, showFilters = _d === void 0 ? true : _d, _e = _a.publicOnly, publicOnly = _e === void 0 ? true : _e, _f = _a.title, title = _f === void 0 ? "Report history" : _f, _g = _a.description, description = _g === void 0 ? "Explore published service reports, revisit important moments, and review documented outcomes over time." : _g, _h = _a.className, className = _h === void 0 ? "" : _h;
    var shouldReduceMotion = framer_motion_1.useReducedMotion();
    var reduceMotion = shouldReduceMotion !== null && shouldReduceMotion !== void 0 ? shouldReduceMotion : false;
    var defaultFilters = react_1.useMemo(function () { return (__assign(__assign({}, initialFilterValues), initialFilters)); }, [initialFilters]);
    var _j = react_1.useState(defaultFilters), activeFilters = _j[0], setActiveFilters = _j[1];
    var _k = react_1.useState(null), todayKey = _k[0], setTodayKey = _k[1];
    react_1.useEffect(function () {
        setTodayKey(getLagosDateKey(new Date()));
    }, []);
    var filtersActive = hasActiveFilters(activeFilters);
    var search = activeFilters.search.trim().toLowerCase();
    var resetFilters = function () {
        setActiveFilters(initialFilterValues);
    };
    var visibleReports = react_1.useMemo(function () {
        if (loading || todayKey === null) {
            return [];
        }
        return reports
            .filter(function (report) {
            var _a, _b, _c;
            if (publicOnly &&
                (report.visibility !== "public" ||
                    report.status !== "published")) {
                return false;
            }
            if (activeFilters.reportType !== "all" &&
                report.reportType !== activeFilters.reportType) {
                return false;
            }
            if (activeFilters.serviceType !== "all" &&
                report.serviceType !== activeFilters.serviceType) {
                return false;
            }
            if (activeFilters.status !== "all" &&
                report.status !== activeFilters.status) {
                return false;
            }
            if (!matchesPeriod(report, activeFilters.period, todayKey)) {
                return false;
            }
            if (search) {
                var searchableText = __spreadArrays([
                    report.title,
                    (_a = report.approvedPublicSummary) !== null && _a !== void 0 ? _a : "",
                    (_b = ratings_1.reportTypeLabels[report.reportType]) !== null && _b !== void 0 ? _b : "",
                    getServiceName(report.serviceType)
                ], ((_c = report.highlights) !== null && _c !== void 0 ? _c : []).map(function (highlight) {
                    return highlight.title + " " + highlight.description;
                })).join(" ")
                    .toLowerCase();
                if (!searchableText.includes(search)) {
                    return false;
                }
            }
            return true;
        })
            .sort(function (a, b) {
            var _a, _b, _c, _d;
            var first = (_b = (_a = parseDate(a.date)) === null || _a === void 0 ? void 0 : _a.getTime()) !== null && _b !== void 0 ? _b : 0;
            var second = (_d = (_c = parseDate(b.date)) === null || _c === void 0 ? void 0 : _c.getTime()) !== null && _d !== void 0 ? _d : 0;
            return second - first;
        });
    }, [
        reports,
        publicOnly,
        activeFilters,
        todayKey,
        loading,
        search,
    ]);
    return (React.createElement("section", { id: "report-history", "aria-labelledby": "report-history-heading", className: "relative isolate mx-auto w-full max-w-7xl overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:px-10 " + className },
        React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute -right-28 top-20 -z-10 h-80 w-80 rounded-full bg-[#41B6E6]/[0.07] blur-3xl" }),
        React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute -left-28 bottom-12 -z-10 h-72 w-72 rounded-full bg-[#FFC72C]/[0.055] blur-3xl" }),
        React.createElement(Heading_1.SectionHeading, { eyebrow: "The service archive", title: title, description: description }),
        React.createElement("div", { className: "relative mt-8 overflow-hidden rounded-[1.75rem] bg-[#0C2340] shadow-[0_18px_55px_rgba(12,35,64,0.12)] sm:rounded-[2rem]" },
            React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute -right-12 -top-24 h-72 w-72 rounded-full border border-white/[0.08]" }),
            React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute -right-1 -top-14 h-52 w-52 rounded-full border border-white/[0.08]" }),
            React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute inset-y-0 right-0 w-2/3 bg-gradient-to-l from-[#00A3E0]/[0.12] to-transparent" }),
            React.createElement("div", { className: "relative flex min-w-0 flex-col gap-6 px-4 py-6 sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:px-10" },
                React.createElement("div", { className: "min-w-0 max-w-2xl" },
                    React.createElement("span", { className: "inline-flex items-center gap-2 rounded-full border border-[#41B6E6]/25 bg-[#41B6E6]/10 px-3.5 py-2 text-xs font-semibold text-[#8CDEFA]" },
                        React.createElement(lucide_react_1.FileBarChart2, { size: 15, "aria-hidden": "true" }),
                        "Media team reporting"),
                    React.createElement("h3", { className: "mt-4 break-words text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl" }, "Every service. A record of excellence."),
                    React.createElement("p", { className: "mt-3 max-w-xl text-sm leading-7 text-white/65" }, "Find published reports, revisit service highlights, and review available performance data in one place.")),
                React.createElement("div", { className: "grid min-w-0 grid-cols-1 gap-3 min-[360px]:grid-cols-2 lg:flex lg:flex-wrap" },
                    React.createElement("div", { className: "min-w-0 rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-3.5 sm:px-4" },
                        React.createElement("p", { className: "text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50" }, publicOnly ? "Published reports" : "Matching reports"),
                        React.createElement("p", { className: "mt-2 text-2xl font-bold tabular-nums text-white" }, loading ? "—" : visibleReports.length)),
                    React.createElement("div", { className: "min-w-0 rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-3.5 sm:px-4" },
                        React.createElement("p", { className: "text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50" }, "Archive"),
                        React.createElement("p", { className: "mt-2 flex items-center gap-2 text-sm font-semibold text-white" },
                            React.createElement(lucide_react_1.ShieldCheck, { size: 17, className: "text-[#41B6E6]", "aria-hidden": "true" }),
                            publicOnly ? "Public view" : "Report records")))),
            React.createElement("div", { className: "relative flex items-start gap-2 border-t border-white/10 bg-white/[0.035] px-4 py-3.5 text-xs leading-5 text-white/60 sm:px-8 lg:px-10" },
                React.createElement(lucide_react_1.CheckCircle2, { size: 15, className: "shrink-0 text-[#41B6E6]", "aria-hidden": "true" }),
                publicOnly
                    ? "Only published reports approved for public viewing are shown."
                    : "Report visibility and publication status are displayed with each record.")),
        showFilters && (React.createElement("div", { className: "mt-9" },
            React.createElement("div", { className: "mb-4 flex flex-wrap items-center justify-between gap-3" },
                React.createElement("div", { className: "flex items-center gap-2.5" },
                    React.createElement("span", { className: "flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF7FC] text-[#0087BD]" },
                        React.createElement(lucide_react_1.SlidersHorizontal, { size: 17, "aria-hidden": "true" })),
                    React.createElement("div", null,
                        React.createElement("h3", { className: "text-sm font-bold text-[#0C2340]" }, "Find a report"),
                        React.createElement("p", { className: "mt-0.5 text-xs text-slate-500" }, "Refine the archive to find what you need."))),
                filtersActive && (React.createElement("button", { type: "button", onClick: resetFilters, className: "inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold text-[#087FAD] transition hover:bg-[#EAF7FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2" },
                    "Reset filters",
                    React.createElement(lucide_react_1.ArrowRight, { size: 14, "aria-hidden": "true" })))),
            React.createElement("div", { className: "min-w-0 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm shadow-[#0C2340]/[0.025] sm:p-5" },
                React.createElement(ReportFilters_1.ReportFilters, { value: activeFilters, onChange: setActiveFilters, onReset: resetFilters, resultCount: visibleReports.length, showStatusFilter: !publicOnly })))),
        React.createElement("div", { className: "mb-5 mt-10 flex flex-wrap items-end justify-between gap-3" },
            React.createElement("div", null,
                React.createElement("p", { className: "text-[10px] font-bold uppercase tracking-[0.2em] text-[#0087BD]" }, "Archive collection"),
                React.createElement("h3", { className: "mt-2 text-xl font-bold tracking-tight text-[#0C2340] sm:text-2xl" }, filtersActive ? "Search results" : "Recent reports")),
            !loading && (React.createElement("span", { className: "rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600" },
                visibleReports.length,
                " ",
                visibleReports.length === 1 ? "report" : "reports"))),
        loading || todayKey === null ? (React.createElement("div", { role: "status", "aria-live": "polite", className: "grid min-w-0 gap-4 sm:gap-5 md:grid-cols-2" },
            React.createElement("span", { className: "sr-only" }, "Loading reports..."),
            Array.from({ length: 4 }).map(function (_, index) { return (React.createElement(ReportSkeleton, { key: index })); }))) : visibleReports.length === 0 ? (React.createElement(framer_motion_1.motion.div, { initial: reduceMotion ? false : { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: reduceMotion ? 0 : 0.35 }, className: "relative overflow-hidden rounded-[1.75rem] border border-dashed border-[#C8DCE8] bg-white px-6 py-14 text-center sm:px-10 sm:py-16" },
            React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border border-[#00A3E0]/10" }),
            React.createElement("span", { className: "relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E5F7FC] to-[#F3F8FF] text-[#0087BD] ring-1 ring-[#D8EEF7]" }, filtersActive ? (React.createElement(lucide_react_1.SearchX, { size: 28, strokeWidth: 1.7, "aria-hidden": "true" })) : (React.createElement(lucide_react_1.FileSearch, { size: 28, strokeWidth: 1.7, "aria-hidden": "true" }))),
            React.createElement("p", { className: "relative mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0087BD]" }, filtersActive ? "Try another search" : "The archive"),
            React.createElement("h3", { className: "relative mt-3 text-xl font-bold tracking-tight text-[#0C2340] sm:text-2xl" }, reports.length === 0
                ? "Your report archive starts here"
                : filtersActive
                    ? "No reports match your filters"
                    : "No reports available to display"),
            React.createElement("p", { className: "relative mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500" }, reports.length === 0
                ? "There are no report records available yet. Published reports will appear here once they have been reviewed and approved."
                : filtersActive
                    ? "Try a different keyword or adjust the selected filters to find the report you are looking for."
                    : "There are currently no reports available under these visibility and publication rules."),
            filtersActive && (React.createElement("button", { type: "button", onClick: resetFilters, className: "relative mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#0C2340] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#16395F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2" },
                "Clear filters",
                React.createElement(lucide_react_1.ArrowRight, { size: 16, "aria-hidden": "true" }))))) : (React.createElement("div", { className: "grid min-w-0 items-stretch gap-4 sm:gap-5 md:grid-cols-2 lg:gap-6" }, visibleReports.map(function (report, index) {
            var _a, _b, _c, _d;
            var score = getReportScore(report);
            var completion = getValidPercentage((_a = report.summary) === null || _a === void 0 ? void 0 : _a.checklistCompletionPercentage);
            var publicSummary = (_b = report.approvedPublicSummary) === null || _b === void 0 ? void 0 : _b.trim();
            var isPublished = report.status === "published";
            var reportType = ratings_1.reportTypeLabels[report.reportType];
            return (React.createElement(framer_motion_1.motion.article, { key: report.id, initial: reduceMotion ? false : { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.1 }, transition: {
                    duration: reduceMotion ? 0 : 0.35,
                    delay: reduceMotion ? 0 : Math.min(index * 0.045, 0.2)
                }, className: "group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[1.35rem] border border-slate-200/80 bg-white shadow-[0_4px_24px_rgba(12,35,64,0.035)] transition duration-300 motion-safe:hover:-translate-y-1 hover:border-[#00A3E0]/40 hover:shadow-[0_18px_45px_rgba(12,35,64,0.085)] sm:rounded-[1.5rem]" },
                React.createElement("div", { className: "h-1.5 bg-gradient-to-r from-[#0C2340] via-[#00A3E0] to-[#41B6E6]" }),
                React.createElement("div", { className: "flex min-w-0 flex-1 flex-col p-4 sm:p-6" },
                    React.createElement("div", { className: "flex min-w-0 flex-wrap items-center justify-between gap-2.5 sm:gap-3" },
                        React.createElement("span", { className: "inline-flex max-w-full items-center gap-2 rounded-full border border-[#D8EDF6] bg-[#EFF9FD] px-3 py-1.5 text-xs font-semibold text-[#087FAD]" },
                            React.createElement(lucide_react_1.FileBarChart2, { size: 14, className: "shrink-0", "aria-hidden": "true" }),
                            React.createElement("span", { className: "truncate" }, reportType !== null && reportType !== void 0 ? reportType : "Service report")),
                        React.createElement(StatusBadge_1.StatusBadge, { status: report.status })),
                    React.createElement("h4", { className: "mt-4 break-words text-lg font-bold leading-snug tracking-tight text-[#0C2340] transition-colors group-hover:text-[#087FAD] sm:mt-5 sm:text-xl" }, report.title),
                    React.createElement("div", { className: "mt-3 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 text-xs leading-5 text-slate-500 sm:gap-x-4" },
                        React.createElement("span", { className: "inline-flex items-center gap-1.5" },
                            React.createElement(lucide_react_1.CalendarDays, { size: 14, className: "shrink-0 text-[#0087BD]", "aria-hidden": "true" }),
                            formatDate(report.date)),
                        React.createElement("span", { className: "min-w-0 break-words" }, getServiceName(report.serviceType))),
                    React.createElement("div", { className: "mt-5 min-w-0 rounded-2xl border border-slate-100 bg-[#F8FAFC] p-3.5 sm:p-4" },
                        React.createElement("p", { className: "text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400" }, "Report overview"),
                        React.createElement("p", { className: "mt-2 break-words text-sm leading-6 text-slate-600 sm:leading-7" }, publicSummary ||
                            (isPublished
                                ? "No approved public summary is available for this report."
                                : "This report has not been published for public viewing."))),
                    React.createElement("div", { className: "mt-4 grid grid-cols-1 gap-3 min-[390px]:grid-cols-2" },
                        React.createElement("div", { className: "relative min-w-0 overflow-hidden rounded-2xl border border-[#DCECF4] bg-gradient-to-br from-[#F0F9FD] to-white p-3.5 sm:p-4" },
                            React.createElement("div", { "aria-hidden": "true", className: "absolute -right-5 -top-5 h-16 w-16 rounded-full bg-[#00A3E0]/[0.06]" }),
                            React.createElement("p", { className: "relative text-[10px] font-bold uppercase leading-4 tracking-[0.08em] text-slate-500 sm:tracking-[0.1em]" }, "Approved average"),
                            React.createElement("p", { className: "relative mt-3 text-2xl font-bold tracking-tight text-[#0C2340]" }, score !== null && score !== void 0 ? score : "—"),
                            React.createElement("p", { className: "relative mt-1 text-[10px] text-slate-500" }, score !== null
                                ? "Approved rating"
                                : "No verified score")),
                        React.createElement("div", { className: "relative min-w-0 overflow-hidden rounded-2xl border border-[#E8EAF4] bg-gradient-to-br from-[#F5F6FF] to-white p-3.5 sm:p-4" },
                            React.createElement("div", { "aria-hidden": "true", className: "absolute -right-5 -top-5 h-16 w-16 rounded-full bg-[#4B42F2]/[0.05]" }),
                            React.createElement("p", { className: "relative text-[10px] font-bold uppercase leading-4 tracking-[0.08em] text-slate-500 sm:tracking-[0.1em]" }, "Checklist completion"),
                            React.createElement("p", { className: "relative mt-3 text-2xl font-bold tracking-tight text-[#0C2340]" }, completion !== null && completion !== void 0 ? completion : "—"),
                            React.createElement("p", { className: "relative mt-1 text-[10px] text-slate-500" }, completion !== null
                                ? "Recorded completion"
                                : "No verified figure"))),
                    ((_d = (_c = report.highlights) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) > 0 && (React.createElement("div", { className: "mt-5" },
                        React.createElement("div", { className: "flex items-center justify-between gap-3" },
                            React.createElement("p", { className: "text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500" }, "Report highlights"),
                            React.createElement("span", { className: "text-[10px] font-medium text-slate-400" },
                                Math.min(report.highlights.length, 3),
                                " of",
                                " ",
                                report.highlights.length)),
                        React.createElement("ul", { className: "mt-3 space-y-3" }, report.highlights.slice(0, 3).map(function (highlight) { return (React.createElement("li", { key: highlight.id, className: "flex items-start gap-3 text-sm leading-6 text-slate-600" },
                            React.createElement("span", { className: "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EAF7FC] text-[#0087BD]" },
                                React.createElement(lucide_react_1.CheckCircle2, { size: 12, "aria-hidden": "true" })),
                            React.createElement("span", { className: "min-w-0 break-words" }, highlight.title))); })))),
                    React.createElement("div", { className: "mt-auto pt-6" },
                        React.createElement("div", { className: "flex min-w-0 items-center gap-2 border-t border-slate-100 pt-4" }, report.visibility === "public" ? (React.createElement(React.Fragment, null,
                            React.createElement("span", { className: "flex h-7 w-7 items-center justify-center rounded-lg bg-[#EAF8F0] text-[#07864B]" },
                                React.createElement(lucide_react_1.CheckCircle2, { size: 14, "aria-hidden": "true" })),
                            React.createElement("div", { className: "min-w-0" },
                                React.createElement("p", { className: "text-xs font-semibold text-[#253D56]" }, "Public report"),
                                React.createElement("p", { className: "mt-0.5 text-[10px] text-slate-400" }, "Approved for public viewing")))) : (React.createElement(React.Fragment, null,
                            React.createElement("span", { className: "flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500" },
                                React.createElement(lucide_react_1.LockKeyhole, { size: 14, "aria-hidden": "true" })),
                            React.createElement("div", { className: "min-w-0" },
                                React.createElement("p", { className: "text-xs font-semibold text-[#253D56]" }, "Restricted report"),
                                React.createElement("p", { className: "mt-0.5 text-[10px] text-slate-400" }, "Access may be limited"))))),
                        onViewReport ? (React.createElement("button", { type: "button", onClick: function () { return onViewReport(report); }, className: "mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0C2340] px-4 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-[#16395F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2" },
                            "View full report",
                            React.createElement(lucide_react_1.ArrowUpRight, { size: 17, "aria-hidden": "true", className: "transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" }))) : (React.createElement("div", { className: "mt-4 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-50 px-3 py-3 text-center text-sm text-slate-400 sm:px-4" },
                            React.createElement(lucide_react_1.FileSearch, { size: 16, "aria-hidden": "true" }),
                            "Report details unavailable")),
                        publicOnly &&
                            isPublished &&
                            report.visibility === "public" &&
                            onLeaveFeedback &&
                            report.id && (React.createElement("button", { type: "button", onClick: function () { return onLeaveFeedback(report); }, className: "mt-2 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#CFE8F3] bg-[#F0F9FD] px-4 py-3 text-sm font-semibold text-[#087FAD] transition hover:border-[#00A3E0]/50 hover:bg-[#E5F5FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2" },
                            React.createElement(lucide_react_1.MessageSquareText, { size: 17, "aria-hidden": "true" }),
                            "Leave feedback"))))));
        }))),
        !loading && visibleReports.length > 0 && (React.createElement("div", { className: "mt-8 flex min-w-0 flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6" },
            React.createElement("div", { className: "flex items-start gap-3" },
                React.createElement("span", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F0F9FD] text-[#0087BD]" },
                    React.createElement(lucide_react_1.Search, { size: 17, "aria-hidden": "true" })),
                React.createElement("div", { className: "min-w-0" },
                    React.createElement("p", { className: "text-sm font-semibold text-[#0C2340]" }, "Looking for another report?"),
                    React.createElement("p", { className: "mt-1 text-xs leading-5 text-slate-500" }, "Use the archive filters to narrow results by service, report type, status, or reporting period."))),
            filtersActive && showFilters && (React.createElement("button", { type: "button", onClick: resetFilters, className: "inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-[#0C2340] transition hover:border-[#00A3E0]/40 hover:bg-[#F0F9FD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2" },
                "Reset search",
                React.createElement(lucide_react_1.ArrowRight, { size: 14, "aria-hidden": "true" })))))));
};
