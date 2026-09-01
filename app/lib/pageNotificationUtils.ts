export type PageNotification = {
  _id: string;
  message: string;
  pages: string[];
  visible: boolean;
  createdAt: string;
};

// Dropdown options in the admin panel, and the pages they map to.
export const NOTIFICATION_PAGES = [
  "Home",
  "About",
  "Events",
  "Our Gallery",
  "Blogs",
  "Contact Us",
] as const;

export type NotificationPage = (typeof NOTIFICATION_PAGES)[number];

// Used by the Marquee to work out which page label it's currently on.
export const PAGE_PATH_MAP: Record<NotificationPage, string> = {
  Home: "/",
  About: "/about-psc",
  Events: "/events",
  "Our Gallery": "/gallery",
  Blogs: "/blogs",
  "Contact Us": "/contact",
};
