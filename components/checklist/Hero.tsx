
import Link from "next/link";
import {ArrowDown, ArrowLeft, ClipboardCheck, FileBarChart2, ShieldCheck} from "lucide-react";



export const ChecklistHero = () => {
  return (
    <section className="relative isolate overflow-hidden bg-[#0C2340]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-[#00A3E0]/20 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-[#41B6E6]/10 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="absolute right-[12%] top-20 hidden h-48 w-48 rounded-full border border-white/10 lg:block" />
        <div className="absolute right-[15%] top-28 hidden h-36 w-36 rounded-full border border-[#41B6E6]/20 lg:block" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-10 lg:px-10 lg:pb-24">
        <div className="mt-12 max-w-3xl sm:mt-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#41B6E6]/25 bg-[#41B6E6]/10 px-3.5 py-2 text-xs font-semibold tracking-wide text-[#8DDEFF]">
            <ClipboardCheck className="h-4 w-4" />
            MEDIA TEAM · REPORTING
          </div>

          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Service Checklists
            <span className="mt-1 block text-[#41B6E6]">
              &amp; Reports
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-white/85 sm:text-lg">
            Consistency in preparation. Excellence in service.
            Accountability in every detail.
          </p>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Explore recorded Media Team checklist results across
            Global Harvest Church Maryland, Lagos. Review service
            readiness, monitor checklist completion, and identify
            opportunities to strengthen our media production standards.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-white/65 sm:text-sm">
            <span className="inline-flex items-center gap-2">
              <FileBarChart2 className="h-4 w-4 text-[#41B6E6]" />
              Reporting by service and period
            </span>
            <span className="hidden text-white/25 sm:inline">•</span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#41B6E6]" />
              Recorded results only
            </span>
          </div>

          <a
            href="#reporting"
            className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[#8DDEFF]"
          >
            Explore checklist reports
            <ArrowDown className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
