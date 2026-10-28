import type { Metadata } from "next";
import {RatingsPageClient} from "@/components/assessment/ratings/RatingsPageClient";


export const metadata: Metadata = {
  title: "Ratings & Reports | Media Team",
  description:
    "View published media team assessment reports, service summaries, rating criteria, and special programme reports.",
  robots: {
    index: false,
    follow: false,
  },
};


export default function RatingsPage() {
  return <RatingsPageClient />;
}
