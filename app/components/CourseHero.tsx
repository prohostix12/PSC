"use client";

import { useState } from "react";
import styles from "./CourseHero.module.css";
import AdmissionModal from "./AdmissionModal";

type Feature = { title: string; subtitle: string };
type Detail = { label: string; value: string };

const defaultFeatures: Feature[] = [
  { title: "Get Skilled", subtitle: "Hands-on gamified modules" },
  { title: "Get Certified", subtitle: "Industry-recognized certificate" },
  { title: "Get Hired", subtitle: "Dedicated placement support" },
];

const defaultDetails: Detail[] = [
  { label: "Duration", value: "4 Months" },
  { label: "Mode", value: "Offline & Online" },
  { label: "Students Trained", value: "500+" },
];

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

export default function CourseHero({
  badge = "Online Course · Digital Marketing",
  heading = "AI Integrated",
  headingAccent = "Digital Marketing",
  subheading = "India's first gamified, AI-integrated digital marketing program — built to take you from fundamentals to a job-ready portfolio.",
  features = defaultFeatures,
  details = defaultDetails,
}: {
  badge?: string;
  heading?: string;
  headingAccent?: string;
  subheading?: string;
  features?: Feature[];
  details?: Detail[];
}) {
  const [admissionOpen, setAdmissionOpen] = useState(false);
  const [consultOpen, setConsultOpen] = useState(false);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.inner}>
          <div className={styles.content}>
            <span className={styles.badge}>{badge}</span>

            <h1 className={styles.heading}>
              {heading} <span className={styles.accent}>{headingAccent}</span>
            </h1>

            <p className={styles.subheading}>{subheading}</p>

            <ul className={styles.checklist}>
              {features.map((feature) => (
                <li key={feature.title} className={styles.checkItem}>
                  <CheckIcon />
                  <div>
                    <span className={styles.checkTitle}>{feature.title}</span>
                    <span className={styles.checkSubtitle}>{feature.subtitle}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={() => setAdmissionOpen(true)}
              >
                Enroll Now
              </button>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => setConsultOpen(true)}
              >
                Book a Free Consultation
              </button>
            </div>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.ratingCard}>
              <span className={styles.ratingScore}>4.9</span>
              <span className={styles.ratingLabel}>Star Rating</span>
              <span className={styles.ratingSource}>Google ★★★★★</span>
            </div>

            <div className={styles.detailsCard}>
              {details.map((detail) => (
                <div key={detail.label} className={styles.detailRow}>
                  <span className={styles.detailLabel}>{detail.label}</span>
                  <span className={styles.detailValue}>{detail.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AdmissionModal
        open={admissionOpen}
        onClose={() => setAdmissionOpen(false)}
        title="Get Your Admission"
        subheading="Share your details and our admissions team will reach out to you."
        submitLabel="Submit Admission"
        source="Course Page - Get Your Admission"
      />

      <AdmissionModal
        open={consultOpen}
        onClose={() => setConsultOpen(false)}
        title="Make Your Enquiry"
        subheading="Tell us what you need and our team will get in touch with the best guidance for you."
        submitLabel="Submit Enquiry"
        source="Course Page - Make Your Enquiry"
      />
    </>
  );
}
