import getClientPromise from "../../lib/mongodb";
import type { Program } from "./programUtils";

const DB_NAME = "psc";
const COLLECTION = "programs";

export async function getPrograms(): Promise<Program[]> {
  const client = await getClientPromise();
  const programs = await client
    .db(DB_NAME)
    .collection(COLLECTION)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return programs.map((program) => ({
    ...program,
    _id: String(program._id),
    createdAt: program.createdAt instanceof Date
      ? program.createdAt.toISOString()
      : String(program.createdAt || ""),
  })) as unknown as Program[];
}