import { useTranslations } from "next-intl";
import { getIntroVideos } from "@/lib/content/intro-videos";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { VideoEmbed } from "@/components/media/video-embed";

/**
 * "Study in Iran" showcase videos. Lives on the Cities (discovery) page, which
 * is the page about Iran and its cities.
 */
export function IntroVideosSection() {
  const t = useTranslations("citiesPage");
  const videos = getIntroVideos();

  if (videos.length === 0) return null;

  return (
    <section className="border-t border-border bg-surface py-20 sm:py-28">
      <div className="container-page flex flex-col gap-12">
        <SectionHeading
          eyebrow={t("discoverEyebrow")}
          title={t("discoverTitle")}
          body={t("discoverBody")}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, i) => (
            <FadeIn key={video.youtubeId} delay={i * 0.08}>
              <VideoEmbed video={video} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
