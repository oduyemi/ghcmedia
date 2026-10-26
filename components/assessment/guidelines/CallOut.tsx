
import { HeartHandshake, Sparkles } from "lucide-react";



export const GuidelinesCallout = () => {
  return (
    <aside className="relative isolate overflow-hidden rounded-[24px] border border-[#00A3E0]/15 bg-[#F1F9FD] p-6 sm:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-16 -z-10 h-48 w-48 rounded-full bg-[#41B6E6]/15 blur-3xl"
      />

      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#007FAF] shadow-sm ring-1 ring-[#00A3E0]/10">
          <HeartHandshake className="h-5 w-5" />
        </div>

        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.17em] text-[#007FAF]">
            <Sparkles className="h-3.5 w-3.5" />
            Our shared commitment
          </div>

          <h2 className="mt-3 text-xl font-bold leading-snug tracking-tight text-[#0C2340] sm:text-2xl">
            Serve with excellence. Grow through feedback.
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            We are committed to using our gifts and skills to support the work
            of the ministry. Every assessment is an opportunity to strengthen
            our craft, serve one another, and contribute meaningfully to the
            Media Team.
          </p>

          <p className="mt-4 text-xs leading-6 text-slate-500">
            Please follow any additional instructions communicated by Media
            Team leadership for your specific assessment.
          </p>
        </div>
      </div>
    </aside>
  );
}
