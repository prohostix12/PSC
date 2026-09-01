"use client";

import { useEffect } from "react";
import styles from "./ManageNotificationsModal.module.css";
import {
  NOTIFICATION_PAGES,
  type PageNotification,
} from "../lib/pageNotificationUtils";

function EyeOpenIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M1.5 10S4.5 4 10 4s8.5 6 8.5 6-3 6-8.5 6-8.5-6-8.5-6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function EyeClosedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M1.5 10S4.5 4 10 4s8.5 6 8.5 6-3 6-8.5 6-8.5-6-8.5-6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 17 17 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

type Props = {
  open: boolean;
  onClose: () => void;
  notifications: PageNotification[];
  onToggleVisible: (notification: PageNotification) => void;
  onTogglePage: (notification: PageNotification, page: string) => void;
};

export default function ManageNotificationsModal({
  open,
  onClose,
  notifications,
  onToggleVisible,
  onTogglePage,
}: Props) {
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

  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="manage-notifications-title"
      onClick={onClose}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 id="manage-notifications-title" className={styles.title}>
            Manage Notifications
          </h2>
          <button
            type="button"
            className={styles.close}
            aria-label="Close"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div className={styles.tableWrap}>
          {notifications.length === 0 ? (
            <p className={styles.empty}>No notifications yet.</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th rowSpan={2} className={styles.notifCol}>
                    Notification
                  </th>
                  <th rowSpan={2}>Visibility</th>
                  <th colSpan={NOTIFICATION_PAGES.length} className={styles.accessHeading}>
                    Access
                  </th>
                </tr>
                <tr>
                  {NOTIFICATION_PAGES.map((page) => (
                    <th key={page} className={styles.pageCol}>
                      {page}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {notifications.map((notification) => (
                  <tr key={notification._id}>
                    <td className={styles.notifCol}>
                      {notification.message}
                    </td>
                    <td>
                      <button
                        type="button"
                        className={`${styles.eyeButton} ${
                          notification.visible ? "" : styles.eyeButtonOff
                        }`}
                        aria-pressed={notification.visible}
                        title={
                          notification.visible
                            ? "Visible in the marquee — click to hide"
                            : "Hidden from the marquee — click to show"
                        }
                        onClick={() => onToggleVisible(notification)}
                      >
                        {notification.visible ? (
                          <EyeOpenIcon />
                        ) : (
                          <EyeClosedIcon />
                        )}
                      </button>
                    </td>
                    {NOTIFICATION_PAGES.map((page) => (
                      <td key={page} className={styles.checkboxCell}>
                        <input
                          type="checkbox"
                          className={styles.checkbox}
                          checked={notification.pages.includes(page)}
                          onChange={() => onTogglePage(notification, page)}
                          aria-label={`Show on ${page}`}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
