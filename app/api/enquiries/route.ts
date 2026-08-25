import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

const DB_NAME = "psc";
const COLLECTION = "enquiries";

export async function GET() {
  try {
    const client = await clientPromise;
    const enquiries = await client
      .db(DB_NAME)
      .collection(COLLECTION)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ enquiries });
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
    const { name, email, phone, preference, message, source } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    await client
      .db(DB_NAME)
      .collection(COLLECTION)
      .insertOne({
        name,
        email,
        phone,
        preference: preference || "",
        message: message || "",
        source: source || "",
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
