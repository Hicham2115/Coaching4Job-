import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const navigationLinks = [
  { href: "#accompagnements", label: "Accompagnements" },
  { href: "#methode", label: "Méthode" },
  { href: "#a-propos", label: "À propos" },
];

function LogoMark() {
  return (
    <svg aria-hidden="true" className="size-10 shrink-0 xl:size-[58px]" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="21" stroke="#111111" strokeWidth="5" strokeDasharray="105 27" transform="rotate(35 24 24)" />
      <path d="M31 8.2A17.2 17.2 0 1 0 31 39.8" stroke="#F8EF00" strokeWidth="4" strokeLinecap="round" />
      <circle cx="24" cy="24" r="3.8" fill="#F8EF00" />
    </svg>
  );
}

export default function Component() {
  return (
    <header className="relative z-20 border-b-2 border-brand-ink/45 bg-white">
      <div className="relative mx-auto flex h-16 max-w-[1320px] items-center gap-4 px-5 sm:px-8 xl:h-[92px] xl:px-14">
        <Link href="#accueil" aria-label="Coaching 4 Job, accueil" className="flex min-w-0 items-center gap-3 text-brand-ink xl:gap-4">
          <LogoMark />
          <span className="truncate text-base font-extrabold tracking-[-0.04em] sm:text-xl xl:text-[28px]">Coaching 4 Job</span>
        </Link>
        <NavigationMenu aria-label="Navigation principale" className="absolute left-1/2 hidden -translate-x-1/2 xl:flex">
          <NavigationMenuList className="gap-8">
            {navigationLinks.map((link) => (
              <NavigationMenuItem key={link.label}>
                <NavigationMenuLink className="nav-link !p-0 text-sm font-medium text-brand-ink hover:bg-transparent focus:bg-transparent" href={link.href}>
                  {link.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <Link className="ml-auto inline-flex h-10 shrink-0 items-center justify-center gap-3 rounded-full bg-brand-yellow px-4 text-xs font-bold text-brand-ink transition-transform hover:-translate-y-0.5 xl:h-[50px] xl:w-[200px] xl:gap-5 xl:px-6 xl:text-sm" href="#contact">
          <span className="hidden sm:inline">Conférence en ligne</span><span className="sm:hidden">Conférence</span>
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
      <nav aria-label="Navigation mobile" className="flex gap-6 overflow-x-auto border-t border-brand-ink/10 px-6 py-3 text-xs font-medium text-brand-ink sm:px-8 xl:hidden">
        {navigationLinks.map((link) => <Link className="nav-link shrink-0" href={link.href} key={link.label}>{link.label}</Link>)}
      </nav>
    </header>
  );
}
