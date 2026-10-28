"use strict";
exports.__esModule = true;
exports.StatusBadge = void 0;
var lucide_react_1 = require("lucide-react");
var ratings_1 = require("@/data/ratings");
var statusStyles = {
    draft: {
        icon: lucide_react_1.FileEdit,
        className: "border-slate-200 bg-slate-100 text-slate-600"
    },
    "pending-review": {
        icon: lucide_react_1.Clock3,
        className: "border-amber-200 bg-amber-50 text-amber-800"
    },
    approved: {
        icon: lucide_react_1.ShieldCheck,
        className: "border-sky-200 bg-sky-50 text-sky-800"
    },
    published: {
        icon: lucide_react_1.CheckCircle2,
        className: "border-emerald-200 bg-emerald-50 text-emerald-800"
    }
};
exports.StatusBadge = function (_a) {
    var status = _a.status, _b = _a.className, className = _b === void 0 ? "" : _b;
    var config = statusStyles[status];
    var Icon = config.icon;
    return (React.createElement("span", { className: [
            "inline-flex w-fit items-center gap-1.5 rounded-full border",
            "px-2.5 py-1 text-xs font-semibold leading-4",
            "whitespace-nowrap",
            config.className,
            className,
        ]
            .filter(Boolean)
            .join(" ") },
        React.createElement(Icon, { "aria-hidden": "true", className: "h-3.5 w-3.5 shrink-0" }),
        React.createElement("span", null, ratings_1.reportStatusLabels[status])));
};
