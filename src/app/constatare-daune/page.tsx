import type { Metadata } from "next";
import { DauneHero } from "@/components/sections/daune/DauneHero";
import { WhatIsConstatare } from "@/components/sections/daune/WhatIsConstatare";
import { RcaVsCasco } from "@/components/sections/daune/RcaVsCasco";
import { DauneProcess } from "@/components/sections/daune/DauneProcess";
import { DocumentsChecklist } from "@/components/sections/daune/DocumentsChecklist";
import { DaunePerks } from "@/components/sections/daune/DaunePerks";
import { PartnersMarquee } from "@/components/sections/shared/PartnersMarquee";
import { DauneFaq } from "@/components/sections/daune/DauneFaq";
import { CtaBand } from "@/components/sections/shared/CtaBand";
import { JsonLd } from "@/components/jsonld/JsonLd";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/jsonld";
import { DAUNE_FAQ } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Constatare Daune RCA și CASCO — Dosar Complet",
  description:
    "Centru de constatare daune în București: avizare în termen, fotografiere, dosar complet la asigurator, mașină la schimb și reparație în atelier propriu.",
  alternates: { canonical: "/constatare-daune" },
};

export default function ConstatareDaunePage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Constatare daune RCA/CASCO",
          serviceType: "Constatare daune auto",
          description:
            "Avizare daună, constatare, dosar complet la asigurator și reparație — totul într-un singur centru, cu mașină la schimb.",
          path: "/constatare-daune",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Acasă", path: "/" },
          { name: "Constatare daune", path: "/constatare-daune" },
        ])}
      />
      <JsonLd data={faqSchema(DAUNE_FAQ)} />

      <DauneHero />
      <WhatIsConstatare />
      <RcaVsCasco />
      <DauneProcess />
      <DocumentsChecklist />
      <DaunePerks />
      <PartnersMarquee title="Dosare acceptate de toți asiguratorii" />
      <DauneFaq />
      <CtaBand
        title="Nu lăsa dosarul pe mâine."
        sub="Cu cât avizezi mai repede, cu atât primești mai repede mașina înapoi. Sună acum și rezolvăm împreună."
      />
    </>
  );
}
