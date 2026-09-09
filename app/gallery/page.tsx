import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";
import Marquee from "../components/Marquee";
import GalleryContent from "../components/GalleryContent";
import Footer from "../components/Footer";
import PageBackground from "../components/PageBackground";
import { Metadata } from "next";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Gallery | Professional Skill Campus",
  description: "A look through our success stories, moments, and milestones at Professional Skill Campus — organized by category.",
  alternates: {
    canonical: "/gallery",
  },
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <div className={styles.pageContent}>
        <PageBackground />
        <PageHero
          eyebrow="Our Gallery"
          heading="Our Gallery"
          subheading="A look through our success stories, moments, and milestones — organized by category."
        />
        <Marquee />
        <GalleryContent />
      </div>
      <Footer />
    </>
  );
}
