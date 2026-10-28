"use client";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CalendarRange,
  FileText,
  MapPin,
  Sparkles,
  Star,
} from "lucide-react";
import type { ReactNode } from "react";

import type { SpecialProgramme } from "@/data/ratings";
import { SectionHeading } from "@/components/assessment/ratings/shared/Heading";
import { StatusBadge } from "@/components/assessment/ratings/shared/StatusBadge";

interface SpecialProgrammesProps {
  programmes?: SpecialProgramme[];
  onViewProgramme?: (programme: SpecialProgramme) => void;
  onViewReport?: (reportId: string) => void;
  showUnpublished?: boolean;
  loading?: boolean;
  className?: string;
}

const TIME_ZONE = "Africa/Lagos";

function parseDate(value: string): Date | null {
  if (!value?.trim()) return null;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(value: string): string {
  const date = parseDate(value);

  if (!date) return "Date to be confirmed";

  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: TIME_ZONE,
  }).format(date);
}

function dateKey(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const result = Object.fromEntries(
    parts.map(({ type, value }) => [type, value]),
  );

  return `${result.year}-${result.month}-${result.day}`;
}

function formatDateRange(startDate: string, endDate: string): string {
  const start = parseDate(startDate);
  const end = parseDate(endDate);

  if (!start && !end) return "Dates to be confirmed";
  if (start && !end) return formatDate(startDate);
  if (!start && end) return formatDate(endDate);

  if (dateKey(start!) === dateKey(end!)) {
    return formatDate(startDate);
  }

  return `${formatDate(startDate)} – ${formatDate(endDate)}`;
}

function ProgrammeDetail({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof CalendarDays;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#D9EDF6] bg-[#EFF9FD] text-[#0087BD]">
        <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
      </span>

      <div className="min-w-0 flex-1 pt-0.5">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
          {label}
        </p>
        <div className="mt-1 break-words text-sm font-medium leading-6 text-[#253D56]">
          {children}
        </div>
      </div>
    </div>
  );
}

function ProgrammeSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white"
    >
      <div className="h-48 animate-pulse bg-slate-200" />
      <div className="space-y-5 p-6">
        <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
        <div className="h-6 w-4/5 animate-pulse rounded-lg bg-slate-200" />
        <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
        <div className="border-t border-slate-100 pt-5">
          <div className="flex gap-3">
            <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-100" />
            <div className="flex-1 space-y-2 pt-1">
              <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />
              <div className="h-4 w-4/5 animate-pulse rounded bg-slate-200" />
            </div>
          </div>
        </div>
        <div className="h-12 animate-pulse rounded-xl bg-slate-100" />
      </div>
    </div>
  );
}

export const SpecialProgrammes = ({
  programmes = [],
  onViewProgramme,
  onViewReport,
  showUnpublished = false,
  loading = false,
  className = "",
}: SpecialProgrammesProps) => {
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = shouldReduceMotion ?? false;

  const visibleProgrammes = programmes
    .filter((programme) => {
      if (showUnpublished) return true;

      return (
        programme.visibility === "public" &&
        programme.status === "published"
      );
    })
    .sort((a, b) => {
      const first = parseDate(a.startDate)?.getTime() ?? 0;
      const second = parseDate(b.startDate)?.getTime() ?? 0;
      return second - first;
    });

  return (
    <section
      id="special-programmes"
      aria-labelledby="special-programmes-heading"
      className={`relative isolate mx-auto w-full max-w-7xl overflow-hidden px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24 ${className}`}
    >
      {/* Ambient colour behind the content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-24 -z-10 h-80 w-80 rounded-full bg-[#41B6E6]/[0.09] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 bottom-12 -z-10 h-80 w-80 rounded-full bg-[#FFC72C]/[0.08] blur-3xl"
      />

      <SectionHeading
        eyebrow="Beyond the regular service schedule"
        title="Special programmes"
        description="Some moments call for a gathering beyond the usual Sunday service. Explore the services, celebrations and special church gatherings captured by our media team, with reports that preserve the story behind each occasion."
      />

      {/* Celebratory introduction */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: reduceMotion ? 0 : 0.45 }}
        className="relative mt-9 overflow-hidden rounded-[1.75rem] bg-[#0C2340] shadow-[0_20px_60px_rgba(12,35,64,0.13)] sm:rounded-[2rem]"
      >
        {/* Decorative rings */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-28 h-80 w-80 rounded-full border border-white/[0.08]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 -top-16 h-56 w-56 rounded-full border border-white/[0.08]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 h-48 w-3/4 bg-gradient-to-tl from-[#00A3E0]/20 via-[#00A3E0]/[0.04] to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 left-[38%] h-52 w-52 rounded-full bg-[#00A3E0]/10 blur-3xl"
        />

        <div className="relative grid items-center gap-8 px-6 py-8 sm:px-9 sm:py-10 lg:grid-cols-[1fr_auto] lg:gap-12 lg:px-12 lg:py-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFC72C]/25 bg-[#FFC72C]/10 px-3.5 py-2 text-xs font-semibold tracking-wide text-[#FFD86B]">
              Every gathering has a story
            </div>

            <h3 className="mt-5 max-w-xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Beyond the ordinary.
              <span className="block text-[#41B6E6]">
                Moments worth remembering.
              </span>
            </h3>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
              From special services to church-wide celebrations, every
              gathering deserves thoughtful documentation. Discover the
              reports that bring these moments back into view.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-medium text-white/65">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#41B6E6]" />
                Special services
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FFC72C]" />
                Celebrations
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00A859]" />
                Approved reports
              </span>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="relative hidden h-44 w-44 items-center justify-center lg:flex"
          >
            <div className="absolute inset-0 rounded-full border border-white/10" />
            <div className="absolute inset-4 rounded-full border border-dashed border-[#41B6E6]/35" />
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-[#00A3E0]/25 to-[#FFC72C]/10" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-white/15 bg-white/[0.08] text-[#FFD86B] shadow-2xl shadow-black/10">
              <Sparkles size={38} strokeWidth={1.3} />
            </div>
            <Star
              size={19}
              className="absolute right-5 top-5 fill-[#FFC72C] text-[#FFC72C]"
            />
            <Star
              size={12}
              className="absolute bottom-7 left-4 fill-[#41B6E6] text-[#41B6E6]"
            />
          </div>
        </div>

        <div className="relative flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-white/[0.035] px-6 py-4 sm:px-9 lg:px-12">
          <p className="text-xs leading-5 text-white/60">
            A dedicated archive for services beyond the regular schedule.
          </p>

          {!loading && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-xs font-semibold text-white/85">
              <FileText size={14} className="text-[#41B6E6]" aria-hidden="true" />
              {visibleProgrammes.length}{" "}
              {visibleProgrammes.length === 1 ? "record" : "records"}
            </span>
          )}
        </div>
      </motion.div>

      {/* Programme collection */}
      <div className="mt-12 sm:mt-14">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0087BD]">
              The collection
            </p>
            <h3 className="mt-2 text-xl font-bold tracking-tight text-[#0C2340] sm:text-2xl">
              Explore the programmes
            </h3>
          </div>

          {!loading && visibleProgrammes.length > 0 && (
            <p className="text-xs leading-5 text-slate-500">
              Showing published programme records
            </p>
          )}
        </div>

        {loading ? (
          <div
            role="status"
            aria-live="polite"
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          >
            <span className="sr-only">Loading special programmes...</span>
            {Array.from({ length: 3 }).map((_, index) => (
              <ProgrammeSkeleton key={index} />
            ))}
          </div>
        ) : visibleProgrammes.length === 0 ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reduceMotion ? 0 : 0.35 }}
            className="relative overflow-hidden rounded-[1.75rem] border border-dashed border-[#C8DCE8] bg-white px-6 py-14 text-center sm:px-10 sm:py-16"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border border-[#00A3E0]/10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-16 -left-10 h-44 w-44 rounded-full border border-[#FFC72C]/15"
            />

            <h4 className="relative mt-3 text-xl font-bold tracking-tight text-[#0C2340] sm:text-2xl">
              {showUnpublished
                ? "Your special programme archive starts here"
                : "Special moments will find their place here"}
            </h4>

            <p className="relative mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
              {showUnpublished
                ? "Special programme records will appear here once they have been added to the archive."
                : "Published reports for special services and church gatherings will appear here after review and approval. Regular service reports remain in their dedicated section."}
            </p>
          </motion.div>
        ) : (
          <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {visibleProgrammes.map((programme, index) => {
              const hasReport = Boolean(programme.reportId && onViewReport);

              return (
                <motion.article
                  key={programme.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.4,
                    delay: reduceMotion ? 0 : Math.min(index * 0.06, 0.24),
                  }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_5px_25px_rgba(12,35,64,0.035)] transition duration-300 hover:-translate-y-1 hover:border-[#00A3E0]/40 hover:shadow-[0_20px_50px_rgba(12,35,64,0.10)]"
                >
                  {/* Distinctive card artwork, built with CSS */}
                  <div className="relative isolate min-h-[190px] overflow-hidden bg-[#0C2340] px-5 pb-6 pt-5 sm:px-6">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_90%_5%,rgba(0,163,224,0.30),transparent_43%),radial-gradient(ellipse_at_0%_100%,rgba(255,199,44,0.12),transparent_42%)]"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-12 -top-20 h-56 w-56 rounded-full border border-white/[0.10] transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-1 -top-10 h-40 w-40 rounded-full border border-white/[0.08]"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute right-8 top-12 h-24 w-24 rounded-full border border-dashed border-[#41B6E6]/20"
                    />

                    <div className="relative flex items-start justify-between gap-3">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.09] text-[#FFD86B] shadow-lg shadow-black/10 transition duration-300 group-hover:rotate-3 group-hover:scale-105">
                        <Sparkles size={24} strokeWidth={1.6} aria-hidden="true" />
                      </span>

                      <span className="max-w-[68%] rounded-full border border-[#FFC72C]/25 bg-[#FFC72C]/10 px-3 py-1.5 text-right text-[10px] font-bold tracking-wide text-[#FFE19A]">
                        {programme.category}
                      </span>
                    </div>

                    <div className="relative mt-7">
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#41B6E6]">
                        <span className="h-px w-5 bg-[#41B6E6]" />
                        Special service
                      </div>

                      <h4 className="mt-3 max-w-sm text-xl font-bold leading-snug tracking-tight text-white sm:text-[1.35rem]">
                        {programme.title}
                      </h4>
                    </div>

                    <Sparkles
                      aria-hidden="true"
                      size={16}
                      className="absolute bottom-5 right-6 text-white/40"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className="line-clamp-3 text-sm leading-7 text-slate-600">
                      {programme.description?.trim() ||
                        "Additional details about this special programme are not available."}
                    </p>

                    <div className="my-5 border-t border-slate-100" />

                    <div className="space-y-5">
                      <ProgrammeDetail
                        icon={CalendarRange}
                        label="Service date"
                      >
                        {formatDateRange(
                          programme.startDate,
                          programme.endDate,
                        )}
                      </ProgrammeDetail>

                      {programme.venue && (
                        <ProgrammeDetail icon={MapPin} label="Venue">
                          {programme.venue}
                        </ProgrammeDetail>
                      )}
                    </div>

                    {showUnpublished && (
                      <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                            Publication status
                          </span>
                          <StatusBadge status={programme.status} />
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-3 text-xs">
                          <span className="text-slate-500">Visibility</span>
                          <span className="font-semibold capitalize text-[#253D56]">
                            {programme.visibility}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="mt-auto pt-7">
                      {hasReport ? (
                        <button
                          type="button"
                          onClick={() => {
                            if (programme.reportId && onViewReport) {
                              onViewReport(programme.reportId);
                            }
                          }}
                          className="group/button inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0C2340] px-4 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-[#16395F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2"
                        >
                          View service report
                          <ArrowUpRight
                            size={17}
                            aria-hidden="true"
                            className="transition-transform duration-200 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5"
                          />
                        </button>
                      ) : onViewProgramme ? (
                        <button
                          type="button"
                          onClick={() => onViewProgramme(programme)}
                          className="group/button inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#0C2340] transition duration-200 hover:border-[#00A3E0]/50 hover:bg-[#F2FAFD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2"
                        >
                          View programme details
                          <ArrowRight
                            size={17}
                            aria-hidden="true"
                            className="transition-transform duration-200 group-hover/button:translate-x-1"
                          />
                        </button>
                      ) : (
                        <div className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-500">
                          <FileText size={16} aria-hidden="true" />
                          Service report information
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
