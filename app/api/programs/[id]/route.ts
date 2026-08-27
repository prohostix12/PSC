import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import getClientPromise from "../../../../lib/mongodb";

export const dynamic = "force-dynamic";

const DB_NAME = "psc";
const COLLECTION = "programs";
const CATEGORIES = ["Online", "Offline"];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid program id" },
        { status: 400 }
      );
    }

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
    const result = await client
      .db(DB_NAME)
      .collection(COLLECTION)
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { category, name, duration, updatedAt: new Date() } }
      );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Program not found" },
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
        { error: "Invalid program id" },
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
        { error: "Program not found" },
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
