"use client";

import { useEffect, useState } from "react";
import SketchFrame from "./SketchFrame";
import styles from "./SuccessStoriesGallery.module.css";
import type { SuccessCategory } from "../lib/successStoryUtils";

export default function SuccessStoriesGallery() {
  const [images, setImages] = useState<string[]>([]);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );

  useEffect(() => {
    fetch("/api/success-categories")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load gallery");
        return res.json();
      })
      .then((data) => {
        const categories: SuccessCategory[] = Array.isArray(data.categories)
          ? data.categories
          : [];
        const allImages = categories.flatMap((category) =>
          category.images.map((image) => image.src)
        );
        setImages(allImages);
        setStatus("loaded");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status !== "loaded" || images.length === 0) return null;

  // Keep a constant scroll speed regardless of how many images there are —
  // a fixed duration would make a long track race by and a short one crawl.
  // ~90px of card width per second, with a sane floor/ceiling.
  const duration = Math.min(90, Math.max(18, images.length * 4.5));

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Success Stories</h2>
        <p className={styles.subheading}>
          Moments from our gallery — a glimpse into the journeys we&rsquo;ve
          been part of.
        </p>
      </div>

      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ animationDuration: `${duration}s` }}
        >
          {[...images, ...images].map((src, i) => (
            <div className={styles.card} key={i}>
              <SketchFrame rx={20} />
              <div className={styles.photoWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className={styles.photo} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
