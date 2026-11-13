import { randomUUID } from "node:crypto";
import nextEnv from "@next/env";
import { hashPassword } from "better-auth/crypto";
import { Pool } from "pg";

nextEnv.loadEnvConfig(process.cwd());

const email = "admin@coaching4job.ma";
const password = process.env.OWNER_PASSWORD;
const databaseUrl = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("Set DATABASE_URL_UNPOOLED or DATABASE_URL in .env.local.");
}

if (!password || password.length < 12 || password.length > 128) {
  throw new Error("Set OWNER_PASSWORD in .env.local to a 12–128 character password.");
}

const pool = new Pool({ connectionString: databaseUrl, max: 1 });
const client = await pool.connect();

try {
  await client.query("BEGIN");

  const existingUser = await client.query('SELECT id FROM "user" WHERE email = $1', [email]);
  if (existingUser.rowCount) {
    throw new Error(`An account already exists for ${email}. No changes were made.`);
  }

  const userId = randomUUID();
  const now = new Date();
  const passwordHash = await hashPassword(password);

  await client.query(
    `INSERT INTO "user" (id, name, email, "emailVerified", "createdAt", "updatedAt")
     VALUES ($1, $2, $3, false, $4, $4)`,
    [userId, "Administrateur Coaching 4 Job", email, now],
  );

  await client.query(
    `INSERT INTO account (id, "userId", "accountId", "providerId", password, "createdAt", "updatedAt")
     VALUES ($1, $2, $2, 'credential', $3, $4, $4)`,
    [randomUUID(), userId, passwordHash, now],
  );

  await client.query("COMMIT");
  process.stdout.write(`Owner account created for ${email}.\n`);
} catch (error) {
  await client.query("ROLLBACK");
  throw error;
} finally {
  client.release();
  await pool.end();
}
