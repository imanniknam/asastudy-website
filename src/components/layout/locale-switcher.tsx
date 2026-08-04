"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const otherLocale = locale === "en" ? "fa" : "en";

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: otherLocale })}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-full border border-border bg-white/70 px-4 text-sm font-medium text-text backdrop-blur-sm transition-colors hover:border-accent/40 hover:text-accent",
        className
      )}
      aria-label="Switch language"
    >
      {otherLocale === "fa" ? "فارسی" : "English"}
    </button>
  );
}
