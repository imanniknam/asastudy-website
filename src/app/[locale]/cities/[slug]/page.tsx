import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MapPin } from "lucide-react";
import type { Locale } from "@/types/city";
import { getAllCitySlugs, getCityBySlug } from "@/lib/content/cities";
import { routing } from "@/i18n/routing";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import { BulletList } from "@/components/universities/university-content-section";
import { CityFactsTable } from "@/components/cities/city-facts-table";
import { CityUniversities } from "@/components/cities/city-universities";
import { VideoEmbed } from "@/components/media/video-embed";
import {
  CitySection,
  CityExpenses,
  CitySeasons,
  CityFaq,
  CityProse,
  CityChips,
} from "@/components/cities/city-sections";
import { FinalCta } from "@/components/sections/final-cta";

export function generateStaticParams() {
  const slugs = getAllCitySlugs();
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};
  const loc = locale as Locale;
  return { title: city.name[loc], description: city.summary[loc] };
}

export default async function CityDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;

  const city = getCityBySlug(slug);
  if (!city) notFound();

  const t = await getTranslations({ locale, namespace: "citiesPage" });

  return (
    <>
      <section className="relative overflow-hidden bg-primary py-20 sm:py-24">
        <div className="absolute inset-0 bg-grid-fade opacity-[0.15]" />
        <div
          className="absolute -top-24 start-1/2 h-[360px] w-[640px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(37,99,235,0.5) 0%, rgba(18,53,91,0) 70%)",
          }}
        />
        <div className="container-page relative flex flex-col items-center gap-4 text-center">
          <Badge className="border-white/20 bg-white/10 text-white">
            <MapPin className="size-3.5" />
            {city.province[loc]}
          </Badge>
          <h1 className="max-w-3xl text-balance text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            {city.name[loc]}
          </h1>
          <p className="max-w-2xl text-balance text-base leading-relaxed text-white/75 sm:text-lg">
            {city.tagline[loc]}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page flex max-w-4xl flex-col gap-14">
          <FadeIn>
            <CitySection title={t("whyStudyHere")}>
              <CityProse text={city.whyStudyHere[loc]} />
            </CitySection>
          </FadeIn>

          <FadeIn>
            <CityFactsTable facts={city.facts} />
          </FadeIn>

          <FadeIn>
            <CitySection title={t("advantages")}>
              <BulletList items={city.advantages[loc]} />
            </CitySection>
          </FadeIn>

          <FadeIn>
            <CitySection title={t("about")}>
              <CityProse text={city.about[loc]} />
            </CitySection>
          </FadeIn>

          <FadeIn>
            <CityUniversities universities={city.universities} />
          </FadeIn>

          {city.videos && city.videos.length > 0 && (
            <FadeIn>
              <CitySection title={t("videos")}>
                <div className="grid gap-5 sm:grid-cols-2">
                  {city.videos.map((video) => (
                    <VideoEmbed key={video.youtubeId} video={video} />
                  ))}
                </div>
              </CitySection>
            </FadeIn>
          )}

          {city.research && (
            <FadeIn>
              <CitySection title={t("research")}>
                <CityProse text={city.research[loc]} />
              </CitySection>
            </FadeIn>
          )}

          <FadeIn>
            <CitySection title={t("studentLife")}>
              <CityProse text={city.studentLife[loc]} />
              {city.studentLifeFacilities && (
                <div className="pt-2">
                  <CityChips items={city.studentLifeFacilities[loc]} />
                </div>
              )}
            </CitySection>
          </FadeIn>

          <FadeIn>
            <CitySection title={t("costOfLiving")}>
              <CityProse text={city.costOfLiving[loc]} />
              <CityExpenses expenses={city.expenses} />
            </CitySection>
          </FadeIn>

          <FadeIn>
            <CitySection title={t("accommodation")}>
              <CityProse text={city.accommodation[loc]} />
              {city.accommodationOptions && (
                <div className="pt-2">
                  <CityChips items={city.accommodationOptions[loc]} />
                </div>
              )}
              {city.accommodationConsiderations && (
                <div className="pt-2">
                  <BulletList items={city.accommodationConsiderations[loc]} />
                </div>
              )}
            </CitySection>
          </FadeIn>

          <FadeIn>
            <CitySection title={t("transport")}>
              <CityProse text={city.transport[loc]} />
              {city.transportOptions && (
                <div className="pt-2">
                  <CityChips items={city.transportOptions[loc]} />
                </div>
              )}
            </CitySection>
          </FadeIn>

          <FadeIn>
            <CitySection title={t("climate")}>
              <CityProse text={city.climate[loc]} />
              {city.seasons && <CitySeasons seasons={city.seasons} />}
            </CitySection>
          </FadeIn>

          {city.healthcare && (
            <FadeIn>
              <CitySection title={t("healthcare")}>
                <CityProse text={city.healthcare[loc]} />
              </CitySection>
            </FadeIn>
          )}

          {city.culture && (
            <FadeIn>
              <CitySection title={t("culture")}>
                <CityProse text={city.culture[loc]} />
              </CitySection>
            </FadeIn>
          )}

          {city.historicalAttractions && (
            <FadeIn>
              <CitySection title={t("historicalAttractions")}>
                <BulletList items={city.historicalAttractions[loc]} />
              </CitySection>
            </FadeIn>
          )}

          {city.naturalAttractions && (
            <FadeIn>
              <CitySection title={t("naturalAttractions")}>
                <BulletList items={city.naturalAttractions[loc]} />
              </CitySection>
            </FadeIn>
          )}

          {city.faq && city.faq.length > 0 && (
            <FadeIn>
              <CitySection title={t("faq")}>
                <CityFaq faq={city.faq} />
              </CitySection>
            </FadeIn>
          )}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
