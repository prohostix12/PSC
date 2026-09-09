import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";
import Marquee from "../components/Marquee";
import EventsGallery from "../components/EventsGallery";
import Footer from "../components/Footer";
import PageBackground from "../components/PageBackground";
import { Metadata } from "next";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Events | Professional Skill Campus",
  description: "A look back at workshops, graduation days, guest sessions, and milestones from the Professional Skill Campus community.",
  alternates: {
    canonical: "/events",
  },
};

export default function Events() {
  return (
    <>
      <Navbar />
      <div className={styles.pageContent}>
        <PageBackground />
        <PageHero
          eyebrow="Events"
          heading="Moments Worth Remembering"
          subheading="A look back at workshops, graduation days, guest sessions, and milestones from the Professional Skill Campus community."
        />
        <Marquee />
        <EventsGallery />
      </div>
      <Footer />
    </>
  );
}
