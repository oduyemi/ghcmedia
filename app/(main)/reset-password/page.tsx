
import { Suspense } from "react";
import Link from "next/link";
import { KeyRound } from "lucide-react";
import { PasswordForm } from "@/components/auth/password";


export const metadata = {
  title: "Reset Password | Media Team Portal",
  description: "Securely reset your Media Team Portal password.",
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F9FC] px-4 py-12">
      <section className="w-full max-w-md">
        <div className="mb-7 text-center">
          <h1 className="mt-12 text-2xl font-bold tracking-tight text-[#0C2340] sm:text-3xl">
            Choose a new password
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
            Enter a new password for your account. Your reset link must be valid and unused.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-slate-900/[0.04] sm:p-7">
          <Suspense
            fallback={
              <div className="py-10 text-center text-sm text-slate-500">
                Loading password reset...
              </div>
            }
          >
            <PasswordForm mode="reset" />
          </Suspense>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#007FAF] underline-offset-4 hover:underline"
          >
            Return to sign in
          </Link>
        </p>
      </section>
    </main>
  );
}
