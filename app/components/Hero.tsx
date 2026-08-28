"use client";

import { useState } from "react";
import styles from "./Hero.module.css";
import { usePrograms, programLabel } from "../hooks/usePrograms";

const features = [
  { title: "Get Skilled", subtitle: "Practical Learning" },
  { title: "Get Certified", subtitle: "Recognized Certification" },
  { title: "Get Hired", subtitle: "Career Growth" },
];

export default function Hero() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    preference: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const { programs } = usePrograms();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("enquiry clicked");
    setStatus("sending");

    // Read straight from the DOM via FormData rather than the React state
    // alone — some browsers fill fields (autofill, password managers) in a
    // way that satisfies `required` without firing React's onChange, which
    // would otherwise leave the component state empty at submit time.
    const data = new FormData(event.currentTarget);
    const payload = {
      name: String(data.get("name") || form.name || ""),
      email: String(data.get("email") || form.email || ""),
      phone: String(data.get("phone") || form.phone || ""),
      preference: String(data.get("preference") || form.preference || ""),
      source: "Home - Make Your Enquiry",
    };

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setStatus("sent");
      setForm({ name: "", email: "", phone: "", preference: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.rating}>
            <span className={styles.ratingScore}>4.9</span>
            <div className={styles.ratingDetails}>
              <span className={styles.ratingLabel}>Star Rating</span>
              <span className={styles.ratingSource}>Google ★★★★★</span>
            </div>
          </div>

          <p className={styles.eyebrow}>
            Thinking about a future as a professional trainer?
          </p>

          <h1 className={styles.heading}>
            Kerala&apos;s First WBL Academy Since 2009
          </h1>

          <ul className={styles.features}>
            {features.map((feature) => (
              <li key={feature.title} className={styles.feature}>
                <span className={styles.featureTitle}>{feature.title}</span>
                <span className={styles.featureSubtitle}>
                  {feature.subtitle}
                </span>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <a href="#" className={styles.primaryButton}>
              Enroll Now
            </a>
            <a href="#" className={styles.secondaryButton}>
              Book a Free Consultation
            </a>
          </div>
        </div>

        <div className={styles.media}>
          <form className={styles.enquiryCard} onSubmit={handleSubmit}>
            <h2 className={styles.enquiryHeading}>Make Your Enquiry</h2>

            <div className={styles.enquiryField}>
              <label htmlFor="enquiry-name" className={styles.enquiryLabel}>
                Name
              </label>
              <input
                id="enquiry-name"
                name="name"
                type="text"
                placeholder="Your full name"
                className={styles.enquiryInput}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div className={styles.enquiryField}>
              <label htmlFor="enquiry-email" className={styles.enquiryLabel}>
                Email
              </label>
              <input
                id="enquiry-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className={styles.enquiryInput}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className={styles.enquiryField}>
              <label
                htmlFor="enquiry-phone"
                className={styles.enquiryLabel}
              >
                Phone Number
              </label>
              <input
                id="enquiry-phone"
                name="phone"
                type="tel"
                placeholder="+91 00000 00000"
                className={styles.enquiryInput}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </div>

            <div className={styles.enquiryField}>
              <label
                htmlFor="enquiry-preference"
                className={styles.enquiryLabel}
              >
                Preference
              </label>
              <select
                id="enquiry-preference"
                name="preference"
                className={styles.enquirySelect}
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

            <button
              type="submit"
              className={styles.enquireButton}
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending..." : "Enquire Now"}
            </button>

            {status === "sent" && (
              <p className={styles.enquiryStatus}>
                Thanks! We&apos;ll get back to you shortly.
              </p>
            )}
            {status === "error" && (
              <p className={styles.enquiryStatusError}>
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
