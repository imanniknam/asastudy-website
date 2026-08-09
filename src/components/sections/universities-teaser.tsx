import { useTranslations } from "next-intl";
import { ArrowUpRight, HeartPulse, Landmark } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getUniversitiesByCategory } from "@/lib/content/universities";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { UniversityCard } from "@/components/universities/university-card";

/**
 * ASA-Study frames its portfolio as medical vs. non-medical, so the home page
 * shows the two groups as separate rows rather than one undifferentiated grid.
 */
export function UniversitiesTeaser() {
  const t = useTranslations("home.universities");
  const tc = useTranslations("common");

  const groups = [
    {
      key: "medical" as const,
      icon: HeartPulse,
      label: tc("categoryMedical"),
      universities: getUniversitiesByCategory("medical"),
    },
    {
      key: "non-medical" as const,
      icon: Landmark,
      label: tc("categoryNonMedical"),
      universities: getUniversitiesByCategory("non-medical"),
    },
  ];

  return (
    <section className="bg-surface py-20 sm:py-28">
      <div className="container-page flex flex-col gap-14">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} body={t("body")} />

        <div className="flex flex-col gap-12">
          {groups.map(({ key, icon: Icon, label, universities }) => (
            <div key={key} className="flex flex-col gap-6">
              <FadeIn className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-primary/5 text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="text-xl font-bold tracking-tight text-text sm:text-2xl">{label}</h3>
                <span className="rounded-full bg-black/5 px-2.5 py-1 text-xs font-medium tabular-nums text-muted">
                  {universities.length}
                </span>
              </FadeIn>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {universities.slice(0, 3).map((university, i) => (
                  <FadeIn key={university.slug} delay={i * 0.06}>
                    <UniversityCard university={university} />
                  </FadeIn>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button asChild variant="primary">
            <Link href="/universities">
              {t("cta")}
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
