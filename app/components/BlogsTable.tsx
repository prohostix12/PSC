"use client";

import { useCallback, useEffect, useState } from "react";
import AddBlogModal from "./AddBlogModal";
import BlogContentEditor from "./BlogContentEditor";
import styles from "./EnquiriesTable.module.css";
import { formatBlogDate, type BlogItem } from "../lib/blogUtils";

export default function BlogsTable() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<BlogItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [contentEditorFor, setContentEditorFor] = useState<BlogItem | null>(
    null
  );

  const load = useCallback(() => {
    setStatus("loading");
    fetch("/api/blogs")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load blogs");
        return res.json();
      })
      .then((data) => {
        setBlogs(data.blogs || []);
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

  const openEdit = (blog: BlogItem) => {
    setEditing(blog);
    setModalOpen(true);
  };

  const handleDelete = async (blog: BlogItem) => {
    if (!confirm(`Delete "${blog.subject}"? This can't be undone.`)) return;

    setDeletingId(blog._id);
    try {
      const response = await fetch(`/api/blogs/${blog._id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete blog");
      load();
    } catch {
      alert("Couldn't delete this blog. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  // While editing a blog's "view more" page content, swap the table out for
  // the full-page content editor.
  if (contentEditorFor) {
    return (
      <BlogContentEditor
        blog={
          blogs.find((b) => b._id === contentEditorFor._id) ??
          contentEditorFor
        }
        allBlogs={blogs}
        onBack={() => setContentEditorFor(null)}
        onSaved={load}
      />
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.heading}>Blogs</h1>
            <p className={styles.subheading}>
              Blogs grouped by topic, with the subject shown on the site.
            </p>
          </div>
          <button type="button" className={styles.addButton} onClick={openAdd}>
            + Add Blog
          </button>
        </div>
      </div>

      {status === "loading" && (
        <p className={styles.message}>Loading blogs...</p>
      )}

      {status === "error" && (
        <p className={styles.messageError}>
          Couldn&apos;t load blogs. Please refresh the page.
        </p>
      )}

      {status === "loaded" && blogs.length === 0 && (
        <p className={styles.message}>No blogs added yet.</p>
      )}

      {status === "loaded" && blogs.length > 0 && (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Topic</th>
                <th>Subject</th>
                <th>Uploaded Date</th>
                <th>More</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id}>
                  <td>
                    {blog.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={blog.image}
                        alt={blog.subject}
                        className={styles.avatar}
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>{blog.topic || "—"}</td>
                  <td>{blog.subject || "—"}</td>
                  <td>{formatBlogDate(blog.uploadedDate) || "—"}</td>
                  <td>
                    <button
                      type="button"
                      className={styles.moreButton}
                      onClick={() => setContentEditorFor(blog)}
                    >
                      More
                    </button>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        type="button"
                        className={styles.actionButton}
                        onClick={() => openEdit(blog)}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className={styles.actionButtonDanger}
                        onClick={() => handleDelete(blog)}
                        disabled={deletingId === blog._id}
                      >
                        {deletingId === blog._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddBlogModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={load}
        blog={editing}
      />
    </section>
  );
}
