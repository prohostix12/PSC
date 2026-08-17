import { useId } from "react";
import styles from "./SketchFrame.module.css";

/**
 * Hand-drawn wavy card border used across white cards on the site
 * (certifications, courses, etc.) to keep the pencil-sketch look consistent.
 */
export default function SketchFrame({
  className,
  rx = 22,
}: {
  className?: string;
  rx?: number;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const filterIdA = `sketchFrameA-${uid}`;
  const filterIdB = `sketchFrameB-${uid}`;

  return (
    <svg
      className={`${styles.sketchFrame} ${className ?? ""}`}
      viewBox="0 0 300 340"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <filter id={filterIdA} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008"
            numOctaves="2"
            seed="4"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" />
        </filter>
        <filter id={filterIdB} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01"
            numOctaves="2"
            seed="11"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" />
        </filter>
      </defs>
      <rect
        x="6"
        y="6"
        width="288"
        height="328"
        rx={rx}
        stroke="#0f1b3d"
        strokeWidth="1.6"
        opacity="0.85"
        filter={`url(#${filterIdA})`}
      />
      <rect
        x="6"
        y="6"
        width="288"
        height="328"
        rx={rx}
        stroke="#0f1b3d"
        strokeWidth="1.2"
        opacity="0.55"
        filter={`url(#${filterIdB})`}
      />
    </svg>
  );
}
