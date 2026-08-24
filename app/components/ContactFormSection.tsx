import SketchFrame from "./SketchFrame";
import styles from "./ContactFormSection.module.css";

export default function ContactFormSection() {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <SketchFrame rx={24} className={styles.sketch} />

        <h2 className={styles.heading}>Send your Query</h2>

        <form className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className={styles.input}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            className={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={styles.input}
          />
          <textarea
            name="message"
            placeholder="Message"
            rows={5}
            className={styles.textarea}
          ></textarea>

          <button type="submit" className={styles.submit}>
            Send
          </button>
        </form>
      </div>
    </section>
  );
}
