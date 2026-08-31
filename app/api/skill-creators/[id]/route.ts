import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import getClientPromise from "../../../../lib/mongodb";

export const dynamic = "force-dynamic";

const DB_NAME = "psc";
const COLLECTION = "skillCreators";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid skill creator id" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const name = String(body.name || "").trim();
    const position = String(body.position || "").trim();
    const image = String(body.image || "").trim();

    if (!name) {
      return NextResponse.json(
        { error: "Lec. name is required" },
        { status: 400 }
      );
    }

    if (!position) {
      return NextResponse.json(
        { error: "Lec. position is required" },
        { status: 400 }
      );
    }

    const client = await getClientPromise();
    const result = await client
      .db(DB_NAME)
      .collection(COLLECTION)
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { name, position, image, updatedAt: new Date() } }
      );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Skill creator not found" },
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
        { error: "Invalid skill creator id" },
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
        { error: "Skill creator not found" },
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
