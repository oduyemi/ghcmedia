"use client";
import { ArrowDown, BookOpenCheck } from "lucide-react";



export const GuidelinesHero = () => {
  return (
    <section className="mt-14 relative overflow-hidden rounded-[28px] bg-[#0C2340] px-6 py-10 text-white shadow-[0_24px_70px_-35px_rgba(12,35,64,0.55)] sm:px-10 sm:py-14 lg:px-14 lg:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full border border-white/[0.07]" />
        <div className="absolute -right-10 -top-16 h-64 w-64 rounded-full border border-[#41B6E6]/20" />
        <div className="absolute -bottom-32 right-1/4 h-72 w-72 rounded-full bg-[#00A3E0]/15 blur-[90px]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_45%,rgba(0,163,224,0.08))]" />
      </div>

      <div className="relative max-w-3xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7DD3FC] sm:text-xs">
          <BookOpenCheck className="h-4 w-4" />
          Media Team Resource
        </div>

        <h1 className="max-w-2xl text-3xl font-bold leading-[1.12] tracking-[-0.045em] sm:text-4xl lg:text-5xl">
          Assessment
          <span className="text-[#41B6E6]"> Guidelines</span>
        </h1>

        <p className="mt-5 max-w-xl text-base font-medium leading-7 text-white/80 sm:text-lg">
          Understanding the process. Meeting the standard. Growing together.
        </p>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
          Welcome to the Global Harvest Church Media Team Assessment Portal.
          These guidelines explain what to expect, how your work will be
          evaluated, and how to prepare for a meaningful assessment experience.
        </p>

        <a
          href="#guidelines"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[#7DD3FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#41B6E6] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0C2340]"
        >
          Explore the guidelines
          <ArrowDown className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
