import type { Metadata } from "next";
import { ChecklistHero, ChecklistExplorer, Commitment } from "@/components/checklist";

export const metadata: Metadata = {
  title: "Service Checklists & Reports | Global Harvest Church",
  description:
    "Review Media Team service checklist records, monitor completion, and improve service preparation at Global Harvest Church Maryland, Lagos.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ChecklistPage() {
  return (
    <main className="min-h-screen bg-[#F7F9FC]">
      <ChecklistHero />
      <div className="mx-auto max-w-7xl space-y-14 px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <ChecklistExplorer />
        <div className="border-t border-slate-200 pt-10 sm:pt-14">
          <Commitment />
        </div>
      </div>
    </main>
  );
}
