import Navbar from "../../components/Navbar";
import CourseHero from "../../components/CourseHero";
import AccountingCurriculum from "../../components/AccountingCurriculum";
import AccountingCareerOutcomes from "../../components/AccountingCareerOutcomes";
import CourseTestimonials from "../../components/CourseTestimonials";
import AccountingFAQ from "../../components/AccountingFAQ";
import CourseCTA from "../../components/CourseCTA";
import Footer from "../../components/Footer";
import PageBackground from "../../components/PageBackground";
import styles from "../../page.module.css";

const features = [
  { title: "Get Skilled", subtitle: "Tally Prime, Zoho Books & Odoo" },
  { title: "Get Certified", subtitle: "Accounting & Taxation Diploma" },
  { title: "Get Placed", subtitle: "Dedicated placement support" },
];

const details = [
  { label: "Duration", value: "4 Months" },
  { label: "Mode", value: "Offline" },
  { label: "Intake", value: "30" },
];

export default function AiIntegratedAccountingTaxation() {
  return (
    <>
      <Navbar />
      <div className={styles.pageContent}>
        <PageBackground />
        <CourseHero
          badge="Offline Program · Accounting & Taxation"
          heading="Professional Diploma in AI Integrated"
          headingAccent="Accounting & Taxation"
          subheading="Best accounting institute in Malappuram — Professional Skill Campus offers an offline accounting course crafted for students and professionals who want to become industry ready accounting experts."
          features={features}
          details={details}
        />
        <AccountingCurriculum />
        <AccountingCareerOutcomes />
        <CourseTestimonials />
        <AccountingFAQ />
        <CourseCTA />
      </div>
      <Footer />
    </>
  );
}
