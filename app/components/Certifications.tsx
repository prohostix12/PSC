import SketchFrame from "./SketchFrame";
import styles from "./Certifications.module.css";

const certifications = [
  { name: "Certification 01" },
  { name: "Certification 02" },
  { name: "Certification 03" },
  { name: "Certification 04" },
];

export default function Certifications() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Our Certification</h2>
        <p className={styles.subheading}>
          Our certifications showcase the skills you&rsquo;ve developed
          through practical, hands-on learning. They stand as proof of your
          growth and job-ready expertise.
        </p>
      </div>

      <div className={styles.grid}>
        {certifications.map((cert) => (
          <div className={styles.card} key={cert.name}>
            <SketchFrame />

            <div className={styles.ribbon}>
              <svg width="28" height="34" viewBox="0 0 28 34" fill="none" aria-hidden="true">
                <circle cx="14" cy="12" r="10" stroke="#c8a13a" strokeWidth="1.5" />
                <path
                  d="M8 20L6 32L14 27L22 32L20 20"
                  stroke="#c8a13a"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Certification logo placeholder — swap for your <Image> */}
            <div className={styles.logo}></div>

            <p className={styles.name}>{cert.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
