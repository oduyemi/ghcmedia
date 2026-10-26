
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
    <main className="min-h-screen bg-[#F7F9FC]">
        <GuidelinesHero />
        <div className="mx-auto max-w-5xl">
          <GuidelinesOverview />
          <section
            id="guidelines"
            aria-label="Assessment guideline sections"
            className="rounded-[24px] border border-slate-200/80 bg-transparent px-5 py-8 shadow-[0_24px_70px_-55px_rgba(12,35,64,0.4)] sm:px-8 sm:py-10 lg:px-10"
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

          <div className="my-8">
            <GuidelinesChecklist assessmentHref="/portal" />
          </div>
        </div>
    </main>
  );
}
