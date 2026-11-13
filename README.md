# Coaching 4 Job

Next.js site for conference registrations and a private owner dashboard. Visitors register on `/`; the owner signs in at `/espace-pro` to review registrations, change follow-up status, and add notes. Data is stored in PostgreSQL (Neon in the current setup).

## Requirements

- Node.js and npm compatible with the versions in `package.json`
- A PostgreSQL database with a pooled URL for the app and a direct URL for migrations
- `psql` for the migration commands below

## Local setup

1. Run `npm ci` from this directory.
2. Copy `.env.example` to `.env.local` and fill in `DATABASE_URL`, `DATABASE_URL_UNPOOLED`, and `BETTER_AUTH_SECRET`. Keep `.env.local` private. Use `BETTER_AUTH_URL=http://localhost:3000` locally. Generate a secret with `openssl rand -base64 32`.
3. Set `DATABASE_URL_UNPOOLED` in your shell to the direct database URL, then run the migrations **once and in order**:

   ```bash
   psql "$DATABASE_URL_UNPOOLED" -v ON_ERROR_STOP=1 -f migrations/001_initial.sql
   psql "$DATABASE_URL_UNPOOLED" -v ON_ERROR_STOP=1 -f migrations/002_registration_rate_limits.sql
   ```

4. Set a unique 12–128 character `OWNER_PASSWORD` in `.env.local`, then run `npm run setup:owner` once. This creates `admin@coaching4job.ma`; the script intentionally refuses to overwrite an existing account. Remove `OWNER_PASSWORD` from `.env.local` after setup.
5. Run `npm run dev` and open `http://localhost:3000`.

For an existing database with `001_initial.sql` already applied, run **only** `002_registration_rate_limits.sql` before starting the updated app. Do not rerun the initial migration against existing tables.

## Checks and important paths

```bash
npm run lint
npx tsc --noEmit
npm run build
```

`app/actions/registrations.ts` saves public submissions. `app/espace-pro/` contains the private dashboard and follow-up actions. `lib/auth.ts` and `lib/database.ts` configure authentication and PostgreSQL. `migrations/` contains ordered SQL migrations. The production build fetches Geist fonts, so it needs access to Google Fonts during the build.

The public form uses a hidden field and a database-backed limit of 10 valid submissions per visitor IP per hour. IPs are stored as keyed hashes, not raw addresses. This assumes deployment behind a trusted proxy that replaces client-supplied forwarding headers; [Vercel provides this for `X-Forwarded-For`](https://vercel.com/docs/headers/request-headers). Other hosts must provide an equivalent trusted header before using this limit. Add an [edge firewall or bot challenge](https://vercel.com/docs/bot-management) if automated traffic becomes substantial. Periodically remove expired limiter rows with `DELETE FROM registration_rate_limits WHERE window_started_at < now() - interval '7 days';`.

## Deploy on Vercel

1. Create a PostgreSQL database and back it up before applying any migration. Run the ordered migrations against its **direct** URL. For an existing database, apply only migrations it has not yet received.
2. Create the owner account against that database with `npm run setup:owner` from a trusted local machine. Use the production database URLs in `.env.local`, set a temporary `OWNER_PASSWORD`, and remove that password afterward.
3. Import the repository into Vercel with `my-app` as the project root. Set these production environment variables: `DATABASE_URL` (pooled), `BETTER_AUTH_SECRET` (the same secret used for the site), and `BETTER_AUTH_URL` (the exact public `https://` origin, without a trailing slash). Do not set `OWNER_PASSWORD` in Vercel.
4. Run the checks above, deploy, and verify a public registration plus owner sign-in, search, status update, and note creation. Use test contact details and remove the test record through your database workflow afterward.

Deploy the code only after the database migrations finish. Keep the database URL and auth secret out of Git and deployment logs.

## Backup and recovery

Take regular database backups and a fresh backup before each migration. A portable manual backup uses the direct database URL:

```bash
pg_dump --format=custom --no-owner --no-acl --file=coaching4job.backup "$DATABASE_URL_UNPOOLED"
```

Store the backup securely because it contains contact details and notes. Test a restore into a **separate, empty** database before relying on it:

```bash
pg_restore --no-owner --no-acl --exit-on-error --dbname="$RESTORE_DATABASE_URL" coaching4job.backup
```

Check the restored owner account and registration counts, then change `DATABASE_URL` to the restored database and redeploy if recovery is needed. A restore returns data to the backup time; submissions made afterward need separate recovery. If an app release fails but the database is healthy, redeploy the previous app version and confirm that its code works with the current database schema. Never run the initial migration or a restore over live data.
