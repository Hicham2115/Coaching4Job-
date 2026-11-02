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
      aria-label="Se déconnecter"
      className="inline-flex min-h-10 shrink-0 cursor-pointer items-center gap-2 rounded-sm border border-brand-ink/15 bg-white px-3 text-xs font-semibold text-brand-ink transition-colors hover:border-brand-ink hover:bg-brand-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink"
    >
      <LogOut aria-hidden="true" className="size-4" />
      <span className="hidden md:inline">Se déconnecter</span>
    </button>
  );
}
