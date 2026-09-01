export type BlogSection = {
  heading: string;
  paragraph: string;
};

export type BlogItem = {
  _id: string;
  topic: string;
  subject: string;
  uploadedDate: string;
  sectionPara: string;
  image: string;
  sections?: BlogSection[];
  gallery?: string[];
  createdAt: string;
};

export const blogSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const formatBlogDate = (value: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
