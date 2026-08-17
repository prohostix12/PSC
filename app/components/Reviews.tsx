"use client";

import { useRef } from "react";
import SketchFrame from "./SketchFrame";
import styles from "./Reviews.module.css";

const reviews = [
  {
    name: "Aisha K.",
    initial: "A",
    color: "#2e7d5b",
    rating: 5,
    text: "Best training institute I've attended — practical and career focused.",
  },
  {
    name: "Rahul Menon",
    initial: "R",
    color: "#7b3fa0",
    rating: 5,
    text: "The mentors genuinely care about your growth. I use what I learned here every day at work.",
  },
  {
    name: "Fathima S.",
    initial: "F",
    color: "#2e7d5b",
    rating: 4,
    text: "Great hands-on sessions and a supportive team throughout the entire course.",
  },
  {
    name: "Nikhil P.",
    initial: "N",
    color: "#3949ab",
    rating: 5,
    text: "Helped me switch careers with real confidence. Highly recommend Professional Skill Campus.",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <span className={styles.stars}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill={i < rating ? "#f5a623" : "#d9dee8"}
          aria-hidden="true"
        >
          <path d="M8 0.8L10 5.4L15 5.9L11.2 9.1L12.3 14L8 11.4L3.7 14L4.8 9.1L1 5.9L6 5.4Z" />
        </svg>
      ))}
    </span>
  );
}

function GoogleG() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.6 9.2c0-.6-.05-1.2-.15-1.8H9v3.4h4.8a4.1 4.1 0 0 1-1.8 2.7v2.2h2.9c1.7-1.6 2.7-3.9 2.7-6.5Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.4 0 4.5-.8 6-2.2l-2.9-2.2c-.8.5-1.9.9-3.1.9-2.4 0-4.4-1.6-5.1-3.8H.9v2.3A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.9 10.7a5.4 5.4 0 0 1 0-3.4V5H.9a9 9 0 0 0 0 8l3-2.3Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.6c1.3 0 2.5.45 3.4 1.3l2.6-2.6A9 9 0 0 0 .9 5l3 2.3C4.6 5.2 6.6 3.6 9 3.6Z"
      />
    </svg>
  );
}

function VerifiedBadge() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill="#4285F4" />
      <path
        d="M5 8.2L7 10.2L11.2 5.8"
        stroke="#ffffff"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function Reviews() {
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
      <div className={styles.inner}>
        <div className={styles.summary}>
          <p className={styles.excellent}>EXCELLENT</p>
          <Stars rating={5} />
          <p className={styles.basedOn}>
            Based on <strong>262 reviews</strong>
          </p>
          <div className={styles.googleWordmark}>
            <GoogleG />
            <span>Google Reviews</span>
          </div>
        </div>

        <div className={styles.carousel}>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowLeft}`}
            aria-label="Previous reviews"
            onClick={() => scroll("left")}
          >
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none" aria-hidden="true">
              <path
                d="M8 2L2 8L8 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className={styles.track} ref={trackRef}>
            {reviews.map((review) => (
              <div className={styles.card} key={review.name}>
                <SketchFrame rx={18} />

                <div className={styles.cardHeader}>
                  <span
                    className={styles.avatar}
                    style={{ background: review.color }}
                  >
                    {review.initial}
                  </span>
                  <span className={styles.name}>{review.name}</span>
                  <span className={styles.googleIcon}>
                    <GoogleG />
                  </span>
                </div>

                <div className={styles.rating}>
                  <Stars rating={review.rating} />
                  <VerifiedBadge />
                </div>

                <p className={styles.text}>{review.text}</p>
              </div>
            ))}
          </div>

          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowRight}`}
            aria-label="Next reviews"
            onClick={() => scroll("right")}
          >
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none" aria-hidden="true">
              <path
                d="M2 2L8 8L2 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
