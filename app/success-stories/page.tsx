import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";
import Marquee from "../components/Marquee";
import SuccessStoriesGrid from "../components/SuccessStoriesGrid";
import Footer from "../components/Footer";
import PageBackground from "../components/PageBackground";
import { Metadata } from "next";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Success Stories",
  description: "Real students, real growth. See how learners at Professional Skill Campus turned hands-on training into job offers, promotions, and new businesses.",
  alternates: {
    canonical: "/success-stories",
  },
  openGraph: {
    title: "Success Stories | Professional Skill Campus",
    description: "Real students, real growth. See how learners at Professional Skill Campus turned hands-on training into job offers, promotions, and new businesses.",
    url: "/success-stories",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Success Stories | Professional Skill Campus",
    description: "Real students, real growth. See how learners at Professional Skill Campus turned hands-on training into job offers, promotions, and new businesses.",
  },
};

export default function SuccessStoriesPage() {
  return (
    <>
      <Navbar />
      <div className={styles.pageContent}>
        <PageBackground />
        <PageHero
          eyebrow="Success Stories"
          heading="Real Students, Real Growth"
          subheading="From classrooms to careers — see how learners at Professional Skill Campus turned hands-on training into real job offers, promotions, and new businesses."
        />
        <Marquee />
        <SuccessStoriesGrid />
      </div>
      <Footer />
    </>
  );
}
