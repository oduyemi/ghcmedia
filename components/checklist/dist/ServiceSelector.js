"use strict";
exports.__esModule = true;
exports.ServiceSelector = void 0;
var lucide_react_1 = require("lucide-react");
var checklist_1 = require("@/data/checklist");
var options = [
    { value: "ALL", label: "All Services" },
    { value: "BUSINESS", label: "Business Service" },
    { value: "CELEBRATION", label: "Celebration Service" },
    { value: "MC_LIVE", label: "MC Live" },
    { value: "WOW", label: "WOW" },
];
exports.ServiceSelector = function (_a) {
    var value = _a.value, onChange = _a.onChange;
    return (React.createElement("section", { "aria-labelledby": "service-selector-title" },
        React.createElement("div", null,
            React.createElement("p", { className: "text-xs font-bold uppercase tracking-[0.16em] text-[#007FAF]" }, "Services"),
            React.createElement("h2", { id: "service-selector-title", className: "mt-2 text-xl font-bold tracking-tight text-[#0C2340]" }, "Explore by service"),
            React.createElement("p", { className: "mt-2 text-sm leading-6 text-slate-500" }, "Select a service to narrow the checklist records.")),
        React.createElement("div", { className: "mt-5 flex flex-wrap gap-2" }, options.map(function (option) {
            var active = value === option.value;
            return (React.createElement("button", { key: option.value, type: "button", "aria-pressed": active, onClick: function () { return onChange(option.value); }, className: "inline-flex min-h-10 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition " + (active
                    ? "border-[#0C2340] bg-[#0C2340] text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-[#00A3E0]/50 hover:text-[#0C2340]") },
                active && React.createElement(lucide_react_1.Check, { className: "h-3.5 w-3.5" }),
                option.label));
        })),
        React.createElement("div", { className: "mt-5 grid gap-3 md:grid-cols-2" }, checklist_1.services.map(function (service) {
            var active = value === service.id;
            return (React.createElement("button", { key: service.id, type: "button", onClick: function () { return onChange(service.id); }, "aria-pressed": active, className: "group rounded-2xl border p-4 text-left transition sm:p-5 " + (active
                    ? "border-[#00A3E0]/60 bg-[#00A3E0]/[0.04] ring-2 ring-[#00A3E0]/10"
                    : "border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-sm") },
                React.createElement("div", { className: "flex items-start gap-3" },
                    React.createElement("span", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl " + (active
                            ? "bg-[#00A3E0]/10 text-[#007FAF]"
                            : "bg-slate-100 text-slate-500 group-hover:bg-[#00A3E0]/10 group-hover:text-[#007FAF]") }, service.id === "WOW" ? (React.createElement(lucide_react_1.Radio, { className: "h-5 w-5" })) : (React.createElement(lucide_react_1.CalendarDays, { className: "h-5 w-5" }))),
                    React.createElement("span", { className: "min-w-0 flex-1" },
                        React.createElement("span", { className: "block text-sm font-bold text-[#0C2340]" }, service.name),
                        React.createElement("span", { className: "mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#007FAF]" },
                            React.createElement(lucide_react_1.Clock3, { className: "h-3.5 w-3.5" }),
                            service.schedule),
                        React.createElement("span", { className: "mt-3 block text-xs leading-5 text-slate-500" }, service.description)),
                    React.createElement("span", { className: "mt-1 h-4 w-4 shrink-0 rounded-full border " + (active
                            ? "border-[#00A3E0] bg-[#00A3E0] shadow-[inset_0_0_0_3px_white]"
                            : "border-slate-300") }))));
        })),
        React.createElement("div", { className: "mt-4 rounded-xl border border-amber-200/80 bg-amber-50/70 p-4" },
            React.createElement("p", { className: "text-sm font-semibold text-[#0C2340]" }, "Important: Wednesday service classification"),
            React.createElement("p", { className: "mt-1.5 text-xs leading-6 text-slate-600" }, "Worship on Wednesday (WOW) takes place on the last Wednesday of each month in place of the regular MC Live service. Reports should identify that date as WOW, not MC Live."))));
};
