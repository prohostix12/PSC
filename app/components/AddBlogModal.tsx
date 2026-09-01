"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AdmissionModal.module.css";
import type { BlogItem } from "../lib/blogUtils";
import { compressImageToDataUrl, MAX_RAW_IMAGE_BYTES } from "../lib/imageUpload";

type Props = {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  // When set, the modal edits this blog (PATCH) instead of creating a new
  // one (POST).
  blog?: BlogItem | null;
};

const emptyForm = {
  topic: "",
  subject: "",
  uploadedDate: "",
  sectionPara: "",
  image: "",
};

export default function AddBlogModal({ open, onClose, onSaved, blog }: Props) {
  const isEdit = !!blog;
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setForm(
        blog
          ? {
              topic: blog.topic,
              subject: blog.subject,
              uploadedDate: blog.uploadedDate || "",
              sectionPara: blog.sectionPara || "",
              image: blog.image || "",
            }
          : emptyForm
      );
      setStatus("idle");
      setErrorMsg("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [open, blog]);

  if (!open) return null;

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please choose an image file");
      setStatus("error");
      return;
    }

    if (file.size > MAX_RAW_IMAGE_BYTES) {
      setErrorMsg("Image is too large (max 10MB)");
      setStatus("error");
      return;
    }

    try {
      const dataUrl = await compressImageToDataUrl(file, 800, 0.82);
      setForm((f) => ({ ...f, image: dataUrl }));
      setErrorMsg("");
      setStatus("idle");
    } catch (err) {
      setErrorMsg((err as Error).message);
      setStatus("error");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const response = await fetch(
        isEdit ? `/api/blogs/${blog!._id}` : "/api/blogs",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to save blog");

      onSaved();
      onClose();
    } catch (err) {
      setStatus("error");
      setErrorMsg((err as Error).message);
    }
  };

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-blog-title"
      onClick={onClose}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.close}
          aria-label="Close"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 id="add-blog-title" className={styles.heading}>
          {isEdit ? "Edit Blog" : "Add Blog"}
        </h2>
        <p className={styles.subheading}>
          {isEdit
            ? "Update this blog's topic, subject, date, summary, and image."
            : "Create a new blog with a topic, subject, date, summary, and image."}
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="blog-topic" className={styles.label}>
              Topic
            </label>
            <input
              id="blog-topic"
              name="topic"
              type="text"
              placeholder="e.g. Career Growth, Digital Marketing"
              className={styles.input}
              value={form.topic}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="blog-subject" className={styles.label}>
              Subject
            </label>
            <input
              id="blog-subject"
              name="subject"
              type="text"
              placeholder="e.g. How to Build a Job-Ready Portfolio"
              className={styles.input}
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="blog-date" className={styles.label}>
              Uploaded Date
            </label>
            <input
              id="blog-date"
              name="uploadedDate"
              type="date"
              className={styles.input}
              value={form.uploadedDate}
              onChange={(e) =>
                setForm({ ...form, uploadedDate: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="blog-section-para" className={styles.label}>
              Section Paragraph
            </label>
            <textarea
              id="blog-section-para"
              name="sectionPara"
              placeholder="Short summary shown on the blog card"
              className={styles.textarea}
              value={form.sectionPara}
              onChange={(e) =>
                setForm({ ...form, sectionPara: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="blog-image" className={styles.label}>
              Image
            </label>
            <div className={styles.imageRow}>
              {form.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={form.image} alt="" className={styles.imagePreview} />
              )}
              <div className={styles.imageActions}>
                <input
                  ref={fileInputRef}
                  id="blog-image"
                  name="image"
                  type="file"
                  accept="image/*"
                  className={styles.fileInput}
                  onChange={handleImageChange}
                />
                {form.image && (
                  <button
                    type="button"
                    className={styles.removeImage}
                    onClick={() => {
                      setForm({ ...form, image: "" });
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className={styles.submit}
            disabled={status === "sending"}
          >
            {status === "sending"
              ? isEdit
                ? "Saving..."
                : "Adding..."
              : isEdit
              ? "Save Changes"
              : "Add Blog"}
          </button>

          {status === "error" && (
            <p className={styles.statusMessageError}>{errorMsg}</p>
          )}
        </form>
      </div>
    </div>
  );
}
