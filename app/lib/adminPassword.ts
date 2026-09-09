import { createHmac, timingSafeEqual } from "node:crypto";
import getClientPromise from "../../lib/mongodb";

const DB_NAME = "psc";
const COLLECTION = "admin_settings";
const PASSWORD_ID = "admin-password";

const getSecret = () =>
  process.env.ADMIN_SESSION_SECRET || "psc-admin-session-secret-change-me";

const hashPassword = (password: string) =>
  createHmac("sha256", getSecret()).update(password).digest("hex");

const matches = (password: string, hash: string) => {
  const actual = Buffer.from(hashPassword(password), "utf8");
  const expected = Buffer.from(hash, "utf8");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
};

export async function getAdminPasswordHash(): Promise<string | null> {
  const client = await getClientPromise();
  const settings = await client
    .db(DB_NAME)
    .collection<{ _id: string; passwordHash?: string }>(COLLECTION)
    .findOne({ _id: PASSWORD_ID });
  return typeof settings?.passwordHash === "string" ? settings.passwordHash : null;
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const storedHash = await getAdminPasswordHash();
  if (storedHash) return matches(password, storedHash);
  return password === (process.env.ADMIN_PASSWORD || "mypsc");
}

export async function changeAdminPassword(
  oldPassword: string,
  newPassword: string
): Promise<boolean> {
  if (!(await verifyAdminPassword(oldPassword))) return false;

  const client = await getClientPromise();
  await client.db(DB_NAME).collection<{ _id: string; passwordHash?: string }>(COLLECTION).updateOne(
    { _id: PASSWORD_ID },
    { $set: { passwordHash: hashPassword(newPassword), updatedAt: new Date() } },
    { upsert: true }
  );
  return true;
}
