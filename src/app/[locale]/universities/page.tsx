import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllUniversities } from "@/lib/content/universities";
import { PageHero } from "@/components/sections/page-hero";
import { UniversitiesGrid } from "@/components/universities/universities-grid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "universitiesPage.hero" });
  return { title: t("title"), description: t("body") };
}

export default async function UniversitiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "universitiesPage.hero" });
  const universities = getAllUniversities();

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} body={t("body")} />
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <UniversitiesGrid universities={universities} />
        </div>
      </section>
    </>
  );
}
