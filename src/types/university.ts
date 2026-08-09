export type Locale = "en" | "fa";

export interface LocalizedText {
  en: string;
  fa: string;
}

export interface LocalizedList {
  en: string[];
  fa: string[];
}

export interface UniversityProgram {
  name: LocalizedText;
  degreeLevel: LocalizedText;
  faculty: LocalizedText;
}

export interface FaqItem {
  question: LocalizedText;
  answer: LocalizedText;
}

/**
 * ASA-Study organises its whole portfolio along this split, so it drives the
 * universities directory, the home page, and every university card.
 */
export type UniversityCategory = "medical" | "non-medical";

export const UNIVERSITY_CATEGORIES: UniversityCategory[] = ["medical", "non-medical"];

export interface University {
  slug: string;
  category: UniversityCategory;
  name: LocalizedText;
  shortName?: LocalizedText;
  city: LocalizedText;
  province?: LocalizedText;
  type: LocalizedText;
  established?: string;
  ranking?: LocalizedText;
  featuredPrograms: LocalizedList;
  summary: LocalizedText;
  overview: LocalizedText;
  admissionRequirements: LocalizedList;
  requiredDocuments: LocalizedList;
  tuition: LocalizedText;
  tuitionNote?: LocalizedText;
  programs: UniversityProgram[];
  studentLife: LocalizedText;
  dormitory: LocalizedText;
  faq: FaqItem[];
  website?: string;
}
