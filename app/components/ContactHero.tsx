import styles from "./ContactHero.module.css";

export default function ContactHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Contact Us</p>
        <h1 className={styles.heading}>We&apos;d Love to Hear From You</h1>
        <p className={styles.subheading}>
          Have a question about a course, admissions, or anything else?
          Reach out and the Professional Skill Campus team will get back to
          you.
        </p>
      </div>
    </section>
  );
}
