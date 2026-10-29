"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var guidelines_1 = require("@/data/guidelines");
var Hero_1 = require("@/components/assessment/guidelines/Hero");
var Overview_1 = require("@/components/assessment/guidelines/Overview");
var index_1 = require("@/components/assessment/guidelines/index");
var CallOut_1 = require("@/components/assessment/guidelines/CallOut");
var Checklist_1 = require("@/components/assessment/guidelines/Checklist");
exports.metadata = {
    title: "Assessment Guidelines | Global Harvest Church Media",
    description: "Learn about the assessment process, submission requirements, evaluation standards, and preparation steps for the Global Harvest Church Media Team.",
    robots: {
        index: false,
        follow: false
    }
};
function AssessmentGuidelines() {
    return (React.createElement("main", { className: "min-h-screen overflow-x-clip bg-[#F7F9FC]" },
        React.createElement(Hero_1.GuidelinesHero, null),
        React.createElement("div", { className: "mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8" },
            React.createElement(Overview_1.GuidelinesOverview, null),
            React.createElement("section", { id: "guidelines", "aria-label": "Assessment guideline sections", className: "rounded-2xl border border-slate-200/80 bg-white/60 px-4 py-6 shadow-[0_24px_70px_-55px_rgba(12,35,64,0.4)] sm:rounded-[24px] sm:px-7 sm:py-8 lg:px-10 lg:py-10" },
                React.createElement("div", { className: "mb-8 border-b border-slate-200/80 pb-6" },
                    React.createElement("p", { className: "text-[10px] font-bold uppercase tracking-[0.18em] text-[#007FAF] sm:text-xs" }, "Please read carefully"),
                    React.createElement("h2", { className: "mt-2 text-2xl font-bold tracking-tight text-[#0C2340] sm:text-3xl" }, "The assessment process"),
                    React.createElement("p", { className: "mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base" }, "Review each section before beginning your assessment. Your assigned task instructions take precedence for role-specific requirements, deliverables, and deadlines.")),
                guidelines_1.guidelineSections.map(function (section) { return (React.createElement(index_1.Guidelines, { key: section.number, section: section })); })),
            React.createElement("div", { className: "mt-6 sm:mt-8" },
                React.createElement(CallOut_1.GuidelinesCallout, null)),
            React.createElement("div", { className: "my-6 sm:my-8" },
                React.createElement(Checklist_1.GuidelinesChecklist, { assessmentHref: "/portal" })))));
}
exports["default"] = AssessmentGuidelines;
