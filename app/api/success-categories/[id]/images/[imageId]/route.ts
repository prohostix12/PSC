import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import getClientPromise from "../../../../../../lib/mongodb";

export const dynamic = "force-dynamic";

const DB_NAME = "psc";
const COLLECTION = "successCategories";

type SuccessCategoryDoc = {
  name: string;
  images: { id: string; src: string }[];
  createdAt: Date;
  updatedAt?: Date;
};

// Replaces a single image's file within a category (the admin gallery's
// per-image "Update" button).
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> }
) {
  try {
    const { id, imageId } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid category id" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const src = String(body.image || "").trim();

    if (!src) {
      return NextResponse.json(
        { error: "A replacement image is required" },
        { status: 400 }
      );
    }

    const client = await getClientPromise();
    const result = await client
      .db(DB_NAME)
      .collection<SuccessCategoryDoc>(COLLECTION)
      .updateOne(
        { _id: new ObjectId(id), "images.id": imageId },
        { $set: { "images.$.src": src, updatedAt: new Date() } }
      );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Image not found" },
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
  { params }: { params: Promise<{ id: string; imageId: string }> }
) {
  try {
    const { id, imageId } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid category id" },
        { status: 400 }
      );
    }

    const client = await getClientPromise();
    const result = await client
      .db(DB_NAME)
      .collection<SuccessCategoryDoc>(COLLECTION)
      .updateOne(
        { _id: new ObjectId(id) },
        { $pull: { images: { id: imageId } }, $set: { updatedAt: new Date() } }
      );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Category not found" },
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
