import DoodleBackground from "./DoodleBackground";
import bg from "./SectionBackground.module.css";
import styles from "./PageBackground.module.css";

/**
 * Single continuous gradient + doodle backdrop rendered once behind every
 * section, so scrolling never shows a seam where one section's background
 * ends and the next begins.
 */
export default function PageBackground() {
  return (
    <div className={`${styles.pageBackground} ${bg.sectionGradient}`}>
      <DoodleBackground />
    </div>
  );
}
