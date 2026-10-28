
"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  FileBarChart2,
  FileSearch,
  LockKeyhole,
  Search,
  SearchX,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

import {
  reportTypeLabels,
  serviceDefinitions,
  type ReportingPeriod,
  type ServiceReport,
  type ServiceType,
} from "@/data/ratings";
import { SectionHeading } from "@/components/assessment/ratings/shared/Heading";
import {
  ReportFilters,
  type ReportFilterValues,
} from "@/components/assessment/ratings/ReportFilters";
import { StatusBadge } from "@/components/assessment/ratings/shared/StatusBadge";

interface ReportHistoryProps {
  reports?: ServiceReport[];
  loading?: boolean;
  initialFilters?: Partial<ReportFilterValues>;
  onViewReport?: (report: ServiceReport) => void;
  showFilters?: boolean;
  publicOnly?: boolean;
  title?: string;
  description?: string;
  className?: string;
}

const TIME_ZONE = "Africa/Lagos";

const initialFilterValues: ReportFilterValues = {
  search: "",
  reportType: "all",
  serviceType: "all",
  status: "all",
  period: "all",
};

function parseDate(value: string): Date | null {
  if (!value?.trim()) return null;

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
}

/** Returns a calendar date in the church's reporting timezone. */
function getLagosDateKey(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const values = Object.fromEntries(
    parts.map(({ type, value }) => [type, value]),
  );

  return `${values.year}-${values.month}-${values.day}`;
}

function formatDate(value: string): string {
  const date = parseDate(value);

  if (!date) return "Date unavailable";

  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: TIME_ZONE,
  }).format(date);
}

/** Use UTC only for arithmetic on already-normalized YYYY-MM-DD keys. */
function shiftDateKey(value: string, days: number): string {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  date.setUTCDate(date.getUTCDate() + days);

  return [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, "0"),
    String(date.getUTCDate()).padStart(2, "0"),
  ].join("-");
}

function getServiceName(serviceType?: ServiceType): string {
  if (!serviceType) return "General report";

  return (
    serviceDefinitions.find((service) => service.id === serviceType)?.name ??
    "Service report"
  );
}

function matchesPeriod(
  report: ServiceReport,
  period: ReportingPeriod | "all",
  todayKey: string,
): boolean {
  if (period === "all" || period === "custom") return true;

  const date = parseDate(report.date);

  if (!date) return false;

  const reportKey = getLagosDateKey(date);

  // Exclude future-dated reports from relative historical periods.
  if (reportKey > todayKey) return false;

  if (period === "this-week") {
    const [year, month, day] = todayKey.split("-").map(Number);
    const today = new Date(Date.UTC(year, month - 1, day));
    const dayOfWeek = today.getUTCDay();
    const daysSinceMonday = (dayOfWeek + 6) % 7;
    const weekStart = shiftDateKey(todayKey, -daysSinceMonday);

    return reportKey >= weekStart && reportKey <= todayKey;
  }

  if (period === "this-month") {
    return reportKey.slice(0, 7) === todayKey.slice(0, 7);
  }

  if (period === "last-month") {
    const [year, month] = todayKey.split("-").map(Number);
    const lastMonthDate = new Date(Date.UTC(year, month - 2, 1));
    const lastMonth = [
      lastMonthDate.getUTCFullYear(),
      String(lastMonthDate.getUTCMonth() + 1).padStart(2, "0"),
    ].join("-");

    return reportKey.slice(0, 7) === lastMonth;
  }

  return true;
}

function getValidPercentage(value: unknown): string | null {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value) ||
    value < 0 ||
    value > 100
  ) {
    return null;
  }

  return `${Number(value.toFixed(1))}%`;
}

function getReportScore(report: ServiceReport): string | null {
  const score = report.summary?.approvedAverageRating;

  if (
    typeof score !== "number" ||
    !Number.isFinite(score) ||
    score < 0 ||
    score > 100
  ) {
    return null;
  }

  return `${score.toFixed(1)}%`;
}

function hasActiveFilters(filters: ReportFilterValues): boolean {
  return (
    Boolean(filters.search.trim()) ||
    filters.reportType !== "all" ||
    filters.serviceType !== "all" ||
    filters.status !== "all" ||
    filters.period !== "all"
  );
}

function ReportSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white"
    >
      <div className="h-1.5 animate-pulse bg-slate-200" />
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="h-7 w-28 animate-pulse rounded-full bg-slate-100" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-slate-100" />
        </div>
        <div className="mt-6 h-6 w-4/5 animate-pulse rounded-lg bg-slate-200" />
        <div className="mt-3 h-4 w-2/3 animate-pulse rounded bg-slate-100" />
        <div className="mt-6 h-20 animate-pulse rounded-2xl bg-slate-100" />
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="h-20 animate-pulse rounded-xl bg-slate-100" />
          <div className="h-20 animate-pulse rounded-xl bg-slate-100" />
        </div>
        <div className="mt-6 h-11 animate-pulse rounded-xl bg-slate-100" />
      </div>
    </div>
  );
}

export const ReportHistory = ({
  reports = [],
  loading = false,
  initialFilters,
  onViewReport,
  showFilters = true,
  publicOnly = true,
  title = "Report history",
  description = "Explore published service reports, revisit important moments, and review documented outcomes over time.",
  className = "",
}: ReportHistoryProps) => {
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = shouldReduceMotion ?? false;

  const defaultFilters = useMemo(
    () => ({
      ...initialFilterValues,
      ...initialFilters,
    }),
    [initialFilters],
  );

  
  const [activeFilters, setActiveFilters] =
    useState<ReportFilterValues>(defaultFilters);

  const [todayKey, setTodayKey] = useState<string | null>(null);

  useEffect(() => {
    setTodayKey(getLagosDateKey(new Date()));
  }, []);

  const filtersActive = hasActiveFilters(activeFilters);
  const search = activeFilters.search.trim().toLowerCase();
  const resetFilters = () => {
    setActiveFilters(initialFilterValues);
  };

  const visibleReports = useMemo(() => {
    if (loading || todayKey === null) {
      return [];
    }

    return reports
      .filter((report) => {
        if (
          publicOnly &&
          (report.visibility !== "public" ||
            report.status !== "published")
        ) {
          return false;
        }

        if (
          activeFilters.reportType !== "all" &&
          report.reportType !== activeFilters.reportType
        ) {
          return false;
        }

        if (
          activeFilters.serviceType !== "all" &&
          report.serviceType !== activeFilters.serviceType
        ) {
          return false;
        }

        if (
          activeFilters.status !== "all" &&
          report.status !== activeFilters.status
        ) {
          return false;
        }

        if (
          !matchesPeriod(report, activeFilters.period, todayKey)
        ) {
          return false;
        }

        if (search) {
          const searchableText = [
            report.title,
            report.approvedPublicSummary ?? "",
            reportTypeLabels[report.reportType] ?? "",
            getServiceName(report.serviceType),
            ...(report.highlights ?? []).map(
              (highlight) =>
                `${highlight.title} ${highlight.description}`,
            ),
          ]
            .join(" ")
            .toLowerCase();

          if (!searchableText.includes(search)) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        const first = parseDate(a.date)?.getTime() ?? 0;
        const second = parseDate(b.date)?.getTime() ?? 0;

        return second - first;
      });
  }, [
    reports,
    publicOnly,
    activeFilters,
    todayKey,
    loading,
    search,
  ]);


  return (
    <section
      id="report-history"
      aria-labelledby="report-history-heading"
      className={`relative isolate mx-auto w-full max-w-7xl overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24 ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-20 -z-10 h-80 w-80 rounded-full bg-[#41B6E6]/[0.07] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 bottom-12 -z-10 h-72 w-72 rounded-full bg-[#FFC72C]/[0.055] blur-3xl"
      />

      <SectionHeading
        eyebrow="The service archive"
        title={title}
        description={description}
      />

      {/* Archive introduction */}
      <div className="relative mt-8 overflow-hidden rounded-[1.75rem] bg-[#0C2340] shadow-[0_18px_55px_rgba(12,35,64,0.12)] sm:rounded-[2rem]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-24 h-72 w-72 rounded-full border border-white/[0.08]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-1 -top-14 h-52 w-52 rounded-full border border-white/[0.08]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-2/3 bg-gradient-to-l from-[#00A3E0]/[0.12] to-transparent"
        />

        <div className="relative flex flex-col gap-6 px-6 py-7 sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#41B6E6]/25 bg-[#41B6E6]/10 px-3.5 py-2 text-xs font-semibold text-[#8CDEFA]">
              <FileBarChart2 size={15} aria-hidden="true" />
              Media team reporting
            </span>

            <h3 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Every service. A record of excellence.
            </h3>

            <p className="mt-3 max-w-xl text-sm leading-7 text-white/65">
              Find published reports, revisit service highlights, and review
              available performance data in one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="min-w-[125px] rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50">
                {publicOnly ? "Published reports" : "Matching reports"}
              </p>
              <p className="mt-2 text-2xl font-bold tabular-nums text-white">
                {loading ? "—" : visibleReports.length}
              </p>
            </div>

            <div className="min-w-[125px] rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50">
                Archive
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-white">
                <ShieldCheck
                  size={17}
                  className="text-[#41B6E6]"
                  aria-hidden="true"
                />
                {publicOnly ? "Public view" : "Report records"}
              </p>
            </div>
          </div>
        </div>

        <div className="relative flex items-center gap-2 border-t border-white/10 bg-white/[0.035] px-6 py-3.5 text-xs leading-5 text-white/60 sm:px-8 lg:px-10">
          <CheckCircle2
            size={15}
            className="shrink-0 text-[#41B6E6]"
            aria-hidden="true"
          />
          {publicOnly
            ? "Only published reports approved for public viewing are shown."
            : "Report visibility and publication status are displayed with each record."}
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mt-9">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF7FC] text-[#0087BD]">
                <SlidersHorizontal size={17} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-[#0C2340]">
                  Find a report
                </h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  Refine the archive to find what you need.
                </p>
              </div>
            </div>

            {filtersActive && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold text-[#087FAD] transition hover:bg-[#EAF7FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2"
              >
                Reset filters
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm shadow-[#0C2340]/[0.025] sm:p-5">
            <ReportFilters
              value={activeFilters}
              onChange={setActiveFilters}
              onReset={resetFilters}
              resultCount={visibleReports.length}
              showStatusFilter={!publicOnly}
            />
          </div>
        </div>
      )}

      {/* Results heading */}
      <div className="mb-5 mt-10 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0087BD]">
            Archive collection
          </p>
          <h3 className="mt-2 text-xl font-bold tracking-tight text-[#0C2340] sm:text-2xl">
            {filtersActive ? "Search results" : "Recent reports"}
          </h3>
        </div>

        {!loading && (
          <span className="rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600">
            {visibleReports.length}{" "}
            {visibleReports.length === 1 ? "report" : "reports"}
          </span>
        )}
      </div>

      {loading || todayKey === null ? (
        <div
          role="status"
          aria-live="polite"
          className="grid gap-5 md:grid-cols-2"
        >
          <span className="sr-only">Loading reports...</span>
          {Array.from({ length: 4 }).map((_, index) => (
            <ReportSkeleton key={index} />
          ))}
        </div>
      ) : visibleReports.length === 0 ? (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: reduceMotion ? 0 : 0.35 }}
          className="relative overflow-hidden rounded-[1.75rem] border border-dashed border-[#C8DCE8] bg-white px-6 py-14 text-center sm:px-10 sm:py-16"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border border-[#00A3E0]/10"
          />
          <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E5F7FC] to-[#F3F8FF] text-[#0087BD] ring-1 ring-[#D8EEF7]">
            {filtersActive ? (
              <SearchX size={28} strokeWidth={1.7} aria-hidden="true" />
            ) : (
              <FileSearch size={28} strokeWidth={1.7} aria-hidden="true" />
            )}
          </span>

          <p className="relative mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0087BD]">
            {filtersActive ? "Try another search" : "The archive"}
          </p>

          <h3 className="relative mt-3 text-xl font-bold tracking-tight text-[#0C2340] sm:text-2xl">
            {reports.length === 0
              ? "Your report archive starts here"
              : filtersActive
                ? "No reports match your filters"
                : "No reports available to display"}
          </h3>

          <p className="relative mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
            {reports.length === 0
              ? "There are no report records available yet. Published reports will appear here once they have been reviewed and approved."
              : filtersActive
                ? "Try a different keyword or adjust the selected filters to find the report you are looking for."
                : "There are currently no reports available under these visibility and publication rules."}
          </p>

          {filtersActive && (
            <button
              type="button"
              onClick={resetFilters}
              className="relative mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#0C2340] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#16395F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2"
            >
              Clear filters
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          )}
        </motion.div>
      ) : (
        <div className="grid items-stretch gap-5 md:grid-cols-2 lg:gap-6">
          {visibleReports.map((report, index) => {
            const score = getReportScore(report);
            const completion = getValidPercentage(
              report.summary?.checklistCompletionPercentage,
            );
            const publicSummary = report.approvedPublicSummary?.trim();
            const isPublished = report.status === "published";
            const reportType = reportTypeLabels[report.reportType];

            return (
              <motion.article
                key={report.id}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.35,
                  delay: reduceMotion ? 0 : Math.min(index * 0.045, 0.2),
                }}
                className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white shadow-[0_4px_24px_rgba(12,35,64,0.035)] transition duration-300 hover:-translate-y-1 hover:border-[#00A3E0]/40 hover:shadow-[0_18px_45px_rgba(12,35,64,0.085)]"
              >
                <div className="h-1.5 bg-gradient-to-r from-[#0C2340] via-[#00A3E0] to-[#41B6E6]" />

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  {/* Report identity */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#D8EDF6] bg-[#EFF9FD] px-3 py-1.5 text-xs font-semibold text-[#087FAD]">
                      <FileBarChart2
                        size={14}
                        className="shrink-0"
                        aria-hidden="true"
                      />
                      <span className="truncate">
                        {reportType ?? "Service report"}
                      </span>
                    </span>

                    <StatusBadge status={report.status} />
                  </div>

                  <h4 className="mt-5 text-lg font-bold leading-snug tracking-tight text-[#0C2340] transition-colors group-hover:text-[#087FAD] sm:text-xl">
                    {report.title}
                  </h4>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays
                        size={14}
                        className="shrink-0 text-[#0087BD]"
                        aria-hidden="true"
                      />
                      {formatDate(report.date)}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span>{getServiceName(report.serviceType)}</span>
                  </div>

                  {/* Approved summary */}
                  <div className="mt-5 rounded-2xl border border-slate-100 bg-[#F8FAFC] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                      Report overview
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {publicSummary ||
                        (isPublished
                          ? "No approved public summary is available for this report."
                          : "This report has not been published for public viewing.")}
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="relative overflow-hidden rounded-2xl border border-[#DCECF4] bg-gradient-to-br from-[#F0F9FD] to-white p-4">
                      <div
                        aria-hidden="true"
                        className="absolute -right-5 -top-5 h-16 w-16 rounded-full bg-[#00A3E0]/[0.06]"
                      />
                      <p className="relative text-[10px] font-bold uppercase leading-4 tracking-[0.1em] text-slate-500">
                        Approved average
                      </p>
                      <p className="relative mt-3 text-2xl font-bold tracking-tight text-[#0C2340]">
                        {score ?? "—"}
                      </p>
                      <p className="relative mt-1 text-[10px] text-slate-500">
                        {score !== null
                          ? "Approved rating"
                          : "No verified score"}
                      </p>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl border border-[#E8EAF4] bg-gradient-to-br from-[#F5F6FF] to-white p-4">
                      <div
                        aria-hidden="true"
                        className="absolute -right-5 -top-5 h-16 w-16 rounded-full bg-[#4B42F2]/[0.05]"
                      />
                      <p className="relative text-[10px] font-bold uppercase leading-4 tracking-[0.1em] text-slate-500">
                        Checklist completion
                      </p>
                      <p className="relative mt-3 text-2xl font-bold tracking-tight text-[#0C2340]">
                        {completion ?? "—"}
                      </p>
                      <p className="relative mt-1 text-[10px] text-slate-500">
                        {completion !== null
                          ? "Recorded completion"
                          : "No verified figure"}
                      </p>
                    </div>
                  </div>

                  {/* Highlights */}
                  {(report.highlights?.length ?? 0) > 0 && (
                    <div className="mt-5">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                          Report highlights
                        </p>
                        <span className="text-[10px] font-medium text-slate-400">
                          {Math.min(report.highlights.length, 3)} of{" "}
                          {report.highlights.length}
                        </span>
                      </div>

                      <ul className="mt-3 space-y-3">
                        {report.highlights.slice(0, 3).map((highlight) => (
                          <li
                            key={highlight.id}
                            className="flex items-start gap-3 text-sm leading-6 text-slate-600"
                          >
                            <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EAF7FC] text-[#0087BD]">
                              <CheckCircle2 size={12} aria-hidden="true" />
                            </span>
                            <span>{highlight.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Visibility and action */}
                  <div className="mt-auto pt-6">
                    <div className="flex items-center gap-2 border-t border-slate-100 pt-4">
                      {report.visibility === "public" ? (
                        <>
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EAF8F0] text-[#07864B]">
                            <CheckCircle2 size={14} aria-hidden="true" />
                          </span>
                          <div>
                            <p className="text-xs font-semibold text-[#253D56]">
                              Public report
                            </p>
                            <p className="mt-0.5 text-[10px] text-slate-400">
                              Approved for public viewing
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                            <LockKeyhole size={14} aria-hidden="true" />
                          </span>
                          <div>
                            <p className="text-xs font-semibold text-[#253D56]">
                              Restricted report
                            </p>
                            <p className="mt-0.5 text-[10px] text-slate-400">
                              Access may be limited
                            </p>
                          </div>
                        </>
                      )}
                    </div>

                    {onViewReport ? (
                      <button
                        type="button"
                        onClick={() => onViewReport(report)}
                        className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0C2340] px-4 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-[#16395F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2"
                      >
                        View full report
                        <ArrowUpRight
                          size={17}
                          aria-hidden="true"
                          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </button>
                    ) : (
                      <div className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-400">
                        <FileSearch size={16} aria-hidden="true" />
                        Report details unavailable
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}

      {!loading && visibleReports.length > 0 && (
        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F0F9FD] text-[#0087BD]">
              <Search size={17} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-[#0C2340]">
                Looking for another report?
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Use the archive filters to narrow results by service, report
                type, status, or reporting period.
              </p>
            </div>
          </div>

          {filtersActive && showFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-[#0C2340] transition hover:border-[#00A3E0]/40 hover:bg-[#F0F9FD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2"
            >
              Reset search
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          )}
        </div>
      )}
    </section>
  );
};
