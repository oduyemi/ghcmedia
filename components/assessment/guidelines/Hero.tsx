"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpenCheck,
  Check,
  ClipboardCheck,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const guidelineItems = [
  "Understand team expectations",
  "Follow service standards",
  "Learn from feedback",
];

const principles = [
  { label: "Preparation", color: "bg-[#00A3E0]" },
  { label: "Teamwork", color: "bg-[#00A859]" },
  { label: "Growth", color: "bg-[#FFC72C]" },
];

export const GuidelinesHero = () => {
  const shouldReduceMotion = useReducedMotion();

  const reveal = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease },
        };

  return (
    <section className="relative isolate overflow-hidden bg-[#0C2340] text-white">
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : { x: [0, 18, 0], y: [0, 14, 0], scale: [1, 1.06, 1] }
          }
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-40 -top-48 h-[32rem] w-[32rem] rounded-full bg-[#00A3E0]/20 blur-[100px]"
        />

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : { x: [0, -16, 0], y: [0, -10, 0] }
          }
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-56 left-[15%] h-[30rem] w-[30rem] rounded-full bg-[#41B6E6]/10 blur-[100px]"
        />

        <div
          className="absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "25px 25px",
          }}
        />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#41B6E6]/40 to-transparent" />

        <div className="absolute right-[5%] top-20 hidden h-72 w-72 rounded-full border border-white/[0.07] lg:block" />
        <div className="absolute right-[8%] top-28 hidden h-56 w-56 rounded-full border border-[#41B6E6]/15 lg:block" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:grid-cols-[1.03fr_0.97fr] lg:gap-8 lg:px-10 lg:pb-24 lg:pt-20">
        {/* Copy */}
        <div className="relative z-10 max-w-2xl">
          <motion.h1
            {...reveal(0.14)}
            className="mt-7 text-[2.7rem] font-bold leading-[1.06] tracking-[-0.045em] text-white sm:text-6xl lg:text-[4.35rem]"
          >
            Great service
            <span className="mt-2 block bg-gradient-to-r from-[#41B6E6] via-[#65D5F4] to-[#00A3E0] bg-clip-text text-transparent">
              starts with preparation.
            </span>
          </motion.h1>

          <motion.p
            {...reveal(0.23)}
            className="mt-6 max-w-xl text-base font-medium leading-7 text-white/85 sm:text-lg sm:leading-8"
          >
            Understanding the process. Meeting the standard. Growing together.
          </motion.p>

          <motion.p
            {...reveal(0.3)}
            className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-[15px] sm:leading-8"
          >
            Our Media Team guidelines help us serve with confidence, work
            together effectively, and approach every assignment with care.
            Explore what is expected, how we work, and how constructive
            feedback helps us keep improving at Global Harvest Church.
          </motion.p>

          {/* Guideline attributes */}
          <motion.div
            {...reveal(0.38)}
            className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/70 sm:text-sm"
          >
            <div className="inline-flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#41B6E6]/20 bg-[#41B6E6]/[0.09]">
                <BookOpenCheck className="h-4 w-4 text-[#41B6E6]" />
              </span>
              Clear expectations
            </div>

            <div className="inline-flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#41B6E6]/20 bg-[#41B6E6]/[0.09]">
                <HeartHandshake className="h-4 w-4 text-[#41B6E6]" />
              </span>
              Growth through teamwork
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div {...reveal(0.46)} className="mt-9">
            <Link
              href="#guidelines"
              className="group/cta inline-flex min-h-12 items-center gap-3 rounded-xl bg-[#00A3E0] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(0,163,224,0.65)] transition-colors duration-200 hover:bg-[#41B6E6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DDEFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C2340]"
            >
              Explore team guidelines
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 transition-transform duration-200 group-hover/cta:translate-y-0.5">
                <ArrowDown className="h-4 w-4" />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Visual guidelines composition */}
        <motion.div
          initial={
            shouldReduceMotion ? false : { opacity: 0, x: 28, scale: 0.97 }
          }
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="relative mx-auto w-full max-w-[540px] lg:ml-auto lg:mr-0"
        >
          {/* Orbital rings */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 aspect-square w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]"
          />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 aspect-square w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#41B6E6]/15"
          />

          <motion.div
            animate={shouldReduceMotion ? undefined : { y: [0, -7, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            {/* Main guidelines card */}
            <div className="relative rounded-[26px] border border-white/15 bg-white/[0.08] p-2.5 shadow-[0_35px_100px_-35px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:rounded-[30px] sm:p-3">
              <div className="rounded-[20px] border border-white/70 bg-[#F9FCFF] p-5 text-[#0C2340] sm:rounded-[24px] sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#007FAF]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00A859]" />
                      Global Harvest Church
                    </div>

                    <h2 className="mt-2 text-lg font-bold tracking-tight sm:text-xl">
                      Team guidelines
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      A shared standard for serving well
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E7F7FD] text-[#007FAF]">
                    <BookOpenCheck className="h-5 w-5" />
                  </div>
                </div>

                {/* Guideline progress composition */}
                <div className="mt-7 grid grid-cols-[auto_1fr] items-center gap-5 sm:gap-7">
                  <div className="relative flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32">
                    <svg
                      viewBox="0 0 120 120"
                      className="absolute inset-0 h-full w-full -rotate-90"
                      aria-hidden="true"
                    >
                      <circle
                        cx="60"
                        cy="60"
                        r="49"
                        fill="none"
                        stroke="#E4EEF4"
                        strokeWidth="9"
                      />

                      <motion.circle
                        cx="60"
                        cy="60"
                        r="49"
                        fill="none"
                        stroke="#00A3E0"
                        strokeWidth="9"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 49}
                        initial={
                          shouldReduceMotion
                            ? false
                            : { strokeDashoffset: 2 * Math.PI * 49 }
                        }
                        animate={{
                          strokeDashoffset:
                            2 * Math.PI * 49 * 0.08,
                        }}
                        transition={{ duration: 1.4, delay: 0.6, ease }}
                      />
                    </svg>

                    <div className="text-center">
                      <span className="block text-2xl font-bold tracking-tight sm:text-3xl">
                        3
                      </span>
                      <span className="mt-0.5 block text-[10px] text-slate-500">
                        Core values
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    {principles.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between gap-2 text-xs"
                      >
                        <span className="flex items-center gap-2 text-slate-600">
                          <span
                            className={`h-2 w-2 rounded-full ${item.color}`}
                          />
                          {item.label}
                        </span>

                        <Check
                          className="h-3.5 w-3.5 text-[#00A859]"
                          strokeWidth={2.5}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Guideline principles */}
                <div className="mt-7 border-t border-slate-200 pt-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-bold text-[#0C2340]">
                      How we grow together
                    </p>

                    <span className="text-[10px] text-slate-400">
                      Our shared commitment
                    </span>
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      {
                        number: "01",
                        title: "Prepare with purpose",
                        description: "Know your role and arrive ready.",
                        width: "w-full",
                      },
                      {
                        number: "02",
                        title: "Serve as one team",
                        description: "Communicate and support one another.",
                        width: "w-[88%]",
                      },
                      {
                        number: "03",
                        title: "Keep improving",
                        description: "Learn from feedback and experience.",
                        width: "w-[94%]",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={item.number}
                        initial={
                          shouldReduceMotion
                            ? false
                            : { opacity: 0, x: 12 }
                        }
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.55,
                          delay: 0.5 + index * 0.12,
                          ease,
                        }}
                        className="flex items-center gap-3"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E7F7FD] text-[10px] font-bold text-[#007FAF]">
                          {item.number}
                        </span>

                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-[#0C2340]">
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-[10px] leading-4 text-slate-500">
                            {item.description}
                          </p>
                        </div>

                        <div className="hidden h-1.5 w-12 shrink-0 overflow-hidden rounded-full bg-slate-100 sm:block">
                          <motion.div
                            initial={
                              shouldReduceMotion ? false : { width: 0 }
                            }
                            animate={{ width: item.width }}
                            transition={{
                              duration: 0.8,
                              delay: 0.7 + index * 0.12,
                              ease,
                            }}
                            className={`h-full rounded-full ${
                              index === 1
                                ? "bg-[#00A859]"
                                : index === 2
                                  ? "bg-[#FFC72C]"
                                  : "bg-[#00A3E0]"
                            }`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-[10px] text-slate-400">
                    <span>One team. Shared purpose.</span>

                    <span className="inline-flex items-center gap-1.5 text-[#007FAF]">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Excellence through growth
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating checklist card */}
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : { y: [0, 6, 0], rotate: [-3, -1.5, -3] }
            }
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-9 -left-2 z-20 w-[54%] max-w-[240px] sm:-bottom-12 sm:-left-5"
          >
            <div className="rounded-2xl border border-white/20 bg-[#12365A]/95 p-3.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:rounded-[22px] sm:p-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#00A3E0]/15 text-[#70D8FF]">
                  <ClipboardCheck className="h-[18px] w-[18px]" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-white">
                    Ready to serve
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Personal preparation
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2.5">
                {guidelineItems.map((label) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-md bg-[#00A3E0] text-white">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>

                    <span className="truncate text-[10px] text-white/80">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Floating growth badge */}
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : { y: [0, -5, 0], x: [0, 2, 0] }
            }
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-1 bottom-8 z-20 hidden sm:block lg:-right-3"
          >
            <div className="flex items-center gap-2.5 rounded-2xl border border-white/15 bg-[#12365A]/95 px-3.5 py-3 shadow-xl shadow-black/20 backdrop-blur-xl">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00A859]/15 text-[#50D99A]">
                <HeartHandshake className="h-5 w-5" />
              </span>

              <div>
                <p className="text-xs font-bold text-white">
                  Shared commitment
                </p>
                <p className="mt-0.5 text-[10px] text-slate-400">
                  Learn. Improve. Serve.
                </p>
              </div>

              <ArrowUpRight className="ml-1 h-4 w-4 text-[#41B6E6]" />
            </div>
          </motion.div>

          {/* Small decorative light */}
          <div
            aria-hidden="true"
            className="absolute -right-4 top-[22%] h-20 w-20 rounded-full bg-[#00A3E0]/20 blur-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};
