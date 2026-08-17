import SketchFrame from "./SketchFrame";
import styles from "./MissionVision.module.css";

function EyeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2 12C4 7 8 4.5 12 4.5S20 7 22 12C20 17 16 19.5 12 19.5S4 17 2 12Z"
        stroke="#ffffff"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3.2" stroke="#ffffff" strokeWidth="1.8" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="#ffffff" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="5" stroke="#ffffff" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="1.4" fill="#ffffff" />
    </svg>
  );
}

const cards = [
  {
    title: "Our Vision",
    text: "To become a leading global platform for skill-based learning, bridging the gap between knowledge and employment.",
    icon: <EyeIcon />,
  },
  {
    title: "Our Mission",
    text: "To empower learners with practical, future-ready skills through accessible and impactful education.",
    icon: <TargetIcon />,
  },
];

export default function MissionVision() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.label}>Purpose &amp; Direction</p>
        <h2 className={styles.heading}>What Drives Us Forward</h2>
      </div>

      <div className={styles.panel}>
        <SketchFrame rx={24} />

        {cards.map((card, index) => (
          <div key={card.title} className={styles.column}>
            <span className={styles.iconCircle}>{card.icon}</span>
            <h3 className={styles.title}>{card.title}</h3>
            <p className={styles.text}>{card.text}</p>
            {index === 0 && <span className={styles.divider}></span>}
          </div>
        ))}
      </div>
    </section>
  );
}
