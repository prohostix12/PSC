import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import getClientPromise from "../../../../lib/mongodb";

export const dynamic = "force-dynamic";

const DB_NAME = "psc";
const COLLECTION = "programs";
const CATEGORIES = ["Online", "Offline"];

const normalizeDetails = (value: unknown) => {
  const details = (value || {}) as Record<string, unknown>;
  const modules = Array.isArray(details.curriculumModules)
    ? details.curriculumModules
        .map((item) => {
          const module = item as { heading?: unknown; para?: unknown };
          return {
            heading: String(module?.heading || "").trim(),
            para: String(module?.para || "").trim(),
          };
        })
        .filter((item) => item.heading || item.para)
    : [];
  const benefitsItems = Array.isArray(details.benefitsItems)
    ? details.benefitsItems
        .map((item) => {
          const benefit = item as { heading?: unknown; para?: unknown };
          return {
            heading: String(benefit?.heading || "").trim(),
            para: String(benefit?.para || "").trim(),
          };
        })
        .filter((item) => item.heading || item.para)
    : [
        {
          heading: String(details.benefitsHeading || "").trim(),
          para: String(details.benefitsPara || "").trim(),
        },
      ].filter((item) => item.heading || item.para);
  const courseIncludes = Array.isArray(details.courseIncludes)
    ? details.courseIncludes.map((item) => String(item || "").trim()).filter(Boolean)
    : [];
  const quickQuestions = Array.isArray(details.quickQuestions)
    ? details.quickQuestions
        .map((item) => {
          const question = item as { heading?: unknown; para?: unknown };
          return {
            heading: String(question?.heading || "").trim(),
            para: String(question?.para || "").trim(),
          };
        })
        .filter((item) => item.heading || item.para)
    : [];

  return {
    overview: String(details.overview || "").trim(),
    curriculumHeading:
      String(details.curriculumHeading || "Complete Course Module").trim(),
    curriculumModules: modules,
    benefitsHeading: String(details.benefitsHeading || "").trim(),
    benefitsPara: String(details.benefitsPara || "").trim(),
    benefitsItems,
    intakeCount: String(details.intakeCount || "").trim(),
    brochureUrl: String(details.brochureUrl || "").trim(),
    courseIncludes,
    quickQuestions,
    careerOutcomesPara: String(details.careerOutcomesPara || "").trim(),
    careerOutcomesLogos: Array.isArray(details.careerOutcomesLogos)
      ? details.careerOutcomesLogos.map((item) => String(item || "").trim()).filter(Boolean)
      : [],
  };
};

const normalizePoint = (item: unknown) => {
  if (typeof item === "string") {
    const value = item.trim();
    return { heading: value.slice(0, 15), para: value.slice(0, 35) };
  }

  const point = item as { heading?: unknown; para?: unknown };
  return {
    heading: String(point?.heading || "").trim().slice(0, 15),
    para: String(point?.para || "").trim().slice(0, 35),
  };
};

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
    const name = String(body.name || "").trim().slice(0, 35);
    const duration = String(body.duration || "").trim();
    const heroPara = String(body.heroPara || "").trim();
    const heroHeading = String(body.heroHeading || "").trim();
    const heroAbout = String(body.heroAbout || "").trim();
    const details = normalizeDetails(body.details);
    const heroPoints = Array.isArray(body.heroPoints)
        ? body.heroPoints
          .map(normalizePoint)
          .filter((item: { heading: string; para: string }) => item.heading || item.para)
      : String(body.heroPoints || "")
          .split(/\n|;/)
          .map((item) => item.trim())
          .filter(Boolean);

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
        {
          $set: {
            category,
            name,
            duration,
            heroPara,
            heroHeading,
            heroAbout,
            heroPoints,
            details,
            updatedAt: new Date(),
          },
        }
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
