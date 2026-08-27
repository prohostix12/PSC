import { NextRequest, NextResponse } from "next/server";
import getClientPromise from "../../../lib/mongodb";

export const dynamic = "force-dynamic";

const DB_NAME = "psc";
const COLLECTION = "reviews";

export async function GET() {
  try {
    const client = await getClientPromise();
    const reviews = await client
      .db(DB_NAME)
      .collection(COLLECTION)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ reviews });
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
    const name = String(body.name || "").trim();
    const image = String(body.image || "").trim();
    const review = String(body.review || "").trim();
    const ratings = Number(body.ratings);

    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!review) {
      return NextResponse.json(
        { error: "Review is required" },
        { status: 400 }
      );
    }

    if (!Number.isFinite(ratings) || ratings < 1 || ratings > 5) {
      return NextResponse.json(
        { error: "Ratings must be a number between 1 and 5" },
        { status: 400 }
      );
    }

    const client = await getClientPromise();
    await client
      .db(DB_NAME)
      .collection(COLLECTION)
      .insertOne({ name, image, ratings, review, createdAt: new Date() });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
