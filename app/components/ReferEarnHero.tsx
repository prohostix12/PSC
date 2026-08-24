import styles from "./ReferEarnHero.module.css";

export default function ReferEarnHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Refer &amp; Earn</p>
        <h1 className={styles.heading}>
          Refer Your Friend &amp; Earn
        </h1>
        <p className={styles.subheading}>
          Love your experience at Professional Skill Campus? Share it with a
          friend — when they enroll, you both get rewarded.
        </p>
      </div>
    </section>
  );
}
