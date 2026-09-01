import { NextRequest, NextResponse } from "next/server";
import getClientPromise from "../../../lib/mongodb";

export const dynamic = "force-dynamic";

const DB_NAME = "psc";
const COLLECTION = "successVideos";
const VALID_TYPES = ["upload", "youtube", "instagram", "drive"];

export async function GET() {
  try {
    const client = await getClientPromise();
    const videos = await client
      .db(DB_NAME)
      .collection(COLLECTION)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ videos });
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
    const sourceType = String(body.sourceType || "");
    const url = String(body.url || "").trim();

    if (!VALID_TYPES.includes(sourceType)) {
      return NextResponse.json(
        { error: "A valid video source is required" },
        { status: 400 }
      );
    }

    if (!url) {
      return NextResponse.json(
        { error: "A video file or link is required" },
        { status: 400 }
      );
    }

    const client = await getClientPromise();
    await client
      .db(DB_NAME)
      .collection(COLLECTION)
      .insertOne({ sourceType, url, createdAt: new Date() });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
