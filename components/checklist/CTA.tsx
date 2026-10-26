
import Link from "next/link";
import { ArrowRight, ClipboardCheck, LockKeyhole, ShieldCheck } from "lucide-react";
import type { ServiceFilter } from "@/types/checklist";


type ChecklistCTAProps = {
  service?: ServiceFilter;
  serviceDate?: string;
};

export const ChecklistCTA = ({service = "ALL", serviceDate}: ChecklistCTAProps) => {
  const params = new URLSearchParams();

  if (service !== "ALL") {
    params.set("service", service);
  }

  if (serviceDate) {
    params.set("date", serviceDate);
  }

  const query = params.toString();
  const href = `/portal/checklist/new${query ? `?${query}` : ""}`;

  return (
    <section className="relative isolate overflow-hidden rounded-3xl bg-[#0C2340] p-6 sm:p-9 lg:p-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border border-white/[0.08]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 -top-10 h-44 w-44 rounded-full border border-[#41B6E6]/20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-[#00A3E0]/15 blur-3xl"
      />

      <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#41B6E6]/25 bg-[#41B6E6]/10 px-3 py-1.5 text-xs font-semibold text-[#8DDEFF]">
            <ClipboardCheck className="h-4 w-4" />
            READY TO SERVE?
          </span>

          <h2 className="mt-5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Ready to Complete a Checklist?
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
            Help maintain accurate service records by completing the
            checklist for your assigned service.
          </p>

          <p className="mt-3 text-sm leading-6 text-white/70">
            Authorized Media Team members can access the protected
            checklist form, record the relevant checks, and submit
            their results.
          </p>

          <div className="mt-5 flex items-start gap-2 text-xs leading-5 text-slate-300">
            <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-[#41B6E6]" />
            Sign-in and the appropriate authorization are required
            to submit checklist records.
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-3 lg:items-start">
          <Link
            href={href}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0C2340] px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/25 transition hover:bg-[#00A3E0] hover:ring-[#00A3E0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#41B6E6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C2340]"
          >
            Complete a Checklist
            <ArrowRight className="h-4 w-4" />
          </Link>

          <p className="flex items-center gap-1.5 text-xs text-white/55">
            <ShieldCheck className="h-3.5 w-3.5" />
            Protected submission workflow
          </p>
        </div>
      </div>
    </section>
  );
}
