"use strict";
exports.__esModule = true;
exports.SummaryMetrics = void 0;
var lucide_react_1 = require("lucide-react");
exports.SummaryMetrics = function (_a) {
    var records = _a.records;
    var items = records.flatMap(function (record) { return record.items; });
    var completed = items.filter(function (item) { return item.status === "COMPLETED"; }).length;
    var incomplete = items.filter(function (item) { return item.status === "NOT_COMPLETED"; }).length;
    var applicableItems = completed + incomplete;
    var completionRate = applicableItems > 0
        ? Math.round((completed / applicableItems) * 100)
        : 0;
    var recordedServices = new Set(records.map(function (record) { return record.serviceDate + ":" + record.serviceType; })).size;
    var metrics = [
        {
            label: "Completed items",
            value: completed,
            description: "Marked as completed",
            icon: lucide_react_1.CheckCircle2,
            iconClass: "bg-emerald-50 text-emerald-700"
        },
        {
            label: "Incomplete items",
            value: incomplete,
            description: "Explicitly marked incomplete",
            icon: lucide_react_1.ClipboardList,
            iconClass: "bg-amber-50 text-amber-700"
        },
        {
            label: "Completion rate",
            value: completionRate + "%",
            description: "Completed of applicable items",
            icon: lucide_react_1.Percent,
            iconClass: "bg-sky-50 text-sky-700"
        },
        {
            label: "Recorded services",
            value: recordedServices,
            description: "Services with checklist records",
            icon: lucide_react_1.Activity,
            iconClass: "bg-violet-50 text-violet-700"
        },
    ];
    return (React.createElement("section", { "aria-label": "Checklist summary" },
        React.createElement("div", { className: "mb-4" },
            React.createElement("h2", { className: "text-xl font-bold tracking-tight text-[#0C2340] mt-4" }, "Checklist overview"),
            React.createElement("p", { className: "mt-1 text-sm text-slate-500" }, "A summary of recorded results for your current selection.")),
        React.createElement("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4" }, metrics.map(function (metric) {
            var Icon = metric.icon;
            return (React.createElement("article", { key: metric.label, className: "rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm" },
                React.createElement("div", { className: "flex items-start justify-between gap-3" },
                    React.createElement("p", { className: "text-sm font-medium text-slate-500" }, metric.label),
                    React.createElement("span", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl " + metric.iconClass },
                        React.createElement(Icon, { className: "h-5 w-5" }))),
                React.createElement("p", { className: "mt-4 text-3xl font-bold tracking-tight text-[#0C2340] tabular-nums" }, metric.value),
                React.createElement("p", { className: "mt-1 text-xs text-slate-500" }, metric.description)));
        }))));
};
