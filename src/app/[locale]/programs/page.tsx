import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getMedicalPrograms } from "@/lib/content/medical-programs";
import { PageHero } from "@/components/sections/page-hero";
import { ProgramsExplorer } from "@/components/programs/programs-explorer";
import { FinalCta } from "@/components/sections/final-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "programsPage.hero" });
  return { title: t("title"), description: t("body") };
}

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "programsPage.hero" });
  const content = getMedicalPrograms();

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} body={t("body")} />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <ProgramsExplorer content={content} />
        </div>
      </section>

      <FinalCta />
    </>
  );
}
