"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { Select } from "@base-ui/react/select";
import { z } from "zod";

const inputClassName = "mt-2 min-h-12 w-full border border-brand-ink/20 bg-brand-soft/45 px-4 text-base text-brand-ink outline-none transition placeholder:text-brand-muted/55 hover:border-brand-ink/40 focus:border-brand-ink focus:bg-white focus:ring-2 focus:ring-brand-yellow/70";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Saisissez votre nom (2 caractères minimum).")
    .regex(/\p{L}/u, "Votre nom doit contenir au moins une lettre."),
  status: z.string().trim().min(2, "Précisez votre situation actuelle."),
  phone: z.string().trim().min(8, "Saisissez un numéro de téléphone valide.")
    .regex(/^[+\d][\d\s().-]{6,18}\d$/, "Saisissez un numéro de téléphone valide."),
  email: z.string().trim().email("Saisissez une adresse e-mail valide."),
});

type ContactValues = z.input<typeof contactSchema>;

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const form = useForm({
    defaultValues: { name: "", status: "", phone: "", email: "" } as ContactValues,
    validators: { onSubmit: contactSchema },
    onSubmit: ({ value }) => {
      const parsed = contactSchema.safeParse(value);
      if (!parsed.success) return;

      const { name, status, phone, email } = parsed.data;
      const text = `Bonjour Coaching 4 Job,\n\nNom : ${name}\nSituation actuelle : ${status}\nTéléphone : ${phone}\nE-mail : ${email}`;
      window.open(`https://wa.me/212661138432?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
      setSent(true);
    },
  });

  return (
    <section id="contact" className="scroll-mt-20 bg-brand-soft px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto grid max-w-[1360px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20">
        <div>
          <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted sm:text-sm">
            <span aria-hidden="true" className="h-[2px] w-12 bg-brand-ink/55" />
            Inscription à la séance gratuite
          </p>
          <h2 className="max-w-[500px] text-[clamp(2.2rem,4vw,3.6rem)] font-bold leading-[1.04] tracking-[-0.045em] text-brand-ink">
            Votre séance gratuite de coaching<span className="text-brand-yellow">.</span>
          </h2>
          <p className="mt-5 max-w-[440px] text-base leading-7 text-brand-muted sm:text-lg">
            Remplissez vos informations pour demander votre séance gratuite. Nous vous contacterons pour confirmer les détails et vous aider à avancer vers le bon emploi, le plus vite possible.
          </p>
          <a className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-ink" href="tel:+212661138432">
            +212 661 138 432
          </a>
          <div aria-hidden="true" className="mt-10 hidden h-1 w-28 bg-brand-yellow lg:block" />
        </div>

        <form className="relative border border-brand-ink/15 bg-white p-6 shadow-[0_18px_50px_rgba(17,17,17,0.06)] before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-brand-yellow sm:p-9 lg:p-10" noValidate onSubmit={(event) => { event.preventDefault(); void form.handleSubmit(); }}>
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
            <form.Field name="name">
              {(field) => {
                const error = field.state.meta.errors[0];
                return <label className="text-sm font-semibold text-brand-ink">
                  Votre nom
                  <input autoComplete="name" aria-invalid={!!error} aria-describedby={error ? "name-error" : undefined} className={inputClassName} name={field.name} onBlur={field.handleBlur} onChange={(event) => field.handleChange(event.target.value)} placeholder="Ex. Salma El Amrani" value={field.state.value} />
                  {error && <span className="mt-1 block text-xs font-medium text-red-700" id="name-error">{typeof error === "string" ? error : error.message}</span>}
                </label>;
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

                return <div className="text-sm font-semibold text-brand-ink">
                  <Select.Root
                    name={field.name}
                    onValueChange={(value) => field.handleChange(value ?? "")}
                    value={field.state.value}
                  >
                    <Select.Label className="block">Votre situation actuelle</Select.Label>
                    <Select.Trigger
                      aria-describedby={error ? "status-error" : undefined}
                      aria-invalid={!!error}
                      className={`${inputClassName} flex items-center justify-between text-left data-placeholder:text-brand-muted/55`}
                      onBlur={field.handleBlur}
                    >
                      <Select.Value placeholder="Choisissez une situation" />
                      <Select.Icon><ChevronDown aria-hidden="true" className="size-4 shrink-0" /></Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Positioner className="z-50 outline-none" sideOffset={4}>
                        <Select.Popup className="max-h-[min(20rem,var(--available-height))] min-w-[var(--anchor-width)] overflow-y-auto border border-brand-ink/20 bg-white p-1 text-brand-ink shadow-lg outline-none">
                          <Select.List>
                            {situations.map((situation) => (
                              <Select.Item
                                key={situation}
                                value={situation}
                                className="flex min-h-11 cursor-pointer items-center gap-3 px-3 text-sm font-medium outline-none data-highlighted:bg-brand-soft data-highlighted:text-brand-ink"
                              >
                                <Select.ItemIndicator className="flex size-4 items-center justify-center text-brand-ink">
                                  <Check aria-hidden="true" className="size-4" />
                                </Select.ItemIndicator>
                                <Select.ItemText>{situation}</Select.ItemText>
                              </Select.Item>
                            ))}
                          </Select.List>
                        </Select.Popup>
                      </Select.Positioner>
                    </Select.Portal>
                  </Select.Root>
                  {error && <span className="mt-1 block text-xs font-medium text-red-700" id="status-error">{typeof error === "string" ? error : error.message}</span>}
                </div>;
              }}
            </form.Field>
            <form.Field name="phone">
              {(field) => {
                const error = field.state.meta.errors[0];
                return <label className="text-sm font-semibold text-brand-ink">
                  Votre numéro de téléphone
                  <input autoComplete="tel" aria-invalid={!!error} aria-describedby={error ? "phone-error" : undefined} className={inputClassName} name={field.name} onBlur={field.handleBlur} onChange={(event) => field.handleChange(event.target.value)} placeholder="+212 6 12 34 56 78" type="tel" value={field.state.value} />
                  {error && <span className="mt-1 block text-xs font-medium text-red-700" id="phone-error">{typeof error === "string" ? error : error.message}</span>}
                </label>;
              }}
            </form.Field>
            <form.Field name="email">
              {(field) => {
                const error = field.state.meta.errors[0];
                return <label className="text-sm font-semibold text-brand-ink">
                  Votre e-mail
                  <input autoComplete="email" aria-invalid={!!error} aria-describedby={error ? "email-error" : undefined} className={inputClassName} name={field.name} onBlur={field.handleBlur} onChange={(event) => field.handleChange(event.target.value)} placeholder="vous@exemple.com" type="email" value={field.state.value} />
                  {error && <span className="mt-1 block text-xs font-medium text-red-700" id="email-error">{typeof error === "string" ? error : error.message}</span>}
                </label>;
              }}
            </form.Field>
          </div>
          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p aria-live="polite" className="text-sm text-brand-muted">
              {sent ? "WhatsApp s’ouvre avec votre demande prête à envoyer." : "Vos informations serviront à demander votre séance gratuite de coaching."}
            </p>
            <button className="inline-flex min-h-13 shrink-0 items-center gap-4 bg-brand-yellow px-6 text-sm font-semibold text-brand-ink shadow-[0_6px_18px_rgba(17,17,17,0.08)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(17,17,17,0.14)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink sm:text-base" type="submit">
              Envoyer ma demande sur WhatsApp
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
