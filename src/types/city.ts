import type { LocalizedText, LocalizedList, FaqItem } from "./university";
export type { Locale } from "./university";

/** One row of the "City at a Glance" table. */
export interface CityFact {
  label: LocalizedText;
  value: LocalizedText;
}

/** One row of the student cost-of-living table. */
export interface CityExpense {
  type: LocalizedText;
  situation: LocalizedText;
}

/** A university described on the city page, linked to its profile when we have one. */
export interface CityUniversity {
  name: LocalizedText;
  /** Slug of the matching university profile, when the city page covers one we host. */
  slug?: string;
  description: LocalizedText;
  fields?: LocalizedList;
}

export interface CitySeason {
  name: LocalizedText;
  description: LocalizedText;
}

export interface City {
  slug: string;
  name: LocalizedText;
  province: LocalizedText;
  /** Headline tagline from the source brochure. */
  tagline: LocalizedText;
  /** Short summary used on the cities index card. */
  summary: LocalizedText;
  image?: string;
  facts: CityFact[];
  whyStudyHere: LocalizedText;
  advantages: LocalizedList;
  about: LocalizedText;
  universities: CityUniversity[];
  research?: LocalizedText;
  studentLife: LocalizedText;
  studentLifeFacilities?: LocalizedList;
  costOfLiving: LocalizedText;
  expenses: CityExpense[];
  accommodation: LocalizedText;
  accommodationOptions?: LocalizedList;
  accommodationConsiderations?: LocalizedList;
  transport: LocalizedText;
  transportOptions?: LocalizedList;
  climate: LocalizedText;
  seasons?: CitySeason[];
  healthcare?: LocalizedText;
  culture?: LocalizedText;
  historicalAttractions?: LocalizedList;
  naturalAttractions?: LocalizedList;
  faq?: FaqItem[];
}
