"use client";

import { useState, useTransition } from "react";
import { Select } from "@base-ui/react/select";
import { Check, ChevronDown, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import { setRegistrationStatus } from "@/app/espace-pro/inscriptions/[id]/actions";

type Status = "new" | "to_contact" | "contacted";

const statusOptions: { value: Status; label: string }[] = [
  { value: "new", label: "Nouveau" },
  { value: "to_contact", label: "À contacter" },
  { value: "contacted", label: "Contacté" },
];

const statusStyles: Record<Status, string> = {
  new: "bg-brand-yellow/60 text-brand-ink",
  to_contact: "bg-brand-ink/10 text-brand-ink",
  contacted: "bg-emerald-100 text-emerald-900",
};

export default function RegistrationStatusSelect({
  registrationId,
  registrationName,
  initialStatus,
}: {
  registrationId: string;
  registrationName: string;
  initialStatus: Status;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [isPending, startTransition] = useTransition();

  function handleStatusChange(value: string | null) {
    if (!value || value === status) return;

    const previousStatus = status;
    const nextStatus = value as Status;
    setStatus(nextStatus);

    startTransition(async () => {
      const result = await setRegistrationStatus(registrationId, nextStatus);
      if (result.kind === "success") {
        toast.success(result.message);
        return;
      }

      setStatus(previousStatus);
      toast.error(result.message);
    });
  }

  return (
    <div className="flex justify-center">
      <Select.Root
        items={statusOptions}
        value={status}
        onValueChange={handleStatusChange}
        disabled={isPending}
      >
        <Select.Trigger
          aria-label={`Modifier le statut de ${registrationName}`}
          className={`inline-flex min-h-10 min-w-24 items-center justify-center gap-2 rounded px-3 text-center text-[11px] font-medium transition hover:ring-1 hover:ring-brand-ink/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink disabled:cursor-wait disabled:opacity-70 ${statusStyles[status]}`}
        >
          <Select.Value />
          {isPending ? (
            <LoaderCircle
              aria-hidden="true"
              className="size-3.5 animate-spin"
            />
          ) : (
            <ChevronDown aria-hidden="true" className="size-3.5" />
          )}
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner className="z-50 outline-none" sideOffset={4}>
            <Select.Popup className="min-w-40 overflow-hidden border border-brand-ink/15 bg-white p-1 text-brand-ink shadow-lg outline-none">
              <Select.List>
                {statusOptions.map((option) => (
                  <Select.Item
                    key={option.value}
                    value={option.value}
                    className="flex min-h-10 cursor-pointer items-center justify-between gap-3 px-3 text-xs outline-none data-highlighted:bg-brand-soft data-highlighted:text-brand-ink"
                  >
                    <Select.ItemText>{option.label}</Select.ItemText>
                    <Select.ItemIndicator>
                      <Check aria-hidden="true" className="size-3.5" />
                    </Select.ItemIndicator>
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
