import { CircleAlert } from "lucide-react";

import RetryButton from "@/components/retry-button";

export default function DataLoadError({ message }: { message: string }) {
  return (
    <section
      role="alert"
      className="flex flex-col gap-4 border border-red-700/25 border-l-4 border-l-red-700 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-5"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-800">
          <CircleAlert aria-hidden="true" className="size-5" />
        </span>
        <div>
          <p className="font-semibold text-brand-ink">
            Impossible de charger les données
          </p>
          <p className="mt-1 text-sm text-brand-muted">{message}</p>
        </div>
      </div>
      <RetryButton />
    </section>
  );
}
