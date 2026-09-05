// Plain helpers shared between client components (Navbar, enquiry forms) and
// server components (the /courses/[slug] page) — no "use client" directive
// here so it can be imported from either.

export type ProgramPoint = {
  heading: string;
  para: string;
};

export type CourseModule = {
  heading: string;
  para: string;
};

export type ProgramDetails = {
  overview: string;
  curriculumHeading: string;
  curriculumModules: CourseModule[];
  benefitsHeading: string;
  benefitsPara: string;
  benefitsItems: CourseModule[];
  intakeCount: string;
  brochureUrl: string;
  courseIncludes: string[];
  quickQuestions: CourseModule[];
  careerOutcomesPara: string;
  careerOutcomesLogos: string[];
};

export type Program = {
  _id: string;
  category: "Online" | "Offline" | string;
  name: string;
  duration: string;
  heroPara?: string;
  heroHeading?: string;
  heroAbout?: string;
  heroPoints?: Array<ProgramPoint | string>;
  details?: ProgramDetails;
  createdAt: string;
};

export type CareerLogo = {
  _id: string;
  title: string;
  image: string;
  programSlug: string;
  programName: string;
  createdAt: string;
};

export const normalizeProgramPoint = (point: ProgramPoint | string): ProgramPoint =>
  typeof point === "string"
    ? { heading: point, para: point }
    : { heading: point.heading || "", para: point.para || "" };

export const programSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// A single "Category - Name" string, used as the value/label for the
// Preference dropdowns on the enquiry forms.
export const programLabel = (p: Pick<Program, "category" | "name">) =>
  `${p.category} - ${p.name}`;
