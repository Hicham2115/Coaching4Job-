import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <main id="accueil" className="mx-auto grid min-h-[calc(100svh-94px)] w-full max-w-[1510px] grid-cols-1 lg:grid-cols-[0.92fr_1.08fr]">
      <section className="relative z-10 mb-0 flex flex-col items-start justify-center bg-gradient-to-b from-white via-white/95 to-transparent px-4 py-14 sm:px-6 lg:bg-none lg:px-[3.2%] lg:py-16">
        <p className="hero-enter hero-enter-1 mb-7 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-muted lg:mb-8">
          <span aria-hidden="true" className="h-[2px] w-12 bg-brand-ink/55 lg:w-16" />
          Coaching carrière à Casablanca
        </p>
        <h1 className="hero-enter hero-enter-2 max-w-[700px] text-balance text-[clamp(3.2rem,4.6vw,4.8rem)] font-extrabold leading-[1.04] tracking-[-0.05em] text-brand-ink">
          Le bon emploi, le plus vite possible<span className="text-brand-yellow">.</span>
        </h1>
        <p className="hero-enter hero-enter-3 mt-7 max-w-[600px] text-base leading-7 text-brand-muted sm:text-[17px] lg:mt-8 lg:text-[19px] lg:leading-8">
          Nous vous aidons à avancer rapidement vers le bon emploi. Remplissez le formulaire pour réserver votre place à notre conférence en ligne sur le coaching carrière.
        </p>
        <Link href="#contact" className="hero-enter hero-enter-4 mt-6 inline-flex min-h-14 w-fit max-w-full items-center justify-center gap-7 whitespace-nowrap rounded-full bg-brand-yellow pl-7 pr-6 text-base font-bold text-brand-ink transition-transform hover:-translate-y-0.5 sm:mt-7 lg:mt-9 lg:min-h-[64px] lg:pl-9 lg:pr-7 lg:text-[17px]">
          Réserver ma place
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </section>

      <section aria-label="Coaching professionnel" className="relative z-0 min-h-[440px] overflow-hidden bg-brand-soft sm:min-h-[520px] lg:min-h-0">
        <Image
          alt="Jeune professionnelle réfléchissant à son avenir dans un espace de travail lumineux"
          className="object-cover object-[center_35%]"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          src="/images/coaching-4-job-hero-hd.jpg"
        />
      </section>
    </main>
  );
}
