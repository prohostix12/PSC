"use client";

import { useCallback, useEffect, useState } from "react";
import AddEventModal from "./AddEventModal";
import EventContentEditor from "./EventContentEditor";
import styles from "./EnquiriesTable.module.css";
import type { EventItem } from "../lib/eventUtils";

export default function EventsTable() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [contentEditorFor, setContentEditorFor] = useState<EventItem | null>(
    null
  );

  const load = useCallback(() => {
    setStatus("loading");
    fetch("/api/events")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load events");
        return res.json();
      })
      .then((data) => {
        setEvents(data.events || []);
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

  const openEdit = (event: EventItem) => {
    setEditing(event);
    setModalOpen(true);
  };

  const handleDelete = async (event: EventItem) => {
    if (!confirm(`Delete "${event.eventName}"? This can't be undone.`)) return;

    setDeletingId(event._id);
    try {
      const response = await fetch(`/api/events/${event._id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete event");
      load();
    } catch {
      alert("Couldn't delete this event. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  // While editing an event's "view more" page content, swap the table out
  // for the full-page content editor.
  if (contentEditorFor) {
    return (
      <EventContentEditor
        event={
          events.find((e) => e._id === contentEditorFor._id) ??
          contentEditorFor
        }
        allEvents={events}
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
            <h1 className={styles.heading}>Events</h1>
            <p className={styles.subheading}>
              Events grouped by category, with the name shown on the site.
            </p>
          </div>
          <button
            type="button"
            className={styles.addButton}
            onClick={openAdd}
          >
            + Add Event
          </button>
        </div>
      </div>

      {status === "loading" && (
        <p className={styles.message}>Loading events...</p>
      )}

      {status === "error" && (
        <p className={styles.messageError}>
          Couldn&apos;t load events. Please refresh the page.
        </p>
      )}

      {status === "loaded" && events.length === 0 && (
        <p className={styles.message}>No events added yet.</p>
      )}

      {status === "loaded" && events.length > 0 && (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Event Category</th>
                <th>Event Name</th>
                <th>More</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td>
                    {event.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={event.image}
                        alt={event.eventName}
                        className={styles.avatar}
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>{event.eventCategory || "—"}</td>
                  <td>{event.eventName || "—"}</td>
                  <td>
                    <button
                      type="button"
                      className={styles.moreButton}
                      onClick={() => setContentEditorFor(event)}
                    >
                      More
                    </button>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        type="button"
                        className={styles.actionButton}
                        onClick={() => openEdit(event)}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className={styles.actionButtonDanger}
                        onClick={() => handleDelete(event)}
                        disabled={deletingId === event._id}
                      >
                        {deletingId === event._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddEventModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={load}
        event={editing}
      />
    </section>
  );
}
