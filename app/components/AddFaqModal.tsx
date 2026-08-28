"use client";

import { useEffect, useState } from "react";
import styles from "./AdmissionModal.module.css";
import type { Faq } from "../lib/faqUtils";

type Props = {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  // When set, the modal edits this FAQ (PATCH) instead of creating a new
  // one (POST).
  faq?: Faq | null;
};

const emptyForm = { question: "", answer: "" };

export default function AddFaqModal({ open, onClose, onSaved, faq }: Props) {
  const isEdit = !!faq;
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
        faq ? { question: faq.question, answer: faq.answer } : emptyForm
      );
      setStatus("idle");
      setErrorMsg("");
    }
  }, [open, faq]);

  if (!open) return null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const response = await fetch(
        isEdit ? `/api/faqs/${faq!._id}` : "/api/faqs",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to save FAQ");

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
      aria-labelledby="add-faq-title"
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

        <h2 id="add-faq-title" className={styles.heading}>
          {isEdit ? "Edit FAQ" : "Create New FAQ"}
        </h2>
        <p className={styles.subheading}>
          {isEdit
            ? "Update this question and its answer."
            : "Add a question and its answer."}
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="faq-question" className={styles.label}>
              Question
            </label>
            <input
              id="faq-question"
              name="question"
              type="text"
              placeholder="e.g. What documents do I need to enroll?"
              className={styles.input}
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="faq-answer" className={styles.label}>
              Answer
            </label>
            <textarea
              id="faq-answer"
              name="answer"
              rows={4}
              placeholder="Write the answer..."
              className={styles.textarea}
              value={form.answer}
              onChange={(e) => setForm({ ...form, answer: e.target.value })}
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
                : "Creating..."
              : isEdit
              ? "Save Changes"
              : "Create FAQ"}
          </button>

          {status === "error" && (
            <p className={styles.statusMessageError}>{errorMsg}</p>
          )}
        </form>
      </div>
    </div>
  );
}
