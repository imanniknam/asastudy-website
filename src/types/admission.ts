import type { LocalizedText, LocalizedList } from "./university";

export interface AdmissionStep {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  /** Optional checklist shown under the step. */
  details?: LocalizedList;
}

export interface AdmissionSection {
  id: string;
  title: LocalizedText;
  intro?: LocalizedText;
  items: LocalizedList;
}

export interface AdmissionContent {
  source: {
    label: LocalizedText;
    url: string;
  };
  /** Caveat shown on the page: requirements differ per university. */
  disclaimer: LocalizedText;
  steps: AdmissionStep[];
  sections: AdmissionSection[];
}
