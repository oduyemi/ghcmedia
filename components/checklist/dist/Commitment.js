"use client";
"use strict";
exports.__esModule = true;
exports.Commitment = void 0;
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var commitments = [
    {
        icon: lucide_react_1.Lightbulb,
        number: "01",
        title: "Learn from experience",
        description: "Use recorded observations and constructive feedback to identify gaps, learn from each service, and improve future preparation.",
        accent: "bg-[#FFC72C]/15 text-[#987000]",
        iconBorder: "border-[#FFC72C]/20"
    },
    {
        icon: lucide_react_1.Users,
        number: "02",
        title: "Strengthen teamwork",
        description: "Encourage shared responsibility, clear communication, and dependable collaboration so every team member can contribute confidently.",
        accent: "bg-[#00A3E0]/10 text-[#007FAF]",
        iconBorder: "border-[#00A3E0]/15"
    },
    {
        icon: lucide_react_1.ShieldCheck,
        number: "03",
        title: "Serve responsibly",
        description: "Keep accurate records, respect confidentiality, and handle church resources with care, integrity, and accountability.",
        accent: "bg-[#00A859]/10 text-[#008747]",
        iconBorder: "border-[#00A859]/15"
    },
];
exports.Commitment = function () {
    var shouldReduceMotion = framer_motion_1.useReducedMotion();
    return (React.createElement("section", { "aria-labelledby": "commitment-heading", className: "relative isolate overflow-hidden py-14 sm:py-20 lg:py-24" },
        React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute -left-40 top-12 -z-10 h-80 w-80 rounded-full bg-[#41B6E6]/[0.08] blur-3xl" }),
        React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none absolute -right-40 bottom-0 -z-10 h-80 w-80 rounded-full bg-[#FFC72C]/[0.06] blur-3xl" }),
        React.createElement("div", { className: "mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 xl:px-12" },
            React.createElement("div", { className: "grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 xl:gap-20" },
                React.createElement(framer_motion_1.motion.div, { initial: shouldReduceMotion ? false : { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.25 }, transition: { duration: 0.5, ease: "easeOut" }, className: "flex flex-col items-start lg:sticky lg:top-24 lg:self-start" },
                    React.createElement("div", { className: "relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[#00A3E0]/15 bg-gradient-to-br from-[#00A3E0]/15 to-[#41B6E6]/[0.04] text-[#007FAF] shadow-sm" },
                        React.createElement(lucide_react_1.HeartHandshake, { className: "h-7 w-7", strokeWidth: 1.7 }),
                        React.createElement("span", { className: "absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-[3px] border-white bg-[#FFC72C]" })),
                    React.createElement("p", { className: "mt-7 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#007FAF]" }, "Our commitment"),
                    React.createElement("h2", { id: "commitment-heading", className: "mt-4 max-w-lg text-3xl font-bold leading-[1.15] tracking-tight text-[#0C2340] sm:text-4xl lg:text-[2.75rem]" },
                        "Excellence is a practice we",
                        " ",
                        React.createElement("span", { className: "relative inline-block" },
                            "build together.",
                            React.createElement("span", { "aria-hidden": "true", className: "absolute -bottom-1 left-0 -z-10 h-2 w-full rounded-full bg-[#FFC72C]/45" }))),
                    React.createElement("p", { className: "mt-5 max-w-lg text-sm leading-7 text-slate-600 sm:text-base sm:leading-8" }, "Every service gives us another opportunity to grow. By documenting our work, learning from experience, and supporting one another, we can build a culture where preparation and excellence become part of how we serve."),
                    React.createElement("div", { className: "mt-7 flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-[0_4px_20px_rgba(12,35,64,0.03)]" },
                        React.createElement("div", { className: "flex -space-x-2", "aria-hidden": "true" },
                            React.createElement("span", { className: "flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#0C2340] text-white" },
                                React.createElement(lucide_react_1.Users, { className: "h-4 w-4" })),
                            React.createElement("span", { className: "flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#00A3E0] text-white" },
                                React.createElement(lucide_react_1.HeartHandshake, { className: "h-4 w-4" })),
                            React.createElement("span", { className: "flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#FFC72C] text-[#0C2340]" },
                                React.createElement(lucide_react_1.Lightbulb, { className: "h-4 w-4" }))),
                        React.createElement("div", null,
                            React.createElement("p", { className: "text-xs font-bold text-[#0C2340]" }, "One team. Shared purpose."),
                            React.createElement("p", { className: "mt-0.5 text-xs leading-5 text-slate-500" }, "Growing through service and feedback.")))),
                React.createElement("div", { className: "space-y-4 sm:space-y-5" }, commitments.map(function (item, index) {
                    var Icon = item.icon;
                    return (React.createElement(framer_motion_1.motion.article, { key: item.title, initial: shouldReduceMotion ? false : { opacity: 0, x: 18 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true, amount: 0.25 }, transition: {
                            duration: 0.45,
                            delay: shouldReduceMotion ? 0 : index * 0.1,
                            ease: "easeOut"
                        }, whileHover: shouldReduceMotion ? undefined : { y: -3 }, className: "group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-[0_4px_18px_rgba(12,35,64,0.025)] transition-[border-color,box-shadow] duration-300 hover:border-[#00A3E0]/30 hover:shadow-[0_14px_35px_rgba(12,35,64,0.07)] sm:p-6 lg:p-7" },
                        React.createElement("span", { "aria-hidden": "true", className: "absolute inset-y-0 left-0 w-1 origin-bottom scale-y-0 bg-gradient-to-b from-[#00A3E0] to-[#41B6E6] transition-transform duration-300 group-hover:scale-y-100" }),
                        React.createElement("div", { className: "flex items-start gap-4 sm:gap-5" },
                            React.createElement("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border " + item.iconBorder + " " + item.accent + " transition-transform duration-300 group-hover:scale-105" },
                                React.createElement(Icon, { className: "h-5 w-5", strokeWidth: 1.8 })),
                            React.createElement("div", { className: "min-w-0 flex-1" },
                                React.createElement("div", { className: "flex items-start justify-between gap-3" },
                                    React.createElement("div", null,
                                        React.createElement("p", { className: "text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400" },
                                            "Commitment ",
                                            item.number),
                                        React.createElement("h3", { className: "mt-1.5 text-base font-bold tracking-tight text-[#0C2340] sm:text-lg" }, item.title)),
                                    React.createElement("span", { className: "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-all duration-300 group-hover:border-[#00A3E0]/20 group-hover:bg-[#00A3E0]/[0.06] group-hover:text-[#007FAF]" },
                                        React.createElement(lucide_react_1.ArrowUpRight, { className: "h-4 w-4", strokeWidth: 1.8 }))),
                                React.createElement("p", { className: "mt-2.5 text-sm leading-6 text-slate-500 sm:leading-7" }, item.description)))));
                }))))));
};
