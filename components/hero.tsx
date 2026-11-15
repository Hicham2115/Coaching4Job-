import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <main
      id="accueil"
      className="relative isolate flex min-h-[calc(100svh-94px)] w-full items-center overflow-hidden bg-brand-ink"
    >
      <Image
        alt=""
        aria-hidden="true"
        className="-z-30 object-cover"
        fill
        priority
        sizes="100vw"
        src="/images/hero-poster.jpg"
      />
      <video
        aria-hidden="true"
        autoPlay
        className="absolute inset-0 -z-20 size-full object-cover motion-reduce:hidden"
        loop
        muted
        playsInline
        poster="/images/hero-poster.jpg"
        preload="auto"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-ink/90 via-brand-ink/50 to-transparent max-lg:bg-none max-lg:bg-brand-ink/60"
      />

      <section className="mx-auto w-full max-w-[1510px] px-5 py-14 sm:px-6 lg:px-[3.2%] lg:py-20">
        <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.14em] sm:text-[11px] sm:gap-4 text-white/80 lg:mb-8">
          <span aria-hidden="true" className="h-[2px] w-8 shrink-0 bg-brand-yellow sm:w-12 lg:w-16" />
          Coaching carrière à Casablanca
        </p>
        <h1 className="max-w-[760px] text-balance text-[2.1rem] font-extrabold leading-[1.1] tracking-[-0.04em] sm:text-5xl lg:text-[clamp(3rem,5vw,5.2rem)] lg:leading-[1.04] lg:tracking-[-0.05em] text-white">
          Le bon emploi, le plus vite possible<span className="text-brand-yellow">.</span>
        </h1>
        <p className="mt-5 max-w-[620px] text-[15px] leading-[1.65] text-white/90 sm:text-[17px] lg:mt-8 lg:text-[19px] lg:leading-8">
          Nous vous aidons à avancer rapidement vers le bon emploi. Remplissez le formulaire pour réserver votre place à notre conférence en ligne sur le coaching carrière.
        </p>
        <Link
          href="#contact"
          className="mt-7 inline-flex min-h-12 w-full items-center justify-between gap-7 sm:min-h-14 sm:w-fit sm:justify-center whitespace-nowrap rounded-full bg-brand-yellow pl-7 pr-6 text-base font-bold text-brand-ink transition-transform hover:-translate-y-0.5 lg:mt-10 lg:min-h-[64px] lg:pl-9 lg:pr-7 lg:text-[17px]"
        >
          Réserver ma place
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </section>
    </main>
  );
}
