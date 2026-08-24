"use client";

import { useState } from "react";
import SketchFrame from "./SketchFrame";
import styles from "./CourseFAQ.module.css";
import layout from "./BusinessFAQ.module.css";

const faqs = [
  {
    question:
      "What makes Professional Skill Campus Malappuram different from other institutes?",
    answer:
      "Professional Skill Campus combines a dual-track curriculum covering both business administration and hospital management, backed by experienced faculty, AI-integrated learning, real-time projects, and dedicated placement support — giving students an edge that single-track institutes in Malappuram can't match.",
  },
  {
    question:
      "Who can join the Business Administration course at Professional Skill Campus Malappuram?",
    answer:
      "The program is open to students, graduates, career switchers, and working professionals looking to build a career in business management or healthcare administration — there's no strict qualification barrier, and the course starts from core fundamentals.",
  },
  {
    question:
      "What is the duration of the Best Business Administration courses in Malappuram?",
    answer:
      "The Business Administration & Hospital Management program at Professional Skill Campus runs for 6 months, available in both offline and online formats, with an intake of 40 students per batch.",
  },
  {
    question:
      "Does Professional Skill Campus Malappuram offer placement assistance?",
    answer:
      "Yes. Every student receives dedicated placement and internship support, along with guidance from expert mentors and access to real-time business and hospital projects to build a strong, job-ready profile.",
  },
  {
    question: "Is there any soft skill or personal grooming training included?",
    answer:
      "Yes, soft skills and personal grooming are core parts of the curriculum in both the Business Administration and Hospital Management tracks, helping students build the communication and professional presence employers expect.",
  },
];

function BusinessFAQItem({
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

export default function BusinessFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Frequently Asked Questions</h2>

      <div className={layout.list}>
        {faqs.map((faq, index) => (
          <BusinessFAQItem
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
