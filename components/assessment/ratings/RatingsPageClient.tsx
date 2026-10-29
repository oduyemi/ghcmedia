"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ServiceReport, ServiceType } from "@/data/ratings";
import { RatingsHero } from "@/components/assessment/ratings/Hero";
import { RatingsOverview } from "@/components/assessment/ratings/Overview";
import { ServiceReportCards } from "@/components/assessment/ratings/ServiceReportCards";
import { ReportHistory } from "@/components/assessment/ratings/ReportHistory";
import { ReportArchive } from "@/components/assessment/ratings/ReportArchive";
import { RatingBands } from "@/components/assessment/ratings/RatingBands";
import { SpecialProgrammes } from "@/components/assessment/ratings/SpecialProgrammes";
import { ChecklistReports, type ChecklistReport } from "@/components/assessment/ratings/ChecklistReports";
import ReportDetailDialog from "@/dialogs/ratings-detail-dialog";
import { RatingsLoginDialog } from "@/dialogs/login-dialog";
import { ReportFeedbackDialog } from "@/dialogs/feedback-dialog";
import { ReviewQueue } from "./ReviewQueue";

interface ChecklistsApiResponse {
  reports?: ChecklistReport[];
  error?: string;
}

interface RatingsApiMetrics {
  approvedAverageRating: number | null;
  servicesAssessed: number | null;
  checklistCompletion: number | null;
  areasForImprovement: number | null;
  outstandingReviews: number | null;
  assessmentsCount: number | null;
}

interface RatingsApiReport {
  _id?: string;
  id?: string;
  title: string;
  reportType?: string;
  serviceType?: string | null;
  date: string | Date;
  status?: string;
  visibility?: string;
  summary?: {
    approvedAverageRating?: number | null;
    checklistCompletionPercentage?: number | null;
    completedAssessments?: number;
    pendingAssessments?: number;
  };
  approvedPublicSummary?: string;
  highlights?: Array<{
    highlightId?: string;
    title: string;
    description: string;
    category?: string;
  }>;
  publishedAt?: string | Date | null;
}

interface RatingsApiResponse {
  reports?: RatingsApiReport[];
  metrics?: RatingsApiMetrics;
  error?: string;
}

interface RatingsPageClientProps {
  reports?: ServiceReport[];
  loading?: boolean;
  isLeadershipView?: boolean;
}

const normalizeStatus = (status?: string): string => {
  switch (status?.toUpperCase()) {
    case "PUBLISHED":
      return "published";
    case "APPROVED":
      return "approved";
    case "PENDING_REVIEW":
      return "pending-review";
    case "DRAFT":
      return "draft";
    default:
      return status?.toLowerCase() ?? "";
  }
};

const normalizeVisibility = (visibility?: string): string =>
  visibility?.toLowerCase() ?? "";

const normalizeReport = (report: RatingsApiReport): ServiceReport => {
  return {
    ...report,
    id: report.id ?? report._id,
    status: normalizeStatus(report.status),
    visibility: normalizeVisibility(report.visibility),
  } as unknown as ServiceReport;
};

const getErrorMessage = (
  error: unknown,
  fallback: string,
): string =>
  error instanceof Error ? error.message : fallback;

export const RatingsPageClient = ({
  reports: initialReports,
  loading: initialLoading,
  isLeadershipView = false,
}: RatingsPageClientProps) => {
  // Authentication
  const [sessionChecked, setSessionChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Ratings state
  const [apiReports, setApiReports] = useState<ServiceReport[]>(
    initialReports ?? [],
  );
  const [isLoading, setIsLoading] = useState(initialLoading ?? true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [apiMetrics, setApiMetrics] = useState<RatingsApiMetrics | null>(
    null,
  );
  const [assessmentsCount, setAssessmentsCount] = useState<number | null>(
    null,
  );
  const [ratingsRetry, setRatingsRetry] = useState(0);

  // Checklist state
  const [checklistReports, setChecklistReports] = useState<
    ChecklistReport[]
  >([]);
  const [checklistReportsLoading, setChecklistReportsLoading] =
    useState(false);
  const [checklistLoadError, setChecklistLoadError] = useState<
    string | null
  >(null);
  const [checklistRetry, setChecklistRetry] = useState(0);

  // Dialog and filter state
  const [selectedReport, setSelectedReport] =
    useState<ServiceReport | null>(null);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [feedbackReport, setFeedbackReport] =
    useState<ServiceReport | null>(null);
  const [selectedService, setSelectedService] = useState<
    ServiceType | "all"
  >("all");

  // Verify the current session
  useEffect(() => {
    const controller = new AbortController();

    const checkSession = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "same-origin",
          cache: "no-store",
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });

        setIsAuthenticated(response.ok);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        console.error("Unable to verify the current session:", error);
        setIsAuthenticated(false);
      } finally {
        if (!controller.signal.aborted) {
          setSessionChecked(true);
        }
      }
    };

    void checkSession();

    return () => controller.abort();
  }, []);

  // Load ratings independently
  useEffect(() => {
    if (!sessionChecked) return;

    if (!isAuthenticated) {
      setApiReports([]);
      setApiMetrics(null);
      setAssessmentsCount(null);
      setIsLoading(false);
      setLoadError(null);
      return;
    }

    const controller = new AbortController();

    const loadReports = async () => {
      setIsLoading(true);
      setLoadError(null);

      try {
        const response = await fetch("/api/ratings", {
          method: "GET",
          credentials: "same-origin",
          cache: "no-store",
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });

        const data = (await response.json()) as RatingsApiResponse;

        if (response.status === 401) {
          setIsAuthenticated(false);
          return;
        }

        if (!response.ok) {
          throw new Error(
            data.error ?? "Unable to load ratings and reports.",
          );
        }

        setApiReports((data.reports ?? []).map(normalizeReport));
        setApiMetrics(data.metrics ?? null);
        setAssessmentsCount(data.metrics?.assessmentsCount ?? null);
      } catch (error) {
        if (
          error instanceof Error &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.error("Unable to load ratings:", error);

        setLoadError(
          getErrorMessage(
            error,
            "Unable to load ratings and reports.",
          ),
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void loadReports();

    return () => controller.abort();
  }, [sessionChecked, isAuthenticated, ratingsRetry]);

  // Load checklist reports independently
  useEffect(() => {
    if (!sessionChecked) return;

    if (!isAuthenticated) {
      setChecklistReports([]);
      setChecklistReportsLoading(false);
      setChecklistLoadError(null);
      return;
    }

    const controller = new AbortController();

    const loadChecklistReports = async () => {
      setChecklistReportsLoading(true);
      setChecklistLoadError(null);

      try {
        const response = await fetch("/api/checklists", {
          method: "GET",
          credentials: "same-origin",
          cache: "no-store",
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });

        const data =
          (await response.json()) as ChecklistsApiResponse;

        if (response.status === 401) {
          setIsAuthenticated(false);
          return;
        }

        if (!response.ok) {
          throw new Error(
            data.error ?? "Unable to load checklist reports.",
          );
        }

        setChecklistReports(data.reports ?? []);
      } catch (error) {
        if (
          error instanceof Error &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.error("Unable to load checklist reports:", error);

        setChecklistLoadError(
          getErrorMessage(
            error,
            "Unable to load checklist reports.",
          ),
        );
      } finally {
        if (!controller.signal.aborted) {
          setChecklistReportsLoading(false);
        }
      }
    };

    void loadChecklistReports();

    return () => controller.abort();
  }, [sessionChecked, isAuthenticated, checklistRetry]);

  // Report visibility
  const reports = apiReports;

  const visibleReports = useMemo(
    () =>
      reports.filter((report) => {
        if (isLeadershipView) return true;

        return (
          report.status === "published" &&
          report.visibility === "public"
        );
      }),
    [reports, isLeadershipView],
  );

  const publicReports = useMemo(
    () =>
      visibleReports.filter(
        (report) =>
          report.status === "published" &&
          report.visibility === "public",
      ),
    [visibleReports],
  );

  // Service counts
  const serviceReportCounts = useMemo(() => {
    const counts: Partial<Record<ServiceType, number>> = {
      "sunday-business": 0,
      "sunday-celebration": 0,
      "wednesday-mc-live": 0,
      "wednesday-wow": 0,
    };

    const serviceTypeMap: Partial<Record<string, ServiceType>> = {
      BUSINESS: "sunday-business",
      CELEBRATION: "sunday-celebration",
      MC_LIVE: "wednesday-mc-live",
      WOW: "wednesday-wow",
    };

    publicReports.forEach((report) => {
      if (report.reportType !== "SERVICE" || !report.serviceType) {
        return;
      }

      const serviceId = serviceTypeMap[report.serviceType];

      if (serviceId) {
        counts[serviceId] = (counts[serviceId] ?? 0) + 1;
      }
    });

    return counts;
  }, [publicReports]);

  // Derived overview values
  const overview = useMemo(() => {
    const approvedScores = publicReports
      .map((report) => report.summary?.approvedAverageRating)
      .filter(
        (score): score is number =>
          typeof score === "number" &&
          Number.isFinite(score) &&
          score >= 0 &&
          score <= 100,
      );

    const completionValues = publicReports
      .map(
        (report) =>
          report.summary?.checklistCompletionPercentage,
      )
      .filter(
        (value): value is number =>
          typeof value === "number" &&
          Number.isFinite(value) &&
          value >= 0 &&
          value <= 100,
      );

    const averageRating =
      approvedScores.length > 0
        ? approvedScores.reduce((sum, score) => sum + score, 0) /
          approvedScores.length
        : null;

    const checklistCompletion =
      completionValues.length > 0
        ? completionValues.reduce((sum, value) => sum + value, 0) /
          completionValues.length
        : null;

    return {
      approvedAverageRating: averageRating,
      checklistCompletionPercentage: checklistCompletion,
      servicesAssessed: publicReports.length,
      areasForImprovement: null as number | null,
      outstandingReviews: isLeadershipView
        ? reports.filter(
            (report) =>
              report.status === "draft" ||
              report.status === "pending-review",
          ).length
        : null,
    };
  }, [publicReports, reports, isLeadershipView]);

  // Actions
  const handleLeaveFeedback = useCallback(
    (report: ServiceReport) => {
      if (!report.id) return;
      setFeedbackReport(report);
    },
    [],
  );

  const handleViewReport = useCallback((report: ServiceReport) => {
    setSelectedReport(report);
    setReportDialogOpen(true);
  }, []);

  const handleCloseReport = useCallback(() => {
    setReportDialogOpen(false);
    setSelectedReport(null);
  }, []);

  const handleSelectService = useCallback((service: ServiceType) => {
    setSelectedService(service);

    requestAnimationFrame(() => {
      document
        .getElementById("report-history")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    });
  }, []);

  const handleViewChecklistReport = useCallback(
    (report: ChecklistReport) => {
      // Replace with the checklist detail dialog when available.
      console.info("Selected checklist report:", report.id);
    },
    [],
  );

  const serviceFilteredReports = useMemo(() => {
    if (selectedService === "all") return visibleReports;

    return visibleReports.filter(
      (report) => report.serviceType === selectedService,
    );
  }, [visibleReports, selectedService]);

  const leadershipReports = useMemo(() => {
    if (!isLeadershipView) return publicReports;

    return visibleReports.filter(
      (report) =>
        report.status === "draft" ||
        report.status === "pending-review" ||
        (report.status === "approved" &&
          report.visibility !== "public"),
    );
  }, [isLeadershipView, publicReports, visibleReports]);

  const handleRatingsRetry = useCallback(() => {
    setRatingsRetry((value) => value + 1);
  }, []);

  const handleChecklistRetry = useCallback(() => {
    setChecklistRetry((value) => value + 1);
  }, []);

  // Consistent responsive spacing for alert messages
  const alertWrapper =
    "mx-auto my-6 w-full max-w-7xl px-4 sm:px-6 lg:px-8";

  return (
    <>
      <div
        className={[
          "relative min-h-screen transition-[filter] duration-300",
          !isAuthenticated
            ? "pointer-events-none select-none blur-[11px]"
            : "",
        ].join(" ")}
        aria-hidden={!isAuthenticated}
        inert={!isAuthenticated}
      >
        <main className="min-h-screen overflow-x-clip bg-[#F7F9FC]">
          <RatingsHero
            serviceAssessments={assessmentsCount}
            publishedReports={publicReports.length}
            checklistCompletion={
              overview.checklistCompletionPercentage
            }
          />

          <RatingsOverview
            approvedAverageRating={
              apiMetrics?.approvedAverageRating ?? null
            }
            servicesAssessed={apiMetrics?.servicesAssessed ?? null}
            checklistCompletion={
              apiMetrics?.checklistCompletion ?? null
            }
            areasForImprovement={
              apiMetrics?.areasForImprovement ?? null
            }
            outstandingReviews={
              apiMetrics?.outstandingReviews ?? null
            }
          />

          {loadError && (
            <div className={alertWrapper}>
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700"
              >
                <p className="font-semibold">
                  Unable to load reports
                </p>
                <p className="mt-1 break-words">{loadError}</p>

                <button
                  type="button"
                  onClick={handleRatingsRetry}
                  disabled={isLoading}
                  className="mt-3 inline-flex min-h-10 items-center rounded-lg font-semibold underline underline-offset-4 transition hover:text-red-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? "Retrying..." : "Try again"}
                </button>
              </div>
            </div>
          )}

          {checklistLoadError && (
            <div className={alertWrapper}>
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700"
              >
                <p className="font-semibold">
                  Unable to load checklist reports
                </p>
                <p className="mt-1 break-words">
                  {checklistLoadError}
                </p>

                <button
                  type="button"
                  onClick={handleChecklistRetry}
                  disabled={checklistReportsLoading}
                  className="mt-3 inline-flex min-h-10 items-center rounded-lg font-semibold underline underline-offset-4 transition hover:text-red-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {checklistReportsLoading
                    ? "Retrying..."
                    : "Try again"}
                </button>
              </div>
            </div>
          )}

          <ChecklistReports
            reports={checklistReports}
            loading={checklistReportsLoading}
            onViewReport={handleViewChecklistReport}
          />

          <ServiceReportCards
            reportCounts={serviceReportCounts}
            onSelectService={handleSelectService}
          />

          <ReportHistory
            reports={serviceFilteredReports}
            loading={isLoading}
            onViewReport={handleViewReport}
            onLeaveFeedback={handleLeaveFeedback}
            publicOnly={!isLeadershipView}
            title={
              isLeadershipView
                ? "Reports and review queue"
                : "Published report history"
            }
            description={
              isLeadershipView
                ? "Review available reports and open individual records."
                : "Browse approved reports made available for the church community."
            }
          />

          {selectedService !== "all" && (
            <div className="mx-auto -mt-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <button
                type="button"
                onClick={() => setSelectedService("all")}
                className="min-h-10 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#0C2340] transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0]"
              >
                Show all services
              </button>
            </div>
          )}

          <RatingBands />

          <SpecialProgrammes />

          <ReportArchive
            reports={
              isLeadershipView
                ? leadershipReports
                : publicReports
            }
            loading={isLoading}
            onViewReport={handleViewReport}
            publicOnly={!isLeadershipView}
          />

          {isLeadershipView && (
            <ReviewQueue
              reports={reports}
              loading={isLoading}
              onViewReport={handleViewReport}
            />
          )}

          <ReportDetailDialog
            report={selectedReport}
            open={reportDialogOpen}
            onClose={handleCloseReport}
            publicOnly={!isLeadershipView}
          />
        </main>
      </div>

      {!sessionChecked && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0C2340]/25 px-4 backdrop-blur-[2px]"
        >
          <div className="flex w-full max-w-xs items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
            <span
              aria-hidden="true"
              className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-slate-200 border-t-[#00A3E0]"
            />
            <p className="text-sm font-medium text-[#0C2340]">
              Verifying your session...
            </p>
          </div>
        </div>
      )}

      {sessionChecked && !isAuthenticated && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-[#0C2340]/25 backdrop-blur-[2px]"
        />
      )}

      <RatingsLoginDialog
        open={sessionChecked && !isAuthenticated}
        onAuthenticated={() => {
          setIsAuthenticated(true);
          setSessionChecked(true);
          setLoadError(null);
          setChecklistLoadError(null);
        }}
      />

      {feedbackReport?.id && (
        <ReportFeedbackDialog
          reportId={feedbackReport.id}
          reportTitle={feedbackReport.title}
          open={Boolean(feedbackReport)}
          onClose={() => setFeedbackReport(null)}
        />
      )}
    </>
  );
};
