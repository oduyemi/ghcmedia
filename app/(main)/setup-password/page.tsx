
import { Suspense } from "react";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { PasswordForm } from "@/components/auth/password";


export const metadata = {
  title: "Set Up Password | Media Team Portal",
  description: "Securely activate your Media Team Portal account.",
  robots: { index: false, follow: false },
};




export default function SetupPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F9FC] px-4 py-12">
      <section className="w-full max-w-md">
        <div className="mb-7 text-center">
          <h1 className="mt-12 text-2xl font-bold tracking-tight text-[#0C2340] sm:text-3xl">
            Set up your password
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
            Welcome to the team. Create a secure password to activate your account.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-slate-900/[0.04] sm:p-7">
          <Suspense
            fallback={
              <div className="py-10 text-center text-sm text-slate-500">
                Loading secure password setup...
              </div>
            }
          >
            <PasswordForm mode="setup" />
          </Suspense>
        </div>

        <p className="mt-6 text-center text-xs leading-5 text-slate-500">
          Having trouble with your invitation?{" "}
          <Link
            href="/contact"
            className="font-semibold text-[#007FAF] underline-offset-4 hover:underline"
          >
            Contact church leadership
          </Link>
        </p>
      </section>
    </main>
  );
}
