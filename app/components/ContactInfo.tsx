import SketchFrame from "./SketchFrame";
import styles from "./ContactInfo.module.css";

function PinIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"
        stroke="#ffffff"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="10" r="2.6" stroke="#ffffff" strokeWidth="1.8" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 5c0-1 .8-2 1.8-2h2.4c.5 0 1 .3 1.1.8l1 3.3c.1.4 0 .9-.3 1.2l-1.6 1.6a12 12 0 0 0 5.7 5.7l1.6-1.6c.3-.3.8-.4 1.2-.3l3.3 1c.5.1.8.6.8 1.1v2.4c0 1-.9 1.8-1.9 1.8C10.7 20 4 13.3 4 5Z"
        stroke="#ffffff"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" stroke="#ffffff" strokeWidth="1.8" />
      <path d="M3.5 6L12 13L20.5 6" stroke="#ffffff" strokeWidth="1.8" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="#ffffff" strokeWidth="1.8" />
      <path d="M12 7V12L16 14.5" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

const cards = [
  {
    title: "Reach us",
    lines: ["Malappuram, Kerala, India"],
    icon: <PinIcon />,
    accent: "teal",
  },
  {
    title: "Call us",
    lines: ["+91 00000 00000", "+91 00000 00001"],
    icon: <PhoneIcon />,
    accent: "navy",
  },
  {
    title: "Email us",
    lines: ["info@example.com"],
    icon: <MailIcon />,
    accent: "navy",
  },
  {
    title: "Office Open at",
    lines: ["Mon–Sat: 09:00 AM – 5:30 PM", "Sunday Holiday"],
    icon: <ClockIcon />,
    accent: "navy",
  },
];

export default function ContactInfo() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Contact Us</h2>

      <div className={styles.grid}>
        {cards.map((card) => (
          <div key={card.title} className={styles.card}>
            <SketchFrame rx={20} />

            <span
              className={`${styles.iconBox} ${
                card.accent === "teal" ? styles.tealIcon : styles.navyIcon
              }`}
            >
              {card.icon}
            </span>

            <p className={styles.title}>{card.title}</p>
            <div className={styles.lines}>
              {card.lines.map((line) => (
                <p key={line} className={styles.line}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
