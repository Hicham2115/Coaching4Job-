"use server";

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
});

export async function createRegistration(input: unknown) {
  const parsed = registrationSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false as const,
      message: "Vérifiez les informations saisies.",
    };
  }

  try {
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
