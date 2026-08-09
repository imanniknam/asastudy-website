import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/university";
import { getAllUniversitySlugs, getUniversityBySlug } from "@/lib/content/universities";
import { routing } from "@/i18n/routing";
import { UniversityHero } from "@/components/universities/university-hero";
import { UniversitySidebar } from "@/components/universities/university-sidebar";
import { UniversityGallery } from "@/components/universities/university-gallery";
import { UniversityPrograms } from "@/components/universities/university-programs";
import { UniversityFaq } from "@/components/universities/university-faq";
import {
  UniversityContentSection,
  ProseText,
  BulletList,
} from "@/components/universities/university-content-section";
import { FinalCta } from "@/components/sections/final-cta";

export function generateStaticParams() {
  const slugs = getAllUniversitySlugs();
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const university = getUniversityBySlug(slug);
  if (!university) return {};
  const loc = locale as Locale;

  return {
    title: university.name[loc],
    description: university.summary[loc],
  };
}

export default async function UniversityDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;

  const university = getUniversityBySlug(slug);
  if (!university) notFound();

  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <>
      <UniversityHero university={university} locale={loc} />

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div className="flex flex-col gap-14">
            <div className="lg:hidden">
              <UniversitySidebar university={university} />
            </div>

            <UniversityContentSection id="overview" title={t("overview")}>
              <ProseText text={university.overview[loc]} />
            </UniversityContentSection>

            <UniversityGallery images={university.images} name={university.name[loc]} />

            <UniversityContentSection id="admission" title={t("admissionRequirements")}>
              <BulletList items={university.admissionRequirements[loc]} />
            </UniversityContentSection>

            <UniversityContentSection id="documents" title={t("requiredDocuments")}>
              <BulletList items={university.requiredDocuments[loc]} />
            </UniversityContentSection>

            <UniversityContentSection id="tuition" title={t("tuition")}>
              <ProseText
                text={
                  university.tuitionNote
                    ? `${university.tuition[loc]}\n\n${university.tuitionNote[loc]}`
                    : university.tuition[loc]
                }
              />
            </UniversityContentSection>

            <UniversityContentSection id="programs" title={t("programsOffered")}>
              <UniversityPrograms programs={university.programs} />
            </UniversityContentSection>

            <UniversityContentSection id="student-life" title={t("studentLife")}>
              <ProseText text={university.studentLife[loc]} />
            </UniversityContentSection>

            <UniversityContentSection id="dormitory" title={t("dormitory")}>
              <ProseText text={university.dormitory[loc]} />
            </UniversityContentSection>

            <UniversityFaq items={university.faq} />
          </div>

          <div className="hidden lg:block">
            <UniversitySidebar university={university} />
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
