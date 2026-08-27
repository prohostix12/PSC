"use client";

import { useEffect, useState } from "react";
import styles from "./AdmissionModal.module.css";
import { usePrograms, programLabel } from "../hooks/usePrograms";

type Props = {
  open: boolean;
  onClose: () => void;
};

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  preference: "",
  message: "",
};

export default function AdmissionModal({ open, onClose }: Props) {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const { programs } = usePrograms();

  // Close on Escape and lock body scroll while the modal is open.
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

  // Reset the form the next time the modal is opened.
  useEffect(() => {
    if (open) {
      setForm(emptyForm);
      setStatus("idle");
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");

    const data = new FormData(event.currentTarget);
    const payload = {
      name: String(data.get("name") || form.name || ""),
      email: String(data.get("email") || form.email || ""),
      phone: String(data.get("phone") || form.phone || ""),
      preference: String(data.get("preference") || form.preference || ""),
      message: String(data.get("message") || form.message || ""),
      source: "Navbar - Get Your Admission",
    };

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setStatus("sent");
      setForm(emptyForm);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="admission-modal-title"
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

        <h2 id="admission-modal-title" className={styles.heading}>
          Get Your Admission
        </h2>
        <p className={styles.subheading}>
          Share your details and our admissions team will reach out to you.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="admission-name" className={styles.label}>
              Name
            </label>
            <input
              id="admission-name"
              name="name"
              type="text"
              placeholder="Your full name"
              className={styles.input}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="admission-email" className={styles.label}>
              Email
            </label>
            <input
              id="admission-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className={styles.input}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="admission-phone" className={styles.label}>
              Phone Number
            </label>
            <input
              id="admission-phone"
              name="phone"
              type="tel"
              placeholder="+91 00000 00000"
              className={styles.input}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="admission-preference" className={styles.label}>
              Preference
            </label>
            <select
              id="admission-preference"
              name="preference"
              className={styles.select}
              value={form.preference}
              onChange={(e) =>
                setForm({ ...form, preference: e.target.value })
              }
            >
              <option value="" disabled>
                Select a course
              </option>
              {programs.map((program) => (
                <option key={program._id} value={programLabel(program)}>
                  {programLabel(program)}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="admission-message" className={styles.label}>
              Message
            </label>
            <textarea
              id="admission-message"
              name="message"
              rows={3}
              placeholder="Tell us what you're looking for..."
              className={styles.textarea}
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className={styles.submit}
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending..." : "Submit Admission"}
          </button>

          {status === "sent" && (
            <p className={styles.statusMessage}>
              Thanks! Our admissions team will get back to you shortly.
            </p>
          )}
          {status === "error" && (
            <p className={styles.statusMessageError}>
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
