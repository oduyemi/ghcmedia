"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileBarChart2,
  Radio,
  Video,
} from "lucide-react";
import { serviceDefinitions, type ServiceType } from "@/data/ratings";
import { SectionHeading } from "@/components/assessment/ratings/shared/Heading";


interface ServiceReportCardsProps {
  reportCounts?: Partial<Record<ServiceType, number>>;
  onSelectService?: (service: ServiceType) => void;
}

const serviceIcons: Record<ServiceType, typeof Video> = {
  "sunday-business": Video,
  "sunday-celebration": Radio,
  "wednesday-mc-live": FileBarChart2,
  "wednesday-wow": CalendarDays,
};

const serviceAccents: Record<
  ServiceType,
  {
    label: string;
    accent: string;
    iconBg: string;
    iconColor: string;
    glow: string;
    number: string;
  }
> = {
  "sunday-business": {
    label: "Sunday service",
    accent: "#0087BD",
    iconBg: "bg-[#E7F7FC]",
    iconColor: "text-[#0087BD]",
    glow: "bg-[#41B6E6]/10",
    number: "01",
  },
  "sunday-celebration": {
    label: "Sunday service",
    accent: "#008A4B",
    iconBg: "bg-[#E8F7EF]",
    iconColor: "text-[#008A4B]",
    glow: "bg-[#00A859]/10",
    number: "02",
  },
  "wednesday-mc-live": {
    label: "Wednesday service",
    accent: "#7651C9",
    iconBg: "bg-[#F1ECFF]",
    iconColor: "text-[#7651C9]",
    glow: "bg-[#7651C9]/10",
    number: "03",
  },
  "wednesday-wow": {
    label: "Monthly programme",
    accent: "#B66B00",
    iconBg: "bg-[#FFF4DB]",
    iconColor: "text-[#B66B00]",
    glow: "bg-[#FFC72C]/15",
    number: "04",
  },
};

const ease = [0.22, 1, 0.36, 1] as const;

export const ServiceReportCards = ({
  reportCounts = {},
  onSelectService,
}: ServiceReportCardsProps) => {
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = shouldReduceMotion ?? false;

  return (
    <section
      id="service-reports"
      aria-labelledby="regular-services-heading"
      className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#F7F9FC] via-white to-[#F7F9FC]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-20 -z-10 h-80 w-80 rounded-full bg-[#41B6E6]/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-[#7651C9]/[0.06] blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <SectionHeading
              eyebrow="Regular services"
              title="Every service has a story."
              description="Explore reporting for our regular services. Published reports become available when assessments have been recorded, reviewed, and approved."
            />
          </div>

          <div className="hidden shrink-0 items-center gap-2 pb-1 text-sm font-semibold text-slate-400 md:flex">
            <span>Our service collection</span>
            <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {serviceDefinitions.map((service, index) => {
            const Icon = serviceIcons[service.id];
            const accent = serviceAccents[service.id];
            const rawCount = reportCounts[service.id];

            const reportCount =
              typeof rawCount === "number" &&
              Number.isFinite(rawCount) &&
              rawCount >= 0
                ? Math.floor(rawCount)
                : null;

            const hasReports =
              reportCount !== null && reportCount > 0;

            return (
              <motion.article
                key={service.id}
                initial={
                  reduceMotion ? false : { opacity: 0, y: 24 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.55,
                  delay: reduceMotion ? 0 : index * 0.07,
                  ease,
                }}
                className="group relative flex min-h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_4px_24px_rgba(12,35,64,0.035)] transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_55px_rgba(12,35,64,0.09)]"
              >
                {/* Top accent */}
                <div
                  className="h-1.5 w-full"
                  style={{
                    background: `linear-gradient(90deg, ${accent.accent}, #41B6E6)`,
                  }}
                />

                <div className="relative flex flex-1 flex-col p-5 sm:p-6">
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute -right-12 top-0 h-36 w-36 rounded-full blur-3xl transition-opacity duration-300 group-hover:opacity-150 ${accent.glow}`}
                  />

                  <div className="relative flex items-start justify-between gap-3">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-[1.2rem] transition duration-300 group-hover:scale-105 ${accent.iconBg} ${accent.iconColor}`}
                    >
                      <Icon
                        size={25}
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />
                    </div>

                    <span className="pt-1 text-xs font-black tracking-[0.16em] text-slate-300">
                      {accent.number}
                    </span>
                  </div>

                  <div className="relative mt-7">
                    <span
                      className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.15em]"
                      style={{ color: accent.accent }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: accent.accent }}
                      />
                      {accent.label}
                    </span>

                    <h3
                      id={`service-${service.id}`}
                      className="mt-3 text-xl font-extrabold leading-snug tracking-tight text-[#0C2340] sm:text-[1.35rem]"
                    >
                      {service.name}
                    </h3>

                    <p className="mt-3 min-h-[4.5rem] text-sm leading-6 text-slate-500">
                      {service.description}
                    </p>
                  </div>

                  <div className="relative mt-6 space-y-3 rounded-2xl bg-[#F7F9FC] p-4">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm">
                        <CalendarDays
                          size={15}
                          aria-hidden="true"
                        />
                      </span>

                      <div className="min-w-0 pt-0.5">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Schedule
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[#0C2340]">
                          {service.day}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm">
                        <Clock3 size={15} aria-hidden="true" />
                      </span>

                      <div className="min-w-0 pt-0.5">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Service time
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[#0C2340]">
                          {service.time} WAT
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Report availability */}
                  <div className="relative mt-5 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#0C2340]">
                        Published reports
                      </p>

                      <p
                        className={`mt-1 text-xs leading-5 ${
                          hasReports
                            ? "font-semibold text-[#008A4B]"
                            : "text-slate-500"
                        }`}
                      >
                        {reportCount === null
                          ? "Availability not yet confirmed"
                          : hasReports
                            ? `${reportCount} published report${reportCount === 1 ? "" : "s"}`
                            : "No published reports yet"}
                      </p>
                    </div>

                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        hasReports
                          ? "bg-[#E8F7EF] text-[#008A4B]"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {hasReports ? (
                        <CheckCircle2
                          size={18}
                          aria-hidden="true"
                        />
                      ) : (
                        <FileBarChart2
                          size={18}
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </div>

                  <div className="mt-auto pt-6">
                    {onSelectService ? (
                      <button
                        type="button"
                        onClick={() => onSelectService(service.id)}
                        className="group/link inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0C2340] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#163B60] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2"
                      >
                        Explore reports
                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover/link:translate-x-1"
                          aria-hidden="true"
                        />
                      </button>
                    ) : (
                      <Link
                        href={`/ratings?service=${encodeURIComponent(service.id)}#report-history`}
                        className="group/link inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0C2340] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#163B60] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2"
                      >
                        Explore reports
                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover/link:translate-x-1"
                          aria-hidden="true"
                        />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Scheduling note */}
        <div className="mt-7 flex items-start gap-3 rounded-2xl border border-[#DCECF5] bg-white/80 px-4 py-4 sm:px-5">
          <p className="text-xs leading-6 text-slate-500 sm:text-sm">
            <span className="font-bold text-[#0C2340]">
              A note on scheduling:{" "}
            </span>
            Worship on Wednesday (WOW) takes place on the last Wednesday
            of each month and replaces the regular MC Live programme.
            Dated occurrences should follow the Africa/Lagos timezone.
          </p>
        </div>
      </div>
    </section>
  );
};
