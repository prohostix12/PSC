import styles from "./EventsHero.module.css";

export default function EventsHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Events</p>
        <h1 className={styles.heading}>Moments Worth Remembering</h1>
        <p className={styles.subheading}>
          A look back at workshops, graduation days, guest sessions, and
          milestones from the Professional Skill Campus community.
        </p>
      </div>
    </section>
  );
}
