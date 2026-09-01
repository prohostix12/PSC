"use client";

import { useEffect, useState } from "react";
import SketchFrame from "./SketchFrame";
import styles from "./Certifications.module.css";
import type { Certification } from "../lib/certificationUtils";

export default function Certifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );

  useEffect(() => {
    fetch("/api/certifications")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load certifications");
        return res.json();
      })
      .then((data) => {
        setCertifications(
          Array.isArray(data.certifications) ? data.certifications : []
        );
        setStatus("loaded");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status !== "loaded" || certifications.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Our Certification</h2>
        <p className={styles.subheading}>
          Our certifications showcase the skills you&rsquo;ve developed
          through practical, hands-on learning. They stand as proof of your
          growth and job-ready expertise.
        </p>
      </div>

      <div className={styles.grid}>
        {certifications.map((cert) => (
          <div className={styles.card} key={cert._id}>
            <SketchFrame />

            <div className={styles.ribbon}>
              <svg width="28" height="34" viewBox="0 0 28 34" fill="none" aria-hidden="true">
                <circle cx="14" cy="12" r="10" stroke="#c8a13a" strokeWidth="1.5" />
                <path
                  d="M8 20L6 32L14 27L22 32L20 20"
                  stroke="#c8a13a"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className={styles.imageWrap}>
              {cert.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={cert.image} alt={cert.name} className={styles.image} />
              )}
            </div>

            <p className={styles.name}>{cert.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
