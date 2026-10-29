
"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


interface RatingsLoginDialogProps {
  open: boolean;
  onAuthenticated: () => void;
}


interface LoginResponse {
  message?: string;
  error?: string;
  user?: {
    _id: string;
    email: string;
    role: string;
  };
}

export const RatingsLoginDialog = ({
  open,
  onAuthenticated,
}: RatingsLoginDialogProps) => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "same-origin",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = (await response.json()) as LoginResponse;

      if (!response.ok) {
        throw new Error(
          data.error ?? data.message ?? "Unable to sign in. Check your details and try again."
        );
      }

      // Confirm that the newly issued cookie establishes a valid session.
      const sessionResponse = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "same-origin",
        cache: "no-store",
        headers: { Accept: "application/json" },
      });

      if (!sessionResponse.ok) {
        throw new Error(
          "Login was accepted, but your session could not be verified. Please try again."
        );
      }

      setPassword("");
      onAuthenticated();
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen && !open) return;
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="w-[calc(100%-2rem)] max-w-md rounded-2xl border border-slate-200 bg-white p-0 shadow-2xl sm:rounded-3xl"
      >
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl">
          <div className="bg-[#0C2340] px-6 py-8 text-white sm:px-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00A3E0]/15 text-[#41B6E6]">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6"
              >
                <path
                  d="M12 3 19 6V11.5C19 16 16 19 12 21C8 19 5 16 5 11.5V6L12 3Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
                <path
                  d="m9 12 2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <DialogHeader className="space-y-2 text-left">
              <DialogTitle className="text-2xl font-bold tracking-tight text-white">
                Sign in to continue
              </DialogTitle>
              <DialogDescription className="text-sm leading-6 text-slate-300">
                Sign in with your Media Team account to access Ratings &amp;
                Reports.
              </DialogDescription>
            </DialogHeader>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-8">
            <div className="space-y-2">
              <Label htmlFor="ratings-login-email" className="text-slate-700">
                Email address
              </Label>
              <Input
                id="ratings-login-email"
                type="email"
                autoComplete="username"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                disabled={isSubmitting}
                className="h-12 my-4 rounded-xl border-slate-200 focus-visible:ring-[#00A3E0]"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="ratings-login-password"
                className="text-slate-700"
              >
                Password
              </Label>

              <div className="relative">
                <Input
                  id="ratings-login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  disabled={isSubmitting}
                  className="h-12 my-4 rounded-xl border-slate-200 pr-20 focus-visible:ring-[#00A3E0]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute inset-y-0 right-3 text-sm font-medium text-slate-500 transition-colors hover:text-[#0C2340]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700"
              >
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full rounded-xl bg-[#0C2340] font-semibold text-white transition-colors hover:bg-[#15385F] focus-visible:ring-[#00A3E0]"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Signing in…
                </span>
              ) : (
                "Sign in to view reports"
              )}
            </Button>

            <p className="text-center text-xs leading-5 text-slate-500">
              Access is available to authorized Media Team accounts.
              Contact the team leadership if you need an account.
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
