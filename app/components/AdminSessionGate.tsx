"use client";

import { useEffect, useState } from "react";
import AdminLogin from "./AdminLogin";
import type { ReactNode } from "react";
import styles from "./AdminSessionGate.module.css";
import { ADMIN_TAB_SESSION } from "../lib/adminSession";

type Props = {
  children: ReactNode;
};

export default function AdminSessionGate({ children }: Props) {
  const [tabAuthenticated, setTabAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (window.sessionStorage.getItem(ADMIN_TAB_SESSION) === "active") {
      setTabAuthenticated(true);
      return;
    }

    fetch("/api/admin/logout", { method: "POST" })
      .catch(() => {})
      .finally(() => setTabAuthenticated(false));
  }, []);

  if (tabAuthenticated === null) {
    return <main className={styles.loading} aria-label="Loading admin panel" />;
  }

  return tabAuthenticated ? <>{children}</> : <AdminLogin />;
}

