"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";

export function ProgramsTeaser() {
  const t = useTranslations("home.programs");
  const items = t.raw("items") as string[];

  return (
    <section className="py-20 sm:py-28">
      <div className="container-page flex flex-col items-center gap-10">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <div className="flex flex-wrap justify-center gap-3">
          {items.map((item, i) => (
            <FadeIn key={item} delay={i * 0.05}>
              <span className="inline-flex items-center rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-text transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent">
                {item}
              </span>
            </FadeIn>
          ))}
        </div>

        <Button asChild variant="secondary">
          <Link href="/universities">
            {t("cta")}
            <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
