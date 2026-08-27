import { NextResponse } from "next/server";
import getClientPromise from "../../../lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const client = await getClientPromise();
    await client.db("admin").command({ ping: 1 });
    return NextResponse.json({ connected: true });
  } catch (error) {
    return NextResponse.json(
      { connected: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
