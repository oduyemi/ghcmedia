
"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowLeft, CheckCircle2, KeyRound, LoaderCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ContactMediaDialog from "@/dialogs/contact-dialog";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [contactOpen, setContactOpen] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email: email.trim() }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setError(
          result?.error ||
            result?.message ||
            "We couldn't process your request. Please try again.",
        );
        return;
      }

      setSubmitted(true);
    } catch {
      setError(
        "We couldn't connect to the password recovery service. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClassName =
    "h-12 rounded-xl border-slate-200 bg-transparent px-4 text-sm text-[#0C2340] shadow-sm shadow-slate-900/[0.02] transition-colors placeholder:text-slate-400 hover:border-slate-300 focus-visible:border-[#00A3E0] focus-visible:ring-2 focus-visible:ring-[#00A3E0]/20 focus-visible:ring-offset-0";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F9FC] px-4 py-12">
      <section className="w-full max-w-md">
        <div className="mb-7 text-center">
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#0C2340] sm:text-3xl">
            Forgot your password?
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
            It happens. Enter your account email and, if an eligible account exists,
            we&apos;ll send you a secure password reset link.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-slate-900/[0.04] sm:p-7">
          {submitted ? (
            <div className="py-3 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-6 w-6" />
              </div>

              <h2 className="mt-4 text-lg font-semibold text-[#0C2340]">
                Check your inbox
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                If an eligible account matches that email, you&apos;ll receive
                instructions to reset your password. Check your spam folder too.
              </p>

              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setSubmitted(false);
                  setEmail("");
                }}
                className="mt-5 h-11 w-full rounded-xl border-slate-200 text-[#0C2340] hover:bg-slate-50"
              >
                Try another email
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" aria-busy={isSubmitting}>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[13px] font-semibold text-[#0C2340]">
                  Email address
                </Label>

                <div className="relative my-4">
                  <Mail
                    aria-hidden="true"
                    className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  />

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setError("");
                    }}
                    maxLength={254}
                    required
                    disabled={isSubmitting}
                    className={`${inputClassName} pl-11`}
                  />
                </div>
              </div>

              {error && (
                <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-5 text-rose-700">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting || !email.trim()}
                className="group h-12 w-full rounded-xl bg-[#0C2340] text-sm font-semibold text-white shadow-md shadow-[#0C2340]/10 transition-all hover:bg-[#00A3E0] focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    Sending request...
                  </>
                ) : (
                  <>
                    Send reset link
                    <Mail className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </Button>
            </form>
          )}

          <div className="mt-6 border-t border-slate-100 pt-5">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#007FAF] transition-colors hover:text-[#0C2340]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to sign in
            </Link>
          </div>
        </div>

        
        <div className="mt-6 text-center text-xs leading-5 text-slate-500">
        Still having trouble?{" "}
        <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="font-semibold text-[#007FAF] underline-offset-4 transition-colors hover:text-[#0C2340] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2"
        >
            Contact church leadership
        </button>
        </div>

        <ContactMediaDialog
            open={contactOpen}
            onOpenChange={setContactOpen}
            onSubmit={async (data) => {
                const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                });

                if (!response.ok) {
                throw new Error("Unable to send the contact message.");
                }
            }}
        />

      </section>
    </main>
  );
}
