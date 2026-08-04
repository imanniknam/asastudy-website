import { useLocale, useTranslations } from "next-intl";
import type { UniversityProgram, Locale } from "@/types/university";

export function UniversityPrograms({ programs }: { programs: UniversityProgram[] }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("common");

  if (programs.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-[var(--radius-md)] border border-border">
      <table className="w-full text-start text-sm">
        <thead className="bg-surface">
          <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
            <th className="px-4 py-3 text-start font-medium">{t("programsOffered")}</th>
            <th className="px-4 py-3 text-start font-medium">{t("degreeLevel")}</th>
            <th className="hidden px-4 py-3 text-start font-medium sm:table-cell">
              {t("faculty")}
            </th>
          </tr>
        </thead>
        <tbody>
          {programs.map((program, i) => (
            <tr key={i} className="border-b border-border bg-background/40 last:border-0">
              <td className="px-4 py-3 font-medium text-text">{program.name[locale]}</td>
              <td className="px-4 py-3 text-muted">{program.degreeLevel[locale]}</td>
              <td className="hidden px-4 py-3 text-muted sm:table-cell">
                {program.faculty[locale]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
