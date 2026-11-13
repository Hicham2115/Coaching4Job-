import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Method() {
  return (
  <section id="methode" className="scroll-reveal scroll-mt-10 bg-white">
    <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-16">
      <div className="grid gap-0 py-12 sm:py-16 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-6 lg:py-14">
        <div className="relative z-10 order-2 -mt-10 mx-3 border border-brand-ink/10 bg-white/95 p-6 shadow-[0_14px_36px_rgba(17,17,17,0.08)] backdrop-blur-sm sm:mx-0 sm:p-8 lg:order-1 lg:mt-0 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none lg:pr-2">
          <p className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted sm:text-sm">
            <span
              aria-hidden="true"
              className="h-[2px] w-12 bg-brand-ink/55"
            />
            Notre méthode
          </p>
          <h2 className="max-w-[700px] text-[clamp(1.9rem,3.1vw,3.35rem)] font-bold leading-[1.1] tracking-[-0.045em] text-brand-ink">
            Un accompagnement{" "}
            <span className="lg:block">
              humain, concret et sur mesure
              <span className="text-brand-yellow">.</span>
            </span>
          </h2>
          <p className="mt-7 max-w-[620px] text-base leading-7 text-brand-muted sm:text-lg sm:leading-8">
            Nous combinons écoute, outils pratiques et connaissance du
            marché marocain pour vous aider à clarifier votre objectif,
            préparer vos démarches et avancer plus vite vers le bon emploi.
          </p>
          <Link
            href="#contact"
            className="mt-8 inline-flex min-h-[62px] w-full items-center justify-center gap-3 whitespace-nowrap rounded-full bg-brand-yellow px-4 text-sm font-semibold text-brand-ink transition-transform hover:-translate-y-0.5 sm:w-auto sm:justify-between sm:gap-8 sm:px-8 sm:text-lg"
          >
            Réserver ma place à la conférence
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <div className="relative order-1 aspect-[1.3] w-full overflow-hidden bg-brand-soft sm:aspect-[1.56] lg:order-2">
          <Image
            alt="Vue de la mosquée Hassan II et de la promenade de Casablanca"
            className="object-cover"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            src="/images/casablanca-method.jpg"
          />
        </div>
      </div>

      {/* Temporarily hidden while the progression section is being reviewed.
      <div className="border-t border-brand-ink/60" />
      <div id="methode-detail" className="scroll-mt-10 grid gap-10 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted">Votre progression</p>
          <h3 className="max-w-[540px] text-3xl font-bold leading-[1.08] tracking-[-0.045em] text-brand-ink sm:text-4xl">
            De votre point de départ à vos prochaines actions<span className="text-brand-yellow">.</span>
          </h3>
        </div>
        <div className="border-t border-brand-ink/25">
          {steps.map((step, index) => (
            <div key={step.title} className="grid grid-cols-[50px_1fr] gap-4 border-b border-brand-ink/25 py-7">
              <span className="pt-1 text-xs font-semibold tracking-[0.12em] text-brand-muted">0{index + 1}</span>
              <div>
                <h3 className="text-lg font-semibold tracking-[-0.025em] text-brand-ink sm:text-xl">{step.title}</h3>
                <p className="mt-3 max-w-[500px] text-[15px] leading-7 text-brand-muted">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      */}
    </div>
  </section>
  );
}
