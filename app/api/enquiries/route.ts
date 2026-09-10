import { NextRequest, NextResponse } from "next/server";
import getClientPromise from "../../../lib/mongodb";

export const dynamic = "force-dynamic";

const DB_NAME = "psc";
const COLLECTION = "enquiries";
const SETTINGS_COLLECTION = "admin_settings";
const CRM_SETTINGS_ID = "crm-integration";

type CrmSettings = {
  _id: string;
  apiKey?: string;
  endpointUrl?: string;
};

export async function GET() {
  try {
    const client = await getClientPromise();
    const enquiries = await client
      .db(DB_NAME)
      .collection(COLLECTION)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ enquiries });
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
    const legacyName = String(body.name || "").trim();
    const nameParts = legacyName.split(/\s+/).filter(Boolean);
    const firstName = String(body.firstName || nameParts.shift() || "").trim();
    const lastName = String(body.lastName || nameParts.join(" ") || "").trim();
    const phone = String(body.phone || "").trim();
    const email = String(body.email || "").trim();
    const company = String(body.company || "").trim();
    const message = String(body.enquiry || body.message || "").trim();
    const source = String(body.source || "").trim();

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: "First name, last name, email, and phone are required" },
        { status: 400 }
      );
    }

    const client = await getClientPromise();
    await client
      .db(DB_NAME)
      .collection(COLLECTION)
      .insertOne({
        firstName,
        lastName,
        email,
        phone,
        company,
        message,
        source,
        createdAt: new Date(),
      });

    const crmSettings = await client
      .db(DB_NAME)
      .collection<CrmSettings>(SETTINGS_COLLECTION)
      .findOne({ _id: CRM_SETTINGS_ID });

    if (crmSettings?.apiKey && crmSettings.endpointUrl) {
      const crmResponse = await fetch(crmSettings.endpointUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": crmSettings.apiKey,
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          email,
          company,
          enquiry: message,
          source,
        }),
        signal: AbortSignal.timeout(10000),
      });

      if (!crmResponse.ok) {
        return NextResponse.json(
          { error: "Enquiry saved locally, but the CRM request failed" },
          { status: 502 }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
