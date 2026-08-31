"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./SuccessStoriesPanel.module.css";
import { compressImageToDataUrl, MAX_RAW_IMAGE_BYTES } from "../lib/imageUpload";
import type { SuccessCategory } from "../lib/successStoryUtils";

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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

async function filesToDataUrls(files: FileList): Promise<string[]> {
  const out: string[] = [];
  for (const file of Array.from(files)) {
    if (!file.type.startsWith("image/")) continue;
    if (file.size > MAX_RAW_IMAGE_BYTES) continue;
    out.push(await compressImageToDataUrl(file, 900, 0.8));
  }
  return out;
}

export default function SuccessStoriesPanel() {
  const [categories, setCategories] = useState<SuccessCategory[]>([]);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );

  const [newCategoryName, setNewCategoryName] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [editingName, setEditingName] = useState("");

  const [busyCategoryId, setBusyCategoryId] = useState<string | null>(null);
  const [busyImageId, setBusyImageId] = useState<string | null>(null);

  const load = useCallback(() => {
    setStatus("loading");
    fetch("/api/success-categories")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load categories");
        return res.json();
      })
      .then((data) => {
        setCategories(data.categories || []);
        setStatus("loaded");
      })
      .catch(() => setStatus("error"));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleCreateCategory = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      setCreateError("Category name is required");
      return;
    }

    setCreating(true);
    setCreateError("");
    try {
      const response = await fetch("/api/success-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to create category");

      setNewCategoryName("");
      load();
    } catch (err) {
      setCreateError((err as Error).message);
    } finally {
      setCreating(false);
    }
  };

  const startRename = (category: SuccessCategory) => {
    setEditingCategoryId(category._id);
    setEditingName(category.name);
  };

  const saveRename = async (id: string) => {
    if (!editingName.trim()) return;
    setBusyCategoryId(id);
    try {
      const response = await fetch(`/api/success-categories/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editingName }),
      });
      if (!response.ok) throw new Error("Failed to rename category");
      setEditingCategoryId(null);
      load();
    } catch {
      alert("Couldn't rename this category. Please try again.");
    } finally {
      setBusyCategoryId(null);
    }
  };

  const deleteCategory = async (category: SuccessCategory) => {
    if (
      !confirm(
        `Delete the "${category.name}" category and all its images? This can't be undone.`
      )
    )
      return;

    setBusyCategoryId(category._id);
    try {
      const response = await fetch(
        `/api/success-categories/${category._id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete category");
      load();
    } catch {
      alert("Couldn't delete this category. Please try again.");
    } finally {
      setBusyCategoryId(null);
    }
  };

  const handleAddImages = async (
    categoryId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    e.target.value = "";
    if (!files || files.length === 0) return;

    setBusyCategoryId(categoryId);
    try {
      const images = await filesToDataUrls(files);
      if (images.length === 0) return;

      const response = await fetch(
        `/api/success-categories/${categoryId}/images`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ images }),
        }
      );
      if (!response.ok) throw new Error("Failed to upload images");
      load();
    } catch {
      alert("Couldn't upload those images. Please try again.");
    } finally {
      setBusyCategoryId(null);
    }
  };

  const handleReplaceImage = async (
    categoryId: string,
    imageId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setBusyImageId(imageId);
    try {
      const dataUrl = await compressImageToDataUrl(file, 900, 0.8);
      const response = await fetch(
        `/api/success-categories/${categoryId}/images/${imageId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: dataUrl }),
        }
      );
      if (!response.ok) throw new Error("Failed to update image");
      load();
    } catch {
      alert("Couldn't update this image. Please try again.");
    } finally {
      setBusyImageId(null);
    }
  };

  const deleteImage = async (categoryId: string, imageId: string) => {
    if (!confirm("Delete this image? This can't be undone.")) return;

    setBusyImageId(imageId);
    try {
      const response = await fetch(
        `/api/success-categories/${categoryId}/images/${imageId}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete image");
      load();
    } catch {
      alert("Couldn't delete this image. Please try again.");
    } finally {
      setBusyImageId(null);
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.pageHeading}>Our Success</h1>
      <div className={styles.divider} />

      <form className={styles.form} onSubmit={handleCreateCategory}>
        <div className={styles.field}>
          <label htmlFor="new-category-name" className={styles.label}>
            Create New Category
          </label>
          <input
            id="new-category-name"
            type="text"
            className={styles.input}
            placeholder="e.g. Placement Success Stories"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.createButton} disabled={creating}>
          {creating ? "Creating..." : "Create"}
        </button>
        {createError && <p className={styles.formError}>{createError}</p>}
      </form>

      <div className={styles.divider} />

      {status === "loading" && (
        <p className={styles.message}>Loading categories...</p>
      )}
      {status === "error" && (
        <p className={styles.messageError}>
          Couldn&apos;t load categories. Please refresh the page.
        </p>
      )}
      {status === "loaded" && categories.length === 0 && (
        <p className={styles.message}>No categories added yet.</p>
      )}

      {status === "loaded" && categories.length > 0 && (
        <div className={styles.categoryList}>
          {categories.map((category) => (
            <section className={styles.categoryCard} key={category._id}>
              <div className={styles.categoryHeader}>
                {editingCategoryId === category._id ? (
                  <div className={styles.renameRow}>
                    <input
                      type="text"
                      className={styles.input}
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      autoFocus
                    />
                    <button
                      type="button"
                      className={styles.smallButton}
                      onClick={() => saveRename(category._id)}
                      disabled={busyCategoryId === category._id}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className={styles.smallButtonGhost}
                      onClick={() => setEditingCategoryId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className={styles.categoryName}>{category.name}</h2>
                    <div className={styles.categoryActions}>
                      <button
                        type="button"
                        className={styles.iconButton}
                        aria-label={`Update ${category.name}`}
                        onClick={() => startRename(category)}
                      >
                        <EditIcon />
                      </button>
                      <button
                        type="button"
                        className={`${styles.iconButton} ${styles.iconButtonDanger}`}
                        aria-label={`Delete ${category.name}`}
                        onClick={() => deleteCategory(category)}
                        disabled={busyCategoryId === category._id}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </>
                )}
              </div>

              {category.images.length > 0 && (
                <div className={styles.imageGrid}>
                  {category.images.map((image) => (
                    <div className={styles.imageThumb} key={image.id}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={image.src} alt="" className={styles.imageThumbImg} />
                      <div className={styles.imageThumbActions}>
                        <label className={styles.imageIconButton} title="Update image">
                          <EditIcon />
                          <input
                            type="file"
                            accept="image/*"
                            className={styles.hiddenFileInput}
                            onChange={(e) =>
                              handleReplaceImage(category._id, image.id, e)
                            }
                          />
                        </label>
                        <button
                          type="button"
                          className={`${styles.imageIconButton} ${styles.imageIconButtonDanger}`}
                          title="Delete image"
                          onClick={() => deleteImage(category._id, image.id)}
                          disabled={busyImageId === image.id}
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <label className={styles.addImagesButton}>
                {busyCategoryId === category._id
                  ? "Uploading..."
                  : "+ Add Images"}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className={styles.hiddenFileInput}
                  onChange={(e) => handleAddImages(category._id, e)}
                  disabled={busyCategoryId === category._id}
                />
              </label>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
