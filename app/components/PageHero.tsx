import styles from "./PageHero.module.css";

type Props = {
  eyebrow: string;
  heading: React.ReactNode;
  subheading: string;
};

// Shared hero banner used at the top of every inner page (About, Contact,
// Blogs, Events, Refer & Earn, Success Stories) so they all share the same
// height, style, and structure. The Home page keeps its own richer Hero
// (rating badge, feature list, enquiry form) since it serves a different,
// conversion-focused purpose.
export default function PageHero({ eyebrow, heading, subheading }: Props) {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.heading}>{heading}</h1>
        <p className={styles.subheading}>{subheading}</p>
      </div>
    </section>
  );
}
