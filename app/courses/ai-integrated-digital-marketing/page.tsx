import Navbar from "../../components/Navbar";
import CourseHero from "../../components/CourseHero";
import ProgramDetailsSection from "../../components/ProgramDetailsSection";
import CourseCTA from "../../components/CourseCTA";
import Footer from "../../components/Footer";
import PageBackground from "../../components/PageBackground";
import styles from "../../page.module.css";
import getClientPromise from "../../../lib/mongodb";
import { getExistingProgramFaqs } from "../../lib/programFaqs";
import { getSiteUrl } from "../../lib/getSiteUrl";

async function getProgram() {
  try {
    const client = await getClientPromise();
    const program = await client
      .db("psc")
      .collection("programs")
      .findOne({ name: { $regex: "^AI Integrated Digital Marketing$", $options: "i" } });

    return program
      ? {
          name: String(program.name),
          category: String(program.category || "Online"),
          duration: String(program.duration || "4 months"),
          details: {
            ...(program.details || {}),
            faqs:
              Array.isArray(program.details?.faqs) && program.details.faqs.length > 0
                ? program.details.faqs
                : getExistingProgramFaqs(String(program.name || "")),
          },
        }
      : null;
  } catch {
    return null;
  }
}

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const program = await getProgram();
  const title = program?.name ? `${program.name} | Professional Skill Campus` : "AI Integrated Digital Marketing Course | Professional Skill Campus";
  const description = "Learn AI Integrated Digital Marketing at Professional Skill Campus. Get certified and ready for a successful career in digital marketing.";
  return {
    title,
    description,
    alternates: {
      canonical: "/courses/ai-integrated-digital-marketing",
    },
    openGraph: {
      title,
      description,
      url: "/courses/ai-integrated-digital-marketing",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function AiIntegratedDigitalMarketing() {
  const program = await getProgram();

  const siteUrl = getSiteUrl();
  const providerUrl = siteUrl || "https://professionalskillcampus.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Gamified AI Integrated Digital Marketing",
    "description": "Learn digital marketing strategies, SEO, SEM, and social media marketing at Professional Skill Campus.",
    "provider": {
      "@type": "Organization",
      "name": "Professional Skill Campus",
      "sameAs": providerUrl
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "blended",
      "location": {
        "@type": "Place",
        "name": "Professional Skill Campus",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Tirur",
          "addressRegion": "Kerala",
          "postalCode": "676101",
          "addressCountry": "IN"
        }
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <div className={styles.pageContent}>
        <PageBackground />
        <CourseHero />
        <ProgramDetailsSection
          details={program?.details}
          duration={program?.duration || "4 months"}
          category={program?.category || "Offline / Online"}
          programName={program?.name || "AI Integrated Digital Marketing"}
        />
        <CourseCTA
          programName={program?.name || "AI Integrated Digital Marketing"}
          category={program?.category || "Online"}
        />
      </div>
      <Footer />
    </>
  );
}
