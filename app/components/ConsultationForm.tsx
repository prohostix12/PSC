"use client";

import { useState } from "react";
import SketchFrame from "./SketchFrame";
import styles from "./ConsultationForm.module.css";

export default function ConsultationForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");

    // Read straight from the DOM via FormData rather than the React state
    // alone — some browsers fill fields (autofill, password managers) in a
    // way that satisfies `required` without firing React's onChange, which
    // would otherwise leave the component state empty at submit time.
    const data = new FormData(event.currentTarget);
    const payload = {
      name: String(data.get("name") || form.name || ""),
      phone: String(data.get("phone") || form.phone || ""),
      email: String(data.get("email") || form.email || ""),
      message: String(data.get("message") || form.message || ""),
      source: "About - Get a Free Consultation",
    };

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setStatus("sent");
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.label}>Free Consultation</p>
        <h2 className={styles.heading}>Get a Free Consultation</h2>
        <p className={styles.subheading}>
          Fill in your details and a career counsellor will get back to you
          within 24 hours — no cost, no obligation.
        </p>
      </div>

      <div className={styles.card}>
        <SketchFrame rx={24} />

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label htmlFor="consult-name" className={styles.fieldLabel}>
                Name
              </label>
              <input
                id="consult-name"
                name="name"
                type="text"
                placeholder="Your name"
                className={styles.input}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="consult-phone" className={styles.fieldLabel}>
                Phone
              </label>
              <input
                id="consult-phone"
                name="phone"
                type="tel"
                placeholder="+91 00000 00000"
                className={styles.input}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="consult-email" className={styles.fieldLabel}>
              Email
            </label>
            <input
              id="consult-email"
              name="email"
              type="email"
              placeholder="your@email.com"
              className={styles.input}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="consult-message" className={styles.fieldLabel}>
              Message
            </label>
            <textarea
              id="consult-message"
              name="message"
              rows={4}
              placeholder="Tell us what you're looking for..."
              className={styles.textarea}
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
            ></textarea>
          </div>

          <button
            type="submit"
            className={styles.submit}
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending..." : "Send Message"}
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
    </section>
  );
}
