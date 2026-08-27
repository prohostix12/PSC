import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageBackground from "../../components/PageBackground";
import getClientPromise from "../../../lib/mongodb";
import { programSlug, type Program } from "../../lib/programUtils";
import pageStyles from "../../page.module.css";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

async function findProgram(slug: string): Promise<Program | null> {
  try {
    const client = await getClientPromise();
    const programs = await client
      .db("psc")
      .collection("programs")
      .find({})
      .toArray();

    const match = programs.find(
      (p) => programSlug(String(p.name)) === slug
    );

    return match
      ? {
          _id: String(match._id),
          category: match.category,
          name: match.name,
          createdAt: match.createdAt?.toISOString?.() ?? "",
        }
      : null;
  } catch {
    // If the DB is unreachable, fall back to deriving a readable name from
    // the slug rather than showing an error page.
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

  return (
    <>
      <Navbar />
      <div className={pageStyles.pageContent}>
        <PageBackground />

        <section className={styles.section}>
          {program?.category && (
            <span
              className={`${styles.badge} ${
                program.category === "Online"
                  ? styles.badgeOnline
                  : styles.badgeOffline
              }`}
            >
              {program.category}
            </span>
          )}

          <h1 className={styles.heading}>{name}</h1>

          <p className={styles.message}>
            This is {name}, wait for the program details.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
