"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-[var(--radius-lg)] border border-border bg-surface p-10 text-center">
        <CheckCircle2 className="size-10 text-accent" />
        <p className="text-sm font-medium text-text">
          Thank you — an advisor will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-text">
          {t("name")}
        </label>
        <input
          id="name"
          name="name"
          required
          className="h-11 rounded-[var(--radius-sm)] border border-border bg-surface px-4 text-sm text-text outline-none transition-colors focus:border-accent/50"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-text">
          {t("email")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="h-11 rounded-[var(--radius-sm)] border border-border bg-surface px-4 text-sm text-text outline-none transition-colors focus:border-accent/50"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="text-sm font-medium text-text">
          {t("phone")}
        </label>
        <input
          id="phone"
          name="phone"
          className="h-11 rounded-[var(--radius-sm)] border border-border bg-surface px-4 text-sm text-text outline-none transition-colors focus:border-accent/50"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-text">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="rounded-[var(--radius-sm)] border border-border bg-surface px-4 py-3 text-sm text-text outline-none transition-colors focus:border-accent/50"
        />
      </div>

      <Button type="submit" variant="accent" size="lg" className="mt-2">
        {t("submit")}
        <Send className="size-4" />
      </Button>
    </form>
  );
}
