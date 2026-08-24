import styles from "./EventsGallery.module.css";

const events = [
  { title: "Annual Tech Fest 2025", tag: "Workshop", tall: true },
  { title: "Graduation Day", tag: "Convocation", tall: false },
  { title: "Guest Lecture Series", tag: "Seminar", tall: false },
  { title: "Placement Drive", tag: "Careers", tall: true },
  { title: "Digital Marketing Bootcamp", tag: "Workshop", tall: false },
  { title: "Campus Open Day", tag: "Community", tall: true },
  { title: "Alumni Meet 2025", tag: "Networking", tall: false },
  { title: "Skill Showcase", tag: "Exhibition", tall: false },
];

function CameraIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M3 9a2 2 0 0 1 2-2h3l1.5-2h7L18 7h3a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"
        stroke="#ffffff"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="14" cy="14.5" r="4.2" stroke="#ffffff" strokeWidth="1.6" />
    </svg>
  );
}

export default function EventsGallery() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.label}>Photo Gallery</p>
        <h2 className={styles.heading}>Life at Professional Skill Campus</h2>
        <p className={styles.subheading}>
          Photos will be added here soon — this is a placeholder gallery
          layout ready for real event images.
        </p>
      </div>

      <div className={styles.grid}>
        {events.map((event) => (
          <div
            key={event.title}
            className={`${styles.card} ${event.tall ? styles.cardTall : ""}`}
          >
            <div className={styles.placeholder}>
              <span className={styles.icon}>
                <CameraIcon />
              </span>
            </div>
            <div className={styles.caption}>
              <span className={styles.tag}>{event.tag}</span>
              <span className={styles.title}>{event.title}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
