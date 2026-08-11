import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { City } from "@/types/city";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "cities");

export function getAllCities(): City[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8")) as City)
    .sort((a, b) => a.name.en.localeCompare(b.name.en));
}

export function getCityBySlug(slug: string): City | undefined {
  const filePath = path.join(CONTENT_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return undefined;
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as City;
}

export function getAllCitySlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(/\.json$/, ""));
}

/**
 * The city page a university links to, matched on the city name rather than a
 * stored key so university records don't need to know about city slugs.
 */
export function findCitySlugByName(cityNameEn: string): string | undefined {
  return getAllCities().find(
    (city) => city.name.en.toLowerCase() === cityNameEn.trim().toLowerCase()
  )?.slug;
}
