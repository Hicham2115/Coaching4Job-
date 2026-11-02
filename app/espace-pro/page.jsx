import Image from "next/image";
import LoginForm from "@/components/login-form";

export const metadata = {
  title: "Connexion | Espace Pro Coaching 4 Job",
  robots: { index: false, follow: false },
};

export default function EspaceProPage() {
  return (
    <main className="grid min-h-svh bg-white text-brand-ink lg:grid-cols-2">
      <section className="relative flex min-h-[200px] items-center overflow-hidden bg-brand-ink px-6 py-10 sm:px-12 lg:min-h-svh lg:px-[8%] lg:py-16">
        <Image
          src="/images/approach-logo.svg"
          alt=""
          aria-hidden="true"
          width={500}
          height={500}
          className="pointer-events-none absolute -bottom-36 -left-28 hidden w-[480px] opacity-10 lg:block"
        />
        <div className="relative w-full max-w-[560px]">
          <Image
            src="/images/coaching4job-logo-transparent.png"
            alt="Coaching 4 Job"
            width={2050}
            height={312}
            priority
            className="h-auto w-full max-w-[560px]"
          />
          <p className="mt-4 text-lg leading-snug text-white/85 sm:text-xl lg:text-2xl">
            Votre espace de suivi des inscriptions
          </p>
        </div>
      </section>
      <section className="flex items-center px-6 py-12 sm:px-12 lg:px-[10%] lg:py-16">
        <div className="mx-auto w-full max-w-[480px]">
          <h1 className="whitespace-nowrap text-[clamp(1rem,6vw,2rem)] font-bold leading-tight tracking-[-0.045em] lg:text-[clamp(1.5rem,2.2vw,2rem)]">
            Connexion à votre espace
          </h1>
          <p className="mt-2 text-base leading-6 text-brand-muted">
            Accédez au tableau de bord pour suivre vos inscriptions et gérer vos contacts pour la conférence.
          </p>
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
