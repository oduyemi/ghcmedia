"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var checklist_1 = require("@/components/checklist");
exports.metadata = {
    title: "Service Checklists & Reports | Global Harvest Church",
    description: "Review Media Team service checklist records, monitor completion, and improve service preparation at Global Harvest Church Maryland, Lagos.",
    robots: {
        index: false,
        follow: false
    }
};
function ChecklistPage() {
    return (React.createElement("main", { className: "min-h-screen overflow-x-clip bg-[#F7F9FC]" },
        React.createElement(checklist_1.ChecklistHero, null),
        React.createElement("div", { className: "mx-auto w-full max-w-7xl space-y-10 px-4 py-8 sm:space-y-12 sm:px-6 sm:py-12 lg:space-y-14 lg:px-8 lg:py-16" },
            React.createElement(checklist_1.ChecklistExplorer, null)),
        React.createElement("div", { className: "border-t border-slate-200" },
            React.createElement("div", { className: "mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14" },
                React.createElement(checklist_1.Commitment, null)))));
}
exports["default"] = ChecklistPage;
