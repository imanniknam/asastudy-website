import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function UniversityContentSection({
  id,
  title,
  children,
  className,
}: {
  id?: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("flex scroll-mt-24 flex-col gap-4", className)}>
      <h2 className="text-xl font-bold tracking-tight text-text sm:text-2xl">{title}</h2>
      {children}
    </section>
  );
}

export function ProseText({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n+/).filter(Boolean);
  return (
    <div className="flex flex-col gap-4">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-[15px] leading-relaxed text-muted">
          {p}
        </p>
      ))}
    </div>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-2.5 rounded-[var(--radius-md)] border border-border bg-surface p-4 text-sm leading-relaxed text-text"
        >
          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}
