import Navbar from "../components/Navbar";
import SuccessStoriesHero from "../components/SuccessStoriesHero";
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
        <SuccessStoriesHero />
        <SuccessStoriesGrid />
      </div>
      <Footer />
    </>
  );
}
