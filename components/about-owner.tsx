import Image from "next/image";
import { GraduationCap, Quote, Users } from "lucide-react";

const facts = [
  { value: "18 ans", label: "dans le recrutement" },
  { value: "INSA Lyon", label: "Ingénieur en informatique" },
  { value: "2024", label: "Création de Coaching 4 Job" },
];

export default function AboutOwner() {
  return (
    <section
      id="qui-suis-je"
      className="scroll-mt-10 bg-white py-9 text-brand-ink sm:py-18 lg:py-20"
    >
      <div className="mx-auto grid max-w-[1800px] gap-0 px-4 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <div className="relative min-h-[380px] overflow-hidden border border-brand-ink bg-brand-ink sm:min-h-[560px] lg:min-h-[680px]">
          <Image
            src="/images/driss-benchekroun.jpg"
            alt="Driss Benchekroun, fondateur de Coaching 4 Job"
            fill
            unoptimized
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-[50%_30%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(17,17,17,0.78)_100%)]"
          />
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 h-3 w-28 bg-brand-yellow sm:h-4 sm:w-40"
          />
          <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-white sm:p-8">
            <span
              aria-hidden="true"
              className="mb-4 block h-1 w-14 bg-brand-yellow"
            />
            <p className="text-2xl font-bold tracking-[-0.04em] sm:text-4xl">
              Driss Benchekroun
            </p>
            <p className="mt-1 text-sm text-white/80 sm:text-base">
              Fondateur de Coaching 4 Job
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center border border-t-0 border-brand-ink px-5 py-7 sm:px-10 sm:py-14 lg:border-l-0 lg:border-t lg:px-14 xl:px-16">
          <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted sm:mb-7 sm:text-base">
            Qui suis-je ?{" "}
            <span aria-hidden="true" className="h-px flex-1 bg-brand-ink" />
          </p>
          <h2 className="max-w-[760px] text-[clamp(1.75rem,3.4vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.045em]">
            Après une vie consacrée à entreprendre, j’ai choisi de transmettre
            <span className="text-brand-yellow">.</span>
          </h2>
          <p className="mt-2 text-sm font-semibold text-brand-ink sm:text-base">
            Serial entrepreneur | Expert en recrutement
          </p>

          <div className="mt-5 max-w-[700px] space-y-4 text-base leading-7 text-brand-muted sm:mt-6 sm:text-lg sm:leading-8">
            <p>
              Ingénieur de formation, entrepreneur dans l’âme, j’ai créé et
              développé des entreprises dans des univers aussi différents que
              la technologie, le conseil, le recrutement et l’artisanat. Un
              point commun : l’être humain, ses compétences et sa capacité à
              créer de la valeur.
            </p>
            <p>
              Mes 18 années dans le recrutement m’ont appris une chose
              essentielle : de nombreux candidats possèdent les compétences
              pour réussir, mais ne savent pas toujours comment convaincre les
              entreprises de leur donner leur chance.
            </p>
            <p>
              En 2024, à l’heure de la retraite, j’ai créé Coaching 4 Job pour
              mettre cette expérience au service des autres. Hier, j’aidais les
              entreprises à trouver les bons candidats. Aujourd’hui, j’aide les
              candidats à trouver les bonnes entreprises.
            </p>
          </div>

          <blockquote className="mt-6 flex gap-4 border-l-4 border-brand-yellow bg-brand-soft px-5 py-4 sm:mt-8">
            <Quote
              aria-hidden="true"
              className="mt-1 size-5 shrink-0 text-brand-ink"
            />
            <p className="text-base font-semibold leading-7 tracking-[-0.01em] sm:text-lg">
              Je ne cherche pas un emploi à votre place. Je vous apprends à le
              faire efficacement.
            </p>
          </blockquote>

          <dl className="mt-6 grid grid-cols-1 gap-5 border-t border-brand-ink/20 pt-5 sm:mt-8 sm:grid-cols-3 sm:gap-6 sm:pt-6">
            {facts.map((fact) => (
              <div key={fact.value}>
                <dt className="text-xl font-bold tracking-[-0.03em] sm:text-2xl">
                  {fact.value}
                </dt>
                <dd className="mt-1 text-sm leading-5 text-brand-muted">
                  {fact.label}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-brand-muted">
            <span className="inline-flex items-center gap-2">
              <GraduationCap aria-hidden="true" className="size-5 text-brand-ink" />
              INSA Lyon · Toulouse Business School
            </span>
            <span className="inline-flex items-center gap-2">
              <Users aria-hidden="true" className="size-5 text-brand-ink" />
              Autonomie, méthode et confiance
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
