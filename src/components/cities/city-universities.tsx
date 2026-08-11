import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { City, Locale } from "@/types/city";

export function CityUniversities({ universities }: { universities: City["universities"] }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("citiesPage");

  if (universities.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold tracking-tight text-text sm:text-2xl">
        {t("universities")}
      </h2>
      <div className="flex flex-col gap-4">
        {universities.map((uni, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 rounded-[var(--radius-md)] border border-border bg-surface p-6"
          >
            <div className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-primary/5 text-primary">
                <GraduationCap className="size-5" />
              </span>
              <h3 className="pt-1.5 text-base font-semibold text-text">{uni.name[locale]}</h3>
            </div>

            <p className="text-sm leading-relaxed text-muted">{uni.description[locale]}</p>

            {uni.fields && uni.fields[locale].length > 0 && (
              <div className="flex flex-wrap gap-2">
                {uni.fields[locale].map((field, j) => (
                  <span
                    key={j}
                    className="rounded-full bg-background px-3 py-1 text-xs font-medium text-text"
                  >
                    {field}
                  </span>
                ))}
              </div>
            )}

            {uni.slug && (
              <Link
                href={`/universities/${uni.slug}`}
                className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline"
              >
                {t("viewUniversity")}
                <ArrowUpRight className="size-4" />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
