
"use client";
import { useCallback, useMemo, useState } from "react";
import { developmentReports, type ServiceReport, type ServiceType } from "@/data/ratings";
import {RatingsHero} from "@/components/assessment/ratings/Hero";
import {RatingsOverview} from "@/components/assessment/ratings/Overview";
import {ServiceReportCards} from "@/components/assessment/ratings/ServiceReportCards";
import {ReportHistory} from "@/components/assessment/ratings/ReportHistory";
import {ReportArchive} from "@/components/assessment/ratings/ReportArchive";
import {RatingBands} from "@/components/assessment/ratings/RatingBands";
import {SpecialProgrammes} from "@/components/assessment/ratings/SpecialProgrammes";
import ReportDetailDialog from "@/dialogs/ratings-detail-dialog";
import {ReviewQueue} from "./ReviewQueue";
import { ChecklistReports, type ChecklistReport } from "@/components/assessment/ratings/ChecklistReports";

interface RatingsPageClientProps {
  reports?: ServiceReport[];
  loading?: boolean;
  isLeadershipView?: boolean;
}

export const RatingsPageClient = ({
  reports = developmentReports,
  loading = false,
  isLeadershipView = false,
}: RatingsPageClientProps) => {
    const [selectedReport, setSelectedReport] = useState<ServiceReport | null>(null);
    const [reportDialogOpen, setReportDialogOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<ServiceType | "all">("all");
  
    const checklistReports: ChecklistReport[] = [];
    const checklistReportsLoading = false;

    const handleViewChecklistReport = useCallback(
    (report: ChecklistReport) => {
        // Connect this to a checklist report detail dialog when available.
        console.info("Selected checklist report:", report.id);
    },
    [],
    );


  const visibleReports = useMemo(() => {
    return reports.filter((report) => {
      if (isLeadershipView) return true;

      return (
        report.status === "published" &&
        report.visibility === "public"
      );
    });
  }, [reports, isLeadershipView]);

  const publicReports = useMemo(
    () =>
      visibleReports.filter(
        (report) =>
          report.status === "published" &&
          report.visibility === "public",
      ),
    [visibleReports],
  );

  const serviceReportCounts = useMemo(() => {
    const counts: Partial<Record<ServiceType, number>> = {};

    publicReports.forEach((report) => {
      if (!report.serviceType) return;

      counts[report.serviceType] =
        (counts[report.serviceType] ?? 0) + 1;
    });

    return counts;
  }, [publicReports]);

  const overview = useMemo(() => {
    const approvedScores = publicReports
      .map((report) => report.summary.approvedAverageRating)
      .filter(
        (score): score is number =>
          typeof score === "number" &&
          Number.isFinite(score) &&
          score >= 0 &&
          score <= 100,
      );

    const completionValues = publicReports
      .map((report) => report.summary.checklistCompletionPercentage)
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

    if (typeof document !== "undefined") {
      document
        .getElementById("report-history")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleViewArchiveReport = useCallback(
    (report: ServiceReport) => {
      handleViewReport(report);
    },
    [handleViewReport],
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

  return (
    <main className="min-h-screen bg-[#F7F9FC]">
      <RatingsHero />

      <RatingsOverview
        approvedAverageRating={overview.approvedAverageRating}
        servicesAssessed={overview.servicesAssessed}
        checklistCompletion={overview.checklistCompletionPercentage}
        areasForImprovement={overview.areasForImprovement}
        outstandingReviews={overview.outstandingReviews}
      />

      
    
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
        loading={loading}
        onViewReport={handleViewReport}
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
        <div className="mx-auto -mt-8 max-w-7xl px-5 sm:px-8 lg:px-10">
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
        reports={isLeadershipView ? leadershipReports : publicReports}
        loading={loading}
        onViewReport={handleViewArchiveReport}
        publicOnly={!isLeadershipView}
      />

        {isLeadershipView && (
        <ReviewQueue
            reports={reports}
            loading={loading}
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
  );
}
