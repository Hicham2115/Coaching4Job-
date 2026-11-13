BEGIN;

CREATE TABLE registration_rate_limits (
  visitor_key text PRIMARY KEY,
  window_started_at timestamptz NOT NULL,
  attempts integer NOT NULL CHECK (attempts BETWEEN 1 AND 10)
);

COMMIT;
