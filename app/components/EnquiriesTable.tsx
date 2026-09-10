"use client";

import { useEffect, useState } from "react";
import styles from "./EnquiriesTable.module.css";

type Enquiry = {
  _id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  source: string;
  createdAt: string;
};

export default function EnquiriesTable() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );

  useEffect(() => {
    fetch("/api/enquiries")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load enquiries");
        return res.json();
      })
      .then((data) => {
        setEnquiries(data.enquiries || []);
        setStatus("loaded");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Enquiries</h1>
        <p className={styles.subheading}>
          Submissions from the Make Your Enquiry, Get a Free Consultation,
          and Send your Query forms.
        </p>
      </div>

      {status === "loading" && (
        <p className={styles.message}>Loading enquiries...</p>
      )}

      {status === "error" && (
        <p className={styles.messageError}>
          Couldn&apos;t load enquiries. Please refresh the page.
        </p>
      )}

      {status === "loaded" && enquiries.length === 0 && (
        <p className={styles.message}>No enquiries submitted yet.</p>
      )}

      {status === "loaded" && enquiries.length > 0 && (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Company</th>
                <th>Enquiry</th>
                <th>Source</th>
                <th>Submitted</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enquiry) => (
                <tr key={enquiry._id}>
                  <td>{enquiry.firstName || enquiry.name || "—"}</td>
                  <td>{enquiry.lastName || "—"}</td>
                  <td>{enquiry.phone}</td>
                  <td>{enquiry.email}</td>
                  <td>{enquiry.company || "—"}</td>
                  <td>{enquiry.message || "—"}</td>
                  <td>{enquiry.source || "—"}</td>
                  <td>
                    {enquiry.createdAt
                      ? new Date(enquiry.createdAt).toLocaleString()
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
