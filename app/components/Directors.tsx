"use client";

import { useEffect, useRef, useState } from "react";
import SketchFrame from "./SketchFrame";
import styles from "./Directors.module.css";
import type { Director } from "../lib/directorUtils";

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

export default function Directors() {
  const [directors, setDirectors] = useState<Director[]>([]);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/directors")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load directors");
        return res.json();
      })
      .then((data) => {
        setDirectors(Array.isArray(data.directors) ? data.directors : []);
        setStatus("loaded");
      })
      .catch(() => setStatus("error"));
  }, []);

  const scrollByCard = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(`.${styles.card}`) as HTMLElement | null;
    const distance = (card?.offsetWidth ?? 260) + 24;
    track.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  if (status !== "loaded" || directors.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Meet Our Directors</h2>
        <p className={styles.subheading}>
          The people guiding Professional Skill Campus&rsquo;s vision,
          culture, and commitment to student success.
        </p>
      </div>

      <div className={styles.carousel}>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={() => scrollByCard("left")}
          aria-label="Scroll directors left"
        >
          <ArrowIcon direction="left" />
        </button>

        <div className={styles.track} ref={trackRef}>
          {directors.map((director) => (
            <div className={styles.card} key={director._id}>
              <SketchFrame rx={20} />

              <div className={styles.photoWrap}>
                {director.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={director.image}
                    alt={director.name}
                    className={styles.photo}
                  />
                ) : (
                  <span className={styles.photoPlaceholder}>
                    {director.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <p className={styles.name}>{director.name}</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={() => scrollByCard("right")}
          aria-label="Scroll directors right"
        >
          <ArrowIcon direction="right" />
        </button>
      </div>
    </section>
  );
}
