import styles from "./BlogsHero.module.css";

export default function BlogsHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Blogs</p>
        <h1 className={styles.heading}>Insights &amp; Career Tips</h1>
        <p className={styles.subheading}>
          Practical guides, industry updates, and career advice from the
          Professional Skill Campus team to help you learn smarter and grow
          faster.
        </p>
      </div>
    </section>
  );
}
