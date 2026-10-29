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
exports.GuidelinesOverview = void 0;
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var highlights = [
    {
        icon: lucide_react_1.Target,
        number: "01",
        eyebrow: "Clarity first",
        title: "Know the standard",
        description: "Understand your responsibilities, what good work looks like, and how your contribution will be reviewed.",
        accent: "#00A3E0",
        iconBg: "bg-[#00A3E0]/10",
        iconColor: "text-[#007FAF]"
    },
    {
        icon: lucide_react_1.CheckCircle2,
        number: "02",
        eyebrow: "Show up prepared",
        title: "Prepare with care",
        description: "Follow the instructions, pay attention to the details, and submit work that reflects your best effort.",
        accent: "#00A859",
        iconBg: "bg-[#00A859]/10",
        iconColor: "text-[#00864A]"
    },
    {
        icon: lucide_react_1.Heart,
        number: "03",
        eyebrow: "Keep growing",
        title: "Grow through feedback",
        description: "Receive feedback with an open mind, strengthen your skills, and turn every experience into an opportunity to serve better.",
        accent: "#E87722",
        iconBg: "bg-[#E87722]/10",
        iconColor: "text-[#C65D13]"
    },
];
exports.GuidelinesOverview = function () {
    var shouldReduceMotion = framer_motion_1.useReducedMotion();
    var reveal = {
        initial: shouldReduceMotion
            ? false
            : { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.45, ease: "easeOut" }
    };
    return (React.createElement("section", { "aria-labelledby": "overview-title", className: "relative isolate overflow-hidden px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-24 xl:px-16" },
        React.createElement("div", { className: "grid gap-6 sm:gap-8 lg:grid-cols-2 lg:items-end lg:gap-16" },
            React.createElement(framer_motion_1.motion.div, __assign({}, reveal, { className: "min-w-0" }),
                React.createElement("span", { className: "inline-flex items-center gap-2 rounded-full border border-[#00A3E0]/20 bg-[#00A3E0]/[0.06] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#007FAF] sm:text-xs" },
                    React.createElement("span", { "aria-hidden": "true", className: "h-1.5 w-1.5 rounded-full bg-[#00A3E0]" }),
                    "The foundation"),
                React.createElement("h2", { id: "overview-title", className: "mt-5 max-w-[15ch] text-[clamp(2rem,6vw,3.5rem)] font-extrabold leading-[1.1] tracking-[-0.045em] text-[#0C2340] [overflow-wrap:anywhere]" },
                    "Excellence isn't just what we do.",
                    React.createElement("span", { className: "mt-1 block text-[#008DBF]" }, "It's how we grow."))),
            React.createElement(framer_motion_1.motion.div, __assign({}, reveal, { transition: __assign(__assign({}, reveal.transition), { delay: shouldReduceMotion ? 0 : 0.08 }), className: "min-w-0 lg:pb-1" }),
                React.createElement("p", { className: "max-w-[65ch] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:ml-auto" }, "The Media Team helps communicate the message of the Gospel, document the life of our church, and create meaningful media experiences that serve our congregation and reach beyond our walls. Our assessment process gives every team member an opportunity to demonstrate their skills, receive constructive feedback, and discover new ways to grow."))),
        React.createElement(framer_motion_1.motion.div, { initial: shouldReduceMotion ? false : { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.45, ease: "easeOut" }, className: "relative mt-8 overflow-hidden rounded-2xl border border-[#0C2340]/[0.07] bg-[#F2F8FC] p-5 sm:mt-12 sm:rounded-[24px] sm:p-7 lg:p-9" },
            React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full border border-[#41B6E6]/20" }),
            React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-[#41B6E6]/10 blur-2xl" }),
            React.createElement("div", { className: "relative flex flex-col items-start gap-4 sm:flex-row sm:items-start sm:gap-5 lg:gap-6" },
                React.createElement("div", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0C2340] text-[#7DD3FC] shadow-md shadow-[#0C2340]/10 sm:h-12 sm:w-12 sm:rounded-2xl" },
                    React.createElement(lucide_react_1.Heart, { className: "h-5 w-5", "aria-hidden": "true" })),
                React.createElement("div", { className: "min-w-0 max-w-3xl" },
                    React.createElement("p", { className: "text-[10px] font-bold uppercase tracking-[0.16em] text-[#007FAF] sm:text-xs" }, "One team. One purpose."),
                    React.createElement("p", { className: "mt-2 text-sm font-semibold leading-7 text-[#0C2340] sm:text-base sm:leading-8" }, "We assess to encourage growth, build consistency, and help every team member serve with greater confidence\u2014not simply to point out what needs improvement.")))),
        React.createElement("div", { className: "mt-12 flex flex-col gap-3 sm:mt-16 sm:flex-row sm:items-end sm:justify-between sm:gap-6" },
            React.createElement("div", { className: "min-w-0" },
                React.createElement("p", { className: "text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 sm:text-xs" }, "Your assessment mindset"),
                React.createElement("h3", { className: "mt-2 max-w-[25ch] text-2xl font-extrabold leading-tight tracking-[-0.035em] text-[#0C2340] sm:text-3xl" }, "Three principles to keep in mind")),
            React.createElement("p", { className: "text-sm leading-6 text-slate-500 sm:shrink-0 sm:pb-1" }, "Small habits. Meaningful impact.")),
        React.createElement("div", { className: "mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3" }, highlights.map(function (_a, index) {
            var Icon = _a.icon, number = _a.number, eyebrow = _a.eyebrow, title = _a.title, description = _a.description, accent = _a.accent, iconBg = _a.iconBg, iconColor = _a.iconColor;
            return (React.createElement(framer_motion_1.motion.article, { key: title, initial: shouldReduceMotion ? false : { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 }, transition: {
                    duration: 0.4,
                    delay: shouldReduceMotion ? 0 : index * 0.08
                }, whileHover: shouldReduceMotion
                    ? undefined
                    : { y: -4, transition: { duration: 0.2 } }, className: "group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_-24px_rgba(12,35,64,0.3)] transition-[border-color,box-shadow] duration-300 hover:border-slate-300 hover:shadow-[0_20px_40px_-28px_rgba(12,35,64,0.3)] sm:p-6 lg:rounded-[24px] lg:p-7" },
                React.createElement("div", { "aria-hidden": "true", className: "absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none", style: { backgroundColor: accent } }),
                React.createElement("div", { className: "flex items-center justify-between gap-4" },
                    React.createElement("span", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl " + iconBg + " " + iconColor + " transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none sm:h-12 sm:w-12 sm:rounded-2xl" },
                        React.createElement(Icon, { className: "h-5 w-5", strokeWidth: 1.9, "aria-hidden": "true" })),
                    React.createElement("span", { className: "font-mono text-xs font-semibold tracking-wider text-slate-300" }, number)),
                React.createElement("div", { className: "mt-6 flex flex-1 flex-col" },
                    React.createElement("p", { className: "text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 sm:text-[11px]" }, eyebrow),
                    React.createElement("h4", { className: "mt-2 text-xl font-extrabold leading-snug tracking-[-0.025em] text-[#0C2340] [overflow-wrap:anywhere]" }, title),
                    React.createElement("p", { className: "mt-3 flex-1 text-sm leading-7 text-slate-600" }, description)),
                React.createElement("div", { className: "mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-4" },
                    React.createElement("span", { className: "text-xs font-semibold text-slate-400 transition-colors group-hover:text-[#0C2340]" },
                        "Principle ",
                        number),
                    React.createElement("span", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-colors duration-300 group-hover:bg-[#0C2340] group-hover:text-white", "aria-hidden": "true" },
                        React.createElement(lucide_react_1.ArrowUpRight, { className: "h-4 w-4" })))));
        }))));
};
