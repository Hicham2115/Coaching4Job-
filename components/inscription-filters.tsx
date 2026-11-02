"use client";

import { Search } from "lucide-react";

type InscriptionFiltersProps = {
  search: string;
  status: string;
};

export default function InscriptionFilters({
  search,
  status,
}: InscriptionFiltersProps) {
  return (
    <form
      action="/espace-pro/inscriptions"
      className="grid gap-3 md:grid-cols-[minmax(280px,1.4fr)_minmax(220px,0.8fr)]"
    >
      <label className="relative block">
        <Search
          aria-hidden="true"
          className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-brand-muted"
        />
        <input
          type="search"
          name="q"
          defaultValue={search}
          maxLength={100}
          placeholder="Rechercher un nom, téléphone ou e-mail"
          aria-label="Rechercher un nom, téléphone ou e-mail"
          className="h-11 w-full rounded-sm border border-brand-ink/20 bg-white pl-12 pr-4 text-sm outline-none placeholder:text-brand-muted/70 focus:border-brand-ink focus:ring-2 focus:ring-brand-yellow/60"
        />
      </label>
      <label>
        <span className="sr-only">Filtrer par statut</span>
        <select
          name="status"
          defaultValue={status}
          onChange={(event) => event.currentTarget.form?.requestSubmit()}
          className="h-11 w-full appearance-none rounded-sm border border-brand-ink/20 bg-white px-4 text-sm outline-none focus:border-brand-ink focus:ring-2 focus:ring-brand-yellow/60"
        >
          <option value="">Tous les statuts</option>
          <option value="new">Nouveau</option>
          <option value="to_contact">À contacter</option>
          <option value="contacted">Contacté</option>
        </select>
      </label>
      <button
        type="submit"
        className="sr-only"
      >
        Rechercher
      </button>
    </form>
  );
}
