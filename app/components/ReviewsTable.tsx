"use client";

import { useCallback, useEffect, useState } from "react";
import AddReviewModal from "./AddReviewModal";
import styles from "./EnquiriesTable.module.css";
import type { Review } from "../lib/reviewUtils";

const Stars = ({ ratings }: { ratings: number }) => (
  <span aria-label={`${ratings} out of 5 stars`}>
    {"★".repeat(ratings)}
    <span style={{ opacity: 0.25 }}>{"★".repeat(5 - ratings)}</span>
  </span>
);

export default function ReviewsTable() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Review | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = useCallback(() => {
    setStatus("loading");
    fetch("/api/reviews")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load reviews");
        return res.json();
      })
      .then((data) => {
        setReviews(data.reviews || []);
        setStatus("loaded");
      })
      .catch(() => setStatus("error"));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (review: Review) => {
    setEditing(review);
    setModalOpen(true);
  };

  const handleDelete = async (review: Review) => {
    if (!confirm(`Delete the review from "${review.name}"? This can't be undone.`))
      return;

    setDeletingId(review._id);
    try {
      const response = await fetch(`/api/reviews/${review._id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete review");
      load();
    } catch {
      alert("Couldn't delete this review. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.heading}>Reviews</h1>
            <p className={styles.subheading}>
              Reviews shown across the site, with reviewer, rating, and text.
            </p>
          </div>
          <button
            type="button"
            className={styles.addButton}
            onClick={openAdd}
          >
            + Add Review
          </button>
        </div>
      </div>

      {status === "loading" && (
        <p className={styles.message}>Loading reviews...</p>
      )}

      {status === "error" && (
        <p className={styles.messageError}>
          Couldn&apos;t load reviews. Please refresh the page.
        </p>
      )}

      {status === "loaded" && reviews.length === 0 && (
        <p className={styles.message}>No reviews added yet.</p>
      )}

      {status === "loaded" && reviews.length > 0 && (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Ratings</th>
                <th>Review</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id}>
                  <td>
                    {review.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={review.image}
                        alt={review.name}
                        className={styles.avatar}
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>{review.name || "—"}</td>
                  <td>
                    <Stars ratings={review.ratings || 0} />
                  </td>
                  <td className={styles.reviewCell}>{review.review || "—"}</td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        type="button"
                        className={styles.actionButton}
                        onClick={() => openEdit(review)}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className={styles.actionButtonDanger}
                        onClick={() => handleDelete(review)}
                        disabled={deletingId === review._id}
                      >
                        {deletingId === review._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddReviewModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={load}
        review={editing}
      />
    </section>
  );
}
