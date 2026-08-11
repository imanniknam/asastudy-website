import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/university";
import { getStudentGuide } from "@/lib/content/student-guide";
import { PageHero } from "@/components/sections/page-hero";
import { GuideBlock } from "@/components/guide/guide-block";
import { GuideNav } from "@/components/guide/guide-nav";
import { FadeIn } from "@/components/motion/fade-in";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FinalCta } from "@/components/sections/final-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const guide = getStudentGuide();
  return {
    title: guide.hero.title[loc],
    description: guide.hero.body[loc].split("\n\n")[0],
  };
}

export default async function ForStudentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations({ locale, namespace: "forStudents" });
  const guide = getStudentGuide();

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={guide.hero.title[loc]}
        body={guide.hero.body[loc].split("\n\n")[0]}
      />

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
          <GuideNav
            items={guide.blocks.map((b) => ({ id: b.id, label: b.title[loc] }))}
            label={t("onThisPage")}
          />

          <div className="flex min-w-0 flex-col gap-16">
            {guide.blocks.map((block) => (
              <GuideBlock key={block.id} block={block} locale={loc} />
            ))}

            <FadeIn id="faq" className="flex scroll-mt-24 flex-col gap-5">
              <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
                {t("faqTitle")}
              </h2>
              <Accordion type="single" collapsible className="flex flex-col gap-3">
                {guide.faq.map((item, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger>{item.question[loc]}</AccordionTrigger>
                    <AccordionContent>{item.answer[loc]}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </FadeIn>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
