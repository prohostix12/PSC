import styles from "./AboutUs.module.css";

export default function AboutUs() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <p className={styles.label}>About us</p>
          <h2 className={styles.heading}>Our promise is your growth!</h2>
        </div>

        <div className={styles.right}>
          <p className={styles.paragraph}>
            Professional Skill Campus is a home where skills can be
            enhanced, dream jobs can be achieved, and a better career can be
            built. Learning here goes beyond classrooms; it builds real
            confidence and practical ability. With the right mentorship,
            hands-on training, and continuous support, students discover
            their strengths and prepare themselves for meaningful and
            successful careers.
          </p>

          <a href="#" className={styles.cta}>
            Know more
          </a>
        </div>
      </div>
    </section>
  );
}
