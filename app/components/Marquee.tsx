"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Marquee.module.css";
import { PAGE_PATH_MAP } from "../lib/pageNotificationUtils";

// Roughly how wide one ticker item is, used to make sure a repeated block
// of notifications is always wider than the viewport — otherwise a short
// list (or a very wide/ultrawide screen) leaves blank space once the loop
// runs past the end of what's actually rendered.
const ITEM_SPAN_PX = 260;

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

// Reverse-lookup: pathname -> the admin dropdown label for that page.
function pageLabelForPath(pathname: string | null): string | null {
  if (!pathname) return null;
  const entry = Object.entries(PAGE_PATH_MAP).find(
    ([, path]) => path === pathname
  );
  return entry ? entry[0] : null;
}

// Scrolling ticker strip placed under the hero section on every page, with
// a bell button on the left that opens the full notifications page. Shows
// only that page's admin-created notifications — nothing hardcoded, and
// nothing renders at all until real data (or the "no notifications" state)
// is known.
export default function Marquee() {
  const pathname = usePathname();
  const [items, setItems] = useState<string[] | null>(null);
  // Tracks the real viewport width so the repeated block is sized against
  // the screen that's actually showing it — a fixed guess is what let
  // ultrawide screens outrun the block and hit blank space mid-scroll.
  const [viewportWidth, setViewportWidth] = useState(1600);

  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    const pageLabel = pageLabelForPath(pathname);
    if (!pageLabel) {
      setItems([]);
      return;
    }

    fetch(`/api/page-notifications?page=${encodeURIComponent(pageLabel)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const messages = Array.isArray(data?.notifications)
          ? data.notifications.map((n: { message: string }) => n.message)
          : [];
        setItems(messages);
      })
      .catch(() => setItems([]));
  }, [pathname]);

  if (!items || items.length === 0) return null;

  // Repeat the notification list enough times that one "half" of the
  // track is always comfortably wider than the viewport, then duplicate
  // that whole half once more. With translateX(-50%) that makes the reset
  // point exactly seamless — the next notification starts right where the
  // last one ended, with no gap, lag, or empty stretch.
  const minBlockWidth = viewportWidth * 2;
  const repeats = Math.max(
    1,
    Math.ceil(minBlockWidth / (ITEM_SPAN_PX * items.length))
  );
  const block = Array.from({ length: repeats }, () => items).flat();
  const track = [...block, ...block];

  // Constant scroll speed regardless of how long the track ends up being.
  const duration = Math.max(10, block.length * 1.8);

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
        <div
          className={styles.tickerTrack}
          style={{ animationDuration: `${duration}s` }}
        >
          {track.map((item, i) => (
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
