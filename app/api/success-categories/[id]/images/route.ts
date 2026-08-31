import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { randomUUID } from "node:crypto";
import getClientPromise from "../../../../../lib/mongodb";

export const dynamic = "force-dynamic";

const DB_NAME = "psc";
const COLLECTION = "successCategories";

type SuccessCategoryDoc = {
  name: string;
  images: { id: string; src: string }[];
  createdAt: Date;
  updatedAt?: Date;
};

// Adds one or more images to a category in one call — supports the
// multi-select file input in the admin gallery uploader.
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid category id" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const rawImages = Array.isArray(body.images) ? body.images : [];
    const images = rawImages
      .map((src: unknown) => String(src || "").trim())
      .filter(Boolean)
      .map((src: string) => ({ id: randomUUID(), src }));

    if (images.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required" },
        { status: 400 }
      );
    }

    const client = await getClientPromise();
    const result = await client
      .db(DB_NAME)
      .collection<SuccessCategoryDoc>(COLLECTION)
      .updateOne(
        { _id: new ObjectId(id) },
        { $push: { images: { $each: images } }, $set: { updatedAt: new Date() } }
      );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, images });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
