"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const schema = z.object({
  email: z.string().trim().email("Saisissez une adresse e-mail valide."),
  password: z.string().min(1, "Saisissez votre mot de passe."),
});

const inputClass =
  "h-12 w-full rounded-sm border border-brand-ink/40 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-brand-ink focus:ring-2 focus:ring-brand-yellow/70";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    defaultValues: { email: "", password: "" },
    validators: { onSubmit: schema },
    onSubmit: async ({ value }) => {
      try {
        const { error } = await authClient.signIn.email({
          email: value.email,
          password: value.password,
        });

        if (error) {
          toast.error("E-mail ou mot de passe incorrect.");
          return;
        }

        window.location.replace("/espace-pro/tableau-de-bord");
      } catch {
        toast.error("Connexion impossible pour le moment. Réessayez plus tard.");
      }
    },
  });

  return (
    <>
      <form
        className="mt-8 space-y-6"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          void form.handleSubmit();
        }}
      >
        <form.Field name="email">
          {(field) => {
            const error = field.state.meta.errors[0];
            return (
              <div>
                <label htmlFor="login-email" className="text-sm font-semibold">
                  E-mail
                </label>
                <div className="relative mt-2">
                  <Mail
                    aria-hidden="true"
                    className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2"
                  />
                  <input
                    id="login-email"
                    name={field.name}
                    type="email"
                    autoComplete="username"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    aria-invalid={!!error}
                    aria-describedby={error ? "login-email-error" : undefined}
                    className={inputClass}
                  />
                </div>
                {error && (
                  <p
                    id="login-email-error"
                    className="mt-2 text-sm text-red-700"
                  >
                    {typeof error === "string" ? error : error.message}
                  </p>
                )}
              </div>
            );
          }}
        </form.Field>
        <form.Field name="password">
          {(field) => {
            const error = field.state.meta.errors[0];
            return (
              <div>
                <label
                  htmlFor="login-password"
                  className="text-sm font-semibold"
                >
                  Mot de passe
                </label>
                <div className="relative mt-2">
                  <LockKeyhole
                    aria-hidden="true"
                    className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2"
                  />
                  <input
                    id="login-password"
                    name={field.name}
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    aria-invalid={!!error}
                    aria-describedby={
                      error ? "login-password-error" : undefined
                    }
                    className={`${inputClass} pr-12`}
                  />
                  <button
                    type="button"
                    aria-label={
                      showPassword
                        ? "Masquer le mot de passe"
                        : "Afficher le mot de passe"
                    }
                    aria-pressed={showPassword}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink"
                  >
                    {showPassword ? (
                      <EyeOff aria-hidden="true" className="size-5" />
                    ) : (
                      <Eye aria-hidden="true" className="size-5" />
                    )}
                  </button>
                </div>
                {error && (
                  <p
                    id="login-password-error"
                    className="mt-2 text-sm text-red-700"
                  >
                    {typeof error === "string" ? error : error.message}
                  </p>
                )}
              </div>
            );
          }}
        </form.Field>
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="h-12 w-full rounded-sm bg-brand-yellow text-sm font-bold text-brand-ink hover:bg-brand-yellow/85 disabled:cursor-wait disabled:opacity-75"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle
                    aria-hidden="true"
                    className="mr-2 size-5 animate-spin"
                  />
                  Connexion…
                </>
              ) : (
                <>
                  Se connecter
                  <ArrowRight aria-hidden="true" className="ml-2 size-5" />
                </>
              )}
            </Button>
          )}
        </form.Subscribe>
      </form>
      <div
        className="my-7 flex items-center gap-4 text-xs text-brand-muted"
        aria-hidden="true"
      >
        <span className="h-px flex-1 bg-brand-ink/15" />
        ou
        <span className="h-px flex-1 bg-brand-ink/15" />
      </div>
      <Link
        href="/"
        className="inline-flex min-h-11 items-center gap-2 text-sm text-brand-muted underline underline-offset-4 hover:text-brand-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-ink"
      >
        <ArrowLeft aria-hidden="true" className="size-4" /> Retour au site
      </Link>
    </>
  );
}
