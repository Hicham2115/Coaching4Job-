import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ConferenceCta() {
  return (
    <section className="scroll-reveal bg-white py-2 sm:py-3">
      <div className="relative mx-auto flex min-h-[430px] max-w-none items-center overflow-hidden border-y border-brand-ink bg-brand-soft px-7 py-12 sm:min-h-[540px] sm:px-12 lg:min-h-[calc(100svh-10rem)] lg:px-[7.2vw]">
        <Image
          alt="La mosquée Hassan II et le littoral de Casablanca"
          className="object-cover object-[58%_54%]"
          fill
          sizes="100vw"
          src="/images/casablanca-method.jpg"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,247,241,0.84)_0%,rgba(248,247,241,0.72)_58%,rgba(248,247,241,0.28)_100%)] md:bg-[linear-gradient(90deg,rgba(248,247,241,0.92)_0%,rgba(248,247,241,0.78)_27%,rgba(248,247,241,0.42)_48%,rgba(248,247,241,0.08)_68%,transparent_82%)]"
        />
        {/* <div
            aria-hidden="true"
            className="absolute -bottom-40 -left-36 size-72 rounded-full border-[48px] border-brand-yellow/90 sm:-bottom-56 sm:-left-48 sm:size-[480px] sm:border-[68px]"
          /> */}
        <div className="relative z-10 max-w-[680px]">
          <p className="mb-7 flex items-center gap-5 text-sm font-medium uppercase tracking-[0.12em] text-brand-ink sm:text-base">
            Coaching 4 Job{" "}
            <span
              aria-hidden="true"
              className="h-[2px] w-36 bg-brand-ink sm:w-52"
            />
          </p>
          <h2 className="max-w-[650px] text-[clamp(3rem,6.3vw,6.2rem)] font-bold leading-[0.94] tracking-[-0.055em] text-brand-ink [text-shadow:0_1px_1px_rgba(255,255,255,0.16)]">
            Votre avenir
            <br />
            se construit
            <br />
            aujourd’hui.
          </h2>
          <Link
            href="#contact"
            className="mt-8 inline-flex min-h-12 items-center gap-5 bg-brand-yellow px-6 text-sm font-semibold text-brand-ink shadow-[0_8px_24px_rgba(17,17,17,0.12)] transition-transform hover:-translate-y-0.5 sm:min-h-14 sm:px-8 sm:text-base"
          >
            Réserver ma place à la conférence
            <ArrowRight aria-hidden="true" className="size-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
