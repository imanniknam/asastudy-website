import { useTranslations } from "next-intl";
import type { VideoItem } from "@/types/university";
import { VideoEmbed } from "@/components/media/video-embed";

export function UniversityVideos({ videos }: { videos?: VideoItem[] }) {
  const t = useTranslations("common");

  if (!videos || videos.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold tracking-tight text-text sm:text-2xl">{t("videos")}</h2>
      <div className="grid gap-5 sm:grid-cols-2">
        {videos.map((video) => (
          <VideoEmbed key={video.youtubeId} video={video} />
        ))}
      </div>
    </div>
  );
}
