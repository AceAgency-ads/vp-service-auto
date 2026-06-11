import { SITE } from "./site";
import { IMAGES } from "./images";
import type { Service } from "./services";

/* ============================================================
   Generatoare JSON-LD (schema.org). Toate consumă aceleași
   single-sources-of-truth (site.ts / services.ts), deci nu pot
   diverge de conținutul randat.
   ============================================================ */

export function autoRepairSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${SITE.url}/#service-auto`,
    name: SITE.name,
    slogan: SITE.tagline,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phoneHref.replace("tel:", ""),
    email: SITE.email,
    image: `${SITE.url}${IMAGES.heroFacade.src}`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    openingHoursSpecification: SITE.hoursSchema.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    serviceType: opts.serviceType ?? opts.name,
    description: opts.description,
    url: `${SITE.url}${opts.path}`,
    areaServed: { "@type": "City", name: "București" },
    provider: { "@id": `${SITE.url}/#service-auto` },
  };
}

export function serviceSchemaFor(service: Service) {
  return serviceSchema({
    name: service.title,
    description: service.metaDescription,
    path: `/servicii/${service.slug}`,
  });
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
