"use client";

import { useEffect, useState } from "react";
import SketchFrame from "./SketchFrame";
import styles from "./BlogsGrid.module.css";
import { blogSlug, formatBlogDate, type BlogItem } from "../lib/blogUtils";

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BlogsGrid() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load blogs");
        return res.json();
      })
      .then((data) => {
        setBlogs(Array.isArray(data.blogs) ? data.blogs : []);
        setStatus("loaded");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status !== "loaded" || blogs.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.label}>From the Blog</p>
        <h2 className={styles.heading}>Latest Articles</h2>
      </div>

      <div className={styles.grid}>
        {blogs.map((blog) => (
          <article key={blog._id} className={styles.card}>
            <SketchFrame rx={18} />

            <div className={styles.thumb}>
              {blog.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={blog.image} alt={blog.subject} className={styles.thumbImage} />
              )}
            </div>

            <div className={styles.body}>
              <div className={styles.meta}>
                <span className={styles.category}>{blog.topic}</span>
                <span className={styles.date}>
                  {formatBlogDate(blog.uploadedDate)}
                </span>
              </div>

              <h3 className={styles.title}>{blog.subject}</h3>
              <p className={styles.excerpt}>{blog.sectionPara}</p>

              <a
                href={`/blogs/${blogSlug(blog.subject)}`}
                className={styles.viewButton}
              >
                View Blog
                <ArrowIcon />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
