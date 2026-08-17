import SketchFrame from "./SketchFrame";
import styles from "./CourseTestimonials.module.css";

const testimonials = [
  {
    name: "Salman",
    role: "Student",
    initial: "S",
    color: "#f5a623",
    text: "The AI Integrated Digital Marketing course was highly practical and future-focused. Learning automation, analytics, and AI-driven strategies helped me improve efficiency and stay ahead in the competitive digital marketing field.",
  },
  {
    name: "Shahin Sha",
    role: "Student",
    initial: "S",
    color: "#d92b3f",
    text: "I completed the AI Integrated Digital Marketing course at Skillage Academy. The blend of AI tools with SEO, ads, and content marketing gave me real-world skills and confidence to handle modern digital marketing projects effectively.",
  },
  {
    name: "Raliya",
    role: "Student",
    initial: "R",
    color: "#2451e0",
    text: "This course helped me understand how AI can simplify digital marketing tasks. From content creation to campaign optimization, the practical training made learning easy, smart, and industry-ready.",
  },
];

function QuoteMark() {
  return (
    <svg width="34" height="26" viewBox="0 0 34 26" fill="none" aria-hidden="true">
      <path
        d="M2 14C2 6 7 2 13 2M2 14C2 20 6 24 11 24M2 14H8C8 18 6 21 2 22"
        stroke="#0f1b3d"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 14C19 6 24 2 30 2M19 14C19 20 23 24 28 24M19 14H25C25 18 23 21 19 22"
        stroke="#0f1b3d"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CourseTestimonials() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>What Our Students Saying</h2>

      <div className={styles.list}>
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.name}
            className={`${styles.row} ${
              index % 2 === 1 ? styles.rowReverse : ""
            }`}
          >
            <div className={styles.person}>
              <span
                className={styles.avatar}
                style={{ background: testimonial.color }}
              >
                {testimonial.initial}
              </span>
              <div>
                <p className={styles.name}>{testimonial.name}</p>
                <p className={styles.role}>{testimonial.role}</p>
              </div>
            </div>

            <div className={styles.quoteCard}>
              <SketchFrame rx={20} />
              <span className={styles.quoteMark}>
                <QuoteMark />
              </span>
              <p className={styles.quoteText}>{testimonial.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
