"use client";

import { FormEvent, useEffect, useState } from "react";
import styles from "./Integration.module.css";

export default function Integration() {
  const [apiKey, setApiKey] = useState("");
  const [endpointUrl, setEndpointUrl] = useState("");
  const [hasApiKey, setHasApiKey] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "saving" | "saved" | "error">("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/integration")
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Could not load integration settings.");
        setEndpointUrl(data.endpointUrl || "");
        setHasApiKey(Boolean(data.hasApiKey));
        setStatus("idle");
      })
      .catch((loadError: Error) => {
        setError(loadError.message);
        setStatus("error");
      });
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("saving");
    setError("");

    try {
      const response = await fetch("/api/admin/integration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey, endpointUrl }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not save integration settings.");

      setApiKey("");
      setHasApiKey(true);
      setStatus("saved");
    } catch (saveError) {
      setError((saveError as Error).message);
      setStatus("error");
    }
  };

  return (
    <section className={styles.section}>
      <p className={styles.eyebrow}>Admin Integration</p>
      <h1 className={styles.heading}>Integration</h1>
      <p className={styles.subheading}>Configure CRM connection details.</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="crm-api-key">
          CRM API Key
        </label>
        <input
          id="crm-api-key"
          className={styles.input}
          type="password"
          value={apiKey}
          onChange={(event) => setApiKey(event.target.value)}
          placeholder={hasApiKey ? "Saved API key (enter to replace)" : "Enter CRM API key"}
        />

        <label className={styles.label} htmlFor="crm-endpoint-url">
          CRM Endpoint URL
        </label>
        <input
          id="crm-endpoint-url"
          className={styles.input}
          type="url"
          value={endpointUrl}
          onChange={(event) => setEndpointUrl(event.target.value)}
          placeholder="https://your-crm-endpoint.com"
          required
        />

        <button className={styles.button} type="submit" disabled={status === "loading" || status === "saving"}>
          {status === "saving" ? "Saving..." : "Save"}
        </button>

        {status === "saved" && <p className={styles.success}>CRM integration settings saved.</p>}
        {status === "error" && <p className={styles.error}>{error}</p>}
      </form>
    </section>
  );
}