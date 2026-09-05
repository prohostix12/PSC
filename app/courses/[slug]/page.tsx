import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageBackground from "../../components/PageBackground";
import CourseHero from "../../components/CourseHero";
import ProgramDetailsSection from "../../components/ProgramDetailsSection";
import getClientPromise from "../../../lib/mongodb";
import {
  normalizeProgramPoint,
  programSlug,
  type Program,
} from "../../lib/programUtils";
import pageStyles from "../../page.module.css";

export const dynamic = "force-dynamic";

async function findProgram(slug: string): Promise<Program | null> {
  try {
    const client = await getClientPromise();
    const programs = await client
      .db("psc")
      .collection("programs")
      .find({})
      .toArray();

    const match = programs.find((p) => programSlug(String(p.name)) === slug);

    return match
      ? {
          _id: String(match._id),
          category: match.category,
          name: match.name,
          duration: match.duration ?? "",
          heroPara: match.heroPara ?? "",
          heroHeading: match.heroHeading ?? "",
          heroAbout: match.heroAbout ?? "",
          heroPoints: Array.isArray(match.heroPoints) ? match.heroPoints : [],
          details: match.details,
          createdAt: match.createdAt?.toISOString?.() ?? "",
        }
      : null;
  } catch {
    return null;
  }
}

const titleFromSlug = (slug: string) =>
  slug
    .split("-")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = await findProgram(slug);
  const name = program?.name ?? titleFromSlug(slug);

  const heroHeading = (program?.heroHeading || name).trim();
  const headingParts = heroHeading.split(/\s+/);
  const splitIndex = Math.max(1, Math.ceil(headingParts.length / 2));
  const heading = headingParts.slice(0, splitIndex).join(" ") || name;
  const headingAccent = headingParts.slice(splitIndex).join(" ");

  const heroAbout =
    program?.heroAbout?.trim() ||
    (program?.heroPara && program.heroPara.trim()) ||
    `This is ${name}. Wait for the program details.`;

  const features =
    (program?.heroPoints && program.heroPoints.length > 0
      ? program.heroPoints
      : ["Get Skilled", "Get Certified", "Get Hired"]
    ).map(normalizeProgramPoint).map((point) => ({
      title: point.heading,
      subtitle: point.para,
    }));

  return (
    <>
      <Navbar />
      <div className={pageStyles.pageContent}>
        <PageBackground />
        <CourseHero
          badge={`${program?.category || "Online"} Course · ${name}`}
          heading={heading}
          headingAccent={headingAccent}
          subheading={heroAbout}
          features={features}
          details={[
            { label: "Duration", value: program?.duration || "4 Months" },
            { label: "Mode", value: program?.category || "Online & Offline" },
            { label: "Students Trained", value: "500+" },
          ]}
        />
        <ProgramDetailsSection
          details={program?.details}
          duration={program?.duration || "4 months"}
          category={program?.category || "Offline / Online"}
          programName={name}
        />
      </div>
      <Footer />
    </>
  );
}
