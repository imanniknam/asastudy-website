import type { LocalizedText } from "./university";

/**
 * The three postgraduate medical training tiers governed by Iran's Council for
 * Graduate Medical Education (CGME / دبیرخانه شورای آموزش پزشکی و تخصصی).
 *
 * They are strictly sequential: an MD enters `specialty`, a specialist may then
 * enter `subspecialty` or `fellowship`.
 */
export type ProgramTier = "specialty" | "subspecialty" | "fellowship";

export const PROGRAM_TIERS: ProgramTier[] = ["specialty", "subspecialty", "fellowship"];

export interface MedicalProgram {
  /** Stable key, used for React keys and deep links. */
  id: string;
  name: LocalizedText;
  /** Typical duration in years, as published by CGME. */
  durationYears?: number;
  /**
   * For subspecialty and fellowship tiers: the specialty a candidate must
   * already hold. Omitted for the specialty tier, which is entered from an MD.
   */
  prerequisite?: LocalizedText;
}

export interface ProgramGroup {
  id: string;
  title: LocalizedText;
  programs: MedicalProgram[];
}

export interface ProgramTierContent {
  tier: ProgramTier;
  title: LocalizedText;
  shortTitle: LocalizedText;
  /** Plain-language explanation of what this tier is. */
  description: LocalizedText;
  entryRequirement: LocalizedText;
  typicalDuration: LocalizedText;
  groups: ProgramGroup[];
}

export interface MedicalProgramsContent {
  /** Where the official roster comes from, shown as a source note on the page. */
  source: {
    label: LocalizedText;
    url: string;
  };
  tiers: ProgramTierContent[];
}
