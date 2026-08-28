import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";
import Marquee from "../components/Marquee";
import ReferEarnContent from "../components/ReferEarnContent";
import Footer from "../components/Footer";
import PageBackground from "../components/PageBackground";
import styles from "../page.module.css";

export default function ReferAndEarn() {
  return (
    <>
      <Navbar />
      <div className={styles.pageContent}>
        <PageBackground />
        <PageHero
          eyebrow="Refer & Earn"
          heading="Refer Your Friend & Earn"
          subheading="Love your experience at Professional Skill Campus? Share it with a friend — when they enroll, you both get rewarded."
        />
        <Marquee />
        <ReferEarnContent />
      </div>
      <Footer />
    </>
  );
}
