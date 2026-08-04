import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/page-hero";
import { JourneyTimeline } from "@/components/sections/journey-timeline";
import { FinalCta } from "@/components/sections/final-cta";
import { FadeIn } from "@/components/motion/fade-in";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Compass,
  ClipboardCheck,
  ShieldCheck,
  PlaneLanding,
  Home,
  LifeBuoy,
} from "lucide-react";

const icons = [Compass, ClipboardCheck, ShieldCheck, PlaneLanding, Home, LifeBuoy];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.hero" });
  return { title: t("title"), description: t("body") };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });
  const list = t.raw("list") as { title: string; description: string }[];

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} body={t("hero.body")} />

      <section className="py-20 sm:py-28">
        <div className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <FadeIn key={item.title} delay={i * 0.06}>
                <Card className="group h-full hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-xl hover:shadow-primary/5">
                  <CardContent className="flex h-full flex-col gap-4">
                    <div className="flex size-12 items-center justify-center rounded-[var(--radius-sm)] bg-primary/5 text-primary transition-colors group-hover:bg-accent group-hover:text-white">
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
      </section>

      <JourneyTimeline />
      <FinalCta />
    </>
  );
}
