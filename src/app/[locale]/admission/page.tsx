import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Info } from "lucide-react";
import type { Locale } from "@/types/university";
import { getAdmissionContent } from "@/lib/content/admission";
import { PageHero } from "@/components/sections/page-hero";
import { FadeIn } from "@/components/motion/fade-in";
import { FinalCta } from "@/components/sections/final-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admissionPage.hero" });
  return { title: t("title"), description: t("body") };
}

export default async function AdmissionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations({ locale, namespace: "admissionPage" });
  const content = getAdmissionContent();

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} body={t("hero.body")} />

      <section className="py-16 sm:py-20">
        <div className="container-page flex max-w-4xl flex-col gap-12">
          <FadeIn className="flex items-start gap-3 rounded-[var(--radius-md)] border border-border bg-surface p-5">
            <Info className="mt-0.5 size-5 shrink-0 text-accent" />
            <p className="text-sm leading-relaxed text-muted">{content.disclaimer[loc]}</p>
          </FadeIn>

          <ol className="flex flex-col gap-5">
            {content.steps.map((step, i) => (
              <li key={step.id}>
                <FadeIn
                  delay={(i % 4) * 0.06}
                  className="flex gap-5 rounded-[var(--radius-lg)] border border-border bg-surface p-6 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div className="flex flex-col gap-2.5">
                    <h2 className="text-base font-semibold text-text sm:text-lg">
                      {step.title[loc]}
                    </h2>
                    <p className="text-[15px] leading-relaxed text-muted">
                      {step.description[loc]}
                    </p>

                    {step.details && (
                      <ul className="mt-1 flex flex-col gap-2">
                        {step.details[loc].map((detail, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2.5 text-sm leading-relaxed text-text"
                          >
                            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </FadeIn>
              </li>
            ))}
          </ol>

          {content.sections.map((section) => (
            <FadeIn key={section.id} className="flex flex-col gap-4">
              <h2 className="text-xl font-bold tracking-tight text-text sm:text-2xl">
                {section.title[loc]}
              </h2>
              {section.intro && (
                <p className="text-[15px] leading-relaxed text-muted">{section.intro[loc]}</p>
              )}
              <ul className="flex flex-wrap gap-2.5">
                {section.items[loc].map((item, i) => (
                  <li
                    key={i}
                    className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          ))}

          <p className="rounded-[var(--radius-md)] border border-border bg-surface p-5 text-xs leading-relaxed text-muted">
            {t("sourceNote")}{" "}
            <a
              href={content.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              {content.source.label[loc]}
            </a>
          </p>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
