
"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, ClipboardCheck, RotateCcw } from "lucide-react";
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

  const completedCount = checkedItems.filter(Boolean).length;
  const total = preparationChecklist.length;
  const progress = Math.round((completedCount / total) * 100);
  const isComplete = completedCount === total;

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
      className="scroll-mt-8 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_-45px_rgba(12,35,64,0.35)] sm:p-8 lg:p-9"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0C2340] text-white">
          <ClipboardCheck className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#007FAF]">
            Your next steps
          </p>
          <h2
            id="checklist-title"
            className="mt-2 text-xl font-bold tracking-tight text-[#0C2340] sm:text-2xl"
          >
            Ready for your assessment?
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Use this checklist to confirm that you are prepared before moving
            on to your assigned assessment.
          </p>
        </div>
      </div>

      <div className="mt-7">
        <div className="mb-2 flex items-center justify-between gap-3 text-xs">
          <span className="font-semibold text-[#0C2340]">
            Preparation progress
          </span>
          <span className="tabular-nums text-slate-500">
            {completedCount} of {total} completed
          </span>
        </div>

        <div
          role="progressbar"
          aria-label="Preparation checklist progress"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={completedCount}
          className="h-2 overflow-hidden rounded-full bg-slate-100"
        >
          <div
            className="h-full rounded-full bg-[#00A3E0] transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {preparationChecklist.map((item, index) => {
          const checked = checkedItems[index];
          const inputId = `preparation-check-${index}`;

          return (
            <label
              key={item}
              htmlFor={inputId}
              className={`flex cursor-pointer items-start gap-3.5 rounded-xl border p-4 transition-colors ${
                checked
                  ? "border-[#00A3E0]/25 bg-[#00A3E0]/[0.045]"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70"
              }`}
            >
              <input
                id={inputId}
                type="checkbox"
                checked={checked}
                onChange={() => toggleItem(index)}
                className="peer sr-only"
              />

              <span
                aria-hidden="true"
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#00A3E0] peer-focus-visible:ring-offset-2 ${
                  checked
                    ? "border-[#00A3E0] bg-[#00A3E0] text-white"
                    : "border-slate-300 bg-white text-transparent"
                }`}
              >
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>

              <span
                className={`text-sm leading-6 ${
                  checked
                    ? "font-medium text-[#0C2340]"
                    : "text-slate-600"
                }`}
              >
                {item}
              </span>
            </label>
          );
        })}
      </div>

      {isComplete && (
        <p
          role="status"
          className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-800"
        >
          You have checked every preparation step. Review your assigned task
          instructions before proceeding.
        </p>
      )}

      <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={resetChecklist}
          disabled={completedCount === 0}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#0C2340] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <RotateCcw className="h-4 w-4" />
          Reset checklist
        </button>

        <Button
          asChild
          className="group h-12 rounded-xl bg-[#0C2340] px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#00A3E0]"
        >
          <Link href={assessmentHref}>
            {isComplete ? "Continue to your portal" : "Continue to your portal"}
          </Link>
        </Button>
      </div>
    </section>
  );
}
