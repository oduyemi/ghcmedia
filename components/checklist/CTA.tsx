"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowRight, CheckCircle2, ClipboardCheck, LockKeyhole, ShieldCheck } from "lucide-react";
import type { ServiceFilter } from "@/types/checklist";


type ChecklistCTAProps = {
  service?: ServiceFilter;
  serviceDate?: string;
};

export const ChecklistCTA = ({
  service = "ALL",
  serviceDate,
}: ChecklistCTAProps) => {
  const shouldReduceMotion = useReducedMotion();

  const params = new URLSearchParams();

  if (service !== "ALL") {
    params.set("service", service);
  }

  if (serviceDate) {
    params.set("date", serviceDate);
  }

  const query = params.toString();
  const href = `/portal/checklist/new${query ? `?${query}` : ""}`;

  return (
    <section
      aria-labelledby="checklist-cta-title"
      className="relative isolate overflow-hidden rounded-[28px] bg-[#0C2340] shadow-[0_28px_80px_-42px_rgba(12,35,64,0.55)] sm:rounded-[34px]"
    >
      {/* Atmospheric background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0C2340] via-[#0C2340] to-[#10385A]" />

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : { x: [0, 14, 0], y: [0, -12, 0], scale: [1, 1.06, 1] }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-24 -top-36 h-[360px] w-[360px] rounded-full bg-[#00A3E0]/20 blur-[90px]"
        />

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : { x: [0, -12, 0], y: [0, 10, 0] }
          }
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-40 left-[18%] h-[340px] w-[340px] rounded-full bg-[#41B6E6]/10 blur-[90px]"
        />

        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="absolute -right-16 top-10 h-64 w-64 rounded-full border border-white/[0.08] sm:right-10 sm:top-8" />
        <div className="absolute -right-4 top-20 h-44 w-44 rounded-full border border-[#41B6E6]/20" />
        <div className="absolute right-10 top-32 h-24 w-24 rounded-full border border-white/[0.07]" />

        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#41B6E6]/40 to-transparent" />
      </div>

      <div className="relative grid gap-10 p-6 sm:p-9 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center lg:gap-12 lg:p-12">
        {/* Main message */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#41B6E6]/25 bg-[#41B6E6]/[0.09] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.17em] text-[#8DDEFF] sm:text-[11px]">
            Your next step in service
          </div>

          <h2
            id="checklist-cta-title"
            className="mt-6 max-w-xl text-3xl font-bold leading-[1.13] tracking-[-0.04em] text-white sm:text-4xl lg:text-[42px]"
          >
            Prepared to serve.
            <span className="mt-1 block bg-gradient-to-r from-[#41B6E6] via-[#8DDEFF] to-white bg-clip-text text-transparent">
              Ready to make it count.
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
            Help us maintain a consistent standard of excellence. Complete
            the checklist for your assigned service and ensure the important
            details are accurately recorded.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-3">
            <div className="flex items-center gap-2.5 text-xs text-white/75">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00A859]/15 text-[#65E6A6]">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </span>
              Accurate service records
            </div>

            <div className="flex items-center gap-2.5 text-xs text-white/75">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#41B6E6]/15 text-[#8DDEFF]">
                <ShieldCheck className="h-3.5 w-3.5" />
              </span>
              Authorized submissions
            </div>
          </div>
        </motion.div>

        {/* Action panel */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.65,
            delay: shouldReduceMotion ? 0 : 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[24px] border border-white/[0.12] bg-white/[0.07] p-5 shadow-2xl shadow-black/10 backdrop-blur-xl sm:p-6">
            <div
              aria-hidden="true"
              className="absolute -right-10 -top-12 h-32 w-32 rounded-full bg-[#00A3E0]/20 blur-3xl"
            />

            <div className="relative flex items-start justify-between gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00A3E0] text-white shadow-lg shadow-[#00A3E0]/20">
                <ClipboardCheck className="h-6 w-6" />
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1.5 text-[10px] font-medium text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[#65E6A6]" />
                Checklist portal
              </span>
            </div>

            <h3 className="relative mt-5 text-lg font-bold tracking-tight text-white">
              Complete your checklist
            </h3>

            <p className="relative mt-2 text-xs leading-6 text-slate-300">
              Record your service checks and submit your results through the
              protected checklist workflow.
            </p>

            <Link
              href={href}
              className="group relative mt-6 flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-[#00A3E0] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#00A3E0]/15 transition-colors duration-200 hover:bg-[#41B6E6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DDEFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C2340]"
            >
              Start checklist
              <motion.span
                animate={
                  shouldReduceMotion ? undefined : { x: [0, 3, 0] }
                }
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </Link>

            <div className="relative mt-4 flex items-start gap-2.5 border-t border-white/10 pt-4">
              <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-[#8DDEFF]" />

              <p className="text-[11px] leading-5 text-white/60">
                Sign-in and the appropriate authorization are required to
                submit checklist records.
              </p>
            </div>
          </div>

          <motion.div
            animate={
              shouldReduceMotion ? undefined : { y: [0, -4, 0] }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            aria-hidden="true"
            className="absolute -bottom-3 -right-2 flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-[#173C59] text-[#8DDEFF] shadow-lg sm:-right-3"
          >
            <ArrowDownRight className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
