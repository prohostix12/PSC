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
            Kerala&apos;s First WBL Academy Since 2009
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
          <div className={styles.enquiryCard}>
            <h2 className={styles.enquiryHeading}>Make Your Enquiry</h2>

            <div className={styles.enquiryField}>
              <label htmlFor="enquiry-name" className={styles.enquiryLabel}>
                Name
              </label>
              <input
                id="enquiry-name"
                name="name"
                type="text"
                placeholder="Your full name"
                className={styles.enquiryInput}
              />
            </div>

            <div className={styles.enquiryField}>
              <label htmlFor="enquiry-email" className={styles.enquiryLabel}>
                Email
              </label>
              <input
                id="enquiry-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className={styles.enquiryInput}
              />
            </div>

            <div className={styles.enquiryField}>
              <label htmlFor="enquiry-phone" className={styles.enquiryLabel}>
                Phone Number
              </label>
              <input
                id="enquiry-phone"
                name="phone"
                type="tel"
                placeholder="+91 00000 00000"
                className={styles.enquiryInput}
              />
            </div>

            <div className={styles.enquiryField}>
              <label
                htmlFor="enquiry-preference"
                className={styles.enquiryLabel}
              >
                Preference
              </label>
              <select
                id="enquiry-preference"
                name="preference"
                defaultValue=""
                className={styles.enquirySelect}
              >
                <option value="" disabled>
                  Select a course
                </option>
                <option value="ai-digital-marketing">
                  AI Integrated Digital Marketing
                </option>
                <option value="business-hospital-management">
                  Business Administration &amp; Hospital Management
                </option>
                <option value="other">Other</option>
              </select>
            </div>

            <a href="#" className={styles.enquireButton}>
              Enquire Now
            </a>
          </div>
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
