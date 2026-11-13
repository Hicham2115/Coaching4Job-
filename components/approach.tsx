import Image from "next/image";
import { MapPin, Monitor } from "lucide-react";

export default function Approach() {
  return (
  <section
    id="a-propos"
    className="scroll-reveal scroll-mt-10 bg-white py-9 text-brand-ink sm:py-18 lg:py-20"
  >
    <div className="mx-auto grid max-w-[1480px] gap-0 px-4 sm:px-10 lg:grid-cols-[0.82fr_1.18fr] lg:px-16">
      <div
        aria-hidden="true"
        className="relative flex min-h-[200px] items-center justify-center overflow-hidden border border-brand-ink bg-brand-ink sm:min-h-[380px] lg:min-h-[440px]"
      >
        <Image
          src="/images/approach-logo.svg"
          alt=""
          width={180}
          height={180}
          className="h-auto w-[150px] sm:w-[290px] lg:w-[340px]"
        />
      </div>
      <div className="flex flex-col justify-center border border-t-0 border-brand-ink px-5 py-7 sm:px-10 sm:py-14 lg:border-l-0 lg:border-t lg:px-14 xl:px-16">
        <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted sm:mb-7 sm:text-base">
          Notre approche{" "}
          <span aria-hidden="true" className="h-px flex-1 bg-brand-ink" />
        </p>
        <h2 className="max-w-[760px] text-[clamp(1.75rem,3.4vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.045em] text-brand-ink">
          Un accompagnement concret, à chaque étape de votre parcours
          <span className="text-brand-yellow">.</span>
        </h2>
        <p className="mt-4 max-w-[700px] text-base leading-7 text-brand-muted sm:mt-6 sm:text-xl sm:leading-9">
          Nous vous aidons à clarifier vos objectifs et à développer les
          compétences qui vous rapprochent du bon emploi, le plus rapidement
          possible. Le coaching s’adapte à votre situation : premier emploi,
          évolution professionnelle ou projet entrepreneurial.
        </p>
        <div className="mt-6 grid gap-5 border-t border-brand-ink/20 pt-5 sm:mt-8 sm:gap-8 sm:pt-6 sm:grid-cols-2">
          <div className="flex gap-3">
            <MapPin
              aria-hidden="true"
              className="mt-0.5 size-6 shrink-0 text-brand-ink"
            />
            <div>
              <h3 className="text-sm font-semibold text-brand-ink sm:text-base">
                Casablanca
              </h3>
              <p className="mt-1 text-sm leading-5 text-brand-muted">
                Des séances en présentiel dans un cadre professionnel et
                accessible.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Monitor
              aria-hidden="true"
              className="mt-0.5 size-6 shrink-0 text-brand-ink"
            />
            <div>
              <h3 className="text-sm font-semibold text-brand-ink sm:text-base">
                À distance
              </h3>
              <p className="mt-1 text-sm leading-5 text-brand-muted">
                Un accompagnement flexible, où que vous soyez au Maroc ou
                ailleurs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
