import dns from "node:dns";
import { MongoClient, type MongoClientOptions } from "mongodb";

const isDev = process.env.NODE_ENV === "development";

// The following two tweaks are workarounds for a specific local Windows
// setup (antivirus TLS scanning / flaky system DNS). They must NOT run on
// Vercel: overriding the resolver breaks mongodb+srv SRV lookups and
// forcing IPv4 there triggers "tlsv1 alert internal error" on the Atlas
// handshake. So they are dev-only.
if (isDev) {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

const clientOptions: MongoClientOptions = isDev ? { family: 4 } : {};

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Lazily create the connection. Doing this at module-eval time makes the
// whole route module throw during Next's build-time "collect page data"
// pass whenever MONGODB_URI is absent — so defer it to the first request.
export default function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable");
  }

  if (isDev) {
    // Reuse the client across HMR reloads in dev so we don't open a new
    // connection to Atlas on every file change.
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(uri, clientOptions).connect();
    }
    return global._mongoClientPromise;
  }

  return new MongoClient(uri, clientOptions).connect();
}
