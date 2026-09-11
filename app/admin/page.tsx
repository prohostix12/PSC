import { cookies } from "next/headers";
import AdminDashboard from "../components/AdminDashboard";
import AdminLogin from "../components/AdminLogin";
import AdminSessionGate from "../components/AdminSessionGate";
import {
  ADMIN_SESSION_COOKIE,
  isValidAdminSession,
} from "../lib/adminAuth";

import { Metadata } from "next";
import { getPrograms } from "../lib/programs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Panel",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPanel() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  const programs = isValidAdminSession(session) ? await getPrograms().catch(() => []) : undefined;

  return isValidAdminSession(session) ? (
    <AdminSessionGate>
      <AdminDashboard initialPrograms={programs} />
    </AdminSessionGate>
  ) : (
    <AdminLogin />
  );
}
