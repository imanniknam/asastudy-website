"use client";

import { useLocale, useTranslations } from "next-intl";
import type { City, Locale } from "@/types/city";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Prose({ text }: { text: string }) {
  return (
    <div className="flex flex-col gap-3">
      {text
        .split(/\n\n+/)
        .filter(Boolean)
        .map((p, i) => (
          <p key={i} className="text-[15px] leading-relaxed text-muted">
            {p}
          </p>
        ))}
    </div>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-text"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function CitySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold tracking-tight text-text sm:text-2xl">{title}</h2>
      {children}
    </section>
  );
}

export function CityExpenses({ expenses }: { expenses: City["expenses"] }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("citiesPage");

  if (expenses.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-[var(--radius-md)] border border-border">
      <table className="w-full text-start text-sm">
        <thead className="bg-surface">
          <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
            <th className="px-4 py-3 text-start font-medium">{t("expenseType")}</th>
            <th className="px-4 py-3 text-start font-medium">{t("expenseSituation")}</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp, i) => (
            <tr key={i} className="border-b border-border bg-background/40 last:border-0">
              <td className="px-4 py-3 font-medium text-text">{exp.type[locale]}</td>
              <td className="px-4 py-3 text-muted">{exp.situation[locale]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CitySeasons({ seasons }: { seasons: NonNullable<City["seasons"]> }) {
  const locale = useLocale() as Locale;
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {seasons.map((season, i) => (
        <div key={i} className="rounded-[var(--radius-md)] border border-border bg-surface p-5">
          <h3 className="text-sm font-semibold text-text">{season.name[locale]}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{season.description[locale]}</p>
        </div>
      ))}
    </div>
  );
}

export function CityFaq({ faq }: { faq: NonNullable<City["faq"]> }) {
  const locale = useLocale() as Locale;
  return (
    <Accordion type="single" collapsible className="flex flex-col gap-3">
      {faq.map((item, i) => (
        <AccordionItem key={i} value={`faq-${i}`}>
          <AccordionTrigger>{item.question[locale]}</AccordionTrigger>
          <AccordionContent>{item.answer[locale]}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export { Prose as CityProse, Chips as CityChips };
