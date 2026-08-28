"use client";

import { useEffect, useState } from "react";
import SketchFrame from "./SketchFrame";
import styles from "./FAQ.module.css";
import type { Faq } from "../lib/faqUtils";

function FAQItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={styles.item}>
      <SketchFrame rx={14} />

      <button
        type="button"
        className={styles.question}
        aria-expanded={open}
        onClick={onToggle}
      >
        <span>{question}</span>
        <span className={`${styles.icon} ${open ? styles.iconOpen : ""}`}></span>
      </button>

      <div className={`${styles.answerWrap} ${open ? styles.answerWrapOpen : ""}`}>
        <p className={styles.answer}>{answer}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );
  const [openKey, setOpenKey] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/faqs")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load FAQs");
        return res.json();
      })
      .then((data) => {
        setFaqs(Array.isArray(data.faqs) ? data.faqs : []);
        setStatus("loaded");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status !== "loaded" || faqs.length === 0) return null;

  // Split into two reading columns, same layout as before but driven by
  // however many FAQs exist in the DB.
  const mid = Math.ceil(faqs.length / 2);
  const leftFaqs = faqs.slice(0, mid);
  const rightFaqs = faqs.slice(mid);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>FAQ</h2>
        <p className={styles.subheading}>
          Find quick answers to the most common questions about our courses,
          training, and admission process.
        </p>
      </div>

      <div className={styles.grid}>
        <div className={styles.column}>
          {leftFaqs.map((faq) => (
            <FAQItem
              key={faq._id}
              question={faq.question}
              answer={faq.answer}
              open={openKey === faq._id}
              onToggle={() =>
                setOpenKey((current) => (current === faq._id ? null : faq._id))
              }
            />
          ))}
        </div>
        <div className={styles.column}>
          {rightFaqs.map((faq) => (
            <FAQItem
              key={faq._id}
              question={faq.question}
              answer={faq.answer}
              open={openKey === faq._id}
              onToggle={() =>
                setOpenKey((current) => (current === faq._id ? null : faq._id))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
