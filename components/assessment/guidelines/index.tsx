import type { ReactNode } from "react";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import type { GuidelineSectionData } from "@/data/guidelines";
import { GuidelinesMotion } from "./Motion";


type GuidelinesSectionProps = {
  section: GuidelineSectionData;
  children?: ReactNode;
};



const accents = [
  {
    color: "#00A3E0",
    soft: "bg-[#00A3E0]/10",
    text: "text-[#007FAF]",
    border: "border-[#00A3E0]/20",
  },
  {
    color: "#00A859",
    soft: "bg-[#00A859]/10",
    text: "text-[#00864A]",
    border: "border-[#00A859]/20",
  },
  {
    color: "#E87722",
    soft: "bg-[#E87722]/10",
    text: "text-[#C65D13]",
    border: "border-[#E87722]/20",
  },
  {
    color: "#41B6E6",
    soft: "bg-[#41B6E6]/15",
    text: "text-[#007FAF]",
    border: "border-[#41B6E6]/25",
  },
];

export const Guidelines = ({
  section,
  children,
}: GuidelinesSectionProps) => {
  const Icon = section.icon;

  const sectionIndex = Math.max(
    0,
    (Number(section.number) || 1) - 1,
  );

  const accent = accents[sectionIndex % accents.length];

  return (
    <GuidelinesMotion
      id={`guideline-${section.number}`}
      className="group relative scroll-mt-8 py-7 first:pt-0 sm:py-10"
    >
      <div className="relative overflow-hidden rounded-[26px] border border-slate-200/80 bg-white shadow-[0_12px_40px_-32px_rgba(12,35,64,0.4)] transition-[border-color,box-shadow] duration-500 group-hover:border-slate-300 group-hover:shadow-[0_26px_65px_-42px_rgba(12,35,64,0.5)] sm:rounded-[32px]">
        {/* Ambient color */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full opacity-40 blur-[75px] transition-opacity duration-700 group-hover:opacity-75"
          style={{ backgroundColor: `${accent.color}30` }}
        />

        {/* Decorative corner detail */}
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 h-28 w-28 opacity-60"
          style={{
            background: `radial-gradient(circle at top right, ${accent.color}12, transparent 70%)`,
          }}
        />

        {/* Accent rail */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-1 origin-top scale-y-75 transition-transform duration-500 group-hover:scale-y-100 sm:w-1.5"
          style={{ backgroundColor: accent.color }}
        />

        <div className="relative p-5 pl-6 sm:p-8 sm:pl-9 lg:p-10 lg:pl-11">
          {/* Header */}
          <div className="flex items-start gap-4 sm:gap-6">
            <div
              className={`guideline-icon relative flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] border ${accent.border} ${accent.soft} ${accent.text} sm:h-[68px] sm:w-[68px] sm:rounded-[24px]`}
            >
              <Icon
                className="h-6 w-6 transition-transform duration-500 ease-out group-hover:rotate-[-8deg] group-hover:scale-110 sm:h-7 sm:w-7"
                strokeWidth={1.8}
              />

              <span className="absolute -bottom-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#0C2340] text-[9px] font-extrabold text-white shadow-sm">
                {String(section.number).padStart(2, "0")}
              </span>
            </div>

            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`text-[10px] font-extrabold uppercase tracking-[0.17em] ${accent.text} sm:text-[11px]`}
                >
                  Guideline {String(section.number).padStart(2, "0")}
                </span>

                <span className="h-1 w-1 rounded-full bg-slate-300" />

                <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                  Media Team Handbook
                </span>
              </div>

              <h2 className="mt-2 text-xl font-extrabold leading-tight tracking-[-0.035em] text-[#0C2340] sm:text-2xl lg:text-[1.75rem]">
                {section.title}
              </h2>

              {section.description && (
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  {section.description}
                </p>
              )}
            </div>

            <div
              aria-hidden="true"
              className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-all duration-300 group-hover:rotate-45 group-hover:border-[#0C2340] group-hover:bg-[#0C2340] group-hover:text-white sm:flex"
            >
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          {/* Content */}
          <div className="mt-7 sm:mt-8 sm:pl-[84px]">
            {section.paragraphs?.length ? (
              <div className="space-y-4">
                {section.paragraphs.map((paragraph, index) => (
                  <p
                    key={paragraph}
                    className={`text-sm leading-7 text-slate-600 sm:text-[15px] sm:leading-8 ${
                      index === 0 ? "text-slate-700" : ""
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}

            {/* Key points */}
            {section.bullets?.length ? (
              <ul className="mt-6 space-y-2">
                {section.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="group/bullet flex items-start gap-3 rounded-2xl border border-transparent px-3 py-3 transition-colors duration-300 hover:border-slate-100 hover:bg-slate-50/80 sm:px-4"
                  >
                    <span
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${accent.soft} ${accent.text} transition-transform duration-300 group-hover/bullet:scale-110`}
                    >
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>

                    <span className="text-sm leading-6 text-slate-600 sm:text-[15px] sm:leading-7">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}

            {/* Criteria */}
            {section.criteria?.length ? (
              <div className="mt-7">
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${accent.soft} ${accent.text}`}
                  >
                    <Check className="h-4 w-4" />
                  </span>

                  <div>
                    <h3 className="text-sm font-bold text-[#0C2340]">
                      What to keep in mind
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-400">
                      The details that make a difference
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {section.criteria.map((criterion, index) => (
                    <div
                      key={criterion.title}
                      className="group/criterion relative overflow-hidden rounded-2xl border border-slate-200/80 bg-[#FAFCFE] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-[0_14px_30px_-24px_rgba(12,35,64,0.45)] sm:p-5"
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${accent.soft} text-[10px] font-extrabold ${accent.text} transition-transform duration-300 group-hover/criterion:rotate-[-5deg]`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div className="min-w-0 pt-0.5">
                          <h4 className="text-sm font-bold leading-5 text-[#0C2340]">
                            {criterion.title}
                          </h4>

                          <p className="mt-2 text-xs leading-6 text-slate-500 sm:text-sm">
                            {criterion.description}
                          </p>
                        </div>
                      </div>

                      <div
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 ease-out group-hover/criterion:w-full"
                        style={{ backgroundColor: accent.color }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Additional custom content */}
            {children ? <div className="mt-6">{children}</div> : null}

            {/* Closing note */}
            {section.closing && (
              <div className="relative mt-7 overflow-hidden rounded-2xl border border-[#41B6E6]/20 bg-[#F2F9FD] p-4 sm:p-5">
                <div
                  aria-hidden="true"
                  className="absolute -right-5 -top-6 h-24 w-24 rounded-full bg-[#41B6E6]/10 blur-2xl"
                />

                <div className="relative flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#007FAF] shadow-sm ring-1 ring-[#41B6E6]/15">
                    <Sparkles className="h-4 w-4" />
                  </span>

                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#007FAF]">
                      Keep in mind
                    </p>

                    <p className="mt-1.5 text-sm leading-7 text-[#34516A]">
                      {section.closing}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </GuidelinesMotion>
  );
};
