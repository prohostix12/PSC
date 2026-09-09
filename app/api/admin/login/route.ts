import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSession,
  sessionCookieOptions,
} from "../../../lib/adminAuth";
import { verifyAdminPassword } from "../../../lib/adminPassword";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  if (!(await verifyAdminPassword(String(body.password || "")))) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(
    ADMIN_SESSION_COOKIE,
    createAdminSession(),
    sessionCookieOptions
  );
  return response;
}
