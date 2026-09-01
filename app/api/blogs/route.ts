import { NextRequest, NextResponse } from "next/server";
import getClientPromise from "../../../lib/mongodb";

export const dynamic = "force-dynamic";

const DB_NAME = "psc";
const COLLECTION = "blogs";

export async function GET() {
  try {
    const client = await getClientPromise();
    const blogs = await client
      .db(DB_NAME)
      .collection(COLLECTION)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ blogs });
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
    const topic = String(body.topic || "").trim();
    const subject = String(body.subject || "").trim();
    const uploadedDate = String(body.uploadedDate || "").trim();
    const sectionPara = String(body.sectionPara || "").trim();
    const image = String(body.image || "").trim();

    if (!topic) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    if (!subject) {
      return NextResponse.json(
        { error: "Subject is required" },
        { status: 400 }
      );
    }

    const client = await getClientPromise();
    await client
      .db(DB_NAME)
      .collection(COLLECTION)
      .insertOne({
        topic,
        subject,
        uploadedDate,
        sectionPara,
        image,
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
