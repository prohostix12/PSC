"use client";

import { useState } from "react";
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
  | "blogs"
  | "career";

const NAV_ITEMS: { id: AdminView; label: string }[] = [
  { id: "hero", label: "Hero Updation" },
  { id: "enquiries", label: "Enquiries" },
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
  const [programsOpen, setProgramsOpen] = useState(
    active === "programs" || active === "career"
  );

  return (
    <aside className={styles.sidebar}>
      <span className={styles.logo}>Admin Panel</span>

      <nav className={styles.nav}>
        {NAV_ITEMS.slice(0, 2).map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={`${styles.navLink} ${active === item.id ? styles.navLinkActive : ""}`}
          >
            {item.label}
          </button>
        ))}

        <div className={styles.navGroup}>
          <button
            type="button"
            onClick={() => setProgramsOpen((open) => !open)}
            className={`${styles.navLink} ${
              active === "programs" || active === "career"
                ? styles.navLinkActive
                : ""
            }`}
            aria-expanded={programsOpen}
          >
            Programs <span className={styles.chevron}>{programsOpen ? "−" : "+"}</span>
          </button>
          {programsOpen && (
            <div className={styles.subNav}>
              <button
                type="button"
                onClick={() => onSelect("programs")}
                className={`${styles.subNavLink} ${active === "programs" ? styles.subNavLinkActive : ""}`}
              >
                Program List
              </button>
              <button
                type="button"
                onClick={() => onSelect("career")}
                className={`${styles.subNavLink} ${active === "career" ? styles.subNavLinkActive : ""}`}
              >
                Career
              </button>
            </div>
          )}
        </div>

        {NAV_ITEMS.slice(2).map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={`${styles.navLink} ${active === item.id ? styles.navLinkActive : ""}`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
