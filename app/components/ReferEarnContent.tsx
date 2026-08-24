import SketchFrame from "./SketchFrame";
import styles from "./ReferEarnContent.module.css";

const steps = [
  {
    step: "1",
    title: "Share Your Link",
    text: "Get your unique referral link and share it with a friend who's thinking about upskilling.",
  },
  {
    step: "2",
    title: "They Enroll",
    text: "Your friend signs up for any course at Professional Skill Campus using your referral link.",
  },
  {
    step: "3",
    title: "You Both Earn",
    text: "Once they enroll, you get rewarded and they receive an exclusive discount on their course fee.",
  },
];

export default function ReferEarnContent() {
  return (
    <section className={styles.section}>
      <div className={styles.steps}>
        {steps.map((item) => (
          <div key={item.step} className={styles.stepCard}>
            <SketchFrame rx={18} />
            <span className={styles.stepNumber}>{item.step}</span>
            <h3 className={styles.stepTitle}>{item.title}</h3>
            <p className={styles.stepText}>{item.text}</p>
          </div>
        ))}
      </div>

      <div className={styles.banner}>
        <SketchFrame rx={24} className={styles.sketch} />

        <h2 className={styles.bannerHeading}>
          Earn Rewards for Every Friend You Refer
        </h2>
        <p className={styles.bannerText}>
          No limit on referrals — the more friends you bring, the more you
          earn.
        </p>
        <a href="#" className={styles.bannerButton}>
          Refer Now
        </a>
      </div>
    </section>
  );
}
