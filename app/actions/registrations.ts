"use server";

import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import { headers } from "next/headers";
import { z } from "zod";

import { databasePool } from "@/lib/database";

const registrationSchema = z.object({
  name: z.string().trim().min(2).max(120).regex(/\p{L}/u),
  situation: z.enum([
    "Étudiant(e)",
    "À la recherche d’un emploi",
    "En poste",
    "Entrepreneur(e)",
    "Autre",
  ]),
  phone: z
    .string()
    .trim()
    .min(8)
    .max(22)
    .regex(/^[+\d][\d\s().-]{6,18}\d$/),
  email: z.string().trim().max(254).email(),
  website: z.string().max(200).optional(),
});

export async function createRegistration(input: unknown) {
  const parsed = registrationSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false as const,
      message: "Vérifiez les informations saisies.",
    };
  }

  if (parsed.data.website) return { success: true as const };

  try {
    const requestHeaders = await headers();
    const forwardedFor =
      requestHeaders.get("x-vercel-forwarded-for") ??
      requestHeaders.get("x-forwarded-for") ??
      "";
    const forwardedIp = forwardedFor.split(",")[0].trim();
    const clientIp = isIP(forwardedIp) ? forwardedIp : "unknown";
    const secret = process.env.BETTER_AUTH_SECRET;
    if (!secret || secret.length < 32) {
      throw new Error("BETTER_AUTH_SECRET must be at least 32 characters long.");
    }

    const visitorKey = createHmac("sha256", secret).update(clientIp).digest("hex");
    const rateLimit = await databasePool.query(
      `INSERT INTO registration_rate_limits (visitor_key, window_started_at, attempts)
       VALUES ($1, now(), 1)
       ON CONFLICT (visitor_key) DO UPDATE SET
         attempts = CASE
           WHEN registration_rate_limits.window_started_at <= now() - interval '1 hour'
             THEN 1
           ELSE registration_rate_limits.attempts + 1
         END,
         window_started_at = CASE
           WHEN registration_rate_limits.window_started_at <= now() - interval '1 hour'
             THEN now()
           ELSE registration_rate_limits.window_started_at
         END
       WHERE registration_rate_limits.window_started_at <= now() - interval '1 hour'
          OR registration_rate_limits.attempts < 10
       RETURNING attempts`,
      [visitorKey],
    );

    if (rateLimit.rowCount === 0) {
      return {
        success: false as const,
        message: "Trop de tentatives. Réessayez dans une heure.",
      };
    }

    await databasePool.query(
      `INSERT INTO registrations (name, situation, phone, email)
       VALUES ($1, $2, $3, $4)`,
      [
        parsed.data.name,
        parsed.data.situation,
        parsed.data.phone,
        parsed.data.email,
      ],
    );

    return { success: true as const };
  } catch (error) {
    console.error("Unable to save conference registration:", error);
    return {
      success: false as const,
      message: "Impossible d’enregistrer votre inscription. Réessayez.",
    };
  }
}
