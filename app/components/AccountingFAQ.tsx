"use client";

import { useState } from "react";
import SketchFrame from "./SketchFrame";
import styles from "./CourseFAQ.module.css";
import layout from "./BusinessFAQ.module.css";

const faqs = [
  {
    question:
      "What is the Accounting Course offered by Professional Skill Campus Malappuram?",
    answer:
      "It's an offline Professional Diploma in AI Integrated Accounting & Taxation, covering everything from basic accounting principles to advanced financial analytics — including income tax and GST filing, GCC VAT, and hands-on training with Tally Prime, Zoho Books, Odoo, and Power BI.",
  },
  {
    question: "Are the trainers experienced professionals?",
    answer:
      "Yes, you'll learn from experienced accounting professionals with real industry expertise, backed by real-world case studies, live projects, and hands-on software practice throughout the program.",
  },
  {
    question:
      "What makes Professional Skill Campus Malappuram's Accounting Course unique?",
    answer:
      "The course blends traditional accounting fundamentals with AI-integrated tools and modern analytics like Power BI, giving you a comprehensive, future-ready skill set that goes beyond what most accounting institutes in Malappuram offer.",
  },
  {
    question: "Is the course conducted entirely offline?",
    answer:
      "Yes, this Accounting & Taxation program runs entirely offline over 4 months with an intake of 30 students, giving you direct, hands-on classroom training and mentorship.",
  },
];

function AccountingFAQItem({
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
      <SketchFrame rx={12} />

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

export default function AccountingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Frequently Asked Questions</h2>

      <div className={layout.list}>
        {faqs.map((faq, index) => (
          <AccountingFAQItem
            key={faq.question}
            {...faq}
            open={openIndex === index}
            onToggle={() =>
              setOpenIndex((current) => (current === index ? null : index))
            }
          />
        ))}
      </div>
    </section>
  );
}
