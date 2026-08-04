import { useTranslations } from "next-intl";
import { BookOpen, Building2, Landmark, Users } from "lucide-react";

const tiles = [Building2, BookOpen, Users, Landmark];

export function UniversityGallery() {
  const t = useTranslations("common");

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold tracking-tight text-text sm:text-2xl">{t("gallery")}</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {tiles.map((Icon, i) => (
          <div
            key={i}
            className="flex aspect-square items-center justify-center rounded-[var(--radius-md)] bg-gradient-to-br from-primary/90 to-[#0a1f38] transition-transform hover:scale-[1.03]"
          >
            <Icon className="size-8 text-white/70" />
          </div>
        ))}
      </div>
    </div>
  );
}
