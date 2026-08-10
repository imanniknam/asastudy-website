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

/**
 * A YouTube video introducing a university or studying in Iran generally.
 * `language` is the spoken language of the video, which is not always one of
 * the site's own locales — some official clips are in Arabic.
 */
export interface VideoItem {
  youtubeId: string;
  title: LocalizedText;
  language: "en" | "fa" | "ar";
}

export interface University {
  slug: string;
  category: UniversityCategory;
  /**
   * Campus photos, as paths under /public. The first entry is the primary
   * image used on the directory card and the detail page hero. Universities
   * without photos fall back to a generated monogram.
   */
  images?: string[];
  /** Official introduction or campus-tour videos, shown on the detail page. */
  videos?: VideoItem[];
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
