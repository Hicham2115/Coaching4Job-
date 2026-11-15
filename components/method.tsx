import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Method() {
  return (
  <section id="methode" className="scroll-mt-10 overflow-x-clip bg-white">
    <div className="mx-auto max-w-[1360px] px-5 sm:px-10 lg:px-12 xl:px-16">
      <div className="grid gap-0 py-10 sm:py-14 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-8 lg:py-14 xl:gap-10">
        <div className="relative z-10 order-2 -mt-8 mx-2 border border-brand-ink/10 bg-white/95 p-5 shadow-[0_14px_36px_rgba(17,17,17,0.08)] backdrop-blur-sm sm:-mt-12 sm:mx-6 sm:p-8 md:mx-12 lg:order-1 lg:mx-0 lg:mt-0 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none lg:pr-2">
          <p className="mb-5 flex items-center gap-3 text-xs sm:mb-7 font-semibold uppercase tracking-[0.16em] text-brand-muted sm:text-sm">
            <span
              aria-hidden="true"
              className="h-[2px] w-12 bg-brand-ink/55"
            />
            Notre méthode
          </p>
          <h2 className="max-w-[700px] text-[clamp(1.75rem,5.5vw,2.6rem)] lg:text-[clamp(2rem,3.1vw,3.35rem)] font-bold leading-[1.1] tracking-[-0.045em] text-brand-ink">
            Un accompagnement{" "}
            <span className="lg:block">
              humain, concret et sur mesure
              <span className="text-brand-yellow">.</span>
            </span>
          </h2>
          <p className="mt-5 max-w-[620px] text-[15px] leading-7 text-brand-muted sm:mt-7 sm:text-base lg:text-lg lg:leading-8">
            Nous combinons écoute, outils pratiques et connaissance du
            marché marocain pour vous aider à clarifier votre objectif,
            préparer vos démarches et avancer plus vite vers le bon emploi.
          </p>
          <Link
            href="#contact"
            className="mt-7 inline-flex min-h-14 w-full items-center justify-between gap-4 rounded-full bg-brand-yellow py-3 pl-6 pr-5 text-left text-[15px] font-semibold leading-snug text-brand-ink transition-transform hover:-translate-y-0.5 sm:w-auto sm:gap-8 sm:px-8 sm:text-base lg:mt-8 lg:w-full xl:w-auto xl:text-lg"
          >
            Réserver ma place à la conférence
            <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
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
