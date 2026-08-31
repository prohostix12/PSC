import Image from "next/image";
import bg from "./SectionBackground.module.css";
import styles from "./PageBackground.module.css";

// Scattered across the fixed backdrop with deliberate spacing so they read
// as a repeating doodle pattern rather than clustering in one spot.
const doodlePositions: React.CSSProperties[] = [
  { top: "6%", left: "5%", transform: "rotate(-8deg)" },
  { top: "4%", left: "48%", transform: "rotate(6deg)" },
  { top: "8%", right: "6%", transform: "rotate(-4deg)" },
  { top: "38%", left: "18%", transform: "rotate(10deg)" },
  { top: "42%", right: "12%", transform: "rotate(-10deg)" },
  { top: "70%", left: "6%", transform: "rotate(5deg)" },
  { top: "68%", left: "52%", transform: "rotate(-6deg)" },
  { top: "78%", right: "8%", transform: "rotate(8deg)" },
];

/**
 * Single continuous gradient backdrop rendered once behind every section,
 * so scrolling never shows a seam where one section's background ends and
 * the next begins. The logo doodle is repeated at small size across the
 * backdrop with a screen blend mode — its glow shows through while the
 * black behind it dissolves into the page background.
 */
export default function PageBackground() {
  return (
    <div className={`${styles.pageBackground} ${bg.sectionGradient}`}>
      {doodlePositions.map((position, i) => (
        <Image
          key={i}
          src="/logo-doodle.png"
          alt=""
          width={200}
          height={240}
          className={styles.doodle}
          style={position}
          priority={false}
        />
      ))}
    </div>
  );
}
