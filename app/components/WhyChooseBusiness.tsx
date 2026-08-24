import SketchFrame from "./SketchFrame";
import styles from "./WhyChooseBusiness.module.css";

const reasons = [
  "Experienced faculty from business & healthcare industries",
  "AI-integrated learning with practical exposure",
  "Updated curriculum with digital competency",
  "Focus on entrepreneurship, soft skills, and personal grooming",
  "Internship & placement assistance",
  "Flexible Online and Offline learning options",
];

function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M11.5 2.5L17.5 8.5L14.5 11.5L13 10L9 14L6 17L9 11L7.5 9.5L11.5 5.5L10 4L11.5 2.5Z"
        stroke="#0f9d78"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 16L7.5 12.5"
        stroke="#0f9d78"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function WhyChooseBusiness() {
  return (
    <section className={styles.section}>
      <div className={styles.panel}>
        <SketchFrame rx={24} />

        <h2 className={styles.heading}>
          Why Choose Professional Skill Campus?
        </h2>

        <ul className={styles.list}>
          {reasons.map((reason) => (
            <li key={reason} className={styles.item}>
              <span className={styles.icon}>
                <PinIcon />
              </span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
