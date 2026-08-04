"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Search } from "lucide-react";
import type { University, Locale } from "@/types/university";
import { UniversityCard } from "@/components/universities/university-card";
import { FadeIn } from "@/components/motion/fade-in";

export function UniversitiesGrid({ universities }: { universities: University[] }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("common");
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("all");

  const cities = useMemo(() => {
    const set = new Set(universities.map((u) => u.city[locale]));
    return Array.from(set).sort();
  }, [universities, locale]);

  const filtered = useMemo(() => {
    return universities.filter((u) => {
      const matchesQuery =
        query.trim().length === 0 ||
        u.name[locale].toLowerCase().includes(query.toLowerCase()) ||
        u.city[locale].toLowerCase().includes(query.toLowerCase());
      const matchesCity = city === "all" || u.city[locale] === city;
      return matchesQuery && matchesCity;
    });
  }, [universities, query, city, locale]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchUniversities")}
            className="h-11 w-full rounded-[var(--radius-sm)] border border-border bg-surface ps-10 pe-4 text-sm text-text outline-none transition-colors focus:border-accent/50"
          />
        </div>

        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="h-11 rounded-[var(--radius-sm)] border border-border bg-surface px-4 text-sm text-text outline-none transition-colors focus:border-accent/50"
        >
          <option value="all">{t("allCities")}</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted">{t("noResults")}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((university, i) => (
            <FadeIn key={university.slug} delay={(i % 6) * 0.05}>
              <UniversityCard university={university} />
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
