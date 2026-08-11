import { useLocale, useTranslations } from "next-intl";
import type { City, Locale } from "@/types/city";

export function CityFactsTable({ facts }: { facts: City["facts"] }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("citiesPage");

  if (facts.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold tracking-tight text-text sm:text-2xl">{t("atAGlance")}</h2>
      <div className="overflow-hidden rounded-[var(--radius-md)] border border-border">
        <table className="w-full text-start text-sm">
          <tbody>
            {facts.map((fact, i) => (
              <tr key={i} className="border-b border-border last:border-0 even:bg-background/40">
                <th className="w-2/5 px-4 py-3 text-start align-top font-medium text-muted">
                  {fact.label[locale]}
                </th>
                <td className="px-4 py-3 align-top text-text">{fact.value[locale]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
