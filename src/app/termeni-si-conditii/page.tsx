import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/sections/shared/LegalLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Termeni și Condiții",
  description:
    "Termenii și condițiile de utilizare a site-ului VP Service Auto și informații despre estimări, programări și soluționarea litigiilor.",
  alternates: { canonical: "/termeni-si-conditii" },
  robots: { index: true, follow: true },
};

export default function TermeniSiConditiiPage() {
  return (
    <LegalLayout
      eyebrow="Informații legale"
      title="Termeni și condiții"
      updated="12 iunie 2026"
    >
      <h2>1. Despre acest site</h2>
      <p>
        Site-ul vpserviceauto.ro este operat de{" "}
        <strong>{SITE.legalName}</strong>, cu sediul în {SITE.address.street},{" "}
        {SITE.address.city}, CUI {SITE.cui}. Folosind Site-ul, ești de acord
        cu acești termeni; dacă nu ești de acord, te rugăm să nu îl folosești.
      </p>

      <h2>2. Estimări și programări</h2>
      <ul>
        <li>
          Prețurile și termenele comunicate telefonic, pe WhatsApp sau prin
          formular sunt <strong>estimative</strong>. Valorile finale se
          stabilesc doar după constatarea fizică a mașinii în service și, în
          cazul dosarelor de daună, după acceptul asiguratorului.
        </li>
        <li>
          Trimiterea formularului de programare nu creează o rezervare fermă —
          programarea se confirmă telefonic.
        </li>
        <li>
          Informațiile despre procesele RCA/CASCO publicate pe Site au rol
          informativ general și nu constituie consultanță juridică; condițiile
          exacte sunt cele din polița ta și din normele ASF în vigoare.
        </li>
      </ul>

      <h2>3. Proprietate intelectuală</h2>
      <p>
        Conținutul Site-ului (texte, grafică, logo, fotografii) aparține{" "}
        {SITE.legalName} sau este folosit cu licență. Reproducerea fără acord
        scris este interzisă.
      </p>

      <h2>4. Limitarea răspunderii</h2>
      <p>
        Depunem eforturi ca informațiile de pe Site să fie corecte și
        actuale, dar nu garantăm lipsa erorilor. {SITE.legalName} nu răspunde
        pentru prejudicii rezultate din folosirea Site-ului sau din
        imposibilitatea folosirii lui. Răspunderea pentru lucrările efectuate
        în service este reglementată de contractul/devizul semnat la predarea
        mașinii și de garanțiile legale aplicabile.
      </p>

      <h2>5. Date personale</h2>
      <p>
        Prelucrarea datelor personale este descrisă în{" "}
        <Link href="/politica-de-confidentialitate">
          Politica de confidențialitate
        </Link>
        .
      </p>

      <h2>6. Soluționarea litigiilor</h2>
      <p>
        Încercăm întotdeauna să rezolvăm amiabil orice nemulțumire — scrie-ne
        la <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Ai, de
        asemenea, dreptul să apelezi la:
      </p>
      <ul>
        <li>
          <strong>ANPC — Soluționarea Alternativă a Litigiilor (SAL):</strong>{" "}
          <a
            href="https://anpc.ro/ce-este-sal/"
            target="_blank"
            rel="noopener noreferrer"
          >
            anpc.ro/ce-este-sal
          </a>
        </li>
        <li>
          <strong>
            Platforma europeană de Soluționare Online a Litigiilor (SOL):
          </strong>{" "}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
          >
            ec.europa.eu/consumers/odr
          </a>
        </li>
      </ul>
      <p>
        Acești termeni sunt guvernați de legea română; litigiile nesoluționate
        amiabil sunt de competența instanțelor din București.
      </p>

      <h2>7. Modificări</h2>
      <p>
        Putem actualiza acești termeni; versiunea curentă este publicată mereu
        pe această pagină, cu data ultimei actualizări.
      </p>
    </LegalLayout>
  );
}
