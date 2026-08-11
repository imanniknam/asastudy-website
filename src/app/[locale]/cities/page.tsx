import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllCities } from "@/lib/content/cities";
import { PageHero } from "@/components/sections/page-hero";
import { CityCard } from "@/components/cities/city-card";
import { FadeIn } from "@/components/motion/fade-in";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "citiesPage.hero" });
  return { title: t("title"), description: t("body") };
}

export default async function CitiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "citiesPage.hero" });
  const cities = getAllCities();

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} body={t("body")} />
      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city, i) => (
            <FadeIn key={city.slug} delay={(i % 3) * 0.06}>
              <CityCard city={city} />
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
