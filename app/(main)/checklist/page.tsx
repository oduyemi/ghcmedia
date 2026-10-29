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
    <main className="min-h-screen overflow-x-clip bg-[#F7F9FC]">
      <ChecklistHero />

      <div className="mx-auto w-full max-w-7xl space-y-10 px-4 py-8 sm:space-y-12 sm:px-6 sm:py-12 lg:space-y-14 lg:px-8 lg:py-16">
        <ChecklistExplorer />
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
          <Commitment />
        </div>
      </div>
    </main>
  );
}
