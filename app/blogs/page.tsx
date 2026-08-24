import Navbar from "../components/Navbar";
import BlogsHero from "../components/BlogsHero";
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
        <BlogsHero />
        <BlogsGrid />
      </div>
      <Footer />
    </>
  );
}
