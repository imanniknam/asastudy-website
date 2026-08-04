"use client";

import { useTranslations } from "next-intl";
import { GraduationCap, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { LogoMark } from "@/components/layout/logo-mark";

export function AboutSection() {
  const t = useTranslations("home.about");

  const highlights = [
    { icon: GraduationCap, label: t("highlightUniversities") },
    { icon: HeartHandshake, label: t("highlightSupport") },
    { icon: ShieldCheck, label: t("highlightTransparency") },
  ];

  return (
    <section className="py-20 sm:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <FadeIn className="order-2 flex flex-col items-start gap-5 lg:order-1">
          <Badge>{t("eyebrow")}</Badge>
          <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
            {t("title")}
          </h2>
          <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {t("body")}
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="order-1 lg:order-2">
          <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-gradient-to-br from-primary to-[#0a1f38] p-7 shadow-xl sm:p-9">
            <div className="absolute inset-0 bg-grid-fade opacity-20" />
            <div
              className="pointer-events-none absolute -end-16 -top-16 size-56 rounded-full opacity-50 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(37,99,235,0.6) 0%, rgba(18,53,91,0) 70%)",
              }}
            />

            <div className="relative flex flex-col gap-7">
              <div className="flex items-center justify-between gap-4">
                <LogoMark tone="light" className="h-11 w-11" />
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/85 backdrop-blur-sm">
                  <Sparkles className="size-3.5" />
                  ASA-STUDY
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {highlights.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-[var(--radius-md)] border border-white/10 bg-white/10 p-4 backdrop-blur-sm transition-colors hover:border-white/25 hover:bg-white/15"
                  >
                    <Icon className="size-5 shrink-0 text-accent" />
                    <span className="text-sm font-medium leading-snug text-white">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
