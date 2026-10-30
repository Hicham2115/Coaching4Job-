import Image from "next/image";
import CopyrightYear from "@/components/copyright-year";

export default function SiteFooter() {
  return (
  <footer className="scroll-reveal bg-brand-ink text-white">
    <div className="mx-auto max-w-[1360px] px-6 py-10 sm:px-10 sm:py-12 lg:px-16">
      <div aria-hidden="true" className="mb-8 h-1 w-full bg-brand-yellow" />
      <div className="grid gap-8 sm:grid-cols-2 sm:items-start lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <a className="inline-flex items-center gap-3" href="#accueil">
            <Image
              src="/images/coaching4job-logo-transparent.png"
              alt="Coaching 4 Job"
              width={2050}
              height={312}
              sizes="(min-width: 640px) 280px, 240px"
              className="h-auto w-[240px] sm:w-[280px]"
            />
          </a>
          <p className="mt-4 max-w-[310px] text-sm leading-6 text-white/65">
            Un accompagnement humain pour trouver le bon emploi plus
            rapidement et avancer avec confiance.
          </p> </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
            Explorer
          </p>
          <nav
            aria-label="Navigation de pied de page"
            className="mt-4 flex flex-col items-start gap-3 text-sm text-white/85"
          >
            <a
              className="underline decoration-brand-yellow/0 decoration-2 underline-offset-4 transition-all duration-200 hover:translate-x-1 hover:text-brand-yellow hover:decoration-brand-yellow focus-visible:translate-x-1 focus-visible:text-brand-yellow focus-visible:decoration-brand-yellow focus-visible:outline-none"
              href="#accompagnements"
            >
              Accompagnements
            </a>
            <a
              className="underline decoration-brand-yellow/0 decoration-2 underline-offset-4 transition-all duration-200 hover:translate-x-1 hover:text-brand-yellow hover:decoration-brand-yellow focus-visible:translate-x-1 focus-visible:text-brand-yellow focus-visible:decoration-brand-yellow focus-visible:outline-none"
              href="#methode"
            >
              Notre méthode
            </a>
            <a
              className="underline decoration-brand-yellow/0 decoration-2 underline-offset-4 transition-all duration-200 hover:translate-x-1 hover:text-brand-yellow hover:decoration-brand-yellow focus-visible:translate-x-1 focus-visible:text-brand-yellow focus-visible:decoration-brand-yellow focus-visible:outline-none"
              href="#a-propos"
            >
              Notre approche
            </a>
          </nav>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
            Nous contacter
          </p>
          <p className="mt-4 text-sm text-white/85">Casablanca, Maroc</p>
          <a
            className="mt-3 inline-block text-sm font-semibold text-brand-yellow underline decoration-brand-yellow/0 decoration-2 underline-offset-4 transition-all duration-200 hover:translate-x-1 hover:text-white hover:decoration-brand-yellow focus-visible:text-white focus-visible:decoration-brand-yellow focus-visible:outline-none"
            href="tel:+212661138432"
          >
            +212 661 138 432
          </a>
          <p className="mt-2 text-sm text-white/55">
            En présentiel et à distance
          </p>
        </div>
      </div>
      <div className="mt-9 border-t border-white/15 pt-5 text-xs text-white/45">
        © <CopyrightYear /> Coaching 4 Job · Casablanca, Maroc
      </div>
    </div>
  </footer>
  );
}
