import { NextRequest, NextResponse } from "next/server";
import { changeAdminPassword } from "../../../lib/adminPassword";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const oldPassword = String(body.oldPassword || "");
  const newPassword = String(body.newPassword || "");

  if (newPassword.length < 5) {
    return NextResponse.json(
      { error: "New password must be at least 5 characters." },
      { status: 400 }
    );
  }

  const changed = await changeAdminPassword(oldPassword, newPassword);
  if (!changed) {
    return NextResponse.json({ error: "Old password is incorrect." }, { status: 401 });
  }

  return NextResponse.json({ success: true });
}
