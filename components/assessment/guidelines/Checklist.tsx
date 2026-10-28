"use client";
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ClipboardCheck, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { preparationChecklist } from "@/data/guidelines";


type GuidelinesChecklistProps = {
  assessmentHref?: string;
};



export const GuidelinesChecklist = ({
  assessmentHref = "/portal",
}: GuidelinesChecklistProps) => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    () => preparationChecklist.map(() => false),
  );

  const shouldReduceMotion = useReducedMotion();

  const completedCount = checkedItems.filter(Boolean).length;
  const total = preparationChecklist.length;
  const progress = total > 0 ? Math.round((completedCount / total) * 100) : 0;
  const isComplete = total > 0 && completedCount === total;

  function toggleItem(index: number) {
    setCheckedItems((current) =>
      current.map((checked, itemIndex) =>
        itemIndex === index ? !checked : checked,
      ),
    );
  }

  function resetChecklist() {
    setCheckedItems(preparationChecklist.map(() => false));
  }

  return (
    <section
      id="next-steps"
      aria-labelledby="checklist-title"
      className="group relative isolate scroll-mt-8 overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_24px_80px_-48px_rgba(12,35,64,0.32)] sm:rounded-[32px]"
    >
      {/* Ambient decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-[#41B6E6]/[0.09] blur-3xl transition-transform duration-1000 group-hover:translate-y-2" />
        <div className="absolute -left-24 top-52 h-56 w-56 rounded-full bg-[#FFC72C]/[0.07] blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative border-b border-slate-100 px-5 pb-6 pt-6 sm:px-8 sm:pb-7 sm:pt-8 lg:px-9">
        <div className="flex items-start gap-4">
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { rotate: -5, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0C2340] text-white shadow-lg shadow-[#0C2340]/15 sm:h-14 sm:w-14"
          >
            <ClipboardCheck className="h-6 w-6" strokeWidth={1.7} />

            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#00A3E0]">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            </span>
          </motion.div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#007FAF] sm:text-[11px]">
                Your next steps
              </span>

              <span className="h-1 w-1 rounded-full bg-slate-300" />

              <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                Preparation checklist
              </span>
            </div>

            <h2
              id="checklist-title"
              className="mt-2 text-xl font-bold leading-tight tracking-[-0.03em] text-[#0C2340] sm:text-2xl lg:text-[1.75rem]"
            >
              Ready for your assessment?
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:leading-7">
              A little preparation goes a long way. Work through these steps
              before moving on to your assigned assessment.
            </p>
          </div>
        </div>

        {/* Progress overview */}
        <div className="mt-7 rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-sm shadow-slate-900/[0.02] sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-[#0C2340] sm:text-sm">
                Your preparation
              </p>

              <div className="mt-1.5 flex items-baseline gap-2">
                <motion.span
                  key={completedCount}
                  initial={shouldReduceMotion ? false : { opacity: 0.5, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl font-bold tracking-tight text-[#0C2340] tabular-nums"
                >
                  {progress}%
                </motion.span>

                <span className="text-xs text-slate-400">
                  {isComplete ? "All set!" : "completed"}
                </span>
              </div>
            </div>

            <motion.div
              key={isComplete ? "complete" : "in-progress"}
              initial={shouldReduceMotion ? false : { scale: 0.92, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                isComplete
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-[#00A3E0]/[0.08] text-[#007FAF]"
              }`}
            >
              {isComplete ? (
                <Check className="h-6 w-6" strokeWidth={2.5} />
              ) : (
                <span className="text-sm font-bold tabular-nums">
                  {completedCount}/{total}
                </span>
              )}
            </motion.div>
          </div>

          <div
            role="progressbar"
            aria-label="Preparation checklist progress"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={completedCount}
            className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"
          >
            <motion.div
              className={`h-full rounded-full ${
                isComplete
                  ? "bg-emerald-500"
                  : "bg-gradient-to-r from-[#007FAF] via-[#00A3E0] to-[#41B6E6]"
              }`}
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
              }
            />
          </div>

          <div className="mt-2.5 flex items-center justify-between gap-3 text-[11px] text-slate-400">
            <span>
              {isComplete
                ? "Every step checked off"
                : "Keep going, one step at a time"}
            </span>
            <span className="tabular-nums">
              {completedCount} of {total}
            </span>
          </div>
        </div>
      </div>

      {/* Checklist items */}
      <div className="px-5 py-6 sm:px-8 sm:py-7 lg:px-9">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-sm font-bold text-[#0C2340]">
            Before you begin
          </h3>

          <span className="text-[11px] font-medium text-slate-400">
            Select each completed step
          </span>
        </div>

        <div className="space-y-2.5">
          {preparationChecklist.map((item, index) => {
            const checked = checkedItems[index];
            const inputId = `preparation-check-${index}`;

            return (
              <motion.label
                key={item}
                htmlFor={inputId}
                layout={!shouldReduceMotion}
                whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                transition={{ duration: 0.18 }}
                className={`group/item relative flex cursor-pointer items-start gap-3.5 overflow-hidden rounded-2xl border p-4 transition-colors duration-200 sm:gap-4 sm:p-4 ${
                  checked
                    ? "border-[#00A3E0]/25 bg-[#00A3E0]/[0.045]"
                    : "border-slate-200/80 bg-white hover:border-[#00A3E0]/35 hover:bg-slate-50/70"
                }`}
              >
                <input
                  id={inputId}
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleItem(index)}
                  className="peer sr-only"
                />

                <motion.span
                  initial={false}
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: checked ? [1, 1.12, 1] : 1,
                        }
                  }
                  transition={{ duration: 0.22 }}
                  aria-hidden="true"
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-[#00A3E0] peer-focus-visible:ring-offset-2 ${
                    checked
                      ? "border-[#00A3E0] bg-[#00A3E0] text-white"
                      : "border-slate-300 bg-white text-transparent group-hover/item:border-[#00A3E0]/60"
                  }`}
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </motion.span>

                <span
                  className={`flex-1 text-sm leading-6 transition-colors duration-200 ${
                    checked
                      ? "font-medium text-[#0C2340]"
                      : "text-slate-600"
                  }`}
                >
                  {item}
                </span>

                <AnimatePresence initial={false}>
                  {checked && (
                    <motion.span
                      initial={
                        shouldReduceMotion
                          ? false
                          : { opacity: 0, scale: 0.8, x: 4 }
                      }
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.8, x: 4 }}
                      transition={{ duration: 0.18 }}
                      className="mt-0.5 hidden shrink-0 text-[#007FAF] sm:block"
                      aria-hidden="true"
                    >
                      <Check className="h-4 w-4" strokeWidth={2.5} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.label>
            );
          })}
        </div>

        {/* Completion message */}
        <AnimatePresence initial={false}>
          {isComplete && (
            <motion.div
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: 10, height: 0 }
              }
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 6, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div
                role="status"
                className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200/80 bg-emerald-50/80 p-4 sm:p-5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Sparkles className="h-4.5 w-4.5" />
                </div>

                <div>
                  <p className="text-sm font-bold text-emerald-900">
                    You’re ready for the next step!
                  </p>
                  <p className="mt-1 text-xs leading-6 text-emerald-800/80 sm:text-sm">
                    You’ve reviewed every preparation step. Take a final look
                    at your assigned task instructions before proceeding.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={resetChecklist}
            disabled={completedCount === 0}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#0C2340] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RotateCcw className="h-4 w-4" />
            Reset checklist
          </button>

          <Button
            className="group/cta h-12 w-full rounded-xl bg-[#0C2340] px-5 text-sm font-semibold text-white shadow-[0_8px_20px_-10px_rgba(12,35,64,0.65)] transition-colors duration-200 hover:bg-[#00A3E0] sm:w-auto"
          >
            <Link href={assessmentHref}>
              {isComplete ? "Continue to your portal" : "Continue to your portal"}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
