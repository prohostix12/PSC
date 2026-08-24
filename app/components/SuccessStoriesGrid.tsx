import SketchFrame from "./SketchFrame";
import styles from "./SuccessStoriesGrid.module.css";

const stories = [
  {
    name: "Anjali R.",
    initial: "A",
    color: "#2451e0",
    course: "AI Integrated Digital Marketing",
    outcome: "Now: Digital Marketing Executive, Kochi",
    quote:
      "The hands-on projects and AI tools training gave me a portfolio I could actually show employers — I had two offers before I even finished the course.",
  },
  {
    name: "Mohammed Salim",
    initial: "M",
    color: "#0f9d78",
    course: "Business Administration & Hospital Management",
    outcome: "Now: Hospital Administrator",
    quote:
      "The dual focus on business and healthcare operations was exactly what I needed to move from a general admin role into hospital management.",
  },
  {
    name: "Fathima Noor",
    initial: "F",
    color: "#f5a623",
    course: "Professional Diploma in AI Integrated Accounting & Taxation",
    outcome: "Now: Junior Accountant",
    quote:
      "Learning Tally Prime, Zoho Books, and GST filing hands-on made my first job interview feel like a formality — I already knew the tools.",
  },
  {
    name: "Arjun K.",
    initial: "A",
    color: "#d92b3f",
    course: "AI Integrated Digital Marketing",
    outcome: "Now: Freelance SEO Consultant",
    quote:
      "I started freelancing within weeks of finishing the SEO module. Today I manage campaigns for clients across three states.",
  },
  {
    name: "Devika S.",
    initial: "D",
    color: "#2451e0",
    course: "Business Administration & Hospital Management",
    outcome: "Now: HR Executive",
    quote:
      "The soft skills and personal grooming sessions gave me the confidence to walk into interviews and actually land the HR role I wanted.",
  },
  {
    name: "Naseef P.",
    initial: "N",
    color: "#0f9d78",
    course: "Professional Diploma in AI Integrated Accounting & Taxation",
    outcome: "Now: Tax Consultant",
    quote:
      "From basic bookkeeping to GCC VAT, the course covered everything I needed to start advising small businesses on their own.",
  },
];

export default function SuccessStoriesGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.label}>Student Journeys</p>
        <h2 className={styles.heading}>Success Stories</h2>
      </div>

      <div className={styles.grid}>
        {stories.map((story) => (
          <div key={story.name} className={styles.card}>
            <SketchFrame rx={20} />

            <div className={styles.cardHeader}>
              <span
                className={styles.avatar}
                style={{ background: story.color }}
              >
                {story.initial}
              </span>
              <div>
                <p className={styles.name}>{story.name}</p>
                <p className={styles.outcome}>{story.outcome}</p>
              </div>
            </div>

            <span className={styles.courseTag}>{story.course}</span>

            <p className={styles.quote}>&ldquo;{story.quote}&rdquo;</p>
          </div>
        ))}
      </div>
    </section>
  );
}
