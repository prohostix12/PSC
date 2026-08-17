import SketchFrame from "./SketchFrame";
import styles from "./CareerOutcomes.module.css";

function DigitalMarketingIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <rect x="4" y="7" width="20" height="14" rx="1.5" />
      <path d="M8 25H20" />
      <path d="M14 21V25" />
      <path d="M8 12L12 14L16 11L21 15" />
      <circle cx="27" cy="9" r="4" />
      <path d="M25.5 9L26.5 10L28.7 7.5" />
    </svg>
  );
}

function SocialMediaIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <path d="M4 20C6 12 13 9 17 9C21 9 28 12 30 20" />
      <path d="M11 24C11 21 14 19 17 19C20 19 23 21 23 24" />
      <path d="M13 5L14.5 9M20.5 9L22 5" />
    </svg>
  );
}

function ContentMarketerIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <rect x="5" y="9" width="14" height="10" rx="1.5" />
      <path d="M8 15L12 12L15 14L19 10" />
      <path d="M21 22H30L26 26H21V22Z" />
      <path d="M21 26L24 30" />
    </svg>
  );
}

function PerformanceMarketerIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <circle cx="17" cy="17" r="12" />
      <circle cx="17" cy="17" r="7" />
      <circle cx="17" cy="17" r="1.6" fill="currentColor" stroke="none" />
      <path d="M23 11L27 7" />
    </svg>
  );
}

function WebDeveloperIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <rect x="4" y="6" width="26" height="18" rx="2" />
      <path d="M4 11H30" />
      <path d="M12 16L9 18.5L12 21" />
      <path d="M18 16L21 18.5L18 21" />
    </svg>
  );
}

function ContentCreatorIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <rect x="6" y="12" width="14" height="11" rx="2" />
      <path d="M20 15.5L28 12V23L20 19.5" />
      <circle cx="13" cy="8" r="2.4" />
    </svg>
  );
}

function ContentWriterIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <rect x="7" y="5" width="16" height="24" rx="2" />
      <path d="M11 11H19M11 16H19M11 21H16" />
      <path d="M23 22L29 16L31.5 18.5L25.5 24.5L22.5 25L23 22Z" />
    </svg>
  );
}

function ContentStrategistIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <rect x="6" y="5" width="16" height="24" rx="2" />
      <path d="M10 11H18M10 16H18M10 21H15" />
      <path d="M25 12V26" />
      <path d="M25 12L31 15L25 18" />
    </svg>
  );
}

function CreativeHeadIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <circle cx="17" cy="10" r="4" />
      <path d="M9 26C9 20.5 12.6 17 17 17C21.4 17 25 20.5 25 26" />
      <path d="M17 2L18 5L21 5.5L18.7 7.5L19.3 10.5L17 9L14.7 10.5L15.3 7.5L13 5.5L16 5Z" />
    </svg>
  );
}

function GoogleAdsIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <rect x="4" y="6" width="26" height="20" rx="2" />
      <path d="M9 20V16" />
      <path d="M15 20V13" />
      <path d="M21 20V10" />
      <path d="M27 20V15" />
    </svg>
  );
}

function WooCommerceIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <rect x="4" y="10" width="26" height="17" rx="2" />
      <path d="M11 10V7C11 5 13 3 17 3C21 3 23 5 23 7V10" />
      <path d="M9 16L11 21L14 15L17 21L20 15L23 21L25 16" />
    </svg>
  );
}

function ShopifyIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <path d="M8 10L10 5H24L26 10" />
      <path d="M6 10H28L26 29H8L6 10Z" />
      <path d="M14 10C14 7.5 15.5 5 18 5" />
      <path d="M13 16C14 15 16 15 17 16C18 17 20 17 21 16" />
    </svg>
  );
}

const roles = [
  { title: "Digital Marketing Executive", icon: <DigitalMarketingIcon /> },
  { title: "Social Media Manager", icon: <SocialMediaIcon /> },
  { title: "Content Marketer", icon: <ContentMarketerIcon /> },
  { title: "Performance Marketer", icon: <PerformanceMarketerIcon /> },
  { title: "Web Developer", icon: <WebDeveloperIcon /> },
  { title: "Content Creator", icon: <ContentCreatorIcon /> },
  { title: "Content Writer", icon: <ContentWriterIcon /> },
  { title: "Content Strategist", icon: <ContentStrategistIcon /> },
  { title: "Creative Head/ Director", icon: <CreativeHeadIcon /> },
  { title: "Google Ads Expert", icon: <GoogleAdsIcon /> },
  { title: "WooCommerce Expert", icon: <WooCommerceIcon /> },
  { title: "Shopify Expert", icon: <ShopifyIcon /> },
];

export default function CareerOutcomes() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Career Outcomes</h2>
      <p className={styles.subheading}>
        Your learning journey doesn&apos;t end with a course; it leads to
        strong career outcomes through skills, support, and real-world
        exposure.
      </p>

      <div className={styles.grid}>
        {roles.map((role) => (
          <div key={role.title} className={styles.card}>
            <SketchFrame rx={18} />
            <span className={styles.icon}>{role.icon}</span>
            <p className={styles.title}>{role.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
