
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpenCheck } from "lucide-react";
import { guidelineSections } from "@/data/guidelines";
import { GuidelinesHero } from "@/components/assessment/guidelines/Hero";
import { GuidelinesOverview } from "@/components/assessment/guidelines/Overview";
import { Guidelines } from "@/components/assessment/guidelines/index";
import { GuidelinesCallout } from "@/components/assessment/guidelines/CallOut";
import { GuidelinesChecklist } from "@/components/assessment/guidelines/Checklist";

export const metadata: Metadata = {
  title: "Assessment Guidelines | Global Harvest Church Media",
  description:
    "Learn about the assessment process, submission requirements, evaluation standards, and preparation steps for the Global Harvest Church Media Team.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AssessmentGuidelines() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#F7F9FC] text-[#0C2340]">
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-[#00A3E0]/[0.055] blur-[110px]" />
        <div className="absolute -bottom-48 -left-40 h-[32rem] w-[32rem] rounded-full bg-[#FFC72C]/[0.07] blur-[110px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#0C2340_0.55px,transparent_0.55px)] bg-[size:25px_25px] opacity-[0.025]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 pb-6 pt-5 sm:px-8 sm:pt-7 lg:px-12">
        <GuidelinesHero />

        <div className="mx-auto max-w-5xl">
          <GuidelinesOverview />

          {/* Detailed guidelines */}
          <section
            id="guidelines"
            aria-label="Assessment guideline sections"
            className="rounded-[24px] border border-slate-200/80 bg-white px-5 py-8 shadow-[0_24px_70px_-55px_rgba(12,35,64,0.4)] sm:px-8 sm:py-10 lg:px-10"
          >
            <div className="mb-8 border-b border-slate-200/80 pb-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#007FAF]">
                Please read carefully
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0C2340] sm:text-3xl">
                The assessment process
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                Review each section before beginning your assessment. Your
                assigned task instructions take precedence for role-specific
                requirements, deliverables, and deadlines.
              </p>
            </div>

            {guidelineSections.map((section) => (
              <Guidelines
                key={section.number}
                section={section}
              />
            ))}
          </section>

          <div className="mt-8">
            <GuidelinesCallout />
          </div>

          <div className="mt-8">
            <GuidelinesChecklist assessmentHref="/client" />
          </div>
        </div>

        {/* <div className="mt-10">
          <GuidelinesFooter />
        </div> */}
      </div>
    </main>
  );
}
