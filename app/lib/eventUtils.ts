export type EventSection = {
  heading: string;
  paragraph: string;
};

export type EventItem = {
  _id: string;
  eventCategory: string;
  eventName: string;
  image: string;
  sections?: EventSection[];
  gallery?: string[];
  createdAt: string;
};

export const eventSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
