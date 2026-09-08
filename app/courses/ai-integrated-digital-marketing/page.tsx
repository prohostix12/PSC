import Navbar from "../../components/Navbar";
import CourseHero from "../../components/CourseHero";
import ProgramDetailsSection from "../../components/ProgramDetailsSection";
import CourseCTA from "../../components/CourseCTA";
import Footer from "../../components/Footer";
import PageBackground from "../../components/PageBackground";
import styles from "../../page.module.css";
import getClientPromise from "../../../lib/mongodb";
import { getExistingProgramFaqs } from "../../lib/programFaqs";

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

export default async function AiIntegratedDigitalMarketing() {
  const program = await getProgram();

  return (
    <>
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
