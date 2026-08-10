import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { AboutSection } from "@/components/sections/about-section";
import { ServicesSection } from "@/components/sections/services-section";
import { JourneyTimeline } from "@/components/sections/journey-timeline";
import { UniversitiesTeaser } from "@/components/sections/universities-teaser";
import { ProgramsTeaser } from "@/components/sections/programs-teaser";
import { WhyIran } from "@/components/sections/why-iran";
import { IntroVideosSection } from "@/components/sections/intro-videos-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCta } from "@/components/sections/final-cta";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <TrustBar />
      <AboutSection />
      <ServicesSection />
      <JourneyTimeline />
      <UniversitiesTeaser />
      <ProgramsTeaser />
      <WhyIran />
      <IntroVideosSection />
      <FaqSection />
      <FinalCta />
    </>
  );
}
