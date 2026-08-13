import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/sections/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/motion/fade-in";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.hero" });
  return { title: t("title"), description: t("body") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} body={t("hero.body")} />

      <section className="py-20 sm:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <FadeIn>
            <Card>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Card className="h-full bg-primary text-white">
              <CardContent className="flex h-full flex-col gap-6">
                <h3 className="text-lg font-semibold text-white">{t("info.title")}</h3>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-accent" />
                  <span className="text-sm leading-relaxed text-white/85">
                    {t("info.address")}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-5 shrink-0 text-accent" />
                  <span className="text-sm leading-relaxed text-white/85">
                    info@asa-study.com
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="mt-0.5 size-5 shrink-0 text-accent" />
                  <span className="text-sm leading-relaxed text-white/85">
                    {t("info.whatsapp")}
                  </span>
                </div>
                <a
                  href="https://www.instagram.com/asa.study/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram: asa.study"
                  className="flex min-h-11 items-start gap-3 rounded-sm text-white/85 transition-colors hover:text-white"
                >
                  <Instagram className="mt-0.5 size-5 shrink-0 text-accent" />
                  <span dir="ltr" className="text-sm leading-relaxed">
                    @asa.study
                  </span>
                </a>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
