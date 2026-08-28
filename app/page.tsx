import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import SuccessStories from "./components/SuccessStories";
import AboutUs from "./components/AboutUs";
import WhyUs from "./components/WhyUs";
import Reviews from "./components/Reviews";
import Certifications from "./components/Certifications";
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
        <Courses />
        <WhyUs />
        <Reviews />
        <FAQ />
      </div>
      <Footer />
    </>
  );
}
