
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  AudioLines,
  Camera,
  Check,
  Clapperboard,
  Globe,
  Radio,
  ShieldCheck,
  Sparkles,
  Video,
} from "lucide-react";

import { LoginForm } from "@/components/auth/Login";
import ContactMediaDialog from "@/dialogs/contact-dialog";

export const metadata: Metadata = {
  title: "Member Sign In | Global Harvest Church Media",
  description:
    "Sign in to the Global Harvest Church Media Team portal.",
  robots: {
    index: false,
    follow: false,
  },
};

const mediaRoles = [
  { icon: Camera, label: "Photography", number: "01" },
  { icon: Video, label: "Videography", number: "02" },
  { icon: AudioLines, label: "Production", number: "03" },
  { icon: Radio, label: "Livestream", number: "04" },
  { icon: Globe, label: "Digital & Software", number: "05" },
];

export default function Login() {
  return (
    <main className="mt-16 gh-login relative isolate flex min-h-screen flex-col overflow-hidden bg-transparent text-[#0C2340]">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -right-40 -top-48 h-[34rem] w-[34rem] rounded-full bg-[#00A3E0]/[0.09] blur-[110px]" />
        <div className="absolute -bottom-56 -left-40 h-[36rem] w-[36rem] rounded-full bg-[#FFC72C]/[0.10] blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#0C2340_0.6px,transparent_0.6px)] bg-[size:25px_25px] opacity-[0.04]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00A3E0]/30 to-transparent" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1600px] flex-1 items-center justify-center px-4 pb-8 pt-4 sm:px-8 sm:pb-10 lg:px-12 lg:py-8">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[26px] border border-white/90 bg-white shadow-[0_35px_100px_-42px_rgba(12,35,64,0.30)] ring-1 ring-[#0C2340]/[0.035] sm:rounded-[32px] lg:min-h-[650px] lg:grid-cols-[0.97fr_1.03fr]">
          <section className="relative hidden flex-col justify-between overflow-hidden bg-[#0C2340] p-9 text-white lg:flex xl:p-12 2xl:p-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(0,163,224,0.14),transparent_43%,transparent_75%,rgba(65,182,230,0.07))]" />

              <div className="absolute -right-32 -top-28 h-[390px] w-[390px] rounded-full border border-white/[0.07]" />
              <div className="absolute -right-20 -top-16 h-[290px] w-[290px] rounded-full border border-[#41B6E6]/20" />
              <div className="absolute -right-8 top-0 h-[190px] w-[190px] rounded-full border border-white/[0.08]" />

              <div className="absolute -bottom-24 -left-20 h-[320px] w-[320px] rounded-full bg-[#00A3E0]/15 blur-[90px]" />

              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

              <div className="absolute right-10 top-10 grid grid-cols-3 gap-2 opacity-30">
                {Array.from({ length: 9 }).map((_, index) => (
                  <span
                    key={index}
                    className="h-1 w-1 rounded-full bg-[#41B6E6]"
                  />
                ))}
              </div>

              <div className="absolute bottom-[36%] left-0 h-px w-full bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
            </div>

            {/* Brand and access status */}
            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-[16px] border border-white/10 bg-white/[0.07] shadow-inner shadow-white/[0.04]">
                  <Clapperboard className="h-5 w-5 text-[#41B6E6]" />
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-[10px] font-medium tracking-wide text-white/75">
                    Member workspace
                  </span>
                </div>
              </div>

              {/* Cinematic focal visual */}
              <div
                aria-hidden="true"
                className="relative mt-9 h-[142px] overflow-hidden rounded-2xl border border-white/10 bg-[#07182B] xl:h-[158px]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_42%,rgba(0,163,224,0.28),transparent_55%)]" />

                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />

                <div className="absolute -right-6 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full border border-[#41B6E6]/15" />
                <div className="absolute right-4 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full border border-[#41B6E6]/20" />
                <div className="absolute right-14 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full border border-[#41B6E6]/30" />

                <div className="absolute right-[5.65rem] top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-2xl border border-[#41B6E6]/30 bg-[#00A3E0]/10 text-[#7DD3FC] shadow-[0_0_35px_rgba(0,163,224,0.16)]">
                  <Clapperboard className="h-5 w-5" />
                </div>

                <div className="absolute bottom-4 left-4">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#41B6E6]">
                    Creativity with purpose
                  </p>
                  <p className="mt-1.5 text-xs text-white/65">
                    Every moment has a story.
                  </p>
                </div>

                <div className="absolute right-4 top-4 flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-[#41B6E6]/80" />
                  <span className="text-[9px] font-medium uppercase tracking-[0.17em] text-white/40">
                    Media / 001
                  </span>
                </div>
              </div>

              <div className="mt-8 xl:mt-9">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#41B6E6]">
                  Behind every moment
                </p>

                <h1 className="max-w-md text-[2.8rem] font-semibold leading-[1.04] tracking-[-0.055em] xl:text-[3.45rem]">
                  Your work helps
                  <br />
                  tell{" "}
                  <span className="bg-gradient-to-r from-[#41B6E6] via-[#7DD3FC] to-white bg-clip-text text-transparent">
                    the story.
                  </span>
                </h1>

                <p className="mt-5 max-w-sm text-[13px] leading-7 text-slate-300/80 xl:text-sm">
                  Every frame captures a moment. Every sound carries a
                  message. Every detail helps bring the vision to life.
                  Welcome to your creative workspace.
                </p>
              </div>
            </div>

            {/* Creative disciplines */}
            <div className="relative mt-9">
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
                  Our creative disciplines
                </p>
                <span className="text-[10px] tabular-nums text-white/35">
                  01 — 05
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {mediaRoles.map(({ icon: Icon, label, number }) => (
                  <div
                    key={label}
                    className={`group flex min-w-0 items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.035] px-3 py-3 transition-colors duration-200 hover:border-[#41B6E6]/25 hover:bg-white/[0.07] ${
                      label === "Digital & Software" ? "col-span-2" : ""
                    }`}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#41B6E6]/10 text-[#41B6E6] transition-colors group-hover:bg-[#41B6E6]/20">
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[11px] font-medium text-white/85">
                        {label}
                      </p>
                    </div>

                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-white/20 transition-colors group-hover:text-[#41B6E6]" />
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-7 flex items-center gap-2 border-t border-white/10 pt-5">
              <ShieldCheck className="h-4 w-4 text-[#41B6E6]" />
              <p className="text-[10px] leading-5 text-white/45">
                A dedicated space for the people behind the production.
              </p>
            </div>
          </section>

          {/* Login form */}
          <section className="relative flex items-center px-5 py-8 sm:px-10 sm:py-12 lg:px-10 lg:py-12 xl:px-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[#00A3E0]/[0.045] blur-3xl"
            />

            <div className="relative mx-auto w-full max-w-[390px]">
              <div className="mb-8">
                <h2 className="text-[2.15rem] font-bold leading-tight tracking-[-0.055em] text-[#0C2340] sm:text-[2.65rem]">
                  Welcome back<span className="text-[#00A3E0]">.</span>
                </h2>

                <p className="mt-3 max-w-sm text-[13px] leading-6 text-slate-500 sm:text-sm">
                  Your team, your tools, your next assignment. Sign in to
                  pick up where you left off.
                </p>
              </div>

              <LoginForm />

              {/* Contact and access support */}
              <div className="mt-8 border-t border-slate-100 pt-6">
                <p className="text-center text-xs text-slate-500">
                  Not part of the portal yet?
                </p>

                <div className="mt-3 flex justify-center">
                  <ContactMediaDialog />
                </div>
              </div>

              <p className="mt-7 text-center text-[10px] leading-5 text-slate-400">
                By signing in, you confirm that you are an authorized member
                of the Global Harvest Church Media Team.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
