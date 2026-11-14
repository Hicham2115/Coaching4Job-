import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Clock,
  Compass,
  Laptop,
  MousePointerClick,
  Target,
  TrendingUp,
  X,
} from "lucide-react";

const topics = [
  "Stratégie de recherche",
  "Curriculum vitae",
  "Lettre de motivation",
  "Entretiens",
  "Période d’essai",
];

const mistakes = [
  "Envoyer le même CV partout",
  "Attendre uniquement les offres",
  "Ne pas utiliser son réseau",
  "Ne pas cibler les entreprises",
  "Ne pas suivre ses candidatures",
  "Oublier de relancer",
];

const steps = [
  {
    icon: Target,
    title: "Cibler",
    text: "Votre objectif, votre marché, vos entreprises.",
  },
  {
    icon: MousePointerClick,
    title: "Agir",
    text: "Prospecter, candidater, développer votre réseau et relancer.",
  },
  {
    icon: TrendingUp,
    title: "Piloter",
    text: "Suivre vos candidatures, mesurer vos résultats et améliorer votre stratégie.",
  },
];

const details = [
  { icon: Calendar, label: "Date", value: "À choisir à l’inscription" },
  { icon: Clock, label: "Heure", value: "À préciser" },
  { icon: Laptop, label: "En ligne", value: "60–75 min" },
];

const highlight =
  "bg-[linear-gradient(to_top,#fff52d_28%,transparent_28%)]";

export default function Webinar() {
  return (
    <section
      id="webinaire"
      className="scroll-reveal scroll-mt-10 bg-white pb-16 sm:pb-20 lg:pb-24"
    >
      <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-16">
        <div className="border-t-2 border-brand-ink/65 pt-12 sm:pt-14">
          <p className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-muted">
            <span aria-hidden="true" className="h-[2px] w-12 bg-brand-ink/55" />
            Webinaire gratuit
          </p>
          <div className="grid gap-5 lg:grid-cols-[1.7fr_0.8fr] lg:items-end lg:gap-14">
            <h2 className="max-w-[790px] text-[clamp(2rem,3.5vw,3.15rem)] font-bold leading-[1.12] tracking-[-0.045em] text-brand-ink">
              Comment approcher le marché du travail ?{" "}
              <span className={highlight}>Les 10 erreurs à éviter.</span>
            </h2>
            <p className="max-w-[370px] text-[15px] leading-7 text-brand-muted lg:pb-1 lg:text-base">
              Vous envoyez des candidatures mais obtenez peu de réponses ? Le
              problème n’est pas forcément votre motivation : votre recherche
              d’emploi a peut-être besoin d’une méthode.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h3 className="text-[clamp(1.25rem,2vw,1.7rem)] font-semibold leading-[1.2] tracking-[-0.035em] text-brand-ink">
              Et si vous ne cherchiez pas au bon endroit ?
            </h3>
            <ul className="mt-6 grid gap-3 border-t border-brand-ink/60 pt-6 sm:grid-cols-2">
              {mistakes.map((mistake) => (
                <li
                  key={mistake}
                  className="flex items-start gap-3 text-[15px] leading-6 text-brand-ink"
                >
                  <X
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-red-600"
                    strokeWidth={3}
                  />
                  {mistake}
                </li>
              ))}
            </ul>

            <h3 className="mt-10 text-[clamp(1.25rem,2vw,1.7rem)] font-semibold leading-[1.2] tracking-[-0.035em] text-brand-ink">
              Au programme
            </h3>
            <ul className="mt-6 flex flex-wrap gap-3 border-t border-brand-ink/60 pt-6">
              {topics.map((topic) => (
                <li
                  key={topic}
                  className="bg-brand-soft px-4 py-2 text-sm font-semibold text-brand-ink ring-1 ring-brand-ink/20"
                >
                  <span className="mr-2 text-brand-yellow">●</span>
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="flex items-center gap-3 text-[clamp(1.25rem,2vw,1.7rem)] font-semibold leading-[1.2] tracking-[-0.035em] text-brand-ink">
              <Compass aria-hidden="true" className="size-6 shrink-0" />
              Gérez votre recherche comme un véritable projet
            </h3>
            <p className="mt-3 max-w-[520px] text-[15px] leading-[1.6] text-brand-muted">
              Découvrez une méthode structurée pour passer de la candidature à
              l’embauche et réussir sa recherche d’emploi au Maroc.
            </p>
            <ol className="mt-6 grid gap-5 border-t border-brand-ink/60 pt-6 sm:grid-cols-3">
              {steps.map(({ icon: Icon, title, text }) => (
                <li key={title}>
                  <span className="inline-flex size-12 items-center justify-center rounded-full bg-brand-yellow text-brand-ink">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <p className="mt-3 text-lg font-bold text-brand-ink">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-brand-muted">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-12 grid gap-8 border-y border-brand-ink bg-brand-soft p-6 sm:p-8 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-10">
          <div className="relative size-24 shrink-0 sm:size-28">
            <Image
              src="/images/driss-benchekroun.jpg"
              alt="Driss Benchekroun, animateur du webinaire"
              fill
              sizes="112px"
              className="object-cover object-[50%_25%]"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-muted">
              Animé par
            </p>
            <p className="mt-1 text-xl font-bold tracking-[-0.03em] text-brand-ink">
              M. Driss Benchekroun
            </p>
            <p className="mt-2 max-w-[640px] text-[15px] leading-7 text-brand-muted">
              Ingénieur en informatique de l’INSA de Lyon, 40 ans d’expérience
              dont 18 ans en recrutement, serial entrepreneur depuis 30 ans. Il
              dirige le cabinet Coaching 4 Job, spécialisé dans
              l’accompagnement des candidats en recherche d’emploi.
            </p>
          </div>
          <div className="flex flex-col gap-5 lg:items-end">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {details.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex items-center gap-2 text-sm text-brand-ink">
                  <Icon aria-hidden="true" className="size-5 shrink-0" />
                  <span>
                    <span className="font-semibold">{label}</span> · {value}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="#contact"
              className="inline-flex min-h-14 w-fit items-center justify-center gap-6 whitespace-nowrap rounded-full bg-brand-yellow pl-7 pr-6 text-base font-bold text-brand-ink transition-transform hover:-translate-y-0.5"
            >
              S’inscrire gratuitement
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
