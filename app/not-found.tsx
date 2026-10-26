
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  House,
  Search,
  ShieldQuestion,
  Smile,
} from "lucide-react";
import { useEffect } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const suggestions = [
  {
    icon: Search,
    number: "01",
    title: "Interrogate the URL",
    description: "Check for typos. The keyboard may have sinned.",
    href: "/",
    label: "Inspect the evidence",
    accent: "cyan",
  },
  {
    icon: ClipboardCheck,
    number: "02",
    title: "Visit the checklists",
    description: "At least these pages know how to show up.",
    href: "/checklist",
    label: "Find the checklists",
    accent: "gold",
  },
  {
    icon: Camera,
    number: "03",
    title: "Check the reports",
    description: "Real records. Actual data. Zero missing chickens.",
    href: "/checklist#reporting",
    label: "View reports",
    accent: "cyan",
  },
  {
    icon: Smile,
    number: "04",
    title: "Accept your fate",
    description: "Take a breath. Even the internet needs a day off.",
    href: "/",
    label: "Try your luck at home",
    accent: "gold",
  },
];

export default function NotFound() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const reveal = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, delay, ease },
        };

  const float = (duration: number, distance = 8) =>
    reduceMotion
      ? {}
      : {
          animate: {
            y: [0, -distance, 0],
          },
          transition: {
            duration,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        };

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#07182D] text-white selection:bg-[#00A3E0]/30">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(18,54,90,0.65),transparent_65%)]" />

        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, 22, 0],
                  y: [0, 16, 0],
                  scale: [1, 1.08, 1],
                }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-48 -top-48 h-[36rem] w-[36rem] rounded-full bg-[#00A3E0]/15 blur-[120px]"
        />

        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, -18, 0],
                  y: [0, -14, 0],
                }
          }
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-64 -left-32 h-[34rem] w-[34rem] rounded-full bg-[#41B6E6]/[0.09] blur-[120px]"
        />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.9) 0.8px, transparent 0.8px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#41B6E6]/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#FFC72C]/20 to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-5 pb-8 pt-6 sm:px-8 sm:pb-10 sm:pt-8 lg:px-12">
        <div className="grid items-center gap-5 pb-14 pt-10 sm:gap-8 sm:pb-20 sm:pt-16 lg:grid-cols-[1fr_0.92fr] lg:gap-12 lg:pb-24 lg:pt-12 xl:gap-20">
          {/* Copy and actions */}
          <div className="relative z-10 mx-auto w-full max-w-2xl lg:mx-0">
            <motion.div {...reveal(0.12)}>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#41B6E6]">
                Well, this is awkward.
              </p>

              <h1 className="text-[3.8rem] font-black leading-[0.88] tracking-[-0.075em] sm:text-7xl md:text-[6.3rem] lg:text-[6.6rem] xl:text-[7.4rem]">
                <span className="block text-white">404</span>
                <span className="mt-2 block text-white/90">Page not</span>
                <span className="mt-1 block bg-gradient-to-r from-[#41B6E6] via-[#9CE8FF] to-[#00A3E0] bg-clip-text pb-2 text-transparent">
                  found<span className="text-[#FFC72C]">.</span>
                </span>
              </h1>
            </motion.div>

            <motion.p
              {...reveal(0.2)}
              className="mt-5 max-w-xl text-base font-semibold leading-7 text-white/90 sm:mt-8 sm:text-xl sm:leading-8"
            >
              We looked everywhere. Under the sofa. Behind the server. Even in
              the Media group chat.
            </motion.p>

            <motion.p
              {...reveal(0.27)}
              className="mt-3 max-w-lg text-sm leading-7 text-[#A8BACD] sm:text-[15px] sm:leading-8"
            >
              Nothing. The page has either moved, never existed, or is
              currently pretending not to know us. Our search team is
              devastated. One member is a chicken, so morale is questionable.
            </motion.p>

            {/* Primary actions */}
            <motion.div
              {...reveal(0.34)}
              className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <Link
                href="/"
                className="group relative inline-flex min-h-[52px] items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#00A3E0] px-5 py-3 text-sm font-bold text-white shadow-[0_12px_35px_-14px_rgba(0,163,224,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#19B8ED] hover:shadow-[0_16px_40px_-12px_rgba(0,163,224,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9CE8FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07182D]"
              >
                <House className="h-4 w-4 shrink-0" />
                <span>Rescue me. Take me home.</span>
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                <span className="absolute inset-x-0 bottom-0 h-px bg-white/40" />
              </Link>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="group inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-xl border border-white/[0.13] bg-white/[0.035] px-5 py-3 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/[0.075] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9CE8FF]"
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Take me back
              </button>
            </motion.div>

            {/* Reassurance */}
            <motion.div
              {...reveal(0.42)}
              className="mt-6 flex items-start gap-2.5 text-xs leading-5 text-white/40"
            >
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#41B6E6]/80" />
              No pages were harmed in the making of this error. Probably.
            </motion.div>
          </div>

          {/* Illustration stage */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 24, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
            className="relative mx-auto w-full max-w-[540px] lg:max-w-none"
          >
            <div className="relative mx-auto aspect-square w-full max-w-[510px]">
              {/* Orbital rings */}
              <div
                aria-hidden="true"
                className="absolute inset-[4%] rounded-full border border-white/[0.055]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-[13%] rounded-full border border-[#41B6E6]/10"
              />
              <div
                aria-hidden="true"
                className="absolute inset-[23%] rounded-full border border-dashed border-white/[0.08]"
              />

              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00A3E0]/[0.07] blur-[55px]"
              />

              {/* Orbiting dots */}
              <motion.div
                animate={
                  reduceMotion ? undefined : { rotate: 360 }
                }
                transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-[10%] rounded-full"
                aria-hidden="true"
              >
                <span className="absolute left-[12%] top-[22%] h-2.5 w-2.5 rounded-full bg-[#FFC72C] shadow-[0_0_18px_rgba(255,199,44,0.45)]" />
                <span className="absolute bottom-[13%] right-[18%] h-2 w-2 rounded-full bg-[#41B6E6] shadow-[0_0_16px_rgba(65,182,230,0.5)]" />
              </motion.div>

              {/* Question marks */}
              <motion.div
                {...float(4.5, 9)}
                className="absolute left-[7%] top-[18%] text-5xl font-black text-[#41B6E6]/70 sm:text-6xl"
                aria-hidden="true"
              >
                ?
              </motion.div>

              <motion.div
                {...float(5.2, 8)}
                className="absolute right-[7%] top-[23%] rotate-6 text-4xl font-black text-[#FFC72C] sm:text-5xl"
                aria-hidden="true"
              >
                ?!
              </motion.div>

              {/* Chicken feature */}
              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : { y: [0, -7, 0], rotate: [-1, 1, -1] }
                }
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-1/2 top-1/2 z-10 flex aspect-square w-[65%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[43%] border border-white/[0.13] bg-gradient-to-br from-white/[0.105] via-[#12365A]/70 to-[#07182D]/90 shadow-[0_40px_100px_-35px_rgba(0,163,224,0.25)] backdrop-blur-xl"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-3 rounded-[42%] border border-dashed border-[#41B6E6]/15"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-x-[17%] top-[12%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />

                <div className="relative flex flex-col items-center">
                  <div className="text-[6.8rem] leading-none drop-shadow-[0_18px_20px_rgba(0,0,0,0.35)] sm:text-[9rem] lg:text-[9.5rem]">
                    🐔
                  </div>

                  <div className="relative mt-3 inline-flex -rotate-3 items-center gap-2 rounded-full border border-white/15 bg-[#102E4C] px-3.5 py-2 shadow-xl sm:mt-4">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FFC72C]" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.13em] text-white sm:text-[10px]">
                      Head of Lost Pages
                    </span>
                  </div>
                </div>

                {/* Tiny badge */}
                <div className="absolute right-[8%] top-[12%] flex h-9 w-9 rotate-12 items-center justify-center rounded-xl border border-[#FFC72C]/25 bg-[#FFC72C]/10 text-[#FFC72C] shadow-lg sm:h-10 sm:w-10">
                  <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
              </motion.div>

              {/* Speech bubble */}
              <motion.div
                {...float(4.2, 5)}
                className="absolute right-0 top-[5%] z-20 max-w-[155px] rotate-2 rounded-2xl rounded-bl-sm border border-[#41B6E6]/20 bg-[#102D4A]/95 px-3.5 py-3 shadow-[0_20px_45px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:right-[1%] sm:max-w-[195px] sm:px-4 sm:py-3.5"
              >
                <p className="text-[11px] font-semibold leading-5 text-white sm:text-sm">
                  “I checked the whole internet.”
                </p>
                <p className="mt-1 text-[9px] leading-4 text-[#8DDEFF] sm:text-[11px]">
                  — The chicken, under oath
                </p>
                <span
                  aria-hidden="true"
                  className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-[#102D4A] bg-[#FFC72C] text-[10px] font-black text-[#07182D]"
                >
                  !
                </span>
              </motion.div>

              {/* Investigation status card */}
              <motion.div
                {...float(5.8, 5)}
                className="absolute bottom-[7%] left-0 z-20 max-w-[195px] -rotate-2 rounded-2xl border border-white/[0.12] bg-[#102D4A]/95 p-3 shadow-[0_20px_45px_-20px_rgba(0,0,0,0.75)] backdrop-blur-xl sm:bottom-[8%] sm:left-[1%] sm:max-w-[220px] sm:p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#FFC72C]/15 bg-[#FFC72C]/[0.09] text-[#FFC72C]">
                    <Compass className="h-5 w-5" />
                  </span>

                  <div>
                    <p className="text-[11px] font-bold text-white sm:text-xs">
                      Investigation status
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-white/45 sm:text-[11px]">
                      Absolutely no leads.
                    </p>
                  </div>
                </div>

                <div className="mt-3.5 flex gap-1">
                  <span className="h-1 flex-1 rounded-full bg-[#41B6E6]/50" />
                  <span className="h-1 flex-1 rounded-full bg-[#41B6E6]/30" />
                  <span className="h-1 flex-1 rounded-full bg-white/10" />
                  <span className="h-1 flex-1 rounded-full bg-white/10" />
                </div>

                <p className="mt-2 text-[9px] font-medium uppercase tracking-[0.12em] text-white/35">
                  Progress: questionable
                </p>
              </motion.div>

              {/* Error status */}
              <motion.div
                {...float(4.8, 5)}
                className="absolute bottom-[12%] right-0 z-20 hidden sm:block"
              >
                <div className="flex items-center gap-2.5 rounded-2xl border border-white/[0.12] bg-[#102D4A]/95 px-3.5 py-3 shadow-xl backdrop-blur-xl">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00A3E0]/10 text-[#41B6E6]">
                    <ShieldQuestion className="h-5 w-5" />
                  </span>

                  <div>
                    <p className="text-xs font-bold text-white">
                      404 detected
                    </p>
                    <p className="mt-1 text-[10px] text-white/45">
                      Chicken notified.
                    </p>
                  </div>

                  <ArrowUpRight className="ml-1 h-4 w-4 text-[#41B6E6]" />
                </div>
              </motion.div>

              {/* Small decorative annotation */}
              <div className="absolute left-[23%] top-[7%] hidden items-center gap-2 sm:flex">
                <span className="h-px w-6 bg-[#FFC72C]/50" />
                <span className="text-[9px] font-semibold uppercase tracking-[0.17em] text-white/35">
                  Exhibit A
                </span>
              </div>

              <div className="absolute bottom-[3%] right-[22%] hidden items-center gap-2 sm:flex">
                <span className="text-[9px] font-semibold uppercase tracking-[0.17em] text-white/35">
                  No further clues
                </span>
                <span className="h-px w-6 bg-[#41B6E6]/50" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Escape routes */}
        <motion.section
          {...reveal(0.2)}
          aria-labelledby="helpful-links-heading"
          className="relative border-t border-white/[0.10] pt-8 sm:pt-11"
        >
          <div className="mb-7 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#41B6E6] sm:text-[11px]">
                  Your escape routes
                </p>
              </div>

              <h2
                id="helpful-links-heading"
                className="mt-3 max-w-2xl text-2xl font-bold leading-tight tracking-[-0.045em] text-white sm:text-3xl lg:text-[2.15rem]"
              >
                Okay, jokes aside.{" "}
                <span className="text-white/50">
                  Where were you headed?
                </span>
              </h2>
            </div>

            <p className="max-w-xs text-xs leading-6 text-white/45 sm:text-right sm:text-sm">
              Choose a destination. The chicken has been removed from
              navigation duties.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {suggestions.map((item, index) => {
              const Icon = item.icon;
              const isGold = item.accent === "gold";

              return (
                <motion.div
                  key={item.title}
                  initial={
                    reduceMotion ? false : { opacity: 0, y: 18 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.28 + index * 0.09,
                    ease,
                  }}
                  className="h-full"
                >
                  <Link
                    href={item.href}
                    className="group relative flex h-full min-h-[228px] flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#41B6E6]/30 hover:bg-white/[0.045] hover:shadow-[0_20px_55px_-30px_rgba(0,163,224,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DDEFF] sm:p-5"
                  >
                    <div
                      aria-hidden="true"
                      className={`absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                        isGold
                          ? "bg-gradient-to-r from-transparent via-[#FFC72C]/70 to-transparent"
                          : "bg-gradient-to-r from-transparent via-[#41B6E6]/70 to-transparent"
                      }`}
                    />

                    <div className="flex items-start justify-between">
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-[14px] border transition-all duration-300 group-hover:scale-105 ${
                          isGold
                            ? "border-[#FFC72C]/15 bg-[#FFC72C]/[0.07] text-[#FFC72C] group-hover:bg-[#FFC72C]/[0.13]"
                            : "border-[#41B6E6]/15 bg-[#41B6E6]/[0.07] text-[#41B6E6] group-hover:bg-[#00A3E0]/20"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>

                      <span className="pt-1 text-[10px] font-semibold tabular-nums tracking-[0.12em] text-white/25">
                        {item.number}
                      </span>
                    </div>

                    <h3 className="mt-5 text-[15px] font-bold tracking-[-0.02em] text-white transition-colors group-hover:text-[#9CE8FF]">
                      {item.title}
                    </h3>

                    <p className="mt-2 flex-1 text-[12px] leading-[1.8] text-white/45 sm:text-[13px]">
                      {item.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
                      <span
                        className={`text-[11px] font-semibold transition-colors ${
                          isGold
                            ? "text-[#DCC477] group-hover:text-[#FFC72C]"
                            : "text-[#70CFF0] group-hover:text-[#9CE8FF]"
                        }`}
                      >
                        {item.label}
                      </span>

                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.10] text-white/45 transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-[#41B6E6]/30 group-hover:bg-[#41B6E6]/10 group-hover:text-[#9CE8FF]">
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="mt-10 flex flex-col gap-3 border-t border-white/[0.07] pt-5 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] font-medium tracking-[0.04em] text-white/35 sm:text-[11px]">
            © {year ?? "2026"} Global Harvest Church · Media Team
          </p>

          <p className="flex items-center gap-2 text-[10px] text-white/35 sm:text-[11px]">
            Stay calm. Check the URL. Do not blame the chicken.
          </p>
        </footer>
      </div>
    </main>
  );
}
