
"use client";
import { useState } from "react";
import { CheckCircle2, ChevronDown, Clock3, FileCheck2, MinusCircle, XCircle } from "lucide-react";
import { formatServiceDate, getEffectiveServiceType, getServiceName } from "@/data/checklist";
import type { ChecklistItemStatus, ChecklistRecord } from "@/types/checklist";

type ChecklistResultsProps = {
  records: ChecklistRecord[];
};

const statusConfig: Record<
  ChecklistItemStatus,
  { label: string; className: string; icon: typeof CheckCircle2 }
> = {
  COMPLETED: {
    label: "Completed",
    className: "bg-emerald-50 text-emerald-700",
    icon: CheckCircle2,
  },
  NOT_COMPLETED: {
    label: "Not Completed",
    className: "bg-rose-50 text-rose-700",
    icon: XCircle,
  },
  NOT_APPLICABLE: {
    label: "Not Applicable",
    className: "bg-slate-100 text-slate-600",
    icon: MinusCircle,
  },
  PENDING_REVIEW: {
    label: "Pending Review",
    className: "bg-amber-50 text-amber-700",
    icon: Clock3,
  },
};

const submissionLabels = {
  SUBMITTED: "Submitted",
  PENDING_REVIEW: "Pending review",
  APPROVED: "Approved",
} as const;

export const ChecklistResults = ({records}: ChecklistResultsProps) => {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  function toggleRecord(id: string) {
    setExpandedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  return (
    <section aria-labelledby="checklist-results-title">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#007FAF]">
            Report records
          </p>

          <h2
            id="checklist-results-title"
            className="mt-2 text-xl font-bold tracking-tight text-[#0C2340] sm:text-2xl"
          >
            Checklist Results
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            View the recorded status of each applicable checklist item
            for the selected period and service.
          </p>
        </div>

        <p className="shrink-0 text-sm text-slate-500">
          {records.length} {records.length === 1 ? "record" : "records"}
        </p>
      </div>

      <div className="space-y-3">
        {records.map((record) => {
          const isExpanded = expandedIds.includes(record.id);
          const effectiveService = getEffectiveServiceType(record);
          const completed = record.items.filter(
            (item) => item.status === "COMPLETED",
          ).length;
          const incomplete = record.items.filter(
            (item) => item.status === "NOT_COMPLETED",
          ).length;

          return (
            <article
              key={record.id}
              className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
            >
              <button
                type="button"
                aria-expanded={isExpanded}
                onClick={() => toggleRecord(record.id)}
                className="flex w-full items-start gap-3 p-4 text-left transition hover:bg-slate-50/70 sm:items-center sm:gap-4 sm:p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00A3E0]/[0.08] text-[#007FAF]">
                  <FileCheck2 className="h-5 w-5" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-[#0C2340] sm:text-base">
                    {getServiceName(effectiveService)}
                  </span>

                  <span className="mt-1.5 block text-xs text-slate-500">
                    {formatServiceDate(record.serviceDate)}
                  </span>

                  <span className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                      {completed} completed
                    </span>

                    <span className="rounded-full bg-rose-50 px-2.5 py-1 text-[11px] font-semibold text-rose-700">
                      {incomplete} incomplete
                    </span>
                  </span>
                </span>

                <span className="flex shrink-0 items-center gap-2">
                  <span className="hidden rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 sm:inline-flex">
                    {submissionLabels[record.submissionStatus]}
                  </span>

                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </button>

              {isExpanded && (
                <div className="border-t border-slate-100 px-4 py-5 sm:px-5">
                  <div className="mb-4 flex flex-wrap gap-2 sm:hidden">
                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                      {submissionLabels[record.submissionStatus]}
                    </span>
                  </div>

                  {record.items.length > 0 ? (
                    <div className="space-y-3">
                      {record.items.map((item) => {
                        const config = statusConfig[item.status];
                        const StatusIcon = config.icon;

                        return (
                          <div
                            key={item.id}
                            className="rounded-xl border border-slate-100 bg-slate-50/70 p-4"
                          >
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                              <div className="min-w-0">
                                <h3 className="text-sm font-semibold text-[#0C2340]">
                                  {item.title}
                                </h3>

                                {item.requirement && (
                                  <p className="mt-1.5 text-xs leading-5 text-slate-500">
                                    {item.requirement}
                                  </p>
                                )}
                              </div>

                              <span
                                className={`inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold ${config.className}`}
                              >
                                <StatusIcon className="h-3.5 w-3.5" />
                                {config.label}
                              </span>
                            </div>

                            {item.notes && (
                              <p className="mt-3 border-t border-slate-200/70 pt-3 text-xs leading-5 text-slate-500">
                                <span className="font-semibold text-slate-700">
                                  Note:{" "}
                                </span>
                                {item.notes}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                      This record contains no checklist item details.
                    </p>
                  )}

                  {record.observations && (
                    <div className="mt-4 rounded-xl border-l-2 border-[#41B6E6] bg-[#F4FAFD] p-4">
                      <h3 className="text-sm font-semibold text-[#0C2340]">
                        Approved observations or notes
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {record.observations}
                      </p>
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
                    {record.submittedAt && (
                      <span>
                        Submitted: {formatServiceDate(record.submittedAt.slice(0, 10))}
                      </span>
                    )}

                    {record.reviewedAt && (
                      <span>
                        Reviewed: {formatServiceDate(record.reviewedAt.slice(0, 10))}
                      </span>
                    )}

                    {record.reviewedBy && (
                      <span>Reviewed by: {record.reviewedBy}</span>
                    )}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
