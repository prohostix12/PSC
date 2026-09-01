"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SketchFrame from "./SketchFrame";
import styles from "./SuccessStoriesGallery.module.css";
import type { SuccessCategory } from "../lib/successStoryUtils";

// Roughly how wide one card + its gap is, used to make sure a repeated
// block of images is always wider than the viewport — otherwise a short
// image list (or a very wide/ultrawide screen) leaves blank space once the
// loop runs past the end of what's actually rendered.
const CARD_SPAN_PX = 320;

export default function SuccessStoriesGallery() {
  const [images, setImages] = useState<string[]>([]);
  // Tracks the real viewport width so the repeated block is sized against
  // the screen that's actually showing it, not a fixed guess — a fixed
  // guess is exactly what let ultrawide screens outrun the block and hit
  // blank space partway through the scroll.
  const [viewportWidth, setViewportWidth] = useState(1600);

  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    // Refetch periodically so newly added gallery images show up without a
    // page reload, but a failed or empty response never clears what's
    // already on screen — the section keeps scrolling with its last known
    // good set of images instead of ever going blank.
    const load = () => {
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
          if (allImages.length > 0) setImages(allImages);
        })
        .catch(() => {});
    };

    load();
    const interval = setInterval(load, 60000);
    return () => clearInterval(interval);
  }, []);

  if (images.length === 0) return null;

  // Repeat the image list enough times that one "half" of the track is
  // always comfortably wider than the current viewport (2x it, so there's
  // margin even mid-resize), then duplicate that whole half once more.
  // With translateX(-50%) that makes the reset point exactly seamless — no
  // gap, no pause, and — on any screen size — no blank space at the end.
  const minBlockWidth = viewportWidth * 2;
  const repeats = Math.max(
    1,
    Math.ceil(minBlockWidth / (CARD_SPAN_PX * images.length))
  );
  const block = Array.from({ length: repeats }, () => images).flat();
  const track = [...block, ...block];

  // Constant scroll speed regardless of how long the track ends up being —
  // higher multiplier/floor here means a slower crawl.
  const duration = Math.max(40, block.length * 6.5);

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
          {track.map((src, i) => (
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

      <div className={styles.ctaRow}>
        <Link href="/gallery" className={styles.ctaButton}>
          Explore Our Gallery
        </Link>
      </div>
    </section>
  );
}
