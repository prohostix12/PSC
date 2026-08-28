"use client";

import { useEffect, useState } from "react";
import styles from "./EventsGallery.module.css";
import { eventSlug, type EventItem } from "../lib/eventUtils";

// Cycle through this tall/short pattern for masonry variety since the DB
// doesn't track a layout hint per event.
const tallPattern = [true, false, false, true, false, true, false, false];

function CameraIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M3 9a2 2 0 0 1 2-2h3l1.5-2h7L18 7h3a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"
        stroke="#ffffff"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="14" cy="14.5" r="4.2" stroke="#ffffff" strokeWidth="1.6" />
    </svg>
  );
}

export default function EventsGallery() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );

  useEffect(() => {
    fetch("/api/events")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load events");
        return res.json();
      })
      .then((data) => {
        setEvents(Array.isArray(data.events) ? data.events : []);
        setStatus("loaded");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.label}>Photo Gallery</p>
        <h2 className={styles.heading}>Life at Professional Skill Campus</h2>
        <p className={styles.subheading}>
          {status === "loaded" && events.length === 0
            ? "Photos will be added here soon — this is a placeholder gallery layout ready for real event images."
            : "A look back at workshops, graduation days, guest sessions, and milestones from our community."}
        </p>
      </div>

      {status === "loaded" && events.length > 0 && (
        <div className={styles.grid}>
          {events.map((event, index) => {
            const tall = tallPattern[index % tallPattern.length];
            return (
              <div
                key={event._id}
                className={`${styles.card} ${tall ? styles.cardTall : ""}`}
              >
                <div className={styles.placeholder}>
                  {event.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={event.image}
                      alt={event.eventName}
                      className={styles.image}
                    />
                  ) : (
                    <span className={styles.icon}>
                      <CameraIcon />
                    </span>
                  )}
                </div>
                <div className={styles.caption}>
                  <div className={styles.captionText}>
                    <span className={styles.tag}>{event.eventCategory}</span>
                    <span className={styles.title}>{event.eventName}</span>
                  </div>
                  <a
                    href={`/events/${eventSlug(event.eventName)}`}
                    className={styles.viewMore}
                    aria-label={`View more about ${event.eventName}`}
                  >
                    &gt;
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
