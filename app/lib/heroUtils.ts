// Shared between the home-page Hero (reader) and the admin "Hero Updation"
// editor (writer) so both agree on defaults and limits.

export const DEFAULT_HERO_TAG =
  "Thinking about a future as a professional trainer?";
export const DEFAULT_HERO_HEADING = "Kerala's First WBL Academy Since 2009";

// Limits count every character, including spaces — e.g. "i am abheesh"
// is 12.
export const HERO_TAG_MAX_CHARS = 50;
export const HERO_HEADING_MAX_CHARS = 40;

export type HeroChild = {
  heading: string;
  paragraph: string;
  // Eye toggle in the admin editor — when false, this child is hidden
  // from the home page's feature list.
  visible: boolean;
};

export const HERO_CHILD_HEADING_MAX_CHARS = 15;
export const HERO_CHILD_PARAGRAPH_MAX_CHARS = 25;

// The three feature callouts under the heading (Get Skilled / Get
// Certified / Get Hired).
export const DEFAULT_HERO_CHILDREN: HeroChild[] = [
  { heading: "Get Skilled", paragraph: "Practical Learning", visible: true },
  {
    heading: "Get Certified",
    paragraph: "Recognized Certification",
    visible: true,
  },
  { heading: "Get Hired", paragraph: "Career Growth", visible: true },
];

export type HeroContent = {
  tag: string;
  heading: string;
  children: HeroChild[];
};

export function countChars(text: string): number {
  return text.length;
}

// Hard-caps a string to at most `maxChars` characters — used to enforce
// the limit as the admin types.
export function truncateToChars(text: string, maxChars: number): string {
  return text.slice(0, maxChars);
}
