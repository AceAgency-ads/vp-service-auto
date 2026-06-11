import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/sections/shared/LegalLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politica de Confidențialitate",
  description:
    "Cum colectează, folosește și protejează VP Service Auto datele tale personale, conform GDPR.",
  alternates: { canonical: "/politica-de-confidentialitate" },
  robots: { index: true, follow: true },
};

export default function PoliticaConfidentialitatePage() {
  return (
    <LegalLayout
      eyebrow="Informații legale"
      title="Politica de confidențialitate"
      updated="12 iunie 2026"
    >
      <h2>1. Cine suntem</h2>
      <p>
        <strong>{SITE.legalName}</strong> („{SITE.name}”), cu sediul în{" "}
        {SITE.address.street}, {SITE.address.city}, CUI {SITE.cui}, este
        operatorul datelor cu caracter personal colectate prin acest site
        (denumit în continuare „Site-ul”). Ne poți contacta oricând la{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> sau la telefon{" "}
        {SITE.phoneDisplay}.
      </p>

      <h2>2. Ce date colectăm</h2>
      <ul>
        <li>
          <strong>Date trimise prin formularul de programare:</strong> nume,
          număr de telefon, adresă de email (opțional), marca/modelul mașinii
          (opțional), numărul de înmatriculare (opțional), serviciul dorit și
          mesajul tău.
        </li>
        <li>
          <strong>Date colectate automat (doar cu acordul tău):</strong>{" "}
          statistici anonime de trafic prin Vercel Analytics, activate exclusiv
          după ce alegi „Accept toate” în bannerul de consimțământ.
        </li>
      </ul>

      <h2>3. De ce și pe ce temei le folosim</h2>
      <ul>
        <li>
          <strong>Pentru a-ți răspunde la cerere</strong> (programare,
          estimare, dosar de daună) — temei: demersuri precontractuale la
          cererea ta (art. 6 alin. 1 lit. b GDPR).
        </li>
        <li>
          <strong>Pentru statistici de trafic</strong> — temei: consimțământul
          tău (art. 6 alin. 1 lit. a GDPR), pe care îl poți retrage oricând.
        </li>
        <li>
          <strong>Pentru apărarea drepturilor noastre</strong> — temei:
          interes legitim (art. 6 alin. 1 lit. f GDPR).
        </li>
      </ul>

      <h2>4. Cât timp păstrăm datele</h2>
      <p>
        Cererile trimise prin formular sunt păstrate maximum 12 luni de la
        ultimul contact, apoi sunt șterse. Dacă devii client, documentele
        aferente lucrărilor se păstrează conform obligațiilor legale
        (contabile și fiscale).
      </p>

      <h2>5. Cui transmitem datele</h2>
      <p>
        Nu vindem și nu închiriem datele tale. Le partajăm doar cu furnizori
        care ne ajută să operăm Site-ul, în calitate de persoane împuternicite:
      </p>
      <ul>
        <li>
          <strong>Vercel Inc.</strong> — găzduirea Site-ului și, doar cu
          acordul tău, statistici anonime de trafic;
        </li>
        <li>
          <strong>Resend</strong> — transmiterea emailurilor generate de
          formularul de contact;
        </li>
        <li>
          asiguratorii implicați în dosarul tău de daună — doar la cererea și
          cu știrea ta, în cadrul gestionării dosarului.
        </li>
      </ul>

      <h2>6. Cookie-uri și tehnologii similare</h2>
      <table>
        <thead>
          <tr>
            <th>Nume</th>
            <th>Tip</th>
            <th>Scop</th>
            <th>Durată</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>vp-consent</td>
            <td>Necesar (localStorage)</td>
            <td>Reține alegerea ta privind cookie-urile</td>
            <td>Până la ștergerea manuală</td>
          </tr>
          <tr>
            <td>Vercel Analytics</td>
            <td>Statistici (script)</td>
            <td>Trafic anonim, fără cookie-uri de urmărire</td>
            <td>Doar cu consimțământ</td>
          </tr>
        </tbody>
      </table>
      <p>
        Harta Google de pe pagina de contact se încarcă <strong>doar</strong>{" "}
        după ce apeși butonul „Încarcă harta Google” — abia atunci se
        transferă date către Google LLC, conform politicii Google.
      </p>

      <h2>7. Drepturile tale</h2>
      <p>
        Conform GDPR, ai dreptul de acces, rectificare, ștergere,
        restricționare, portabilitate, opoziție și dreptul de a-ți retrage
        consimțământul oricând. Scrie-ne la{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> și îți răspundem în
        cel mult 30 de zile. Dacă apreciezi că drepturile ți-au fost
        încălcate, te poți adresa Autorității Naționale de Supraveghere a
        Prelucrării Datelor cu Caracter Personal (
        <a
          href="https://www.dataprotection.ro"
          target="_blank"
          rel="noopener noreferrer"
        >
          dataprotection.ro
        </a>
        ).
      </p>

      <h2>8. Modificări</h2>
      <p>
        Putem actualiza această politică; versiunea curentă, cu data
        actualizării, este publicată mereu pe această pagină. Vezi și{" "}
        <Link href="/termeni-si-conditii">Termenii și condițiile</Link>.
      </p>
    </LegalLayout>
  );
}
