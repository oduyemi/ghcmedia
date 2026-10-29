import type { Metadata } from "next";
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
    <main className="min-h-screen overflow-x-clip bg-[#F7F9FC]">
      <GuidelinesHero />

      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <GuidelinesOverview />

        <section
          id="guidelines"
          aria-label="Assessment guideline sections"
          className="rounded-2xl border border-slate-200/80 bg-white/60 px-4 py-6 shadow-[0_24px_70px_-55px_rgba(12,35,64,0.4)] sm:rounded-[24px] sm:px-7 sm:py-8 lg:px-10 lg:py-10"
        >
          <div className="mb-8 border-b border-slate-200/80 pb-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#007FAF] sm:text-xs">
              Please read carefully
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0C2340] sm:text-3xl">
              The assessment process
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Review each section before beginning your assessment. Your
              assigned task instructions take precedence for role-specific
              requirements, deliverables, and deadlines.
            </p>
          </div>

          {guidelineSections.map((section) => (
            <Guidelines key={section.number} section={section} />
          ))}
        </section>

        <div className="mt-6 sm:mt-8">
          <GuidelinesCallout />
        </div>

        <div className="my-6 sm:my-8">
          <GuidelinesChecklist assessmentHref="/portal" />
        </div>
      </div>
    </main>
  );
}
