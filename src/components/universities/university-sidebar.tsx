import { useLocale, useTranslations } from "next-intl";
import { Award, ArrowUpRight, Building2, Calendar, MapPin, Wallet } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { University, Locale } from "@/types/university";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function UniversitySidebar({ university }: { university: University }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("common");

  const facts = [
    { icon: MapPin, label: t("city"), value: university.city[locale] },
    { icon: Building2, label: t("type"), value: university.type[locale] },
    university.established
      ? { icon: Calendar, label: t("established"), value: university.established }
      : null,
    university.ranking
      ? { icon: Award, label: t("ranking"), value: university.ranking[locale] }
      : null,
    { icon: Wallet, label: t("tuition"), value: university.tuition[locale] },
  ].filter(Boolean) as { icon: typeof MapPin; label: string; value: string }[];

  return (
    <Card className="sticky top-24">
      <CardContent className="flex flex-col gap-5">
        {facts.map((fact) => (
          <div key={fact.label} className="flex items-start gap-3">
            <fact.icon className="mt-0.5 size-4 shrink-0 text-accent" />
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-medium text-muted">{fact.label}</span>
              <span className="text-sm font-medium leading-snug text-text">{fact.value}</span>
            </div>
          </div>
        ))}

        <Button asChild variant="accent" className="mt-2 w-full">
          <Link href="/contact">
            {t("primaryCta")}
            <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
