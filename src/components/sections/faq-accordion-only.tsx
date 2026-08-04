"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/fade-in";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqAccordionOnly({ namespace = "home.faq" }: { namespace?: string }) {
  const t = useTranslations(namespace);
  const items = t.raw("items") as { question: string; answer: string }[];

  return (
    <FadeIn className="mx-auto flex w-full max-w-3xl flex-col gap-3">
      <Accordion type="single" collapsible className="flex flex-col gap-3">
        {items.map((item, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </FadeIn>
  );
}
