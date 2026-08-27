import { NextRequest, NextResponse } from "next/server";
import getClientPromise from "../../../lib/mongodb";

export const dynamic = "force-dynamic";

const DB_NAME = "psc";
const COLLECTION = "programs";

const CATEGORIES = ["Online", "Offline"];

export async function GET() {
  try {
    const client = await getClientPromise();
    const programs = await client
      .db(DB_NAME)
      .collection(COLLECTION)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ programs });
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
    const category = String(body.category || "").trim();
    const name = String(body.name || "").trim();
    const duration = String(body.duration || "").trim();

    if (!CATEGORIES.includes(category)) {
      return NextResponse.json(
        { error: "Program category must be 'Online' or 'Offline'" },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { error: "Program name is required" },
        { status: 400 }
      );
    }

    if (!duration) {
      return NextResponse.json(
        { error: "Program duration is required" },
        { status: 400 }
      );
    }

    const client = await getClientPromise();
    await client
      .db(DB_NAME)
      .collection(COLLECTION)
      .insertOne({ category, name, duration, createdAt: new Date() });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
