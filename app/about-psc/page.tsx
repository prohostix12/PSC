import Navbar from "../components/Navbar";
import AboutHero from "../components/AboutHero";
import BestSkillInstitute from "../components/BestSkillInstitute";
import WhyChooseUs from "../components/WhyChooseUs";
import MissionVision from "../components/MissionVision";
import ValueWeCreate from "../components/ValueWeCreate";
import Reviews from "../components/Reviews";
import ConsultationForm from "../components/ConsultationForm";
import Footer from "../components/Footer";
import PageBackground from "../components/PageBackground";
import styles from "../page.module.css";

export default function AboutPsc() {
  return (
    <>
      <Navbar />
      <div className={styles.pageContent}>
        <PageBackground />
        <AboutHero />
        <BestSkillInstitute />
        <WhyChooseUs />
        <MissionVision />
        <ValueWeCreate />
        <Reviews />
        <ConsultationForm />
      </div>
      <Footer />
    </>
  );
}
