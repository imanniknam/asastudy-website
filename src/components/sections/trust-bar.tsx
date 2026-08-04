"use client";

import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";

export function TrustBar() {
  const t = useTranslations("home.trust");
  const items = t.raw("items") as string[];

  return (
    <section className="border-b border-border bg-surface">
      <div className="container-page grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:py-10">
        {items.map((item, i) => (
          <FadeIn key={item} delay={i * 0.06} className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" />
            <span className="text-sm font-medium leading-snug text-text">{item}</span>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
