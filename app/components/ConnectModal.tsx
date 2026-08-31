"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./AdmissionModal.module.css";
import { usePrograms, programLabel } from "../hooks/usePrograms";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  preference: "",
  message: "",
};

const POPUP_DELAY_MS = 10000;

// Site-wide "Connect With Us" lead popup. Mounted once in the root layout
// so it fires exactly once per real page load (not on every client-side
// navigation, since layout.tsx isn't remounted between routes) — but it's
// skipped entirely on /admin, where it would just be noise.
export default function ConnectModal() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const { programs } = usePrograms();

  useEffect(() => {
    if (dismissed) return;
    const timer = setTimeout(() => setOpen(true), POPUP_DELAY_MS);
    return () => clearTimeout(timer);
  }, [dismissed]);

  const close = () => {
    setOpen(false);
    setDismissed(true);
  };

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (pathname?.startsWith("/admin")) return null;
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
      source: "Connect With Us Popup",
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
      aria-labelledby="connect-modal-title"
      onClick={close}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.close}
          aria-label="Close"
          onClick={close}
        >
          &times;
        </button>

        <h2 id="connect-modal-title" className={styles.heading}>
          Connect With Us
        </h2>
        <p className={styles.subheading}>
          Leave your details and our team will reach out to you shortly.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="connect-name" className={styles.label}>
              Name
            </label>
            <input
              id="connect-name"
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
            <label htmlFor="connect-email" className={styles.label}>
              Email
            </label>
            <input
              id="connect-email"
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
            <label htmlFor="connect-phone" className={styles.label}>
              Phone Number
            </label>
            <input
              id="connect-phone"
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
            <label htmlFor="connect-preference" className={styles.label}>
              Preference
            </label>
            <select
              id="connect-preference"
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
            <label htmlFor="connect-message" className={styles.label}>
              Message
            </label>
            <textarea
              id="connect-message"
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
            disabled={status === "sending" || status === "sent"}
          >
            {status === "sending"
              ? "Sending..."
              : status === "sent"
              ? "Sent!"
              : "Submit"}
          </button>

          {status === "sent" && (
            <p className={styles.statusMessage}>
              Thanks! We&apos;ll get back to you shortly.
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
