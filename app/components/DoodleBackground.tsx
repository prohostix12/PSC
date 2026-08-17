import { useId } from "react";
import styles from "./DoodleBackground.module.css";

/**
 * Shared scattered line-art background used across sections that should
 * match the hero section's backdrop. Renders its own unique pattern id
 * so multiple instances can appear on the same page.
 */
export default function DoodleBackground({
  className,
}: {
  className?: string;
}) {
  const patternId = `doodlePattern-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <svg
      className={`${styles.doodleBg} ${className ?? ""}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={patternId}
          width="240"
          height="240"
          patternUnits="userSpaceOnUse"
        >
          <g
            fill="none"
            stroke="#0f1b3d"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.22"
          >
            {/* star */}
            <path
              transform="translate(15 25)"
              d="M10 0L12 7L19 8L13.5 12.5L15 19.5L10 15.5L5 19.5L6.5 12.5L1 8L8 7Z"
            />
            {/* open book */}
            <path
              transform="translate(110 30) rotate(-6)"
              d="M0 3C3 1 7 1 10 3V15C7 13 3 13 0 15V3ZM20 3C17 1 13 1 10 3V15C13 13 17 13 20 15V3Z"
            />
            {/* globe */}
            <g transform="translate(190 110)">
              <circle cx="0" cy="0" r="10" />
              <ellipse cx="0" cy="0" rx="4" ry="10" />
              <path d="M-10 0H10" />
            </g>
            {/* bulb */}
            <g transform="translate(50 120)">
              <circle cx="0" cy="0" r="7" />
              <path d="M-3 7H3M-2 10H2" />
              <path d="M0 -10V-13M-7 -7L-9 -9M7 -7L9 -9" />
            </g>
            {/* pencil */}
            <path
              transform="translate(95 200) rotate(35)"
              d="M0 0H16V6H0ZM16 0L21 3L16 6Z"
            />
            {/* paperclip */}
            <path
              transform="translate(15 190)"
              d="M2 4V16C2 19 5 21 8 21C11 21 14 19 14 16V6C14 4 12 2 10 2C8 2 6 4 6 6V15C6 16 7 17 8 17C9 17 10 16 10 15V6"
            />
            {/* rocket */}
            <g transform="translate(210 40) rotate(20)">
              <path d="M0 -14C5 -10 5 4 0 10C-5 4 -5 -10 0 -14Z" />
              <path d="M-3 6L-8 12M3 6L8 12" />
              <circle cx="0" cy="-6" r="2" />
            </g>
            {/* atom */}
            <g transform="translate(150 190)">
              <ellipse cx="0" cy="0" rx="12" ry="5" />
              <ellipse cx="0" cy="0" rx="12" ry="5" transform="rotate(60)" />
              <ellipse cx="0" cy="0" rx="12" ry="5" transform="rotate(120)" />
              <circle cx="0" cy="0" r="1.6" fill="#0f1b3d" stroke="none" />
            </g>
            {/* clock */}
            <g transform="translate(215 190)">
              <circle cx="0" cy="0" r="9" />
              <path d="M0 -5V0L3 3" />
            </g>
            {/* ruler */}
            <path
              transform="translate(40 55) rotate(-30)"
              d="M0 0H26V8H0ZM6 0V3M12 0V5M18 0V3"
            />
            {/* magnifier */}
            <g transform="translate(100 100)">
              <circle cx="0" cy="0" r="7" />
              <path d="M5 5L11 11" />
            </g>
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
