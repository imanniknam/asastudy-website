import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAllUniversitySlugs } from "@/lib/content/universities";

const BASE_URL = "https://asa-study.com";

const staticPaths = ["", "/about", "/services", "/universities", "/faq", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const universitySlugs = getAllUniversitySlugs();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.7,
      });
    }
    for (const slug of universitySlugs) {
      entries.push({
        url: `${BASE_URL}/${locale}/universities/${slug}`,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
