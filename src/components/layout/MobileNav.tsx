"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-label="Deschide meniul"
        className="flex h-11 w-11 items-center justify-center rounded-lg border border-coal-700 text-paper"
      >
        <Icon name="menu" size={22} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-coal-950/[0.985] backdrop-blur-sm">
          <div className="wrap flex h-[72px] items-center justify-between">
            <span className="font-heading text-lg font-extrabold text-paper">
              Meniu
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Închide meniul"
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-coal-700 text-paper"
            >
              <Icon name="x" size={22} />
            </button>
          </div>
          <hr className="led-line" />
          <nav className="wrap flex flex-1 flex-col gap-1 py-8" aria-label="Meniu mobil">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="font-heading rounded-lg px-2 py-3.5 text-2xl font-bold text-paper"
            >
              Acasă
            </Link>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-heading rounded-lg px-2 py-3.5 text-2xl font-bold text-paper"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-auto flex flex-col gap-3 pb-6">
              <a href={SITE.phoneHref} className="btn btn-primary w-full">
                <Icon name="phone" size={18} />
                Sună acum — {SITE.phoneDisplay}
              </a>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="btn btn-ghost w-full"
              >
                Programează o vizită
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
