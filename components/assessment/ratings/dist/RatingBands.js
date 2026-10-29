"use client";
"use strict";
exports.__esModule = true;
exports.RatingBands = void 0;
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var ratings_1 = require("@/data/ratings");
var Heading_1 = require("@/components/assessment/ratings/shared/Heading");
var bandIcons = [
    lucide_react_1.Award,
    lucide_react_1.Sparkles,
    lucide_react_1.CheckCircle2,
    lucide_react_1.Gauge,
    lucide_react_1.CircleHelp,
];
var bandRanges = [
    { start: 90, end: 100 },
    { start: 80, end: 90 },
    { start: 70, end: 80 },
    { start: 60, end: 70 },
    { start: 0, end: 60 },
];
var ease = [0.22, 1, 0.36, 1];
function formatRange(start, end) {
    if (start === 90)
        return "90–100%";
    if (start === 0)
        return "Below 60%";
    return start + "\u2013<" + end + "%";
}
exports.RatingBands = function (_a) {
    var _b = _a.showDescriptions, showDescriptions = _b === void 0 ? true : _b, _c = _a.compact, compact = _c === void 0 ? false : _c, _d = _a.className, className = _d === void 0 ? "" : _d;
    var shouldReduceMotion = framer_motion_1.useReducedMotion();
    var reduceMotion = shouldReduceMotion !== null && shouldReduceMotion !== void 0 ? shouldReduceMotion : false;
    return (React.createElement("section", { id: "rating-bands", "aria-labelledby": "rating-bands-heading", className: "mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:px-10 " + className },
        React.createElement(Heading_1.SectionHeading, { eyebrow: "Assessment guide", title: "Understanding the rating scale", description: "Every approved score tells part of the story. Use these five performance bands as a consistent reference when reviewing assessment results." }),
        React.createElement("div", { className: "mt-8 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm sm:mt-10 sm:rounded-3xl" },
            React.createElement("div", { className: "flex flex-col gap-4 border-b border-slate-100 bg-gradient-to-br from-[#F7F9FC] via-white to-[#F0F9FD] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5 lg:px-7" },
                React.createElement("div", { className: "flex min-w-0 items-start gap-3" },
                    React.createElement("div", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0C2340] text-white shadow-sm" },
                        React.createElement(lucide_react_1.ShieldCheck, { size: 21, "aria-hidden": "true" })),
                    React.createElement("div", { className: "min-w-0" },
                        React.createElement("h3", { className: "text-sm font-bold leading-6 tracking-tight text-[#0C2340] sm:text-base" }, "The performance framework"),
                        React.createElement("p", { className: "mt-1 max-w-xl text-sm leading-6 text-slate-500" }, "Five score ranges. One consistent approach to assessment."))),
                React.createElement("div", { className: "flex w-fit max-w-full items-center gap-2 rounded-full border border-[#00A3E0]/20 bg-white px-3 py-2 text-xs font-semibold leading-5 text-[#0C2340] shadow-sm sm:shrink-0 sm:px-3.5" },
                    React.createElement("span", { className: "h-2 w-2 shrink-0 rounded-full bg-[#00A3E0]", "aria-hidden": "true" }),
                    "Percentage-based ratings")),
            React.createElement("div", { className: "grid grid-cols-1 gap-4 p-3 sm:grid-cols-2 sm:gap-4 sm:p-5 lg:gap-5 lg:p-6 " + (compact
                    ? "xl:grid-cols-5"
                    : "lg:grid-cols-3") }, ratings_1.ratingBands.map(function (band, index) {
                var _a;
                var Icon = (_a = bandIcons[index]) !== null && _a !== void 0 ? _a : lucide_react_1.CircleHelp;
                var range = bandRanges[index];
                var rangeLabel = range
                    ? formatRange(range.start, range.end)
                    : "Range unavailable";
                return (React.createElement(framer_motion_1.motion.article, { key: band.label, initial: reduceMotion ? false : { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 }, transition: {
                        duration: reduceMotion ? 0 : 0.35,
                        delay: reduceMotion ? 0 : index * 0.055,
                        ease: ease
                    }, whileHover: reduceMotion ? undefined : { y: -3 }, className: "group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-[border-color,box-shadow] duration-300 motion-safe:hover:border-slate-300 motion-safe:hover:shadow-[0_12px_32px_rgba(12,35,64,0.08)]" },
                    React.createElement("div", { className: "h-1 w-full shrink-0", style: { backgroundColor: band.color }, "aria-hidden": "true" }),
                    React.createElement("div", { className: "flex h-full min-w-0 flex-col " + (compact ? "p-4" : "p-4 sm:p-5") },
                        React.createElement("div", { className: "flex min-w-0 items-start justify-between gap-3" },
                            React.createElement("div", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset ring-black/[0.03] transition-transform duration-300 motion-safe:group-hover:scale-105 sm:h-12 sm:w-12 sm:rounded-2xl", style: {
                                    color: band.color,
                                    backgroundColor: band.background
                                } },
                                React.createElement(Icon, { size: 22, strokeWidth: 1.8, "aria-hidden": "true" })),
                            React.createElement("span", { className: "inline-flex max-w-[65%] min-w-0 items-center justify-center rounded-full px-2.5 py-1.5 text-right text-[11px] font-bold leading-4 tabular-nums sm:px-3 sm:text-xs", style: {
                                    color: band.color,
                                    backgroundColor: band.background
                                } }, rangeLabel)),
                        React.createElement("div", { className: "mt-5 flex-1" },
                            React.createElement("p", { className: "mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400" },
                                "Level ",
                                String(index + 1).padStart(2, "0")),
                            React.createElement("h3", { className: "break-words text-lg font-bold leading-snug tracking-tight [overflow-wrap:anywhere]", style: { color: band.color } }, band.label),
                            showDescriptions && (React.createElement("p", { className: "mt-2 break-words text-sm leading-6 text-slate-600 [overflow-wrap:anywhere]" }, band.description))),
                        React.createElement("div", { className: "mt-5 border-t border-slate-100 pt-4" },
                            React.createElement("div", { className: "flex items-start justify-between gap-3" },
                                React.createElement("span", { className: "text-xs leading-5 font-medium text-slate-500" }, "Score range"),
                                React.createElement("span", { className: "text-right text-xs leading-5 font-bold tabular-nums", style: { color: band.color } }, range
                                    ? range.start + "\u2013" + range.end + "%"
                                    : "—")),
                            React.createElement("div", { className: "relative mt-3 h-2 overflow-hidden rounded-full bg-slate-100", role: "img", "aria-label": band.label + ": " + rangeLabel + " on a 0 to 100 percent scale" }, range && (React.createElement(framer_motion_1.motion.div, { initial: reduceMotion ? false : { width: 0 }, whileInView: {
                                    width: range.end - range.start + "%"
                                }, viewport: { once: true }, transition: {
                                    duration: reduceMotion ? 0 : 0.65,
                                    delay: reduceMotion ? 0 : index * 0.055,
                                    ease: "easeOut"
                                }, className: "absolute inset-y-0 rounded-full", style: {
                                    left: range.start + "%",
                                    backgroundColor: band.color
                                } }))),
                            React.createElement("div", { className: "mt-1.5 flex justify-between text-[10px] font-medium tabular-nums text-slate-400" },
                                React.createElement("span", null, "0%"),
                                React.createElement("span", null, "50%"),
                                React.createElement("span", null, "100%"))))));
            }))),
        React.createElement(framer_motion_1.motion.aside, { initial: reduceMotion ? false : { opacity: 0, y: 8 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: {
                duration: reduceMotion ? 0 : 0.35,
                ease: ease
            }, className: "relative mt-5 overflow-hidden rounded-2xl border border-[#00A3E0]/20 bg-[#F0F9FD] sm:mt-6", "aria-labelledby": "rating-guidance-heading" },
            React.createElement("div", { className: "absolute bottom-0 left-0 top-0 w-1 bg-[#00A3E0]", "aria-hidden": "true" }),
            React.createElement("div", { className: "flex items-start gap-3 p-4 sm:gap-4 sm:p-6" },
                React.createElement("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#00A3E0]/10 bg-white text-[#0087BD] shadow-sm sm:h-11 sm:w-11" },
                    React.createElement(lucide_react_1.CircleHelp, { size: 21, "aria-hidden": "true" })),
                React.createElement("div", { className: "min-w-0" },
                    React.createElement("h3", { id: "rating-guidance-heading", className: "break-words text-sm font-bold leading-6 tracking-tight text-[#0C2340] sm:text-base" }, "A score is a starting point, not the whole story."),
                    React.createElement("p", { className: "mt-2 max-w-3xl text-sm leading-6 text-slate-600" }, "A rating band describes the score; it does not replace the assessor's feedback. Consider the assessment notes, supporting observations, and approved improvement actions alongside the percentage to understand what is working well and what needs attention."))))));
};
