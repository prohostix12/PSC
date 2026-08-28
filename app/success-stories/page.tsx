import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";
import Marquee from "../components/Marquee";
import SuccessStoriesGrid from "../components/SuccessStoriesGrid";
import Footer from "../components/Footer";
import PageBackground from "../components/PageBackground";
import styles from "../page.module.css";

export default function SuccessStoriesPage() {
  return (
    <>
      <Navbar />
      <div className={styles.pageContent}>
        <PageBackground />
        <PageHero
          eyebrow="Success Stories"
          heading="Real Students, Real Growth"
          subheading="From classrooms to careers — see how learners at Professional Skill Campus turned hands-on training into real job offers, promotions, and new businesses."
        />
        <Marquee />
        <SuccessStoriesGrid />
      </div>
      <Footer />
    </>
  );
}
