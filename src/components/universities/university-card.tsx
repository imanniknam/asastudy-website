import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { University } from "@/types/university";
import type { Locale } from "@/types/university";
import { Badge } from "@/components/ui/badge";

function initials(name: string) {
  return name
    .split(" ")
    .filter((w) => w.length > 2 || /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function UniversityCard({ university }: { university: University }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("common");

  return (
    <Link
      href={`/universities/${university.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-primary to-[#0a1f38]">
        <div className="absolute inset-0 bg-grid-fade opacity-20" />
        <span className="relative text-4xl font-extrabold tracking-tight text-white/90">
          {initials(university.name.en)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted">
          <MapPin className="size-3.5 text-accent" />
          {university.city[locale]}
        </div>
        <h3 className="text-lg font-semibold leading-snug text-text transition-colors group-hover:text-accent">
          {university.name[locale]}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted">
          {university.summary[locale]}
        </p>

        <div className="mt-1 flex flex-wrap gap-1.5">
          {university.featuredPrograms[locale].slice(0, 3).map((program) => (
            <Badge key={program} className="bg-background px-2.5 py-1 text-[11px]">
              {program}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-1.5 pt-3 text-sm font-medium text-accent">
          {t("viewDetails")}
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5 rtl:group-hover:translate-y-0" />
        </div>
      </div>
    </Link>
  );
}
