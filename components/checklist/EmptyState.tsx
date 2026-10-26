
import Link from "next/link";
import { ArrowRight, CalendarSearch, RotateCcw } from "lucide-react";

type ChecklistEmptyStateProps = {
  onReset: () => void;
};

export const ChecklistEmptyState = ({
  onReset,
}: ChecklistEmptyStateProps) => {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center sm:px-10 sm:py-16">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#00A3E0]/[0.08] text-[#007FAF]">
        <CalendarSearch className="h-7 w-7" />
      </div>

      <h3 className="mt-5 text-xl font-bold tracking-tight text-[#0C2340]">
        No Results Found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500">
        There are no checklist records matching your current
        selection. Try another reporting period or service, or
        check back when additional records are available.
      </p>

      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#0C2340] transition hover:bg-slate-50"
        >
          <RotateCcw className="h-4 w-4" />
          Reset filters
        </button>

        <Link
          href="/portal/checklist/new"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0C2340] px-4 text-sm font-semibold text-white transition hover:bg-[#00A3E0]"
        >
          Complete a checklist
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <p className="mt-5 text-xs leading-5 text-slate-400">
        Only recorded information is used in these reports. A missing
        record does not, by itself, mean a service requirement was not met.
      </p>
    </div>
  );
}
