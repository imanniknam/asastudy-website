"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { HeartPulse, Landmark, LayoutGrid, Search } from "lucide-react";
import type { University, Locale, UniversityCategory } from "@/types/university";
import { UniversityCard } from "@/components/universities/university-card";
import { FadeIn } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";

type CategoryFilter = UniversityCategory | "all";

export function UniversitiesGrid({ universities }: { universities: University[] }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("common");
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("all");
  const [category, setCategory] = useState<CategoryFilter>("all");

  const counts = useMemo(
    () => ({
      all: universities.length,
      medical: universities.filter((u) => u.category === "medical").length,
      "non-medical": universities.filter((u) => u.category === "non-medical").length,
    }),
    [universities]
  );

  const tabs: { key: CategoryFilter; label: string; icon: typeof LayoutGrid }[] = [
    { key: "all", label: t("categoryAll"), icon: LayoutGrid },
    { key: "medical", label: t("categoryMedical"), icon: HeartPulse },
    { key: "non-medical", label: t("categoryNonMedical"), icon: Landmark },
  ];

  // Cities depend on the active category so the dropdown never offers a city
  // that would yield zero results.
  const cities = useMemo(() => {
    const scoped =
      category === "all" ? universities : universities.filter((u) => u.category === category);
    return Array.from(new Set(scoped.map((u) => u.city[locale]))).sort();
  }, [universities, locale, category]);

  const filtered = useMemo(() => {
    return universities.filter((u) => {
      const matchesCategory = category === "all" || u.category === category;
      const matchesCity = city === "all" || u.city[locale] === city;
      const matchesQuery =
        query.trim().length === 0 ||
        u.name[locale].toLowerCase().includes(query.toLowerCase()) ||
        u.city[locale].toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesCity && matchesQuery;
    });
  }, [universities, query, city, category, locale]);

  function selectCategory(next: CategoryFilter) {
    setCategory(next);
    setCity("all");
  }

  return (
    <div className="flex flex-col gap-8">
      <div
        role="tablist"
        aria-label={t("category")}
        className="flex flex-wrap gap-2 rounded-[var(--radius-md)] border border-border bg-surface p-1.5"
      >
        {tabs.map(({ key, label, icon: Icon }) => {
          const active = category === key;
          return (
            <button
              key={key}
              role="tab"
              type="button"
              aria-selected={active}
              onClick={() => selectCategory(key)}
              className={cn(
                "inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-sm)] px-4 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-primary text-white shadow-sm"
                  : "text-text/75 hover:bg-black/5 hover:text-accent"
              )}
            >
              <Icon className="size-4 shrink-0" />
              <span>{label}</span>
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[11px] tabular-nums",
                  active ? "bg-white/20 text-white" : "bg-black/5 text-muted"
                )}
              >
                {counts[key]}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchUniversities")}
            aria-label={t("searchUniversities")}
            className="h-11 w-full rounded-[var(--radius-sm)] border border-border bg-surface ps-10 pe-4 text-sm text-text outline-none transition-colors focus:border-accent/50"
          />
        </div>

        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          aria-label={t("allCities")}
          className="h-11 cursor-pointer rounded-[var(--radius-sm)] border border-border bg-surface px-4 text-sm text-text outline-none transition-colors focus:border-accent/50"
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
