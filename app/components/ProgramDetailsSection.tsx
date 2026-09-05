"use client";

import { useState } from "react";
import type { ProgramDetails } from "../lib/programUtils";
import AdmissionModal from "./AdmissionModal";
import CareerOutcomes from "./CareerOutcomes";
import styles from "./ProgramDetailsSection.module.css";

type Props = {
  details?: ProgramDetails;
  duration: string;
  category: string;
  programName: string;
};

const tabs = ["Overview", "Curriculum", "Benefits"] as const;

const fallbackDetails: ProgramDetails = {
  overview: "",
  curriculumHeading: "Complete Course Module",
  curriculumModules: [],
  benefitsHeading: "",
  benefitsPara: "",
  benefitsItems: [],
  intakeCount: "",
  brochureUrl: "",
  courseIncludes: [],
  quickQuestions: [],
  careerOutcomesPara: "",
  careerOutcomesLogos: [],
};

export default function ProgramDetailsSection({
  details,
  duration,
  category,
  programName,
}: Props) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Overview");
  const [openModule, setOpenModule] = useState<number | null>(0);
  const [consultOpen, setConsultOpen] = useState(false);
  const content: ProgramDetails = {
    ...fallbackDetails,
    ...details,
    curriculumModules: details?.curriculumModules || [],
    benefitsItems: details?.benefitsItems || [],
    courseIncludes: details?.courseIncludes || [],
    quickQuestions: details?.quickQuestions || [],
    careerOutcomesLogos: details?.careerOutcomesLogos || [],
  };
  const overviewParagraphs = content.overview.split(/\n\s*\n/).filter(Boolean);

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
                className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className={styles.panel}>
            {activeTab === "Overview" && (
              <div className={styles.copy}>
                {overviewParagraphs.length > 0 ? (
                  overviewParagraphs.map((paragraph, index) => (
                    <p key={`${paragraph.slice(0, 20)}-${index}`}>{paragraph}</p>
                  ))
                ) : (
                  <p className={styles.empty}>Overview details will be added soon.</p>
                )}
              </div>
            )}

            {activeTab === "Curriculum" && (
              <div className={styles.curriculum}>
                <h3>{content.curriculumHeading || "Complete Course Module"}</h3>
                {content.curriculumModules.length > 0 ? (
                  <div className={styles.accordion}>
                    {content.curriculumModules.map((module, index) => {
                      const isOpen = openModule === index;
                      return (
                        <div className={styles.module} key={`${module.heading}-${index}`}>
                          <button
                            type="button"
                            className={styles.moduleTrigger}
                            onClick={() => setOpenModule(isOpen ? null : index)}
                            aria-expanded={isOpen}
                          >
                            <span>{module.heading}</span>
                            <span className={styles.icon}>{isOpen ? "−" : "+"}</span>
                          </button>
                          {isOpen && <p className={styles.modulePara}>{module.para}</p>}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className={styles.empty}>Curriculum modules will be added soon.</p>
                )}
              </div>
            )}

            {activeTab === "Benefits" && (
              <div className={styles.benefits}>
                {content.benefitsItems.length > 0 ? (
                  content.benefitsItems.map((benefit, index) => (
                    <article className={styles.benefitItem} key={`${benefit.heading}-${index}`}>
                      <h3>{benefit.heading}</h3>
                      <p>{benefit.para}</p>
                    </article>
                  ))
                ) : content.benefitsHeading || content.benefitsPara ? (
                  <article className={styles.benefitItem}>
                    <h3>{content.benefitsHeading}</h3>
                    <p>{content.benefitsPara}</p>
                  </article>
                ) : (
                  <p className={styles.empty}>Benefits details will be added soon.</p>
                )}
              </div>
            )}
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.videoCard} aria-hidden="true">
            <span className={styles.playButton}>▷</span>
          </div>

          <div className={styles.detailsCard}>
            <div className={styles.detailRow}>→ <span>Duration: {duration || "4 months"}</span></div>
            <div className={styles.detailRow}>→ <span>Type: {category || "Offline / Online"}</span></div>
            <div className={styles.detailRow}>→ <span>Intake: {content.intakeCount || "30"}</span></div>
            <button type="button" className={styles.consultButton} onClick={() => setConsultOpen(true)}>
              Book a Free Consultation
            </button>
            {content.brochureUrl ? (
              <a className={styles.brochureButton} href={content.brochureUrl} download={`${programName}-brochure`}>
                Download Brochure
              </a>
            ) : (
              <span className={styles.brochureButton}>Download Brochure</span>
            )}
          </div>

          <div className={styles.includesCard}>
            <h4 className={styles.sidebarHeading}>This Course Includes</h4>
            <ul className={styles.includesList}>
              {content.courseIncludes.length > 0 ? content.courseIncludes.map((item, index) => (
                <li key={`${item}-${index}`} className={styles.includesItem}>✓ <span>{item}</span></li>
              )) : <li className={styles.empty}>Course inclusions will be added soon.</li>}
            </ul>
          </div>

          <div className={styles.faqCard}>
            <h4 className={styles.sidebarHeading}>Quick Questions</h4>
            <div className={styles.faqList}>
              {content.quickQuestions.length > 0 ? content.quickQuestions.map((question, index) => (
                <div className={styles.faqItem} key={`${question.heading}-${index}`}>
                  <p className={styles.faqQuestion}>{question.heading}</p>
                  <p className={styles.faqAnswer}>{question.para}</p>
                </div>
              )) : <p className={styles.empty}>Questions will be added soon.</p>}
            </div>
          </div>

        </aside>
      </div>

      <CareerOutcomes
        selectedTitles={content.careerOutcomesLogos}
        paragraph={
          content.careerOutcomesPara ||
          "Your learning journey doesn't end with a course; it leads to strong career outcomes through skills, support, and real-world exposure."
        }
      />

      <AdmissionModal
        open={consultOpen}
        onClose={() => setConsultOpen(false)}
        title="Make Your Enquiry"
        subheading="Tell us what you need and our team will get in touch with the best guidance for you."
        submitLabel="Submit Enquiry"
        source="Course Page - Make Your Enquiry"
        defaultPreference={`${category} - ${programName}`}
      />
    </section>
  );
}
