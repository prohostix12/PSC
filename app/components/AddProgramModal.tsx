"use client";

import { useEffect, useState } from "react";
import styles from "./AdmissionModal.module.css";
import { normalizeProgramPoint, type Program, type ProgramPoint } from "../lib/programUtils";

type Props = {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  // When set, the modal edits this program (PATCH) instead of creating a
  // new one (POST).
  program?: Program | null;
};

type FormState = {
  category: string;
  name: string;
  duration: string;
  heroPara: string;
  heroHeading: string;
  heroAbout: string;
  heroPoints: ProgramPoint[];
};

const emptyForm: FormState = {
  category: "",
  name: "",
  duration: "",
  heroPara: "",
  heroHeading: "",
  heroAbout: "",
  heroPoints: [],
};

export default function AddProgramModal({
  open,
  onClose,
  onSaved,
  program,
}: Props) {
  const isEdit = !!program;
  const [form, setForm] = useState<FormState>(emptyForm);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const addPoint = () => {
    setForm((prev) => ({
      ...prev,
      heroPoints: [...prev.heroPoints, { heading: "", para: "" }],
    }));
  };

  const updatePoint = (index: number, field: keyof ProgramPoint, value: string) => {
    setForm((prev) => ({
      ...prev,
      heroPoints: prev.heroPoints.map((point, i) =>
        i === index ? { ...point, [field]: value } : point
      ),
    }));
  };

  const removePoint = (index: number) => {
    setForm((prev) => ({
      ...prev,
      heroPoints: prev.heroPoints.filter((_, i) => i !== index),
    }));
  };

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
              heroPara: program.heroPara || "",
              heroHeading: program.heroHeading || "",
              heroAbout: program.heroAbout || "",
              heroPoints: Array.isArray(program.heroPoints)
                ? program.heroPoints.map(normalizeProgramPoint)
                : [],
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
      const payload = {
        ...form,
        heroPoints: form.heroPoints
          .map((item) => ({
            heading: item.heading.trim(),
            para: item.para.trim(),
          }))
          .filter((item) => item.heading || item.para),
      };

      const response = await fetch(
        isEdit ? `/api/programs/${program!._id}` : "/api/programs",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
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
              maxLength={35}
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

          <div className={styles.field}>
            <label htmlFor="program-hero-heading" className={styles.label}>
              Hero Heading
            </label>
            <input
              id="program-hero-heading"
              name="heroHeading"
              type="text"
              maxLength={35}
              placeholder="e.g. AI Integrated Digital"
              className={styles.input}
              value={form.heroHeading}
              onChange={(e) => setForm({ ...form, heroHeading: e.target.value })}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="program-hero-para" className={styles.label}>
              Hero Para
            </label>
            <textarea
              id="program-hero-para"
              name="heroPara"
              placeholder="Enter hero paragraph for this program page"
              className={styles.textarea}
              value={form.heroPara}
              onChange={(e) => setForm({ ...form, heroPara: e.target.value })}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="program-hero-about" className={styles.label}>
              About Heading
            </label>
            <textarea
              id="program-hero-about"
              name="heroAbout"
              maxLength={35}
              placeholder="Short about line for this program"
              className={styles.textarea}
              value={form.heroAbout}
              onChange={(e) => setForm({ ...form, heroAbout: e.target.value })}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Program Points</label>
            <div className={styles.pointsListEditor}>
              {form.heroPoints.length === 0 && (
                <p className={styles.emptyPoints}>No points added yet.</p>
              )}

              {form.heroPoints.map((point, index) => (
                <div key={`point-${index}`} className={styles.pointRow}>
                  <input
                    type="text"
                    value={point.heading}
                    maxLength={15}
                    placeholder={`Heading ${index + 1}`}
                    className={styles.pointInput}
                    onChange={(e) => updatePoint(index, "heading", e.target.value)}
                  />
                  <input
                    type="text"
                    value={point.para}
                    maxLength={35}
                    placeholder="Point paragraph"
                    className={styles.pointInput}
                    onChange={(e) => updatePoint(index, "para", e.target.value)}
                  />
                  <button
                    type="button"
                    className={styles.removePoint}
                    onClick={() => removePoint(index)}
                    aria-label={`Remove point ${index + 1}`}
                  >
                    Delete
                  </button>
                </div>
              ))}

              <button type="button" className={styles.addPoint} onClick={addPoint}>
                + Add Point
              </button>
            </div>
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
