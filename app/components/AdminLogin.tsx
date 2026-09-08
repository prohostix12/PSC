"use client";

import { FormEvent, useState } from "react";
import PageBackground from "./PageBackground";
import styles from "./AdminLogin.module.css";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) throw new Error("Incorrect password.");
      window.location.reload();
    } catch (loginError) {
      setError((loginError as Error).message);
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <PageBackground />
      <form className={styles.card} onSubmit={handleSubmit}>
        <p className={styles.eyebrow}>Professional Skill Campus</p>
        <h1 className={styles.heading}>Admin Panel</h1>
        <p className={styles.copy}>Enter the admin password to continue.</p>
        <label className={styles.label} htmlFor="admin-password">Password</label>
        <div className={styles.passwordField}>
          <input
            id="admin-password"
            className={styles.input}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            autoFocus
            required
          />
          <button
            type="button"
            className={styles.eyeButton}
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((visible) => !visible)}
          >
            {showPassword ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A10.7 10.7 0 0 1 12 5c5.2 0 8.6 4.6 9.8 7a18 18 0 0 1-3.1 4.1M6.2 6.2A17.4 17.4 0 0 0 2.2 12c1.2 2.4 4.6 7 9.8 7 1.1 0 2.2-.2 3.1-.6" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2.2 12S5.6 5 12 5s9.8 7 9.8 7-3.4 7-9.8 7-9.8-7-9.8-7Z" />
                <circle cx="12" cy="12" r="2.5" />
              </svg>
            )}
          </button>
        </div>
        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? "Checking..." : "Open Admin Panel"}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </main>
  );
}
