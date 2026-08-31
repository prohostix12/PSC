"use client";

import { useEffect, useRef, useState } from "react";
import SketchFrame from "./SketchFrame";
import styles from "./SkillCreators.module.css";
import type { SkillCreator } from "../lib/skillCreatorUtils";

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

export default function SkillCreators() {
  const [skillCreators, setSkillCreators] = useState<SkillCreator[]>([]);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/skill-creators")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load skill creators");
        return res.json();
      })
      .then((data) => {
        setSkillCreators(
          Array.isArray(data.skillCreators) ? data.skillCreators : []
        );
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

  if (status !== "loaded" || skillCreators.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Our Skill Creators</h2>
        <p className={styles.subheading}>
          Meet the trainers and lecturers behind Professional Skill
          Campus&rsquo;s hands-on, industry-ready programs.
        </p>
      </div>

      <div className={styles.carousel}>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={() => scrollByCard("left")}
          aria-label="Scroll skill creators left"
        >
          <ArrowIcon direction="left" />
        </button>

        <div className={styles.track} ref={trackRef}>
          {skillCreators.map((creator) => (
            <div className={styles.card} key={creator._id}>
              <SketchFrame rx={20} />

              <div className={styles.photoWrap}>
                {creator.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={creator.image}
                    alt={creator.name}
                    className={styles.photo}
                  />
                ) : (
                  <span className={styles.photoPlaceholder}>
                    {creator.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <p className={styles.name}>{creator.name}</p>
              <p className={styles.position}>{creator.position}</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={() => scrollByCard("right")}
          aria-label="Scroll skill creators right"
        >
          <ArrowIcon direction="right" />
        </button>
      </div>
    </section>
  );
}
