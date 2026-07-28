import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { PageHero } from "@/components/sections/shared/PageHero";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { Icon } from "@/components/ui/Icon";
import { DirectionsTrigger } from "@/components/ui/DirectionsTrigger";
import { JsonLd } from "@/components/jsonld/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Contact & Programări",
  description:
    "Programează constatarea sau reparația la VP Service Auto: Splaiul Unirii 969, București. Sună-ne sau scrie-ne pe WhatsApp — răspundem rapid.",
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
        sub="Sună-ne sau scrie-ne pe WhatsApp — îți spunem pe loc ce acte îți trebuie și când te putem primi."
      />

      {/* cele două canale directe, egale ca greutate */}
      <section className="wrap py-16 md:py-20">
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href={SITE.phoneHref}
            className="red-edge group flex flex-col gap-2 rounded-2xl border border-coal-700 bg-coal-850 p-7 transition-colors hover:border-red"
            data-reveal
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-coal-700 bg-coal-800 text-red-bright">
              <Icon name="phone" size={22} />
            </span>
            <span className="font-heading mt-2 text-xl font-bold text-paper">
              Sună acum
            </span>
            <span className="font-heading text-2xl font-extrabold text-red-bright">
              {SITE.phoneDisplay}
            </span>
            <span className="text-sm text-steel-400">
              Cel mai rapid — răspundem în timpul programului.
            </span>
          </a>

          <a
            href={SITE.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-2 rounded-2xl border border-coal-700 bg-coal-850 p-7 transition-colors hover:border-red"
            data-reveal
            data-reveal-delay="120"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-coal-700 bg-coal-800 text-red-bright">
              <Icon name="whatsapp" size={22} />
            </span>
            <span className="font-heading mt-2 text-xl font-bold text-paper">
              Scrie-ne pe WhatsApp
            </span>
            <span className="font-heading text-2xl font-extrabold text-paper">
              {SITE.phoneDisplay}
            </span>
            <span className="text-sm text-steel-400">
              Trimite-ne poze cu dauna — evaluăm și te sunăm înapoi.
            </span>
          </a>
        </div>
      </section>

      <section className="wrap grid gap-14 pb-16 md:grid-cols-2 md:pb-24">
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
                  <DirectionsTrigger className="mt-0.5 block text-sm text-steel-300 hover:text-paper">
                    {SITE.address.street}, {SITE.address.city} — cum ajungi
                  </DirectionsTrigger>
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
              Sună direct — îți spunem pe loc ce faci mai departe și trimitem
              platforma dacă mașina nu rulează.
            </p>
            <a href={SITE.phoneHref} className="btn btn-primary mt-4 w-full">
              <Icon name="phone" size={18} />
              {SITE.phoneDisplay}
            </a>
          </div>
        </div>

        {/* ce pregătești înainte să suni — înlocuiește câmpurile fostului formular */}
        <div className="rounded-2xl border border-coal-700 bg-coal-850 p-7 md:p-9">
          <h2 className="!text-2xl">Ce e bine să ai la îndemână</h2>
          <p className="mt-2 text-sm text-steel-400">
            Nu sunt obligatorii — dar cu ele îți dăm un răspuns exact din primul
            telefon.
          </p>
          <ul className="mt-7 flex flex-col gap-4">
            {[
              {
                title: "Marca, modelul și anul mașinii",
                text: "Ca să știm din start ce piese și ce durată implică lucrarea.",
              },
              {
                title: "Numărul de înmatriculare",
                text: "Necesar la deschiderea dosarului de daună.",
              },
              {
                title: "Seria poliței RCA sau CASCO",
                text: "O găsești în polița de asigurare sau în aplicația asiguratorului.",
              },
              {
                title: "Câteva poze cu dauna",
                text: "Trimise pe WhatsApp, ne lasă să estimăm înainte să vii.",
              },
            ].map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <Icon
                  name="check"
                  size={18}
                  className="mt-0.5 shrink-0 text-red-bright"
                />
                <div>
                  <p className="font-semibold text-paper">{item.title}</p>
                  <p className="text-sm text-steel-400">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <a
            href={SITE.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost mt-8 w-full"
          >
            <Icon name="whatsapp" size={18} />
            Trimite pozele pe WhatsApp
          </a>
        </div>
      </section>

      <section className="wrap pb-20">
        <MapEmbed />
      </section>
    </>
  );
}
