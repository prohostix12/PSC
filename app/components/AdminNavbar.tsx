"use client";

import styles from "./AdminNavbar.module.css";

export type AdminView = "enquiries" | "programs" | "reviews";

const NAV_ITEMS: { id: AdminView; label: string }[] = [
  { id: "enquiries", label: "Enquiries" },
  { id: "programs", label: "Programs" },
  { id: "reviews", label: "Reviews" },
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
