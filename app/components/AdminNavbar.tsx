import styles from "./AdminNavbar.module.css";

export default function AdminNavbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <span className={styles.logo}>Admin Panel</span>

        <nav className={styles.nav}>
          <a href="/admin" className={`${styles.navLink} ${styles.navLinkActive}`}>
            Enquiries
          </a>
        </nav>
      </div>
    </header>
  );
}
