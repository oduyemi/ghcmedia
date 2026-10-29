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
exports.ReportArchive = void 0;
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var ratings_1 = require("@/data/ratings");
var Heading_1 = require("@/components/assessment/ratings/shared/Heading");
var StatusBadge_1 = require("@/components/assessment/ratings/shared/StatusBadge");
function parseDate(value) {
    var date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
}
function getArchiveYear(value) {
    var date = parseDate(value);
    if (!date)
        return "Undated";
    return new Intl.DateTimeFormat("en", {
        year: "numeric",
        timeZone: "Africa/Lagos"
    }).format(date);
}
function formatDate(value) {
    var date = parseDate(value);
    if (!date)
        return "Date unavailable";
    return new Intl.DateTimeFormat("en-NG", {
        day: "numeric",
        month: "short",
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
exports.ReportArchive = function (_a) {
    var _b = _a.reports, reports = _b === void 0 ? [] : _b, onViewReport = _a.onViewReport, _c = _a.publicOnly, publicOnly = _c === void 0 ? true : _c, _d = _a.loading, loading = _d === void 0 ? false : _d, _e = _a.className, className = _e === void 0 ? "" : _e;
    var _f = react_1.useState(""), search = _f[0], setSearch = _f[1];
    var _g = react_1.useState("all"), selectedYear = _g[0], setSelectedYear = _g[1];
    var _h = react_1.useState([]), expandedYears = _h[0], setExpandedYears = _h[1];
    var shouldReduceMotion = framer_motion_1.useReducedMotion();
    var reduceMotion = shouldReduceMotion !== null && shouldReduceMotion !== void 0 ? shouldReduceMotion : false;
    var availableReports = react_1.useMemo(function () {
        var query = search.trim().toLowerCase();
        return reports
            .filter(function (report) {
            if (!publicOnly)
                return true;
            return (report.status === "published" &&
                report.visibility === "public");
        })
            .filter(function (report) {
            var _a, _b;
            if (!query)
                return true;
            var text = __spreadArrays([
                report.title,
                (_a = report.approvedPublicSummary) !== null && _a !== void 0 ? _a : "",
                (_b = ratings_1.reportTypeLabels[report.reportType]) !== null && _b !== void 0 ? _b : "",
                getServiceName(report.serviceType)
            ], report.highlights.map(function (highlight) {
                return highlight.title + " " + highlight.description;
            })).join(" ")
                .toLowerCase();
            return text.includes(query);
        })
            .sort(function (a, b) {
            var _a, _b, _c, _d;
            var dateA = (_b = (_a = parseDate(a.date)) === null || _a === void 0 ? void 0 : _a.getTime()) !== null && _b !== void 0 ? _b : 0;
            var dateB = (_d = (_c = parseDate(b.date)) === null || _c === void 0 ? void 0 : _c.getTime()) !== null && _d !== void 0 ? _d : 0;
            return dateB - dateA;
        });
    }, [reports, publicOnly, search]);
    var archiveYears = react_1.useMemo(function () {
        var groups = new Map();
        availableReports.forEach(function (report) {
            var year = getArchiveYear(report.date);
            if (!groups.has(year))
                groups.set(year, []);
            groups.get(year).push(report);
        });
        return Array.from(groups.entries())
            .map(function (_a) {
            var year = _a[0], yearReports = _a[1];
            return ({
                year: year,
                reports: yearReports
            });
        })
            .sort(function (a, b) {
            if (a.year === "Undated")
                return 1;
            if (b.year === "Undated")
                return -1;
            return Number(b.year) - Number(a.year);
        });
    }, [availableReports]);
    var yearOptions = archiveYears.map(function (group) { return group.year; });
    var filteredYears = selectedYear === "all"
        ? archiveYears
        : archiveYears.filter(function (group) { return group.year === selectedYear; });
    var visibleCount = filteredYears.reduce(function (total, group) { return total + group.reports.length; }, 0);
    var hasFilters = search.trim().length > 0 || selectedYear !== "all";
    var toggleYear = function (year) {
        setExpandedYears(function (current) {
            return current.includes(year)
                ? current.filter(function (item) { return item !== year; })
                : __spreadArrays(current, [year]);
        });
    };
    var clearFilters = function () {
        setSearch("");
        setSelectedYear("all");
    };
    return (React.createElement("section", { id: "report-archive", "aria-labelledby": "report-archive-heading", className: "relative isolate overflow-hidden py-12 sm:py-16 lg:py-24 " + className },
        React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white via-[#F7F9FC] to-white" }),
        React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute -right-24 top-24 -z-10 h-72 w-72 rounded-full bg-[#41B6E6]/10 blur-3xl" }),
        React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute -left-24 bottom-10 -z-10 h-72 w-72 rounded-full bg-[#7651C9]/[0.06] blur-3xl" }),
        React.createElement("div", { className: "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-10" },
            React.createElement("div", { className: "flex flex-col gap-5 sm:gap-6 lg:flex-row lg:items-end lg:justify-between" },
                React.createElement("div", { className: "min-w-0 max-w-3xl" },
                    React.createElement(Heading_1.SectionHeading, { eyebrow: "The record of our services", title: "Good work deserves to be remembered.", description: "Explore previous reports, revisit service assessments, and discover published highlights from our media team." })),
                React.createElement("div", { className: "flex w-full items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/90 p-3.5 shadow-sm sm:w-fit" },
                    React.createElement("span", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E7F7FC] text-[#0087BD]" },
                        React.createElement(lucide_react_1.Archive, { size: 21, "aria-hidden": "true" })),
                    React.createElement("div", { className: "min-w-0" },
                        React.createElement("p", { className: "text-xl font-black tracking-tight text-[#0C2340]" }, loading
                            ? "—"
                            : reports.filter(function (report) {
                                return !publicOnly ||
                                    (report.status === "published" &&
                                        report.visibility === "public");
                            }).length),
                        React.createElement("p", { className: "text-xs leading-5 font-medium text-slate-500" }, "Available archive records")))),
            React.createElement("div", { className: "mt-10 overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_8px_35px_rgba(12,35,64,0.045)]" },
                React.createElement("div", { className: "flex items-center gap-3 border-b border-slate-100 px-5 py-4 sm:px-6" },
                    React.createElement("span", { className: "flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0F9FD] text-[#0087BD]" },
                        React.createElement(lucide_react_1.SlidersHorizontal, { size: 17, "aria-hidden": "true" })),
                    React.createElement("div", null,
                        React.createElement("h3", { className: "text-sm font-extrabold text-[#0C2340]" }, "Find a report"),
                        React.createElement("p", { className: "mt-0.5 text-xs text-slate-500" }, "Search by title, service, report type, or topic."))),
                React.createElement("div", { className: "grid min-w-0 gap-4 p-4 sm:grid-cols-[minmax(0,1fr)_220px] sm:p-6" },
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "archive-search", className: "mb-2 block text-xs font-bold text-slate-600" }, "Search archive"),
                        React.createElement("div", { className: "relative" },
                            React.createElement(lucide_react_1.Search, { size: 18, className: "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400", "aria-hidden": "true" }),
                            React.createElement("input", { id: "archive-search", type: "search", value: search, onChange: function (event) { return setSearch(event.target.value); }, placeholder: "Try a service name or report topic...", className: "min-h-12 w-full min-w-0 rounded-xl border border-slate-200 bg-[#F8FAFC] py-3 pl-11 pr-3 text-sm text-[#0C2340] outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#00A3E0] focus:bg-white focus:ring-4 focus:ring-[#00A3E0]/10 sm:pr-4" }))),
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "archive-year", className: "mb-2 block text-xs font-bold text-slate-600" }, "Reporting year"),
                        React.createElement("div", { className: "relative" },
                            React.createElement(lucide_react_1.CalendarDays, { size: 17, className: "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400", "aria-hidden": "true" }),
                            React.createElement("select", { id: "archive-year", value: selectedYear, onChange: function (event) { return setSelectedYear(event.target.value); }, className: "min-h-12 w-full min-w-0 appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-10 text-sm font-medium text-[#0C2340] outline-none transition hover:border-slate-300 focus:border-[#00A3E0] focus:ring-4 focus:ring-[#00A3E0]/10" },
                                React.createElement("option", { value: "all" }, "All years"),
                                yearOptions.map(function (year) { return (React.createElement("option", { key: year, value: year }, year === "Undated" ? "Date unavailable" : year)); })),
                            React.createElement(lucide_react_1.ChevronDown, { size: 16, className: "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400", "aria-hidden": "true" })))),
                React.createElement("div", { className: "flex flex-col gap-3 border-t border-slate-100 bg-[#FAFBFD] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6" },
                    React.createElement("p", { className: "text-sm text-slate-500", "aria-live": "polite" }, loading ? ("Finding reports...") : (React.createElement(React.Fragment, null,
                        "Showing",
                        " ",
                        React.createElement("span", { className: "font-extrabold text-[#0C2340]" }, visibleCount),
                        " ",
                        visibleCount === 1 ? "report" : "reports"))),
                    hasFilters && (React.createElement("button", { type: "button", onClick: clearFilters, className: "inline-flex min-h-10 w-fit items-center gap-2 rounded-xl px-3 text-sm font-bold text-[#0087BD] transition hover:bg-[#E7F7FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0]" },
                        React.createElement(lucide_react_1.X, { size: 15, "aria-hidden": "true" }),
                        "Clear filters")))),
            loading ? (React.createElement("div", { role: "status", "aria-live": "polite", className: "mt-6 space-y-4" },
                React.createElement("span", { className: "sr-only" }, "Loading report archive..."),
                [1, 2, 3].map(function (item) { return (React.createElement("div", { key: item, className: "animate-pulse rounded-2xl border border-slate-200 bg-white p-5 sm:p-6" },
                    React.createElement("div", { className: "flex items-center gap-4" },
                        React.createElement("div", { className: "h-12 w-12 rounded-xl bg-slate-100" }),
                        React.createElement("div", { className: "flex-1" },
                            React.createElement("div", { className: "h-5 w-28 rounded bg-slate-200" }),
                            React.createElement("div", { className: "mt-3 h-3 w-40 rounded bg-slate-100" }))),
                    React.createElement("div", { className: "mt-5 h-4 w-full max-w-xl rounded bg-slate-100" }))); }))) : filteredYears.length === 0 ? (React.createElement("div", { className: "relative mt-6 overflow-hidden rounded-[1.75rem] border border-dashed border-slate-300 bg-white px-6 py-14 text-center sm:px-12 sm:py-16" },
                React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-[#41B6E6]/10 blur-2xl" }),
                React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute -bottom-12 -left-10 h-40 w-40 rounded-full bg-[#7651C9]/[0.07] blur-2xl" }),
                React.createElement("div", { className: "relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E7F7FC] text-[#0087BD]" }, hasFilters ? (React.createElement(lucide_react_1.Search, { size: 27, "aria-hidden": "true" })) : (React.createElement(lucide_react_1.Archive, { size: 27, "aria-hidden": "true" }))),
                React.createElement("h3", { className: "relative mt-5 text-xl font-extrabold tracking-tight text-[#0C2340] sm:text-2xl" }, hasFilters
                    ? "No reports match your search."
                    : "Your archive starts here."),
                React.createElement("p", { className: "relative mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-500" }, hasFilters
                    ? "Try a different search term or reporting year to find the report you need."
                    : "Published reports will appear here once they are available. You can return to explore them by year, service, or topic."),
                hasFilters && (React.createElement("button", { type: "button", onClick: clearFilters, className: "relative mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#0C2340] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#163B60] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2" },
                    "Clear search and filters",
                    React.createElement(lucide_react_1.ArrowUpRight, { size: 16, "aria-hidden": "true" }))))) : (React.createElement("div", { className: "mt-7 space-y-4" }, filteredYears.map(function (group, index) {
                var isExpanded = expandedYears.includes(group.year) ||
                    (expandedYears.length === 0 && index === 0);
                return (React.createElement(framer_motion_1.motion.section, { key: group.year, initial: reduceMotion ? false : { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.08 }, transition: {
                        duration: reduceMotion ? 0 : 0.35,
                        ease: [0.22, 1, 0.36, 1]
                    }, className: "overflow-hidden rounded-[1.5rem] border bg-white transition duration-300 " + (isExpanded
                        ? "border-[#CFEAF5] shadow-[0_12px_40px_rgba(12,35,64,0.055)]"
                        : "border-slate-200/80 shadow-sm hover:border-slate-300") },
                    React.createElement("button", { type: "button", onClick: function () { return toggleYear(group.year); }, "aria-expanded": isExpanded, "aria-controls": "archive-year-" + group.year.replace(/[^a-zA-Z0-9]/g, "-"), className: "flex min-h-[84px] w-full items-center justify-between gap-3 px-3 py-4 text-left transition hover:bg-[#FAFCFE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00A3E0] sm:gap-4 sm:px-6" },
                        React.createElement("span", { className: "flex min-w-0 items-center gap-3 sm:gap-4" },
                            React.createElement("span", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition " + (isExpanded
                                    ? "bg-[#0C2340] text-white"
                                    : "bg-[#E7F7FC] text-[#0087BD]") },
                                React.createElement(lucide_react_1.Archive, { size: 20, "aria-hidden": "true" })),
                            React.createElement("span", { className: "min-w-0" },
                                React.createElement("span", { className: "flex flex-wrap items-center gap-2" },
                                    React.createElement("span", { className: "text-lg font-extrabold tracking-tight text-[#0C2340]" }, group.year === "Undated"
                                        ? "Date unavailable"
                                        : group.year),
                                    index === 0 && group.year !== "Undated" && (React.createElement("span", { className: "rounded-full bg-[#E7F7FC] px-2 py-1 text-[9px] font-extrabold uppercase tracking-wider text-[#0087BD]" }, "Latest"))),
                                React.createElement("span", { className: "mt-1 block text-xs text-slate-500" },
                                    group.reports.length,
                                    " ",
                                    group.reports.length === 1 ? "report" : "reports",
                                    " ",
                                    "in this period"))),
                        React.createElement("span", { className: "flex shrink-0 items-center gap-3" },
                            React.createElement("span", { className: "hidden text-xs font-semibold text-slate-400 sm:inline" }, isExpanded ? "Hide reports" : "View reports"),
                            React.createElement("span", { className: "flex h-9 w-9 items-center justify-center rounded-xl transition " + (isExpanded
                                    ? "bg-[#E7F7FC] text-[#0087BD]"
                                    : "bg-slate-100 text-slate-500") },
                                React.createElement(lucide_react_1.ChevronDown, { size: 18, className: "transition-transform duration-300 " + (isExpanded ? "rotate-180" : ""), "aria-hidden": "true" })))),
                    isExpanded && (React.createElement("div", { id: "archive-year-" + group.year.replace(/[^a-zA-Z0-9]/g, "-"), className: "border-t border-slate-100" }, group.reports.map(function (report, reportIndex) { return (React.createElement("article", { key: report.id, className: "group/report relative flex flex-col gap-4 px-4 py-5 transition-colors hover:bg-[#FAFCFE] sm:flex-row sm:items-center sm:justify-between sm:px-6" },
                        reportIndex > 0 && (React.createElement("span", { "aria-hidden": "true", className: "absolute inset-x-6 top-0 h-px bg-slate-100" })),
                        React.createElement("div", { className: "flex min-w-0 items-start gap-3 sm:gap-4" },
                            React.createElement("span", { className: "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-white text-slate-500 transition group-hover/report:border-[#D6EDF7] group-hover/report:bg-[#E7F7FC] group-hover/report:text-[#0087BD]" },
                                React.createElement(lucide_react_1.FileBarChart2, { size: 18, "aria-hidden": "true" })),
                            React.createElement("div", { className: "min-w-0" },
                                React.createElement("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1" },
                                    React.createElement("span", { className: "inline-flex items-center gap-1.5 text-xs font-medium text-slate-500" },
                                        React.createElement(lucide_react_1.CalendarDays, { size: 13, "aria-hidden": "true" }),
                                        formatDate(report.date)),
                                    React.createElement("span", { className: "text-slate-300", "aria-hidden": "true" }, "\u00B7"),
                                    React.createElement("span", { className: "text-xs font-medium text-slate-500" }, ratings_1.reportTypeLabels[report.reportType])),
                                React.createElement("h3", { className: "mt-2 break-words text-base font-bold leading-6 text-[#0C2340]" }, report.title),
                                React.createElement("p", { className: "mt-1 text-sm text-slate-500" }, getServiceName(report.serviceType)),
                                report.approvedPublicSummary && (React.createElement("p", { className: "mt-2 line-clamp-2 max-w-2xl text-sm leading-6 text-slate-500" }, report.approvedPublicSummary)))),
                        React.createElement("div", { className: "flex shrink-0 flex-wrap items-center gap-3 pl-[3.25rem] sm:pl-0" },
                            React.createElement(StatusBadge_1.StatusBadge, { status: report.status }),
                            onViewReport && (React.createElement("button", { type: "button", onClick: function () { return onViewReport(report); }, "aria-label": "View report: " + report.title, className: "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-[#0C2340] transition hover:border-[#00A3E0]/50 hover:bg-[#F0F9FD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2" },
                                "View report",
                                React.createElement(lucide_react_1.ArrowUpRight, { size: 16, "aria-hidden": "true", className: "transition-transform group-hover/report:translate-x-0.5 group-hover/report:-translate-y-0.5" })))))); })))));
            }))),
            React.createElement("p", { className: "mt-6 text-xs leading-6 text-slate-400 text-center" }, "The public archive only displays reports approved for publication. Dates are displayed in the Africa/Lagos timezone."))));
};
