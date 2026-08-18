"use client";

import { useState } from "react";
import SketchFrame from "./SketchFrame";
import styles from "./CourseFAQ.module.css";

const faqs = [
  {
    question: "What is digital marketing?",
    answer:
      "Digital marketing is the promotion of products, services, or brands through digital channels such as search engines, social media platforms, websites, email, and mobile applications. It encompasses various strategies, including SEO, social media marketing, content marketing, email marketing, PPC advertising, and analytics. At Professional Skill Campus — the Best Digital Marketing Institute in Malappuram — we integrate AI-powered tools with traditional digital marketing techniques to prepare students for the modern digital landscape.",
  },
  {
    question: "Which is the best digital marketing institute in Kerala?",
    answer:
      "Professional Skill Campus is widely recognized as one of the best digital marketing institutes in Kerala, thanks to its AI-integrated curriculum, hands-on live projects, expert mentorship, and consistent placement track record for students across Malappuram and beyond.",
  },
  {
    question: "What are the course fees for digital marketing training?",
    answer:
      "Course fees depend on the mode you choose — offline or online — and any ongoing batch offers. Reach out to our admissions team using the consultation form or the details in the sidebar for the latest fee structure and available installment options.",
  },
  {
    question: "How long is the digital marketing course duration?",
    answer:
      "The AI Integrated Digital Marketing program runs for 4 months, structured to deliver maximum career impact through live projects, real campaign exposure, and expert mentorship within that timeframe.",
  },
  {
    question: "Do you provide placement assistance after the course?",
    answer:
      "Yes. Every student gets dedicated placement support — including resume guidance, interview preparation, and introductions to our hiring partners — to help you step confidently into your first digital marketing role.",
  },
  {
    question: "What qualifications are needed to join a digital marketing course?",
    answer:
      "There's no strict qualification barrier. Students, graduates, career switchers, and working professionals can all join — the course starts from the fundamentals with Life Lab sessions before moving into advanced skills.",
  },
  {
    question: "What are the career opportunities after completing this course?",
    answer:
      "Graduates go on to roles such as SEO Specialist, Social Media Manager, Google Ads Specialist, Content Marketing Specialist, Digital Marketing Executive, or even start freelancing and launch their own agency.",
  },
  {
    question: "What is the salary after completing a digital marketing course?",
    answer:
      "Starting salaries typically range from ₹15,000 to ₹35,000 per month for freshers in Kerala, growing to ₹40,000–₹80,000 per month with 1–2 years of experience. Freelancers and agency owners often earn significantly more.",
  },
  {
    question: "How does AI integration work in your digital marketing course?",
    answer:
      "You'll get hands-on with tools like ChatGPT, Google Gemini, and Jasper AI for content and ad copy, along with AI-powered SEO, video creation, and marketing automation tools — learning practical workflows that combine AI with real strategy.",
  },
  {
    question: "Digital marketing course suitable for beginners with no experience?",
    answer:
      "Absolutely. The program is designed to take complete beginners from the basics — including computer fundamentals in our Life Lab sessions — all the way to a job-ready, AI-powered digital marketing skill set.",
  },
];

function CourseFAQItem({
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

const midpoint = Math.ceil(faqs.length / 2);
const leftFaqs = faqs.slice(0, midpoint);
const rightFaqs = faqs.slice(midpoint);

export default function CourseFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Frequently Asked Questions</h2>

      <div className={styles.grid}>
        <div className={styles.column}>
          {leftFaqs.map((faq, index) => (
            <CourseFAQItem
              key={faq.question}
              {...faq}
              open={openIndex === index}
              onToggle={() =>
                setOpenIndex((current) => (current === index ? null : index))
              }
            />
          ))}
        </div>

        <div className={styles.column}>
          {rightFaqs.map((faq, index) => {
            const globalIndex = midpoint + index;
            return (
              <CourseFAQItem
                key={faq.question}
                {...faq}
                open={openIndex === globalIndex}
                onToggle={() =>
                  setOpenIndex((current) =>
                    current === globalIndex ? null : globalIndex
                  )
                }
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
