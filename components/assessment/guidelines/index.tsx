
import type { ReactNode } from "react";
import type { GuidelineSectionData } from "./guidelines-data";

type GuidelinesSectionProps = {
  section: GuidelineSectionData;
  children?: ReactNode;
};

export const Guidelines = ({
  section,
  children,
}: GuidelinesSectionProps) => {
  const Icon = section.icon;

  return (
    <article
      id={`guideline-${section.number}`}
      className="scroll-mt-8 border-b border-slate-200/80 py-8 first:pt-0 last:border-b-0 sm:py-10"
    >
      <div className="flex items-start gap-4 sm:gap-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#00A3E0]/15 bg-[#00A3E0]/[0.07] text-[#007FAF] sm:h-12 sm:w-12">
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <span className="text-[10px] font-bold tracking-[0.16em] text-[#007FAF]">
            SECTION {section.number}
          </span>

          <h2 className="mt-2 text-xl font-bold tracking-tight text-[#0C2340] sm:text-2xl">
            {section.title}
          </h2>

          {section.description && (
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {section.description}
            </p>
          )}

          {section.paragraphs?.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-4 text-sm leading-7 text-slate-600"
            >
              {paragraph}
            </p>
          ))}

          {section.bullets && (
            <ul className="mt-4 space-y-3">
              {section.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-3 text-sm leading-6 text-slate-600"
                >
                  <span className="mt-2 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#00A3E0]/10 text-[#007FAF]">
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}

          {section.criteria && (
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {section.criteria.map((criterion, index) => (
                <div
                  key={criterion.title}
                  className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[10px] font-bold text-[#007FAF] shadow-sm ring-1 ring-slate-200/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <h3 className="text-sm font-semibold text-[#0C2340]">
                        {criterion.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-5 text-slate-500">
                        {criterion.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {children}

          {section.closing && (
            <p className="mt-5 rounded-r-xl border-l-2 border-[#41B6E6] bg-[#F4FAFD] px-4 py-3 text-sm leading-6 text-[#34516A]">
              {section.closing}
            </p>
          )}
        </div>
      </div>
    </article>
  );
};
