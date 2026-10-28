
"use client";
import { CalendarDays, Filter, RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import {
  reportStatusLabels,
  reportTypeLabels,
  serviceDefinitions,
  type ReportStatus,
  type ReportType,
  type ReportingPeriod,
  type ServiceType,
} from "@/data/ratings";

export interface ReportFilterValues {
  search: string;
  reportType: ReportType | "all";
  serviceType: ServiceType | "all";
  status: ReportStatus | "all";
  period: ReportingPeriod | "all";
}

interface ReportFiltersProps {
  value: ReportFilterValues;
  onChange: (nextValue: ReportFilterValues) => void;
  onReset?: () => void;
  resultCount?: number;
  showStatusFilter?: boolean;
  showReportTypeFilter?: boolean;
  showServiceFilter?: boolean;
  showPeriodFilter?: boolean;
  className?: string;
}

const selectClassName =
  "mt-2 min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#0C2340] outline-none transition focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/15 disabled:cursor-not-allowed disabled:bg-slate-50";

const labelClassName =
  "block text-xs font-semibold uppercase tracking-wide text-slate-500";

export const ReportFilters = ({
  value,
  onChange,
  onReset,
  resultCount,
  showStatusFilter = true,
  showReportTypeFilter = true,
  showServiceFilter = true,
  showPeriodFilter = true,
  className = "",
}: ReportFiltersProps) => {
  const update = <K extends keyof ReportFilterValues>(
    key: K,
    nextValue: ReportFilterValues[K],
  ) => {
    onChange({
      ...value,
      [key]: nextValue,
    });
  };

  const hasActiveFilters =
    value.search.trim() !== "" ||
    value.reportType !== "all" ||
    value.serviceType !== "all" ||
    value.status !== "all" ||
    value.period !== "all";

  const resetFilters = () => {
    if (onReset) {
      onReset();
      return;
    }

    onChange({
      search: "",
      reportType: "all",
      serviceType: "all",
      status: "all",
      period: "all",
    });
  };

  return (
    <section
      aria-label="Filter reports"
      className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 ${className}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E7F7FC] text-[#0087BD]">
            <SlidersHorizontal size={18} aria-hidden="true" />
          </span>

          <div>
            <h3 className="font-bold text-[#0C2340]">
              Find a report
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Narrow results by service, period, or report status.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {typeof resultCount === "number" && (
            <span
              className="text-sm text-slate-500"
              aria-live="polite"
            >
              <span className="font-semibold text-[#0C2340]">
                {resultCount}
              </span>{" "}
              {resultCount === 1 ? "result" : "results"}
            </span>
          )}

          <button
            type="button"
            onClick={resetFilters}
            disabled={!hasActiveFilters}
            className="inline-flex min-h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-[#0C2340] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RotateCcw size={15} aria-hidden="true" />
            Reset
          </button>
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="report-search"
          className="sr-only"
        >
          Search reports
        </label>

        <div className="relative">
          <Search
            size={18}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />

          <input
            id="report-search"
            type="search"
            value={value.search}
            onChange={(event) => update("search", event.target.value)}
            placeholder="Search by report title or description..."
            className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-[#0C2340] outline-none transition placeholder:text-slate-400 focus:border-[#00A3E0] focus:bg-white focus:ring-2 focus:ring-[#00A3E0]/15"
          />
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {showReportTypeFilter && (
          <div>
            <label
              htmlFor="report-type-filter"
              className={labelClassName}
            >
              Report type
            </label>

            <select
              id="report-type-filter"
              value={value.reportType}
              onChange={(event) =>
                update(
                  "reportType",
                  event.target.value as ReportFilterValues["reportType"],
                )
              }
              className={selectClassName}
            >
              <option value="all">All report types</option>
              {Object.entries(reportTypeLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        )}

        {showServiceFilter && (
          <div>
            <label
              htmlFor="report-service-filter"
              className={labelClassName}
            >
              Service
            </label>

            <select
              id="report-service-filter"
              value={value.serviceType}
              onChange={(event) =>
                update(
                  "serviceType",
                  event.target.value as ReportFilterValues["serviceType"],
                )
              }
              className={selectClassName}
            >
              <option value="all">All services</option>
              {serviceDefinitions.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {showStatusFilter && (
          <div>
            <label
              htmlFor="report-status-filter"
              className={labelClassName}
            >
              Status
            </label>

            <select
              id="report-status-filter"
              value={value.status}
              onChange={(event) =>
                update(
                  "status",
                  event.target.value as ReportFilterValues["status"],
                )
              }
              className={selectClassName}
            >
              <option value="all">All statuses</option>
              {Object.entries(reportStatusLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        )}

        {showPeriodFilter && (
          <div>
            <label
              htmlFor="report-period-filter"
              className={labelClassName}
            >
              Reporting period
            </label>

            <div className="relative">
              <CalendarDays
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />

              <select
                id="report-period-filter"
                value={value.period}
                onChange={(event) =>
                  update(
                    "period",
                    event.target.value as ReportFilterValues["period"],
                  )
                }
                className={`${selectClassName} pl-9`}
              >
                <option value="all">Any period</option>
                <option value="this-week">This week</option>
                <option value="this-month">This month</option>
                <option value="last-month">Last month</option>
                <option value="custom">Custom period</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#F7F9FC] px-3.5 py-3">
        <Filter
          size={15}
          className="mt-0.5 shrink-0 text-slate-400"
          aria-hidden="true"
        />
        <p className="text-xs leading-5 text-slate-500">
          Only reports permitted for the current viewer should be
          returned by the data source. Filtering the interface is not
          a substitute for server-side access control.
        </p>
      </div>
    </section>
  );
}
