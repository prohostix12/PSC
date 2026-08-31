"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HeroUpdateForm.module.css";
import {
  DEFAULT_HERO_TAG,
  DEFAULT_HERO_HEADING,
  DEFAULT_HERO_CHILDREN,
  HERO_TAG_MAX_CHARS,
  HERO_HEADING_MAX_CHARS,
  HERO_CHILD_HEADING_MAX_CHARS,
  HERO_CHILD_PARAGRAPH_MAX_CHARS,
  countChars,
  truncateToChars,
  type HeroChild,
} from "../lib/heroUtils";

const AUTOSAVE_DELAY_MS = 700;

function EyeOpenIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M1.5 10S4.5 4 10 4s8.5 6 8.5 6-3 6-8.5 6-8.5-6-8.5-6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function EyeClosedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M1.5 10S4.5 4 10 4s8.5 6 8.5 6-3 6-8.5 6-8.5-6-8.5-6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 17 17 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function HeroUpdateForm() {
  const [tag, setTag] = useState("");
  const [heading, setHeading] = useState("");
  const [children, setChildren] = useState<HeroChild[]>(DEFAULT_HERO_CHILDREN);
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetch("/api/hero")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setTag(data?.tag || DEFAULT_HERO_TAG);
        setHeading(data?.heading || DEFAULT_HERO_HEADING);
        setChildren(
          Array.isArray(data?.children) && data.children.length === 3
            ? data.children
            : DEFAULT_HERO_CHILDREN
        );
        setLoaded(true);
      })
      .catch(() => setLoaded(true));

    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, []);

  const saveNow = async (
    nextTag: string,
    nextHeading: string,
    nextChildren: HeroChild[]
  ) => {
    setStatus("saving");
    setErrorMsg("");
    try {
      const response = await fetch("/api/hero", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tag: nextTag,
          heading: nextHeading,
          children: nextChildren,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to save");
      setStatus("saved");
    } catch (err) {
      setStatus("error");
      setErrorMsg((err as Error).message);
    }
  };

  // Debounced autosave — every keyup on any field reschedules this, so the
  // save fires ~700ms after the admin stops typing rather than on every
  // single keystroke.
  const scheduleSave = (
    nextTag: string,
    nextHeading: string,
    nextChildren: HeroChild[]
  ) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(
      () => saveNow(nextTag, nextHeading, nextChildren),
      AUTOSAVE_DELAY_MS
    );
  };

  const handleTagKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const next = truncateToChars(e.currentTarget.value, HERO_TAG_MAX_CHARS);
    scheduleSave(next, heading, children);
  };

  const handleHeadingKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const next = truncateToChars(
      e.currentTarget.value,
      HERO_HEADING_MAX_CHARS
    );
    scheduleSave(tag, next, children);
  };

  const updateChildField = (
    index: number,
    field: keyof HeroChild,
    value: string,
    maxChars: number
  ) => {
    const truncated = truncateToChars(value, maxChars);
    const next = children.map((c, i) =>
      i === index ? { ...c, [field]: truncated } : c
    );
    setChildren(next);
    return next;
  };

  const handleChildKeyUp = (
    index: number,
    field: keyof HeroChild,
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    maxChars: number
  ) => {
    const truncated = truncateToChars(e.currentTarget.value, maxChars);
    const next = children.map((c, i) =>
      i === index ? { ...c, [field]: truncated } : c
    );
    scheduleSave(tag, heading, next);
  };

  const toggleChildVisible = (index: number) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    const next = children.map((c, i) =>
      i === index ? { ...c, visible: !c.visible } : c
    );
    setChildren(next);
    saveNow(tag, heading, next);
  };

  if (!loaded) {
    return (
      <div className={styles.page}>
        <p className={styles.loading}>Loading...</p>
      </div>
    );
  }

  const tagChars = countChars(tag);
  const headingChars = countChars(heading);

  return (
    <div className={styles.page}>
      <h1 className={styles.pageHeading}>Update Your Hero</h1>
      <div className={styles.divider} />

      <div className={styles.fields}>
        <div className={styles.field}>
          <div className={styles.fieldHeader}>
            <label htmlFor="hero-tag" className={styles.label}>
              Tag
            </label>
            <span
              className={`${styles.wordCount} ${
                tagChars >= HERO_TAG_MAX_CHARS ? styles.wordCountMax : ""
              }`}
            >
              {tagChars}/{HERO_TAG_MAX_CHARS} characters
            </span>
          </div>
          <textarea
            id="hero-tag"
            className={styles.textarea}
            rows={2}
            placeholder="Enter your tag"
            value={tag}
            onChange={(e) =>
              setTag(truncateToChars(e.target.value, HERO_TAG_MAX_CHARS))
            }
            onKeyUp={handleTagKeyUp}
          />
        </div>

        <div className={styles.field}>
          <div className={styles.fieldHeader}>
            <label htmlFor="hero-heading" className={styles.label}>
              Heading
            </label>
            <span
              className={`${styles.wordCount} ${
                headingChars >= HERO_HEADING_MAX_CHARS
                  ? styles.wordCountMax
                  : ""
              }`}
            >
              {headingChars}/{HERO_HEADING_MAX_CHARS} characters
            </span>
          </div>
          <textarea
            id="hero-heading"
            className={styles.textarea}
            rows={3}
            placeholder="Enter your heading"
            value={heading}
            onChange={(e) =>
              setHeading(
                truncateToChars(e.target.value, HERO_HEADING_MAX_CHARS)
              )
            }
            onKeyUp={handleHeadingKeyUp}
          />
        </div>

        <div className={styles.divider} />

        <div className={styles.childrenGrid}>
          {children.map((child, index) => {
            const headingCount = countChars(child.heading);
            const paragraphCount = countChars(child.paragraph);

            return (
              <div className={styles.childCard} key={index}>
                <div className={styles.childCardHeader}>
                  <p className={styles.childLabel}>Child {index + 1}</p>
                  <button
                    type="button"
                    className={`${styles.eyeButton} ${
                      child.visible === false ? styles.eyeButtonOff : ""
                    }`}
                    aria-pressed={child.visible !== false}
                    aria-label={
                      child.visible === false
                        ? `Show Child ${index + 1} on the home page`
                        : `Hide Child ${index + 1} from the home page`
                    }
                    title={
                      child.visible === false
                        ? "Hidden from home page — click to show"
                        : "Visible on home page — click to hide"
                    }
                    onClick={() => toggleChildVisible(index)}
                  >
                    {child.visible === false ? (
                      <EyeClosedIcon />
                    ) : (
                      <EyeOpenIcon />
                    )}
                  </button>
                </div>

                <div className={styles.field}>
                  <div className={styles.fieldHeader}>
                    <label
                      htmlFor={`child-${index}-heading`}
                      className={styles.label}
                    >
                      Heading
                    </label>
                    <span
                      className={`${styles.wordCount} ${
                        headingCount >= HERO_CHILD_HEADING_MAX_CHARS
                          ? styles.wordCountMax
                          : ""
                      }`}
                    >
                      {headingCount}/{HERO_CHILD_HEADING_MAX_CHARS} characters
                    </span>
                  </div>
                  <textarea
                    id={`child-${index}-heading`}
                    className={styles.textarea}
                    rows={2}
                    placeholder="Enter your heading"
                    value={child.heading}
                    onChange={(e) =>
                      updateChildField(
                        index,
                        "heading",
                        e.target.value,
                        HERO_CHILD_HEADING_MAX_CHARS
                      )
                    }
                    onKeyUp={(e) =>
                      handleChildKeyUp(
                        index,
                        "heading",
                        e,
                        HERO_CHILD_HEADING_MAX_CHARS
                      )
                    }
                  />
                </div>

                <div className={styles.field}>
                  <div className={styles.fieldHeader}>
                    <label
                      htmlFor={`child-${index}-paragraph`}
                      className={styles.label}
                    >
                      Paragraph
                    </label>
                    <span
                      className={`${styles.wordCount} ${
                        paragraphCount >= HERO_CHILD_PARAGRAPH_MAX_CHARS
                          ? styles.wordCountMax
                          : ""
                      }`}
                    >
                      {paragraphCount}/{HERO_CHILD_PARAGRAPH_MAX_CHARS}{" "}
                      characters
                    </span>
                  </div>
                  <textarea
                    id={`child-${index}-paragraph`}
                    className={styles.textarea}
                    rows={2}
                    placeholder="Enter your paragraph"
                    value={child.paragraph}
                    onChange={(e) =>
                      updateChildField(
                        index,
                        "paragraph",
                        e.target.value,
                        HERO_CHILD_PARAGRAPH_MAX_CHARS
                      )
                    }
                    onKeyUp={(e) =>
                      handleChildKeyUp(
                        index,
                        "paragraph",
                        e,
                        HERO_CHILD_PARAGRAPH_MAX_CHARS
                      )
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.statusRow}>
        {status === "saving" && (
          <p className={styles.statusSaving}>Saving...</p>
        )}
        {status === "saved" && (
          <p className={styles.statusSaved}>Hero updated successfully</p>
        )}
        {status === "error" && (
          <p className={styles.statusError}>{errorMsg}</p>
        )}
      </div>
    </div>
  );
}
