
"use client";
import { useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle, MessageCircle, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CONTACT_OPTIONS = [
  { value: "general-enquiry", label: "General enquiry" },
  { value: "media-team", label: "Joining the media team" },
  { value: "photography-videography", label: "Photography or videography" },
  { value: "livestream", label: "Livestream or technical support" },
  { value: "website-social-media", label: "Website or social media" },
  { value: "event-coverage", label: "Event coverage" },
  { value: "volunteering", label: "Volunteering or collaboration" },
  { value: "other", label: "Something else" },
] as const;

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  enquiryType: string;
  subject: string;
  message: string;
}

interface ContactMediaDialogProps {
  onSubmit?: (data: ContactFormData) => Promise<void> | void;
}

const initialForm: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  enquiryType: "",
  subject: "",
  message: "",
};

export default function ContactMediaDialog({
  onSubmit,
}: ContactMediaDialogProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function updateField<K extends keyof ContactFormData>(
    field: K,
    value: ContactFormData[K],
  ) {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!form.enquiryType) {
      setError("Please select how we can help you.");
      return;
    }

    if (!onSubmit) {
      setError(
        "The contact form is not connected to a submission service yet.",
      );
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(form);
      setSuccess(true);
      setForm(initialForm);
    } catch {
      setError(
        "We couldn't send your message. Please try again in a moment.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (!nextOpen) {
      setError("");
      setSuccess(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Button
        type="button"
        variant="outline"
        onClick={() => handleOpenChange(true)}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#0C2340]/35 bg-transparent px-7 text-sm font-semibold text-[#0C2340] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0C2340] hover:bg-[#0C2340]/[0.04] focus-visible:ring-2 focus-visible:ring-[#00A3E0] sm:w-auto sm:min-w-[190px]"
      >
        Contact Media Leadership
        <MessageCircle className="ml-2 h-4 w-4" />
      </Button>

      <DialogContent className="max-h-[90dvh] overflow-y-auto border-0 bg-white p-0 shadow-2xl sm:max-w-[640px] sm:rounded-3xl">
        {success ? (
          <div className="px-6 py-12 text-center sm:px-10 sm:py-16">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <DialogHeader className="items-center space-y-3">
              <DialogTitle className="text-2xl font-bold tracking-tight text-[#0C2340] sm:text-3xl">
                Message received!
              </DialogTitle>
              <DialogDescription className="max-w-sm text-base leading-7 text-slate-600">
                Thank you for reaching out to the Media Team. We appreciate
                your message and look forward to connecting with you.
              </DialogDescription>
            </DialogHeader>

            <Button
              type="button"
              onClick={() => {
                setSuccess(false);
                setOpen(false);
              }}
              className="mt-8 min-h-11 rounded-full bg-[#0C2340] px-7 text-white hover:bg-[#00A3E0]"
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <div className="relative overflow-hidden bg-[#0C2340] px-6 py-7 text-white sm:px-9 sm:py-9">
              <div className="pointer-events-none absolute -right-12 -top-20 h-48 w-48 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute -right-2 -top-10 h-32 w-32 rounded-full border border-[#00A3E0]/40" />

              <div className="relative">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[#41B6E6] ring-1 ring-white/15">
                  <MessageCircle className="h-5 w-5" />
                </div>

                <DialogHeader className="space-y-3 text-left">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#41B6E6]">
                    Let&apos;s connect
                  </p>
                  <DialogTitle className="max-w-md text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
                    Get in touch with Media Leadership
                  </DialogTitle>
                  <DialogDescription className="max-w-md text-sm leading-6 text-white/70 sm:text-base">
                    Have a question, an idea, or want to serve with us? Tell
                    us a little about what you need.
                  </DialogDescription>
                </DialogHeader>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 px-6 py-7 sm:px-9 sm:py-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact-name" className="text-sm font-semibold text-[#0C2340]">
                    Full name <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    required
                    maxLength={100}
                    className="h-12 rounded-xl border-slate-200 bg-slate-50/70 px-4 placeholder:text-slate-400 focus-visible:ring-[#00A3E0]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-email" className="text-sm font-semibold text-[#0C2340]">
                    Email address <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    required
                    maxLength={254}
                    className="h-12 rounded-xl border-slate-200 bg-slate-50/70 px-4 placeholder:text-slate-400 focus-visible:ring-[#00A3E0]"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact-phone" className="text-sm font-semibold text-[#0C2340]">
                    Phone number
                  </Label>
                  <Input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Your phone number"
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    maxLength={30}
                    className="h-12 rounded-xl border-slate-200 bg-slate-50/70 px-4 placeholder:text-slate-400 focus-visible:ring-[#00A3E0]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-enquiry" className="text-sm font-semibold text-[#0C2340]">
                    How can we help you? <span className="text-rose-500">*</span>
                  </Label>
                  <Select
                    value={form.enquiryType}
                    onValueChange={(value) => {
                      if (value !== null) {
                        updateField("enquiryType", value);
                      }
                    }}
                  >
                    <SelectTrigger
                      id="contact-enquiry"
                      className="h-12 rounded-xl border-slate-200 bg-slate-50/70 px-4 focus:ring-[#00A3E0]"
                      aria-label="How can we help you?"
                    >
                      <SelectValue placeholder="Choose an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {CONTACT_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-subject" className="text-sm font-semibold text-[#0C2340]">
                  Subject <span className="text-rose-500">*</span>
                </Label>
                <Input
                  id="contact-subject"
                  name="subject"
                  placeholder="What is your message about?"
                  value={form.subject}
                  onChange={(event) => updateField("subject", event.target.value)}
                  required
                  maxLength={150}
                  className="h-12 rounded-xl border-slate-200 bg-slate-50/70 px-4 placeholder:text-slate-400 focus-visible:ring-[#00A3E0]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-message" className="text-sm font-semibold text-[#0C2340]">
                  Message <span className="text-rose-500">*</span>
                </Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  placeholder="Share a few details so we can better assist you..."
                  value={form.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  required
                  minLength={10}
                  maxLength={3000}
                  rows={4}
                  className="min-h-32 resize-y rounded-xl border-slate-200 bg-slate-50/70 px-4 py-3 placeholder:text-slate-400 focus-visible:ring-[#00A3E0]"
                />
                <p className="text-right text-xs text-slate-400">
                  {form.message.length}/3000
                </p>
              </div>

              {error && (
                <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </p>
              )}

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xs text-xs leading-5 text-slate-500">
                  Your details will only be used to respond to your enquiry.
                </p>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-h-12 rounded-full bg-[#0C2340] px-7 text-sm font-semibold text-white shadow-md shadow-[#0C2340]/10 transition-all hover:bg-[#00A3E0] disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send message
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
