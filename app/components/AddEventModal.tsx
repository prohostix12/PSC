"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AdmissionModal.module.css";
import type { EventItem } from "../lib/eventUtils";
import { compressImageToDataUrl, MAX_RAW_IMAGE_BYTES } from "../lib/imageUpload";

type Props = {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  // When set, the modal edits this event (PATCH) instead of creating a
  // new one (POST).
  event?: EventItem | null;
};

const emptyForm = { eventCategory: "", eventName: "", image: "" };

export default function AddEventModal({
  open,
  onClose,
  onSaved,
  event,
}: Props) {
  const isEdit = !!event;
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
        event
          ? {
              eventCategory: event.eventCategory,
              eventName: event.eventName,
              image: event.image || "",
            }
          : emptyForm
      );
      setStatus("idle");
      setErrorMsg("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [open, event]);

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
      // Event photos are shown wider than an avatar, so keep more detail.
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
        isEdit ? `/api/events/${event!._id}` : "/api/events",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to save event");

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
      aria-labelledby="add-event-title"
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

        <h2 id="add-event-title" className={styles.heading}>
          {isEdit ? "Edit Event" : "Add Event"}
        </h2>
        <p className={styles.subheading}>
          {isEdit
            ? "Update this event's category, name, and image."
            : "Create a new event with a category, name, and image."}
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="event-category" className={styles.label}>
              Event Category
            </label>
            <input
              id="event-category"
              name="eventCategory"
              type="text"
              placeholder="e.g. Workshop, Webinar, Graduation Day"
              className={styles.input}
              value={form.eventCategory}
              onChange={(e) =>
                setForm({ ...form, eventCategory: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="event-name" className={styles.label}>
              Event Name
            </label>
            <input
              id="event-name"
              name="eventName"
              type="text"
              placeholder="e.g. AI Career Bootcamp"
              className={styles.input}
              value={form.eventName}
              onChange={(e) =>
                setForm({ ...form, eventName: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="event-image" className={styles.label}>
              Image
            </label>
            <div className={styles.imageRow}>
              {form.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={form.image}
                  alt=""
                  className={styles.imagePreview}
                />
              )}
              <div className={styles.imageActions}>
                <input
                  ref={fileInputRef}
                  id="event-image"
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
              : "Add Event"}
          </button>

          {status === "error" && (
            <p className={styles.statusMessageError}>{errorMsg}</p>
          )}
        </form>
      </div>
    </div>
  );
}
