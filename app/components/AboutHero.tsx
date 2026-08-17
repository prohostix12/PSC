import styles from "./AboutHero.module.css";

export default function AboutHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>About Us</p>
        <h1 className={styles.heading}>
          Building Skills, Shaping Careers
        </h1>
        <p className={styles.subheading}>
          Get to know Professional Skill Campus — our story, our mission,
          and the promise we make to every student who walks through our
          doors.
        </p>
      </div>
    </section>
  );
}
