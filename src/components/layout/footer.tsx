import { useTranslations } from "next-intl";
import { Mail, MapPin, MessageCircle, Share2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LogoMark } from "@/components/layout/logo-mark";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <LogoMark />
            <span className="text-[15px] font-extrabold tracking-tight text-primary">
              ASA-STUDY
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{t("tagline")}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-text">{t("contactTitle")}</h3>
          <ul className="mt-4 text-sm text-muted">
            <li className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0 text-accent" />
              <span>{t("address")}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-accent" />
              <span>info@asa-study.com</span>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle className="size-4 shrink-0 text-accent" />
              <span>{t("whatsapp")}</span>
            </li>
            <li className="flex items-center gap-2">
              <Share2 className="size-4 shrink-0 text-accent" />
              <span>{t("social")}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-text">{t("linksTitle")}</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>
              <Link href="/universities" className="flex min-h-11 items-center transition-colors hover:text-accent">
                {t("links.universities")}
              </Link>
            </li>
            <li>
              <Link href="/services" className="flex min-h-11 items-center transition-colors hover:text-accent">
                {t("links.programs")}
              </Link>
            </li>
            <li>
              <Link href="/about" className="flex min-h-11 items-center transition-colors hover:text-accent">
                {t("links.guide")}
              </Link>
            </li>
            <li>
              <Link href="/faq" className="flex min-h-11 items-center transition-colors hover:text-accent">
                {t("links.faq")}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="flex min-h-11 items-center transition-colors hover:text-accent">
                {tNav("contact")}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-6">
        <p className="container-page text-center text-xs text-muted">
          © {new Date().getFullYear()} ASA-STUDY. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
