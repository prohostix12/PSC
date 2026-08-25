"use client";

import { useState } from "react";
import SketchFrame from "./SketchFrame";
import styles from "./ContactFormSection.module.css";

export default function ContactFormSection() {
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
      source: "Contact - Send your Query",
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
      <div className={styles.card}>
        <SketchFrame rx={24} className={styles.sketch} />

        <h2 className={styles.heading}>Send your Query</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className={styles.input}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            className={styles.input}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={styles.input}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            rows={5}
            className={styles.textarea}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          ></textarea>

          <button
            type="submit"
            className={styles.submit}
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending..." : "Send"}
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
