import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Mail, MessageCircleMore, Phone } from "lucide-react";

import DashboardSignOut from "@/components/dashboard-sign-out";
import RegistrationFollowUp from "@/components/registration-follow-up";
import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@/lib/auth";
import { databasePool } from "@/lib/database";

export const metadata = {
  title: "Détail de l’inscription | Espace Pro Coaching 4 Job",
  robots: { index: false, follow: false },
};

type Registration = {
  id: string;
  name: string;
  phone: string;
  email: string;
  situation: string;
  status: "new" | "to_contact" | "contacted";
  created_at: Date;
};

type Note = {
  id: string;
  content: string;
  created_at: Date;
  author_name: string;
};

const statusLabels = {
  new: "Nouveau",
  to_contact: "À contacter",
  contacted: "Contacté",
} as const;

const statusStyles = {
  new: "bg-brand-yellow/60 text-brand-ink",
  to_contact: "bg-brand-ink/10 text-brand-ink",
  contacted: "bg-emerald-100 text-emerald-900",
} as const;

export default function InscriptionDetailPage({
  params,
}: PageProps<"/espace-pro/inscriptions/[id]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <InscriptionDetail params={params} />
    </Suspense>
  );
}

async function InscriptionDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [session, { id }] = await Promise.all([
    auth.api.getSession({ headers: await headers() }),
    params,
  ]);

  if (!session || session.user.email !== "admin@coaching4job.ma") {
    redirect("/espace-pro");
  }

  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      id,
    )
  ) {
    notFound();
  }

  let registration: Registration | undefined;
  let notes: Note[] = [];
  let hasLoadError = false;

  try {
    const [registrationResult, notesResult] = await Promise.all([
      databasePool.query<Registration>(
        `SELECT id, name, phone, email, situation, status, created_at
         FROM registrations
         WHERE id = $1
         LIMIT 1`,
        [id],
      ),
      databasePool.query<Note>(
        `SELECT notes.id, notes.content, notes.created_at,
                owner.name AS author_name
         FROM registration_notes AS notes
         JOIN "user" AS owner ON owner.id = notes.author_id
         WHERE notes.registration_id = $1
         ORDER BY notes.created_at DESC`,
        [id],
      ),
    ]);
    registration = registrationResult.rows[0];
    notes = notesResult.rows;
  } catch (error) {
    console.error("Unable to load registration details:", error);
    hasLoadError = true;
  }

  if (!registration && !hasLoadError) notFound();

  return (
    <div className="min-h-svh bg-brand-soft text-brand-ink">
      <header className="border-b border-brand-ink/20 bg-white">
        <div className="mx-auto flex min-h-[68px] max-w-[1440px] items-center justify-between gap-5 px-5 sm:px-8">
          <Link
            href="/espace-pro/tableau-de-bord"
            aria-label="Coaching 4 Job, vue d’ensemble"
          >
            <Image
              src="/images/coaching4job-logo.png"
              alt="Coaching 4 Job"
              width={2050}
              height={312}
              priority
              className="h-auto w-[174px] sm:w-[225px]"
            />
          </Link>
          <nav
            aria-label="Navigation de l’espace pro"
            className="hidden h-full items-center gap-8 lg:flex"
          >
            <Link
              href="/espace-pro/tableau-de-bord"
              className="flex min-h-[68px] items-center border-b-2 border-transparent px-1 text-sm text-brand-muted transition hover:border-brand-yellow hover:text-brand-ink"
            >
              Vue d’ensemble
            </Link>
            <Link
              href="/espace-pro/inscriptions"
              aria-current="page"
              className="flex min-h-[68px] items-center border-b-2 border-brand-yellow px-1 text-sm font-semibold"
            >
              Inscriptions
            </Link>
          </nav>
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="hidden items-center gap-2 md:flex">
              <span
                aria-hidden="true"
                className="relative size-8 shrink-0 overflow-hidden rounded-full border border-brand-ink/15 bg-white"
              >
                <Image
                  src="/images/dashboard-owner.jpeg"
                  alt=""
                  fill
                  sizes="32px"
                  className="object-cover object-[center_28%]"
                />
              </span>
              <div className="max-w-64 leading-tight">
                <p className="break-words text-xs font-semibold">
                  {session.user.name}
                </p>
                <p className="text-[11px] text-brand-muted">Propriétaire</p>
              </div>
            </div>
            <DashboardSignOut />
          </div>
        </div>
        <nav
          aria-label="Navigation mobile"
          className="flex border-t border-brand-ink/10 px-5 lg:hidden"
        >
          <Link
            href="/espace-pro/tableau-de-bord"
            className="border-b-2 border-transparent px-1 py-3 text-sm text-brand-muted"
          >
            Vue d’ensemble
          </Link>
          <Link
            href="/espace-pro/inscriptions"
            aria-current="page"
            className="ml-6 border-b-2 border-brand-yellow px-1 py-3 text-sm font-semibold"
          >
            Inscriptions
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-[1440px] px-5 py-6 sm:px-8 sm:py-8">
        <Link
          href="/espace-pro/inscriptions"
          className="inline-flex min-h-11 items-center gap-2 text-sm text-brand-muted transition hover:text-brand-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-ink"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Retour aux inscriptions
        </Link>

        {hasLoadError || !registration ? (
          <div
            role="alert"
            className="mt-5 border border-red-700/30 bg-white px-5 py-6 text-sm text-red-800"
          >
            Impossible de charger cette inscription. Actualisez la page pour
            réessayer.
          </div>
        ) : (
          <>
            <div className="mb-5 mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
              <h1 className="text-3xl font-bold tracking-[-0.045em] sm:text-[40px]">
                {registration.name}
              </h1>
              <span
                className={`inline-flex rounded px-3 py-1.5 text-xs font-medium ${statusStyles[registration.status]}`}
              >
                {statusLabels[registration.status]}
              </span>
              <p className="basis-full text-sm text-brand-muted">
                Inscrite le {formatDate(registration.created_at)}
              </p>
            </div>

            <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.95fr)] xl:gap-5">
              <div className="grid gap-4">
                <section className="border border-brand-ink/15 bg-white">
                  <h2 className="border-b border-brand-ink/10 px-4 py-4 text-sm font-bold sm:px-5">
                    Informations de l’inscription
                  </h2>
                  <dl className="divide-y divide-brand-ink/10 px-4 sm:px-5">
                    <DetailField
                      label="Nom complet"
                      value={registration.name}
                    />
                    <DetailField
                      label="Situation actuelle"
                      value={registration.situation}
                    />
                    <DetailField label="Téléphone" value={registration.phone} />
                    <DetailField label="E-mail" value={registration.email} />
                  </dl>
                </section>

                <section className="min-h-[240px] border border-brand-ink/15 bg-white p-4 sm:min-h-[270px] sm:p-5">
                  <h2 className="text-sm font-bold">Moyens de contact</h2>
                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    <a
                      href={`tel:${registration.phone.replace(/[^\d+]/g, "")}`}
                      className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-brand-yellow px-3 py-2 text-left text-xs font-semibold transition hover:bg-brand-yellow/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink"
                    >
                      <Phone aria-hidden="true" className="size-5 shrink-0" />
                      <span>
                        Appeler
                        <span className="mt-0.5 block font-normal">
                          {registration.phone}
                        </span>
                      </span>
                    </a>
                    <a
                      href={`mailto:${registration.email}`}
                      className="inline-flex min-h-12 items-center gap-2 rounded-sm border border-brand-ink/15 px-3 py-2 text-left text-xs font-semibold transition hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink"
                    >
                      <Mail aria-hidden="true" className="size-5 shrink-0" />
                      <span className="min-w-0">
                        E-mail
                        <span className="mt-0.5 block truncate font-normal">
                          {registration.email}
                        </span>
                      </span>
                    </a>
                    <a
                      href={`https://wa.me/${getWhatsappNumber(registration.phone)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-12 items-center gap-2 rounded-sm border border-brand-ink/15 px-3 py-2 text-left text-xs font-semibold transition hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink"
                    >
                      <MessageCircleMore
                        aria-hidden="true"
                        className="size-5 shrink-0"
                      />
                      <span>
                        Ouvrir WhatsApp
                        <span className="mt-0.5 block font-normal">
                          {registration.phone}
                        </span>
                      </span>
                    </a>
                  </div>
                  <p className="mt-4 text-[11px] leading-relaxed text-brand-muted">
                    Ouvrir WhatsApp lance une conversation avec ce numéro.
                  </p>
                </section>
              </div>

              <div className="grid gap-4">
                <RegistrationFollowUp
                  registrationId={registration.id}
                  currentStatus={registration.status}
                  notes={notes.map((note) => ({
                    ...note,
                    created_at: note.created_at.toISOString(),
                  }))}
                />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 py-3 text-sm sm:grid-cols-[minmax(120px,0.38fr)_1fr] sm:items-center sm:gap-4">
      <dt className="text-xs text-brand-muted">{label}</dt>
      <dd className="break-words">{value}</dd>
    </div>
  );
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("fr-MA", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Africa/Casablanca",
  }).format(value);
}

function getWhatsappNumber(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("00")) return digits.slice(2);
  if (value.trim().startsWith("+")) return digits;
  if (digits.startsWith("0")) return `212${digits.slice(1)}`;
  if (!digits.startsWith("212")) return `212${digits}`;
  return digits;
}

function DetailSkeleton() {
  return (
    <main
      aria-busy="true"
      aria-label="Chargement du détail"
      className="min-h-svh bg-brand-soft px-5 py-8 text-brand-ink sm:px-8"
    >
      <span className="sr-only" role="status">
        Vérification de votre session et chargement de l’inscription…
      </span>
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-8 h-12 border-b border-brand-ink/15 bg-white" />
        <Skeleton className="h-5 w-48 rounded-sm" />
        <Skeleton className="mt-5 h-10 w-72 rounded-sm" />
        <div className="mt-6 grid gap-4 lg:grid-cols-[1.45fr_0.95fr]">
          <div className="space-y-4">
            <Skeleton className="h-64 rounded-sm" />
            <Skeleton className="h-56 rounded-sm" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-36 rounded-sm" />
            <Skeleton className="h-72 rounded-sm" />
          </div>
        </div>
      </div>
    </main>
  );
}
