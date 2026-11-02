import { Pool } from "pg";

function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required to connect to the database.");
  }

  return databaseUrl;
}

const globalForDatabase = globalThis as unknown as {
  databasePool?: Pool;
};

export const databasePool =
  globalForDatabase.databasePool ??
  new Pool({
    connectionString: getDatabaseUrl(),
    max: 1,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDatabase.databasePool = databasePool;
}
