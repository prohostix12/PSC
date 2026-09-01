import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import getClientPromise from "../../../../lib/mongodb";
import { NOTIFICATION_PAGES } from "../../../lib/pageNotificationUtils";

export const dynamic = "force-dynamic";

const DB_NAME = "psc";
const COLLECTION = "pageNotifications";

// Used by the "Manage Notification" modal — flips the Visibility eye
// toggle and/or the per-page Access checkboxes for one notification.
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid notification id" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const setDoc: Record<string, unknown> = {};

    if (typeof body.visible === "boolean") {
      setDoc.visible = body.visible;
    }

    if (Array.isArray(body.pages)) {
      const pages = body.pages
        .map((p: unknown) => String(p))
        .filter((p: string) => NOTIFICATION_PAGES.includes(p as never));
      setDoc.pages = pages;
    }

    if (Object.keys(setDoc).length === 0) {
      return NextResponse.json(
        { error: "Nothing to update" },
        { status: 400 }
      );
    }

    setDoc.updatedAt = new Date();

    const client = await getClientPromise();
    const result = await client
      .db(DB_NAME)
      .collection(COLLECTION)
      .updateOne({ _id: new ObjectId(id) }, { $set: setDoc });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid notification id" },
        { status: 400 }
      );
    }

    const client = await getClientPromise();
    const result = await client
      .db(DB_NAME)
      .collection(COLLECTION)
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
