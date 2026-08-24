import SketchFrame from "./SketchFrame";
import styles from "./CareerOutcomes.module.css";

function AccountExecutiveIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <rect x="6" y="10" width="22" height="16" rx="2" />
      <path d="M6 16H28" />
      <path d="M13 10V8C13 6.5 14.2 5 16 5H18C19.8 5 21 6.5 21 8V10" />
      <path d="M17 16V21" />
    </svg>
  );
}

function AccountantIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <rect x="9" y="4" width="16" height="26" rx="2" />
      <path d="M12 9H22" />
      <circle cx="13.5" cy="14" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="17" cy="14" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="20.5" cy="14" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="13.5" cy="18.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="17" cy="18.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="20.5" cy="18.5" r="1.2" fill="currentColor" stroke="none" />
      <path d="M13 23H21" />
    </svg>
  );
}

function AccountAssistantIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <rect x="7" y="5" width="16" height="24" rx="2" />
      <path d="M11 11H19M11 16H19M11 21H16" />
      <path d="M25 22L29 18L31 20L27 24L24 25L25 22Z" />
    </svg>
  );
}

function TaxConsultantIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <rect x="6" y="4" width="16" height="26" rx="2" />
      <path d="M10 22L18 12" />
      <circle cx="11" cy="14" r="2" />
      <circle cx="17" cy="20" r="2" />
      <path d="M24 18C24 15.5 26 13.5 28.5 13.5C31 13.5 33 15.5 33 18C33 20.5 31 22.5 28.5 22.5C26 22.5 24 20.5 24 18Z" />
    </svg>
  );
}

function AuditorIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <rect x="4" y="5" width="16" height="22" rx="2" />
      <path d="M8 11H16M8 16H16" />
      <circle cx="23" cy="21" r="6" />
      <path d="M27.5 25.5L32 30" />
    </svg>
  );
}

function PayrollExecutiveIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <path d="M4 10H30V26H4V10Z" />
      <path d="M4 14H30" />
      <circle cx="10" cy="20" r="2.4" />
      <path d="M22 19H26M22 22H26" />
    </svg>
  );
}

function FinanceExecutiveIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <path d="M5 27V19M13 27V13M21 27V21M29 27V7" />
      <path d="M3 27H31" />
      <path d="M23 10L29 7L31 13" />
    </svg>
  );
}

function AccountsManagerIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <circle cx="13" cy="9" r="4.2" />
      <path d="M5 27C5 21 8.6 17.5 13 17.5C17.4 17.5 21 21 21 27" />
      <rect x="22" y="16" width="9" height="12" rx="1.5" />
      <path d="M24.5 20H28.5M24.5 23H28.5" />
    </svg>
  );
}

function ReceivablesPayablesIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <path d="M4 12H24" />
      <path d="M18 6L24 12L18 18" />
      <path d="M30 22H10" />
      <path d="M16 16L10 22L16 28" />
    </svg>
  );
}

function BusinessAnalystIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="9" />
      <path d="M20.5 20.5L29 29" />
      <path d="M10 15L13 11L16 13L19 8" />
    </svg>
  );
}

const roles = [
  { title: "Account Executive", icon: <AccountExecutiveIcon /> },
  { title: "Junior/senior Accountant", icon: <AccountantIcon /> },
  { title: "Account Assistant", icon: <AccountAssistantIcon /> },
  { title: "Tax Consultant", icon: <TaxConsultantIcon /> },
  { title: "Auditor", icon: <AuditorIcon /> },
  { title: "Payroll Executive", icon: <PayrollExecutiveIcon /> },
  { title: "Finance Executive", icon: <FinanceExecutiveIcon /> },
  { title: "Accounts Manager", icon: <AccountsManagerIcon /> },
  {
    title: "Accounts Receivables And payables Manager",
    icon: <ReceivablesPayablesIcon />,
  },
  { title: "Business Analyst", icon: <BusinessAnalystIcon /> },
];

export default function AccountingCareerOutcomes() {
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
