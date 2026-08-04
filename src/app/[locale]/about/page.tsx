import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { FadeIn } from "@/components/motion/fade-in";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Compass, Users, MapPinned, HeartHandshake } from "lucide-react";

const icons = [Compass, Users, MapPinned, HeartHandshake];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.hero" });
  return { title: t("title"), description: t("body") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const values = t.raw("values.items") as { title: string; description: string }[];

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} body={t("hero.body")} />

      <section className="py-20 sm:py-28">
        <div className="container-page grid gap-14">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
              {t("mission.title")}
            </h2>
            <p className="mt-4 text-balance text-base leading-relaxed text-muted sm:text-lg">
              {t("mission.body")}
            </p>
          </FadeIn>

          <div className="flex flex-col gap-8">
            <FadeIn className="text-center">
              <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
                {t("values.title")}
              </h2>
            </FadeIn>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((item, i) => {
                const Icon = icons[i % icons.length];
                return (
                  <FadeIn key={item.title} delay={i * 0.08}>
                    <Card className="h-full hover:-translate-y-1.5 hover:shadow-lg">
                      <CardContent className="flex h-full flex-col gap-4">
                        <div className="flex size-12 items-center justify-center rounded-[var(--radius-sm)] bg-primary/5 text-primary">
                          <Icon className="size-6" />
                        </div>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
