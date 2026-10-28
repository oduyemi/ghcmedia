
"use client";
import { motion, useReducedMotion } from "framer-motion";
import {
  Award,
  CheckCircle2,
  CircleHelp,
  Gauge,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { ratingBands } from "@/data/ratings";
import { SectionHeading } from "@/components/assessment/ratings/shared/Heading";

interface RatingBandsProps {
  showDescriptions?: boolean;
  compact?: boolean;
  className?: string;
}

const bandIcons = [
  Award,
  Sparkles,
  CheckCircle2,
  Gauge,
  CircleHelp,
];

const bandRanges = [
  { start: 90, end: 100 },
  { start: 80, end: 90 },
  { start: 70, end: 80 },
  { start: 60, end: 70 },
  { start: 0, end: 60 },
];

function formatRange(start: number, end: number): string {
  if (start === 90) return "90–100%";
  if (start === 0) return "Below 60%";
  return `${start}–<${end}%`;
}

export const RatingBands = ({
  showDescriptions = true,
  compact = false,
  className = "",
}: RatingBandsProps) => {
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = shouldReduceMotion ?? false;

  return (
    <section
      id="rating-bands"
      aria-labelledby="rating-bands-heading"
      className={`mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 ${className}`}
    >
      <SectionHeading
        eyebrow="Assessment guide"
        title="Understanding the rating scale"
        description="Every approved score tells part of the story. Use these five performance bands as a consistent reference when reviewing assessment results."
      />

      <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-100 bg-gradient-to-br from-[#F7F9FC] via-white to-[#F0F9FD] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0C2340] text-white shadow-sm">
              <ShieldCheck size={21} aria-hidden="true" />
            </div>

            <div>
              <h3 className="font-bold tracking-tight text-[#0C2340]">
                The performance framework
              </h3>
              <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">
                Five score ranges. One consistent approach to assessment.
              </p>
            </div>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-[#00A3E0]/20 bg-white px-3.5 py-2 text-xs font-semibold text-[#0C2340] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#00A3E0]" />
            Percentage-based ratings
          </div>
        </div>

        <div
          className={`grid gap-4 p-4 sm:p-5 lg:gap-5 lg:p-6 ${
            compact
              ? "sm:grid-cols-2 lg:grid-cols-5"
              : "sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {ratingBands.map((band, index) => {
            const Icon = bandIcons[index] ?? CircleHelp;
            const range = bandRanges[index];
            const rangeLabel = range
              ? formatRange(range.start, range.end)
              : "Range unavailable";

            return (
              <motion.article
                key={band.label}
                initial={
                  reduceMotion ? false : { opacity: 0, y: 14 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.35,
                  delay: reduceMotion ? 0 : index * 0.055,
                }}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-[border-color,box-shadow] duration-300 hover:border-slate-300 hover:shadow-[0_12px_32px_rgba(12,35,64,0.08)]"
              >
                <div
                  className="h-1 w-full"
                  style={{ backgroundColor: band.color }}
                  aria-hidden="true"
                />

                <div className={compact ? "p-4" : "p-5"}>
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ring-inset ring-black/[0.03] transition-transform duration-300 group-hover:scale-105"
                      style={{
                        color: band.color,
                        backgroundColor: band.background,
                      }}
                    >
                      <Icon
                        size={22}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </div>

                    <span
                      className="inline-flex max-w-full items-center rounded-full px-3 py-1.5 text-xs font-bold tabular-nums"
                      style={{
                        color: band.color,
                        backgroundColor: band.background,
                      }}
                    >
                      {rangeLabel}
                    </span>
                  </div>

                  <div className="mt-5">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                        Level {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3
                      className="text-lg font-bold leading-snug tracking-tight"
                      style={{ color: band.color }}
                    >
                      {band.label}
                    </h3>

                    {showDescriptions && (
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {band.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-medium text-slate-500">
                        Score range
                      </span>
                      <span
                        className="text-xs font-bold tabular-nums"
                        style={{ color: band.color }}
                      >
                        {range
                          ? `${range.start}–${range.end}%`
                          : "—"}
                      </span>
                    </div>

                    <div
                      className="relative mt-3 h-2 overflow-hidden rounded-full bg-slate-100"
                      role="img"
                      aria-label={`${band.label}: ${rangeLabel} on a 0 to 100 percent scale`}
                    >
                      {range && (
                        <motion.div
                          initial={
                            reduceMotion
                              ? false
                              : { width: 0 }
                          }
                          whileInView={{
                            width: `${range.end - range.start}%`,
                          }}
                          viewport={{ once: true }}
                          transition={{
                            duration: reduceMotion ? 0 : 0.65,
                            delay: reduceMotion ? 0 : index * 0.055,
                            ease: "easeOut",
                          }}
                          className="absolute inset-y-0 rounded-full"
                          style={{
                            left: `${range.start}%`,
                            backgroundColor: band.color,
                          }}
                        />
                      )}
                    </div>

                    <div className="mt-1.5 flex justify-between text-[10px] font-medium tabular-nums text-slate-400">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <motion.aside
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reduceMotion ? 0 : 0.35 }}
        className="relative mt-6 overflow-hidden rounded-2xl border border-[#00A3E0]/20 bg-[#F0F9FD]"
        aria-labelledby="rating-guidance-heading"
      >
        <div
          className="absolute bottom-0 left-0 top-0 w-1 bg-[#00A3E0]"
          aria-hidden="true"
        />

        <div className="flex items-start gap-4 p-5 sm:p-6">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#00A3E0]/10 bg-white text-[#0087BD] shadow-sm">
            <CircleHelp size={21} aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <h3
              id="rating-guidance-heading"
              className="font-bold tracking-tight text-[#0C2340]"
            >
              A score is a starting point, not the whole story.
            </h3>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              A rating band describes the score; it does not replace the
              assessor&apos;s feedback. Consider the assessment notes,
              supporting observations, and approved improvement actions
              alongside the percentage to understand what is working well
              and what needs attention.
            </p>
          </div>
        </div>
      </motion.aside>
    </section>
  );
};
