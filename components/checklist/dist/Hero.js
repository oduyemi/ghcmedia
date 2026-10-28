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
exports.ChecklistHero = void 0;
var link_1 = require("next/link");
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var ease = [0.22, 1, 0.36, 1];
exports.ChecklistHero = function () {
    var shouldReduceMotion = framer_motion_1.useReducedMotion();
    var reveal = function (delay) {
        if (delay === void 0) { delay = 0; }
        return shouldReduceMotion
            ? {}
            : {
                initial: { opacity: 0, y: 22 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: delay, ease: ease }
            };
    };
    return (React.createElement("section", { className: "relative isolate overflow-hidden bg-[#0C2340] text-white" },
        React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute inset-0 -z-10 overflow-hidden" },
            React.createElement(framer_motion_1.motion.div, { animate: shouldReduceMotion
                    ? undefined
                    : { x: [0, 18, 0], y: [0, 14, 0], scale: [1, 1.06, 1] }, transition: { duration: 16, repeat: Infinity, ease: "easeInOut" }, className: "absolute -right-40 -top-48 h-[32rem] w-[32rem] rounded-full bg-[#00A3E0]/20 blur-[100px]" }),
            React.createElement(framer_motion_1.motion.div, { animate: shouldReduceMotion
                    ? undefined
                    : { x: [0, -16, 0], y: [0, -10, 0] }, transition: { duration: 19, repeat: Infinity, ease: "easeInOut" }, className: "absolute -bottom-56 left-[15%] h-[30rem] w-[30rem] rounded-full bg-[#41B6E6]/10 blur-[100px]" }),
            React.createElement("div", { className: "absolute inset-0 opacity-[0.055]", style: {
                    backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
                    backgroundSize: "25px 25px"
                } }),
            React.createElement("div", { className: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#41B6E6]/40 to-transparent" }),
            React.createElement("div", { className: "absolute right-[5%] top-20 hidden h-72 w-72 rounded-full border border-white/[0.07] lg:block" }),
            React.createElement("div", { className: "absolute right-[8%] top-28 hidden h-56 w-56 rounded-full border border-[#41B6E6]/15 lg:block" })),
        React.createElement("div", { className: "relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:grid-cols-[1.03fr_0.97fr] lg:gap-8 lg:px-10 lg:pb-24 lg:pt-20" },
            React.createElement("div", { className: "relative z-10 max-w-2xl" },
                React.createElement(framer_motion_1.motion.h1, __assign({}, reveal(0.14), { className: "mt-7 text-[2.7rem] font-bold leading-[1.06] tracking-[-0.045em] text-white sm:text-6xl lg:text-[4.35rem]" }),
                    "Service Checklists",
                    React.createElement("span", { className: "mt-2 block bg-gradient-to-r from-[#41B6E6] via-[#65D5F4] to-[#00A3E0] bg-clip-text text-transparent" }, "& Reports")),
                React.createElement(framer_motion_1.motion.p, __assign({}, reveal(0.23), { className: "mt-6 max-w-xl text-base font-medium leading-7 text-white/85 sm:text-lg sm:leading-8" }), "Consistency in preparation. Excellence in service. Accountability in every detail."),
                React.createElement(framer_motion_1.motion.p, __assign({}, reveal(0.3), { className: "mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-[15px] sm:leading-8" }), "Explore recorded Media Team checklist results across Global Harvest Church Maryland, Lagos. Review service readiness, monitor checklist completion, and identify opportunities to strengthen our media production standards."),
                React.createElement(framer_motion_1.motion.div, __assign({}, reveal(0.38), { className: "mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/70 sm:text-sm" }),
                    React.createElement("div", { className: "inline-flex items-center gap-2.5" },
                        React.createElement("span", { className: "flex h-8 w-8 items-center justify-center rounded-xl border border-[#41B6E6]/20 bg-[#41B6E6]/[0.09]" },
                            React.createElement(lucide_react_1.FileBarChart2, { className: "h-4 w-4 text-[#41B6E6]" })),
                        "Reporting by service and period"),
                    React.createElement("div", { className: "inline-flex items-center gap-2.5" },
                        React.createElement("span", { className: "flex h-8 w-8 items-center justify-center rounded-xl border border-[#41B6E6]/20 bg-[#41B6E6]/[0.09]" },
                            React.createElement(lucide_react_1.ShieldCheck, { className: "h-4 w-4 text-[#41B6E6]" })),
                        "Recorded results only")),
                React.createElement(framer_motion_1.motion.div, __assign({}, reveal(0.46), { className: "mt-9" }),
                    React.createElement(link_1["default"], { href: "#reporting", className: "group/cta inline-flex min-h-12 items-center gap-3 rounded-xl bg-[#00A3E0] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(0,163,224,0.65)] transition-colors duration-200 hover:bg-[#41B6E6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DDEFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C2340]" },
                        "Explore checklist reports",
                        React.createElement("span", { className: "flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 transition-transform duration-200 group-hover/cta:translate-y-0.5" },
                            React.createElement(lucide_react_1.ArrowDown, { className: "h-4 w-4" })))),
                React.createElement(framer_motion_1.motion.div, __assign({}, reveal(0.54), { className: "mt-5 flex items-center gap-2 text-xs text-white/40" }), "Every service is an opportunity to improve.")),
            React.createElement(framer_motion_1.motion.div, { initial: shouldReduceMotion ? false : { opacity: 0, x: 28, scale: 0.97 }, animate: { opacity: 1, x: 0, scale: 1 }, transition: { duration: 0.9, delay: 0.2, ease: ease }, className: "relative mx-auto w-full max-w-[540px] lg:ml-auto lg:mr-0" },
                React.createElement("div", { "aria-hidden": "true", className: "absolute left-1/2 top-1/2 aspect-square w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]" }),
                React.createElement("div", { "aria-hidden": "true", className: "absolute left-1/2 top-1/2 aspect-square w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#41B6E6]/15" }),
                React.createElement(framer_motion_1.motion.div, { animate: shouldReduceMotion ? undefined : { y: [0, -7, 0] }, transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }, className: "relative z-10" },
                    React.createElement("div", { className: "relative rounded-[26px] border border-white/15 bg-white/[0.08] p-2.5 shadow-[0_35px_100px_-35px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:rounded-[30px] sm:p-3" },
                        React.createElement("div", { className: "rounded-[20px] border border-white/70 bg-[#F9FCFF] p-5 text-[#0C2340] sm:rounded-[24px] sm:p-7" },
                            React.createElement("div", { className: "flex items-start justify-between gap-4" },
                                React.createElement("div", null,
                                    React.createElement("div", { className: "flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#007FAF]" },
                                        React.createElement("span", { className: "h-1.5 w-1.5 rounded-full bg-[#00A859]" }),
                                        "Media Team"),
                                    React.createElement("h2", { className: "mt-2 text-lg font-bold tracking-tight sm:text-xl" }, "Checklist reports"),
                                    React.createElement("p", { className: "mt-1 text-xs text-slate-500" }, "Service readiness overview")),
                                React.createElement("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-[#E7F7FD] text-[#007FAF]" },
                                    React.createElement(lucide_react_1.FileBarChart2, { className: "h-5 w-5" }))),
                            React.createElement("div", { className: "mt-7 grid grid-cols-[auto_1fr] items-center gap-5 sm:gap-7" },
                                React.createElement("div", { className: "relative flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32" },
                                    React.createElement("svg", { viewBox: "0 0 120 120", className: "absolute inset-0 h-full w-full -rotate-90", "aria-hidden": "true" },
                                        React.createElement("circle", { cx: "60", cy: "60", r: "49", fill: "none", stroke: "#E4EEF4", strokeWidth: "9" }),
                                        React.createElement(framer_motion_1.motion.circle, { cx: "60", cy: "60", r: "49", fill: "none", stroke: "#00A3E0", strokeWidth: "9", strokeLinecap: "round", strokeDasharray: 2 * Math.PI * 49, initial: {
                                                strokeDashoffset: 2 * Math.PI * 49
                                            }, animate: {
                                                strokeDashoffset: shouldReduceMotion
                                                    ? 2 * Math.PI * 49 * 0.08
                                                    : 2 * Math.PI * 49 * 0.08
                                            }, transition: { duration: 1.4, delay: 0.6, ease: ease } })),
                                    React.createElement("div", { className: "text-center" },
                                        React.createElement("span", { className: "block text-2xl font-bold tracking-tight sm:text-3xl" }, "92%"),
                                        React.createElement("span", { className: "mt-0.5 block text-[10px] text-slate-500" }, "Completion"))),
                                React.createElement("div", { className: "space-y-3.5" }, [
                                    {
                                        label: "Completed",
                                        count: "—",
                                        dot: "bg-[#00A859]"
                                    },
                                    {
                                        label: "In progress",
                                        count: "—",
                                        dot: "bg-[#FFC72C]"
                                    },
                                    {
                                        label: "Not started",
                                        count: "—",
                                        dot: "bg-slate-300"
                                    },
                                ].map(function (item) { return (React.createElement("div", { key: item.label, className: "flex items-center justify-between gap-2 text-xs" },
                                    React.createElement("span", { className: "flex items-center gap-2 text-slate-600" },
                                        React.createElement("span", { className: "h-2 w-2 rounded-full " + item.dot }),
                                        item.label),
                                    React.createElement("span", { className: "font-semibold text-[#0C2340]" }, item.count))); }))),
                            React.createElement("div", { className: "mt-7 border-t border-slate-200 pt-5" },
                                React.createElement("div", { className: "flex items-center justify-between gap-3" },
                                    React.createElement("p", { className: "text-xs font-bold text-[#0C2340]" }, "Service readiness"),
                                    React.createElement("span", { className: "text-[10px] text-slate-400" }, "Reporting overview")),
                                React.createElement("div", { className: "mt-4 flex h-20 items-end gap-2 sm:gap-3", "aria-hidden": "true" }, [42, 64, 54, 83, 68, 92, 76].map(function (height, index) { return (React.createElement("div", { key: index, className: "flex h-full flex-1 items-end" },
                                    React.createElement(framer_motion_1.motion.div, { initial: shouldReduceMotion ? false : { height: "0%" }, animate: { height: height + "%" }, transition: {
                                            duration: 0.65,
                                            delay: 0.45 + index * 0.07,
                                            ease: ease
                                        }, className: "w-full rounded-t-md " + (index === 5
                                            ? "bg-[#00A3E0]"
                                            : "bg-gradient-to-t from-[#41B6E6] to-[#B8EAF9]") }))); })),
                                React.createElement("div", { className: "mt-3 flex items-center justify-between text-[10px] text-slate-400" },
                                    React.createElement("span", null, "Service records"),
                                    React.createElement("span", { className: "inline-flex items-center gap-1.5 text-[#007FAF]" },
                                        React.createElement(lucide_react_1.ChartNoAxesColumnIncreasing, { className: "h-3.5 w-3.5" }),
                                        "Review performance")))))),
                React.createElement(framer_motion_1.motion.div, { animate: shouldReduceMotion
                        ? undefined
                        : { y: [0, 6, 0], rotate: [-3, -1.5, -3] }, transition: { duration: 7, repeat: Infinity, ease: "easeInOut" }, className: "absolute -bottom-9 -left-2 z-20 w-[54%] max-w-[240px] sm:-bottom-12 sm:-left-5" },
                    React.createElement("div", { className: "rounded-2xl border border-white/20 bg-[#12365A]/95 p-3.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:rounded-[22px] sm:p-4" },
                        React.createElement("div", { className: "flex items-center gap-2.5" },
                            React.createElement("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#00A3E0]/15 text-[#70D8FF]" },
                                React.createElement(lucide_react_1.ClipboardCheck, { className: "h-4.5 w-4.5" })),
                            React.createElement("div", { className: "min-w-0" },
                                React.createElement("p", { className: "truncate text-xs font-bold text-white" }, "Service checklist"),
                                React.createElement("p", { className: "mt-0.5 text-[10px] text-slate-400" }, "Preparation review"))),
                        React.createElement("div", { className: "mt-4 space-y-2.5" }, ["Equipment checked", "Team briefed", "Setup reviewed"].map(function (label) { return (React.createElement("div", { key: label, className: "flex items-center gap-2.5" },
                            React.createElement("span", { className: "flex h-4 w-4 shrink-0 items-center justify-center rounded-md bg-[#00A3E0] text-white" },
                                React.createElement(lucide_react_1.Check, { className: "h-3 w-3", strokeWidth: 3 })),
                            React.createElement("span", { className: "truncate text-[10px] text-white/80" }, label))); })))),
                React.createElement(framer_motion_1.motion.div, { animate: shouldReduceMotion ? undefined : { y: [0, -5, 0], x: [0, 2, 0] }, transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }, className: "absolute -right-1 bottom-8 z-20 hidden sm:block lg:-right-3" },
                    React.createElement("div", { className: "flex items-center gap-2.5 rounded-2xl border border-white/15 bg-[#12365A]/95 px-3.5 py-3 shadow-xl shadow-black/20 backdrop-blur-xl" },
                        React.createElement("span", { className: "flex h-9 w-9 items-center justify-center rounded-xl bg-[#00A859]/15 text-[#50D99A]" },
                            React.createElement(lucide_react_1.ShieldCheck, { className: "h-5 w-5" })),
                        React.createElement("div", null,
                            React.createElement("p", { className: "text-xs font-bold text-white" }, "Accountability"),
                            React.createElement("p", { className: "mt-0.5 text-[10px] text-slate-400" }, "Recorded results")),
                        React.createElement(lucide_react_1.ArrowUpRight, { className: "ml-1 h-4 w-4 text-[#41B6E6]" }))),
                React.createElement("div", { "aria-hidden": "true", className: "absolute -right-4 top-[22%] h-20 w-20 rounded-full bg-[#00A3E0]/20 blur-2xl" })))));
};
