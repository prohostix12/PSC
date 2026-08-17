"use client";

import { useRef } from "react";
import Image from "next/image";
import styles from "./SuccessStories.module.css";

const stories = [
  { lineOne: "Trained For", lineTwo: "International Roles" },
  { lineOne: "Hands-on", lineTwo: "Live Projects" },
  { lineOne: "Concept to", lineTwo: "Certification" },
  { lineOne: "Real Mentors,", lineTwo: "Real Growth" },
];

export default function SuccessStories() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;
    const amount = track.clientWidth * 0.8;
    track.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Our success stories never end!</h2>
        <p className={styles.subheading}>
          Authentic voices speak of trust, growth, and fulfilled promises!
        </p>
      </div>

      <div className={styles.carousel}>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowLeft}`}
          aria-label="Previous story"
          onClick={() => scroll("left")}
        >
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none" aria-hidden="true">
            <path
              d="M10 2L2 10L10 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={styles.track} ref={trackRef}>
          {stories.map((story) => (
            <div className={styles.card} key={`${story.lineOne}-${story.lineTwo}`}>
              {/* Video/thumbnail placeholder — swap for your <video> or <Image> */}
              <div className={styles.cardMedia}></div>

              <div className={styles.cardBrand}>
                <Image
                  src="/logo-main.png"
                  alt="Professional Skill Campus"
                  width={96}
                  height={32}
                />
              </div>

              <div className={styles.cardText}>
                <span>{story.lineOne}</span>
                <span className={styles.accent}>{story.lineTwo}</span>
              </div>

              <div className={styles.playButton}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <circle cx="11" cy="11" r="10" stroke="#ffffff" strokeWidth="1.5" />
                  <path d="M9 7L15 11L9 15V7Z" fill="#ffffff" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowRight}`}
          aria-label="Next story"
          onClick={() => scroll("right")}
        >
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none" aria-hidden="true">
            <path
              d="M2 2L10 10L2 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
