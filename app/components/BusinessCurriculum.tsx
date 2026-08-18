"use client";

import { useState } from "react";
import styles from "./CourseCurriculum.module.css";

const tabs = ["Overview", "Curriculum", "Benefits"] as const;

const details = [
  { label: "Duration: 6 months" },
  { label: "Type: Offline / Online" },
  { label: "Intake: 40" },
];

const includes = [
  "Dual certification in Business & Hospital Management",
  "Real-time business and hospital case projects",
  "Industry mentorship & guest expert sessions",
  "Soft skills & personal grooming training",
  "Dedicated placement & internship support",
  "Classroom access at our Malappuram campus",
  "Lifetime access to course resources",
];

const faqs = [
  {
    question: "Can I specialize in both business and healthcare?",
    answer:
      "Yes, the program is designed to give you dual expertise — you graduate with strong foundations in both business administration and hospital management.",
  },
  {
    question: "Is prior healthcare experience required?",
    answer:
      "No. The course starts from core management fundamentals before moving into specialized healthcare administration topics, so no prior experience is needed.",
  },
  {
    question: "Will I get an internship opportunity?",
    answer:
      "Yes, industry exposure and internship support are built into the program to help you apply what you learn in real business and healthcare settings.",
  },
];

const businessHighlights = [
  "Entrepreneurship & Office Management",
  "Operation & HR Management",
  "Sales & Marketing Strategies",
  "Accounting & Financial Management",
  "Digital Marketing & Digital Competency",
  "Soft Skills & Personal Grooming",
  "Real-time business projects & mentorship",
];

const hospitalHighlights = [
  "Hospital Administration & Healthcare Management",
  "HR and Operations in Healthcare",
  "Healthcare Finance & Accounting",
  "Hospital Marketing & Public Relations",
  "Digital Health Systems & Competency",
  "Soft Skills & Leadership Training",
  "Industry Exposure & Internship Support",
];

const benefits = [
  "Dual expertise in business management and healthcare administration",
  "Industry-relevant curriculum with practical exposure",
  "Certification from Professional Skill Campus to boost your professional profile",
  "Networking opportunities with healthcare and corporate professionals",
  "Flexible learning format (Online + Offline support)",
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

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7.25" stroke="#2451e0" strokeWidth="1.5" />
      <path
        d="M5 8.2L7 10.2L11.2 5.8"
        stroke="#2451e0"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OverviewContent() {
  return (
    <div className={styles.overview}>
      <p>
        At <strong>Professional Skill Campus Malappuram</strong>, we prepare
        students to become confident, skilled, and industry ready
        professionals in both the business and healthcare sectors. Our
        programs are designed to provide a strong academic base combined
        with practical exposure, making us a trusted choice for those
        seeking a best business administration course in Malappuram or a
        career focused hospital management course in Malappuram.
      </p>

      <p>
        Through a balanced approach to theory and real world training,
        students develop expertise in entrepreneurship, operations
        management, HR, finance, sales, and modern marketing practices. As a
        growing management training institute in Malappuram, we focus on
        building leadership qualities, communication skills, and job
        oriented knowledge that employers value.
      </p>

      <p>
        Whether you choose classroom learning at our Malappuram campus or
        opt for flexible online sessions, Professional Skill Campus
        supports your journey with structured guidance, mentorship, and
        career focused training. Our goal is simple: to help every learner
        build a strong professional foundation and step confidently into
        opportunities across business and healthcare industries in Kerala
        and beyond.
      </p>
    </div>
  );
}

function CurriculumContent() {
  return (
    <div className={styles.curriculum}>
      <h3 className={styles.curriculumHeading}>Business Administration Course</h3>
      <p className={styles.roleDescription}>
        The Business Administration Course at Professional Skill Campus
        Malappuram is designed for students who want to master modern
        business concepts and develop strong leadership skills. This
        program focuses on real-world applications of entrepreneurship,
        office management, HR management, sales &amp; marketing,
        accounting, finance, and digital marketing.
      </p>

      <p className={styles.roleTitle}>Course Highlights:</p>
      <ul className={styles.accordionList}>
        {businessHighlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h3 className={styles.curriculumHeading}>
        Hospital Management Course in Malappuram
      </h3>
      <p className={styles.roleDescription}>
        Excel in Healthcare Administration &amp; Hospital Operations. The
        Hospital Management Course at Professional Skill Campus Malappuram
        equips you with the expertise to manage hospitals, clinics, and
        healthcare institutions efficiently. Students learn to integrate
        management principles with healthcare operations, focusing on
        patient care, digital systems, and resource management.
      </p>

      <p className={styles.roleTitle}>Course Highlights:</p>
      <ul className={styles.accordionList}>
        {hospitalHighlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function BenefitsContent() {
  return (
    <div className={styles.benefits}>
      <ul className={styles.accordionList}>
        {benefits.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function BusinessCurriculum() {
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

          <div className={styles.includesCard}>
            <h4 className={styles.sidebarHeading}>This Course Includes</h4>
            <ul className={styles.includesList}>
              {includes.map((item) => (
                <li key={item} className={styles.includesItem}>
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
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
