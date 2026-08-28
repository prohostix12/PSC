import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";
import Marquee from "../components/Marquee";
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
        <PageHero
          eyebrow="Contact Us"
          heading="We'd Love to Hear From You"
          subheading="Have a question about a course, admissions, or anything else? Reach out and the Professional Skill Campus team will get back to you."
        />
        <Marquee />
        <ContactInfo />
        <ContactFormSection />
      </div>
      <Footer />
    </>
  );
}
