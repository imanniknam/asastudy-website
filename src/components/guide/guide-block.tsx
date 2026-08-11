import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/types/university";
import type { GuideBlock as GuideBlockType } from "@/types/student-guide";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";

function Paragraphs({ text }: { text: string }) {
  return (
    <div className="flex flex-col gap-3">
      {text
        .split(/\n\n+/)
        .filter(Boolean)
        .map((p, i) => (
          <p key={i} className="text-[15px] leading-relaxed text-muted">
            {p}
          </p>
        ))}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-text">
          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function GuideBlock({ block, locale }: { block: GuideBlockType; locale: Locale }) {
  return (
    <FadeIn id={block.id} className="flex scroll-mt-24 flex-col gap-5">
      <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
        {block.title[locale]}
      </h2>

      {block.intro && <Paragraphs text={block.intro[locale]} />}
      {block.items && <Bullets items={block.items[locale]} />}

      {block.subsections && (
        <div className="flex flex-col gap-6">
          {block.subsections.map((sub) => (
            <div
              key={sub.id}
              className="flex flex-col gap-3 rounded-[var(--radius-md)] border border-border bg-surface p-6"
            >
              <h3 className="text-base font-semibold text-text">{sub.title[locale]}</h3>
              {sub.body && <Paragraphs text={sub.body[locale]} />}
              {sub.items && <Bullets items={sub.items[locale]} />}
            </div>
          ))}
        </div>
      )}

      {block.steps && (
        <ol className="flex flex-col gap-3">
          {block.steps.map((step, i) => (
            <li key={step.id}>
              <div className="flex gap-4 rounded-[var(--radius-md)] border border-border bg-surface p-5 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-primary/5">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {i + 1}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[15px] font-semibold text-text">{step.title[locale]}</h3>
                  <p className="text-sm leading-relaxed text-muted">{step.description[locale]}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}

      {block.checklist && (
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {block.checklist[locale].map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-[var(--radius-sm)] border border-border bg-surface p-3.5 text-sm leading-relaxed text-text"
            >
              <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-accent/40 text-accent">
                <Check className="size-3" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      )}

      {block.cta && (
        <div className="pt-1">
          <Button asChild variant="secondary" size="sm">
            <Link href={block.cta.href}>
              {block.cta.label[locale]}
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>
      )}
    </FadeIn>
  );
}
