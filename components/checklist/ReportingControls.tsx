"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarDays, CalendarRange, Check, ChevronRight, Clock3 } from "lucide-react";
import type { ReportingPeriod } from "@/types/checklist";


type ReportingControlsProps = {
  period: ReportingPeriod;
  onPeriodChange: (period: ReportingPeriod) => void;
  selectedWeek: string;
  onWeekChange: (value: string) => void;
  selectedMonth: string;
  onMonthChange: (value: string) => void;
  startDate: string;
  onStartDateChange: (value: string) => void;
  endDate: string;
  onEndDateChange: (value: string) => void;
};

const periods: {
  value: ReportingPeriod;
  label: string;
  description: string;
  icon: typeof CalendarDays;
  eyebrow: string;
}[] = [
  {
    value: "weekly",
    label: "Weekly",
    description: "Review a single service week.",
    icon: CalendarDays,
    eyebrow: "7-day view",
  },
  {
    value: "monthly",
    label: "Monthly",
    description: "Review a complete calendar month.",
    icon: CalendarRange,
    eyebrow: "Monthly view",
  },
  {
    value: "custom",
    label: "Custom range",
    description: "Choose a specific date range.",
    icon: Clock3,
    eyebrow: "Flexible dates",
  },
];

const inputClassName =
  "mt-2.5 block h-12 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-[#0C2340] shadow-sm shadow-slate-900/[0.02] outline-none transition duration-200 hover:border-slate-300 focus:border-[#00A3E0] focus:ring-4 focus:ring-[#00A3E0]/10";

export const ReportingControls = ({
  period,
  onPeriodChange,
  selectedWeek,
  onWeekChange,
  selectedMonth,
  onMonthChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
}: ReportingControlsProps) => {
  const shouldReduceMotion = useReducedMotion();

  const invalidRange = Boolean(
    startDate && endDate && startDate > endDate,
  );

  const rangeIncomplete =
    period === "custom" && (!startDate || !endDate);

  const selectedPeriod = periods.find(
    (option) => option.value === period,
  );

  return (
    <section
      aria-labelledby="reporting-period-title"
      className="group relative isolate overflow-hidden rounded-[26px] border border-slate-200/80 bg-white shadow-[0_20px_65px_-45px_rgba(12,35,64,0.28)] sm:rounded-[30px]"
    >
      {/* Subtle decorative atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#41B6E6]/[0.08] blur-3xl transition-transform duration-700 group-hover:translate-y-2" />
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#00A3E0]/30 to-transparent" />
      </div>

      <div className="p-5 sm:p-7 lg:p-8">
        {/* Heading */}
        <div className="flex items-start gap-4">
          <motion.div
            whileHover={
              shouldReduceMotion ? undefined : { rotate: -5, scale: 1.04 }
            }
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0C2340] text-white shadow-lg shadow-[#0C2340]/10 sm:h-14 sm:w-14"
          >
            <CalendarRange className="h-5 w-5 sm:h-6 sm:w-6" />
          </motion.div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#007FAF] sm:text-[11px]">
                Reporting period
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                Filter records
              </span>
            </div>

            <h2
              id="reporting-period-title"
              className="mt-2 text-xl font-bold tracking-[-0.03em] text-[#0C2340] sm:text-2xl"
            >
              Choose your reporting view
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:leading-7">
              Narrow your checklist records to the period you want to
              review. Your selection determines the reporting timeframe.
            </p>
          </div>
        </div>

        {/* Period selection */}
        <div className="mt-7">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="text-xs font-bold text-[#0C2340]">
              Select a timeframe
            </h3>
            <span className="text-[10px] font-medium text-slate-400">
              Choose one
            </span>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {periods.map((option) => {
              const active = period === option.value;
              const Icon = option.icon;

              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onPeriodChange(option.value)}
                  className={`group/period relative flex min-h-[132px] flex-col overflow-hidden rounded-2xl border p-4 text-left outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2 sm:p-5 ${
                    active
                      ? "border-[#00A3E0]/50 bg-[#00A3E0]/[0.055]"
                      : "border-slate-200/80 bg-white hover:border-[#00A3E0]/35 hover:bg-slate-50/80"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="reporting-period-indicator"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : {
                              type: "spring",
                              stiffness: 340,
                              damping: 30,
                            }
                      }
                      className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#007FAF] via-[#00A3E0] to-[#41B6E6]"
                    />
                  )}

                  <div className="flex w-full items-start justify-between gap-3">
                    <motion.span
                      animate={
                        shouldReduceMotion
                          ? undefined
                          : { scale: active ? 1.04 : 1 }
                      }
                      className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200 ${
                        active
                          ? "bg-[#00A3E0]/10 text-[#007FAF]"
                          : "bg-slate-100 text-slate-500 group-hover/period:bg-[#00A3E0]/[0.07] group-hover/period:text-[#007FAF]"
                      }`}
                    >
                      <Icon className="h-[19px] w-[19px]" />
                    </motion.span>

                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors duration-200 ${
                        active
                          ? "border-[#00A3E0] bg-[#00A3E0] text-white"
                          : "border-slate-300 bg-white text-transparent"
                      }`}
                    >
                      {active && (
                        <Check className="h-3 w-3" strokeWidth={3} />
                      )}
                    </span>
                  </div>

                  <span className="mt-4 flex items-center gap-2 text-sm font-bold text-[#0C2340]">
                    {option.label}
                    {active && (
                      <motion.span
                        initial={shouldReduceMotion ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="rounded-full bg-[#00A3E0]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#007FAF]"
                      >
                        Active
                      </motion.span>
                    )}
                  </span>

                  <span className="mt-1 text-xs leading-5 text-slate-500">
                    {option.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Date selector */}
        <div className="mt-6 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#007FAF] shadow-sm">
              <CalendarDays className="h-4 w-4" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-bold text-[#0C2340]">
                  Choose your dates
                </h3>
                {selectedPeriod && (
                  <span className="rounded-full border border-[#00A3E0]/15 bg-white px-2.5 py-1 text-[10px] font-semibold text-[#007FAF]">
                    {selectedPeriod.eyebrow}
                  </span>
                )}
              </div>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                {period === "weekly" &&
                  "Select a week to review records from Monday through Sunday."}
                {period === "monthly" &&
                  "Select a month to review its complete calendar period."}
                {period === "custom" &&
                  "Set a start and end date to define your reporting window."}
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={period}
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: 8 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                shouldReduceMotion
                  ? undefined
                  : { opacity: 0, y: -5 }
              }
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="mt-5"
            >
              {period === "weekly" && (
                <div className="max-w-sm">
                  <label
                    htmlFor="report-week"
                    className="text-xs font-semibold text-[#0C2340]"
                  >
                    Select week
                  </label>

                  <input
                    id="report-week"
                    type="week"
                    value={selectedWeek}
                    onChange={(event) =>
                      onWeekChange(event.target.value)
                    }
                    className={inputClassName}
                  />

                  <p className="mt-2 text-[11px] leading-5 text-slate-400">
                    The reporting week runs from Monday to Sunday.
                  </p>
                </div>
              )}

              {period === "monthly" && (
                <div className="max-w-sm">
                  <label
                    htmlFor="report-month"
                    className="text-xs font-semibold text-[#0C2340]"
                  >
                    Select month
                  </label>

                  <input
                    id="report-month"
                    type="month"
                    value={selectedMonth}
                    onChange={(event) =>
                      onMonthChange(event.target.value)
                    }
                    className={inputClassName}
                  />

                  <p className="mt-2 text-[11px] leading-5 text-slate-400">
                    Includes the entire selected calendar month.
                  </p>
                </div>
              )}

              {period === "custom" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="report-start"
                      className="text-xs font-semibold text-[#0C2340]"
                    >
                      Start date
                    </label>

                    <input
                      id="report-start"
                      type="date"
                      value={startDate}
                      max={endDate || undefined}
                      onChange={(event) =>
                        onStartDateChange(event.target.value)
                      }
                      aria-invalid={invalidRange}
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="report-end"
                      className="text-xs font-semibold text-[#0C2340]"
                    >
                      End date
                    </label>

                    <input
                      id="report-end"
                      type="date"
                      value={endDate}
                      min={startDate || undefined}
                      onChange={(event) =>
                        onEndDateChange(event.target.value)
                      }
                      aria-invalid={invalidRange}
                      className={inputClassName}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence initial={false}>
            {invalidRange && (
              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                role="alert"
                className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs leading-5 text-red-700"
              >
                The start date must be on or before the end date.
              </motion.p>
            )}

            {!invalidRange && rangeIncomplete && (
              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-3 flex items-center gap-2 text-xs text-amber-700"
              >
                Choose both dates to complete your reporting range.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-[11px] leading-5 text-slate-400">
            <ShieldCheckIcon />
            Reports reflect recorded checklist results.
          </p>

          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#007FAF]">
            <span>Reporting filters</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </section>
  );
};

function ShieldCheckIcon() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00A859]/10 text-[#00A859]">
      <Check className="h-3 w-3" strokeWidth={2.5} />
    </span>
  );
}
