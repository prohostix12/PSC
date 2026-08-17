import ScrollReveal from "./ScrollReveal";
import styles from "./WhyUs.module.css";

export default function WhyUs() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <p className={styles.label}>Why Professional Skill Campus</p>
          <h2 className={styles.heading}>
            Where Every Skill Leads to Success
          </h2>
        </div>

        <div className={styles.right}>
          <p className={styles.paragraph}>
            We believe that real success begins with real skills. Our
            industry-focused training, hands-on learning experience, and
            expert mentors ensure that every student becomes job ready with
            confidence. From practical projects to career support and
            opportunities, we help you grow beyond the classroom.
            Professional Skill Campus isn&rsquo;t just a place to learn;
            it&rsquo;s the place where your skills transform into success.
          </p>

          <div className={styles.highlights}>
            <ScrollReveal className={styles.highlightCardWrap}>
              <div className={`${styles.highlightCard} ${styles.dark}`}>
                Industry Focused, Practical Training
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150} className={styles.highlightCardWrap}>
              <div className={`${styles.highlightCard} ${styles.accent}`}>
                Transform Skills Into Career Success
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
