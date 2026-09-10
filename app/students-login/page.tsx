import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import PageBackground from "../components/PageBackground";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Students Login | Professional Skill Campus",
  description: "Sign in to your Professional Skill Campus student account.",
  alternates: {
    canonical: "/students-login",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudentsLoginPage() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <PageBackground />
        <section className={styles.loginSection} aria-labelledby="students-login-heading">
          <div className={styles.inspiration}>
            <h1 className={styles.quote}>
              &ldquo;Your unfinished chapter is still part of your story. Keep going.&rdquo;
            </h1>
            <p className={styles.quoteNote}>Your next step starts here.</p>
          </div>

          <div className={styles.card}>
            <p className={styles.cardEyebrow}>Student Portal</p>
            <h2 id="students-login-heading" className={styles.heading}>
              Students Login
            </h2>
            <p className={styles.subheading}>
              Enter your details to access your learning space.
            </p>

            <form className={styles.form}>
              <label className={styles.label} htmlFor="student-email">
                Email
              </label>
              <input
                id="student-email"
                name="email"
                type="email"
                className={styles.input}
                placeholder="you@example.com"
              />

              <label className={styles.label} htmlFor="student-password">
                Password
              </label>
              <input
                id="student-password"
                name="password"
                type="password"
                className={styles.input}
                placeholder="Enter your password"
              />

              <button className={styles.button} type="button">
                Login
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}