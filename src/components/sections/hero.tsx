"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function Hero() {
  const t = useTranslations("home.hero");
  const locale = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-primary">
      <div className="absolute inset-0 bg-grid-fade opacity-[0.15]" />
      <div
        className="absolute -top-40 start-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.55) 0%, rgba(18,53,91,0) 70%)",
        }}
      />
      <motion.div
        style={{ y, opacity }}
        className="pointer-events-none absolute end-[-10%] top-1/4 hidden size-64 rounded-full bg-accent/20 blur-3xl md:block"
      />

      <div className="container-page relative grid items-center gap-12 py-24 sm:py-28 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:py-32">
        <div className="flex min-w-0 flex-col items-center gap-7 text-center lg:items-start lg:text-start">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white/90 backdrop-blur-sm"
          >
            <GraduationCap className="size-3.5" />
            ASA-STUDY
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-3xl text-balance text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {t("h1")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg"
          >
            {t("body")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          >
            <Button asChild variant="accent" size="lg" className="w-full sm:w-auto">
              <Link href="/contact">
                {t("primaryCta")}
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/contact">{t("secondaryCta")}</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-[28px] border border-white/15 bg-white/5 shadow-2xl shadow-black/25 lg:aspect-[5/6]"
        >
          <Image
            src="/images/azadi-tower.jpg"
            alt={locale === "fa" ? "برج آزادی در تهران، ایران" : "Azadi Tower in Tehran, Iran"}
            fill
            priority
            sizes="(max-width: 1023px) calc(100vw - 40px), 42vw"
            className="object-cover object-center transition-transform duration-700 hover:scale-[1.025]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/55 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-start sm:p-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/65">
                {locale === "fa" ? "تهران، ایران" : "Tehran, Iran"}
              </p>
              <p className="mt-1 text-sm font-semibold text-white sm:text-base">
                {locale === "fa" ? "برج آزادی" : "Azadi Tower"}
              </p>
            </div>
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white/85 backdrop-blur-md">
              {locale === "fa" ? "تحصیل در ایران" : "Study in Iran"}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
