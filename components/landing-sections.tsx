import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Monitor } from "lucide-react";
import ContactForm from "@/components/contact-form";

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

export default function LandingSections() {
  return (
    <>
      <section id="accompagnements" className="scroll-reveal scroll-mt-10 bg-white pb-16 sm:pb-20 lg:pb-24">
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

      <section id="methode" className="scroll-reveal scroll-mt-10 bg-white">
        <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-16">
          <div className="grid gap-8 py-12 sm:py-16 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-6 lg:py-14">
            <div className="lg:pr-2">
              <p className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted sm:text-sm">
                <span aria-hidden="true" className="h-[2px] w-12 bg-brand-ink/55" />
                Notre méthode
              </p>
              <h2 className="max-w-[700px] text-[clamp(2.15rem,3.1vw,3.35rem)] font-bold leading-[1.1] tracking-[-0.045em] text-brand-ink">
                Un accompagnement <span className="lg:block">humain, concret et sur mesure<span className="text-brand-yellow">.</span></span>
              </h2>
              <p className="mt-7 max-w-[620px] text-base leading-7 text-brand-muted sm:text-lg sm:leading-8">
                Nous combinons écoute, outils pratiques et connaissance du marché de l’emploi et de l’entrepreneuriat au Maroc pour vous aider à passer de la réflexion à l’action, à votre rythme.
              </p>
              <Link href="#methode-detail" className="mt-8 inline-flex min-h-[62px] items-center justify-between gap-8 rounded-full bg-brand-yellow px-8 text-base font-semibold text-brand-ink transition-transform hover:-translate-y-0.5 sm:text-lg">
                Découvrir notre méthode
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <div className="relative aspect-[1.56] w-full overflow-hidden bg-brand-soft">
              <Image alt="Vue de la mosquée Hassan II et de la promenade de Casablanca" className="object-cover" fill sizes="(max-width: 1024px) 100vw, 50vw" src="/images/casablanca-method.jpg" />
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

      <section id="a-propos" className="scroll-reveal scroll-mt-10 bg-white py-14 text-brand-ink sm:py-18 lg:py-20">
        <div className="mx-auto grid max-w-[1480px] gap-0 px-6 sm:px-10 lg:grid-cols-[0.82fr_1.18fr] lg:px-16">
          <div aria-hidden="true" className="relative flex min-h-[280px] items-center justify-center overflow-hidden border border-brand-ink bg-brand-ink sm:min-h-[380px] lg:min-h-[440px]">
            <div className="relative flex size-[220px] items-center justify-center rounded-full border-[28px] border-brand-yellow sm:size-[290px] sm:border-[36px] lg:size-[340px]">
              <div className="size-[72px] rounded-full bg-brand-yellow sm:size-24" />
            </div>
            <div className="absolute inset-y-0 right-0 w-[14%] bg-white" />
          </div>
          <div className="flex flex-col justify-center border border-t-0 border-brand-ink px-7 py-10 sm:px-10 sm:py-14 lg:border-l-0 lg:border-t lg:px-14 xl:px-16">
            <p className="mb-7 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-muted sm:text-base">
              Notre approche <span aria-hidden="true" className="h-px flex-1 bg-brand-ink" />
            </p>
            <h2 className="max-w-[760px] text-[clamp(2.2rem,3.4vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.045em] text-brand-ink">
              Un accompagnement concret, à chaque étape de votre parcours<span className="text-brand-yellow">.</span>
            </h2>
            <p className="mt-6 max-w-[700px] text-lg leading-8 text-brand-muted sm:text-xl sm:leading-9">
              Nous vous aidons à clarifier vos objectifs, à développer vos compétences et à passer à l’action avec un coaching adapté à votre situation : premier emploi, évolution professionnelle ou projet entrepreneurial.
            </p>
            <div className="mt-8 grid gap-6 border-t border-brand-ink/20 pt-6 sm:grid-cols-2 sm:gap-8">
              <div className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-brand-ink" />
                <div>
                  <h3 className="text-sm font-semibold text-brand-ink sm:text-base">Casablanca</h3>
                  <p className="mt-1 text-sm leading-5 text-brand-muted">Des séances en présentiel dans un cadre professionnel et accessible.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Monitor aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-brand-ink" />
                <div>
                  <h3 className="text-sm font-semibold text-brand-ink sm:text-base">À distance</h3>
                  <p className="mt-1 text-sm leading-5 text-brand-muted">Un accompagnement flexible, où que vous soyez au Maroc ou ailleurs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="scroll-reveal bg-white py-2 sm:py-3">
        <div className="relative mx-auto flex min-h-[430px] max-w-none items-center overflow-hidden border-y border-brand-ink bg-brand-soft px-7 py-12 sm:min-h-[540px] sm:px-12 lg:min-h-[calc(100svh-10rem)] lg:px-[7.2vw]">
          <Image alt="La mosquée Hassan II et le littoral de Casablanca" className="object-cover object-[58%_54%]" fill sizes="100vw" src="/images/casablanca-method.jpg" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#f6f3ec]/82 via-[#f6f3ec]/56 to-transparent" />
          <div aria-hidden="true" className="absolute -bottom-40 -left-36 size-72 rounded-full border-[48px] border-brand-yellow/90 sm:-bottom-56 sm:-left-48 sm:size-[480px] sm:border-[68px]" />
          <div className="relative z-10 max-w-[680px]">
            <p className="mb-7 flex items-center gap-5 text-sm font-medium uppercase tracking-[0.12em] text-brand-ink sm:text-base">
              Coaching 4 Job <span aria-hidden="true" className="h-[2px] w-36 bg-brand-ink sm:w-52" />
            </p>
            <h2 className="max-w-[650px] text-[clamp(3rem,6.3vw,6.2rem)] font-bold leading-[0.94] tracking-[-0.055em] text-brand-ink [text-shadow:0_1px_1px_rgba(255,255,255,0.16)]">
              Votre avenir<br />se construit<br />aujourd’hui.
            </h2>
            <Link href="tel:+212661138432" className="mt-8 inline-flex min-h-16 items-center gap-7 bg-brand-yellow px-8 text-lg font-semibold text-brand-ink shadow-[0_8px_24px_rgba(17,17,17,0.12)] transition-transform hover:-translate-y-0.5 sm:min-h-[76px] sm:px-12 sm:text-xl">
              Choisir mon parcours
              <ArrowRight aria-hidden="true" className="size-6" />
            </Link>
          </div>
        </div>
      </section>

      <ContactForm />

      <footer className="scroll-reveal bg-white py-8">
        <div className="mx-auto flex max-w-[1360px] flex-col gap-3 px-6 text-sm text-brand-muted sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
          <p className="font-semibold text-brand-ink">Coaching 4 Job</p>
          <p>Casablanca, Maroc · Accompagnement en présentiel et à distance</p>
        </div>
      </footer>
    </>
  );
}
