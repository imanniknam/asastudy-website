import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";

export function PageHero({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
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
      <FadeIn className="container-page relative flex flex-col items-center gap-4 text-center">
        <Badge className="border-white/20 bg-white/10 text-white">{eyebrow}</Badge>
        <h1 className="max-w-2xl text-balance text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {body && (
          <p className="max-w-xl text-balance text-base leading-relaxed text-white/75 sm:text-lg">
            {body}
          </p>
        )}
      </FadeIn>
    </section>
  );
}
