import SketchFrame from "./SketchFrame";
import styles from "./BestSkillInstitute.module.css";

const highlights = ["Career-relevant", "Industry-updated", "Globally recognized"];

const stats = [
  { value: "2+", label: "Golden Years" },
  { value: "10+", label: "Courses" },
  { value: "2,500+", label: "Happy Students" },
  { value: "100%", label: "Satisfaction" },
];

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7.5 5.5L11 9L7.5 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BestSkillInstitute() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.label}>Why Choose Us</p>
        <h2 className={styles.heading}>
          Best Skill Development Institute in Kochi, Kerala
        </h2>
      </div>

      {/* Banner placeholder — swap for your own campus/photo <Image> */}
      <div className={styles.banner}>
        <div className={styles.statsStrip}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.statCard}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.textCol}>
          <p className={styles.paragraph}>
            Professional Skill Campus is a renowned skill-based learning hub
            in Kochi, Kerala, that helps students and professionals develop
            real-world skills and jobs. We equip learners to succeed in
            today&apos;s competitive labor market by providing expert
            guidance, hands-on training, and industry-aligned programs.
          </p>

          <p className={styles.paragraph}>
            Professional Skill Campus takes learning beyond textbooks. We
            prioritize hands-on skill development, career readiness, and
            personal improvement, making us one of Kerala&apos;s most
            reputable skill development academies.
          </p>

          <p className={styles.paragraph}>
            These collaborations ensure that our students are equipped with
            the latest tools, technology, and techniques used in real-world
            professional settings.
          </p>
        </div>

        <aside className={styles.highlightCard}>
          <SketchFrame rx={24} />

          <h3 className={styles.subheading}>
            Industry-relevant and globally recognized learning
          </h3>

          <p className={styles.cardParagraph}>
            Professional Skill Campus collaborates with industry experts,
            professional trainers, and reputable institutions to deliver
            courses such as:
          </p>

          <ul className={styles.highlights}>
            {highlights.map((item) => (
              <li key={item} className={styles.highlightItem}>
                <span className={styles.highlightIcon}>
                  <ArrowIcon />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
