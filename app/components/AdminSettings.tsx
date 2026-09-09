"use client";

import { FormEvent, useState } from "react";
import styles from "./AdminSettings.module.css";

export default function AdminSettings() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("/api/admin/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not change password.");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setMessage("Admin password changed successfully.");
    } catch (saveError) {
      setError((saveError as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className={styles.section}>
      <p className={styles.eyebrow}>Admin Settings</p>
      <h1 className={styles.heading}>Change Password</h1>
      <p className={styles.subheading}>Use your current password to set a new admin password.</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="admin-old-password">Old Password</label>
        <input id="admin-old-password" className={styles.input} type="password" value={oldPassword} onChange={(event) => setOldPassword(event.target.value)} required />
        <label className={styles.label} htmlFor="admin-new-password">New Password</label>
        <input id="admin-new-password" className={styles.input} type="password" minLength={5} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} required />
        <label className={styles.label} htmlFor="admin-confirm-password">Confirm New Password</label>
        <input id="admin-confirm-password" className={styles.input} type="password" minLength={5} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />
        <button className={styles.button} type="submit" disabled={saving}>
          {saving ? "Changing..." : "Change Password"}
        </button>
        {message && <p className={styles.success}>{message}</p>}
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </section>
  );
}
