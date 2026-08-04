import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default async function NotFound() {
  const t = await getTranslations("nav");

  return (
    <div className="container-page flex flex-col items-center justify-center gap-6 py-32 text-center">
      <span className="text-6xl font-extrabold tracking-tight text-primary">404</span>
      <p className="max-w-md text-balance text-base leading-relaxed text-muted">
        This page could not be found.
      </p>
      <Button asChild variant="accent">
        <Link href="/">{t("home")}</Link>
      </Button>
    </div>
  );
}
