"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Play } from "lucide-react";
import type { Locale, VideoItem } from "@/types/university";
import { cn } from "@/lib/utils";

/**
 * Click-to-load YouTube embed. The heavy player iframe is only mounted once the
 * user actually asks for it, so pages carrying several videos stay fast; until
 * then this is just a thumbnail and a button.
 */
export function VideoEmbed({ video, className }: { video: VideoItem; className?: string }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("common");
  const [playing, setPlaying] = useState(false);

  const title = video.title[locale];
  const languageLabel = t(
    video.language === "ar" ? "langArabic" : video.language === "fa" ? "langPersian" : "langEnglish"
  );

  return (
    <figure className={cn("flex flex-col gap-2.5", className)}>
      <div className="relative aspect-video overflow-hidden rounded-[var(--radius-md)] border border-border bg-primary">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`${t("playVideo")}: ${title}`}
            className="group absolute inset-0 size-full cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- YouTube already
                serves these thumbnails optimised from its CDN; proxying them through
                the Next image optimiser only adds server cost and a failure point. */}
            <img
              src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 bg-primary/25 transition-colors group-hover:bg-primary/10" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                <Play className="size-6 translate-x-0.5 fill-primary text-primary rtl:-translate-x-0.5 rtl:scale-x-[-1]" />
              </span>
            </span>
          </button>
        )}
      </div>

      <figcaption className="flex items-start justify-between gap-3">
        <span className="text-sm font-medium leading-snug text-text">{title}</span>
        <span className="shrink-0 rounded-full bg-black/5 px-2 py-0.5 text-[11px] font-medium text-muted">
          {languageLabel}
        </span>
      </figcaption>
    </figure>
  );
}
