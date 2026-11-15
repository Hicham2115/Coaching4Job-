import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { accompaniments as paths } from "@/lib/accompaniments";

export default function Accompaniments() {
  return (
  <section
    id="accompagnements"
    className="scroll-reveal scroll-mt-10 bg-white pb-16 sm:pb-20 lg:pb-24"
  >
    <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-16">
      <div className="border-t-2 border-brand-ink/65 pt-12 sm:pt-14">
        <p className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-muted">
          <span
            aria-hidden="true"
            className="h-[2px] w-12 bg-brand-ink/55"
          />
          Nos accompagnements
        </p>
        <div className="grid gap-5 lg:grid-cols-[1.7fr_0.8fr] lg:items-end lg:gap-14">
          <h2 className="max-w-[790px] text-[clamp(2rem,3.5vw,3.15rem)] font-bold leading-[1.12] tracking-[-0.045em] text-brand-ink">
            Deux parcours, un même objectif : faire avancer{" "}
            <span className="bg-[linear-gradient(to_top,#fff52d_28%,transparent_28%)]">
              votre carrière.
            </span>
          </h2>
          <p className="max-w-[370px] text-[15px] leading-7 text-brand-muted lg:pb-1 lg:text-base">
            Des accompagnements adaptés à votre profil pour trouver le bon
            emploi plus rapidement et avancer vers vos ambitions.
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-7 lg:gap-9">
        {paths.map((path) => (
          <article
            key={path.title}
            className="flex h-full flex-col border-b border-brand-ink/60 pb-8"
          >
            <Link href={`/accompagnements/${path.slug}`} tabIndex={-1} aria-hidden="true" className="relative block aspect-[1.05] w-full overflow-hidden bg-brand-soft">
              <Image
                alt={path.imageAlt}
                className="object-cover"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                src={path.image}
              />
            </Link>
            <div className="mt-5 flex items-center justify-between gap-3">
              <h3 className="text-[clamp(1.25rem,2vw,1.7rem)] font-semibold leading-[1.2] tracking-[-0.035em] text-brand-ink">
                <Link href={`/accompagnements/${path.slug}`}>{path.title}</Link>
              </h3>
              <Link
                href={`/accompagnements/${path.slug}`}
                aria-label={`Découvrir l’accompagnement : ${path.title}`}
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-brand-ink text-brand-ink transition-colors hover:bg-brand-yellow"
              >
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <p className="mt-3 max-w-[375px] text-[15px] leading-[1.6] text-brand-muted">
              {path.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  </section>
  );
}
