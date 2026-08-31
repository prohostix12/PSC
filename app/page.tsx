import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import SuccessStories from "./components/SuccessStories";
import AboutUs from "./components/AboutUs";
import WhyUs from "./components/WhyUs";
import Reviews from "./components/Reviews";
import Directors from "./components/Directors";
import SuccessStoriesGallery from "./components/SuccessStoriesGallery";
import Certifications from "./components/Certifications";
import SkillCreators from "./components/SkillCreators";
import Courses from "./components/Courses";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import PageBackground from "./components/PageBackground";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className={styles.pageContent}>
        <PageBackground />
        <Hero />
        <Marquee />
        <SuccessStories />
        <AboutUs />
        <Certifications />
        <SkillCreators />
        <Courses />
        <WhyUs />
        <Reviews />
        <Directors />
        <SuccessStoriesGallery />
        <FAQ />
      </div>
      <Footer />
    </>
  );
}
