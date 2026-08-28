import styles from "./Marquee.module.css";

const tickerItems = [
  "Active Community Access",
  "Expert Trainers",
  "Innovative Tools",
  "Structured Approach",
  "Consistent Support",
];

// Scrolling ticker strip placed under the hero section on every page.
export default function Marquee() {
  return (
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
  );
}
