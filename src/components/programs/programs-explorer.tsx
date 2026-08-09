"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Clock, GraduationCap, Layers, Search, Stethoscope } from "lucide-react";
import type { Locale } from "@/types/university";
import type { MedicalProgramsContent, ProgramTier } from "@/types/medical-program";
import { FadeIn } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";

const tierIcons: Record<ProgramTier, typeof Stethoscope> = {
  specialty: Stethoscope,
  subspecialty: Layers,
  fellowship: GraduationCap,
};

export function ProgramsExplorer({ content }: { content: MedicalProgramsContent }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("programsPage");
  const [activeTier, setActiveTier] = useState<ProgramTier>("specialty");
  const [query, setQuery] = useState("");

  const tier = content.tiers.find((x) => x.tier === activeTier)!;

  // Filtering keeps group structure but drops groups left with no matches.
  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tier.groups;
    return tier.groups
      .map((group) => ({
        ...group,
        programs: group.programs.filter(
          (p) =>
            p.name[locale].toLowerCase().includes(q) ||
            p.prerequisite?.[locale].toLowerCase().includes(q)
        ),
      }))
      .filter((group) => group.programs.length > 0);
  }, [tier, query, locale]);

  const matchCount = groups.reduce((sum, g) => sum + g.programs.length, 0);

  return (
    <div className="flex flex-col gap-10">
      <div
        role="tablist"
        aria-label={t("tierLabel")}
        className="flex flex-col gap-2 rounded-[var(--radius-md)] border border-border bg-surface p-1.5 sm:flex-row"
      >
        {content.tiers.map((item) => {
          const Icon = tierIcons[item.tier];
          const active = item.tier === activeTier;
          const count = item.groups.reduce((s, g) => s + g.programs.length, 0);
          return (
            <button
              key={item.tier}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => {
                setActiveTier(item.tier);
                setQuery("");
              }}
              className={cn(
                "inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-sm)] px-4 py-3 text-sm font-medium transition-all",
                active
                  ? "bg-primary text-white shadow-sm"
                  : "text-text/75 hover:bg-black/5 hover:text-accent"
              )}
            >
              <Icon className="size-4 shrink-0" />
              <span>{item.shortTitle[locale]}</span>
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[11px] tabular-nums",
                  active ? "bg-white/20 text-white" : "bg-black/5 text-muted"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <FadeIn key={tier.tier} className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
            {tier.title[locale]}
          </h2>
          <p className="max-w-3xl text-[15px] leading-relaxed text-muted">
            {tier.description[locale]}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-[var(--radius-md)] border border-border bg-surface p-5">
            <GraduationCap className="mt-0.5 size-5 shrink-0 text-accent" />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted">{t("entryRequirement")}</span>
              <span className="text-sm leading-relaxed text-text">
                {tier.entryRequirement[locale]}
              </span>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-[var(--radius-md)] border border-border bg-surface p-5">
            <Clock className="mt-0.5 size-5 shrink-0 text-accent" />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted">{t("duration")}</span>
              <span className="text-sm leading-relaxed text-text">
                {tier.typicalDuration[locale]}
              </span>
            </div>
          </div>
        </div>
      </FadeIn>

      <div className="relative sm:max-w-sm">
        <Search className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchPlaceholder")}
          aria-label={t("searchPlaceholder")}
          className="h-11 w-full rounded-[var(--radius-sm)] border border-border bg-surface ps-10 pe-4 text-sm text-text outline-none transition-colors focus:border-accent/50"
        />
      </div>

      {matchCount === 0 ? (
        <p className="py-16 text-center text-sm text-muted">{t("noResults")}</p>
      ) : (
        <div className="flex flex-col gap-10">
          {groups.map((group) => (
            <div key={group.id} className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold tracking-tight text-text">
                  {group.title[locale]}
                </h3>
                <span className="h-px flex-1 bg-border" />
                <span className="rounded-full bg-black/5 px-2.5 py-1 text-xs font-medium tabular-nums text-muted">
                  {group.programs.length}
                </span>
              </div>

              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.programs.map((program) => (
                  <li
                    key={program.id}
                    className="flex flex-col gap-2 rounded-[var(--radius-md)] border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <span className="text-sm font-semibold leading-snug text-text">
                      {program.name[locale]}
                    </span>

                    <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-1 text-xs text-muted">
                      {program.durationYears && (
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="size-3.5 text-accent" />
                          {t("years", { count: program.durationYears })}
                        </span>
                      )}
                      {program.prerequisite && (
                        <span className="inline-flex items-center gap-1.5">
                          <Stethoscope className="size-3.5 text-accent" />
                          {program.prerequisite[locale]}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <p className="rounded-[var(--radius-md)] border border-border bg-surface p-5 text-xs leading-relaxed text-muted">
        {t("sourceNote")}{" "}
        <a
          href={content.source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent underline-offset-4 hover:underline"
        >
          {content.source.label[locale]}
        </a>
      </p>
    </div>
  );
}
