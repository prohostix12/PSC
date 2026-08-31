import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageBackground from "../components/PageBackground";
import { notificationItems } from "../lib/notifications";
import pageStyles from "../page.module.css";
import styles from "./page.module.css";

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 2.5c-2.5 0-4.2 2-4.2 4.5v2.3c0 .5-.2 1.2-.5 1.6L4 12.5c-.7.9-.2 2.2.9 2.5 3.4 1 7 1 10.4 0 1-.3 1.5-1.6.9-2.5l-1.3-1.6c-.3-.4-.5-1.1-.5-1.6V7C14.4 4.5 12.5 2.5 10 2.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11.7 17.1a1.7 1.7 0 0 1-3.4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 5.5V10l3 1.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 6a7 7 0 1 1-1 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M2 3v3.3h3.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <circle cx="13" cy="13" r="12" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8.5 13.2L11.3 16L17.5 9.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function NotificationPage() {
  // Everything currently in the Marquee counts as a latest notification;
  // there's nothing to show as "previous" yet.
  const latest = notificationItems;
  const previous: string[] = [];

  return (
    <>
      <Navbar />
      <div className={pageStyles.pageContent}>
        <PageBackground />

        <div className={styles.page}>
          <div className={styles.pageHeader}>
            <span className={styles.pageHeaderIcon}>
              <BellIcon />
            </span>
            <div>
              <h1 className={styles.pageHeading}>Notifications</h1>
              <p className={styles.pageSubheading}>
                Announcements and updates from Professional Skill Campus.
              </p>
            </div>
          </div>

          <div className={styles.columns}>
            <section className={styles.column}>
              <div className={styles.columnHeader}>
                <span className={`${styles.columnIcon} ${styles.columnIconLatest}`}>
                  <BellIcon />
                </span>
                <h2 className={styles.columnHeading}>Latest Notification</h2>
                <span className={styles.countBadge}>{latest.length}</span>
              </div>

              {latest.length === 0 ? (
                <div className={styles.empty}>
                  <span className={styles.emptyIcon}>
                    <CheckIcon />
                  </span>
                  <p className={styles.emptyText}>No notifications yet.</p>
                </div>
              ) : (
                <div className={styles.latestList}>
                  {latest.map((item, i) => (
                    <div className={styles.latestCard} key={i}>
                      <span className={styles.latestIcon}>
                        <BellIcon />
                      </span>
                      <p className={styles.latestText}>{item}</p>
                      <span className={styles.newTag}>New</span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className={styles.column}>
              <div className={styles.columnHeader}>
                <span className={`${styles.columnIcon} ${styles.columnIconPrevious}`}>
                  <HistoryIcon />
                </span>
                <h2 className={styles.columnHeading}>Previous Notifications</h2>
                <span className={styles.countBadge}>{previous.length}</span>
              </div>

              {previous.length === 0 ? (
                <div className={styles.empty}>
                  <span className={styles.emptyIcon}>
                    <CheckIcon />
                  </span>
                  <p className={styles.emptyText}>
                    You&apos;re all caught up — no previous notifications.
                  </p>
                </div>
              ) : (
                <ul className={styles.list}>
                  {previous.map((item, i) => (
                    <li className={styles.listItem} key={i}>
                      <span className={styles.listIcon}>
                        <HistoryIcon />
                      </span>
                      <span className={styles.listText}>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
