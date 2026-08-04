"use client";

import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/fade-in";

export function JourneyTimeline() {
  const t = useTranslations("home.journey");
  const steps = t.raw("steps") as { title: string; description: string }[];

  return (
    <section className="py-20 sm:py-28">
      <div className="container-page flex flex-col gap-14">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <div className="relative mx-auto grid w-full max-w-4xl gap-6">
          <div className="absolute start-5 top-2 hidden h-[calc(100%-2rem)] w-px bg-border sm:block" />
          {steps.map((step, i) => (
            <FadeIn key={step.title} delay={i * 0.08}>
              <div className="relative flex gap-5 rounded-[var(--radius-lg)] border border-border bg-surface p-6 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-primary/5 sm:ps-6">
                <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {i + 1}
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-semibold text-text">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{step.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
