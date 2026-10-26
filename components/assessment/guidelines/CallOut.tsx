"use client";
import { motion, useReducedMotion } from "framer-motion";
import { HeartHandshake, ArrowUpRight } from "lucide-react";

export const GuidelinesCallout = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.aside
      initial={
        shouldReduceMotion
          ? false
          : { opacity: 0, y: 24, scale: 0.985 }
      }
      whileInView={
        shouldReduceMotion
          ? undefined
          : { opacity: 1, y: 0, scale: 1 }
      }
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative isolate my-8 overflow-hidden rounded-[28px] border border-[#00A3E0]/20 bg-[#F1F9FD] shadow-[0_12px_40px_-28px_rgba(12,35,64,0.28)] sm:rounded-[32px]"
    >
      {/* Ambient background details */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-[#41B6E6]/15 blur-3xl transition-transform duration-1000 ease-out group-hover:translate-x-3 group-hover:translate-y-3" />
        <div className="absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-[#FFC72C]/10 blur-3xl" />
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#00A3E0]/40 to-transparent" />
      </div>

      {/* Accent rail */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-0 top-8 w-1 rounded-r-full bg-gradient-to-b from-[#00A3E0] via-[#41B6E6] to-[#FFC72C]"
      />

      <div className="relative p-6 pl-7 sm:p-9 sm:pl-10 lg:p-10 lg:pl-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-7">
          {/* Icon illustration */}
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : { y: [0, -4, 0], rotate: [0, 1.5, 0] }
            }
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/80 bg-white text-[#007FAF] shadow-[0_8px_24px_-12px_rgba(0,127,175,0.35)] ring-1 ring-[#00A3E0]/10 sm:h-16 sm:w-16"
          >
            <HeartHandshake className="h-7 w-7" strokeWidth={1.7} />
          </motion.div>

          <div className="min-w-0 flex-1">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00A3E0]/15 bg-white/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#007FAF] sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00A859]" />
              Our shared commitment
            </div>

            <h2 className="mt-4 max-w-2xl text-2xl font-bold leading-tight tracking-[-0.035em] text-[#0C2340] sm:text-3xl lg:text-[2.1rem]">
              Serve with excellence.
              <span className="mt-1 block text-[#007FAF]">
                Grow through feedback.
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
              We are committed to using our gifts and skills to support the
              work of the ministry. Every assessment is an opportunity to
              strengthen our craft, serve one another, and contribute
              meaningfully to the Media Team.
            </p>

            {/* Closing principle */}
            <div className="mt-6 flex items-start gap-3 border-t border-[#0C2340]/10 pt-5">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#0C2340] text-white">
                <ArrowUpRight className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-semibold text-[#0C2340]">
                  A final note
                </p>
                <p className="mt-1 text-xs leading-6 text-slate-500 sm:text-sm">
                  Please follow any additional instructions communicated by
                  Media Team leadership for your specific assessment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};
