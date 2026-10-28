"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setError(
          result?.message ||
            result?.error ||
            "We couldn't sign you in. Check your credentials and try again.",
        );
        return;
      }

      // First-time users must use their invitation link to set a password.
      if (result?.user?.firstLogin) {
        setError(
          "Your account setup is not complete. Please use the password setup link sent to your email, or contact church leadership for a new invitation.",
        );
        return;
      }

      const role = result?.user?.role;

      if (role !== "admin" && role !== "member") {
        setError(
          "Your account role could not be verified. Please contact church leadership.",
        );
        return;
      }

      router.replace(role === "admin" ? "/admin" : "/portal");
      router.refresh();
    } catch {
      setError(
        "We couldn't connect to the sign-in service. Check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClassName =
    "h-12 rounded-xl border-slate-200 bg-transparent px-4 text-sm text-[#0C2340] shadow-sm shadow-slate-900/[0.02] transition-[border-color,box-shadow] duration-200 placeholder:text-slate-400 hover:border-slate-300 focus-visible:border-[#00A3E0] focus-visible:ring-2 focus-visible:ring-[#00A3E0]/20 focus-visible:ring-offset-0";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      aria-busy={isSubmitting}
    >
      <div className="space-y-2">
        <Label
          htmlFor="email"
          className="text-[13px] font-semibold text-[#0C2340]"
        >
          Email address
        </Label>

        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          inputMode="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (error) setError("");
          }}
          required
          maxLength={254}
          disabled={isSubmitting}
          className={inputClassName}
        />
      </div>

      <div className="my-4 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <Label
            htmlFor="password"
            className="text-[13px] font-semibold text-[#0C2340]"
          >
            Password
          </Label>

          <Link
            href="/forgot-password"
            className="text-xs font-semibold text-[#007FAF] underline-offset-4 transition-colors hover:text-[#0C2340] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2"
          >
            Forgot password?
          </Link>
        </div>

        <div className="relative mb-4">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              if (error) setError("");
            }}
            required
            disabled={isSubmitting}
            className={`${inputClassName} pr-12`}
          />

          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            aria-controls="password"
            disabled={isSubmitting}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-slate-400 transition-colors hover:text-[#007FAF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00A3E0] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {showPassword ? (
              <EyeOff aria-hidden="true" className="h-[17px] w-[17px]" />
            ) : (
              <Eye aria-hidden="true" className="h-[17px] w-[17px]" />
            )}
          </button>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          aria-live="polite"
          className="flex items-start gap-3 rounded-xl border border-rose-200/80 bg-rose-50 px-4 py-3.5 text-sm text-rose-700"
        >
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100">
            <span className="text-xs font-bold">!</span>
          </span>
          <p className="leading-5">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting || !email.trim() || !password}
        className="my-4 group h-12 w-full rounded-xl bg-[#0C2340] text-sm font-semibold text-white shadow-md shadow-[#0C2340]/10 transition-all duration-200 hover:bg-[#00A3E0] hover:shadow-lg hover:shadow-[#00A3E0]/15 focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
      >
        {isSubmitting ? (
          <>
            <LoaderCircle
              aria-hidden="true"
              className="mr-2 h-4 w-4 animate-spin motion-reduce:animate-none"
            />
            Signing you in...
          </>
        ) : (
          <>
            Sign in to your account
            <ArrowRight
              aria-hidden="true"
              className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </>
        )}
      </Button>

      <div className="relative overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50/80 p-4">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-[#00A3E0] to-[#41B6E6]"
        />

        <div className="flex items-start gap-3 pl-1">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#00A3E0]/10 bg-white text-[#007FAF] shadow-sm">
            <LockKeyhole aria-hidden="true" className="h-[18px] w-[18px]" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-[#0C2340]">
              Private team access
            </p>

            <p className="mt-1.5 text-[11px] leading-[1.7] text-slate-500">
              This portal is exclusively for authorized Media Team members.
              Access is managed by church leadership.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};
