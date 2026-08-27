// Plain helpers shared between client components (Navbar, enquiry forms) and
// server components (the /courses/[slug] page) — no "use client" directive
// here so it can be imported from either.

export type Program = {
  _id: string;
  category: "Online" | "Offline" | string;
  name: string;
  duration: string;
  createdAt: string;
};

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
