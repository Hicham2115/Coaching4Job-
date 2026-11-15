import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/comp-577";
import SiteFooter from "@/layout/site-footer";
import ScrollReveal from "@/components/scroll-reveal";
import { accompaniments, getAccompaniment } from "@/lib/accompaniments";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return accompaniments.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getAccompaniment(slug);
  if (!item) return {};
  return {
    title: `${item.title} | Coaching 4 Job`,
    description: item.description,
    alternates: { canonical: `/accompagnements/${item.slug}` },
  };
}

export default function AccompanimentPage({ params }: Props) {
  return (
    <>
      <Navbar />
      <Suspense fallback={<main className="min-h-svh bg-white" />}>
        <AccompanimentContent params={params} />
      </Suspense>
      <ScrollReveal />
      <SiteFooter />
    </>
  );
}

async function AccompanimentContent({ params }: Props) {
  const { slug } = await params;
  const item = getAccompaniment(slug);
  if (!item) notFound();

  return (
      <main className="bg-white text-brand-ink">
        <section className="mx-auto grid max-w-[1360px] gap-10 px-6 py-14 sm:px-10 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-16 lg:py-20">
          <div>
            <p className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-muted">
              <span
                aria-hidden="true"
                className="h-[2px] w-12 bg-brand-ink/55"
              />
              Notre accompagnement
            </p>
            <h1 className="text-balance text-[clamp(2.4rem,5vw,4.2rem)] font-extrabold leading-[1.05] tracking-[-0.05em]">
              {item.title}
              <span className="text-brand-yellow">.</span>
            </h1>
            <p className="mt-6 max-w-[560px] text-lg leading-8 text-brand-muted">
              {item.audience}
            </p>
            <Link
              href="/#contact"
              className="mt-8 inline-flex min-h-14 items-center gap-7 rounded-full bg-brand-yellow pl-7 pr-6 text-base font-bold text-brand-ink transition-transform hover:-translate-y-0.5"
            >
              Réserver ma place
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <div className="relative aspect-[1.05] w-full overflow-hidden bg-brand-soft">
            <Image
              alt={item.imageAlt}
              className="object-cover"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              src={item.image}
            />
          </div>
        </section>

        <section className="border-t-2 border-brand-ink/65">
          <div className="mx-auto max-w-[1360px] px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
            <h2 className="max-w-[700px] text-[clamp(1.8rem,3vw,2.7rem)] font-bold leading-[1.12] tracking-[-0.045em]">
              Ce que vous allez{" "}
              <span className="bg-[linear-gradient(to_top,#fff52d_28%,transparent_28%)]">
                gagner.
              </span>
            </h2>
            <ul className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2">
              {item.benefits.map((benefit) => (
                <li
                  key={benefit.title}
                  className="flex gap-4 border-b border-brand-ink/20 pb-8"
                >
                  <span className="mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-yellow">
                    <Check aria-hidden="true" className="size-4" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.03em]">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-[1.6] text-brand-muted">
                      {benefit.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-brand-soft">
          <div className="mx-auto flex max-w-[1360px] flex-col items-start justify-between gap-6 px-6 py-12 sm:px-10 md:flex-row md:items-center lg:px-16">
            <p className="max-w-[560px] text-2xl font-bold leading-tight tracking-[-0.04em]">
              Prêt à avancer vers le bon emploi ?
            </p>
            <Link
              href="/#contact"
              className="inline-flex min-h-14 items-center gap-7 rounded-full bg-brand-yellow pl-7 pr-6 text-base font-bold text-brand-ink transition-transform hover:-translate-y-0.5"
            >
              Réserver ma place
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </section>
      </main>
  );
}
