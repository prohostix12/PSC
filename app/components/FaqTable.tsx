"use client";

import { useCallback, useEffect, useState } from "react";
import AddFaqModal from "./AddFaqModal";
import styles from "./EnquiriesTable.module.css";
import type { Faq } from "../lib/faqUtils";

export default function FaqTable() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Faq | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = useCallback(() => {
    setStatus("loading");
    fetch("/api/faqs")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load FAQs");
        return res.json();
      })
      .then((data) => {
        setFaqs(data.faqs || []);
        setStatus("loaded");
      })
      .catch(() => setStatus("error"));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (faq: Faq) => {
    setEditing(faq);
    setModalOpen(true);
  };

  const handleDelete = async (faq: Faq) => {
    if (!confirm(`Delete this FAQ — "${faq.question}"? This can't be undone.`))
      return;

    setDeletingId(faq._id);
    try {
      const response = await fetch(`/api/faqs/${faq._id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete FAQ");
      load();
    } catch {
      alert("Couldn't delete this FAQ. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.heading}>FAQ</h1>
            <p className={styles.subheading}>
              Frequently asked questions shown across the site.
            </p>
          </div>
          <button
            type="button"
            className={styles.addButton}
            onClick={openAdd}
          >
            + Create New FAQ
          </button>
        </div>
      </div>

      {status === "loading" && (
        <p className={styles.message}>Loading FAQs...</p>
      )}

      {status === "error" && (
        <p className={styles.messageError}>
          Couldn&apos;t load FAQs. Please refresh the page.
        </p>
      )}

      {status === "loaded" && faqs.length === 0 && (
        <p className={styles.message}>No FAQs added yet.</p>
      )}

      {status === "loaded" && faqs.length > 0 && (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Question</th>
                <th>Answer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {faqs.map((faq) => (
                <tr key={faq._id}>
                  <td>{faq.question || "—"}</td>
                  <td className={styles.reviewCell}>{faq.answer || "—"}</td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        type="button"
                        className={styles.actionButton}
                        onClick={() => openEdit(faq)}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className={styles.actionButtonDanger}
                        onClick={() => handleDelete(faq)}
                        disabled={deletingId === faq._id}
                      >
                        {deletingId === faq._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddFaqModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={load}
        faq={editing}
      />
    </section>
  );
}
