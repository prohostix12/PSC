import Navbar from "../components/Navbar";
import ContactHero from "../components/ContactHero";
import ContactInfo from "../components/ContactInfo";
import ContactFormSection from "../components/ContactFormSection";
import Footer from "../components/Footer";
import PageBackground from "../components/PageBackground";
import styles from "../page.module.css";

export default function Contact() {
  return (
    <>
      <Navbar />
      <div className={styles.pageContent}>
        <PageBackground />
        <ContactHero />
        <ContactInfo />
        <ContactFormSection />
      </div>
      <Footer />
    </>
  );
}
