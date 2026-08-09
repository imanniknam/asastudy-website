import "server-only";
import fs from "node:fs";
import path from "node:path";
import type {
  MedicalProgramsContent,
  ProgramTier,
  ProgramTierContent,
} from "@/types/medical-program";

const CONTENT_FILE = path.join(process.cwd(), "src", "content", "medical-programs.json");

export function getMedicalPrograms(): MedicalProgramsContent {
  const raw = fs.readFileSync(CONTENT_FILE, "utf-8");
  return JSON.parse(raw) as MedicalProgramsContent;
}

export function getProgramTier(tier: ProgramTier): ProgramTierContent | undefined {
  return getMedicalPrograms().tiers.find((t) => t.tier === tier);
}

/** Total programme count per tier, used for the tier navigation counts. */
export function countProgramsInTier(tier: ProgramTierContent): number {
  return tier.groups.reduce((sum, group) => sum + group.programs.length, 0);
}
