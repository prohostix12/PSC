import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";
import Marquee from "../components/Marquee";
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
        <PageHero
          eyebrow="About Us"
          heading="Building Skills, Shaping Careers"
          subheading="Get to know Professional Skill Campus — our story, our mission, and the promise we make to every student who walks through our doors."
        />
        <Marquee />
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
