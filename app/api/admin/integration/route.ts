import { NextRequest, NextResponse } from "next/server";
import getClientPromise from "../../../../lib/mongodb";
import {
  ADMIN_SESSION_COOKIE,
  isValidAdminSession,
} from "../../../lib/adminAuth";

export const dynamic = "force-dynamic";

const DB_NAME = "psc";
const COLLECTION = "admin_settings";
const INTEGRATION_ID = "crm-integration";

type IntegrationSettings = {
  _id: string;
  apiKey?: string;
  endpointUrl?: string;
  updatedAt?: Date;
};

function requireAdmin(request: NextRequest) {
  const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return isValidAdminSession(session);
}

export async function GET(request: NextRequest) {
  if (!requireAdmin(request)) {
    return NextResponse.json(
      { error: "Admin authentication required" },
      { status: 401 }
    );
  }

  try {
    const client = await getClientPromise();
    const settings = await client
      .db(DB_NAME)
      .collection<IntegrationSettings>(COLLECTION)
      .findOne({ _id: INTEGRATION_ID });

    return NextResponse.json({
      endpointUrl: settings?.endpointUrl || "",
      hasApiKey: Boolean(settings?.apiKey),
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!requireAdmin(request)) {
    return NextResponse.json(
      { error: "Admin authentication required" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const apiKey = String(body.apiKey || "").trim();
    const endpointUrl = String(body.endpointUrl || "").trim();

    if (!endpointUrl) {
      return NextResponse.json(
        { error: "CRM Endpoint URL is required" },
        { status: 400 }
      );
    }

    try {
      new URL(endpointUrl);
    } catch {
      return NextResponse.json(
        { error: "CRM Endpoint URL must be a valid URL" },
        { status: 400 }
      );
    }

    const update: { endpointUrl: string; updatedAt: Date; apiKey?: string } = {
      endpointUrl,
      updatedAt: new Date(),
    };

    if (apiKey) update.apiKey = apiKey;

    const client = await getClientPromise();
    await client
      .db(DB_NAME)
      .collection<IntegrationSettings>(COLLECTION)
      .updateOne(
        { _id: INTEGRATION_ID },
        { $set: update },
        { upsert: true }
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
