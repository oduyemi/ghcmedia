import { Activity, CheckCircle2, ClipboardList, Percent } from "lucide-react";
  import type { ChecklistRecord } from "@/types/checklist";
  
  type SummaryMetricsProps = {
    records: ChecklistRecord[];
  };
  
  export const SummaryMetrics = ({
    records,
  }: SummaryMetricsProps) => {
    const items = records.flatMap((record) => record.items);
  
    const completed = items.filter(
      (item) => item.status === "COMPLETED",
    ).length;
  
    const incomplete = items.filter(
      (item) => item.status === "NOT_COMPLETED",
    ).length;
  
    const applicableItems = completed + incomplete;
  
    const completionRate =
      applicableItems > 0
        ? Math.round((completed / applicableItems) * 100)
        : 0;
  
    const recordedServices = new Set(
      records.map(
        (record) => `${record.serviceDate}:${record.serviceType}`,
      ),
    ).size;
  
    const metrics = [
      {
        label: "Completed items",
        value: completed,
        description: "Marked as completed",
        icon: CheckCircle2,
        iconClass: "bg-emerald-50 text-emerald-700",
      },
      {
        label: "Incomplete items",
        value: incomplete,
        description: "Explicitly marked incomplete",
        icon: ClipboardList,
        iconClass: "bg-amber-50 text-amber-700",
      },
      {
        label: "Completion rate",
        value: `${completionRate}%`,
        description: "Completed of applicable items",
        icon: Percent,
        iconClass: "bg-sky-50 text-sky-700",
      },
      {
        label: "Recorded services",
        value: recordedServices,
        description: "Services with checklist records",
        icon: Activity,
        iconClass: "bg-violet-50 text-violet-700",
      },
    ];
  
    return (
      <section aria-label="Checklist summary">
        <div className="mb-4">
          <h2 className="text-xl font-bold tracking-tight text-[#0C2340] mt-4">
            Checklist overview
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            A summary of recorded results for your current selection.
          </p>
        </div>
  
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
  
            return (
              <article
                key={metric.label}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium text-slate-500">
                    {metric.label}
                  </p>
  
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${metric.iconClass}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
  
                <p className="mt-4 text-3xl font-bold tracking-tight text-[#0C2340] tabular-nums">
                  {metric.value}
                </p>
  
                <p className="mt-1 text-xs text-slate-500">
                  {metric.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
  