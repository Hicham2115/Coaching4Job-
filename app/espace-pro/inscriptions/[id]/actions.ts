"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { databasePool } from "@/lib/database";

type ActionState = {
  kind: "success" | "error" | "idle";
  message: string;
};

const idSchema = z.string().uuid();
const statusSchema = z.enum(["new", "to_contact", "contacted"]);
const noteSchema = z.string().trim().min(1).max(500);

async function getOwnerId() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || session.user.email !== "admin@coaching4job.ma") {
    return null;
  }

  return session.user.id;
}

export async function updateRegistrationStatus(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const userId = await getOwnerId();
    if (!userId) return { kind: "error", message: "Votre session a expiré. Reconnectez-vous." };

    const id = idSchema.safeParse(formData.get("registrationId"));
    const status = statusSchema.safeParse(formData.get("status"));
    if (!id.success || !status.success) {
      return { kind: "error", message: "Le statut sélectionné n’est pas valide." };
    }

    const result = await databasePool.query(
      `UPDATE registrations
       SET status = $1, updated_at = now()
       WHERE id = $2`,
      [status.data, id.data],
    );

    if (result.rowCount === 0) {
      return { kind: "error", message: "Cette inscription est introuvable." };
    }

    revalidatePath(`/espace-pro/inscriptions/${id.data}`);
    revalidatePath("/espace-pro/inscriptions");
    revalidatePath("/espace-pro/tableau-de-bord");

    return { kind: "success", message: "Le statut a été mis à jour." };
  } catch {
    return { kind: "error", message: "Impossible d’enregistrer le statut. Réessayez." };
  }
}

export async function addRegistrationNote(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const userId = await getOwnerId();
    if (!userId) return { kind: "error", message: "Votre session a expiré. Reconnectez-vous." };

    const id = idSchema.safeParse(formData.get("registrationId"));
    const content = noteSchema.safeParse(formData.get("content"));
    if (!id.success || !content.success) {
      return {
        kind: "error",
        message: "Écrivez une note de 1 à 500 caractères.",
      };
    }

    const result = await databasePool.query(
      `INSERT INTO registration_notes (registration_id, author_id, content)
       SELECT $1, $2, $3
       WHERE EXISTS (SELECT 1 FROM registrations WHERE id = $1)`,
      [id.data, userId, content.data],
    );

    if (result.rowCount === 0) {
      return { kind: "error", message: "Cette inscription est introuvable." };
    }

    revalidatePath(`/espace-pro/inscriptions/${id.data}`);
    return { kind: "success", message: "La note a été ajoutée." };
  } catch {
    return { kind: "error", message: "Impossible d’ajouter la note. Réessayez." };
  }
}
