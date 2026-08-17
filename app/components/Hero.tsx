import styles from "./Hero.module.css";

const features = [
  { title: "Get Skilled", subtitle: "Practical Learning" },
  { title: "Get Certified", subtitle: "Recognized Certification" },
  { title: "Get Hired", subtitle: "Career Growth" },
];

const tickerItems = [
  "Active Community Access",
  "Expert Trainers",
  "Innovative Tools",
  "Structured Approach",
  "Consistent Support",
];

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.rating}>
            <span className={styles.ratingScore}>4.9</span>
            <div className={styles.ratingDetails}>
              <span className={styles.ratingLabel}>Star Rating</span>
              <span className={styles.ratingSource}>Google ★★★★★</span>
            </div>
          </div>

          <p className={styles.eyebrow}>
            Thinking about a future as a professional trainer?
          </p>

          <h1 className={styles.heading}>
            Professional Diploma in Training &amp; Development
          </h1>

          <ul className={styles.features}>
            {features.map((feature) => (
              <li key={feature.title} className={styles.feature}>
                <span className={styles.featureTitle}>{feature.title}</span>
                <span className={styles.featureSubtitle}>
                  {feature.subtitle}
                </span>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <a href="#" className={styles.primaryButton}>
              Enroll Now
            </a>
            <a href="#" className={styles.secondaryButton}>
              Book a Free Consultation
            </a>
          </div>
        </div>

        <div className={styles.media}>
          {/* Hero image placeholder — swap for your <Image> */}
          <div className={styles.mediaPlaceholder}></div>
        </div>
      </div>

      <div className={styles.ticker}>
        <div className={styles.tickerTrack}>
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className={styles.tickerItem}>
              {item}
              <span className={styles.tickerDot}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
