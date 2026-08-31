"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./ContactsPanel.module.css";
import type { Contact } from "../lib/contactUtils";

function EditIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M11.3 2.3a1.4 1.4 0 0 1 2 2L5.4 12.2l-2.7.7.7-2.7 7.9-7.9Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2.5 4.5h11M6 4.5V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1.5M6.7 7.5v4M9.3 7.5v4M3.5 4.5l.6 8a1.5 1.5 0 0 0 1.5 1.4h4.8a1.5 1.5 0 0 0 1.5-1.4l.6-8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 5c0-1 .8-2 1.8-2h2.4c.5 0 1 .3 1.1.8l1 3.3c.1.4 0 .9-.3 1.2l-1.6 1.6a12 12 0 0 0 5.7 5.7l1.6-1.6c.3-.3.8-.4 1.2-.3l3.3 1c.5.1.8.6.8 1.1v2.4c0 1-.9 1.8-1.9 1.8C10.7 20 4 13.3 4 5Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function MobileIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="7" y="2.5" width="10" height="19" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.5 18.5H13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 6L12 13L20.5 6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

const emptyForm = {
  sectionName: "",
  sectionDescription: "",
  phone: "",
  secondaryPhone: "",
  email: "",
};

export default function ContactsPanel() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const isEdit = editingId !== null;

  const load = useCallback(() => {
    setStatus("loading");
    fetch("/api/contacts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load contacts");
        return res.json();
      })
      .then((data) => {
        setContacts(data.contacts || []);
        setStatus("loaded");
      })
      .catch(() => setStatus("error"));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormError("");
  };

  const startEdit = (contact: Contact) => {
    setEditingId(contact._id);
    setForm({
      sectionName: contact.sectionName,
      sectionDescription: contact.sectionDescription || "",
      phone: contact.phone || "",
      secondaryPhone: contact.secondaryPhone || "",
      email: contact.email || "",
    });
    setFormError("");
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.sectionName.trim()) {
      setFormError("Section name is required");
      return;
    }

    setSaving(true);
    setFormError("");
    try {
      const response = await fetch(
        isEdit ? `/api/contacts/${editingId}` : "/api/contacts",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to save contact");

      resetForm();
      load();
    } catch (err) {
      setFormError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (contact: Contact) => {
    if (!confirm(`Delete "${contact.sectionName}"? This can't be undone.`))
      return;

    setDeletingId(contact._id);
    try {
      const response = await fetch(`/api/contacts/${contact._id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete contact");
      if (editingId === contact._id) resetForm();
      load();
    } catch {
      alert("Couldn't delete this contact. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.pageHeading}>Our Contact</h1>
      <div className={styles.divider} />

      <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
        <p className={styles.formTitle}>
          {isEdit
            ? `Editing "${form.sectionName || "contact"}"`
            : "Create New Contact"}
        </p>

        <div className={styles.field}>
          <label htmlFor="contact-section-name" className={styles.label}>
            Section Name
          </label>
          <input
            id="contact-section-name"
            type="text"
            className={styles.input}
            placeholder="e.g. Student Affairs"
            value={form.sectionName}
            onChange={(e) =>
              setForm({ ...form, sectionName: e.target.value })
            }
          />
        </div>

        <div className={styles.field}>
          <label
            htmlFor="contact-section-description"
            className={styles.label}
          >
            Section Description
          </label>
          <textarea
            id="contact-section-description"
            rows={2}
            className={styles.textarea}
            placeholder="e.g. For Enrolled Students support, academic & university-related queries"
            value={form.sectionDescription}
            onChange={(e) =>
              setForm({ ...form, sectionDescription: e.target.value })
            }
          />
        </div>

        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label htmlFor="contact-phone" className={styles.label}>
              Phone Number
            </label>
            <input
              id="contact-phone"
              type="tel"
              className={styles.input}
              placeholder="+91 00000 00000"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="contact-secondary-phone" className={styles.label}>
              Secondary Number
            </label>
            <input
              id="contact-secondary-phone"
              type="tel"
              className={styles.input}
              placeholder="+91 00000 00000"
              value={form.secondaryPhone}
              onChange={(e) =>
                setForm({ ...form, secondaryPhone: e.target.value })
              }
            />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-email" className={styles.label}>
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            className={styles.input}
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.createButton} disabled={saving}>
            {saving
              ? isEdit
                ? "Saving..."
                : "Creating..."
              : isEdit
              ? "Save Changes"
              : "+ Create Contact"}
          </button>
          {isEdit && (
            <button
              type="button"
              className={styles.cancelButton}
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>

        {formError && <p className={styles.formError}>{formError}</p>}
      </form>

      <div className={styles.divider} />

      {status === "loading" && (
        <p className={styles.message}>Loading contacts...</p>
      )}
      {status === "error" && (
        <p className={styles.messageError}>
          Couldn&apos;t load contacts. Please refresh the page.
        </p>
      )}
      {status === "loaded" && contacts.length === 0 && (
        <p className={styles.message}>No contacts added yet.</p>
      )}

      {status === "loaded" && contacts.length > 0 && (
        <div className={styles.grid}>
          {contacts.map((contact) => (
            <div
              className={`${styles.card} ${
                editingId === contact._id ? styles.cardEditing : ""
              }`}
              key={contact._id}
            >
              <div className={styles.cardIcons}>
                <button
                  type="button"
                  className={styles.iconButton}
                  aria-label={`Update ${contact.sectionName}`}
                  onClick={() => startEdit(contact)}
                >
                  <EditIcon />
                </button>
                <button
                  type="button"
                  className={`${styles.iconButton} ${styles.iconButtonDanger}`}
                  aria-label={`Delete ${contact.sectionName}`}
                  onClick={() => handleDelete(contact)}
                  disabled={deletingId === contact._id}
                >
                  <TrashIcon />
                </button>
              </div>

              <p className={styles.cardTitle}>{contact.sectionName}</p>
              {contact.sectionDescription && (
                <p className={styles.cardDescription}>
                  {contact.sectionDescription}
                </p>
              )}

              <div className={styles.cardLines}>
                {contact.phone && (
                  <span className={styles.cardLine}>
                    <PhoneIcon />
                    {contact.phone}
                  </span>
                )}
                {contact.secondaryPhone && (
                  <span className={styles.cardLine}>
                    <MobileIcon />
                    {contact.secondaryPhone}
                  </span>
                )}
                {contact.email && (
                  <span className={styles.cardLine}>
                    <MailIcon />
                    {contact.email}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
