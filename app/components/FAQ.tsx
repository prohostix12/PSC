"use client";

import { useState } from "react";
import SketchFrame from "./SketchFrame";
import styles from "./FAQ.module.css";

const leftFaqs = [
  {
    question: "What is Professional Skill Campus and what makes it unique?",
    answer:
      "Professional Skill Campus is a training academy focused on turning practical skills into real career outcomes. What makes us different is our hands-on, mentor-led approach — every course is built around live projects, not just theory.",
  },
  {
    question: "What courses does Professional Skill Campus offer?",
    answer:
      "We offer industry-focused diploma and certification programs across digital marketing, business administration, accounting and taxation, and more — each designed around current job-market skills.",
  },
  {
    question: "Do students get real-time practical training?",
    answer:
      "Yes. Every course includes hands-on assignments, live projects, and practical sessions so you're applying what you learn from day one, not just watching lectures.",
  },
  {
    question: "Are the trainers certified and experienced?",
    answer:
      "All our trainers are industry professionals with real-world experience in their fields, so you're learning from people who've actually done the job you're training for.",
  },
  {
    question: "Do you provide placement assistance?",
    answer:
      "Yes, we offer dedicated placement support — including resume guidance, interview preparation, and connections to our hiring partners — to help you land a job after certification.",
  },
];

const rightFaqs = [
  {
    question: "Do you offer certificates for all courses?",
    answer:
      "Yes, every course at Professional Skill Campus comes with a recognized certificate upon successful completion, which you can add to your resume and professional profiles.",
  },
  {
    question: "Are the classes available online and offline?",
    answer:
      "Most of our programs are available in both offline and online formats, so you can choose the mode that fits your schedule and learning style.",
  },
  {
    question: "Who can join Professional Skill Campus?",
    answer:
      "Our courses are open to students, graduates, and working professionals looking to build practical, job-ready skills — no matter your current experience level.",
  },
  {
    question: "Will I get placement support from Professional Skill Campus?",
    answer:
      "Yes. Along with training, we actively support students with career guidance and placement assistance to help you transition into your first role or next opportunity.",
  },
  {
    question: "Do I get a certificate after completion?",
    answer:
      "Yes, you'll receive a recognized certificate of completion once you finish your course, along with any project work you've completed during the program.",
  },
];

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
  const [openKey, setOpenKey] = useState<string | null>(null);

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
          {leftFaqs.map((faq, index) => {
            const key = `left-${index}`;
            return (
              <FAQItem
                key={faq.question}
                {...faq}
                open={openKey === key}
                onToggle={() =>
                  setOpenKey((current) => (current === key ? null : key))
                }
              />
            );
          })}
        </div>
        <div className={styles.column}>
          {rightFaqs.map((faq, index) => {
            const key = `right-${index}`;
            return (
              <FAQItem
                key={faq.question}
                {...faq}
                open={openKey === key}
                onToggle={() =>
                  setOpenKey((current) => (current === key ? null : key))
                }
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
