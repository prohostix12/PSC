import Navbar from "../../components/Navbar";
import CourseHero from "../../components/CourseHero";
import CourseCurriculum from "../../components/CourseCurriculum";
import CareerOutcomes from "../../components/CareerOutcomes";
import CourseTestimonials from "../../components/CourseTestimonials";
import CourseFAQ from "../../components/CourseFAQ";
import CourseCTA from "../../components/CourseCTA";
import Footer from "../../components/Footer";
import PageBackground from "../../components/PageBackground";
import styles from "../../page.module.css";

export default function AiIntegratedDigitalMarketing() {
  return (
    <>
      <Navbar />
      <div className={styles.pageContent}>
        <PageBackground />
        <CourseHero />
        <CourseCurriculum />
        <CareerOutcomes />
        <CourseTestimonials />
        <CourseFAQ />
        <CourseCTA />
      </div>
      <Footer />
    </>
  );
}
