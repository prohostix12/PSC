import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";
import Marquee from "../components/Marquee";
import BlogsGrid from "../components/BlogsGrid";
import Footer from "../components/Footer";
import PageBackground from "../components/PageBackground";
import styles from "../page.module.css";

export default function Blogs() {
  return (
    <>
      <Navbar />
      <div className={styles.pageContent}>
        <PageBackground />
        <PageHero
          eyebrow="Blogs"
          heading="Insights & Career Tips"
          subheading="Practical guides, industry updates, and career advice from the Professional Skill Campus team to help you learn smarter and grow faster."
        />
        <Marquee />
        <BlogsGrid />
      </div>
      <Footer />
    </>
  );
}
