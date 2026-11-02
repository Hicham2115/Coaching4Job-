import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowRight } from "lucide-react";

import DashboardSignOut from "@/components/dashboard-sign-out";
import InscriptionFilters from "@/components/inscription-filters";
import RegistrationStatusSelect from "@/components/registration-status-select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { auth } from "@/lib/auth";
import { databasePool } from "@/lib/database";

export const metadata = {
  title: "Inscriptions | Espace Pro Coaching 4 Job",
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

type SearchParams = Promise<{
  q?: string | string[];
  status?: string | string[];
  page?: string | string[];
}>;

const pageSize = 8;
const allowedStatuses = new Set(["new", "to_contact", "contacted"]);

export default function InscriptionsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <Suspense fallback={<InscriptionsSkeleton />}>
      <InscriptionsContent searchParams={searchParams} />
    </Suspense>
  );
}

async function InscriptionsContent({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [session, params] = await Promise.all([
    auth.api.getSession({ headers: await headers() }),
    searchParams,
  ]);

  if (!session || session.user.email !== "admin@coaching4job.ma") {
    redirect("/espace-pro");
  }

  const rawSearch = Array.isArray(params.q) ? params.q[0] : params.q;
  const search = (rawSearch ?? "").trim().slice(0, 100);
  const rawStatus = Array.isArray(params.status)
    ? params.status[0]
    : params.status;
  const status = rawStatus && allowedStatuses.has(rawStatus) ? rawStatus : "";
  const rawPage = Array.isArray(params.page) ? params.page[0] : params.page;
  const parsedPage = Number.parseInt(rawPage ?? "1", 10);
  const requestedPage = Number.isSafeInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const where: string[] = [];
  const values: Array<string> = [];

  if (status) {
    values.push(status);
    where.push(`status = $${values.length}`);
  }

  if (search) {
    values.push(`%${search}%`);
    const searchParameter = `$${values.length}`;
    where.push(
      `(name ILIKE ${searchParameter} OR phone ILIKE ${searchParameter} OR email ILIKE ${searchParameter})`,
    );
  }

  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

  let total = 0;
  let registrations: Registration[] = [];
  let hasLoadError = false;
  let totalPages = 1;
  let currentPage = 1;

  try {
    const countResult = await databasePool.query<{ total: string }>(
      `SELECT COUNT(*)::text AS total FROM registrations ${whereSql}`,
      values,
    );
    total = Number(countResult.rows[0]?.total ?? 0);
    totalPages = Math.max(1, Math.ceil(total / pageSize));
    currentPage = Math.min(requestedPage, totalPages);

    const dataValues = [...values, pageSize, (currentPage - 1) * pageSize];
    const dataResult = await databasePool.query<Registration>(
      `SELECT id, name, phone, email, situation, status, created_at
       FROM registrations
       ${whereSql}
       ORDER BY created_at DESC
       LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
      dataValues,
    );
    registrations = dataResult.rows;
  } catch {
    hasLoadError = true;
  }

  const queryForPage = (page: number) => {
    const query = new URLSearchParams();
    if (search) query.set("q", search);
    if (status) query.set("status", status);
    query.set("page", String(page));
    return `/espace-pro/inscriptions?${query.toString()}`;
  };

  const firstItem = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const lastItem = Math.min(currentPage * pageSize, total);
  const visiblePages = Array.from(
    { length: Math.min(5, totalPages) },
    (_, index) => {
      const startPage = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
      return startPage + index;
    },
  );

  return (
    <div className="min-h-svh bg-brand-soft text-brand-ink">
      <header className="border-b border-brand-ink/20 bg-white">
        <div className="mx-auto flex min-h-[68px] max-w-[1440px] items-center justify-between gap-5 px-5 sm:px-8">
          <Link href="/espace-pro/tableau-de-bord" aria-label="Coaching 4 Job, vue d’ensemble">
            <Image
              src="/images/coaching4job-logo.png"
              alt="Coaching 4 Job"
              width={2050}
              height={312}
              priority
              className="h-auto w-[174px] sm:w-[225px]"
            />
          </Link>
          <nav aria-label="Navigation de l’espace pro" className="hidden h-full items-center gap-8 lg:flex">
            <Link href="/espace-pro/tableau-de-bord" className="flex min-h-[68px] items-center border-b-2 border-transparent px-1 text-sm text-brand-muted transition hover:border-brand-yellow hover:text-brand-ink">
              Vue d’ensemble
            </Link>
            <Link href="/espace-pro/inscriptions" aria-current="page" className="flex min-h-[68px] items-center border-b-2 border-brand-yellow px-1 text-sm font-semibold">
              Inscriptions
            </Link>
          </nav>
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="hidden items-center gap-2 md:flex">
              <span aria-hidden="true" className="relative size-8 shrink-0 overflow-hidden rounded-full border border-brand-ink/15 bg-white">
                <Image
                  src="/images/dashboard-owner.jpeg"
                  alt=""
                  fill
                  sizes="32px"
                  className="object-cover object-[center_28%]"
                />
              </span>
              <div className="max-w-64 leading-tight">
                <p className="break-words text-xs font-semibold">{session.user.name}</p>
                <p className="text-[11px] text-brand-muted">Propriétaire</p>
              </div>
            </div>
            <DashboardSignOut />
          </div>
        </div>
        <nav aria-label="Navigation mobile" className="flex border-t border-brand-ink/10 px-5 lg:hidden">
          <Link href="/espace-pro/tableau-de-bord" className="border-b-2 border-transparent px-1 py-3 text-sm text-brand-muted">Vue d’ensemble</Link>
          <Link href="/espace-pro/inscriptions" aria-current="page" className="ml-6 border-b-2 border-brand-yellow px-1 py-3 text-sm font-semibold">Inscriptions</Link>
        </nav>
      </header>

      <main className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 sm:py-8">
        <div className="mb-5">
          <h1 className="text-3xl font-bold tracking-[-0.045em] sm:text-[40px]">Inscriptions</h1>
          <p className="mt-1 text-sm text-brand-muted sm:text-base">Retrouvez et suivez les inscriptions à la conférence.</p>
        </div>

        <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
          <div className="min-w-0 flex-1">
            <InscriptionFilters search={search} status={status} />
          </div>
          <p className="shrink-0 text-sm text-brand-muted md:min-w-32 md:text-right">
            {total} {total > 1 ? "inscriptions" : "inscription"}
          </p>
        </div>

        {hasLoadError ? (
          <div role="alert" className="border border-red-700/30 bg-white px-5 py-6 text-sm text-red-800">
            Impossible de charger les inscriptions. Actualisez la page pour réessayer.
          </div>
        ) : registrations.length === 0 ? (
          <div className="border border-brand-ink/15 bg-white px-5 py-12 text-center">
            <p className="font-semibold">Aucune inscription trouvée</p>
            <p className="mt-1 text-sm text-brand-muted">Essayez de modifier votre recherche ou vos filtres.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-sm border border-brand-ink/10 bg-white">
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[1040px] table-fixed border-collapse text-left">
                <thead className="bg-brand-soft/70 text-[10px] font-semibold uppercase tracking-wide text-brand-muted">
                  <tr className="h-10 border-b border-brand-ink/10">
                    <th className="w-[13%] px-4">Nom</th>
                    <th className="w-[13%] px-4">Téléphone</th>
                    <th className="w-[18%] px-4">E-mail</th>
                    <th className="w-[21%] px-4">Situation actuelle</th>
                    <th className="w-[14%] px-4">Date d’inscription ↓</th>
                    <th className="w-[11%] px-4 text-center">Statut</th>
                    <th className="w-[10%] px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-ink/10 text-xs">
                  {registrations.map((registration) => (
                    <tr key={registration.id} className="h-[48px] transition-colors hover:bg-brand-soft/45">
                      <td className="truncate px-4 font-medium" title={registration.name}>{registration.name}</td>
                      <td className="truncate px-4 text-brand-muted" title={registration.phone}>{registration.phone}</td>
                      <td className="truncate px-4 text-brand-muted" title={registration.email}>{registration.email}</td>
                      <td className="truncate px-4 text-brand-muted" title={registration.situation}>{registration.situation}</td>
                      <td className="whitespace-nowrap px-4 text-brand-muted">{formatDate(registration.created_at)}</td>
                      <td className="px-4 text-center">
                        <RegistrationStatusSelect
                          registrationId={registration.id}
                          registrationName={registration.name}
                          initialStatus={registration.status}
                        />
                      </td>
                      <td className="px-4">
                        <Link href={`/espace-pro/inscriptions/${registration.id}`} className="inline-flex h-8 items-center gap-2 rounded-sm border border-brand-ink/15 px-3 font-semibold transition hover:border-brand-ink hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink">
                          Voir <ArrowRight aria-hidden="true" className="size-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="divide-y divide-brand-ink/10 lg:hidden">
              {registrations.map((registration) => (
                <li key={registration.id} className="space-y-2 px-4 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{registration.name}</p>
                      <p className="mt-1 truncate text-xs text-brand-muted">{registration.situation}</p>
                    </div>
                    <RegistrationStatusSelect
                      registrationId={registration.id}
                      registrationName={registration.name}
                      initialStatus={registration.status}
                    />
                  </div>
                  <div className="grid gap-1 text-xs text-brand-muted sm:grid-cols-2">
                    <a href={`tel:${registration.phone}`} className="min-h-8 inline-flex items-center underline underline-offset-2">{registration.phone}</a>
                    <a href={`mailto:${registration.email}`} className="min-h-8 inline-flex items-center truncate underline underline-offset-2">{registration.email}</a>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <time dateTime={registration.created_at.toISOString()} className="text-brand-muted">{formatDate(registration.created_at)}</time>
                    <Link href={`/espace-pro/inscriptions/${registration.id}`} className="inline-flex min-h-10 items-center gap-2 font-semibold underline underline-offset-4">Voir <ArrowRight aria-hidden="true" className="size-4" /></Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!hasLoadError && total > 0 && (
          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-brand-muted">
              Affichage de {firstItem} à {lastItem} sur {total} inscriptions
            </p>
            <Pagination className="mx-0 w-auto justify-start sm:justify-end">
              <PaginationContent className="gap-1">
                <PaginationItem>
                  <PaginationPrevious
                    href={queryForPage(Math.max(1, currentPage - 1))}
                    aria-disabled={currentPage === 1}
                    className={currentPage === 1 ? "pointer-events-none opacity-40" : "border border-brand-ink/15 bg-white hover:bg-brand-soft"}
                    text=""
                  />
                </PaginationItem>
                {visiblePages.map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href={queryForPage(page)}
                      isActive={page === currentPage}
                      className={page === currentPage ? "border-brand-yellow bg-brand-yellow text-brand-ink hover:bg-brand-yellow" : "border border-brand-ink/15 bg-white hover:bg-brand-soft"}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href={queryForPage(Math.min(totalPages, currentPage + 1))}
                    aria-disabled={currentPage === totalPages}
                    className={currentPage === totalPages ? "pointer-events-none opacity-40" : "border border-brand-ink/15 bg-white hover:bg-brand-soft"}
                    text=""
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </main>
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

function InscriptionsSkeleton() {
  return (
    <main aria-busy="true" aria-label="Chargement des inscriptions" className="min-h-svh bg-brand-soft">
      <span className="sr-only" role="status">Chargement des inscriptions…</span>
      <div className="flex h-[68px] items-center border-b border-brand-ink/15 bg-white px-5 sm:px-8">
        <Skeleton className="h-9 w-52 rounded-sm" />
      </div>
      <div className="mx-auto max-w-[1440px] space-y-6 px-5 py-8 sm:px-8">
        <div className="space-y-2">
          <Skeleton className="h-10 w-64 rounded-sm" />
          <Skeleton className="h-4 w-80 max-w-[80vw] rounded-sm" />
        </div>
          <div className="grid gap-3 md:grid-cols-[minmax(280px,1.4fr)_minmax(220px,0.8fr)]">
          <Skeleton className="h-11 w-full rounded-sm" />
          <Skeleton className="h-11 w-full rounded-sm" />
        </div>
        <div className="overflow-hidden border border-brand-ink/10 bg-white">
          <div className="h-10 border-b border-brand-ink/10 bg-brand-soft/60" />
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index} className="grid grid-cols-2 gap-3 border-b border-brand-ink/10 px-4 py-4 lg:grid-cols-7">
              <Skeleton className="h-4 w-28 rounded-sm" />
              <Skeleton className="h-4 w-32 rounded-sm" />
              <Skeleton className="h-4 w-36 rounded-sm" />
              <Skeleton className="h-4 w-36 rounded-sm" />
              <Skeleton className="h-4 w-24 rounded-sm" />
              <Skeleton className="h-6 w-20 rounded-sm" />
              <Skeleton className="h-8 w-16 rounded-sm" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
