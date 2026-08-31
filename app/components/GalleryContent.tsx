"use client";

import { useEffect, useState } from "react";
import styles from "./GalleryContent.module.css";
import type { SuccessCategory } from "../lib/successStoryUtils";

export default function GalleryContent() {
  const [categories, setCategories] = useState<SuccessCategory[]>([]);
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
        setCategories(Array.isArray(data.categories) ? data.categories : []);
        setStatus("loaded");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") return null;

  if (status === "error") {
    return (
      <div className={styles.wrap}>
        <p className={styles.empty}>Couldn&apos;t load the gallery.</p>
      </div>
    );
  }

  const withImages = categories.filter((c) => c.images.length > 0);

  if (withImages.length === 0) {
    return (
      <div className={styles.wrap}>
        <p className={styles.empty}>Photos will be added here soon.</p>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      {withImages.map((category) => (
        <section className={styles.category} key={category._id}>
          <h2 className={styles.categoryHeading}>{category.name}</h2>
          <div className={styles.grid}>
            {category.images.map((image) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={image.id}
                src={image.src}
                alt={category.name}
                className={styles.image}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
