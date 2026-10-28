"use client";
"use strict";
exports.__esModule = true;
exports.ServiceReportCards = void 0;
var link_1 = require("next/link");
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var ratings_1 = require("@/data/ratings");
var Heading_1 = require("@/components/assessment/ratings/shared/Heading");
var serviceIcons = {
    "sunday-business": lucide_react_1.Video,
    "sunday-celebration": lucide_react_1.Radio,
    "wednesday-mc-live": lucide_react_1.FileBarChart2,
    "wednesday-wow": lucide_react_1.CalendarDays
};
var serviceAccents = {
    "sunday-business": {
        label: "Sunday service",
        accent: "#0087BD",
        iconBg: "bg-[#E7F7FC]",
        iconColor: "text-[#0087BD]",
        glow: "bg-[#41B6E6]/10",
        number: "01"
    },
    "sunday-celebration": {
        label: "Sunday service",
        accent: "#008A4B",
        iconBg: "bg-[#E8F7EF]",
        iconColor: "text-[#008A4B]",
        glow: "bg-[#00A859]/10",
        number: "02"
    },
    "wednesday-mc-live": {
        label: "Wednesday service",
        accent: "#7651C9",
        iconBg: "bg-[#F1ECFF]",
        iconColor: "text-[#7651C9]",
        glow: "bg-[#7651C9]/10",
        number: "03"
    },
    "wednesday-wow": {
        label: "Monthly programme",
        accent: "#B66B00",
        iconBg: "bg-[#FFF4DB]",
        iconColor: "text-[#B66B00]",
        glow: "bg-[#FFC72C]/15",
        number: "04"
    }
};
var ease = [0.22, 1, 0.36, 1];
exports.ServiceReportCards = function (_a) {
    var _b = _a.reportCounts, reportCounts = _b === void 0 ? {} : _b, onSelectService = _a.onSelectService;
    var shouldReduceMotion = framer_motion_1.useReducedMotion();
    var reduceMotion = shouldReduceMotion !== null && shouldReduceMotion !== void 0 ? shouldReduceMotion : false;
    return (React.createElement("section", { id: "service-reports", "aria-labelledby": "regular-services-heading", className: "relative isolate overflow-hidden py-16 sm:py-20 lg:py-24" },
        React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#F7F9FC] via-white to-[#F7F9FC]" }),
        React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute -right-24 top-20 -z-10 h-80 w-80 rounded-full bg-[#41B6E6]/10 blur-3xl" }),
        React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute -left-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-[#7651C9]/[0.06] blur-3xl" }),
        React.createElement("div", { className: "mx-auto max-w-7xl px-5 sm:px-8 lg:px-10" },
            React.createElement("div", { className: "flex flex-col gap-6 md:flex-row md:items-end md:justify-between" },
                React.createElement("div", { className: "max-w-3xl" },
                    React.createElement(Heading_1.SectionHeading, { eyebrow: "Regular services", title: "Every service has a story.", description: "Explore reporting for our regular services. Published reports become available when assessments have been recorded, reviewed, and approved." })),
                React.createElement("div", { className: "hidden shrink-0 items-center gap-2 pb-1 text-sm font-semibold text-slate-400 md:flex" },
                    React.createElement("span", null, "Our service collection"),
                    React.createElement(lucide_react_1.ArrowDownRight, { className: "h-4 w-4", "aria-hidden": "true" }))),
            React.createElement("div", { className: "mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4" }, ratings_1.serviceDefinitions.map(function (service, index) {
                var Icon = serviceIcons[service.id];
                var accent = serviceAccents[service.id];
                var rawCount = reportCounts[service.id];
                var reportCount = typeof rawCount === "number" &&
                    Number.isFinite(rawCount) &&
                    rawCount >= 0
                    ? Math.floor(rawCount)
                    : null;
                var hasReports = reportCount !== null && reportCount > 0;
                return (React.createElement(framer_motion_1.motion.article, { key: service.id, initial: reduceMotion ? false : { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 }, transition: {
                        duration: reduceMotion ? 0 : 0.55,
                        delay: reduceMotion ? 0 : index * 0.07,
                        ease: ease
                    }, className: "group relative flex min-h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_4px_24px_rgba(12,35,64,0.035)] transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_55px_rgba(12,35,64,0.09)]" },
                    React.createElement("div", { className: "h-1.5 w-full", style: {
                            background: "linear-gradient(90deg, " + accent.accent + ", #41B6E6)"
                        } }),
                    React.createElement("div", { className: "relative flex flex-1 flex-col p-5 sm:p-6" },
                        React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute -right-12 top-0 h-36 w-36 rounded-full blur-3xl transition-opacity duration-300 group-hover:opacity-150 " + accent.glow }),
                        React.createElement("div", { className: "relative flex items-start justify-between gap-3" },
                            React.createElement("div", { className: "flex h-14 w-14 items-center justify-center rounded-[1.2rem] transition duration-300 group-hover:scale-105 " + accent.iconBg + " " + accent.iconColor },
                                React.createElement(Icon, { size: 25, strokeWidth: 1.7, "aria-hidden": "true" })),
                            React.createElement("span", { className: "pt-1 text-xs font-black tracking-[0.16em] text-slate-300" }, accent.number)),
                        React.createElement("div", { className: "relative mt-7" },
                            React.createElement("span", { className: "inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.15em]", style: { color: accent.accent } },
                                React.createElement("span", { className: "h-1.5 w-1.5 rounded-full", style: { backgroundColor: accent.accent } }),
                                accent.label),
                            React.createElement("h3", { id: "service-" + service.id, className: "mt-3 text-xl font-extrabold leading-snug tracking-tight text-[#0C2340] sm:text-[1.35rem]" }, service.name),
                            React.createElement("p", { className: "mt-3 min-h-[4.5rem] text-sm leading-6 text-slate-500" }, service.description)),
                        React.createElement("div", { className: "relative mt-6 space-y-3 rounded-2xl bg-[#F7F9FC] p-4" },
                            React.createElement("div", { className: "flex items-start gap-3" },
                                React.createElement("span", { className: "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm" },
                                    React.createElement(lucide_react_1.CalendarDays, { size: 15, "aria-hidden": "true" })),
                                React.createElement("div", { className: "min-w-0 pt-0.5" },
                                    React.createElement("p", { className: "text-[10px] font-bold uppercase tracking-wider text-slate-400" }, "Schedule"),
                                    React.createElement("p", { className: "mt-1 text-sm font-semibold text-[#0C2340]" }, service.day))),
                            React.createElement("div", { className: "flex items-start gap-3" },
                                React.createElement("span", { className: "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm" },
                                    React.createElement(lucide_react_1.Clock3, { size: 15, "aria-hidden": "true" })),
                                React.createElement("div", { className: "min-w-0 pt-0.5" },
                                    React.createElement("p", { className: "text-[10px] font-bold uppercase tracking-wider text-slate-400" }, "Service time"),
                                    React.createElement("p", { className: "mt-1 text-sm font-semibold text-[#0C2340]" },
                                        service.time,
                                        " WAT")))),
                        React.createElement("div", { className: "relative mt-5 flex items-center justify-between gap-3" },
                            React.createElement("div", { className: "min-w-0" },
                                React.createElement("p", { className: "text-xs font-bold text-[#0C2340]" }, "Published reports"),
                                React.createElement("p", { className: "mt-1 text-xs leading-5 " + (hasReports
                                        ? "font-semibold text-[#008A4B]"
                                        : "text-slate-500") }, reportCount === null
                                    ? "Availability not yet confirmed"
                                    : hasReports
                                        ? reportCount + " published report" + (reportCount === 1 ? "" : "s")
                                        : "No published reports yet")),
                            React.createElement("span", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl " + (hasReports
                                    ? "bg-[#E8F7EF] text-[#008A4B]"
                                    : "bg-slate-100 text-slate-400") }, hasReports ? (React.createElement(lucide_react_1.CheckCircle2, { size: 18, "aria-hidden": "true" })) : (React.createElement(lucide_react_1.FileBarChart2, { size: 18, "aria-hidden": "true" })))),
                        React.createElement("div", { className: "mt-auto pt-6" }, onSelectService ? (React.createElement("button", { type: "button", onClick: function () { return onSelectService(service.id); }, className: "group/link inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0C2340] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#163B60] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2" },
                            "Explore reports",
                            React.createElement(lucide_react_1.ArrowRight, { size: 16, className: "transition-transform group-hover/link:translate-x-1", "aria-hidden": "true" }))) : (React.createElement(link_1["default"], { href: "/ratings?service=" + encodeURIComponent(service.id) + "#report-history", className: "group/link inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0C2340] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#163B60] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2" },
                            "Explore reports",
                            React.createElement(lucide_react_1.ArrowRight, { size: 16, className: "transition-transform group-hover/link:translate-x-1", "aria-hidden": "true" })))))));
            })),
            React.createElement("div", { className: "mt-7 flex items-start gap-3 rounded-2xl border border-[#DCECF5] bg-white/80 px-4 py-4 sm:px-5" },
                React.createElement("p", { className: "text-xs leading-6 text-slate-500 sm:text-sm" },
                    React.createElement("span", { className: "font-bold text-[#0C2340]" },
                        "A note on scheduling:",
                        " "),
                    "Worship on Wednesday (WOW) takes place on the last Wednesday of each month and replaces the regular MC Live programme. Dated occurrences should follow the Africa/Lagos timezone.")))));
};
