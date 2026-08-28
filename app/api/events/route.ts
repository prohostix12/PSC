import { NextRequest, NextResponse } from "next/server";
import getClientPromise from "../../../lib/mongodb";

export const dynamic = "force-dynamic";

const DB_NAME = "psc";
const COLLECTION = "events";

export async function GET() {
  try {
    const client = await getClientPromise();
    const events = await client
      .db(DB_NAME)
      .collection(COLLECTION)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ events });
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
    const eventCategory = String(body.eventCategory || "").trim();
    const eventName = String(body.eventName || "").trim();
    const image = String(body.image || "").trim();

    if (!eventCategory) {
      return NextResponse.json(
        { error: "Event category is required" },
        { status: 400 }
      );
    }

    if (!eventName) {
      return NextResponse.json(
        { error: "Event name is required" },
        { status: 400 }
      );
    }

    const client = await getClientPromise();
    await client
      .db(DB_NAME)
      .collection(COLLECTION)
      .insertOne({ eventCategory, eventName, image, createdAt: new Date() });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
