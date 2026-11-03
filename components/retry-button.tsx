"use client";

import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

export default function RetryButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.refresh()}
      className="mt-1 inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-sm bg-brand-yellow px-4 text-sm font-semibold text-brand-ink shadow-sm transition hover:bg-brand-yellow/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink sm:mt-0"
    >
      <RefreshCw aria-hidden="true" className="size-4" />
      Réessayer
    </button>
  );
}
