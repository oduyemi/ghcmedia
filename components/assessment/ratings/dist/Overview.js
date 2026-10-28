"use client";
"use strict";
exports.__esModule = true;
exports.RatingsOverview = void 0;
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var link_1 = require("next/link");
var Heading_1 = require("@/components/assessment/ratings/shared/Heading");
var ease = [0.22, 1, 0.36, 1];
function formatMetric(value, suffix) {
    if (suffix === void 0) { suffix = ""; }
    if (value === null ||
        value === undefined ||
        !Number.isFinite(value)) {
        return "—";
    }
    return "" + value.toLocaleString() + suffix;
}
function isAvailable(value) {
    return (value !== null &&
        value !== undefined &&
        Number.isFinite(value));
}
var metrics = [
    {
        key: "rating",
        href: "#rating-bands",
        label: "Approved average rating",
        description: "Based on approved service-level results.",
        emptyDescription: "Available when an approved service-level scoring policy exists.",
        icon: lucide_react_1.TrendingUp,
        value: null,
        suffix: "/100",
        theme: "featured"
    },
    {
        key: "services",
        href: "#service-reports",
        label: "Services assessed",
        description: "Services with recorded assessments.",
        emptyDescription: "Assessment totals will appear when records are connected.",
        icon: lucide_react_1.ClipboardCheck,
        value: null,
        suffix: "",
        theme: "mint"
    },
    {
        key: "checklists",
        href: "#checklist-reports",
        label: "Checklist completion",
        description: "Completed applicable checklist items.",
        emptyDescription: "Calculated from submitted, applicable checklist items.",
        icon: lucide_react_1.FileBarChart2,
        value: null,
        suffix: "%",
        theme: "lilac"
    },
    {
        key: "improvements",
        href: "#report-history",
        label: "Areas for improvement",
        description: "Opportunities identified in approved reports.",
        emptyDescription: "Shown when approved reports identify improvement areas.",
        icon: lucide_react_1.Activity,
        value: null,
        suffix: "",
        theme: "gold"
    },
    {
        key: "reviews",
        href: "#review-queue",
        label: "Outstanding reviews",
        description: "Assessments awaiting review.",
        emptyDescription: "Review workload will appear when assessment records are connected.",
        icon: lucide_react_1.Users,
        value: null,
        suffix: "",
        theme: "rose"
    },
];
var themeStyles = {
    featured: {
        card: "border-[#164A76] bg-[#0C2340] text-white",
        icon: "bg-[#00A3E0] text-white shadow-[0_0_0_7px_rgba(0,163,224,0.12)]",
        accent: "#41B6E6",
        decoration: "bg-[#00A3E0]/15",
        label: "text-white"
    },
    mint: {
        card: "border-[#D8F0E3] bg-[#F0FBF5] text-[#0C2340]",
        icon: "bg-[#0BAA70] text-white shadow-[0_0_0_6px_rgba(11,170,112,0.10)]",
        accent: "#008A60",
        decoration: "bg-[#A5E8C9]/45",
        label: "text-[#0C2340]"
    },
    lilac: {
        card: "border-[#E7DEFF] bg-[#F8F5FF] text-[#0C2340]",
        icon: "bg-[#7954E8] text-white shadow-[0_0_0_6px_rgba(121,84,232,0.10)]",
        accent: "#7954E8",
        decoration: "bg-[#D8CAFF]/55",
        label: "text-[#0C2340]"
    },
    gold: {
        card: "border-[#F5E5C8] bg-[#FFFAF0] text-[#0C2340]",
        icon: "bg-[#E59A25] text-white shadow-[0_0_0_6px_rgba(229,154,37,0.11)]",
        accent: "#A76500",
        decoration: "bg-[#FFE2A5]/60",
        label: "text-[#0C2340]"
    },
    rose: {
        card: "border-[#F5DDDF] bg-[#FFF5F5] text-[#0C2340]",
        icon: "bg-[#E95161] text-white shadow-[0_0_0_6px_rgba(233,81,97,0.10)]",
        accent: "#C24153",
        decoration: "bg-[#FFC9CF]/55",
        label: "text-[#0C2340]"
    }
};
function DecorativeArtwork(_a) {
    var theme = _a.theme, value = _a.value;
    if (theme === "featured") {
        return (React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute inset-x-0 bottom-0 h-28 overflow-hidden" },
            React.createElement("div", { className: "absolute -bottom-20 -left-8 h-36 w-[115%] -rotate-6 rounded-[50%] border border-[#00A3E0]/30 bg-[#00A3E0]/[0.08]" }),
            React.createElement("div", { className: "absolute -bottom-24 left-10 h-36 w-[110%] rotate-6 rounded-[50%] border border-[#41B6E6]/40 bg-[#00A3E0]/[0.13]" }),
            React.createElement("div", { className: "absolute -bottom-28 left-24 h-36 w-[100%] -rotate-3 rounded-[50%] border border-[#41B6E6]/20" }),
            React.createElement("span", { className: "absolute bottom-12 right-[22%] h-3 w-3 rounded-full border-[3px] border-[#67DFFF] bg-white shadow-[0_0_18px_rgba(0,163,224,0.8)]" })));
    }
    if (theme === "mint") {
        return (React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute -bottom-9 left-0 right-0 flex h-24 items-end justify-center gap-2 overflow-hidden opacity-70" },
            [20, 34, 48, 64, 40].map(function (height, index) { return (React.createElement("span", { key: index, style: { height: height + "px" }, className: "w-3 rounded-t-md bg-gradient-to-t from-[#91E4BE] to-[#2AC48A]" })); }),
            React.createElement("span", { className: "absolute -bottom-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full border border-[#70D9AC]/50" })));
    }
    if (theme === "lilac") {
        return (React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute -bottom-10 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full border-[9px] border-[#E5DCFF]" },
            value !== null && (React.createElement("div", { className: "absolute inset-[-9px] rounded-full border-[9px] border-transparent border-t-[#7954E8] border-r-[#A28AFF]", style: {
                    transform: "rotate(" + Math.max(0, Math.min(value, 100)) * 3.6 + "deg)"
                } })),
            React.createElement("div", { className: "absolute inset-3 rounded-full bg-[#F8F5FF]" }),
            React.createElement("span", { className: "absolute inset-0 flex items-center justify-center" },
                React.createElement(lucide_react_1.CheckCircle2, { className: "h-6 w-6 text-[#7954E8]" }))));
    }
    if (theme === "gold") {
        return (React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute -bottom-12 left-1/2 h-28 w-40 -translate-x-1/2" },
            React.createElement("div", { className: "absolute bottom-0 left-0 h-24 w-40 rounded-t-full bg-gradient-to-t from-[#F9D48A]/20 to-[#F9D48A]/65" }),
            React.createElement("div", { className: "absolute bottom-0 left-6 h-16 w-28 -rotate-12 rounded-t-full bg-gradient-to-t from-[#F6CB75]/20 to-[#F6CB75]/80" }),
            React.createElement("div", { className: "absolute bottom-0 right-2 h-20 w-24 rotate-12 rounded-t-full bg-gradient-to-t from-[#F4BF5B]/20 to-[#F4BF5B]/75" }),
            React.createElement("span", { className: "absolute right-7 top-0 h-7 w-px bg-[#D9982D]" }),
            React.createElement("span", { className: "absolute right-7 top-0 h-3 w-3 bg-[#E59A25]" })));
    }
    return (React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute -bottom-9 left-1/2 h-28 w-36 -translate-x-1/2" },
        React.createElement("div", { className: "absolute bottom-0 left-0 h-24 w-24 rounded-full border border-[#FFC5CB] bg-[#FFC5CB]/25" }),
        React.createElement("div", { className: "absolute bottom-0 right-0 h-24 w-24 rounded-full border border-[#FFC5CB] bg-[#FFC5CB]/25" }),
        React.createElement("div", { className: "absolute bottom-0 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full border border-[#FFB5BE] bg-[#FFB5BE]/20" }),
        React.createElement(lucide_react_1.Users, { className: "absolute bottom-5 left-1/2 h-9 w-9 -translate-x-1/2 text-[#E95161]" })));
}
exports.RatingsOverview = function (_a) {
    var _b = _a.approvedAverageRating, approvedAverageRating = _b === void 0 ? null : _b, _c = _a.servicesAssessed, servicesAssessed = _c === void 0 ? null : _c, _d = _a.checklistCompletion, checklistCompletion = _d === void 0 ? null : _d, _e = _a.areasForImprovement, areasForImprovement = _e === void 0 ? null : _e, _f = _a.outstandingReviews, outstandingReviews = _f === void 0 ? null : _f;
    var shouldReduceMotion = framer_motion_1.useReducedMotion();
    var reduceMotion = shouldReduceMotion !== null && shouldReduceMotion !== void 0 ? shouldReduceMotion : false;
    var values = [
        approvedAverageRating,
        servicesAssessed,
        checklistCompletion,
        areasForImprovement,
        outstandingReviews,
    ];
    var heading = {
        title: "The bigger picture.",
        description: "A clearer view of Media Team assessment and reporting activity. Better visibility helps us celebrate what's working and see where we can grow."
    };
    return (React.createElement("section", { "aria-labelledby": "ratings-overview-title", className: "relative isolate overflow-hidden bg-[#F8FAFD] py-16 sm:py-20 lg:py-24" },
        React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute -right-36 -top-24 -z-10 h-96 w-96 rounded-full bg-[#C8F0FF]/45 blur-3xl" }),
        React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute -bottom-40 -left-32 -z-10 h-96 w-96 rounded-full bg-[#E8DDFF]/35 blur-3xl" }),
        React.createElement("div", { className: "mx-auto max-w-7xl px-5 sm:px-8 lg:px-10" },
            React.createElement("div", { className: "grid items-end gap-7 lg:grid-cols-[1fr_auto] lg:gap-12" },
                React.createElement("div", { className: "max-w-3xl" },
                    React.createElement("div", { id: "ratings-overview-title" },
                        React.createElement(Heading_1.SectionHeading, { eyebrow: "", title: heading.title, description: heading.description }))),
                React.createElement("div", { className: "hidden max-w-[220px] pb-2 lg:block" },
                    React.createElement("p", { className: "rotate-[-5deg] text-right text-lg font-semibold italic leading-snug text-[#00A3E0]" },
                        "Better data.",
                        React.createElement("br", null),
                        "Greater impact."),
                    React.createElement("svg", { "aria-hidden": "true", viewBox: "0 0 180 20", fill: "none", className: "ml-auto mt-2 w-32 text-[#00A3E0]" },
                        React.createElement("path", { d: "M3 15C44 3 95 1 174 7", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" })))),
            React.createElement("div", { className: "mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-6 xl:gap-4" }, metrics.map(function (metric, index) {
                var Icon = metric.icon;
                var theme = metric.theme;
                var style = themeStyles[theme];
                var value = values[index];
                var available = isAvailable(value);
                var featured = theme === "featured";
                return (React.createElement(framer_motion_1.motion.article, { key: metric.key, initial: reduceMotion ? false : { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: {
                        duration: reduceMotion ? 0 : 0.65,
                        delay: reduceMotion ? 0 : index * 0.07,
                        ease: ease
                    }, className: [
                        "group relative isolate flex min-h-[285px] flex-col overflow-hidden rounded-[1.75rem] border p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_48px_rgba(12,35,64,0.11)] sm:min-h-[285px] sm:p-6",
                        featured
                            ? "min-h-[330px] border-[#164A76] bg-[#0C2340] text-white shadow-[0_14px_35px_rgba(12,35,64,0.16)] sm:col-span-2 sm:min-h-[330px] sm:p-7 xl:col-span-2"
                            : style.card + " xl:col-span-1",
                    ].join(" ") },
                    !featured && (React.createElement("div", { "aria-hidden": "true", className: "absolute -right-10 -top-10 -z-10 h-32 w-32 rounded-full transition-transform duration-500 group-hover:scale-125 " + style.decoration })),
                    React.createElement("div", { className: "flex items-start justify-between gap-3" },
                        React.createElement("span", { className: [
                                "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:rotate-[-5deg] group-hover:scale-105",
                                style.icon,
                            ].join(" ") },
                            React.createElement(Icon, { className: "h-5 w-5", strokeWidth: 2, "aria-hidden": "true" })),
                        React.createElement("span", { className: [
                                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.12em]",
                                featured
                                    ? "border-white/15 bg-white/[0.07] text-slate-200"
                                    : "border-white/80 bg-white/65 text-slate-500",
                            ].join(" ") },
                            React.createElement("span", { className: [
                                    "h-2 w-2 rounded-full",
                                    available ? "bg-emerald-400" : "bg-slate-300",
                                ].join(" ") }),
                            available ? "Recorded" : "Awaiting data")),
                    React.createElement("div", { className: "relative z-10 mt-7" },
                        React.createElement("p", { className: [
                                "font-black leading-none tracking-[-0.065em]",
                                featured
                                    ? "text-5xl sm:text-6xl"
                                    : "text-4xl sm:text-[2.65rem]",
                                featured ? "text-white" : "text-[#0C2340]",
                            ].join(" ") }, formatMetric(value, metric.suffix)),
                        React.createElement("h3", { className: [
                                "mt-4 text-sm font-extrabold leading-5",
                                featured ? "text-white" : style.label,
                            ].join(" ") }, metric.label),
                        React.createElement("p", { className: [
                                "mt-2 max-w-[22rem] text-xs leading-5",
                                featured ? "text-slate-300" : "text-slate-500",
                            ].join(" ") }, available
                            ? metric.description
                            : metric.emptyDescription)),
                    React.createElement(DecorativeArtwork, { theme: theme, value: typeof value === "number" ? value : null }),
                    React.createElement("div", { className: "relative z-10 mt-auto flex items-end justify-between pt-7" },
                        React.createElement("span", { className: [
                                "text-[10px] font-bold uppercase tracking-[0.16em]",
                                featured ? "text-[#6BCDF1]/70" : "text-slate-400",
                            ].join(" ") }, "0" + (index + 1),
                            " / OVERVIEW"),
                        React.createElement(link_1["default"], { href: metric.href, "aria-label": "View " + metric.label.toLowerCase(), className: [
                                "relative z-20 flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                                "transition-all duration-300 hover:-translate-y-0.5 hover:translate-x-0.5",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0]",
                                "focus-visible:ring-offset-2",
                                featured
                                    ? "bg-white text-[#0C2340]"
                                    : "border border-white/90 bg-white text-[#0C2340] shadow-sm",
                            ].join(" ") },
                            React.createElement(lucide_react_1.ArrowUpRight, { className: "h-4 w-4 transition-transform duration-300 group-hover:rotate-45", "aria-hidden": "true" }))),
                    featured && (React.createElement("div", { "aria-hidden": "true", className: "absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-[#00A3E0] via-[#41B6E6] to-[#7651C9]" }))));
            })),
            React.createElement("div", { className: "mt-7 overflow-hidden rounded-[1.5rem] border border-[#BFE8FA] bg-gradient-to-r from-[#EAF9FF] via-white to-[#F1F7FF]" },
                React.createElement("div", { className: "flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-5 sm:px-6 sm:py-5" },
                    React.createElement("span", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D5F3FF] text-[#0087BD]" },
                        React.createElement(lucide_react_1.Info, { className: "h-5 w-5", "aria-hidden": "true" })),
                    React.createElement("div", { className: "flex-1" },
                        React.createElement("p", { className: "text-sm leading-6 text-slate-600" },
                            React.createElement("span", { className: "font-extrabold text-[#0C2340]" }, "A note on the numbers."),
                            " ",
                            "An unavailable metric is not zero. Ratings remain unavailable until the relevant scoring and approval policy is established. Figures should come from verified records when the reporting API is connected.")),
                    React.createElement("div", { className: "hidden shrink-0 border-l border-[#BFE8FA] pl-5 sm:block" },
                        React.createElement("p", { className: "text-sm font-extrabold text-[#0C2340]" }, "Real data."),
                        React.createElement("p", { className: "text-sm font-semibold text-[#0087BD]" }, "Real progress.")))),
            React.createElement("p", { className: "mt-5 flex items-center justify-center gap-2 text-center text-[11px] font-medium tracking-wide text-slate-400" },
                React.createElement(lucide_react_1.ArrowDownRight, { className: "h-3.5 w-3.5", "aria-hidden": "true" }),
                "A snapshot of assessment activity, designed for continuous growth."))));
};
