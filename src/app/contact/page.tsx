import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ContactForm } from "@/components/ui/ContactForm";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/jsonld/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Contact & Programări",
  description:
    "Programează constatarea sau reparația la VP Service Auto: Splaiul Unirii 969, București. Telefon, WhatsApp sau formular online — răspundem rapid.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Acasă", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <PageHero
        eyebrow="Contact & programări"
        title={
          <>
            Vorbim în <span className="text-red-bright">2 minute</span>,
            rezolvăm în aceeași zi
          </>
        }
        sub="Sună-ne, scrie-ne pe WhatsApp sau lasă-ne datele tale — te contactăm noi în cel mai scurt timp."
      />

      <section className="wrap grid gap-14 py-16 md:grid-cols-[1fr_1.2fr] md:py-24">
        {/* coloana info */}
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="!text-2xl">Date de contact</h2>
            <ul className="mt-6 flex flex-col gap-5">
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-coal-700 bg-coal-800 text-red-bright">
                  <Icon name="map-pin" size={20} />
                </span>
                <div>
                  <p className="font-bold text-paper">Adresă</p>
                  <p className="mt-0.5 text-sm text-steel-300">
                    {SITE.address.street}, {SITE.address.city}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-coal-700 bg-coal-800 text-red-bright">
                  <Icon name="phone" size={20} />
                </span>
                <div>
                  <p className="font-bold text-paper">Telefon</p>
                  <a
                    href={SITE.phoneHref}
                    className="mt-0.5 block text-sm text-steel-300 hover:text-paper"
                  >
                    {SITE.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-coal-700 bg-coal-800 text-red-bright">
                  <Icon name="whatsapp" size={20} />
                </span>
                <div>
                  <p className="font-bold text-paper">WhatsApp</p>
                  <a
                    href={SITE.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 block text-sm text-steel-300 hover:text-paper"
                  >
                    Scrie-ne direct — răspundem rapid
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-coal-700 bg-coal-800 text-red-bright">
                  <Icon name="mail" size={20} />
                </span>
                <div>
                  <p className="font-bold text-paper">Email</p>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="mt-0.5 block text-sm text-steel-300 hover:text-paper"
                  >
                    {SITE.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-coal-700 bg-coal-800 text-red-bright">
                  <Icon name="clock" size={20} />
                </span>
                <div>
                  <p className="font-bold text-paper">Program</p>
                  <ul className="mt-0.5 text-sm text-steel-300">
                    {SITE.hours.map((h) => (
                      <li key={h.days}>
                        {h.days}: {h.interval}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </div>

          <div className="led-frame p-6">
            <p className="font-heading font-bold text-paper">
              Ai avut accident chiar acum?
            </p>
            <p className="mt-2 text-sm text-steel-300">
              Nu completa formulare. Sună direct — îți spunem pe loc ce faci
              mai departe și trimitem platforma dacă mașina nu rulează.
            </p>
            <a href={SITE.phoneHref} className="btn btn-primary mt-4 w-full">
              <Icon name="phone" size={18} />
              {SITE.phoneDisplay}
            </a>
          </div>
        </div>

        {/* coloana formular */}
        <div className="rounded-2xl border border-coal-700 bg-coal-850 p-7 md:p-9">
          <h2 className="!text-2xl">Programează-te online</h2>
          <p className="mt-2 mb-7 text-sm text-steel-400">
            Câmpurile marcate cu * sunt obligatorii. Te sunăm noi pentru
            confirmare.
          </p>
          <ContactForm />
        </div>
      </section>

      <section className="wrap pb-20">
        <MapEmbed />
      </section>
    </>
  );
}
