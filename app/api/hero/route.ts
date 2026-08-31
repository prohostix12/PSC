import { NextRequest, NextResponse } from "next/server";
import getClientPromise from "../../../lib/mongodb";
import {
  DEFAULT_HERO_TAG,
  DEFAULT_HERO_HEADING,
  DEFAULT_HERO_CHILDREN,
  HERO_TAG_MAX_CHARS,
  HERO_HEADING_MAX_CHARS,
  HERO_CHILD_HEADING_MAX_CHARS,
  HERO_CHILD_PARAGRAPH_MAX_CHARS,
  countChars,
  type HeroChild,
} from "../../lib/heroUtils";

export const dynamic = "force-dynamic";

const DB_NAME = "psc";
const COLLECTION = "herocontent";

function normalizeChildren(raw: unknown): HeroChild[] {
  if (!Array.isArray(raw) || raw.length === 0) return DEFAULT_HERO_CHILDREN;
  return raw.map((c, i) => {
    const child = c as Partial<HeroChild> | undefined;
    return {
      heading: String(child?.heading ?? "") || DEFAULT_HERO_CHILDREN[i]?.heading || "",
      paragraph: String(child?.paragraph ?? "") || DEFAULT_HERO_CHILDREN[i]?.paragraph || "",
      visible: typeof child?.visible === "boolean" ? child.visible : true,
    };
  });
}

export async function GET() {
  try {
    const client = await getClientPromise();
    const doc = await client.db(DB_NAME).collection(COLLECTION).findOne({});

    return NextResponse.json({
      tag: doc?.tag || DEFAULT_HERO_TAG,
      heading: doc?.heading || DEFAULT_HERO_HEADING,
      children: normalizeChildren(doc?.children),
    });
  } catch {
    // Public Home page reads this — degrade to the defaults instead of
    // breaking the hero if the DB is briefly unreachable.
    return NextResponse.json({
      tag: DEFAULT_HERO_TAG,
      heading: DEFAULT_HERO_HEADING,
      children: DEFAULT_HERO_CHILDREN,
    });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const tag = String(body.tag ?? "");
    const heading = String(body.heading ?? "");
    const children = normalizeChildren(body.children);

    if (countChars(tag) > HERO_TAG_MAX_CHARS) {
      return NextResponse.json(
        { error: `Tag must be ${HERO_TAG_MAX_CHARS} characters or fewer` },
        { status: 400 }
      );
    }

    if (countChars(heading) > HERO_HEADING_MAX_CHARS) {
      return NextResponse.json(
        {
          error: `Heading must be ${HERO_HEADING_MAX_CHARS} characters or fewer`,
        },
        { status: 400 }
      );
    }

    for (const [i, child] of children.entries()) {
      if (countChars(child.heading) > HERO_CHILD_HEADING_MAX_CHARS) {
        return NextResponse.json(
          {
            error: `Child ${i + 1} heading must be ${HERO_CHILD_HEADING_MAX_CHARS} characters or fewer`,
          },
          { status: 400 }
        );
      }
      if (countChars(child.paragraph) > HERO_CHILD_PARAGRAPH_MAX_CHARS) {
        return NextResponse.json(
          {
            error: `Child ${i + 1} paragraph must be ${HERO_CHILD_PARAGRAPH_MAX_CHARS} characters or fewer`,
          },
          { status: 400 }
        );
      }
    }

    const client = await getClientPromise();
    await client
      .db(DB_NAME)
      .collection(COLLECTION)
      .updateOne(
        {},
        { $set: { tag, heading, children, updatedAt: new Date() } },
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
