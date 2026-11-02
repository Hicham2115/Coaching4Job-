import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Check,
  CircleUserRound,
  Phone,
  UserRoundPlus,
} from "lucide-react";

import DashboardSignOut from "@/components/dashboard-sign-out";
import { Skeleton } from "@/components/ui/skeleton";
import { databasePool } from "@/lib/database";
import { auth } from "@/lib/auth";

export const metadata = {
  title: "Vue d’ensemble | Espace Pro Coaching 4 Job",
  robots: { index: false, follow: false },
};

type Registration = {
  id: string;
  name: string;
  situation: string;
  status: "new" | "to_contact" | "contacted";
  created_at: Date;
};

type DashboardStats = {
  total: number;
  new: number;
  toContact: number;
  contacted: number;
};

const statusLabels = {
  new: "Nouveau",
  to_contact: "À contacter",
  contacted: "Contacté",
} as const;

const statusStyles = {
  new: "bg-brand-yellow/50 text-brand-ink",
  to_contact: "bg-brand-ink/10 text-brand-ink",
  contacted: "bg-emerald-100 text-emerald-900",
} as const;

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <main
          aria-busy="true"
          aria-label="Chargement du tableau de bord"
          className="min-h-svh bg-brand-soft text-brand-ink"
        >
          <span className="sr-only" role="status">
            Vérification de votre session et chargement du tableau de bord…
          </span>
          <div className="flex h-[58px] items-center border-b border-brand-ink/15 bg-white px-5 sm:px-8">
            <Skeleton className="h-8 w-44 rounded-sm" />
          </div>
          <div className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 sm:py-8">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div className="space-y-2">
                <Skeleton className="h-9 w-56 rounded-sm" />
                <Skeleton className="h-4 w-80 max-w-[75vw] rounded-sm" />
              </div>
              <Skeleton className="hidden h-4 w-36 rounded-sm sm:block" />
            </div>
            <div className="mb-5 grid gap-3 sm:grid-cols-3">
              {Array.from({ length: 3 }, (_, index) => (
                <div
                  key={index}
                  className="flex min-h-[112px] items-center gap-4 border border-brand-ink/15 bg-white px-4 py-4 sm:min-h-[126px] sm:px-5"
                >
                  <Skeleton className="size-11 shrink-0 rounded-full bg-brand-yellow/40" />
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-20 rounded-sm" />
                    <Skeleton className="h-8 w-14 rounded-sm" />
                    <Skeleton className="h-3 w-36 max-w-[45vw] rounded-sm" />
                  </div>
                </div>
              ))}
            </div>
            <div className="border border-brand-ink/20 bg-white">
              <div className="flex h-[58px] items-center justify-between border-b border-brand-ink/10 px-4 sm:px-5">
                <Skeleton className="h-5 w-52 rounded-sm" />
                <Skeleton className="h-10 w-36 rounded-sm bg-brand-yellow/45" />
              </div>
              <div className="space-y-0 divide-y divide-brand-ink/10">
                {Array.from({ length: 6 }, (_, index) => (
                  <div
                    key={index}
                    className="grid gap-2 px-4 py-3 sm:grid-cols-[1fr_1.5fr_1fr_120px] sm:items-center sm:gap-4 sm:px-5 sm:py-3"
                  >
                    <Skeleton className="h-4 w-28 rounded-sm" />
                    <Skeleton className="h-4 w-40 max-w-full rounded-sm" />
                    <Skeleton className="h-3 w-24 rounded-sm" />
                    <Skeleton className="h-6 w-20 rounded-sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}

async function DashboardContent() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || session.user.email !== "admin@coaching4job.ma") {
    redirect("/espace-pro");
  }

  let stats: DashboardStats | null = null;
  let registrations: Registration[] = [];
  let hasLoadError = false;

  try {
    const [statsResult, registrationsResult] = await Promise.all([
      databasePool.query<{
        total: string;
        new_count: string;
        to_contact_count: string;
        contacted_count: string;
      }>(`SELECT
          COUNT(*)::text AS total,
          COUNT(*) FILTER (WHERE status = 'new')::text AS new_count,
          COUNT(*) FILTER (WHERE status = 'to_contact')::text AS to_contact_count,
          COUNT(*) FILTER (WHERE status = 'contacted')::text AS contacted_count
        FROM registrations`),
      databasePool.query<Registration>(`SELECT id, name, situation, status, created_at
        FROM registrations
        ORDER BY created_at DESC
        LIMIT 8`),
    ]);

    const counts = statsResult.rows[0];
    stats = {
      total: Number(counts.total),
      new: Number(counts.new_count),
      toContact: Number(counts.to_contact_count),
      contacted: Number(counts.contacted_count),
    };
    registrations = registrationsResult.rows;
  } catch {
    hasLoadError = true;
  }

  const dateLabel = new Intl.DateTimeFormat("fr-MA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Casablanca",
  }).format(new Date());

  return (
    <div className="min-h-svh bg-brand-soft text-brand-ink">
      <header className="border-b border-brand-ink/20 bg-white">
        <div className="mx-auto flex min-h-[58px] max-w-[1440px] items-center justify-between gap-5 px-5 sm:px-8">
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
              className="h-auto w-[174px] sm:w-[205px]"
            />
          </Link>
          <nav
            aria-label="Navigation de l’espace pro"
            className="hidden h-full items-center gap-8 sm:flex"
          >
            <Link
              href="/espace-pro/tableau-de-bord"
              aria-current="page"
              className="flex min-h-[58px] items-center border-b-2 border-brand-yellow px-1 text-sm font-semibold"
            >
              Vue d’ensemble
            </Link>
            <Link
              href="/espace-pro/inscriptions"
              className="flex min-h-[58px] items-center border-b-2 border-transparent px-1 text-sm text-brand-muted transition hover:border-brand-yellow hover:text-brand-ink"
            >
              Inscriptions
            </Link>
          </nav>
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="hidden items-center gap-2 sm:flex">
              <CircleUserRound
                aria-hidden="true"
                className="size-8 fill-brand-ink/10 text-brand-ink/70"
              />
              <div className="max-w-44 leading-tight">
                <p className="truncate text-xs font-semibold">
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
          className="flex border-t border-brand-ink/10 px-5 sm:hidden"
        >
          <Link
            href="/espace-pro/tableau-de-bord"
            aria-current="page"
            className="border-b-2 border-brand-yellow px-1 py-3 text-sm font-semibold"
          >
            Vue d’ensemble
          </Link>
          <Link
            href="/espace-pro/inscriptions"
            className="ml-6 border-b-2 border-transparent px-1 py-3 text-sm text-brand-muted"
          >
            Inscriptions
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 sm:py-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-[-0.045em] sm:text-[34px]">
              Vue d’ensemble
            </h1>
            <p className="mt-1 text-sm text-brand-muted">
              Suivez vos nouvelles inscriptions et gérez le suivi après les
              conférences.
            </p>
          </div>
          <p className="text-sm capitalize text-brand-muted">{dateLabel}</p>
        </div>

        {hasLoadError || !stats ? (
          <section
            role="alert"
            className="mb-5 border border-red-700/30 bg-white px-5 py-4 text-sm text-red-800"
          >
            Impossible de charger les inscriptions pour le moment. Actualisez la
            page pour réessayer.
          </section>
        ) : (
          <section
            aria-label="Résumé des inscriptions"
            className="mb-5 grid gap-3 sm:grid-cols-3"
          >
            <StatCard
              label="Nouvelles"
              value={stats.new}
              detail="À la suite des conférences"
              icon={<UserRoundPlus aria-hidden="true" className="size-5" />}
            />
            <StatCard
              label="À contacter"
              value={stats.toContact}
              detail="En attente d’un premier contact"
              icon={<Phone aria-hidden="true" className="size-5" />}
            />
            <StatCard
              label="Contactées"
              value={stats.contacted}
              detail="Premier contact effectué"
              icon={<Check aria-hidden="true" className="size-5" />}
            />
          </section>
        )}

        <section
          id="inscriptions"
          className="border border-brand-ink/45 bg-white"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-ink/15 px-4 py-3 sm:px-5">
            <h2 className="text-base font-bold tracking-[-0.02em] sm:text-lg">
              Dernières inscriptions
            </h2>
            <Link
              href="/espace-pro/inscriptions"
              className="inline-flex min-h-10 items-center gap-2 rounded-sm bg-brand-yellow px-3 text-xs font-semibold text-brand-ink transition hover:bg-brand-yellow/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink"
            >
              Voir toutes les inscriptions{" "}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          {hasLoadError ? (
            <p className="px-5 py-8 text-sm text-brand-muted">
              La liste n’est pas disponible actuellement.
            </p>
          ) : registrations.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="font-semibold">Aucune inscription pour le moment</p>
              <p className="mt-1 text-sm text-brand-muted">
                Les nouvelles inscriptions du formulaire apparaîtront ici.
              </p>
            </div>
          ) : (
            <>
              <div className="hidden grid-cols-[1fr_1.5fr_1fr_120px] gap-4 bg-brand-soft px-4 py-2 text-[10px] font-semibold uppercase tracking-wide text-brand-muted sm:grid sm:px-5">
                <span>Nom</span>
                <span>Situation</span>
                <span>Date d’arrivée</span>
                <span>Statut</span>
              </div>
              <ul className="divide-y divide-brand-ink/10">
                {registrations.map((registration) => (
                  <li
                    key={registration.id}
                    className="grid gap-2 px-4 py-3 text-sm sm:grid-cols-[1fr_1.5fr_1fr_120px] sm:items-center sm:gap-4 sm:px-5 sm:py-2"
                  >
                    <span className="font-medium">{registration.name}</span>
                    <span className="text-brand-muted">
                      {registration.situation}
                    </span>
                    <time
                      dateTime={registration.created_at.toISOString()}
                      className="text-xs text-brand-muted"
                    >
                      {new Intl.DateTimeFormat("fr-MA", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        timeZone: "Africa/Casablanca",
                      }).format(registration.created_at)}
                    </time>
                    <span
                      className={`w-fit rounded px-2 py-1 text-[11px] font-medium ${statusStyles[registration.status]}`}
                    >
                      {statusLabels[registration.status]}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: number;
  detail: string;
  icon: React.ReactNode;
}) {
  return (
    <article className="flex min-h-[112px] items-center gap-4 border border-brand-ink/40 bg-white px-4 py-4 sm:min-h-[126px] sm:px-5">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-yellow/50 text-brand-ink">
        {icon}
      </span>
      <div className="min-w-0">
        <h2 className="text-xs font-semibold">{label}</h2>
        <p className="mt-0.5 text-3xl font-bold leading-none tracking-[-0.04em] sm:text-4xl">
          {value}
        </p>
        <p className="mt-1.5 text-xs leading-snug text-brand-muted">{detail}</p>
      </div>
    </article>
  );
}
