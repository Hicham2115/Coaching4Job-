import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

const paths = [
  {
    title: "Premier emploi",
    description:
      "Valorisez votre profil, préparez vos candidatures et réussissez vos entretiens pour démarrer votre carrière avec confiance.",
    image: "/images/first-job.jpg",
    imageAlt: "Jeune diplômé regardant vers son avenir professionnel",
  },
  {
    title: "Changer de poste",
    description:
      "Faites le point, clarifiez vos objectifs et positionnez-vous efficacement sur de nouvelles opportunités.",
    image: "/images/change-job.jpg",
    imageAlt: "Professionnelle réfléchissant à sa prochaine étape de carrière",
  },
  {
    title: "Devenir entrepreneur",
    description:
      "Transformez votre idée en projet solide et structurez les premières étapes de votre activité.",
    image: "/images/entrepreneur.jpg",
    imageAlt: "Futur entrepreneur travaillant sur son projet",
  },
];

const steps = [
  {
    title: "Comprendre votre point de départ",
    description: "Nous échangeons sur votre parcours, vos objectifs et les obstacles que vous rencontrez.",
  },
  {
    title: "Construire un plan concret",
    description: "Nous définissons les priorités et les outils adaptés à votre situation.",
  },
  {
    title: "Avancer à votre rythme",
    description: "Vous êtes accompagné·e dans les démarches et les décisions qui comptent.",
  },
];

export default function LandingSections() {
  return (
    <>
      <section id="accompagnements" className="scroll-mt-10 bg-white pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-16">
          <div className="border-t-2 border-brand-ink/65 pt-12 sm:pt-14">
            <p className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-muted">
              <span aria-hidden="true" className="h-[2px] w-12 bg-brand-ink/55" />
              Nos accompagnements
            </p>
            <div className="grid gap-5 lg:grid-cols-[1.7fr_0.8fr] lg:items-end lg:gap-14">
              <h2 className="max-w-[790px] text-[clamp(2rem,3.5vw,3.15rem)] font-bold leading-[1.12] tracking-[-0.045em] text-brand-ink">
                Trois parcours, un même objectif : faire avancer <span className="bg-[linear-gradient(to_top,#fff52d_28%,transparent_28%)]">votre carrière.</span>
              </h2>
              <p className="max-w-[370px] text-[15px] leading-7 text-brand-muted lg:pb-1 lg:text-base">
                Des accompagnements adaptés à votre profil et à vos ambitions, pour des choix éclairés et des résultats concrets.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-9">
            {paths.map((path) => (
              <article key={path.title} className="flex h-full flex-col border-b border-brand-ink/60 pb-8">
                <div className="relative aspect-[1.05] w-full overflow-hidden bg-brand-soft">
                  <Image alt={path.imageAlt} className="object-cover" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" src={path.image} />
                </div>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <h3 className="text-[clamp(1.25rem,2vw,1.7rem)] font-semibold leading-[1.2] tracking-[-0.035em] text-brand-ink">{path.title}</h3>
                  <Link href="#contact" aria-label={`Parler de l’accompagnement : ${path.title}`} className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-brand-ink text-brand-ink transition-colors hover:bg-brand-yellow">
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </div>
                <p className="mt-3 max-w-[375px] text-[15px] leading-[1.6] text-brand-muted">{path.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="methode" className="scroll-mt-10 bg-white">
        <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-16">
          <div className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.08fr_1fr] lg:items-center lg:gap-8 lg:py-24">
            <div className="lg:pr-2">
              <p className="mb-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-muted">
                <span aria-hidden="true" className="h-[2px] w-12 bg-brand-ink/55" />
                Notre méthode
              </p>
              <h2 className="max-w-[620px] text-[clamp(2rem,3vw,2.75rem)] font-bold leading-[1.12] tracking-[-0.045em] text-brand-ink">
                Un accompagnement <span className="lg:block">humain, concret et sur mesure<span className="text-brand-yellow">.</span></span>
              </h2>
              <p className="mt-7 max-w-[580px] text-[15px] leading-7 text-brand-muted sm:text-base">
                Nous combinons écoute, outils pratiques et connaissance du marché de l’emploi et de l’entrepreneuriat au Maroc pour vous aider à passer de la réflexion à l’action, à votre rythme.
              </p>
              <Link href="#methode-detail" className="mt-8 inline-flex min-h-[56px] items-center justify-between gap-8 rounded-full bg-brand-yellow px-7 text-[15px] font-semibold text-brand-ink transition-transform hover:-translate-y-0.5">
                Découvrir notre méthode
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <div className="relative aspect-[1.56] w-full overflow-hidden bg-brand-soft">
              <Image alt="Vue de la mosquée Hassan II et de la promenade de Casablanca" className="object-cover" fill sizes="(max-width: 1024px) 100vw, 50vw" src="/images/casablanca-method.jpg" />
            </div>
          </div>

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
        </div>
      </section>

      <section id="a-propos" className="scroll-mt-10 bg-brand-ink py-16 text-white sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-[1360px] gap-10 px-6 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-20 lg:px-16">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-white/65">Coaching 4 Job</p>
            <h2 className="max-w-[560px] text-3xl font-bold leading-[1.08] tracking-[-0.045em] sm:text-4xl lg:text-5xl">
              Le bon accompagnement au bon moment<span className="text-brand-yellow">.</span>
            </h2>
          </div>
          <div className="max-w-[520px]">
            <p className="text-[15px] leading-7 text-white/80 lg:text-base">
              Basé à Casablanca, Coaching 4 Job accompagne les personnes qui cherchent leur premier emploi, souhaitent changer de poste ou préparent une transition vers l’entrepreneuriat.
            </p>
            <p className="mt-5 text-[15px] leading-7 text-white/80 lg:text-base">
              Notre point de départ : votre parcours, vos compétences et ce que vous voulez faire ensuite.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-10 bg-brand-yellow py-16 sm:py-20 lg:py-24">
        <div className="mx-auto flex max-w-[1360px] flex-col items-start gap-9 px-6 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-16">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-ink/70">Parlons de votre projet</p>
            <h2 className="max-w-[760px] text-3xl font-bold leading-[1.08] tracking-[-0.045em] text-brand-ink sm:text-4xl lg:text-5xl">
              Prêt·e à écrire la suite de votre parcours ?
            </h2>
            <p className="mt-6 max-w-[600px] text-[15px] leading-7 text-brand-ink/75 lg:text-base">Échangeons sur votre situation et la prochaine étape qui vous conviendrait.</p>
          </div>
          <Link href="tel:+212661138432" className="inline-flex min-h-14 shrink-0 items-center gap-4 rounded-full bg-brand-ink px-7 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 sm:text-base">
            <Phone aria-hidden="true" className="size-4" />
            +212 661 138 432
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>

      <footer className="bg-white py-8">
        <div className="mx-auto flex max-w-[1360px] flex-col gap-3 px-6 text-sm text-brand-muted sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
          <p className="font-semibold text-brand-ink">Coaching 4 Job</p>
          <p>Casablanca, Maroc · Accompagnement en présentiel et à distance</p>
        </div>
      </footer>
    </>
  );
}
