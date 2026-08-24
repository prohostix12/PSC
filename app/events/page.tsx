import Navbar from "../components/Navbar";
import EventsHero from "../components/EventsHero";
import EventsGallery from "../components/EventsGallery";
import Footer from "../components/Footer";
import PageBackground from "../components/PageBackground";
import styles from "../page.module.css";

export default function Events() {
  return (
    <>
      <Navbar />
      <div className={styles.pageContent}>
        <PageBackground />
        <EventsHero />
        <EventsGallery />
      </div>
      <Footer />
    </>
  );
}
