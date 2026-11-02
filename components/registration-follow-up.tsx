"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check, CircleUserRound, LoaderCircle, MessageCircleMore } from "lucide-react";

import {
  addRegistrationNote,
  updateRegistrationStatus,
} from "@/app/espace-pro/inscriptions/[id]/actions";

type FollowUpStatus = "new" | "to_contact" | "contacted";
type Note = {
  id: string;
  content: string;
  created_at: string;
  author_name: string;
};
type ActionState = { kind: "success" | "error" | "idle"; message: string };

const initialState: ActionState = { kind: "idle", message: "" };
const statusOptions: { value: FollowUpStatus; label: string }[] = [
  { value: "new", label: "Nouveau" },
  { value: "to_contact", label: "À contacter" },
  { value: "contacted", label: "Contacté" },
];

export default function RegistrationFollowUp({
  registrationId,
  currentStatus,
  notes,
}: {
  registrationId: string;
  currentStatus: FollowUpStatus;
  notes: Note[];
}) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [note, setNote] = useState("");
  const [statusState, statusAction, statusPending] = useActionState(
    updateRegistrationStatus,
    initialState,
  );
  const [noteState, noteAction, notePending] = useActionState(
    async (previousState: ActionState, formData: FormData) => {
      const result = await addRegistrationNote(previousState, formData);
      if (result.kind === "success") setNote("");
      return result;
    },
    initialState,
  );

  useEffect(() => {
    if (statusState.kind === "success") {
      toast.success(statusState.message);
      router.refresh();
    }
    if (statusState.kind === "error") toast.error(statusState.message);
  }, [router, statusState]);

  useEffect(() => {
    if (noteState.kind === "success") {
      toast.success(noteState.message);
      router.refresh();
    }
    if (noteState.kind === "error") toast.error(noteState.message);
  }, [noteState, router]);

  return (
    <>
      <section className="border border-brand-ink/15 bg-white p-4 sm:p-5">
        <h2 className="text-sm font-bold">Statut du suivi</h2>
        <p className="mt-1 text-xs text-brand-muted">
          Mettez à jour le statut de cette inscription.
        </p>

        <form action={statusAction} className="mt-4">
          <input type="hidden" name="registrationId" value={registrationId} />
          <fieldset disabled={statusPending}>
            <legend className="sr-only">Choisir un statut de suivi</legend>
            <div className="grid grid-cols-3 overflow-hidden rounded-sm border border-brand-ink/15">
              {statusOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex min-h-11 cursor-pointer items-center justify-center border-r border-brand-ink/15 px-2 text-center text-[11px] font-medium last:border-r-0 ${status === option.value ? "bg-brand-yellow" : "bg-white hover:bg-brand-soft"}`}
                >
                  <input
                    type="radio"
                    name="status"
                    value={option.value}
                    checked={status === option.value}
                    onChange={() => setStatus(option.value)}
                    className="sr-only"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>
          <button
            type="submit"
            disabled={statusPending || status === currentStatus}
            className="mt-2 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-sm bg-brand-yellow px-3 text-xs font-bold text-brand-ink transition hover:bg-brand-yellow/85 disabled:cursor-not-allowed disabled:opacity-55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink"
          >
            {statusPending ? (
              <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
            ) : (
              <Check aria-hidden="true" className="size-4" />
            )}
            Enregistrer le statut
          </button>
        </form>
      </section>

      <section className="border border-brand-ink/15 bg-white p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <MessageCircleMore aria-hidden="true" className="size-4" />
          <h2 className="text-sm font-bold">Notes de suivi</h2>
        </div>

        <div className="mt-3 max-h-72 space-y-4 overflow-y-auto">
          {notes.length ? (
            notes.map((item) => (
              <article key={item.id} className="border-b border-brand-ink/10 pb-3 last:border-0 last:pb-0">
                <div className="flex items-start gap-2">
                  <CircleUserRound aria-hidden="true" className="mt-0.5 size-7 shrink-0 fill-brand-ink/10 text-brand-ink/70" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold">{item.author_name}</p>
                    <time dateTime={item.created_at} className="block text-[10px] text-brand-muted">
                      {formatDateTime(item.created_at)}
                    </time>
                    <p className="mt-2 whitespace-pre-wrap text-xs leading-relaxed text-brand-ink/85">{item.content}</p>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p className="py-2 text-xs text-brand-muted">Aucune note pour le moment.</p>
          )}
        </div>

        <form action={noteAction} className="mt-4 border-t border-brand-ink/10 pt-3">
          <input type="hidden" name="registrationId" value={registrationId} />
          <label htmlFor="follow-up-note" className="text-xs font-semibold">
            Ajouter une note
          </label>
          <textarea
            id="follow-up-note"
            name="content"
            value={note}
            onChange={(event) => setNote(event.target.value.slice(0, 500))}
            maxLength={500}
            rows={3}
            placeholder="Écrire une note sur cette inscription…"
            className="mt-2 block w-full resize-y rounded-sm border border-brand-ink/15 bg-white p-3 text-xs outline-none placeholder:text-brand-muted/70 focus:border-brand-ink focus:ring-2 focus:ring-brand-yellow/60"
          />
          <p className="mt-1 text-right text-[10px] text-brand-muted">
            {note.length} / 500
          </p>
          <button
            type="submit"
            disabled={notePending || note.trim().length === 0}
            className="mt-2 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-sm bg-brand-yellow px-3 text-xs font-bold text-brand-ink transition hover:bg-brand-yellow/85 disabled:cursor-not-allowed disabled:opacity-55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink"
          >
            {notePending && (
              <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
            )}
            Ajouter une note
          </button>
        </form>
      </section>
    </>
  );
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("fr-MA", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Casablanca",
  }).format(new Date(value));
}
