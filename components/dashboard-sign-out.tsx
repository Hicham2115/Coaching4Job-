"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

export default function DashboardSignOut() {
  const router = useRouter();

  async function signOut() {
    try {
      const { error } = await authClient.signOut();
      if (error) {
        toast.error("Impossible de fermer la session. Réessayez.");
        return;
      }

      router.replace("/espace-pro");
      router.refresh();
    } catch {
      toast.error("Impossible de fermer la session. Réessayez.");
    }
  }

  return (
    <button
      type="button"
      onClick={signOut}
      className="inline-flex min-h-11 items-center gap-2 text-xs font-medium text-brand-muted transition hover:text-brand-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-ink"
    >
      <LogOut aria-hidden="true" className="size-4" />
      <span className="hidden sm:inline">Se déconnecter</span>
    </button>
  );
}
