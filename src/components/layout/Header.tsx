import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="red-edge sticky top-0 z-40 border-b border-coal-800 bg-coal-950/85 backdrop-blur-md">
      <div className="wrap flex h-[72px] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Meniu principal">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-semibold text-steel-200 transition-colors hover:text-paper"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={SITE.phoneHref}
            className="btn btn-primary hidden !px-5 !py-3 sm:inline-flex"
          >
            <Icon name="phone" size={17} />
            <span className="hidden md:inline">{SITE.phoneDisplay}</span>
            <span className="md:hidden">Sună</span>
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
