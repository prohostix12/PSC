import { cookies } from "next/headers";
import AdminDashboard from "../components/AdminDashboard";
import AdminLogin from "../components/AdminLogin";
import AdminSessionGate from "../components/AdminSessionGate";
import {
  ADMIN_SESSION_COOKIE,
  isValidAdminSession,
} from "../lib/adminAuth";

export const dynamic = "force-dynamic";

export default async function AdminPanel() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  return isValidAdminSession(session) ? (
    <AdminSessionGate>
      <AdminDashboard />
    </AdminSessionGate>
  ) : (
    <AdminLogin />
  );
}
