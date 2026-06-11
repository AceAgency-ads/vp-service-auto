import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";

export function Footer() {
  return (
    <footer className="red-edge mt-auto border-t border-coal-800 bg-coal-900">
      <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Logo withTagline />
          <p className="max-w-xs text-sm text-steel-400">
            Centru de constatare daune RCA/CASCO și service auto complet —
            tinichigerie, vopsitorie, mecanică.
          </p>
          <p className="text-sm text-steel-400">
            Parteneri: {SITE.partners.join(" · ")}
          </p>
        </div>

        <nav aria-label="Navigație footer" className="text-sm">
          <p className="font-heading mb-4 font-bold text-paper">Navigație</p>
          <ul className="flex flex-col gap-2.5">
            <li>
              <Link href="/" className="text-steel-300 hover:text-paper">
                Acasă
              </Link>
            </li>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-steel-300 hover:text-paper">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Servicii footer" className="text-sm">
          <p className="font-heading mb-4 font-bold text-paper">Servicii</p>
          <ul className="flex flex-col gap-2.5">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/servicii/${s.slug}`}
                  className="text-steel-300 hover:text-paper"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-sm">
          <p className="font-heading mb-4 font-bold text-paper">Contact</p>
          <ul className="flex flex-col gap-3 text-steel-300">
            <li className="flex items-start gap-2.5">
              <Icon name="map-pin" size={17} className="mt-0.5 shrink-0 text-red-bright" />
              <span>
                {SITE.address.street}, {SITE.address.city}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Icon name="phone" size={17} className="mt-0.5 shrink-0 text-red-bright" />
              <a href={SITE.phoneHref} className="hover:text-paper">
                {SITE.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Icon name="mail" size={17} className="mt-0.5 shrink-0 text-red-bright" />
              <a href={`mailto:${SITE.email}`} className="hover:text-paper">
                {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Icon name="clock" size={17} className="mt-0.5 shrink-0 text-red-bright" />
              <span>
                {SITE.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days}: {h.interval}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-coal-800">
        <div className="wrap flex flex-col gap-3 py-6 text-xs text-steel-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. Toate drepturile
            rezervate.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link
                href="/politica-de-confidentialitate"
                className="hover:text-steel-200"
              >
                Politica de confidențialitate
              </Link>
            </li>
            <li>
              <Link href="/termeni-si-conditii" className="hover:text-steel-200">
                Termeni și condiții
              </Link>
            </li>
            <li>
              <a
                href="https://anpc.ro/ce-este-sal/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-steel-200"
              >
                ANPC — SAL
              </a>
            </li>
            <li>
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-steel-200"
              >
                Soluționarea online a litigiilor (SOL)
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
