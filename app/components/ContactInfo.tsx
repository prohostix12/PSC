"use client";

import { useEffect, useState } from "react";
import styles from "./ContactInfo.module.css";
import type { Contact } from "../lib/contactUtils";

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

const telHref = (value: string) => `tel:${value.replace(/[^\d+]/g, "")}`;

export default function ContactInfo() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );

  useEffect(() => {
    fetch("/api/contacts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load contacts");
        return res.json();
      })
      .then((data) => {
        setContacts(Array.isArray(data.contacts) ? data.contacts : []);
        setStatus("loaded");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status !== "loaded" || contacts.length === 0) return null;

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Contact Us</h2>

      <div className={styles.grid}>
        {contacts.map((contact) => (
          <div key={contact._id} className={styles.card}>
            <p className={styles.title}>{contact.sectionName}</p>

            {contact.sectionDescription && (
              <p className={styles.description}>
                {contact.sectionDescription}
              </p>
            )}

            <div className={styles.lines}>
              {contact.phone && (
                <a href={telHref(contact.phone)} className={styles.line}>
                  <PhoneIcon />
                  {contact.phone}
                </a>
              )}
              {contact.secondaryPhone && (
                <a
                  href={telHref(contact.secondaryPhone)}
                  className={styles.line}
                >
                  <MobileIcon />
                  {contact.secondaryPhone}
                </a>
              )}
              {contact.email && (
                <a href={`mailto:${contact.email}`} className={styles.line}>
                  <MailIcon />
                  {contact.email}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
