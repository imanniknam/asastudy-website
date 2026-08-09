import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { University, UniversityCategory } from "@/types/university";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "universities");

export function getAllUniversities(): University[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((file) => file.endsWith(".json"));

  const universities = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    return JSON.parse(raw) as University;
  });

  return universities.sort((a, b) => a.name.en.localeCompare(b.name.en));
}

export function getUniversityBySlug(slug: string): University | undefined {
  const filePath = path.join(CONTENT_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return undefined;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as University;
}

export function getUniversitiesByCategory(category: UniversityCategory): University[] {
  return getAllUniversities().filter((university) => university.category === category);
}

/** Counts per category, used for the directory filter chips. */
export function getCategoryCounts(): Record<UniversityCategory, number> {
  return getAllUniversities().reduce(
    (acc, university) => {
      acc[university.category] += 1;
      return acc;
    },
    { medical: 0, "non-medical": 0 } as Record<UniversityCategory, number>
  );
}

export function getAllUniversitySlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(/\.json$/, ""));
}
