import styles from "./SuccessStoriesHero.module.css";

export default function SuccessStoriesHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Success Stories</p>
        <h1 className={styles.heading}>Real Students, Real Growth</h1>
        <p className={styles.subheading}>
          From classrooms to careers — see how learners at Professional
          Skill Campus turned hands-on training into real job offers,
          promotions, and new businesses.
        </p>
      </div>
    </section>
  );
}
