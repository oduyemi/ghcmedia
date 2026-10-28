"use client";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarDays, CheckCircle2, ClipboardList, FileBarChart2, LockKeyhole, X } from "lucide-react";
import { reportStatusLabels, reportTypeLabels, serviceDefinitions, type ServiceReport } from "@/data/ratings";
import {StatusBadge} from "@/components/assessment/ratings/shared/StatusBadge";

interface ReportDetailDialogProps {
  report: ServiceReport | null;
  open: boolean;
  onClose: () => void;
  publicOnly?: boolean;
}

function formatDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Lagos",
  }).format(date);
}

function getServiceName(serviceType?: ServiceReport["serviceType"]) {
  if (!serviceType) return "General report";

  return (
    serviceDefinitions.find((service) => service.id === serviceType)?.name ??
    "Service report"
  );
}

export default function ReportDetailDialog({
  report,
  open,
  onClose,
  publicOnly = true,
}: ReportDetailDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = shouldReduceMotion ?? false;

  const canDisplayReport =
    !!report &&
    (!publicOnly ||
      (report.visibility === "public" && report.status === "published"));

  useEffect(() => {
    if (!open || !canDisplayReport) return;

    const previousActiveElement = document.activeElement as HTMLElement | null;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";

      previousActiveElement?.focus();
    };
  }, [open, canDisplayReport, onClose]);

  if (!open || !report || !canDisplayReport) return null;

  const score = report.summary.approvedAverageRating;
  const completion = report.summary.checklistCompletionPercentage;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="report-detail-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-[#071629]/70 p-0 backdrop-blur-sm sm:items-center sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-dialog-title"
            aria-describedby="report-dialog-description"
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 24, scale: 0.985 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 16, scale: 0.99 }
            }
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            className="relative max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:max-h-[88vh] sm:rounded-3xl"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-slate-100 bg-white/95 px-5 py-4 backdrop-blur sm:px-7">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#0C2340]">
                <FileBarChart2
                  size={18}
                  className="text-[#00A3E0]"
                  aria-hidden="true"
                />
                Report details
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close report details"
                className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-[#0C2340] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0]"
              >
                <X size={19} aria-hidden="true" />
              </button>
            </div>

            <div className="p-5 sm:p-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#E7F7FC] px-3 py-1.5 text-xs font-semibold text-[#087FAD]">
                  {reportTypeLabels[report.reportType]}
                </span>
                <StatusBadge status={report.status} />
              </div>

              <h2
                id="report-dialog-title"
                className="mt-5 text-2xl font-bold leading-tight tracking-tight text-[#0C2340] sm:text-3xl"
              >
                {report.title}
              </h2>

              <p
                id="report-dialog-description"
                className="mt-3 max-w-2xl text-sm leading-7 text-slate-600"
              >
                {report.approvedPublicSummary ||
                  "No approved public summary has been provided for this report."}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-xl border border-slate-200 p-4">
                  <CalendarDays
                    size={18}
                    className="mt-0.5 shrink-0 text-[#00A3E0]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Report date
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#0C2340]">
                      {formatDate(report.date)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-slate-200 p-4">
                  <ClipboardList
                    size={18}
                    className="mt-0.5 shrink-0 text-[#00A3E0]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Service
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#0C2340]">
                      {getServiceName(report.serviceType)}
                    </p>
                  </div>
                </div>
              </div>

              <section className="mt-8" aria-labelledby="report-metrics-heading">
                <h3
                  id="report-metrics-heading"
                  className="text-base font-bold text-[#0C2340]"
                >
                  Report metrics
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-[#F7F9FC] p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Approved average rating
                    </p>
                    <p className="mt-3 text-3xl font-bold tracking-tight text-[#0C2340]">
                      {typeof score === "number" && Number.isFinite(score)
                        ? `${score.toFixed(1)}%`
                        : "—"}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {typeof score === "number"
                        ? "Recorded in the report"
                        : "No approved rating available"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#F7F9FC] p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Checklist completion
                    </p>
                    <p className="mt-3 text-3xl font-bold tracking-tight text-[#0C2340]">
                      {typeof completion === "number" &&
                      Number.isFinite(completion)
                        ? `${completion}%`
                        : "—"}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {typeof completion === "number"
                        ? "Recorded in the report"
                        : "No completion figure available"}
                    </p>
                  </div>
                </div>
              </section>

              <section className="mt-8" aria-labelledby="report-highlights-heading">
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={19}
                    className="text-[#008A4B]"
                    aria-hidden="true"
                  />
                  <h3
                    id="report-highlights-heading"
                    className="text-base font-bold text-[#0C2340]"
                  >
                    Highlights and observations
                  </h3>
                </div>

                {report.highlights.length > 0 ? (
                  <ul className="mt-4 space-y-3">
                    {report.highlights.map((highlight) => (
                      <li
                        key={highlight.id}
                        className="rounded-xl border border-slate-200 p-4"
                      >
                        {highlight.category && (
                          <p className="text-[11px] font-bold uppercase tracking-wide text-[#0087BD]">
                            {highlight.category}
                          </p>
                        )}
                        <p className="font-semibold text-[#0C2340]">
                          {highlight.title}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          {highlight.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-4 rounded-xl border border-dashed border-slate-300 px-4 py-6 text-center">
                    <p className="text-sm text-slate-500">
                      No highlights have been added to this report.
                    </p>
                  </div>
                )}
              </section>

              <div className="mt-8 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <LockKeyhole
                  size={17}
                  className="mt-0.5 shrink-0 text-slate-500"
                  aria-hidden="true"
                />
                <p className="text-xs leading-5 text-slate-500">
                  Only approved information should be published. Detailed
                  assessor notes, private feedback, and identifiable team
                  member information must remain restricted unless access
                  is explicitly authorized.
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0C2340] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#16395F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2"
                >
                  Close report
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
