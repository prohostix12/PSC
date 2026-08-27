import { Resolver } from "node:dns/promises";
import { MongoClient, type MongoClientOptions } from "mongodb";

const onVercel = !!process.env.VERCEL;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// This machine's ISP (and some Windows setups) refuse DNS SRV/TXT queries,
// so a `mongodb+srv://` URI fails with `querySrv ECONNREFUSED` under
// `next dev`. Setting `dns.setServers()` globally doesn't reliably reach
// the driver's resolver through the dev bundler, so instead we resolve the
// SRV + TXT records ourselves against a public resolver and rewrite the
// URI into an equivalent plain `mongodb://` seed list.
//
// On Vercel the platform resolver handles SRV fine, so this is skipped
// there and the driver gets the original `mongodb+srv://` string.
async function resolveSrvUri(srvUri: string): Promise<string> {
  const url = new URL(srvUri);
  const host = url.hostname;

  const resolver = new Resolver();
  resolver.setServers(["8.8.8.8", "1.1.1.1"]);

  const [srvRecords, txtRecords] = await Promise.all([
    resolver.resolveSrv(`_mongodb._tcp.${host}`),
    resolver.resolveTxt(host).catch(() => [] as string[][]),
  ]);

  const seedList = srvRecords
    .map((r) => `${r.name}:${r.port}`)
    .sort()
    .join(",");

  const params = new URLSearchParams(url.search);
  params.set("ssl", "true");
  for (const part of txtRecords.flat().join("&").split("&")) {
    const [k, v] = part.split("=");
    if (k && v && !params.has(k)) params.set(k, v);
  }

  const auth = url.username
    ? `${url.username}:${decodeURIComponent(url.password)}@`
    : "";

  return `mongodb://${auth}${seedList}/?${params.toString()}`;
}

// Lazily create the connection. Doing this at module-eval time makes the
// whole route module throw during Next's build-time "collect page data"
// pass whenever MONGODB_URI is absent — so defer it to the first request.
async function createClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable");
  }

  const options: MongoClientOptions = {};
  let connectionUri = uri;

  if (uri.startsWith("mongodb+srv://") && !onVercel) {
    connectionUri = await resolveSrvUri(uri);
  }

  return new MongoClient(connectionUri, options).connect();
}

export default function getClientPromise(): Promise<MongoClient> {
  if (process.env.NODE_ENV === "development") {
    // Reuse the client across HMR reloads in dev so we don't open a new
    // connection to Atlas on every file change.
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = createClient();
    }
    return global._mongoClientPromise;
  }

  return createClient();
}
