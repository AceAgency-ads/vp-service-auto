"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";

/* Bara telefon-first, doar mobil. Apare după ce utilizatorul
   trece de hero (care are propriul CTA „Sună acum"). */

export function StickyCallBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      data-testid="sticky-call-bar"
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-coal-700 bg-coal-900/95 px-4 pt-3 backdrop-blur-md transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="flex gap-3">
        <a href={SITE.phoneHref} className="btn btn-primary flex-1 !py-3.5">
          <Icon name="phone" size={18} />
          Sună acum
        </a>
        <a
          href={SITE.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost flex-1 !py-3.5"
        >
          <Icon name="whatsapp" size={18} />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
