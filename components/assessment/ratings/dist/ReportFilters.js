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
exports.__esModule = true;
exports.ReportFilters = void 0;
var lucide_react_1 = require("lucide-react");
var ratings_1 = require("@/data/ratings");
var selectClassName = "mt-2 min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#0C2340] outline-none transition focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/15 disabled:cursor-not-allowed disabled:bg-slate-50";
var labelClassName = "block text-xs font-semibold uppercase tracking-wide text-slate-500";
exports.ReportFilters = function (_a) {
    var value = _a.value, onChange = _a.onChange, onReset = _a.onReset, resultCount = _a.resultCount, _b = _a.showStatusFilter, showStatusFilter = _b === void 0 ? true : _b, _c = _a.showReportTypeFilter, showReportTypeFilter = _c === void 0 ? true : _c, _d = _a.showServiceFilter, showServiceFilter = _d === void 0 ? true : _d, _e = _a.showPeriodFilter, showPeriodFilter = _e === void 0 ? true : _e, _f = _a.className, className = _f === void 0 ? "" : _f;
    var update = function (key, nextValue) {
        var _a;
        onChange(__assign(__assign({}, value), (_a = {}, _a[key] = nextValue, _a)));
    };
    var hasActiveFilters = value.search.trim() !== "" ||
        value.reportType !== "all" ||
        value.serviceType !== "all" ||
        value.status !== "all" ||
        value.period !== "all";
    var resetFilters = function () {
        if (onReset) {
            onReset();
            return;
        }
        onChange({
            search: "",
            reportType: "all",
            serviceType: "all",
            status: "all",
            period: "all"
        });
    };
    return (React.createElement("section", { "aria-label": "Filter reports", className: "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 " + className },
        React.createElement("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" },
            React.createElement("div", { className: "flex items-start gap-3" },
                React.createElement("span", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E7F7FC] text-[#0087BD]" },
                    React.createElement(lucide_react_1.SlidersHorizontal, { size: 18, "aria-hidden": "true" })),
                React.createElement("div", null,
                    React.createElement("h3", { className: "font-bold text-[#0C2340]" }, "Find a report"),
                    React.createElement("p", { className: "mt-1 text-sm text-slate-500" }, "Narrow results by service, period, or report status."))),
            React.createElement("div", { className: "flex items-center gap-3" },
                typeof resultCount === "number" && (React.createElement("span", { className: "text-sm text-slate-500", "aria-live": "polite" },
                    React.createElement("span", { className: "font-semibold text-[#0C2340]" }, resultCount),
                    " ",
                    resultCount === 1 ? "result" : "results")),
                React.createElement("button", { type: "button", onClick: resetFilters, disabled: !hasActiveFilters, className: "inline-flex min-h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-[#0C2340] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] disabled:cursor-not-allowed disabled:opacity-40" },
                    React.createElement(lucide_react_1.RotateCcw, { size: 15, "aria-hidden": "true" }),
                    "Reset"))),
        React.createElement("div", { className: "mt-5" },
            React.createElement("label", { htmlFor: "report-search", className: "sr-only" }, "Search reports"),
            React.createElement("div", { className: "relative" },
                React.createElement(lucide_react_1.Search, { size: 18, className: "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400", "aria-hidden": "true" }),
                React.createElement("input", { id: "report-search", type: "search", value: value.search, onChange: function (event) { return update("search", event.target.value); }, placeholder: "Search by report title or description...", className: "min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-[#0C2340] outline-none transition placeholder:text-slate-400 focus:border-[#00A3E0] focus:bg-white focus:ring-2 focus:ring-[#00A3E0]/15" }))),
        React.createElement("div", { className: "mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" },
            showReportTypeFilter && (React.createElement("div", null,
                React.createElement("label", { htmlFor: "report-type-filter", className: labelClassName }, "Report type"),
                React.createElement("select", { id: "report-type-filter", value: value.reportType, onChange: function (event) {
                        return update("reportType", event.target.value);
                    }, className: selectClassName },
                    React.createElement("option", { value: "all" }, "All report types"),
                    Object.entries(ratings_1.reportTypeLabels).map(function (_a) {
                        var key = _a[0], label = _a[1];
                        return (React.createElement("option", { key: key, value: key }, label));
                    })))),
            showServiceFilter && (React.createElement("div", null,
                React.createElement("label", { htmlFor: "report-service-filter", className: labelClassName }, "Service"),
                React.createElement("select", { id: "report-service-filter", value: value.serviceType, onChange: function (event) {
                        return update("serviceType", event.target.value);
                    }, className: selectClassName },
                    React.createElement("option", { value: "all" }, "All services"),
                    ratings_1.serviceDefinitions.map(function (service) { return (React.createElement("option", { key: service.id, value: service.id }, service.name)); })))),
            showStatusFilter && (React.createElement("div", null,
                React.createElement("label", { htmlFor: "report-status-filter", className: labelClassName }, "Status"),
                React.createElement("select", { id: "report-status-filter", value: value.status, onChange: function (event) {
                        return update("status", event.target.value);
                    }, className: selectClassName },
                    React.createElement("option", { value: "all" }, "All statuses"),
                    Object.entries(ratings_1.reportStatusLabels).map(function (_a) {
                        var key = _a[0], label = _a[1];
                        return (React.createElement("option", { key: key, value: key }, label));
                    })))),
            showPeriodFilter && (React.createElement("div", null,
                React.createElement("label", { htmlFor: "report-period-filter", className: labelClassName }, "Reporting period"),
                React.createElement("div", { className: "relative" },
                    React.createElement(lucide_react_1.CalendarDays, { size: 16, className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400", "aria-hidden": "true" }),
                    React.createElement("select", { id: "report-period-filter", value: value.period, onChange: function (event) {
                            return update("period", event.target.value);
                        }, className: selectClassName + " pl-9" },
                        React.createElement("option", { value: "all" }, "Any period"),
                        React.createElement("option", { value: "this-week" }, "This week"),
                        React.createElement("option", { value: "this-month" }, "This month"),
                        React.createElement("option", { value: "last-month" }, "Last month"),
                        React.createElement("option", { value: "custom" }, "Custom period")))))),
        React.createElement("div", { className: "mt-4 flex items-start gap-2 rounded-xl bg-[#F7F9FC] px-3.5 py-3" },
            React.createElement(lucide_react_1.Filter, { size: 15, className: "mt-0.5 shrink-0 text-slate-400", "aria-hidden": "true" }),
            React.createElement("p", { className: "text-xs leading-5 text-slate-500" }, "Only reports permitted for the current viewer should be returned by the data source. Filtering the interface is not a substitute for server-side access control."))));
};
