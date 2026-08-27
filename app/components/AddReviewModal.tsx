"use client";

import { useEffect, useState } from "react";
import styles from "./AdmissionModal.module.css";
import type { Review } from "../lib/reviewUtils";

type Props = {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  // When set, the modal edits this review (PATCH) instead of creating a
  // new one (POST).
  review?: Review | null;
};

const emptyForm = { name: "", image: "", ratings: "5", review: "" };

export default function AddReviewModal({
  open,
  onClose,
  onSaved,
  review,
}: Props) {
  const isEdit = !!review;
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setForm(
        review
          ? {
              name: review.name,
              image: review.image || "",
              ratings: String(review.ratings ?? 5),
              review: review.review,
            }
          : emptyForm
      );
      setStatus("idle");
      setErrorMsg("");
    }
  }, [open, review]);

  if (!open) return null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const response = await fetch(
        isEdit ? `/api/reviews/${review!._id}` : "/api/reviews",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            ratings: Number(form.ratings),
          }),
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to save review");

      onSaved();
      onClose();
    } catch (err) {
      setStatus("error");
      setErrorMsg((err as Error).message);
    }
  };

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-review-title"
      onClick={onClose}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.close}
          aria-label="Close"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 id="add-review-title" className={styles.heading}>
          {isEdit ? "Edit Review" : "Add Review"}
        </h2>
        <p className={styles.subheading}>
          {isEdit
            ? "Update this reviewer's details."
            : "Add a new reviewer, rating, and their review."}
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="review-name" className={styles.label}>
              Name
            </label>
            <input
              id="review-name"
              name="name"
              type="text"
              placeholder="Reviewer's name"
              className={styles.input}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="review-image" className={styles.label}>
              Image URL
            </label>
            <input
              id="review-image"
              name="image"
              type="text"
              placeholder="https://example.com/photo.jpg"
              className={styles.input}
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="review-ratings" className={styles.label}>
              Ratings
            </label>
            <select
              id="review-ratings"
              name="ratings"
              className={styles.select}
              value={form.ratings}
              onChange={(e) => setForm({ ...form, ratings: e.target.value })}
              required
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} Star{n === 1 ? "" : "s"}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="review-text" className={styles.label}>
              Review
            </label>
            <textarea
              id="review-text"
              name="review"
              rows={4}
              placeholder="What did they say?"
              className={styles.textarea}
              value={form.review}
              onChange={(e) => setForm({ ...form, review: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className={styles.submit}
            disabled={status === "sending"}
          >
            {status === "sending"
              ? isEdit
                ? "Saving..."
                : "Adding..."
              : isEdit
              ? "Save Changes"
              : "Add Review"}
          </button>

          {status === "error" && (
            <p className={styles.statusMessageError}>{errorMsg}</p>
          )}
        </form>
      </div>
    </div>
  );
}
