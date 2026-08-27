"use client";

import { useEffect, useState } from "react";
import styles from "./AdmissionModal.module.css";
import type { Program } from "../lib/programUtils";

type Props = {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  // When set, the modal edits this program (PATCH) instead of creating a
  // new one (POST).
  program?: Program | null;
};

const emptyForm = { category: "", name: "", duration: "" };

export default function AddProgramModal({
  open,
  onClose,
  onSaved,
  program,
}: Props) {
  const isEdit = !!program;
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
        program
          ? {
              category: program.category,
              name: program.name,
              duration: program.duration || "",
            }
          : emptyForm
      );
      setStatus("idle");
      setErrorMsg("");
    }
  }, [open, program]);

  if (!open) return null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const response = await fetch(
        isEdit ? `/api/programs/${program!._id}` : "/api/programs",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to save program");

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
      aria-labelledby="add-program-title"
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

        <h2 id="add-program-title" className={styles.heading}>
          {isEdit ? "Edit Program" : "Add Program"}
        </h2>
        <p className={styles.subheading}>
          {isEdit
            ? "Update the category or name for this program."
            : "Create a new program by choosing a category and giving it a name."}
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="program-category" className={styles.label}>
              Program Category
            </label>
            <select
              id="program-category"
              name="category"
              className={styles.select}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="program-name" className={styles.label}>
              Program Name
            </label>
            <input
              id="program-name"
              name="name"
              type="text"
              placeholder="e.g. AI Integrated Digital Marketing"
              className={styles.input}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="program-duration" className={styles.label}>
              Duration
            </label>
            <input
              id="program-duration"
              name="duration"
              type="text"
              placeholder="e.g. 4 Months"
              className={styles.input}
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
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
              : "Add Program"}
          </button>

          {status === "error" && (
            <p className={styles.statusMessageError}>{errorMsg}</p>
          )}
        </form>
      </div>
    </div>
  );
}
