import SketchFrame from "./SketchFrame";
import styles from "./WhyChooseUs.module.css";

function BriefcaseIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="7" width="18" height="12" rx="2" stroke="#ffffff" strokeWidth="1.8" />
      <path d="M8 7V5.5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2V7" stroke="#ffffff" strokeWidth="1.8" />
      <path d="M3 12H21" stroke="#ffffff" strokeWidth="1.8" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="#ffffff" strokeWidth="1.8" />
      <ellipse cx="12" cy="12" rx="4" ry="9" stroke="#ffffff" strokeWidth="1.8" />
      <path d="M3 12H21" stroke="#ffffff" strokeWidth="1.8" />
    </svg>
  );
}

function MentorIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="#ffffff" strokeWidth="1.8" />
      <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" stroke="#ffffff" strokeWidth="1.8" />
      <path d="M12 4L12.9 6.1L15 6.4L13.5 7.9L13.9 10L12 9L10.1 10L10.5 7.9L9 6.4L11.1 6.1Z" fill="#ffffff" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 6c-2-1.5-5-1.8-8-1V17c3-.8 6-.5 8 1c2-1.5 5-1.8 8-1V5c-3-.8-6-.5-8 1Z"
        stroke="#ffffff"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M12 6V18" stroke="#ffffff" strokeWidth="1.8" />
    </svg>
  );
}

function HandshakeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2 11L6 7l3 2l3-2l3 2l4-2l2 2l-5 6l-2-1.5l-2 2l-3-2l-2 1.5Z"
        stroke="#ffffff"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const reasons = [
  {
    title: "Job-Oriented Courses",
    description:
      "Our courses emphasize practical application over theory alone in order to prepare students for the workforce from day one.",
    icon: <BriefcaseIcon />,
  },
  {
    title: "Global Education System",
    description:
      "Learn about global learning standards, resources, and approaches that align with the demands of the global industry.",
    icon: <GlobeIcon />,
  },
  {
    title: "Expert Mentors",
    description:
      "Learn from experienced mentors and industry professionals who guide, support, and inspire your career journey.",
    icon: <MentorIcon />,
  },
  {
    title: "Practical, Real-World Skills",
    description:
      "We emphasize hands-on training, live projects, and real-time case studies to ensure strong skill mastery.",
    icon: <BookIcon />,
  },
  {
    title: "Your Trusted Learning Partner in Kerala",
    description:
      "Whether you're a student, job seeker, or working professional, we are with you at every step of your journey in Kochi and around Kerala.",
    icon: <HandshakeIcon />,
  },
];

export default function WhyChooseUs() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.label}>Our Advantage</p>
        <h2 className={styles.heading}>
          Why Choose Professional Skill Campus, Kochi?
        </h2>
      </div>

      <div className={styles.grid}>
        {reasons.map((reason, index) => (
          <div
            key={reason.title}
            className={`${styles.card} ${
              index % 2 === 0 ? styles.navyAccent : styles.redAccent
            }`}
          >
            <SketchFrame rx={16} />

            <span className={styles.iconCircle}>{reason.icon}</span>
            <div className={styles.cardText}>
              <h3 className={styles.cardTitle}>{reason.title}</h3>
              <span className={styles.underline}></span>
              <p className={styles.cardDescription}>{reason.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
