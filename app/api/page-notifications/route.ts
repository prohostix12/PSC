import { NextRequest, NextResponse } from "next/server";
import getClientPromise from "../../../lib/mongodb";
import { NOTIFICATION_PAGES } from "../../lib/pageNotificationUtils";

export const dynamic = "force-dynamic";

const DB_NAME = "psc";
const COLLECTION = "pageNotifications";

export async function GET(request: NextRequest) {
  try {
    const page = request.nextUrl.searchParams.get("page");
    // The public Marquee passes ?page= — only ever return notifications
    // that are switched on and granted access to that page. The admin
    // panel fetches with no ?page= so it can manage everything, including
    // hidden ones. `page` (singular) is matched too for notifications
    // created before the multi-page/visibility columns existed.
    const filter = page
      ? {
          visible: { $ne: false },
          $or: [{ pages: page }, { page }],
        }
      : {};

    const client = await getClientPromise();
    const docs = await client
      .db(DB_NAME)
      .collection(COLLECTION)
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    // Normalize older documents (single `page` string, no `visible`) to
    // the current shape so the admin UI never has to special-case them.
    const notifications = docs.map((doc) => ({
      _id: doc._id,
      message: doc.message,
      pages: Array.isArray(doc.pages)
        ? doc.pages
        : doc.page
        ? [doc.page]
        : [],
      visible: typeof doc.visible === "boolean" ? doc.visible : true,
      createdAt: doc.createdAt,
    }));

    return NextResponse.json({ notifications });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const page = String(body.page || "").trim();
    const message = String(body.message || "").trim();

    if (!NOTIFICATION_PAGES.includes(page as never)) {
      return NextResponse.json(
        { error: "Select a valid page" },
        { status: 400 }
      );
    }

    if (!message) {
      return NextResponse.json(
        { error: "Notification message is required" },
        { status: 400 }
      );
    }

    const client = await getClientPromise();
    await client
      .db(DB_NAME)
      .collection(COLLECTION)
      .insertOne({
        message,
        pages: [page],
        visible: true,
        createdAt: new Date(),
      });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
