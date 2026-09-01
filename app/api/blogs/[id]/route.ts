import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import getClientPromise from "../../../../lib/mongodb";
import type { BlogSection } from "../../../lib/blogUtils";

export const dynamic = "force-dynamic";

const DB_NAME = "psc";
const COLLECTION = "blogs";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid blog id" },
        { status: 400 }
      );
    }

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

    // sections is only sent by the "view more" content editor — the basic
    // Add/Edit Blog modal never includes it, so leave it untouched unless
    // the caller explicitly provided an array (even an empty one, which
    // means "clear all sections").
    const setDoc: Record<string, unknown> = {
      topic,
      subject,
      uploadedDate,
      sectionPara,
      image,
      updatedAt: new Date(),
    };
    if (Array.isArray(body.sections)) {
      setDoc.sections = (body.sections as BlogSection[]).map((s) => ({
        heading: String(s.heading || "").trim(),
        paragraph: String(s.paragraph || "").trim(),
      }));
    }

    // Same deal as sections: only touch gallery when the caller (the
    // "view more" editor's gallery section) explicitly sends it.
    if (Array.isArray(body.gallery)) {
      setDoc.gallery = (body.gallery as unknown[])
        .map((g) => String(g || "").trim())
        .filter(Boolean);
    }

    const client = await getClientPromise();
    const result = await client
      .db(DB_NAME)
      .collection(COLLECTION)
      .updateOne({ _id: new ObjectId(id) }, { $set: setDoc });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Blog not found" },
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
        { error: "Invalid blog id" },
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
        { error: "Blog not found" },
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
