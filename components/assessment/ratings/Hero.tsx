"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  FileBarChart2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const metrics = [
  {
    label: "Service assessments",
    value: "—",
    icon: ClipboardCheck,
  },
  {
    label: "Published reports",
    value: "—",
    icon: FileBarChart2,
  },
  {
    label: "Checklist completion",
    value: "—",
    icon: CheckCircle2,
  },
];

export const RatingsHero = () => {
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = shouldReduceMotion ?? false;

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduceMotion ? 0 : 0.7,
      delay: reduceMotion ? 0 : delay,
      ease,
    },
  });

  return (
    <section className="relative isolate overflow-hidden bg-[#0C2340] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : { x: [0, 24, 0], y: [0, -18, 0] }
          }
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-40 -top-48 h-[32rem] w-[32rem] rounded-full bg-[#00A3E0]/20 blur-[110px]"
        />

        <motion.div
          animate={
            reduceMotion
              ? undefined
              : { x: [0, -20, 0], y: [0, 18, 0] }
          }
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-64 -left-32 h-[30rem] w-[30rem] rounded-full bg-[#41B6E6]/10 blur-[100px]"
        />

        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.65) 1px, transparent 1px)",
            backgroundSize: "25px 25px",
            maskImage:
              "linear-gradient(to bottom, black, transparent 85%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black, transparent 85%)",
          }}
        />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#41B6E6]/80 to-transparent" />

        <div className="absolute -right-24 top-24 hidden h-[34rem] w-[34rem] rounded-full border border-white/[0.07] lg:block" />
        <div className="absolute -right-8 top-40 hidden h-[22rem] w-[22rem] rounded-full border border-white/[0.07] lg:block" />
        <div className="absolute right-20 top-64 hidden h-3 w-3 rounded-full bg-[#FFC72C] shadow-[0_0_30px_rgba(255,199,44,0.8)] lg:block" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:grid-cols-[1.03fr_0.97fr] lg:gap-8 lg:px-10 lg:pb-24 lg:pt-20">
        <div className="relative z-10 max-w-2xl">
          <motion.h1
            {...reveal(0.08)}
            className="mt-7 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Ratings
            <br />
            <span className="bg-gradient-to-r from-[#41B6E6] via-[#78D7F4] to-white bg-clip-text text-transparent">
              & Reports
            </span>
          </motion.h1>

          <motion.p
            {...reveal(0.16)}
            className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg"
          >
            A clearer view of service assessments, technical progress,
            checklist completion, and the improvements that strengthen
            our Media Team.
          </motion.p>

          <motion.p
            {...reveal(0.22)}
            className="mt-4 max-w-xl text-sm leading-7 text-slate-400"
          >
            Explore approved reports and available assessment summaries
            for Global Harvest Church Maryland. Ratings appear only when
            supported by recorded assessments and an approved scoring policy.
          </motion.p>

          <motion.div
            {...reveal(0.28)}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href="#report-history"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#00A3E0] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#00A3E0]/20 transition duration-200 hover:bg-[#078CC0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#41B6E6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C2340]"
            >
              Explore reports
              <ArrowDown
                size={17}
                className="transition-transform duration-200 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </Link>

            <Link
              href="/login"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:border-[#41B6E6]/50 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#41B6E6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C2340]"
            >
              Login to manage
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </motion.div>

          <motion.div
            {...reveal(0.34)}
            className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs text-slate-300 sm:text-sm"
          >
            <span className="inline-flex items-center gap-2">
              <ShieldCheck
                size={16}
                className="text-[#41B6E6]"
                aria-hidden="true"
              />
              Approved reports only
            </span>

            <span className="inline-flex items-center gap-2">
              <CheckCircle2
                size={16}
                className="text-[#41B6E6]"
                aria-hidden="true"
              />
              Recorded results, not estimates
            </span>
          </motion.div>
        </div>

        {/* Report preview */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 28, scale: 0.98 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: reduceMotion ? 0 : 0.85,
            delay: reduceMotion ? 0 : 0.18,
            ease,
          }}
          className="relative mx-auto w-full max-w-xl lg:ml-auto lg:mr-0"
        >
          {/* Floating accent */}
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-2 -top-5 z-20 hidden items-center gap-2 rounded-2xl border border-white/15 bg-[#142F4D]/95 px-4 py-3 shadow-xl backdrop-blur-xl sm:flex lg:-right-5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00A3E0]/15 text-[#41B6E6]">
              <ShieldCheck size={18} aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">
                Review-led reporting
              </p>
              <p className="mt-0.5 text-[11px] text-slate-400">
                Approval before publication
              </p>
            </div>
          </motion.div>

          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/[0.07] p-2 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-3">
            <div className="overflow-hidden rounded-[1.3rem] bg-[#F7F9FC] text-[#0C2340]">
              {/* Preview header */}
              <div className="flex items-center justify-between border-b border-slate-200/80 px-5 py-5 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0C2340] text-white shadow-lg shadow-[#0C2340]/15">
                    <BarChart3 size={21} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-bold sm:text-base">
                      Report overview
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Media Team assessment records
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] font-semibold text-slate-600 sm:text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E87722]" />
                  Awaiting data
                </span>
              </div>

              {/* Main metric */}
              <div className="p-5 sm:p-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium text-slate-500 sm:text-sm">
                        Approved average rating
                      </p>
                      <p className="mt-3 text-4xl font-bold tracking-tight text-[#0C2340] sm:text-5xl">
                        —
                        <span className="ml-1 text-lg font-semibold text-slate-400">
                          /100
                        </span>
                      </p>
                      <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">
                        Displayed when an approved service-level scoring
                        policy and valid results are available.
                      </p>
                    </div>

                    <div
                      className="relative flex h-[5.5rem] w-[5.5rem] shrink-0 items-center justify-center rounded-full sm:h-28 sm:w-28"
                      aria-label="Rating unavailable because no approved score is available"
                    >
                      <svg
                        viewBox="0 0 100 100"
                        className="h-full w-full -rotate-90"
                        aria-hidden="true"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#E2E8F0"
                          strokeWidth="8"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#00A3E0"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="0 251.2"
                        />
                      </svg>
                      <span className="absolute text-sm font-bold text-slate-400 sm:text-base">
                        N/A
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2 rounded-xl bg-[#F0F8FC] px-3.5 py-3 text-xs leading-5 text-slate-600 sm:text-sm">
                    <ShieldCheck
                      size={17}
                      className="shrink-0 text-[#0087BD]"
                      aria-hidden="true"
                    />
                    Scores are not inferred from individual camera ratings.
                  </div>
                </div>

                {/* Preview metrics */}
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {metrics.map((metric) => {
                    const Icon = metric.icon;

                    return (
                      <div
                        key={metric.label}
                        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EAF7FC] text-[#0087BD]">
                            <Icon size={16} aria-hidden="true" />
                          </span>
                          <span className="text-xl font-bold text-[#0C2340]">
                            {metric.value}
                          </span>
                        </div>
                        <p className="mt-3 text-xs leading-5 text-slate-500">
                          {metric.label}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Report activity placeholder */}
                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-[#0C2340]">
                        Reporting activity
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Assessment and publication records
                      </p>
                    </div>
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-[10px] font-semibold text-slate-500">
                      No data yet
                    </span>
                  </div>

                  <div className="mt-5 flex h-16 items-end gap-2" aria-hidden="true">
                    {[32, 48, 39, 58, 44, 68, 51, 62, 43, 55, 36, 48].map(
                      (height, index) => (
                        <div
                          key={index}
                          className="flex-1 rounded-t-md bg-slate-100"
                          style={{ height: `${height}%` }}
                        />
                      ),
                    )}
                  </div>

                  <p className="mt-3 text-[11px] leading-5 text-slate-400">
                    Activity visual is illustrative. No historical values
                    are being represented.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating supporting card */}
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, 7, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
            className="absolute -bottom-6 -left-2 z-20 hidden max-w-[17rem] items-center gap-3 rounded-2xl border border-white/15 bg-[#142F4D]/95 p-4 shadow-2xl backdrop-blur-xl sm:flex lg:-left-8"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFC72C]/15 text-[#FFC72C]">
              <Sparkles size={19} aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">
                Progress over time
              </p>
              <p className="mt-1 text-[11px] leading-5 text-slate-400">
                Review trends as verified assessments become available.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
