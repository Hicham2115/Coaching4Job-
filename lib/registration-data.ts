import { cacheLife, cacheTag } from "next/cache";

import { databasePool } from "@/lib/database";

const registrationsTag = "registrations";
const pageSize = 8;

export type DashboardRegistration = {
  id: string;
  name: string;
  situation: string;
  status: "new" | "to_contact" | "contacted";
  created_at: Date;
};

export type DashboardStats = {
  total: number;
  new: number;
  toContact: number;
  contacted: number;
};

export type Registration = {
  id: string;
  name: string;
  phone: string;
  email: string;
  situation: string;
  status: "new" | "to_contact" | "contacted";
  created_at: Date;
};

export type RegistrationNote = {
  id: string;
  content: string;
  created_at: Date;
  author_name: string;
};

export async function getDashboardData() {
  "use cache";
  
  cacheLife({ stale: 30, revalidate: 30, expire: 60 });
  cacheTag(registrationsTag);
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
    databasePool.query<DashboardRegistration>(`SELECT id, name, situation, status, created_at
      FROM registrations
      ORDER BY created_at DESC
      LIMIT 8`),
  ]);

  const counts = statsResult.rows[0];
  return {
    stats: {
      total: Number(counts.total),
      new: Number(counts.new_count),
      toContact: Number(counts.to_contact_count),
      contacted: Number(counts.contacted_count),
    } satisfies DashboardStats,
    registrations: registrationsResult.rows,
  };
}

export async function getRegistrationList({
  search,
  status,
  requestedPage,
}: {
  search: string;
  status: string;
  requestedPage: number;
}) {
  "use cache";
  cacheLife({ stale: 30, revalidate: 30, expire: 60 });
  cacheTag(registrationsTag);

  const where: string[] = [];
  const values: string[] = [];

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
  const countResult = await databasePool.query<{ total: string }>(
    `SELECT COUNT(*)::text AS total FROM registrations ${whereSql}`,
    values,
  );
  const total = Number(countResult.rows[0]?.total ?? 0);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(requestedPage, totalPages);
  const dataResult = await databasePool.query<Registration>(
    `SELECT id, name, phone, email, situation, status, created_at
     FROM registrations
     ${whereSql}
     ORDER BY created_at DESC
     LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
    [...values, String(pageSize), String((currentPage - 1) * pageSize)],
  );

  return { total, registrations: dataResult.rows, totalPages, currentPage };
}

export async function getRegistrationDetail(id: string) {
  "use cache";
  cacheLife({ stale: 30, revalidate: 30, expire: 60 });
  cacheTag(registrationsTag);

  const [registrationResult, notesResult] = await Promise.all([
    databasePool.query<Registration>(
      `SELECT id, name, phone, email, situation, status, created_at
       FROM registrations WHERE id = $1 LIMIT 1`,
      [id],
    ),
    databasePool.query<RegistrationNote>(
      `SELECT notes.id, notes.content, notes.created_at,
              owner.name AS author_name
       FROM registration_notes AS notes
       JOIN "user" AS owner ON owner.id = notes.author_id
       WHERE notes.registration_id = $1
       ORDER BY notes.created_at DESC`,
      [id],
    ),
  ]);

  return { registration: registrationResult.rows[0], notes: notesResult.rows };
}
