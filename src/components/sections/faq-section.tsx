"use client";

import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/section-heading";
import { FaqAccordionOnly } from "@/components/sections/faq-accordion-only";

export function FaqSection({ namespace = "home.faq" }: { namespace?: string }) {
  const t = useTranslations(namespace);

  return (
    <section className="bg-surface py-20 sm:py-28">
      <div className="container-page flex flex-col gap-12">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        <FaqAccordionOnly namespace={namespace} />
      </div>
    </section>
  );
}
