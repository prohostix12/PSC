import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSession,
  getAdminPassword,
  sessionCookieOptions,
} from "../../../lib/adminAuth";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  if (String(body.password || "") !== getAdminPassword()) {
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
