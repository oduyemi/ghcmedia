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
var ChecklistReports_1 = require("@/components/assessment/ratings/ChecklistReports");
var ratings_detail_dialog_1 = require("@/dialogs/ratings-detail-dialog");
var login_dialog_1 = require("@/dialogs/login-dialog");
var feedback_dialog_1 = require("@/dialogs/feedback-dialog");
var ReviewQueue_1 = require("./ReviewQueue");
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
var normalizeVisibility = function (visibility) { var _a; return (_a = visibility === null || visibility === void 0 ? void 0 : visibility.toLowerCase()) !== null && _a !== void 0 ? _a : ""; };
var normalizeReport = function (report) {
    var _a;
    return __assign(__assign({}, report), { id: (_a = report.id) !== null && _a !== void 0 ? _a : report._id, status: normalizeStatus(report.status), visibility: normalizeVisibility(report.visibility) });
};
var getErrorMessage = function (error, fallback) {
    return error instanceof Error ? error.message : fallback;
};
exports.RatingsPageClient = function (_a) {
    var _b, _c, _d, _e, _f;
    var initialReports = _a.reports, initialLoading = _a.loading, _g = _a.isLeadershipView, isLeadershipView = _g === void 0 ? false : _g;
    // Authentication
    var _h = react_1.useState(false), sessionChecked = _h[0], setSessionChecked = _h[1];
    var _j = react_1.useState(false), isAuthenticated = _j[0], setIsAuthenticated = _j[1];
    // Ratings state
    var _k = react_1.useState(initialReports !== null && initialReports !== void 0 ? initialReports : []), apiReports = _k[0], setApiReports = _k[1];
    var _l = react_1.useState(initialLoading !== null && initialLoading !== void 0 ? initialLoading : true), isLoading = _l[0], setIsLoading = _l[1];
    var _m = react_1.useState(null), loadError = _m[0], setLoadError = _m[1];
    var _o = react_1.useState(null), apiMetrics = _o[0], setApiMetrics = _o[1];
    var _p = react_1.useState(null), assessmentsCount = _p[0], setAssessmentsCount = _p[1];
    var _q = react_1.useState(0), ratingsRetry = _q[0], setRatingsRetry = _q[1];
    // Checklist state
    var _r = react_1.useState([]), checklistReports = _r[0], setChecklistReports = _r[1];
    var _s = react_1.useState(false), checklistReportsLoading = _s[0], setChecklistReportsLoading = _s[1];
    var _t = react_1.useState(null), checklistLoadError = _t[0], setChecklistLoadError = _t[1];
    var _u = react_1.useState(0), checklistRetry = _u[0], setChecklistRetry = _u[1];
    // Dialog and filter state
    var _v = react_1.useState(null), selectedReport = _v[0], setSelectedReport = _v[1];
    var _w = react_1.useState(false), reportDialogOpen = _w[0], setReportDialogOpen = _w[1];
    var _x = react_1.useState(null), feedbackReport = _x[0], setFeedbackReport = _x[1];
    var _y = react_1.useState("all"), selectedService = _y[0], setSelectedService = _y[1];
    // Verify the current session
    react_1.useEffect(function () {
        var controller = new AbortController();
        var checkSession = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, fetch("/api/auth/me", {
                                method: "GET",
                                credentials: "same-origin",
                                cache: "no-store",
                                signal: controller.signal,
                                headers: { Accept: "application/json" }
                            })];
                    case 1:
                        response = _a.sent();
                        setIsAuthenticated(response.ok);
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _a.sent();
                        if (error_1 instanceof Error && error_1.name === "AbortError") {
                            return [2 /*return*/];
                        }
                        console.error("Unable to verify the current session:", error_1);
                        setIsAuthenticated(false);
                        return [3 /*break*/, 4];
                    case 3:
                        if (!controller.signal.aborted) {
                            setSessionChecked(true);
                        }
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        void checkSession();
        return function () { return controller.abort(); };
    }, []);
    // Load ratings independently
    react_1.useEffect(function () {
        if (!sessionChecked)
            return;
        if (!isAuthenticated) {
            setApiReports([]);
            setApiMetrics(null);
            setAssessmentsCount(null);
            setIsLoading(false);
            setLoadError(null);
            return;
        }
        var controller = new AbortController();
        var loadReports = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, data, error_2;
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        setIsLoading(true);
                        setLoadError(null);
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 4, 5, 6]);
                        return [4 /*yield*/, fetch("/api/ratings", {
                                method: "GET",
                                credentials: "same-origin",
                                cache: "no-store",
                                signal: controller.signal,
                                headers: { Accept: "application/json" }
                            })];
                    case 2:
                        response = _f.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = (_f.sent());
                        if (response.status === 401) {
                            setIsAuthenticated(false);
                            return [2 /*return*/];
                        }
                        if (!response.ok) {
                            throw new Error((_a = data.error) !== null && _a !== void 0 ? _a : "Unable to load ratings and reports.");
                        }
                        setApiReports(((_b = data.reports) !== null && _b !== void 0 ? _b : []).map(normalizeReport));
                        setApiMetrics((_c = data.metrics) !== null && _c !== void 0 ? _c : null);
                        setAssessmentsCount((_e = (_d = data.metrics) === null || _d === void 0 ? void 0 : _d.assessmentsCount) !== null && _e !== void 0 ? _e : null);
                        return [3 /*break*/, 6];
                    case 4:
                        error_2 = _f.sent();
                        if (error_2 instanceof Error &&
                            error_2.name === "AbortError") {
                            return [2 /*return*/];
                        }
                        console.error("Unable to load ratings:", error_2);
                        setLoadError(getErrorMessage(error_2, "Unable to load ratings and reports."));
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
    }, [sessionChecked, isAuthenticated, ratingsRetry]);
    // Load checklist reports independently
    react_1.useEffect(function () {
        if (!sessionChecked)
            return;
        if (!isAuthenticated) {
            setChecklistReports([]);
            setChecklistReportsLoading(false);
            setChecklistLoadError(null);
            return;
        }
        var controller = new AbortController();
        var loadChecklistReports = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, data, error_3;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        setChecklistReportsLoading(true);
                        setChecklistLoadError(null);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, 5, 6]);
                        return [4 /*yield*/, fetch("/api/checklists", {
                                method: "GET",
                                credentials: "same-origin",
                                cache: "no-store",
                                signal: controller.signal,
                                headers: { Accept: "application/json" }
                            })];
                    case 2:
                        response = _c.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = (_c.sent());
                        if (response.status === 401) {
                            setIsAuthenticated(false);
                            return [2 /*return*/];
                        }
                        if (!response.ok) {
                            throw new Error((_a = data.error) !== null && _a !== void 0 ? _a : "Unable to load checklist reports.");
                        }
                        setChecklistReports((_b = data.reports) !== null && _b !== void 0 ? _b : []);
                        return [3 /*break*/, 6];
                    case 4:
                        error_3 = _c.sent();
                        if (error_3 instanceof Error &&
                            error_3.name === "AbortError") {
                            return [2 /*return*/];
                        }
                        console.error("Unable to load checklist reports:", error_3);
                        setChecklistLoadError(getErrorMessage(error_3, "Unable to load checklist reports."));
                        return [3 /*break*/, 6];
                    case 5:
                        if (!controller.signal.aborted) {
                            setChecklistReportsLoading(false);
                        }
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        void loadChecklistReports();
        return function () { return controller.abort(); };
    }, [sessionChecked, isAuthenticated, checklistRetry]);
    // Report visibility
    var reports = apiReports;
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
    // Service counts
    var serviceReportCounts = react_1.useMemo(function () {
        var counts = {
            "sunday-business": 0,
            "sunday-celebration": 0,
            "wednesday-mc-live": 0,
            "wednesday-wow": 0
        };
        var serviceTypeMap = {
            BUSINESS: "sunday-business",
            CELEBRATION: "sunday-celebration",
            MC_LIVE: "wednesday-mc-live",
            WOW: "wednesday-wow"
        };
        publicReports.forEach(function (report) {
            var _a;
            if (report.reportType !== "SERVICE" || !report.serviceType) {
                return;
            }
            var serviceId = serviceTypeMap[report.serviceType];
            if (serviceId) {
                counts[serviceId] = ((_a = counts[serviceId]) !== null && _a !== void 0 ? _a : 0) + 1;
            }
        });
        return counts;
    }, [publicReports]);
    // Derived overview values
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
    // Actions
    var handleLeaveFeedback = react_1.useCallback(function (report) {
        if (!report.id)
            return;
        setFeedbackReport(report);
    }, []);
    var handleViewReport = react_1.useCallback(function (report) {
        setSelectedReport(report);
        setReportDialogOpen(true);
    }, []);
    var handleCloseReport = react_1.useCallback(function () {
        setReportDialogOpen(false);
        setSelectedReport(null);
    }, []);
    var handleSelectService = react_1.useCallback(function (service) {
        setSelectedService(service);
        requestAnimationFrame(function () {
            var _a;
            (_a = document
                .getElementById("report-history")) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    }, []);
    var handleViewChecklistReport = react_1.useCallback(function (report) {
        // Replace with the checklist detail dialog when available.
        console.info("Selected checklist report:", report.id);
    }, []);
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
    var handleRatingsRetry = react_1.useCallback(function () {
        setRatingsRetry(function (value) { return value + 1; });
    }, []);
    var handleChecklistRetry = react_1.useCallback(function () {
        setChecklistRetry(function (value) { return value + 1; });
    }, []);
    // Consistent responsive spacing for alert messages
    var alertWrapper = "mx-auto my-6 w-full max-w-7xl px-4 sm:px-6 lg:px-8";
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: [
                "relative min-h-screen transition-[filter] duration-300",
                !isAuthenticated
                    ? "pointer-events-none select-none blur-[11px]"
                    : "",
            ].join(" "), "aria-hidden": !isAuthenticated, inert: !isAuthenticated },
            React.createElement("main", { className: "min-h-screen overflow-x-clip bg-[#F7F9FC]" },
                React.createElement(Hero_1.RatingsHero, { serviceAssessments: assessmentsCount, publishedReports: publicReports.length, checklistCompletion: overview.checklistCompletionPercentage }),
                React.createElement(Overview_1.RatingsOverview, { approvedAverageRating: (_b = apiMetrics === null || apiMetrics === void 0 ? void 0 : apiMetrics.approvedAverageRating) !== null && _b !== void 0 ? _b : null, servicesAssessed: (_c = apiMetrics === null || apiMetrics === void 0 ? void 0 : apiMetrics.servicesAssessed) !== null && _c !== void 0 ? _c : null, checklistCompletion: (_d = apiMetrics === null || apiMetrics === void 0 ? void 0 : apiMetrics.checklistCompletion) !== null && _d !== void 0 ? _d : null, areasForImprovement: (_e = apiMetrics === null || apiMetrics === void 0 ? void 0 : apiMetrics.areasForImprovement) !== null && _e !== void 0 ? _e : null, outstandingReviews: (_f = apiMetrics === null || apiMetrics === void 0 ? void 0 : apiMetrics.outstandingReviews) !== null && _f !== void 0 ? _f : null }),
                loadError && (React.createElement("div", { className: alertWrapper },
                    React.createElement("div", { role: "alert", className: "rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700" },
                        React.createElement("p", { className: "font-semibold" }, "Unable to load reports"),
                        React.createElement("p", { className: "mt-1 break-words" }, loadError),
                        React.createElement("button", { type: "button", onClick: handleRatingsRetry, disabled: isLoading, className: "mt-3 inline-flex min-h-10 items-center rounded-lg font-semibold underline underline-offset-4 transition hover:text-red-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:cursor-not-allowed disabled:opacity-50" }, isLoading ? "Retrying..." : "Try again")))),
                checklistLoadError && (React.createElement("div", { className: alertWrapper },
                    React.createElement("div", { role: "alert", className: "rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700" },
                        React.createElement("p", { className: "font-semibold" }, "Unable to load checklist reports"),
                        React.createElement("p", { className: "mt-1 break-words" }, checklistLoadError),
                        React.createElement("button", { type: "button", onClick: handleChecklistRetry, disabled: checklistReportsLoading, className: "mt-3 inline-flex min-h-10 items-center rounded-lg font-semibold underline underline-offset-4 transition hover:text-red-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:cursor-not-allowed disabled:opacity-50" }, checklistReportsLoading
                            ? "Retrying..."
                            : "Try again")))),
                React.createElement(ChecklistReports_1.ChecklistReports, { reports: checklistReports, loading: checklistReportsLoading, onViewReport: handleViewChecklistReport }),
                React.createElement(ServiceReportCards_1.ServiceReportCards, { reportCounts: serviceReportCounts, onSelectService: handleSelectService }),
                React.createElement(ReportHistory_1.ReportHistory, { reports: serviceFilteredReports, loading: isLoading, onViewReport: handleViewReport, onLeaveFeedback: handleLeaveFeedback, publicOnly: !isLeadershipView, title: isLeadershipView
                        ? "Reports and review queue"
                        : "Published report history", description: isLeadershipView
                        ? "Review available reports and open individual records."
                        : "Browse approved reports made available for the church community." }),
                selectedService !== "all" && (React.createElement("div", { className: "mx-auto -mt-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8" },
                    React.createElement("button", { type: "button", onClick: function () { return setSelectedService("all"); }, className: "min-h-10 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#0C2340] transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0]" }, "Show all services"))),
                React.createElement(RatingBands_1.RatingBands, null),
                React.createElement(SpecialProgrammes_1.SpecialProgrammes, null),
                React.createElement(ReportArchive_1.ReportArchive, { reports: isLeadershipView
                        ? leadershipReports
                        : publicReports, loading: isLoading, onViewReport: handleViewReport, publicOnly: !isLeadershipView }),
                isLeadershipView && (React.createElement(ReviewQueue_1.ReviewQueue, { reports: reports, loading: isLoading, onViewReport: handleViewReport })),
                React.createElement(ratings_detail_dialog_1["default"], { report: selectedReport, open: reportDialogOpen, onClose: handleCloseReport, publicOnly: !isLeadershipView }))),
        !sessionChecked && (React.createElement("div", { role: "status", "aria-live": "polite", className: "fixed inset-0 z-50 flex items-center justify-center bg-[#0C2340]/25 px-4 backdrop-blur-[2px]" },
            React.createElement("div", { className: "flex w-full max-w-xs items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl" },
                React.createElement("span", { "aria-hidden": "true", className: "h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-slate-200 border-t-[#00A3E0]" }),
                React.createElement("p", { className: "text-sm font-medium text-[#0C2340]" }, "Verifying your session...")))),
        sessionChecked && !isAuthenticated && (React.createElement("div", { "aria-hidden": "true", className: "fixed inset-0 z-40 bg-[#0C2340]/25 backdrop-blur-[2px]" })),
        React.createElement(login_dialog_1.RatingsLoginDialog, { open: sessionChecked && !isAuthenticated, onAuthenticated: function () {
                setIsAuthenticated(true);
                setSessionChecked(true);
                setLoadError(null);
                setChecklistLoadError(null);
            } }),
        (feedbackReport === null || feedbackReport === void 0 ? void 0 : feedbackReport.id) && (React.createElement(feedback_dialog_1.ReportFeedbackDialog, { reportId: feedbackReport.id, reportTitle: feedbackReport.title, open: Boolean(feedbackReport), onClose: function () { return setFeedbackReport(null); } }))));
};
