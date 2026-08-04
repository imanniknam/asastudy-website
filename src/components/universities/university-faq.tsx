"use client";

import { useLocale, useTranslations } from "next-intl";
import type { FaqItem, Locale } from "@/types/university";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function UniversityFaq({ items }: { items: FaqItem[] }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("common");

  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold tracking-tight text-text sm:text-2xl">{t("faq")}</h2>
      <Accordion type="single" collapsible className="flex flex-col gap-3">
        {items.map((item, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger>{item.question[locale]}</AccordionTrigger>
            <AccordionContent>{item.answer[locale]}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
