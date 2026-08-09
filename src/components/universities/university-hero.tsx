import { GraduationCap, MapPin } from "lucide-react";
import type { University, Locale } from "@/types/university";
import { Badge } from "@/components/ui/badge";
import { CategoryBadge } from "@/components/universities/category-badge";

function initials(name: string) {
  return name
    .split(" ")
    .filter((w) => w.length > 2 || /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function UniversityHero({
  university,
  locale,
}: {
  university: University;
  locale: Locale;
}) {
  return (
    <section className="relative overflow-hidden bg-primary py-20 sm:py-24">
      <div className="absolute inset-0 bg-grid-fade opacity-[0.15]" />
      <div
        className="absolute -top-24 start-1/2 h-[360px] w-[640px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,0.5) 0%, rgba(18,53,91,0) 70%)",
        }}
      />
      <div className="container-page relative flex flex-col items-center gap-5 text-center">
        <div className="flex size-20 items-center justify-center rounded-[var(--radius-lg)] border border-white/20 bg-white/10 text-2xl font-extrabold text-white backdrop-blur-sm">
          {initials(university.name.en)}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <CategoryBadge category={university.category} tone="onDark" className="px-3 py-1.5 text-xs" />
          <Badge className="border-white/20 bg-white/10 text-white">
            <MapPin className="size-3.5" />
            {university.city[locale]}
          </Badge>
          <Badge className="border-white/20 bg-white/10 text-white">
            <GraduationCap className="size-3.5" />
            {university.type[locale]}
          </Badge>
        </div>

        <h1 className="max-w-3xl text-balance text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          {university.name[locale]}
        </h1>
        <p className="max-w-2xl text-balance text-base leading-relaxed text-white/75 sm:text-lg">
          {university.summary[locale]}
        </p>
      </div>
    </section>
  );
}
