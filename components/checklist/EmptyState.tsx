"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CalendarSearch,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";

type ChecklistEmptyStateProps = {
  onReset: () => void;
};

export const ChecklistEmptyState = ({
  onReset,
}: ChecklistEmptyStateProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      aria-labelledby="checklist-empty-title"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative isolate overflow-hidden rounded-3xl border border-slate-200/80 bg-white"
    >
      {/* Subtle ambient accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 -z-10 h-64 w-64 rounded-full bg-[#41B6E6]/[0.10] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-20 -z-10 h-64 w-64 rounded-full bg-[#FFC72C]/[0.08] blur-3xl"
      />

      <div className="px-5 py-12 text-center sm:px-10 sm:py-16 lg:px-16">
        {/* Icon composition */}
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, scale: 0.88, rotate: -5 }
          }
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            duration: 0.5,
            delay: shouldReduceMotion ? 0 : 0.08,
            ease: "easeOut",
          }}
          className="relative mx-auto flex h-[5.25rem] w-[5.25rem] items-center justify-center rounded-[1.65rem] border border-[#00A3E0]/15 bg-gradient-to-br from-[#00A3E0]/[0.12] via-[#41B6E6]/[0.07] to-white shadow-[0_8px_30px_rgba(12,35,64,0.06)]"
        >
          <div
            aria-hidden="true"
            className="absolute inset-1 rounded-[1.35rem] border border-white/90"
          />

          <CalendarSearch
            aria-hidden="true"
            className="relative h-8 w-8 text-[#007FAF]"
            strokeWidth={1.7}
          />

          <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-[3px] border-white bg-[#00A859] text-white shadow-sm">
            <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
        </motion.div>

        {/* Status label */}
        <div className="mt-7 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
            Nothing to display yet
          </span>
        </div>

        <h3
          id="checklist-empty-title"
          className="mt-4 text-2xl font-bold tracking-tight text-[#0C2340] sm:text-3xl"
        >
          No matching records
        </h3>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-500 sm:text-[15px]">
          We couldn’t find any checklist records for your current
          selection. Try adjusting your reporting period or service
          filters, or create a new checklist to get started.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <motion.button
            type="button"
            onClick={onReset}
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-[#0C2340] shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#00A3E0]/20 sm:min-w-40"
          >
            <RotateCcw
              className="h-4 w-4 text-slate-500"
              strokeWidth={2}
            />
            Reset filters
          </motion.button>

          <motion.div
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          >
            <Link
              href="/portal/checklist/new"
              className="group inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#0C2340] px-5 text-sm font-semibold text-white shadow-[0_5px_16px_rgba(12,35,64,0.16)] transition-colors hover:bg-[#007FAF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#00A3E0]/30 sm:w-auto sm:min-w-52"
            >
              Complete a checklist
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </Link>
          </motion.div>
        </div>

        {/* Reporting note */}
        <div className="mx-auto mt-9 flex max-w-xl items-start gap-3 rounded-2xl border border-[#00A3E0]/10 bg-[#00A3E0]/[0.035] px-4 py-3.5 text-left sm:items-center sm:px-5">
          <p className="text-xs leading-5 text-slate-500 sm:text-[13px]">
            <span className="font-semibold text-[#0C2340]">
              A note on reporting:{" "}
            </span>
            Only recorded information appears here. A missing record
            does not, by itself, mean a service requirement was not met.
          </p>
        </div>
      </div>
    </motion.section>
  );
};
