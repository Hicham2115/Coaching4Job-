import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Page introuvable | Coaching 4 Job",
  description: "Cette page n’existe pas ou a été déplacée.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col bg-brand-soft text-brand-ink">
      <header className="border-b border-brand-ink/15 bg-white">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center px-6 sm:px-10">
          <Link href="/" aria-label="Coaching 4 Job, accueil">
            <Image
              src="/images/coaching4job-logo.png"
              alt="Coaching 4 Job"
              width={2050}
              height={312}
              priority
              className="h-auto w-[190px] sm:w-[220px]"
            />
          </Link>
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-7xl flex-1 items-center px-6 py-16 sm:px-10">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-muted">
            Erreur 404
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-[-0.05em] sm:text-6xl">
            Cette page n’existe pas<span className="text-brand-yellow">.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-brand-muted sm:text-lg">
            Le lien est peut-être incorrect ou la page a été déplacée. Revenez à
            l’accueil pour poursuivre votre visite.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center gap-3 rounded-full bg-brand-yellow px-6 text-sm font-semibold text-brand-ink transition hover:bg-brand-yellow/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-ink"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Retour à l’accueil
            </Link>
            <Link
              href="/espace-pro"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-brand-muted underline underline-offset-4 transition hover:text-brand-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-ink"
            >
              Espace Pro <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-brand-ink/15 bg-white px-6 py-5 text-center text-xs text-brand-muted sm:px-10">
        Coaching 4 Job · Casablanca, Maroc
      </footer>
    </main>
  );
}
