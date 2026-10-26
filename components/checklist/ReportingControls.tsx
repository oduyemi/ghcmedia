
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
}[] = [
  {
    value: "weekly",
    label: "Weekly",
    description: "Review one selected week.",
  },
  {
    value: "monthly",
    label: "Monthly",
    description: "Compare records across a month.",
  },
  {
    value: "custom",
    label: "Custom range",
    description: "Choose your own dates.",
  },
];

const inputClassName =
  "mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-[#0C2340] outline-none transition focus:border-[#00A3E0] focus:ring-4 focus:ring-[#00A3E0]/10";

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
  const invalidRange = Boolean(
    startDate && endDate && startDate > endDate,
  );

  return (
    <section
      aria-labelledby="reporting-period-title"
      className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6"
    >
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#007FAF]">
          Reporting period
        </p>

        <h2
          id="reporting-period-title"
          className="mt-2 text-xl font-bold tracking-tight text-[#0C2340]"
        >
          Choose your reporting view
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Choose how you would like to review the checklist results.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {periods.map((option) => {
          const active = period === option.value;

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => onPeriodChange(option.value)}
              className={`rounded-xl border p-4 text-left transition ${
                active
                  ? "border-[#00A3E0] bg-[#00A3E0]/[0.06] ring-2 ring-[#00A3E0]/10"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-[#0C2340]">
                  {option.label}
                </span>

                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                    active
                      ? "border-[#00A3E0]"
                      : "border-slate-300"
                  }`}
                >
                  {active && (
                    <span className="h-2 w-2 rounded-full bg-[#00A3E0]" />
                  )}
                </span>
              </span>

              <span className="mt-2 block text-xs leading-5 text-slate-500">
                {option.description}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 border-t border-slate-100 pt-5">
        {period === "weekly" && (
          <div className="max-w-sm">
            <label
              htmlFor="report-week"
              className="text-sm font-semibold text-[#0C2340]"
            >
              Select week
            </label>

            <input
              id="report-week"
              type="week"
              value={selectedWeek}
              onChange={(event) => onWeekChange(event.target.value)}
              className={inputClassName}
            />

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Results will cover Monday through Sunday of the selected week.
            </p>
          </div>
        )}

        {period === "monthly" && (
          <div className="max-w-sm">
            <label
              htmlFor="report-month"
              className="text-sm font-semibold text-[#0C2340]"
            >
              Select month
            </label>

            <input
              id="report-month"
              type="month"
              value={selectedMonth}
              onChange={(event) => onMonthChange(event.target.value)}
              className={inputClassName}
            />

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Results will cover the entire selected calendar month.
            </p>
          </div>
        )}

        {period === "custom" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="report-start"
                className="text-sm font-semibold text-[#0C2340]"
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
                className={inputClassName}
              />
            </div>

            <div>
              <label
                htmlFor="report-end"
                className="text-sm font-semibold text-[#0C2340]"
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
                className={inputClassName}
              />
            </div>
          </div>
        )}

        {invalidRange && (
          <p role="alert" className="mt-3 text-sm text-red-600">
            The start date must be on or before the end date.
          </p>
        )}
      </div>
    </section>
  );
}
