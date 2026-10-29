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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.RatingsPageClient = void 0;
var react_1 = require("react");
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
var normalizeStatus = function (status) {
    var _a;
    switch (status === null || status === void 0 ? void 0 : status.toUpperCase()) {
        case "PUBLISHED":
            return "published";
        case "APPROVED":
            return "approved";
        case "PENDING_REVIEW":
            return "pending-review";
        case "DRAFT":
            return "draft";
        default:
            return (_a = status === null || status === void 0 ? void 0 : status.toLowerCase()) !== null && _a !== void 0 ? _a : "";
    }
};
var normalizeVisibility = function (visibility) {
    var _a;
    return (_a = visibility === null || visibility === void 0 ? void 0 : visibility.toLowerCase()) !== null && _a !== void 0 ? _a : "";
};
var normalizeReport = function (report) {
    var _a;
    return __assign(__assign({}, report), { id: (_a = report.id) !== null && _a !== void 0 ? _a : report._id, status: normalizeStatus(report.status), visibility: normalizeVisibility(report.visibility) });
};
exports.RatingsPageClient = function (_a) {
    var initialReports = _a.reports, initialLoading = _a.loading, _b = _a.isLeadershipView, isLeadershipView = _b === void 0 ? false : _b;
    var _c = react_1.useState(initialReports !== null && initialReports !== void 0 ? initialReports : []), apiReports = _c[0], setApiReports = _c[1];
    var _d = react_1.useState(initialLoading !== null && initialLoading !== void 0 ? initialLoading : !initialReports), isLoading = _d[0], setIsLoading = _d[1];
    var _e = react_1.useState(null), loadError = _e[0], setLoadError = _e[1];
    var _f = react_1.useState(null), selectedReport = _f[0], setSelectedReport = _f[1];
    var _g = react_1.useState(false), reportDialogOpen = _g[0], setReportDialogOpen = _g[1];
    var _h = react_1.useState("all"), selectedService = _h[0], setSelectedService = _h[1];
    react_1.useEffect(function () {
        var controller = new AbortController();
        var loadReports = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, data, normalizedReports, error_1;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        setIsLoading(true);
                        setLoadError(null);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, 5, 6]);
                        return [4 /*yield*/, fetch("/api/ratings", {
                                method: "GET",
                                credentials: "same-origin",
                                cache: "no-store",
                                signal: controller.signal,
                                headers: {
                                    Accept: "application/json"
                                }
                            })];
                    case 2:
                        response = _c.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = (_c.sent());
                        if (!response.ok) {
                            throw new Error((_a = data.error) !== null && _a !== void 0 ? _a : "Unable to load ratings and reports.");
                        }
                        normalizedReports = ((_b = data.reports) !== null && _b !== void 0 ? _b : []).map(normalizeReport);
                        setApiReports(normalizedReports);
                        return [3 /*break*/, 6];
                    case 4:
                        error_1 = _c.sent();
                        if (error_1 instanceof Error && error_1.name === "AbortError") {
                            return [2 /*return*/];
                        }
                        console.error("Unable to load ratings:", error_1);
                        setLoadError(error_1 instanceof Error
                            ? error_1.message
                            : "Unable to load ratings and reports.");
                        return [3 /*break*/, 6];
                    case 5:
                        if (!controller.signal.aborted) {
                            setIsLoading(false);
                        }
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        void loadReports();
        return function () { return controller.abort(); };
    }, []);
    // Only use development fixtures when they are explicitly supplied by a
    // development-only parent. Production API failures must not show fake data.
    var reports = apiReports;
    var checklistReports = [];
    var checklistReportsLoading = false;
    var handleViewChecklistReport = react_1.useCallback(function (report) {
        // Connect this to a checklist report detail dialog when available.
        console.info("Selected checklist report:", report.id);
    }, []);
    var visibleReports = react_1.useMemo(function () {
        return reports.filter(function (report) {
            if (isLeadershipView) {
                return true;
            }
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
            .map(function (report) { var _a; return (_a = report.summary) === null || _a === void 0 ? void 0 : _a.approvedAverageRating; })
            .filter(function (score) {
            return typeof score === "number" &&
                Number.isFinite(score) &&
                score >= 0 &&
                score <= 100;
        });
        var completionValues = publicReports
            .map(function (report) { var _a; return (_a = report.summary) === null || _a === void 0 ? void 0 : _a.checklistCompletionPercentage; })
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
        loadError && (React.createElement("div", { role: "alert", className: "mx-auto my-6 max-w-7xl px-5 sm:px-8 lg:px-10" },
            React.createElement("div", { className: "rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" },
                React.createElement("p", { className: "font-semibold" }, "Unable to load reports"),
                React.createElement("p", { className: "mt-1" }, loadError),
                React.createElement("button", { type: "button", onClick: function () { return window.location.reload(); }, className: "mt-3 font-semibold underline underline-offset-4" }, "Try again")))),
        React.createElement(ChecklistReports_1.ChecklistReports, { reports: checklistReports, loading: checklistReportsLoading, onViewReport: handleViewChecklistReport }),
        React.createElement(ServiceReportCards_1.ServiceReportCards, { reportCounts: serviceReportCounts, onSelectService: handleSelectService }),
        React.createElement(ReportHistory_1.ReportHistory, { reports: serviceFilteredReports, loading: isLoading, onViewReport: handleViewReport, publicOnly: !isLeadershipView, title: isLeadershipView
                ? "Reports and review queue"
                : "Published report history", description: isLeadershipView
                ? "Review available reports and open individual records."
                : "Browse approved reports made available for the church community." }),
        selectedService !== "all" && (React.createElement("div", { className: "mx-auto -mt-8 max-w-7xl px-5 sm:px-8 lg:px-10" },
            React.createElement("button", { type: "button", onClick: function () { return setSelectedService("all"); }, className: "min-h-10 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#0C2340] transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0]" }, "Show all services"))),
        React.createElement(RatingBands_1.RatingBands, null),
        React.createElement(SpecialProgrammes_1.SpecialProgrammes, null),
        React.createElement(ReportArchive_1.ReportArchive, { reports: isLeadershipView ? leadershipReports : publicReports, loading: isLoading, onViewReport: handleViewArchiveReport, publicOnly: !isLeadershipView }),
        isLeadershipView && (React.createElement(ReviewQueue_1.ReviewQueue, { reports: reports, loading: isLoading, onViewReport: handleViewReport })),
        React.createElement(ratings_detail_dialog_1["default"], { report: selectedReport, open: reportDialogOpen, onClose: handleCloseReport, publicOnly: !isLeadershipView })));
};
