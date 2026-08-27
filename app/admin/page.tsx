"use client";

import { useState } from "react";
import AdminNavbar, { type AdminView } from "../components/AdminNavbar";
import EnquiriesTable from "../components/EnquiriesTable";
import ProgramsTable from "../components/ProgramsTable";
import ReviewsTable from "../components/ReviewsTable";
import styles from "./page.module.css";

export default function AdminPanel() {
  const [view, setView] = useState<AdminView>("enquiries");

  return (
    <div className={styles.page}>
      <AdminNavbar active={view} onSelect={setView} />

      <main className={styles.content}>
        {view === "enquiries" && <EnquiriesTable />}
        {view === "programs" && <ProgramsTable />}
        {view === "reviews" && <ReviewsTable />}
      </main>
    </div>
  );
}
