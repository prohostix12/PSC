import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    await client.db("admin").command({ ping: 1 });
    return NextResponse.json({ connected: true });
  } catch (error) {
    return NextResponse.json(
      { connected: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
