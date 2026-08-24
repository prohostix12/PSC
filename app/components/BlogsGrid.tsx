import SketchFrame from "./SketchFrame";
import styles from "./BlogsGrid.module.css";

const blogs = [
  {
    category: "Digital Marketing",
    date: "Jan 12, 2026",
    title: "5 AI Tools Every Digital Marketer Should Know in 2026",
    excerpt:
      "From content generation to campaign optimization, here's how AI is reshaping digital marketing workflows — and how to get ahead of it.",
  },
  {
    category: "Career Growth",
    date: "Jan 5, 2026",
    title: "How to Build a Job-Ready Portfolio While Still Learning",
    excerpt:
      "Employers want proof, not just certificates. Here's a practical framework for turning coursework into a portfolio that gets you hired.",
  },
  {
    category: "Accounting & Taxation",
    date: "Dec 22, 2025",
    title: "GST Filing Made Simple: A Beginner's Checklist",
    excerpt:
      "Confused about GST registration and filing? This step-by-step checklist breaks down exactly what first-time filers need to know.",
  },
  {
    category: "Business & Healthcare",
    date: "Dec 14, 2025",
    title: "Why Hospital Administration Is a Rising Career Path in Kerala",
    excerpt:
      "As healthcare institutions modernize, demand for skilled hospital administrators is growing fast. Here's what the role actually involves.",
  },
  {
    category: "Skill Development",
    date: "Dec 2, 2025",
    title: "Offline vs Online Learning: Which Format Fits You Best?",
    excerpt:
      "Both formats can get you job-ready — the right choice depends on your schedule, learning style, and career goals. Here's how to decide.",
  },
  {
    category: "Placements",
    date: "Nov 18, 2025",
    title: "What Recruiters Really Look for in Entry-Level Candidates",
    excerpt:
      "Hint: it's rarely just the degree. We break down the skills and signals that actually move your resume to the top of the pile.",
  },
];

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BlogsGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.label}>From the Blog</p>
        <h2 className={styles.heading}>Latest Articles</h2>
      </div>

      <div className={styles.grid}>
        {blogs.map((blog) => (
          <article key={blog.title} className={styles.card}>
            <SketchFrame rx={18} />

            <div className={styles.thumb}></div>

            <div className={styles.body}>
              <div className={styles.meta}>
                <span className={styles.category}>{blog.category}</span>
                <span className={styles.date}>{blog.date}</span>
              </div>

              <h3 className={styles.title}>{blog.title}</h3>
              <p className={styles.excerpt}>{blog.excerpt}</p>

              <a href="#" className={styles.viewButton}>
                View Blog
                <ArrowIcon />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
