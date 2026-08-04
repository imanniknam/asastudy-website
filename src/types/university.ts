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

export interface University {
  slug: string;
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
