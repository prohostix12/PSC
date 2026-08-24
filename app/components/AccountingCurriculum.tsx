"use client";

import { useState } from "react";
import styles from "./CourseCurriculum.module.css";

const tabs = ["Overview", "Curriculum", "Benefits"] as const;

const details = [
  { label: "Duration: 4 months" },
  { label: "Type: Offline" },
  { label: "Intake: 30" },
];

const modules = [
  {
    title: "1. Basic to Advanced Accounting",
    points: [
      "Learn core accounting principles and real-world financial management",
      "Practical exposure to journal entries, ledgers, and balance sheets",
      "Advance-level training with industry use cases",
    ],
  },
  {
    title: "2. Income Tax – Filing and Registration",
    points: [
      "Step-by-step process for IT return filing and PAN/TAN registration",
      "Hands-on training with official portals and documentation practices",
    ],
  },
  {
    title: "3. GST – Filing and Registration",
    points: [
      "Complete understanding of GST rules and compliance",
      "Live filing exercises and GST registration procedures",
    ],
  },
  {
    title: "4. GCC VAT",
    points: [
      "Learn Gulf Cooperation Council (GCC) VAT concepts and application",
      "Understand international taxation and accounting differences",
    ],
  },
  {
    title: "5. Accounting Software (Advanced Level)",
    points: [
      "Tally Prime (Advanced Level) – Accounting, inventory, and payroll management",
      "Zoho Books (Advanced Level) – Cloud-based accounting automation",
      "Odoo ERP – Integrated financial and business process management",
    ],
  },
  {
    title: "6. Analytical Tools (Advanced Level)",
    points: [
      "Microsoft Excel (Advanced) – Financial formulas, pivot tables, dashboards",
      "Power BI – Visual data analysis and business reporting",
    ],
  },
  {
    title: "7. Basic Office Tools",
    points: [
      "Master MS Word, Google Workspace, and AI tools for efficient reporting, documentation, and presentation",
    ],
  },
];

const benefitPoints = [
  {
    lead: "Industry Relevant Curriculum",
    text: "Learn the latest tools including accounting software and cloud based platforms",
  },
  {
    lead: "Practical Training Focus",
    text: "Real world case studies, live projects, and hands on software practice",
  },
  {
    lead: "Expert faculty",
    text: "Learn from experienced accounting professionals with industry expertise",
  },
  {
    lead: "Career Support",
    text: "Job placement assistance and interview preparation",
  },
  {
    lead: "Future Ready Skills",
    text: "Stay ahead with training in accounting and finance automation, and data analytics",
  },
  {
    lead: "Comprehensive Coverage",
    text: "From basic accounting to advanced tax filing, GST, and international VAT",
  },
];

const faqs = [
  {
    question: "Do I need prior accounting knowledge?",
    answer:
      "No. The course covers every aspect from basic accounting principles to advanced financial analytics, so you can start from the fundamentals.",
  },
  {
    question: "Which software tools will I learn?",
    answer:
      "You'll get hands-on practice with Tally Prime, Zoho Books, Odoo, and Power BI, along with AI-powered tools for modern accounting and finance work.",
  },
  {
    question: "Is placement support included?",
    answer:
      "Yes, dedicated placement and internship support is included to help you step confidently into an accounting or finance role.",
  },
];

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="#2451e0"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <circle cx="13" cy="13" r="12" stroke="#ffffff" strokeWidth="1.5" />
      <path d="M10.5 8.5L18 13L10.5 17.5V8.5Z" fill="#ffffff" />
    </svg>
  );
}

function OverviewContent() {
  return (
    <div className={styles.overview}>
      <p>
        Best accounting institute in Malappuram{" "}
        <strong>Professional Skill Campus</strong> Malappuram, offers an
        Offline Accounting Course crafted for students and professionals who
        want to become industry ready accounting experts.
      </p>

      <p>
        This comprehensive program blends theory with practical training and
        covers every aspect from basic accounting principles to advanced
        financial analytics, ensuring complete{" "}
        <span className={styles.highlightText}>skill development</span>.
        Through real world case studies and hands-on practice with Tally
        Prime, Zoho Books, Odoo and Power BI learners gain the confidence to
        manage accounts, file taxes, and analyze data efficiently. Our
        curriculum also introduces{" "}
        <span className={styles.highlightText}>
          AI in accounting and finance
        </span>{" "}
        preparing you for the future of intelligent financial management.
      </p>
    </div>
  );
}

function CurriculumContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={styles.curriculum}>
      <h3 className={styles.curriculumHeading}>Course Highlights:</h3>

      <div className={styles.accordion}>
        {modules.map((module, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={module.title} className={styles.accordionItem}>
              <button
                type="button"
                className={styles.accordionTrigger}
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{module.title}</span>
                <span className={styles.accordionIcon}>
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen && (
                <div className={styles.accordionContent}>
                  <ul className={styles.accordionList}>
                    {module.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BenefitsContent() {
  return (
    <div className={styles.benefits}>
      <h3 className={styles.curriculumHeading}>
        Why Choose Accounting at Professional Skill Campus Malappuram?
      </h3>

      <p>
        In today&apos;s competitive world skilled accountants are in high
        demand across all business sectors. As the best accounting institute
        in Malappuram and one of the best accounting classes in the region,
        our accounting courses in Malappuram help you master both
        traditional and digital accounting techniques, empowering you with
        the tools and confidence to build a successful finance career. What
        Sets Us Apart:
      </p>

      <ul className={styles.accordionList}>
        {benefitPoints.map((point) => (
          <li key={point.lead}>
            <strong>{point.lead}</strong> {point.text}
          </li>
        ))}
      </ul>

      <p>
        Whether you&apos;re a fresh graduate, working professional, or
        business owner, our course equips you with the complete skill set
        needed to excel in modern accounting roles and adapt to the evolving
        digital finance landscape. Choose the best accounting institute in
        Malappuram for your career transformation.
      </p>
    </div>
  );
}

export default function AccountingCurriculum() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>(
    "Overview"
  );

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>What you will learn?</h2>

      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={styles.tabs}>
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`${styles.tab} ${
                  activeTab === tab ? styles.tabActive : ""
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className={styles.panel}>
            {activeTab === "Overview" && <OverviewContent />}
            {activeTab === "Curriculum" && <CurriculumContent />}
            {activeTab === "Benefits" && <BenefitsContent />}
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.videoCard}>
            <span className={styles.playButton}>
              <PlayIcon />
            </span>
          </div>

          <div className={styles.detailsCard}>
            {details.map((detail) => (
              <div key={detail.label} className={styles.detailRow}>
                <ArrowIcon />
                <span>{detail.label}</span>
              </div>
            ))}

            <a href="#" className={styles.consultButton}>
              Book a Free Consultation
            </a>
            <a href="#" className={styles.brochureButton}>
              Download Brochure
            </a>
          </div>

          <div className={styles.faqCard}>
            <h4 className={styles.sidebarHeading}>Quick Questions</h4>
            <div className={styles.faqList}>
              {faqs.map((faq) => (
                <div key={faq.question} className={styles.faqItem}>
                  <p className={styles.faqQuestion}>{faq.question}</p>
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
