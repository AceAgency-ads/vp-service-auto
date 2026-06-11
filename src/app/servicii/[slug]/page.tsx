import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getService, SERVICES } from "@/lib/services";
import { IMAGES } from "@/lib/images";
import { SITE } from "@/lib/site";
import { Breadcrumbs } from "@/components/sections/shared/Breadcrumbs";
import { CtaBand } from "@/components/sections/shared/CtaBand";
import { Icon } from "@/components/ui/Icon";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import StarBorder from "@/components/reactbits/StarBorder";
import { JsonLd } from "@/components/jsonld/JsonLd";
import { breadcrumbSchema, serviceSchemaFor } from "@/lib/jsonld";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/servicii/${service.slug}` },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const image = IMAGES[service.imageKey];
  const related = service.related
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const crumbs = [
    { name: "Acasă", path: "/" },
    { name: "Servicii", path: "/servicii" },
    { name: service.title, path: `/servicii/${service.slug}` },
  ];

  return (
    <>
      <JsonLd data={serviceSchemaFor(service)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />

      {/* hero split */}
      <section className="relative overflow-hidden border-b border-coal-800 bg-coal-900">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 380px at 15% -10%, rgba(227,6,19,0.13), transparent 70%)",
          }}
          aria-hidden
        />
        <div className="wrap relative grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
          <div>
            <Breadcrumbs items={crumbs} />
            <h1 className="mt-6 !text-[clamp(30px,4.5vw,48px)]" data-reveal>
              {service.heading}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-steel-300" data-reveal data-reveal-delay="100">
              {service.sub}
            </p>
            <div
              className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
              data-reveal
              data-reveal-delay="200"
            >
              <StarBorder as="a" href={SITE.phoneHref}>
                <Icon name="phone" size={18} />
                {SITE.phoneDisplay}
              </StarBorder>
              <Link href="/contact" className="btn btn-ghost">
                Cere o programare
              </Link>
            </div>
          </div>
          <div className="red-edge overflow-hidden rounded-2xl border border-coal-700" data-reveal>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              priority
              sizes="(min-width: 768px) 36rem, 100vw"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
        <hr className="led-line" />
      </section>

      {/* ce include */}
      <section className="wrap py-16 md:py-24">
        <p className="eyebrow" data-reveal>
          Ce include
        </p>
        <h2 className="mt-4 max-w-xl" data-reveal data-reveal-delay="80">
          Lucrări executate corect, cu garanție
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
          {service.includes.map((item) => (
            <div
              key={item.title}
              data-reveal-child
              className="red-edge rounded-2xl border border-coal-700 bg-coal-850 p-6"
            >
              <Icon name="check" size={20} className="text-red-bright" />
              <h3 className="mt-3 !text-base">{item.title}</h3>
              <p className="mt-2 text-sm text-steel-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* mini-proces */}
      <section className="border-y border-coal-800 bg-coal-900 py-16 md:py-24">
        <div className="wrap">
          <p className="eyebrow" data-reveal>
            Cum decurge
          </p>
          <h2 className="mt-4 max-w-xl" data-reveal data-reveal-delay="80">
            Simplu pentru tine, riguros pentru noi
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3" data-reveal-group>
            {service.process.map((step, i) => (
              <li key={step.title} data-reveal-child className="flex gap-4">
                <span className="led-frame flex h-11 w-11 shrink-0 items-center justify-center !rounded-full font-heading text-base font-extrabold text-red-bright">
                  {i + 1}
                </span>
                <div>
                  <h3 className="!text-base">{step.title}</h3>
                  <p className="mt-1.5 text-sm text-steel-300">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* servicii conexe */}
      <section className="wrap py-16 md:py-24">
        <p className="eyebrow" data-reveal>
          Servicii conexe
        </p>
        <h2 className="mt-4" data-reveal data-reveal-delay="80">
          Des cerute împreună
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
          {related.map((rel) => (
            <div key={rel.slug} data-reveal-child>
              <Link href={`/servicii/${rel.slug}`} className="group block h-full">
                <SpotlightCard className="flex h-full flex-col gap-3 p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-coal-700 bg-coal-800 text-red-bright">
                    <Icon name={rel.icon} size={20} />
                  </span>
                  <h3 className="!text-lg">{rel.title}</h3>
                  <p className="text-sm text-steel-300">{rel.short}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-1 text-sm font-bold text-red-bright">
                    Detalii
                    <Icon
                      name="arrow-right"
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </SpotlightCard>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title={`Ai nevoie de ${service.title.toLowerCase()}?`}
        sub="Sună-ne pentru o estimare rapidă și onestă — îți răspundem pe loc."
      />
    </>
  );
}
