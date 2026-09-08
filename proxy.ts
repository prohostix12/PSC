import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  isAdminApiPath,
  isValidAdminSession,
} from "./app/lib/adminAuth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isAdminApiPath(pathname) || pathname === "/api/admin/login" || pathname === "/api/admin/logout") {
    return NextResponse.next();
  }

  // Public GET endpoints feed the public site; protect admin mutations.
  if (request.method === "GET") return NextResponse.next();

  const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (isValidAdminSession(session)) return NextResponse.next();

  return NextResponse.json({ error: "Admin authentication required" }, { status: 401 });
}

export const config = {
  matcher: ["/api/:path*"],
};
