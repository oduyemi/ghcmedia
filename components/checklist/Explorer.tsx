"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarDays, CheckCircle2, Filter, Info, RotateCcw } from "lucide-react";
import { ReportingControls } from "./ReportingControls";
import { ServiceSelector } from "./ServiceSelector";
import { SummaryMetrics } from "./SummaryMetrics";
import { ChecklistResults } from "./Results";
import { ChecklistEmptyState } from "./EmptyState";
import { ChecklistCTA } from "./CTA";
import { getEffectiveServiceType, initialChecklistRecords } from "@/data/checklist";
import type { ChecklistRecord, ReportingPeriod, ServiceFilter } from "@/types/checklist";


type ChecklistExplorerProps = {records?: ChecklistRecord[]};

function getCurrentWeekValue() {
  const today = new Date();
  const date = new Date(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()),
  );

  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);

  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const week = Math.ceil(
    ((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  );

  return `${date.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

function getCurrentMonthValue() {
  const today = new Date();

  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
}

function getWeekRange(weekValue: string) {
  const match = /^(\d{4})-W(\d{2})$/.exec(weekValue);

  if (!match) return null;

  const year = Number(match[1]);
  const week = Number(match[2]);

  if (week < 1 || week > 53) return null;

  const jan4 = new Date(Date.UTC(year, 0, 4));
  const day = jan4.getUTCDay() || 7;
  const monday = new Date(jan4);

  monday.setUTCDate(jan4.getUTCDate() - day + 1 + (week - 1) * 7);

  const thursday = new Date(monday);
  thursday.setUTCDate(monday.getUTCDate() + 3);

  if (thursday.getUTCFullYear() !== year) return null;

  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);

  const format = (date: Date) => date.toISOString().slice(0, 10);

  return {
    start: format(monday),
    end: format(sunday),
  };
}

function getMonthRange(monthValue: string) {
  const match = /^(\d{4})-(\d{2})$/.exec(monthValue);

  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);

  if (month < 1 || month > 12) return null;

  const start = `${match[1]}-${match[2]}-01`;
  const lastDay = new Date(Date.UTC(year, month, 0))
    .toISOString()
    .slice(0, 10);

  return { start, end: lastDay };
}

export const ChecklistExplorer = ({
  records = initialChecklistRecords,
}: ChecklistExplorerProps) => {
  const shouldReduceMotion = useReducedMotion();

    const [period, setPeriod] = useState<ReportingPeriod>("weekly");
    const [service, setService] = useState<ServiceFilter>("ALL");
    const [selectedWeek, setSelectedWeek] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [datesInitialized, setDatesInitialized] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const resetFilters = useCallback(() => {
        setPeriod("weekly");
        setService("ALL");
        setSelectedWeek(getCurrentWeekValue());
        setSelectedMonth(getCurrentMonthValue());
        setStartDate("");
        setEndDate("");
        setDatesInitialized(true);
    }, []);

  const filteredRecords = useMemo(() => {
    let start = "";
    let end = "";
    if (!datesInitialized) return [];
    if (period === "weekly") {
        const range = getWeekRange(selectedWeek);
        if (!range) return [];
        start = range.start;
        end = range.end;
    }

    if (period === "monthly") {
      const range = getMonthRange(selectedMonth);
      if (!range) return [];
      start = range.start;
      end = range.end;
    }

    if (period === "custom") {
      if (!startDate || !endDate || startDate > endDate) {
        return [];
      }

      start = startDate;
      end = endDate;
    }

    return records.filter((record) => {
      if (record.serviceDate < start || record.serviceDate > end) {
        return false;
      }

      if (
        service !== "ALL" &&
        getEffectiveServiceType(record) !== service
      ) {
        return false;
      }

      return true;
    });
  }, [
    records,
    period,
    service,
    selectedWeek,
    selectedMonth,
    startDate,
    endDate,
  ]);

  const hasInvalidRange =
    period === "custom" &&
    Boolean(startDate && endDate && startDate > endDate);

  const hasIncompleteRange =
    period === "custom" && (!startDate || !endDate);

  const hasActiveFilters = service !== "ALL";

  const filterDescription = useMemo(() => {
    const serviceLabel =
      service === "ALL" ? "all services" : service.replace(/_/g, " ").toLowerCase();

    if (period === "weekly") {
      return `Weekly report · ${selectedWeek || "Select a week"} · ${serviceLabel}`;
    }

    if (period === "monthly") {
      return `Monthly report · ${selectedMonth || "Select a month"} · ${serviceLabel}`;
    }

    if (startDate && endDate) {
      return `Custom range · ${startDate} to ${endDate} · ${serviceLabel}`;
    }

    return `Custom date range · ${serviceLabel}`;
  }, [period, selectedWeek, selectedMonth, startDate, endDate, service]);

  useEffect(() => {
    if (period !== "custom" || !startDate || !endDate) return;

    // Leave invalid values visible so users can correct them.
  }, [period, startDate, endDate]);

  return (
        <div className="space-y-8 sm:space-y-10">
        <section
            id="reporting"
            aria-label="Report filters"
            className="scroll-mt-8"
        >
            <ReportingControls
            period={period}
            onPeriodChange={setPeriod}
            selectedWeek={selectedWeek}
            onWeekChange={setSelectedWeek}
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
            startDate={startDate}
            onStartDateChange={setStartDate}
            endDate={endDate}
            onEndDateChange={setEndDate}
            />
        </section>

        {/* Service selection */}
        <section aria-label="Filter by service">
            <ServiceSelector value={service} onChange={setService} />
        </section>

        {/* Summary */}
        <section aria-label="Checklist summary">
            <SummaryMetrics records={filteredRecords} />
        </section>

        {/* Results */}
        <section
            aria-label="Checklist report records"
            aria-busy={false}
            className="scroll-mt-8"
        >
            <div className="mb-5 flex items-start gap-3 rounded-2xl border border-[#00A3E0]/15 bg-gradient-to-r from-[#00A3E0]/[0.055] to-white p-4 sm:p-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#00A3E0]/10 bg-white text-[#007FAF] shadow-sm">
                <Info className="h-4 w-4" />
            </span>

            <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[#0C2340]">
                Understanding these reports
                </p>
                <p className="mt-1 text-xs leading-6 text-slate-600 sm:text-sm">
                Reports reflect available checklist records for the selected
                period and service. A missing record does not automatically
                mean a service requirement was not met.
                </p>
            </div>
            </div>

            {/* Current selection context */}
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
                <h2 className="text-lg font-bold tracking-tight text-[#0C2340] sm:text-xl">
                Checklist records
                </h2>
                <p className="mt-1 break-words text-xs leading-5 text-slate-500 sm:text-sm">
                {filterDescription}
                </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 self-start sm:self-center">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
                <CalendarDays className="h-3.5 w-3.5 text-[#007FAF]" />
                {filteredRecords.length}{" "}
                {filteredRecords.length === 1 ? "record" : "records"}
                </span>

                {hasActiveFilters && (
                <button
                    type="button"
                    onClick={resetFilters}
                    className="inline-flex h-8 items-center gap-1.5 rounded-full px-2.5 text-xs font-semibold text-[#007FAF] transition hover:bg-[#00A3E0]/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0]/40"
                    aria-label="Reset all reporting filters"
                >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset
                </button>
                )}
            </div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
            {!datesInitialized ? (
                <div
                    role="status"
                    className="rounded-2xl border border-slate-200 bg-white px-5 py-10 text-center"
                >
                    <p className="text-sm text-slate-500">
                    Preparing your checklist report…
                    </p>
                </div>
                ) : hasInvalidRange ? (
                    <motion.div
                        key="invalid-range"
                        role="alert"
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={shouldReduceMotion ? undefined : { opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900"
                        >
                            <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                            <div>
                                <p className="font-semibold">Check your date range</p>
                                <p className="mt-1 leading-6 text-amber-800">
                                The start date must be on or before the end date. Adjust
                                your selection to review the matching checklist records.
                                </p>
                            </div>
                            </motion.div>
                    ) : hasIncompleteRange ? (
                        <motion.div
                            key="incomplete-range"
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5"
                            >
                            <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-[#007FAF]" />
                            <div>
                                <p className="text-sm font-semibold text-[#0C2340]">
                                Choose your reporting dates
                                </p>
                                <p className="mt-1 text-sm leading-6 text-slate-500">
                                Select both a start date and an end date to display
                                records for a custom reporting period.
                                </p>
                            </div>
                        </motion.div>
                    ) : filteredRecords.length > 0 ? (
                        <motion.div
                        key="results"
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={shouldReduceMotion ? undefined : { opacity: 0, y: -5 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                        <ChecklistResults records={filteredRecords} />
                        </motion.div>
                    ) : (
                        <motion.div
                        key="empty"
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={shouldReduceMotion ? undefined : { opacity: 0, y: -5 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="space-y-4"
                        >
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Filter className="h-4 w-4 text-[#007FAF]" />
                            No records match the current selection.
                        </div>

                        <ChecklistEmptyState onReset={resetFilters} />
                        </motion.div>
                    )}
                    </AnimatePresence>

                    {filteredRecords.length > 0 && (
                    <p className="mt-4 flex items-center gap-2 text-xs leading-5 text-slate-400">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#00A859]" />
                        Results reflect recorded checklist information for this selection.
                    </p>
                    )}
        </section>

        <section className="mt-6">
            <ChecklistCTA
                service={service}
                serviceDate={
                period === "custom" && startDate && startDate === endDate
                    ? startDate
                    : undefined
                }
            />
        </section>
    </div>
  );
};
