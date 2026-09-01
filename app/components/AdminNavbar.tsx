"use client";

import styles from "./AdminNavbar.module.css";

export type AdminView =
  | "hero"
  | "enquiries"
  | "programs"
  | "reviews"
  | "faq"
  | "events"
  | "directors"
  | "contacts"
  | "skillCreators"
  | "successStories"
  | "successVideos"
  | "notifications"
  | "certifications"
  | "blogs";

const NAV_ITEMS: { id: AdminView; label: string }[] = [
  { id: "hero", label: "Hero Updation" },
  { id: "enquiries", label: "Enquiries" },
  { id: "programs", label: "Programs" },
  { id: "reviews", label: "Reviews" },
  { id: "faq", label: "FAQ" },
  { id: "events", label: "Events" },
  { id: "directors", label: "Directors" },
  { id: "contacts", label: "Contact" },
  { id: "skillCreators", label: "Skill Creators" },
  { id: "successStories", label: "Success Stories" },
  { id: "successVideos", label: "Success Video" },
  { id: "notifications", label: "Notifications" },
  { id: "certifications", label: "Certifications" },
  { id: "blogs", label: "Blogs" },
];

type Props = {
  active: AdminView;
  onSelect: (view: AdminView) => void;
};

export default function AdminNavbar({ active, onSelect }: Props) {
  return (
    <aside className={styles.sidebar}>
      <span className={styles.logo}>Admin Panel</span>

      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={`${styles.navLink} ${
              active === item.id ? styles.navLinkActive : ""
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
