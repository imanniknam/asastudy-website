import { useTranslations } from "next-intl";
import { HeartPulse, Landmark } from "lucide-react";
import type { UniversityCategory } from "@/types/university";
import { cn } from "@/lib/utils";

/**
 * ASA-Study's top-level split. Medical reads warm, non-medical reads cool, so
 * the two groups stay distinguishable at a glance across the directory.
 */
export function CategoryBadge({
  category,
  className,
  tone = "solid",
}: {
  category: UniversityCategory;
  className?: string;
  tone?: "solid" | "onDark";
}) {
  const t = useTranslations("common");
  const isMedical = category === "medical";
  const Icon = isMedical ? HeartPulse : Landmark;

  const palette =
    tone === "onDark"
      ? "border-white/20 bg-white/10 text-white"
      : isMedical
        ? "border-teal-200 bg-teal-50 text-teal-800"
        : "border-indigo-200 bg-indigo-50 text-indigo-800";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium",
        palette,
        className
      )}
    >
      <Icon className="size-3.5" />
      {isMedical ? t("categoryMedical") : t("categoryNonMedical")}
    </span>
  );
}
