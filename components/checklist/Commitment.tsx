
import {
    HeartHandshake,
    Lightbulb,
    ShieldCheck,
    Users,
  } from "lucide-react";
  
  const commitments = [
    {
      icon: Lightbulb,
      title: "Learn from experience",
      description:
        "Use recorded observations and constructive feedback to identify gaps and improve future preparation.",
    },
    {
      icon: Users,
      title: "Strengthen teamwork",
      description:
        "Promote shared responsibility, clear communication, and dependable collaboration across the team.",
    },
    {
      icon: ShieldCheck,
      title: "Serve responsibly",
      description:
        "Maintain accurate records, respect confidentiality, and handle church resources with care.",
    },
  ];
  
  export const Commitment = () => {
    return (
      <section className="py-2">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00A3E0]/10 text-[#007FAF]">
              <HeartHandshake className="h-6 w-6" />
            </div>
  
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[#007FAF]">
              Our commitment
            </p>
  
            <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-[#0C2340] sm:text-3xl">
              Excellence is a practice we build together.
            </h2>
  
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Every checklist is an opportunity to improve preparation,
              strengthen teamwork, and serve with greater excellence.
              Through consistent documentation and constructive review,
              we can identify gaps, learn from experience, and continually
              improve our service delivery.
            </p>
          </div>
  
          <div className="space-y-3">
            {commitments.map((item, index) => {
              const Icon = item.icon;
  
              return (
                <article
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-[#007FAF]">
                    <Icon className="h-5 w-5" />
                  </div>
  
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-[#0C2340]">
                        {item.title}
                      </h3>
  
                      <span className="text-[10px] font-semibold tracking-wider text-slate-400">
                        0{index + 1}
                      </span>
                    </div>
  
                    <p className="mt-1.5 text-sm leading-6 text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
  