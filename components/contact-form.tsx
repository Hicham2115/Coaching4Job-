"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";

const inputClassName = "mt-2 min-h-12 w-full border border-brand-ink/20 bg-brand-soft/45 px-4 text-base text-brand-ink outline-none transition placeholder:text-brand-muted/55 hover:border-brand-ink/40 focus:border-brand-ink focus:bg-white focus:ring-2 focus:ring-brand-yellow/70";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const service = String(formData.get("service") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const text = `Bonjour Coaching 4 Job,\n\nJe m’appelle ${name}.\nE-mail : ${email}\nMon besoin : ${service}\n\n${message}`;

    window.open(`https://wa.me/212661138432?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <section id="contact" className="scroll-mt-20 bg-brand-soft px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto grid max-w-[1360px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20">
        <div>
          <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted sm:text-sm">
            <span aria-hidden="true" className="h-[2px] w-12 bg-brand-ink/55" />
            Parlons de votre projet
          </p>
          <h2 className="max-w-[500px] text-[clamp(2.2rem,4vw,3.6rem)] font-bold leading-[1.04] tracking-[-0.045em] text-brand-ink">
            Chaque parcours commence par un échange<span className="text-brand-yellow">.</span>
          </h2>
          <p className="mt-5 max-w-[440px] text-base leading-7 text-brand-muted sm:text-lg">
            Décrivez-nous votre situation. Nous vous répondrons pour convenir d’un premier échange.
          </p>
          <a className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-ink underline decoration-brand-yellow decoration-2 underline-offset-4" href="tel:+212661138432">
            +212 661 138 432
          </a>
          <div aria-hidden="true" className="mt-10 hidden h-1 w-28 bg-brand-yellow lg:block" />
        </div>

        <form className="relative border border-brand-ink/15 bg-white p-6 shadow-[0_18px_50px_rgba(17,17,17,0.06)] before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-brand-yellow sm:p-9 lg:p-10" onSubmit={handleSubmit}>
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
            <label className="text-sm font-semibold text-brand-ink">
              Votre nom
              <input autoComplete="name" className={inputClassName} name="name" placeholder="Ex. Salma El Amrani" required />
            </label>
            <label className="text-sm font-semibold text-brand-ink">
              Votre e-mail
              <input autoComplete="email" className={inputClassName} name="email" placeholder="vous@exemple.com" required type="email" />
            </label>
          </div>
          <label className="mt-5 block text-sm font-semibold text-brand-ink sm:mt-6">
            Votre projet
            <input className={inputClassName} name="service" placeholder="Premier emploi, changement de poste, entrepreneuriat…" required />
          </label>
          <label className="mt-5 block text-sm font-semibold text-brand-ink sm:mt-6">
            Votre message
            <textarea className={`${inputClassName} min-h-32 resize-y py-3`} maxLength={2000} name="message" placeholder="Parlez-nous de votre situation et de ce que vous souhaitez accomplir." required />
          </label>
          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p aria-live="polite" className="text-sm text-brand-muted">
              {sent ? "WhatsApp s’ouvre avec votre message prêt à envoyer." : "Le formulaire prépare un message WhatsApp à envoyer."}
            </p>
            <button className="inline-flex min-h-13 shrink-0 items-center gap-4 bg-brand-yellow px-6 text-sm font-semibold text-brand-ink shadow-[0_6px_18px_rgba(17,17,17,0.08)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(17,17,17,0.14)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink sm:text-base" type="submit">
              Continuer sur WhatsApp
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
