import { NextRequest, NextResponse } from "next/server";
import getClientPromise from "../../../lib/mongodb";

export const dynamic = "force-dynamic";

const DB_NAME = "psc";
const COLLECTION = "contacts";

export async function GET() {
  try {
    const client = await getClientPromise();
    const contacts = await client
      .db(DB_NAME)
      .collection(COLLECTION)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ contacts });
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
    const sectionName = String(body.sectionName || "").trim();
    const sectionDescription = String(body.sectionDescription || "").trim();
    const phone = String(body.phone || "").trim();
    const secondaryPhone = String(body.secondaryPhone || "").trim();
    const email = String(body.email || "").trim();

    if (!sectionName) {
      return NextResponse.json(
        { error: "Section name is required" },
        { status: 400 }
      );
    }

    const client = await getClientPromise();
    await client
      .db(DB_NAME)
      .collection(COLLECTION)
      .insertOne({
        sectionName,
        sectionDescription,
        phone,
        secondaryPhone,
        email,
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
