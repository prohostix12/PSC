import Link from "next/link";
import styles from "./Marquee.module.css";
import { notificationItems } from "../lib/notifications";

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 2.5c-2.5 0-4.2 2-4.2 4.5v2.3c0 .5-.2 1.2-.5 1.6L4 12.5c-.7.9-.2 2.2.9 2.5 3.4 1 7 1 10.4 0 1-.3 1.5-1.6.9-2.5l-1.3-1.6c-.3-.4-.5-1.1-.5-1.6V7C14.4 4.5 12.5 2.5 10 2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.7 17.1a1.7 1.7 0 0 1-3.4 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Scrolling ticker strip placed under the hero section on every page, with
// a bell button on the left that opens the full notifications page.
export default function Marquee() {
  return (
    <div className={styles.ticker}>
      <Link
        href="/notification"
        className={styles.bell}
        aria-label="View all notifications"
      >
        <BellIcon />
      </Link>

      <div className={styles.tickerScroll}>
        <div className={styles.tickerTrack}>
          {[...notificationItems, ...notificationItems].map((item, i) => (
            <span key={i} className={styles.tickerItem}>
              {item}
              <span className={styles.tickerDot}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
