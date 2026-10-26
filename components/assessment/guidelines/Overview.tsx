"use client";
import { CheckCircle2, Heart, Target } from "lucide-react";

const highlights = [
  {
    icon: Target,
    title: "Know the standard",
    description: "Understand your task and how your work will be reviewed.",
  },
  {
    icon: CheckCircle2,
    title: "Prepare with care",
    description: "Follow instructions and submit complete, relevant work.",
  },
  {
    icon: Heart,
    title: "Grow through feedback",
    description: "Use each assessment as an opportunity to improve and serve.",
  },
];

export const GuidelinesOverview = () => {
  return (
    <section aria-labelledby="overview-title" className="py-10 sm:py-12">
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#007FAF]">
          Start here
        </p>
        <h2
          id="overview-title"
          className="mt-3 text-2xl font-bold tracking-tight text-[#0C2340] sm:text-3xl"
        >
          A shared commitment to excellence
        </h2>
        <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
          The Media Team plays an important role in communicating the message
          of the Gospel, documenting the life of the church, and creating media
          experiences that serve our congregation and reach beyond our walls.
          This assessment process helps every team member demonstrate their
          skills, receive constructive feedback, and identify opportunities
          for growth.
        </p>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {highlights.map(({ icon: Icon, title, description }, index) => (
          <article
            key={title}
            className="group rounded-2xl border border-slate-200/80 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#41B6E6]/50 hover:shadow-[0_16px_35px_-25px_rgba(12,35,64,0.35)] sm:p-6"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00A3E0]/[0.09] text-[#007FAF] transition-colors group-hover:bg-[#00A3E0]/[0.15]">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-xs font-semibold tabular-nums text-slate-300">
                0{index + 1}
              </span>
            </div>
            <h3 className="mt-5 text-base font-bold text-[#0C2340]">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
