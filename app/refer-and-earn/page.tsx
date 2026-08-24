import Navbar from "../components/Navbar";
import ReferEarnHero from "../components/ReferEarnHero";
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
        <ReferEarnHero />
        <ReferEarnContent />
      </div>
      <Footer />
    </>
  );
}
