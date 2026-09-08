import Navbar from "../../components/Navbar";
import CourseHero from "../../components/CourseHero";
import BusinessCurriculum from "../../components/BusinessCurriculum";
import WhyChooseBusiness from "../../components/WhyChooseBusiness";
import CourseTestimonials from "../../components/CourseTestimonials";
import ProgramFaqSection from "../../components/ProgramFaqSection";
import CourseCTA from "../../components/CourseCTA";
import Footer from "../../components/Footer";
import PageBackground from "../../components/PageBackground";
import styles from "../../page.module.css";

const features = [
  {
    title: "Dual Expertise",
    subtitle: "Business & healthcare administration",
  },
  {
    title: "Get Certified",
    subtitle: "Certification from Professional Skill Campus",
  },
  { title: "Get Placed", subtitle: "Placement & internship support" },
];

const details = [
  { label: "Duration", value: "6 Months" },
  { label: "Mode", value: "Offline & Online" },
  { label: "Intake", value: "40" },
];

export default function BusinessAdministrationHospitalManagement() {
  return (
    <>
      <Navbar />
      <div className={styles.pageContent}>
        <PageBackground />
        <CourseHero
          badge="Online & Offline Course · Business & Hospital Management"
          heading="Business Administration &"
          headingAccent="Hospital Management"
          subheading="Master modern business concepts and healthcare administration with Professional Skill Campus — dual expertise, real-world training, career-ready skills."
          features={features}
          details={details}
        />
        <BusinessCurriculum />
        <WhyChooseBusiness />
        <CourseTestimonials programName="Business Administration & Hospital Management" />
        <ProgramFaqSection programName="Business Administration & Hospital Management" />
        <CourseCTA
          programName="Business Administration & Hospital Management"
          category="Online & Offline"
        />
      </div>
      <Footer />
    </>
  );
}
