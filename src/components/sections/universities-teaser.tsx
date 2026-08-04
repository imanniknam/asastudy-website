import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getAllUniversities } from "@/lib/content/universities";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { UniversityCard } from "@/components/universities/university-card";

export function UniversitiesTeaser() {
  const t = useTranslations("home.universities");
  const universities = getAllUniversities().slice(0, 6);

  return (
    <section className="bg-surface py-20 sm:py-28">
      <div className="container-page flex flex-col gap-14">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} body={t("body")} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {universities.map((university, i) => (
            <FadeIn key={university.slug} delay={i * 0.06}>
              <UniversityCard university={university} />
            </FadeIn>
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
