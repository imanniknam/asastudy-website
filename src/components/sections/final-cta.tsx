"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  const t = useTranslations("home.finalCta");

  return (
    <section className="relative overflow-hidden bg-primary py-20 sm:py-28">
      <div className="absolute inset-0 bg-grid-fade opacity-[0.12]" />
      <div
        className="absolute -bottom-32 start-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,0.55) 0%, rgba(18,53,91,0) 70%)",
        }}
      />
      <FadeIn className="container-page relative flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-2xl text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {t("title")}
        </h2>
        <p className="max-w-xl text-balance text-base leading-relaxed text-white/75">
          {t("body")}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="accent" size="lg">
            <Link href="/contact">
              {t("primaryCta")}
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">{t("secondaryCta")}</Link>
          </Button>
        </div>
      </FadeIn>
    </section>
  );
}
