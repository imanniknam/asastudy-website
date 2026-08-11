import type { LocalizedText, LocalizedList } from "./university";

export interface GuideStep {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
}

export interface GuideSubsection {
  id: string;
  title: LocalizedText;
  body?: LocalizedText;
  items?: LocalizedList;
}

export interface GuideBlock {
  id: string;
  title: LocalizedText;
  intro?: LocalizedText;
  /** Free-standing bullet list when the block has no subsections. */
  items?: LocalizedList;
  subsections?: GuideSubsection[];
  /** Numbered process shown as a timeline. */
  steps?: GuideStep[];
  /** Rendered as a tick-box checklist rather than bullets. */
  checklist?: LocalizedList;
  cta?: {
    label: LocalizedText;
    href: string;
  };
}

export interface GuideFaq {
  question: LocalizedText;
  answer: LocalizedText;
}

export interface StudentGuideContent {
  hero: {
    title: LocalizedText;
    body: LocalizedText;
  };
  blocks: GuideBlock[];
  faq: GuideFaq[];
}
