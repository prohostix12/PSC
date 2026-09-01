"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./NotificationsPanel.module.css";
import ManageNotificationsModal from "./ManageNotificationsModal";
import {
  NOTIFICATION_PAGES,
  type PageNotification,
} from "../lib/pageNotificationUtils";

export default function NotificationsPanel() {
  const [notifications, setNotifications] = useState<PageNotification[]>([]);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );

  const [selectedPage, setSelectedPage] = useState("");
  const [message, setMessage] = useState("");
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [manageOpen, setManageOpen] = useState(false);

  const load = useCallback(() => {
    setStatus("loading");
    fetch("/api/page-notifications")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load notifications");
        return res.json();
      })
      .then((data) => {
        setNotifications(data.notifications || []);
        setStatus("loaded");
      })
      .catch(() => setStatus("error"));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedPage) {
      setFormError("Select a page first");
      return;
    }
    if (!message.trim()) {
      setFormError("Notification message is required");
      return;
    }

    setCreating(true);
    setFormError("");
    try {
      const response = await fetch("/api/page-notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: selectedPage, message }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to add notification");

      setMessage("");
      load();
    } catch (err) {
      setFormError((err as Error).message);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (notification: PageNotification) => {
    if (!confirm("Delete this notification? This can't be undone.")) return;

    setDeletingId(notification._id);
    try {
      const response = await fetch(
        `/api/page-notifications/${notification._id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete notification");
      load();
    } catch {
      alert("Couldn't delete this notification. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  // Optimistically update local state, then persist — so the modal's
  // checkboxes/eye toggle feel instant instead of waiting on a reload.
  const patchNotification = async (
    id: string,
    patch: { visible?: boolean; pages?: string[] }
  ) => {
    setNotifications((current) =>
      current.map((n) => (n._id === id ? { ...n, ...patch } : n))
    );
    try {
      const response = await fetch(`/api/page-notifications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!response.ok) throw new Error();
    } catch {
      alert("Couldn't save that change. Refreshing the list.");
      load();
    }
  };

  const handleToggleVisible = (notification: PageNotification) => {
    patchNotification(notification._id, { visible: !notification.visible });
  };

  const handleTogglePage = (notification: PageNotification, page: string) => {
    const hasPage = notification.pages.includes(page);
    const nextPages = hasPage
      ? notification.pages.filter((p) => p !== page)
      : [...notification.pages, page];
    patchNotification(notification._id, { pages: nextPages });
  };

  // "Notifications" table grouped separately per page — a notification
  // with access to multiple pages shows up in each of those groups.
  const groupedByPage = NOTIFICATION_PAGES.map((page) => ({
    page,
    items: notifications.filter((n) => n.pages.includes(page)),
  })).filter((group) => group.items.length > 0);

  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <h1 className={styles.pageHeading}>Notifications</h1>
        <button
          type="button"
          className={styles.manageButton}
          onClick={() => setManageOpen(true)}
        >
          Manage Notification
        </button>
      </div>
      <div className={styles.divider} />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="notif-page" className={styles.label}>
            Select Page
          </label>
          <select
            id="notif-page"
            className={styles.select}
            value={selectedPage}
            onChange={(e) => {
              setSelectedPage(e.target.value);
              setFormError("");
            }}
          >
            <option value="">Select a page</option>
            {NOTIFICATION_PAGES.map((page) => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="notif-message" className={styles.label}>
            Add Notification
          </label>
          <input
            id="notif-message"
            type="text"
            className={styles.input}
            placeholder={
              selectedPage
                ? "Type the notification message"
                : "Select a page first"
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={!selectedPage}
          />
        </div>

        <button
          type="submit"
          className={styles.addButton}
          disabled={!selectedPage || !message.trim() || creating}
        >
          {creating ? "Adding..." : "+ Add"}
        </button>

        {formError && <p className={styles.formError}>{formError}</p>}
      </form>

      <div className={styles.divider} />

      <h2 className={styles.tableHeading}>Notifications</h2>

      {status === "loading" && (
        <p className={styles.message}>Loading notifications...</p>
      )}
      {status === "error" && (
        <p className={styles.messageError}>
          Couldn&apos;t load notifications. Please refresh the page.
        </p>
      )}
      {status === "loaded" && groupedByPage.length === 0 && (
        <p className={styles.message}>No notifications added yet.</p>
      )}

      {status === "loaded" && groupedByPage.length > 0 && (
        <div className={styles.groupList}>
          {groupedByPage.map((group) => (
            <div className={styles.groupCard} key={group.page}>
              <h3 className={styles.groupHeading}>{group.page}</h3>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Page</th>
                      <th>Notification</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.items.map((notification) => (
                      <tr key={notification._id}>
                        <td>{group.page}</td>
                        <td>{notification.message}</td>
                        <td>
                          <button
                            type="button"
                            className={styles.deleteButton}
                            onClick={() => handleDelete(notification)}
                            disabled={deletingId === notification._id}
                          >
                            {deletingId === notification._id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      <ManageNotificationsModal
        open={manageOpen}
        onClose={() => setManageOpen(false)}
        notifications={notifications}
        onToggleVisible={handleToggleVisible}
        onTogglePage={handleTogglePage}
      />
    </div>
  );
}
