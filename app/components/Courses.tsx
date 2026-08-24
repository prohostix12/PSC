import SketchFrame from "./SketchFrame";
import styles from "./Courses.module.css";

const courses = [
  {
    title: "Gamified AI Integrated Digital Marketing",
    duration: "4 Month",
    mode: "Offline & Online",
    popular: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="5" cy="5" r="2.5" stroke="#ffffff" strokeWidth="1.6" />
        <circle cx="17" cy="5" r="2.5" stroke="#ffffff" strokeWidth="1.6" />
        <circle cx="11" cy="17" r="2.5" stroke="#ffffff" strokeWidth="1.6" />
        <path d="M7 6.5L11 14.5M15 6.5L11 14.5" stroke="#ffffff" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    title: "Business Administration & Hospital Management",
    duration: "6 Month",
    mode: "Offline & Online",
    popular: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="3" y="7" width="16" height="11" rx="2" stroke="#ffffff" strokeWidth="1.6" />
        <path d="M8 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" stroke="#ffffff" strokeWidth="1.6" />
        <path d="M3 12H19" stroke="#ffffff" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    title: "AI integrated Accounting & Taxation",
    duration: "4 Months",
    mode: "Offline",
    popular: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="4" y="2" width="14" height="18" rx="2" stroke="#ffffff" strokeWidth="1.6" />
        <path d="M7 6H15" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M7 10H9M11.5 10H13.5M16 10H16" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M7 14H9M11.5 14H13.5M16 14H16" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Courses() {
  return (
    <section id="courses" className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Our Courses</h2>
        <p className={styles.subheading}>
          Explore industry-ready courses designed to build practical skills
          and prepare you for real career success.
        </p>
      </div>

      <div className={styles.grid}>
        {courses.map((course) => (
          <div className={styles.card} key={course.title}>
            <SketchFrame rx={20} />

            {course.popular && (
              <span className={styles.popularTag}>Popular</span>
            )}

            <span className={styles.iconCircle}>{course.icon}</span>

            <h3 className={styles.title}>{course.title}</h3>

            <div className={styles.meta}>
              <span className={styles.metaItem}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M2 6.5H14M5 1.5V3.5M11 1.5V3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                {course.duration}
              </span>
              <span className={styles.metaItem}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="6" cy="5" r="2.4" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M1.5 14C1.5 11 3.5 9.4 6 9.4C8.5 9.4 10.5 11 10.5 14" stroke="currentColor" strokeWidth="1.4" />
                  <circle cx="12" cy="5.5" r="1.8" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M10.6 9.6C12.6 9.8 14.2 11.2 14.2 14" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                {course.mode}
              </span>
            </div>

            <a href="#" className={styles.cta}>
              Apply now
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
