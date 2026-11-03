"use client";

import { useState } from "react";
import { LoaderCircle, LogOut } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

export default function DashboardSignOut() {
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function signOut() {
    if (isSigningOut) return;
    setIsSigningOut(true);

    try {
      const { error } = await authClient.signOut();
      if (error) {
        setIsSigningOut(false);
        toast.error("Impossible de fermer la session. Réessayez.");
        return;
      }

      window.location.replace("/espace-pro");
    } catch {
      setIsSigningOut(false);
      toast.error("Impossible de fermer la session. Réessayez.");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={signOut}
        disabled={isSigningOut}
        aria-label={isSigningOut ? "Déconnexion en cours" : "Se déconnecter"}
        className="inline-flex min-h-10 shrink-0 cursor-pointer items-center gap-2 rounded-sm border border-brand-ink/15 bg-white px-3 text-xs font-semibold text-brand-ink transition-colors hover:border-brand-ink hover:bg-brand-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink disabled:cursor-wait disabled:opacity-70"
      >
        {isSigningOut ? (
          <LoaderCircle aria-hidden="true" className="size-4 motion-safe:animate-spin" />
        ) : (
          <LogOut aria-hidden="true" className="size-4" />
        )}
        <span className="hidden md:inline">
          {isSigningOut ? "Déconnexion…" : "Se déconnecter"}
        </span>
      </button>
      {isSigningOut && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-brand-ink px-6 text-center text-white"
        >
          <LoaderCircle
            aria-hidden="true"
            className="size-10 text-brand-yellow motion-safe:animate-spin"
          />
          <div>
            <p className="text-xl font-bold tracking-tight">Déconnexion en cours…</p>
            <p className="mt-2 text-sm text-white/70">Fermeture de votre espace pro</p>
          </div>
        </div>
      )}
    </>
  );
}
