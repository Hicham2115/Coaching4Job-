"use client";

import { useRouter } from "next/navigation";
import { Select } from "@base-ui/react/select";
import { ChevronDown, Search } from "lucide-react";

type InscriptionFiltersProps = {
  search: string;
  status: string;
};

const statusOptions = [
  { value: "all", label: "Tous les statuts" },
  { value: "new", label: "Nouveau" },
  { value: "to_contact", label: "À contacter" },
  { value: "contacted", label: "Contacté" },
];

export default function InscriptionFilters({
  search,
  status,
}: InscriptionFiltersProps) {
  const router = useRouter();

  function updateStatus(value: string | null) {
    const query = new URLSearchParams();
    if (search) query.set("q", search);
    if (value && value !== "all") query.set("status", value);

    const queryString = query.toString();
    router.push(
      queryString
        ? `/espace-pro/inscriptions?${queryString}`
        : "/espace-pro/inscriptions",
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-[minmax(280px,1.4fr)_minmax(220px,0.8fr)]">
      <form action="/espace-pro/inscriptions" className="relative block">
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
        {status && <input type="hidden" name="status" value={status} />}
        <button type="submit" className="sr-only">
          Rechercher
        </button>
      </form>

      <Select.Root
        items={statusOptions}
        value={status || "all"}
        onValueChange={updateStatus}
      >
        <Select.Trigger
          aria-label="Filtrer les inscriptions par statut"
          className="flex h-11 w-full items-center justify-between rounded-sm border border-brand-ink/20 bg-white px-4 text-left text-sm outline-none transition hover:border-brand-ink/40 focus-visible:border-brand-ink focus-visible:ring-2 focus-visible:ring-brand-yellow/60"
        >
          <Select.Value />
          <ChevronDown aria-hidden="true" className="size-4 text-brand-muted" />
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner className="z-50 outline-none" sideOffset={4}>
            <Select.Popup className="min-w-[var(--anchor-width)] overflow-hidden border border-brand-ink/15 bg-white p-1 text-brand-ink shadow-lg outline-none">
              <Select.List>
                {statusOptions.map((option) => (
                  <Select.Item
                    key={option.value}
                    value={option.value}
                    className="flex min-h-11 cursor-pointer items-center justify-between gap-3 px-3 text-sm outline-none data-highlighted:bg-brand-soft"
                  >
                    <Select.ItemText>{option.label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
