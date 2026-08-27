"use client";

import { useMemo, useRef } from "react";
import SketchFrame from "./SketchFrame";
import styles from "./Courses.module.css";
import { usePrograms, programSlug } from "../hooks/usePrograms";

const icons = [
  <svg key="i1" width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <circle cx="5" cy="5" r="2.5" stroke="#ffffff" strokeWidth="1.6" />
    <circle cx="17" cy="5" r="2.5" stroke="#ffffff" strokeWidth="1.6" />
    <circle cx="11" cy="17" r="2.5" stroke="#ffffff" strokeWidth="1.6" />
    <path d="M7 6.5L11 14.5M15 6.5L11 14.5" stroke="#ffffff" strokeWidth="1.6" />
  </svg>,
  <svg key="i2" width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <rect x="3" y="7" width="16" height="11" rx="2" stroke="#ffffff" strokeWidth="1.6" />
    <path d="M8 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" stroke="#ffffff" strokeWidth="1.6" />
    <path d="M3 12H19" stroke="#ffffff" strokeWidth="1.6" />
  </svg>,
  <svg key="i3" width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <rect x="4" y="2" width="14" height="18" rx="2" stroke="#ffffff" strokeWidth="1.6" />
    <path d="M7 6H15" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M7 10H9M11.5 10H13.5M16 10H16" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M7 14H9M11.5 14H13.5M16 14H16" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
  </svg>,
];

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "M11 3.5L5 9L11 14.5" : "M7 3.5L13 9L7 14.5"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Courses() {
  const { programs, loading } = usePrograms();
  const trackRef = useRef<HTMLDivElement>(null);

  // Programs are stored per-category, so a course offered both Online and
  // Offline exists as two rows in the DB — merge them into one card whose
  // mode reads "Offline & Online".
  const courses = useMemo(() => {
    const byName = new Map<
      string,
      { categories: Set<string>; duration: string }
    >();
    for (const p of programs) {
      if (!byName.has(p.name)) {
        byName.set(p.name, { categories: new Set(), duration: p.duration || "" });
      }
      const entry = byName.get(p.name)!;
      entry.categories.add(p.category);
      if (!entry.duration && p.duration) entry.duration = p.duration;
    }

    return Array.from(byName.entries()).map(
      ([name, { categories, duration }], index) => {
        const hasOnline = categories.has("Online");
        const hasOffline = categories.has("Offline");
        const mode =
          hasOnline && hasOffline
            ? "Offline & Online"
            : hasOffline
            ? "Offline"
            : "Online";

        return { name, mode, duration, icon: icons[index % icons.length] };
      }
    );
  }, [programs]);

  const scrollByCard = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(`.${styles.card}`) as HTMLElement | null;
    const distance = (card?.offsetWidth ?? 320) + 24;
    track.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  return (
    <section id="courses" className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Our Courses</h2>
        <p className={styles.subheading}>
          Explore industry-ready courses designed to build practical skills
          and prepare you for real career success.
        </p>
      </div>

      {!loading && courses.length === 0 && (
        <p className={styles.empty}>Programs coming soon.</p>
      )}

      {courses.length > 0 && (
        <div className={styles.carousel}>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowLeft}`}
            onClick={() => scrollByCard("left")}
            aria-label="Scroll courses left"
          >
            <ArrowIcon direction="left" />
          </button>

          <div className={styles.track} ref={trackRef}>
            {courses.map((course) => (
              <div className={styles.card} key={course.name}>
                <SketchFrame rx={20} />

                <span className={styles.iconCircle}>{course.icon}</span>

                <h3 className={styles.title}>{course.name}</h3>

                <div className={styles.meta}>
                  <span className={styles.metaItem}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <circle cx="6" cy="5" r="2.4" stroke="currentColor" strokeWidth="1.4" />
                      <path d="M1.5 14C1.5 11 3.5 9.4 6 9.4C8.5 9.4 10.5 11 10.5 14" stroke="currentColor" strokeWidth="1.4" />
                      <circle cx="12" cy="5.5" r="1.8" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M10.6 9.6C12.6 9.8 14.2 11.2 14.2 14" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                    {course.mode}
                  </span>
                  {course.duration && (
                    <span className={styles.metaItem}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                        <path d="M2 6.5H14M5 1.5V3.5M11 1.5V3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                      {course.duration}
                    </span>
                  )}
                </div>

                <a
                  href={`/courses/${programSlug(course.name)}`}
                  className={styles.cta}
                >
                  Apply now
                </a>
              </div>
            ))}
          </div>

          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowRight}`}
            onClick={() => scrollByCard("right")}
            aria-label="Scroll courses right"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      )}
    </section>
  );
}
