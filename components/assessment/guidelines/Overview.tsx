"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Heart, Target } from "lucide-react";


const highlights = [
  {
    icon: Target,
    number: "01",
    eyebrow: "Clarity first",
    title: "Know the standard",
    description:
      "Understand your responsibilities, what good work looks like, and how your contribution will be reviewed.",
    accent: "#00A3E0",
    iconBg: "bg-[#00A3E0]/10",
    iconColor: "text-[#007FAF]",
  },
  {
    icon: CheckCircle2,
    number: "02",
    eyebrow: "Show up prepared",
    title: "Prepare with care",
    description:
      "Follow the instructions, pay attention to the details, and submit work that reflects your best effort.",
    accent: "#00A859",
    iconBg: "bg-[#00A859]/10",
    iconColor: "text-[#00864A]",
  },
  {
    icon: Heart,
    number: "03",
    eyebrow: "Keep growing",
    title: "Grow through feedback",
    description:
      "Receive feedback with an open mind, strengthen your skills, and turn every experience into an opportunity to serve better.",
    accent: "#E87722",
    iconBg: "bg-[#E87722]/10",
    iconColor: "text-[#C65D13]",
  },
];

export const GuidelinesOverview = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="overview-title"
      className="relative py-14 sm:py-20 lg:py-24"
    >
      {/* Section introduction */}
      <div className="grid gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-12">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00A3E0]/15 bg-[#00A3E0]/[0.06] px-3.5 py-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#007FAF] sm:text-xs">
              The foundation
            </span>
          </div>

          <h2
            id="overview-title"
            className="mt-5 max-w-xl text-3xl font-extrabold leading-[1.1] tracking-[-0.045em] text-[#0C2340] sm:text-4xl lg:text-[2.8rem]"
          >
            Excellence isn't just what we do.
            <span className="mt-1 block text-[#008DBF]">
              It's how we grow.
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="lg:pb-1"
        >
          <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            The Media Team helps communicate the message of the Gospel,
            document the life of our church, and create meaningful media
            experiences that serve our congregation and reach beyond our
            walls. Our assessment process gives every team member an
            opportunity to demonstrate their skills, receive constructive
            feedback, and discover new ways to grow.
          </p>
        </motion.div>
      </div>

      {/* Mission statement */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.985 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5 }}
        className="relative mt-9 overflow-hidden rounded-[24px] border border-[#0C2340]/[0.06] bg-[#F2F8FC] p-5 sm:mt-12 sm:rounded-[28px] sm:p-7 lg:p-8"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-20 h-56 w-56 rounded-full border border-[#41B6E6]/20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 -top-12 h-40 w-40 rounded-full bg-[#41B6E6]/10 blur-2xl"
        />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0C2340] text-[#7DD3FC] shadow-lg shadow-[#0C2340]/10">
            <Heart className="h-5 w-5" />
          </div>

          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#007FAF] sm:text-xs">
              One team. One purpose.
            </p>
            <p className="mt-1.5 text-sm font-semibold leading-6 text-[#0C2340] sm:text-base sm:leading-7">
              We assess to encourage growth, build consistency, and help every
              team member serve with greater confidence—not simply to point out
              what needs improvement.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Three principles */}
      <div className="mt-10 flex flex-col gap-2 sm:mt-14 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 sm:text-xs">
            Your assessment mindset
          </p>
          <h3 className="mt-2 text-xl font-extrabold tracking-tight text-[#0C2340] sm:text-2xl">
            Three principles to keep in mind
          </h3>
        </div>
        <p className="text-sm text-slate-500">
          Small habits. Meaningful impact.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3 md:gap-5">
        {highlights.map(
          (
            {
              icon: Icon,
              number,
              eyebrow,
              title,
              description,
              accent,
              iconBg,
              iconColor,
            },
            index,
          ) => (
            <motion.article
              key={title}
              initial={
                shouldReduceMotion ? false : { opacity: 0, y: 18 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                delay: shouldReduceMotion ? 0 : index * 0.1,
              }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { y: -5, transition: { duration: 0.2 } }
              }
              className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_-24px_rgba(12,35,64,0.3)] transition-colors duration-300 hover:border-slate-300 hover:shadow-[0_24px_45px_-30px_rgba(12,35,64,0.35)] sm:p-6 lg:p-7"
            >
              {/* Individual accent */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                style={{ backgroundColor: accent }}
              />

              <div className="flex items-start justify-between">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconBg} ${iconColor} transition-transform duration-300 group-hover:rotate-[-5deg] group-hover:scale-105`}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.9} />
                </span>

                <span className="font-mono text-xs font-semibold tracking-wider text-slate-300">
                  {number}
                </span>
              </div>

              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 sm:text-[11px]">
                {eyebrow}
              </p>

              <h4 className="mt-2 text-lg font-extrabold tracking-tight text-[#0C2340] sm:text-xl">
                {title}
              </h4>

              <p className="mt-3 flex-1 text-sm leading-7 text-slate-500">
                {description}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-xs font-semibold text-slate-400 transition-colors group-hover:text-[#0C2340]">
                  Principle {number}
                </span>
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all duration-300 group-hover:bg-[#0C2340] group-hover:text-white"
                  aria-hidden="true"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </motion.article>
          ),
        )}
      </div>
    </section>
  );
};