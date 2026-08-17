import SketchFrame from "./SketchFrame";
import styles from "./ConsultationForm.module.css";

export default function ConsultationForm() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.label}>Free Consultation</p>
        <h2 className={styles.heading}>Get a Free Consultation</h2>
        <p className={styles.subheading}>
          Fill in your details and a career counsellor will get back to you
          within 24 hours — no cost, no obligation.
        </p>
      </div>

      <div className={styles.card}>
        <SketchFrame rx={24} />

        <form className={styles.form}>
          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label htmlFor="consult-name" className={styles.fieldLabel}>
                Name
              </label>
              <input
                id="consult-name"
                name="name"
                type="text"
                placeholder="Your name"
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="consult-phone" className={styles.fieldLabel}>
                Phone
              </label>
              <input
                id="consult-phone"
                name="phone"
                type="tel"
                placeholder="+91 00000 00000"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="consult-email" className={styles.fieldLabel}>
              Email
            </label>
            <input
              id="consult-email"
              name="email"
              type="email"
              placeholder="your@email.com"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="consult-message" className={styles.fieldLabel}>
              Message
            </label>
            <textarea
              id="consult-message"
              name="message"
              rows={4}
              placeholder="Tell us what you're looking for..."
              className={styles.textarea}
            ></textarea>
          </div>

          <button type="submit" className={styles.submit}>
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
