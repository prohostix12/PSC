import getClientPromise from "../../lib/mongodb";
import SketchFrame from "./SketchFrame";
import styles from "./CourseTestimonials.module.css";

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

type Props = {
  programName: string;
};

export default async function CourseTestimonials({ programName }: Props) {
  let testimonials: Array<{ name: string; review: string; image: string }> = [];

  try {
    const client = await getClientPromise();
    const program = await client
      .db("psc")
      .collection("programs")
      .findOne({ name: { $regex: `^${programName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, $options: "i" } });
    const reviews = program?.details?.reviews;
    testimonials = Array.isArray(reviews)
      ? reviews
          .map((review) => ({
            name: String(review?.name || "").trim(),
            review: String(review?.review || "").trim(),
            image: String(review?.image || "").trim(),
          }))
          .filter((review) => review.name || review.review || review.image)
      : [];
  } catch {
    testimonials = [];
  }

  if (testimonials.length === 0) return null;

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
                {testimonial.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={testimonial.image} alt={testimonial.name} className={styles.avatarImage} />
                ) : (
                  <span className={styles.avatar}>
                    {testimonial.name.charAt(0).toUpperCase() || "S"}
                  </span>
                )}
              <div>
                <p className={styles.name}>{testimonial.name}</p>
                <p className={styles.role}>Student</p>
              </div>
            </div>

            <div className={styles.quoteCard}>
              <SketchFrame rx={20} />
              <span className={styles.quoteMark}>
                <QuoteMark />
              </span>
              <p className={styles.quoteText}>{testimonial.review}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
