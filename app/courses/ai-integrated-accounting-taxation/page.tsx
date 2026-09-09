import Navbar from "../../components/Navbar";
import CourseHero from "../../components/CourseHero";
import AccountingCurriculum from "../../components/AccountingCurriculum";
import CourseTestimonials from "../../components/CourseTestimonials";
import ProgramFaqSection from "../../components/ProgramFaqSection";
import CourseCTA from "../../components/CourseCTA";
import Footer from "../../components/Footer";
import PageBackground from "../../components/PageBackground";
import { Metadata } from "next";
import styles from "../../page.module.css";
import { getSiteUrl } from "../../lib/getSiteUrl";

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

export const metadata: Metadata = {
  title: "Professional Diploma in AI Integrated Accounting & Taxation",
  description: "Join the best offline accounting course in Malappuram. Learn Tally Prime, Zoho Books & Odoo with guaranteed placement support at Professional Skill Campus.",
  alternates: {
    canonical: "/courses/ai-integrated-accounting-taxation",
  },
  openGraph: {
    title: "Professional Diploma in AI Integrated Accounting & Taxation",
    description: "Join the best offline accounting course in Malappuram. Learn Tally Prime, Zoho Books & Odoo with guaranteed placement support at Professional Skill Campus.",
    url: "/courses/ai-integrated-accounting-taxation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Diploma in AI Integrated Accounting & Taxation",
    description: "Join the best offline accounting course in Malappuram. Learn Tally Prime, Zoho Books & Odoo with guaranteed placement support at Professional Skill Campus.",
  },
};

export default function AiIntegratedAccountingTaxation() {
  const siteUrl = getSiteUrl();
  const providerUrl = siteUrl || "https://professionalskillcampus.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Professional Diploma in AI Integrated Accounting & Taxation",
    "description": "Learn modern accounting software, taxation, and business administration.",
    "provider": {
      "@type": "Organization",
      "name": "Professional Skill Campus",
      "sameAs": providerUrl
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "offline",
      "location": {
        "@type": "Place",
        "name": "Professional Skill Campus",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Tirur",
          "addressRegion": "Kerala",
          "postalCode": "676101",
          "addressCountry": "IN"
        }
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
        <CourseTestimonials programName="AI Integrated Accounting & Taxation" />
        <ProgramFaqSection programName="AI Integrated Accounting & Taxation" />
        <CourseCTA
          programName="AI Integrated Accounting & Taxation"
          category="Offline"
        />
      </div>
      <Footer />
    </>
  );
}
