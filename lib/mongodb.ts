import dns from "node:dns";
import { MongoClient } from "mongodb";

// Node's default resolver can fail to reach the system DNS servers on some
// Windows setups even though the OS resolver works fine — point it at a
// public resolver so Atlas hostnames resolve reliably.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable");
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

// Force IPv4 — works around a "tlsv1 alert internal error" seen on some
// Windows machines where antivirus HTTPS/TLS scanning or IPv6 routing
// interferes with the handshake.
const clientOptions = { family: 4 as const };

if (process.env.NODE_ENV === "development") {
  // Reuse the client across HMR reloads in dev so we don't open a new
  // connection to Atlas on every file change.
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri, clientOptions).connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = new MongoClient(uri, clientOptions).connect();
}

export default clientPromise;
