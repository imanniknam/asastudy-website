import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, Building2, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { City, Locale } from "@/types/city";

export function CityCard({ city }: { city: City }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("citiesPage");

  return (
    <Link
      href={`/cities/${city.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-primary to-[#0a1f38]">
        <div className="absolute inset-0 bg-grid-fade opacity-20" />
        {city.image ? (
          <Image
            src={city.image}
            alt={city.name[locale]}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <MapPin className="relative size-10 text-white/70" />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted">
          <Building2 className="size-3.5 text-accent" />
          {city.province[locale]}
        </div>
        <h3 className="text-lg font-semibold leading-snug text-text transition-colors group-hover:text-accent">
          {city.name[locale]}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted">{city.summary[locale]}</p>
        <div className="mt-auto flex items-center gap-1.5 pt-2 text-sm font-medium text-accent">
          {t("exploreCity")}
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
