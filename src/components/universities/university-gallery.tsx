import Image from "next/image";
import { useTranslations } from "next-intl";

/**
 * Renders only real campus photography, and only when there is more than one
 * photo — the first image already appears as the page hero, so a single-item
 * gallery would just repeat it.
 */
export function UniversityGallery({
  images,
  name,
}: {
  images?: string[];
  name: string;
}) {
  const t = useTranslations("common");

  if (!images || images.length < 2) return null;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold tracking-tight text-text sm:text-2xl">{t("gallery")}</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {images.map((src) => (
          <div
            key={src}
            className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-md)] border border-border"
          >
            <Image
              src={src}
              alt={name}
              fill
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
