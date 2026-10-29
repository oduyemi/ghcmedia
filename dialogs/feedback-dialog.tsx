"use client";
import { useCallback, useEffect, useState } from "react";
import {AlertCircle, CheckCircle2, LoaderCircle, MessageSquareText, Send, X} from "lucide-react";


interface FeedbackItem {
  id: string;
  message: string;
  status: "VISIBLE" | "HIDDEN";
  createdAt: string;
  author: {
    firstName: string;
    lastName: string;
  } | null;
}

interface FeedbackResponse {
  success?: boolean;
  message?: string;
  data?: {
    feedback: FeedbackItem[];
    pagination: {
      page: number;
      total: number;
      totalPages: number;
      hasNextPage: boolean;
    };
  };
}

interface ReportFeedbackDialogProps {
  reportId: string;
  reportTitle: string;
  open: boolean;
  onClose: () => void;
}

const formatFeedbackDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Africa/Lagos",
  }).format(date);
};

export const ReportFeedbackDialog = ({
  reportId,
  reportTitle,
  open,
  onClose,
}: ReportFeedbackDialogProps) => {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const loadFeedback = useCallback(
    async (signal?: AbortSignal) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/report-feedback/${encodeURIComponent(reportId)}?page=1&limit=20`,
          {
            method: "GET",
            credentials: "same-origin",
            cache: "no-store",
            signal,
            headers: { Accept: "application/json" },
          },
        );

        const data = (await response.json()) as FeedbackResponse;

        if (!response.ok || !data.success || !data.data) {
          throw new Error(
            data.message ?? "Unable to load feedback for this report.",
          );
        }

        setFeedback(data.data.feedback);
        setTotal(data.data.pagination.total);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;

        setError(
          err instanceof Error ? err.message : "Unable to load feedback.",
        );
      } finally {
        if (!signal?.aborted) setLoading(false);
      }
    },
    [reportId],
  );

  useEffect(() => {
    if (!open) return;

    const controller = new AbortController();
    void loadFeedback(controller.signal);

    return () => controller.abort();
  }, [open, loadFeedback]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !submitting) onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, submitting, onClose]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (trimmedMessage.length < 3 || trimmedMessage.length > 3000) {
      setError("Feedback must contain between 3 and 3000 characters.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/report-feedback", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reportId,
          message: trimmedMessage,
        }),
      });

      const data = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ?? "Unable to submit your feedback.",
        );
      }

      setMessage("");
      setSuccess("Your feedback has been submitted successfully.");
      await loadFeedback();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit your feedback.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-[#0C2340]/60 p-0 backdrop-blur-sm sm:items-center sm:p-4 md:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !submitting) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-feedback-title"
        aria-describedby="report-feedback-description"
        className="flex max-h-[94dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[1.5rem] bg-white shadow-2xl sm:max-h-[90dvh] sm:rounded-[1.5rem] lg:max-h-[88dvh]"
      >
        <header className="relative shrink-0 overflow-hidden bg-[#0C2340] px-5 py-5 text-white sm:px-7 sm:py-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full border border-white/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 right-20 h-36 w-36 rounded-full border border-[#41B6E6]/10"
          />

          <div className="relative flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#41B6E6]/25 bg-[#41B6E6]/10 px-3 py-1.5 text-xs font-semibold text-[#8CDEFA]">
                <MessageSquareText
                  size={14}
                  className="shrink-0"
                  aria-hidden="true"
                />
                <span>Community feedback</span>
              </span>

              <h2
                id="report-feedback-title"
                className="mt-4 text-xl font-bold tracking-tight sm:text-2xl"
              >
                Share your feedback
              </h2>

              <p
                id="report-feedback-description"
                className="mt-2 max-w-lg break-words text-sm leading-6 text-white/70"
              >
                {reportTitle}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              aria-label="Close feedback dialog"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#41B6E6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C2340] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X size={19} aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="min-h-0 flex-1 space-y-6 overflow-y-auto overscroll-contain p-4 sm:p-6 md:p-7">
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="space-y-1.5">
              <label
                htmlFor="report-feedback-message"
                className="block text-sm font-bold text-[#0C2340]"
              >
                Your comments
              </label>

              <p className="text-xs leading-5 text-slate-500">
                Tell us what you think about this service report.
              </p>
            </div>

            <textarea
              id="report-feedback-message"
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
                setError(null);
                setSuccess(null);
              }}
              minLength={3}
              maxLength={3000}
              required
              rows={5}
              aria-invalid={Boolean(error)}
              aria-describedby="report-feedback-hint report-feedback-count"
              placeholder="Share your thoughts about this service report..."
              className="min-h-32 w-full resize-y rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 py-3.5 text-sm leading-6 text-[#0C2340] outline-none transition placeholder:text-slate-400 focus:border-[#00A3E0] focus:bg-white focus:ring-4 focus:ring-[#00A3E0]/10 sm:min-h-36"
            />

            <div className="flex flex-col gap-1.5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <span id="report-feedback-hint" className="leading-5">
                Keep your feedback respectful and constructive.
              </span>

              <span
                id="report-feedback-count"
                className={`shrink-0 self-end tabular-nums sm:self-auto ${
                  message.length >= 2800 ? "font-semibold text-amber-700" : "text-slate-400"
                }`}
                aria-live="polite"
              >
                {message.length.toLocaleString()}/3,000
              </span>
            </div>

            {error && (
              <div
                role="alert"
                className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700"
              >
                <AlertCircle
                  size={17}
                  className="mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <p className="min-w-0 break-words leading-5">{error}</p>
              </div>
            )}

            {success && (
              <div
                role="status"
                className="flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-3 text-sm text-emerald-800"
              >
                <CheckCircle2
                  size={17}
                  className="mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <p className="min-w-0 break-words leading-5">{success}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={
                submitting ||
                message.trim().length < 3 ||
                message.trim().length > 3000
              }
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0C2340] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#16395F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-55"
            >
              {submitting ? (
                <>
                  <LoaderCircle
                    size={17}
                    className="shrink-0 animate-spin"
                    aria-hidden="true"
                  />
                  <span>Submitting feedback...</span>
                </>
              ) : (
                <>
                  <Send size={16} className="shrink-0" aria-hidden="true" />
                  <span>Submit feedback</span>
                </>
              )}
            </button>
          </form>

          <div className="border-t border-slate-100 pt-5 sm:pt-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-[#0C2340]">
                  Community responses
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {total.toLocaleString()}{" "}
                  {total === 1 ? "response" : "responses"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => void loadFeedback()}
                disabled={loading}
                className="inline-flex min-h-9 w-full items-center justify-center gap-2 self-start rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-[#087FAD] transition-colors hover:bg-[#EAF7FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:self-auto"
              >
                {loading && (
                  <LoaderCircle
                    size={14}
                    className="animate-spin"
                    aria-hidden="true"
                  />
                )}
                {loading ? "Refreshing..." : "Refresh responses"}
              </button>
            </div>

            {loading ? (
              <div role="status" className="mt-5 space-y-3">
                {[0, 1].map((item) => (
                  <div
                    key={item}
                    className="animate-pulse rounded-xl border border-slate-100 p-4"
                  >
                    <div className="h-3 w-28 rounded bg-slate-200" />
                    <div className="mt-3 h-3 w-full rounded bg-slate-100" />
                    <div className="mt-2 h-3 w-3/4 rounded bg-slate-100" />
                  </div>
                ))}
                <span className="sr-only">Loading feedback...</span>
              </div>
            ) : feedback.length === 0 ? (
              <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center sm:px-6">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FC] text-[#087FAD]">
                  <MessageSquareText size={22} aria-hidden="true" />
                </div>

                <p className="mt-3 text-sm font-semibold text-[#0C2340]">
                  No feedback yet
                </p>

                <p className="mx-auto mt-1 max-w-xs text-xs leading-5 text-slate-500">
                  Be the first to share constructive feedback on this report.
                </p>
              </div>
            ) : (
              <ul className="mt-4 space-y-3">
                {feedback.map((item) => {
                  const authorName = item.author
                    ? `${item.author.firstName} ${item.author.lastName}`.trim()
                    : "Community member";

                  return (
                    <li
                      key={item.id}
                      className="rounded-2xl border border-slate-100 bg-[#F8FAFC] p-3.5 transition-colors hover:border-slate-200 sm:p-4"
                    >
                      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                        <p className="min-w-0 break-words text-sm font-semibold text-[#0C2340]">
                          {authorName || "Community member"}
                        </p>

                        <time
                          dateTime={item.createdAt}
                          className="shrink-0 text-[11px] leading-5 text-slate-400 sm:text-right"
                        >
                          {formatFeedbackDate(item.createdAt)}
                        </time>
                      </div>

                      <p className="mt-3 whitespace-pre-wrap break-words [overflow-wrap:anywhere] text-sm leading-6 text-slate-600">
                        {item.message}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
