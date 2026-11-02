"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Dialog } from "@base-ui/react/dialog";
import { ArrowRight, Check, CheckCircle2, ChevronDown, LoaderCircle } from "lucide-react";
import { Select } from "@base-ui/react/select";
import { toast } from "sonner";
import { z } from "zod";

import { createRegistration } from "@/app/actions/registrations";

const inputClassName =
  "mt-2 min-h-12 w-full border border-brand-ink/20 bg-brand-soft/45 px-4 text-base text-brand-ink outline-none transition placeholder:text-brand-muted/55 hover:border-brand-ink/40 focus:border-brand-ink focus:bg-white focus:ring-2 focus:ring-brand-yellow/70";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Saisissez votre nom (2 caractères minimum).")
    .regex(/\p{L}/u, "Votre nom doit contenir au moins une lettre."),
  status: z.string().trim().min(2, "Précisez votre situation actuelle."),
  phone: z
    .string()
    .trim()
    .min(8, "Saisissez un numéro de téléphone valide.")
    .regex(
      /^[+\d][\d\s().-]{6,18}\d$/,
      "Saisissez un numéro de téléphone valide.",
    ),
  email: z.string().trim().email("Saisissez une adresse e-mail valide."),
});

type ContactValues = z.input<typeof contactSchema>;

export default function ContactForm() {
  const [isSaving, setIsSaving] = useState(false);
  const [thankYouOpen, setThankYouOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      status: "",
      phone: "",
      email: "",
    } as ContactValues,
    validators: { onSubmit: contactSchema },
    onSubmit: async ({ value }) => {
      const parsed = contactSchema.safeParse(value);
      if (!parsed.success) return;

      if (isSaving) return;
      setIsSaving(true);

      try {
        const result = await createRegistration({
          name: parsed.data.name,
          situation: parsed.data.status,
          phone: parsed.data.phone,
          email: parsed.data.email,
        });

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        form.reset();
        setThankYouOpen(true);
      } catch {
        toast.error("Impossible d’enregistrer votre inscription. Réessayez.");
      } finally {
        setIsSaving(false);
      }
    },
  });

  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-brand-soft px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24"
    >
      <div className="mx-auto grid max-w-[1360px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20">
        <div>
          <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted sm:text-sm">
            <span aria-hidden="true" className="h-[2px] w-12 bg-brand-ink/55" />
            Inscription à la conférence en ligne
          </p>
          <h2 className="max-w-[500px] text-[clamp(2.2rem,4vw,3.6rem)] font-bold leading-[1.04] tracking-[-0.045em] text-brand-ink">
            Réservez votre place à la conférence
            <span className="text-brand-yellow">.</span>
          </h2>
          <p className="mt-5 max-w-[440px] text-base leading-7 text-brand-muted sm:text-lg">
            Remplissez vos coordonnées pour réserver votre place à la conférence
            en ligne sur le coaching carrière. Vous pourrez y découvrir comment
            avancer vers le bon emploi, le plus vite possible.
          </p>
          <a
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-ink"
            href="tel:+212661138432"
          >
            +212 661 138 432
          </a>
          <div
            aria-hidden="true"
            className="mt-10 hidden h-1 w-28 bg-brand-yellow lg:block"
          />
        </div>

        <form
          className="relative border border-brand-ink/15 bg-white p-6 shadow-[0_18px_50px_rgba(17,17,17,0.06)] before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-brand-yellow sm:p-9 lg:p-10"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            void form.handleSubmit();
          }}
        >
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
            <form.Field name="name">
              {(field) => {
                const error = field.state.meta.errors[0];
                return (
                  <label className="text-sm font-semibold text-brand-ink">
                    Votre nom
                    <input
                      autoComplete="name"
                      aria-invalid={!!error}
                      aria-describedby={error ? "name-error" : undefined}
                      className={inputClassName}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(event) => {
                        field.handleChange(event.target.value);
                      }}
                      placeholder="Ex. Salma El Amrani"
                      value={field.state.value}
                    />
                    {error && (
                      <span
                        className="mt-1 block text-xs font-medium text-red-700"
                        id="name-error"
                      >
                        {typeof error === "string" ? error : error.message}
                      </span>
                    )}
                  </label>
                );
              }}
            </form.Field>
            <form.Field name="status">
              {(field) => {
                const error = field.state.meta.errors[0];
                const situations = [
                  "Étudiant(e)",
                  "À la recherche d’un emploi",
                  "En poste",
                  "Entrepreneur(e)",
                  "Autre",
                ];

                return (
                  <div className="text-sm font-semibold text-brand-ink">
                    <Select.Root
                      items={situations.map((situation) => ({
                        value: situation,
                        label: situation,
                      }))}
                      name={field.name}
                      onValueChange={(value) => {
                        field.handleChange(value ?? "");
                      }}
                      value={field.state.value}
                    >
                      <Select.Label className="block">
                        Votre situation actuelle
                      </Select.Label>
                      <Select.Trigger
                        aria-describedby={error ? "status-error" : undefined}
                        aria-invalid={!!error}
                        className={`${inputClassName} flex items-center justify-between text-left data-placeholder:text-brand-muted/55`}
                        onBlur={field.handleBlur}
                      >
                        <Select.Value placeholder="Choisissez une situation" />
                        <Select.Icon>
                          <ChevronDown
                            aria-hidden="true"
                            className="size-4 shrink-0"
                          />
                        </Select.Icon>
                      </Select.Trigger>
                      <Select.Portal>
                        <Select.Positioner
                          className="z-50 outline-none"
                          sideOffset={4}
                        >
                          <Select.Popup className="max-h-[min(20rem,var(--available-height))] min-w-[var(--anchor-width)] overflow-y-auto border border-brand-ink/20 bg-white p-1 text-brand-ink shadow-lg outline-none">
                            <Select.List>
                              {situations.map((situation) => (
                                <Select.Item
                                  key={situation}
                                  value={situation}
                                  className="flex min-h-11 cursor-pointer items-center gap-3 px-3 text-sm font-medium outline-none data-highlighted:bg-brand-soft data-highlighted:text-brand-ink"
                                >
                                  <Select.ItemIndicator className="flex size-4 items-center justify-center text-brand-ink">
                                    <Check
                                      aria-hidden="true"
                                      className="size-4"
                                    />
                                  </Select.ItemIndicator>
                                  <Select.ItemText>{situation}</Select.ItemText>
                                </Select.Item>
                              ))}
                            </Select.List>
                          </Select.Popup>
                        </Select.Positioner>
                      </Select.Portal>
                    </Select.Root>
                    {error && (
                      <span
                        className="mt-1 block text-xs font-medium text-red-700"
                        id="status-error"
                      >
                        {typeof error === "string" ? error : error.message}
                      </span>
                    )}
                  </div>
                );
              }}
            </form.Field>
            <form.Field name="phone">
              {(field) => {
                const error = field.state.meta.errors[0];
                return (
                  <label className="text-sm font-semibold text-brand-ink">
                    Votre numéro de téléphone
                    <input
                      autoComplete="tel"
                      aria-invalid={!!error}
                      aria-describedby={error ? "phone-error" : undefined}
                      className={inputClassName}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(event) => {
                        field.handleChange(event.target.value);
                      }}
                      placeholder="+212 6 12 34 56 78"
                      type="tel"
                      value={field.state.value}
                    />
                    {error && (
                      <span
                        className="mt-1 block text-xs font-medium text-red-700"
                        id="phone-error"
                      >
                        {typeof error === "string" ? error : error.message}
                      </span>
                    )}
                  </label>
                );
              }}
            </form.Field>
            <form.Field name="email">
              {(field) => {
                const error = field.state.meta.errors[0];
                return (
                  <label className="text-sm font-semibold text-brand-ink">
                    Votre e-mail
                    <input
                      autoComplete="email"
                      aria-invalid={!!error}
                      aria-describedby={error ? "email-error" : undefined}
                      className={inputClassName}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(event) => {
                        field.handleChange(event.target.value);
                      }}
                      placeholder="vous@exemple.com"
                      type="email"
                      value={field.state.value}
                    />
                    {error && (
                      <span
                        className="mt-1 block text-xs font-medium text-red-700"
                        id="email-error"
                      >
                        {typeof error === "string" ? error : error.message}
                      </span>
                    )}
                  </label>
                );
              }}
            </form.Field>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-6">
            <p className="min-w-0 text-sm leading-relaxed text-brand-muted">
              Vos informations serviront à réserver votre place à la conférence en ligne.
            </p>
            <button
              className="group inline-flex min-h-12 w-full items-center justify-center gap-3 bg-brand-yellow px-4 text-sm font-semibold text-brand-ink transition-colors duration-200 hover:bg-brand-ink hover:text-white motion-reduce:transition-none cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink disabled:cursor-wait disabled:hover:bg-brand-yellow disabled:hover:text-brand-ink disabled:opacity-70 sm:w-auto sm:px-5"
              disabled={isSaving}
              type="submit"
            >
              {isSaving ? (
                <>
                  <LoaderCircle
                    aria-hidden="true"
                    className="size-4 animate-spin"
                  />
                  Enregistrement…
                </>
              ) : (
                <>
                  Envoyer mon inscription
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                  />
                </>
              )}
            </button>
          </div>
        </form>

        <Dialog.Root open={thankYouOpen} onOpenChange={setThankYouOpen}>
          <Dialog.Portal>
            <Dialog.Backdrop className="fixed inset-0 z-50 bg-brand-ink/45 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
            <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 border border-brand-ink/20 bg-white p-6 text-center shadow-xl outline-none transition-[scale,opacity] duration-200 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 sm:p-8">
              <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand-yellow/55 text-brand-ink">
                <CheckCircle2 aria-hidden="true" className="size-7" />
              </span>
              <Dialog.Title className="mt-5 text-2xl font-bold tracking-[-0.04em] text-brand-ink">
                Merci pour votre inscription !
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm leading-6 text-brand-muted">
                Votre demande a bien été enregistrée. Notre équipe vous contactera prochainement.
              </Dialog.Description>
              <Dialog.Close className="mt-6 inline-flex min-h-11 w-full cursor-pointer items-center justify-center bg-brand-yellow px-5 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink sm:w-auto">
                Fermer
              </Dialog.Close>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </section>
  );
}
