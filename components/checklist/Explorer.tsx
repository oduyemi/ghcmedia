
"use client";
import { useEffect, useMemo, useState } from "react";
import { Filter, Info } from "lucide-react";
import {ReportingControls} from "./ReportingControls";
import {ServiceSelector} from "./ServiceSelector";
import {SummaryMetrics} from "./SummaryMetrics";
import {ChecklistResults} from "./Results";
import {ChecklistEmptyState} from "./EmptyState";
import { getEffectiveServiceType, initialChecklistRecords } from "@/data/checklist";
import type { ChecklistRecord, ReportingPeriod, ServiceFilter } from "@/types/checklist";
import { ChecklistCTA } from "./CTA";


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
  const [period, setPeriod] = useState<ReportingPeriod>("weekly");
  const [service, setService] = useState<ServiceFilter>("ALL");

  const [selectedWeek, setSelectedWeek] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const today = new Date();

    setSelectedWeek(getCurrentWeekValue());
    setSelectedMonth(
      `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`,
    );
  }, []);

  const filteredRecords = useMemo(() => {
    let start = "";
    let end = "";

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

  function resetFilters() {
    setPeriod("weekly");
    setService("ALL");
    setSelectedWeek(getCurrentWeekValue());

    const today = new Date();

    setSelectedMonth(
      `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`,
    );

    setStartDate("");
    setEndDate("");
  }

  const hasInvalidRange =
    period === "custom" &&
    Boolean(startDate && endDate && startDate > endDate);

  return (
    <div className="space-y-10">
      <section id="reporting" className="scroll-mt-8">
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

      <ServiceSelector value={service} onChange={setService} />

      <SummaryMetrics records={filteredRecords} />

      <section aria-label="Checklist report records">
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-sky-100 bg-sky-50/70 p-4">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#007FAF]" />

          <p className="text-xs leading-6 text-slate-600">
            Reports reflect available checklist records for the selected
            period and service. A missing record does not automatically
            mean that a service requirement was not met.
          </p>
        </div>

        
        {hasInvalidRange ? (
          <div
            role="alert"
            className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800"
          >
            Choose a valid date range before reviewing the results.
          </div>
        ) : filteredRecords.length > 0 ? (
          <ChecklistResults records={filteredRecords} />
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Filter className="h-4 w-4" />
              Showing records for the selected filters
            </div>

            <ChecklistEmptyState onReset={resetFilters} />
          </div>
        )}
      </section>

      <ChecklistCTA
        service={service}
        serviceDate={
          period === "custom" && startDate && startDate === endDate
            ? startDate
            : undefined
        }
      />
    </div>
  );
};

      