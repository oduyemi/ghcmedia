"use client";
import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PasswordFormMode = "setup" | "reset";

interface PasswordFormProps {
  mode: PasswordFormMode;
}

export function PasswordForm({ mode }: PasswordFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token") ?? "";
  const isSetup = mode === "setup";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const inputClassName =
    "h-12 rounded-xl border-slate-200 bg-transparent px-4 text-sm text-[#0C2340] shadow-sm shadow-slate-900/[0.02] transition-colors placeholder:text-slate-400 hover:border-slate-300 focus-visible:border-[#00A3E0] focus-visible:ring-2 focus-visible:ring-[#00A3E0]/20 focus-visible:ring-offset-0";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    setError("");

    if (!token) {
      setError(
        isSetup
          ? "This invitation link is missing its token. Please request a new invitation."
          : "This password reset link is missing its token. Please request another reset email.",
      );
      return;
    }

    if (password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (new TextEncoder().encode(password).length > 72) {
      setError("Your password must not exceed 72 bytes.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const endpoint = isSetup
        ? "/api/auth/setup-password"
        : "/api/auth/reset-password";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ token, password }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setError(
          result?.error ||
            result?.message ||
            "We couldn't update your password. The link may have expired or already been used.",
        );
        return;
      }

      setSuccess(true);

      if (isSetup) {
        // Setup endpoint should create the authenticated cookie.
        router.replace(
          result?.user?.role === "admin" ? "/admin" : "/portal",
        );
        router.refresh();
      }
    } catch {
      setError("Unable to connect. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (success && !isSetup) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
          <CheckCircle2 className="h-6 w-6" />
        </div>

        <h2 className="mt-4 text-lg font-semibold text-[#0C2340]">
          Password updated
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Your password has been changed. You can now sign in with your new password.
        </p>

        <Button
          type="button"
          onClick={() => router.replace("/login")}
          className="mt-5 h-11 w-full rounded-xl bg-[#0C2340] text-white hover:bg-[#00A3E0]"
        >
          Return to sign in
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" aria-busy={isSubmitting}>
      <div className="space-y-2 mb-4">
        <Label htmlFor="new-password" className="text-[13px] font-semibold text-[#0C2340]">
          New password
        </Label>

        <div className="relative">
          <Input
            id="new-password"
            name="new-password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError("");
            }}
            minLength={8}
            maxLength={72}
            required
            disabled={isSubmitting}
            className={`${inputClassName} pr-12`}
          />

          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Hide new password" : "Show new password"}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-slate-400 hover:text-[#007FAF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00A3E0]"
          >
            {showPassword ? <EyeOff className="h-[17px] w-[17px]" /> : <Eye className="h-[17px] w-[17px]" />}
          </button>
        </div>

        <p className="text-xs leading-5 text-slate-500 mt-4">
          Use at least 8 characters. Avoid reusing a password from another account.
        </p>
      </div>

      <div className="space-y-2 mb-4">
        <Label htmlFor="confirm-password" className="text-[13px] font-semibold text-[#0C2340]">
          Confirm new password
        </Label>

        <div className="relative">
          <Input
            id="confirm-password"
            name="confirm-password"
            type={showConfirmation ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Enter your password again"
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
              setError("");
            }}
            required
            disabled={isSubmitting}
            className={`${inputClassName} pr-12`}
          />

          <button
            type="button"
            onClick={() => setShowConfirmation((value) => !value)}
            aria-label={showConfirmation ? "Hide confirmation" : "Show confirmation"}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-slate-400 hover:text-[#007FAF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00A3E0]"
          >
            {showConfirmation ? <EyeOff className="h-[17px] w-[17px]" /> : <Eye className="h-[17px] w-[17px]" />}
          </button>
        </div>
      </div>

      {error && (
        <div role="alert" aria-live="polite" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-5 text-rose-700">
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={
          isSubmitting ||
          !password ||
          !confirmPassword ||
          !token
        }
        className="group h-12 w-full rounded-xl bg-[#0C2340] text-sm font-semibold text-white shadow-md shadow-[#0C2340]/10 transition-all hover:bg-[#00A3E0] focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            Updating password...
          </>
        ) : (
          <>
            {isSetup ? "Set up my password" : "Reset my password"}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </Button>

      <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-4 mt-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#00A3E0]/10 bg-white text-[#007FAF] shadow-sm">
            {isSetup ? (
              <ShieldCheck className="h-[18px] w-[18px]" />
            ) : (
              <KeyRound className="h-[18px] w-[18px]" />
            )}
          </div>

          <div>
            <p className="text-xs font-semibold text-[#0C2340] mt-4">
              {isSetup ? "Secure account activation" : "Secure password recovery"}
            </p>
            <p className="mt-1.5 text-[11px] leading-[1.7] text-slate-500">
              {isSetup
                ? "Your invitation link is single-use and expires after 30 minutes."
                : "Your reset link must be valid and unused. If it expires, request another email."}
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
