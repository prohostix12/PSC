"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./SuccessStories.module.css";
import {
  toEmbedUrl,
  type SuccessVideo,
} from "../lib/successVideoUtils";

export default function SuccessStories() {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const [videos, setVideos] = useState<SuccessVideo[]>([]);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );
  const [pausedMap, setPausedMap] = useState<Record<string, boolean>>({});

  const togglePlayPause = (id: string) => {
    const el = videoRefs.current[id];
    if (!el) return;
    if (el.paused) el.play();
    else el.pause();
  };

  const handleVolumeChange = (id: string, value: number) => {
    const el = videoRefs.current[id];
    if (el) el.volume = value;
  };

  useEffect(() => {
    fetch("/api/success-videos")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load videos");
        return res.json();
      })
      .then((data) => {
        setVideos(Array.isArray(data.videos) ? data.videos : []);
        setStatus("loaded");
      })
      .catch(() => setStatus("error"));
  }, []);

  const scroll = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;
    const amount = track.clientWidth * 0.8;
    track.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (status !== "loaded" || videos.length === 0) return null;

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
          {videos.map((video) => (
            <div className={styles.card} key={video._id}>
              <div className={styles.cardMedia}>
                {video.sourceType === "upload" ? (
                  <>
                    {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                    <video
                      ref={(el) => {
                        videoRefs.current[video._id] = el;
                      }}
                      src={video.url}
                      playsInline
                      preload="auto"
                      disablePictureInPicture
                      controlsList="nofullscreen nodownload noremoteplayback"
                      className={styles.player}
                      onPlay={() =>
                        setPausedMap((m) => ({ ...m, [video._id]: false }))
                      }
                      onPause={() =>
                        setPausedMap((m) => ({ ...m, [video._id]: true }))
                      }
                    />
                    <div className={styles.customControls}>
                      <button
                        type="button"
                        className={styles.controlButton}
                        onClick={() => togglePlayPause(video._id)}
                        aria-label={
                          pausedMap[video._id] !== false ? "Play video" : "Pause video"
                        }
                      >
                        {pausedMap[video._id] !== false ? (
                          <svg width="12" height="12" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                            <path d="M6 4L18 11L6 18V4Z" fill="currentColor" />
                          </svg>
                        ) : (
                          <svg width="12" height="12" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                            <rect x="5" y="4" width="4" height="14" fill="currentColor" />
                            <rect x="13" y="4" width="4" height="14" fill="currentColor" />
                          </svg>
                        )}
                      </button>
                      <input
                        type="range"
                        className={styles.volumeSlider}
                        min={0}
                        max={1}
                        step={0.05}
                        defaultValue={1}
                        aria-label="Volume"
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          handleVolumeChange(video._id, value);
                          const el = videoRefs.current[video._id];
                          if (el) el.muted = value === 0;
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <iframe
                    src={toEmbedUrl(video)}
                    className={styles.player}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                )}
              </div>

              <div className={styles.cardBrand}>
                <Image
                  src="/logo-main.png"
                  alt="Professional Skill Campus"
                  width={96}
                  height={32}
                />
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
