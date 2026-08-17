import styles from "./ValueWeCreate.module.css";

function GraduationIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2 8L12 3L22 8L12 13L2 8Z" stroke="#ffffff" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M6 10.5V16C6 17.5 8.5 19 12 19C15.5 19 18 17.5 18 16V10.5" stroke="#ffffff" strokeWidth="1.6" />
      <path d="M22 8V14" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.6" stroke="#ffffff" strokeWidth="1.6" />
      <path d="M4.5 20c0-4 3.4-6.5 7.5-6.5S19.5 16 19.5 20" stroke="#ffffff" strokeWidth="1.6" />
    </svg>
  );
}

function LaptopIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="5" width="16" height="10" rx="1.5" stroke="#ffffff" strokeWidth="1.6" />
      <path d="M2 18.5H22" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function BriefcaseCapIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="9" width="16" height="10" rx="2" stroke="#ffffff" strokeWidth="1.6" />
      <path d="M9 9V7a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v2" stroke="#ffffff" strokeWidth="1.6" />
      <path d="M4 13H20" stroke="#ffffff" strokeWidth="1.6" />
    </svg>
  );
}

const values = [
  {
    title: "Short-Term Skill Based Offline Courses",
    detail: "Business Administration, digital marketing, accounting",
    icon: <GraduationIcon />,
  },
  {
    title: "Short-Term Professional Online Courses",
    detail: "Mentalism, hypnotism etc",
    icon: <PersonIcon />,
  },
  {
    title: "Skill Enhancing Programs",
    detail: "Lifelab session",
    icon: <LaptopIcon />,
  },
  {
    title: "Placements and Internship",
    detail: "Career support from training to your first job offer",
    icon: <BriefcaseCapIcon />,
  },
];

export default function ValueWeCreate() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>The Value We Create</h2>

      <div className={styles.timeline}>
        {values.map((item, index) => (
          <div
            key={item.title}
            className={`${styles.step} ${
              index % 2 === 0 ? styles.stepLeft : styles.stepRight
            }`}
          >
            <div className={styles.content}>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.detail}>{item.detail}</p>
            </div>
            <span className={styles.node}>{item.icon}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
