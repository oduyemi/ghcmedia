"use client";
"use strict";
exports.__esModule = true;
exports.RatingsPageClient = void 0;
var react_1 = require("react");
var ratings_1 = require("@/data/ratings");
var Hero_1 = require("@/components/assessment/ratings/Hero");
var Overview_1 = require("@/components/assessment/ratings/Overview");
var ServiceReportCards_1 = require("@/components/assessment/ratings/ServiceReportCards");
var ReportHistory_1 = require("@/components/assessment/ratings/ReportHistory");
var ReportArchive_1 = require("@/components/assessment/ratings/ReportArchive");
var RatingBands_1 = require("@/components/assessment/ratings/RatingBands");
var SpecialProgrammes_1 = require("@/components/assessment/ratings/SpecialProgrammes");
var ratings_detail_dialog_1 = require("@/dialogs/ratings-detail-dialog");
var ReviewQueue_1 = require("./ReviewQueue");
var ChecklistReports_1 = require("@/components/assessment/ratings/ChecklistReports");
exports.RatingsPageClient = function (_a) {
    var _b = _a.reports, reports = _b === void 0 ? ratings_1.developmentReports : _b, _c = _a.loading, loading = _c === void 0 ? false : _c, _d = _a.isLeadershipView, isLeadershipView = _d === void 0 ? false : _d;
    var _e = react_1.useState(null), selectedReport = _e[0], setSelectedReport = _e[1];
    var _f = react_1.useState(false), reportDialogOpen = _f[0], setReportDialogOpen = _f[1];
    var _g = react_1.useState("all"), selectedService = _g[0], setSelectedService = _g[1];
    var checklistReports = [];
    var checklistReportsLoading = false;
    var handleViewChecklistReport = react_1.useCallback(function (report) {
        // Connect this to a checklist report detail dialog when available.
        console.info("Selected checklist report:", report.id);
    }, []);
    var visibleReports = react_1.useMemo(function () {
        return reports.filter(function (report) {
            if (isLeadershipView)
                return true;
            return (report.status === "published" &&
                report.visibility === "public");
        });
    }, [reports, isLeadershipView]);
    var publicReports = react_1.useMemo(function () {
        return visibleReports.filter(function (report) {
            return report.status === "published" &&
                report.visibility === "public";
        });
    }, [visibleReports]);
    var serviceReportCounts = react_1.useMemo(function () {
        var counts = {};
        publicReports.forEach(function (report) {
            var _a;
            if (!report.serviceType)
                return;
            counts[report.serviceType] =
                ((_a = counts[report.serviceType]) !== null && _a !== void 0 ? _a : 0) + 1;
        });
        return counts;
    }, [publicReports]);
    var overview = react_1.useMemo(function () {
        var approvedScores = publicReports
            .map(function (report) { return report.summary.approvedAverageRating; })
            .filter(function (score) {
            return typeof score === "number" &&
                Number.isFinite(score) &&
                score >= 0 &&
                score <= 100;
        });
        var completionValues = publicReports
            .map(function (report) { return report.summary.checklistCompletionPercentage; })
            .filter(function (value) {
            return typeof value === "number" &&
                Number.isFinite(value) &&
                value >= 0 &&
                value <= 100;
        });
        var averageRating = approvedScores.length > 0
            ? approvedScores.reduce(function (sum, score) { return sum + score; }, 0) /
                approvedScores.length
            : null;
        var checklistCompletion = completionValues.length > 0
            ? completionValues.reduce(function (sum, value) { return sum + value; }, 0) /
                completionValues.length
            : null;
        return {
            approvedAverageRating: averageRating,
            checklistCompletionPercentage: checklistCompletion,
            servicesAssessed: publicReports.length,
            areasForImprovement: null,
            outstandingReviews: isLeadershipView
                ? reports.filter(function (report) {
                    return report.status === "draft" ||
                        report.status === "pending-review";
                }).length
                : null
        };
    }, [publicReports, reports, isLeadershipView]);
    var handleViewReport = react_1.useCallback(function (report) {
        setSelectedReport(report);
        setReportDialogOpen(true);
    }, []);
    var handleCloseReport = react_1.useCallback(function () {
        setReportDialogOpen(false);
        setSelectedReport(null);
    }, []);
    var handleSelectService = react_1.useCallback(function (service) {
        var _a;
        setSelectedService(service);
        if (typeof document !== "undefined") {
            (_a = document
                .getElementById("report-history")) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, []);
    var handleViewArchiveReport = react_1.useCallback(function (report) {
        handleViewReport(report);
    }, [handleViewReport]);
    var serviceFilteredReports = react_1.useMemo(function () {
        if (selectedService === "all")
            return visibleReports;
        return visibleReports.filter(function (report) { return report.serviceType === selectedService; });
    }, [visibleReports, selectedService]);
    var leadershipReports = react_1.useMemo(function () {
        if (!isLeadershipView)
            return publicReports;
        return visibleReports.filter(function (report) {
            return report.status === "draft" ||
                report.status === "pending-review" ||
                (report.status === "approved" &&
                    report.visibility !== "public");
        });
    }, [isLeadershipView, publicReports, visibleReports]);
    return (React.createElement("main", { className: "min-h-screen bg-[#F7F9FC]" },
        React.createElement(Hero_1.RatingsHero, null),
        React.createElement(Overview_1.RatingsOverview, { approvedAverageRating: overview.approvedAverageRating, servicesAssessed: overview.servicesAssessed, checklistCompletion: overview.checklistCompletionPercentage, areasForImprovement: overview.areasForImprovement, outstandingReviews: overview.outstandingReviews }),
        React.createElement(ChecklistReports_1.ChecklistReports, { reports: checklistReports, loading: checklistReportsLoading, onViewReport: handleViewChecklistReport }),
        React.createElement(ServiceReportCards_1.ServiceReportCards, { reportCounts: serviceReportCounts, onSelectService: handleSelectService }),
        React.createElement(ReportHistory_1.ReportHistory, { reports: serviceFilteredReports, loading: loading, onViewReport: handleViewReport, publicOnly: !isLeadershipView, title: isLeadershipView
                ? "Reports and review queue"
                : "Published report history", description: isLeadershipView
                ? "Review available reports and open individual records."
                : "Browse approved reports made available for the church community." }),
        selectedService !== "all" && (React.createElement("div", { className: "mx-auto -mt-8 max-w-7xl px-5 sm:px-8 lg:px-10" },
            React.createElement("button", { type: "button", onClick: function () { return setSelectedService("all"); }, className: "min-h-10 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#0C2340] transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0]" }, "Show all services"))),
        React.createElement(RatingBands_1.RatingBands, null),
        React.createElement(SpecialProgrammes_1.SpecialProgrammes, null),
        React.createElement(ReportArchive_1.ReportArchive, { reports: isLeadershipView ? leadershipReports : publicReports, loading: loading, onViewReport: handleViewArchiveReport, publicOnly: !isLeadershipView }),
        isLeadershipView && (React.createElement(ReviewQueue_1.ReviewQueue, { reports: reports, loading: loading, onViewReport: handleViewReport })),
        React.createElement(ratings_detail_dialog_1["default"], { report: selectedReport, open: reportDialogOpen, onClose: handleCloseReport, publicOnly: !isLeadershipView })));
};
