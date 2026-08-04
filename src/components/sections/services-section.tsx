"use client";

import { useTranslations } from "next-intl";
import { ClipboardCheck, Compass, PlaneLanding, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

const icons = [Compass, ClipboardCheck, ShieldCheck, PlaneLanding];

export function ServicesSection() {
  const t = useTranslations("home.services");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section className="bg-surface py-20 sm:py-28">
      <div className="container-page flex flex-col gap-14">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <FadeIn key={item.title} delay={i * 0.08}>
                <Card className="group h-full hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-xl hover:shadow-primary/5">
                  <CardContent className="flex h-full flex-col gap-4">
                    <div className="flex size-12 items-center justify-center rounded-[var(--radius-sm)] bg-primary/5 text-primary transition-colors group-hover:bg-accent group-hover:text-white">
                      <Icon className="size-6" />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
