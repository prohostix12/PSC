import dns from "node:dns";
import { MongoClient } from "mongodb";

// Node's default resolver can fail to reach the system DNS servers on some
// Windows setups even though the OS resolver works fine — point it at a
// public resolver so Atlas hostnames resolve reliably.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Force IPv4 — works around a "tlsv1 alert internal error" seen on some
// Windows machines where antivirus HTTPS/TLS scanning or IPv6 routing
// interferes with the handshake.
const clientOptions = { family: 4 as const };

// Lazily create the connection. Doing this at module-eval time makes the
// whole route module throw during Next's build-time "collect page data"
// pass whenever MONGODB_URI is absent — so defer it to the first request.
export default function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable");
  }

  if (process.env.NODE_ENV === "development") {
    // Reuse the client across HMR reloads in dev so we don't open a new
    // connection to Atlas on every file change.
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(uri, clientOptions).connect();
    }
    return global._mongoClientPromise;
  }

  return new MongoClient(uri, clientOptions).connect();
}
