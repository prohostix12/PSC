import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import SuccessStories from "./components/SuccessStories";
import AboutUs from "./components/AboutUs";
import WhyUs from "./components/WhyUs";
import Reviews from "./components/Reviews";
import Directors from "./components/Directors";
import SuccessStoriesGallery from "./components/SuccessStoriesGallery";
import Certifications from "./components/Certifications";
import SkillCreators from "./components/SkillCreators";
import Courses from "./components/Courses";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import PageBackground from "./components/PageBackground";
import { Metadata } from "next";
import { getSiteUrl } from "./lib/getSiteUrl";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Expert IT & Business Training Courses | Professional Skill Campus",
  description: "Accelerate your career with our industry-recognized courses in AI, Accounting, Digital Marketing, and Hospital Management. Get certified and hired today.",
  keywords: ["IT Training", "Business Training", "Digital Marketing Course", "Accounting Course", "Hospital Management Course", "Kerala", "Professional Skill Campus", "PSC"],
};

import getClientPromise from "../lib/mongodb";
import { getPrograms } from "./lib/programs";
import type { Program } from "./lib/programUtils";

export const dynamic = "force-dynamic";

export default async function Home() {
  const siteUrl = getSiteUrl();
  const providerUrl = siteUrl || "https://professionalskillcampus.vercel.app";

  let faqs: { question: string; answer: string }[] = [];
  let programs: Program[] = [];
  try {
    const client = await getClientPromise();
    const dbFaqs = await client.db("psc").collection("faqs").find({}).toArray();
    faqs = dbFaqs.map(f => ({ question: f.question, answer: f.answer }));
    programs = await getPrograms();
  } catch (e) {
    // Ignore db error
  }

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "Professional Skill Campus",
      "url": providerUrl,
      "logo": `${providerUrl}/logo-main.png`,
      "description": "Expert training in IT and Business sectors.",
      "telephone": "+91 99465 56002",
      "email": "professionalskillcampus@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Thazhepalam",
        "addressLocality": "Tirur",
        "addressRegion": "Kerala",
        "postalCode": "676101",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91 99465 56002",
        "contactType": "customer service",
        "email": "professionalskillcampus@gmail.com"
      },
      "sameAs": [
        "https://x.com/proskillcampus",
        "https://www.facebook.com/professionalskillcampus/?rdid=Pk7ZLW94ZB8r6Gvu",
        "https://www.instagram.com/professionalskillcampus?stkn=MmlsNWF1ZnhmbnVy",
        "https://www.youtube.com/@professionalskillcampus"
      ]
    },
    ...(faqs.length > 0 ? [{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    }] : [])
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar initialPrograms={programs} />
      <div className={styles.pageContent}>
        <PageBackground />
        <Hero />
        <Marquee />
        <SuccessStories />
        <AboutUs />
        <Certifications />
        <SkillCreators />
        <Courses initialPrograms={programs} />
        <WhyUs />
        <Reviews />
        <Directors />
        <SuccessStoriesGallery />
        <FAQ />
      </div>
      <Footer />
    </>
  );
}
