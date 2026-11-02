import { betterAuth } from "better-auth";

import { databasePool } from "@/lib/database";

function getAuthSecret() {
  const secret = process.env.BETTER_AUTH_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("BETTER_AUTH_SECRET must be at least 32 characters long.");
  }

  return secret;
}

function getAuthUrl() {
  const url = process.env.BETTER_AUTH_URL;

  if (!url) {
    throw new Error("BETTER_AUTH_URL is required.");
  }

  return url;
}

export const auth = betterAuth({
  database: databasePool,
  secret: getAuthSecret(),
  baseURL: getAuthUrl(),
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
    minPasswordLength: 12,
    maxPasswordLength: 128,
  },
});
