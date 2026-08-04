"use client";

import { useTranslations } from "next-intl";
import { Coins, Landmark, Home, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

const icons = [Coins, Landmark, Home, Sparkles];

export function WhyIran() {
  const t = useTranslations("home.whyIran");
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
                <Card className="h-full bg-background hover:-translate-y-1.5 hover:shadow-lg">
                  <CardContent className="flex h-full flex-col gap-4">
                    <Icon className="size-8 text-accent" />
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
