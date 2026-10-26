import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { getHomeConfig } from "@/utils/config";
import { Home } from "@/components/Home";

export const metadata: Metadata = {
  title: "Global Harvest Church | Media Team Portal",
  description:
    "Access media assessments, service checklists, performance ratings, and reports for the Global Harvest Church Media Team.",
};

export default function Homepage() {
  const config = getHomeConfig();

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Preserve the existing warm background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-gradient-to-b from-white via-yellow-50 to-yellow-100 opacity-50"
      />

      <main className="relative z-10 flex flex-1 items-center pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="container mx-auto w-full px-4 sm:px-6">
          <Home config={config} />
        </div>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}