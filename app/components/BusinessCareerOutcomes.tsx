import SketchFrame from "./SketchFrame";
import styles from "./CareerOutcomes.module.css";

function BusinessDevelopmentIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <rect x="6" y="14" width="22" height="14" rx="2" />
      <path d="M6 20H28" />
      <path d="M13 14V11C13 9.5 14.2 8 16 8H18C19.8 8 21 9.5 21 11V14" />
      <path d="M6 8L12 5L18 9L26 4" />
      <path d="M20 4H26V10" />
    </svg>
  );
}

function OperationExecutiveIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <rect x="9" y="6" width="14" height="22" rx="2" />
      <path d="M13 12H19M13 16H19M13 20H16" />
      <circle cx="24" cy="24" r="5" />
      <path d="M24 21.5V22.5M24 25.5V26.5M21.5 24H22.5M25.5 24H26.5" />
    </svg>
  );
}

function HrExecutiveIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <circle cx="13" cy="10" r="4.5" />
      <path d="M5 27C5 21 8.6 17.5 13 17.5C17.4 17.5 21 21 21 27" />
      <circle cx="26" cy="12" r="3" />
      <path d="M20 27C20 23 22.7 20.5 26 20.5C29.3 20.5 32 23 32 27" />
    </svg>
  );
}

function MarketingExecutiveIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <path d="M4 14V20L9 21V13L4 14Z" />
      <path d="M9 13L24 8V26L9 21" />
      <path d="M12 21V27C12 28 13 29 14.5 29" />
      <circle cx="27" cy="12" r="3" />
    </svg>
  );
}

function FinancialAnalystIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <path d="M6 26V16M14 26V10M22 26V19M30 26V7" />
      <path d="M4 26H30" />
      <path d="M24 9L30 7L28 13" />
    </svg>
  );
}

function ProjectCoordinatorIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <rect x="7" y="6" width="20" height="24" rx="2" />
      <rect x="12" y="3" width="10" height="6" rx="1.5" />
      <path d="M11 17L14.5 20.5L23 12" />
    </svg>
  );
}

function AdministrativeOfficerIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <rect x="5" y="10" width="24" height="16" rx="2" />
      <path d="M5 15H29" />
      <path d="M11 6H23V10H11V6Z" />
      <path d="M11 20H17" />
    </svg>
  );
}

function ManagementConsultantIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <circle cx="13" cy="10" r="4.5" />
      <path d="M5 27C5 21 8.6 17.5 13 17.5C17.4 17.5 21 21 21 27" />
      <path d="M22 14H31L28 18L31 22H22V14Z" />
    </svg>
  );
}

function HospitalAdministratorIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <path d="M6 30V10L17 4L28 10V30" />
      <path d="M6 30H28" />
      <path d="M17 12V22M12 17H22" />
      <rect x="14" y="24" width="6" height="6" />
    </svg>
  );
}

function FrontOfficeManagerIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <path d="M4 26V16L17 10L30 16V26" />
      <path d="M4 26H30" />
      <rect x="12" y="19" width="10" height="7" />
      <path d="M15 19V16H19V19" />
    </svg>
  );
}

function PatientRelationsIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <circle cx="13" cy="9" r="4.2" />
      <path d="M6 26C6 20.5 9.3 17.3 13 17.3C16.7 17.3 20 20.5 20 26" />
      <path d="M23 15C23 12 25.5 10 28 12C30.5 10 33 12 33 15C33 18 28 22 28 22C28 22 23 18 23 15Z" />
    </svg>
  );
}

const roles = [
  { title: "Business Development Executive", icon: <BusinessDevelopmentIcon /> },
  { title: "Operation Executive", icon: <OperationExecutiveIcon /> },
  { title: "HR Executive", icon: <HrExecutiveIcon /> },
  { title: "Marketing Executive", icon: <MarketingExecutiveIcon /> },
  { title: "Financial Analyst", icon: <FinancialAnalystIcon /> },
  { title: "Project Coordinator", icon: <ProjectCoordinatorIcon /> },
  { title: "Administrative Officer", icon: <AdministrativeOfficerIcon /> },
  { title: "Management Consultant", icon: <ManagementConsultantIcon /> },
  { title: "Hospital Administrator", icon: <HospitalAdministratorIcon /> },
  { title: "Front Office Manager", icon: <FrontOfficeManagerIcon /> },
  { title: "Patient Relations Executive", icon: <PatientRelationsIcon /> },
];

export default function BusinessCareerOutcomes() {
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
