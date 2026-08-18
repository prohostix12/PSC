import SketchFrame from "./SketchFrame";
import styles from "./CourseCTA.module.css";

export default function CourseCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.banner}>
        <SketchFrame rx={24} className={styles.sketch} />

        <h2 className={styles.heading}>Join the Next Batch Now</h2>
        <p className={styles.subtext}>
          Don&apos;t miss out—limited seats available for our upcoming
          session.
        </p>
        <a href="#" className={styles.button}>
          Join Now
        </a>
      </div>
    </section>
  );
}
