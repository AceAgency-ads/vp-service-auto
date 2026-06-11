import type { ImageKey } from "./images";

/* ============================================================
   VP SERVICE AUTO — catalogul de servicii
   Single source of truth: carduri, pagini /servicii/[slug],
   sitemap, JSON-LD Service și enum-ul formularului de contact.
   ============================================================ */

export type ServiceIcon =
  | "hammer"
  | "spray"
  | "wrench"
  | "snowflake"
  | "package"
  | "car-swap";

export interface ServiceStep {
  title: string;
  text: string;
}

export interface Service {
  slug: string;
  /** Titlu pe card / în navigație */
  title: string;
  /** H1 pe pagina serviciului */
  heading: string;
  /** Sub-titlu hero */
  sub: string;
  /** Text scurt pe carduri */
  short: string;
  metaTitle: string;
  metaDescription: string;
  imageKey: ImageKey;
  icon: ServiceIcon;
  /** Secțiunea „Ce include” */
  includes: ServiceStep[];
  /** Mini-proces în 3–4 pași */
  process: ServiceStep[];
  related: string[];
}

export const SERVICES: Service[] = [
  {
    slug: "tinichigerie",
    title: "Tinichigerie auto",
    heading: "Tinichigerie auto profesională",
    sub: "Readucem caroseria la forma inițială — de la lovituri minore la avarii majore, cu redresare pe stand și control dimensional.",
    short:
      "Îndreptare caroserie, înlocuire elemente avariate și refacerea geometriei după accident.",
    metaTitle: "Tinichigerie Auto București | VP Service Auto",
    metaDescription:
      "Tinichigerie auto în București: redresare caroserie pe stand, înlocuire elemente, sudură în puncte și pregătire pentru vopsitorie. Lucrăm cu toate asigurările.",
    imageKey: "panelBeating",
    icon: "hammer",
    includes: [
      {
        title: "Redresare caroserie pe stand",
        text: "Tragere și îndreptare multipunct pentru refacerea geometriei originale a caroseriei.",
      },
      {
        title: "Înlocuire elemente avariate",
        text: "Aripi, uși, capote, praguri și panouri — înlocuite cu piese noi sau recondiționate, la alegerea ta.",
      },
      {
        title: "Sudură în puncte și MIG/MAG",
        text: "Îmbinări executate la standard de fabrică, fără compromisuri la siguranța structurală.",
      },
      {
        title: "Îndreptare lovituri minore",
        text: "Reparăm lovituri de parcare și îndoituri locale, păstrând cât mai mult din vopseaua originală.",
      },
      {
        title: "Pregătire pentru vopsitorie",
        text: "Suprafețe șlefuite, chituite și grunduite corect — baza unei vopsiri fără defecte.",
      },
    ],
    process: [
      {
        title: "Evaluare și fotografiere",
        text: "Inspectăm avaria, documentăm foto și stabilim soluția: îndreptare sau înlocuire.",
      },
      {
        title: "Demontare și reparație",
        text: "Demontăm elementele afectate și executăm redresarea sau înlocuirea acestora.",
      },
      {
        title: "Control și măsurători",
        text: "Verificăm geometria și aliniamentul înainte de predarea către vopsitorie.",
      },
    ],
    related: ["vopsitorie", "masina-la-schimb", "piese-auto"],
  },
  {
    slug: "vopsitorie",
    title: "Vopsitorie auto",
    heading: "Vopsitorie auto în cabină profesională",
    sub: "Colorimetrie computerizată și vopsire în cabină presurizată — nuanța perfectă, fără diferențe vizibile.",
    short:
      "Vopsire în cabină, colorimetrie computerizată și finisaj de fabrică pentru orice element.",
    metaTitle: "Vopsitorie Auto București | VP Service Auto",
    metaDescription:
      "Vopsitorie auto în București: cabină de vopsire profesională, colorimetrie computerizată, lac și polish final. Finisaj de fabrică, garanție pentru lucrare.",
    imageKey: "paintBooth",
    icon: "spray",
    includes: [
      {
        title: "Colorimetrie computerizată",
        text: "Identificăm exact nuanța mașinii tale — inclusiv vopsele perlate și metalizate.",
      },
      {
        title: "Vopsire în cabină presurizată",
        text: "Mediu controlat, fără praf și impurități, pentru un finisaj neted, uniform.",
      },
      {
        title: "Lac și protecție UV",
        text: "Straturi de lac aplicate corect, rezistente la zgârieturi fine și decolorare.",
      },
      {
        title: "Polish și finisare",
        text: "Egalizăm luciul între elementele vopsite și restul caroseriei — tranziție invizibilă.",
      },
    ],
    process: [
      {
        title: "Pregătirea suprafeței",
        text: "Șlefuire, chituire și grunduire — 80% din calitatea vopsirii se decide aici.",
      },
      {
        title: "Vopsire și uscare în cabină",
        text: "Aplicăm baza colorată și lacul în cabină, apoi uscăm controlat la temperatură.",
      },
      {
        title: "Polish și control final",
        text: "Finisăm, verificăm nuanța la lumină naturală și predăm mașina impecabilă.",
      },
    ],
    related: ["tinichigerie", "piese-auto", "masina-la-schimb"],
  },
  {
    slug: "mecanica",
    title: "Mecanică auto",
    heading: "Mecanică auto și diagnoză computerizată",
    sub: "De la revizia periodică la reparații complexe — diagnoză precisă, piese de calitate și termene respectate.",
    short:
      "Diagnoză computerizată, revizii periodice, frâne, suspensie, distribuție și ambreiaj.",
    metaTitle: "Mecanică Auto București | VP Service Auto",
    metaDescription:
      "Service mecanică auto în București: diagnoză computerizată, revizii, distribuție, frâne, suspensie, ambreiaj. Programare rapidă, prețuri corecte.",
    imageKey: "mechanicLift",
    icon: "wrench",
    includes: [
      {
        title: "Diagnoză computerizată",
        text: "Testere profesionale multi-marcă — identificăm exact problema înainte să atingem ceva.",
      },
      {
        title: "Revizii periodice",
        text: "Ulei, filtre, verificări complete — cu consemnarea lucrărilor în istoricul mașinii.",
      },
      {
        title: "Frâne și suspensie",
        text: "Plăcuțe, discuri, amortizoare, brațe și bucșe — siguranța ta nu suportă compromisuri.",
      },
      {
        title: "Distribuție și ambreiaj",
        text: "Înlocuim kituri complete, la kilometrajul recomandat de producător.",
      },
      {
        title: "Pregătire ITP",
        text: "Verificăm și remediem tot ce poate pica la inspecție, înainte să ajungi acolo.",
      },
    ],
    process: [
      {
        title: "Programare și diagnoză",
        text: "Stabilim vizita telefonic, apoi diagnosticăm și îți comunicăm costul exact.",
      },
      {
        title: "Aprobarea lucrării",
        text: "Nu înlocuim nimic fără acordul tău — primești estimare clară înainte.",
      },
      {
        title: "Reparație și verificare",
        text: "Executăm lucrarea, testăm mașina și o predăm cu lucrările documentate.",
      },
    ],
    related: ["incarcare-freon", "piese-auto", "tinichigerie"],
  },
  {
    slug: "incarcare-freon",
    title: "Încărcare freon AC",
    heading: "Încărcare freon și service climatizare",
    sub: "Aer condiționat care răcește ca în prima zi — verificare etanșeitate, vidare și încărcare cu agent corect.",
    short:
      "Verificare instalație AC, vidare, încărcare freon R134a / R1234yf și igienizare.",
    metaTitle: "Încărcare Freon Auto București | VP Service Auto",
    metaDescription:
      "Încărcare freon auto în București: verificare etanșeitate, vidare, încărcare R134a și R1234yf, igienizare instalație AC. Rapid, cu programare.",
    imageKey: "acService",
    icon: "snowflake",
    includes: [
      {
        title: "Verificare etanșeitate",
        text: "Detectăm scurgerile cu UV și azot înainte de încărcare — altfel freonul se pierde din nou.",
      },
      {
        title: "Vidare și încărcare exactă",
        text: "Stație automată care încarcă exact cantitatea prescrisă de producător, R134a sau R1234yf.",
      },
      {
        title: "Verificare compresor și presiuni",
        text: "Măsurăm presiunile pe traseu și temperatura la gurile de ventilație.",
      },
      {
        title: "Igienizare instalație",
        text: "Eliminăm bacteriile și mirosurile neplăcute din sistemul de ventilație.",
      },
    ],
    process: [
      {
        title: "Test inițial",
        text: "Măsurăm performanța actuală a instalației și identificăm eventuale scurgeri.",
      },
      {
        title: "Vidare și încărcare",
        text: "Recuperăm agentul vechi, vidăm instalația și încărcăm cantitatea exactă.",
      },
      {
        title: "Verificare finală",
        text: "Confirmăm temperatura de răcire și etanșeitatea — pleci cu AC rece.",
      },
    ],
    related: ["mecanica", "piese-auto", "masina-la-schimb"],
  },
  {
    slug: "piese-auto",
    title: "Piese auto",
    heading: "Piese auto cu montaj în service",
    sub: "Piese OE, OEM sau aftermarket de calitate — comandate de noi, montate de noi, garantate de noi.",
    short:
      "Furnizăm și montăm piese originale sau aftermarket, cu garanție și consultanță inclusă.",
    metaTitle: "Piese Auto cu Montaj București | VP Service Auto",
    metaDescription:
      "Piese auto în București cu montaj direct în service: piese OE, OEM și aftermarket de calitate, livrare rapidă, garanție. Consultanță gratuită la alegere.",
    imageKey: "partsOem",
    icon: "package",
    includes: [
      {
        title: "Consultanță la alegerea pieselor",
        text: "Îți explicăm diferența dintre OE, OEM și aftermarket și ce merită pentru mașina ta.",
      },
      {
        title: "Comandă și livrare rapidă",
        text: "Rețea de furnizori verificați — majoritatea pieselor ajung în 24–48 de ore.",
      },
      {
        title: "Montaj direct în service",
        text: "Nu pierzi timp: piesa vine la noi și o montăm imediat ce ajunge.",
      },
      {
        title: "Garanție pentru piesă și manoperă",
        text: "Un singur loc răspunde pentru tot — fără pasat responsabilitatea între magazin și service.",
      },
    ],
    process: [
      {
        title: "Identificare după VIN",
        text: "Identificăm piesa exactă după seria de șasiu — fără surprize la montaj.",
      },
      {
        title: "Ofertă transparentă",
        text: "Primești opțiuni și prețuri pentru fiecare variantă de calitate disponibilă.",
      },
      {
        title: "Livrare și montaj",
        text: "Comandăm, recepționăm și montăm piesa, apoi îți predăm mașina testată.",
      },
    ],
    related: ["mecanica", "tinichigerie", "vopsitorie"],
  },
  {
    slug: "masina-la-schimb",
    title: "Mașină la schimb",
    heading: "Mașină la schimb și transport pe platformă",
    sub: "Mobilitatea ta nu se oprește când mașina intră în service — primești mașină la schimb, iar dacă a ta nu mai rulează, venim cu platforma.",
    short:
      "Rămâi mobil pe durata reparației: mașină la schimb și transport pe platformă la nevoie.",
    metaTitle: "Mașină la Schimb & Platformă București | VP Service Auto",
    metaDescription:
      "Mașină la schimb pe durata reparației și transport auto pe platformă în București. Mobilitate completă cât timp mașina ta este în service.",
    imageKey: "keysHandover",
    icon: "car-swap",
    includes: [
      {
        title: "Mașină la schimb pe durata reparației",
        text: "Predai cheile mașinii tale, pleci cu alta — în baza dosarului de daună sau a lucrării.",
      },
      {
        title: "Transport pe platformă",
        text: "Mașina nu mai rulează după accident? Venim noi și o aducem în service în siguranță.",
      },
      {
        title: "Predare-primire cu proces verbal",
        text: "Stare, kilometraj și dotări consemnate clar la ridicare și la returnare.",
      },
      {
        title: "Costuri decontate din dosar",
        text: "În dosarele RCA, mașina la schimb poate fi decontată de asigurator — te ajutăm cu actele.",
      },
    ],
    process: [
      {
        title: "Soliciți la programare",
        text: "Spune-ne la telefon că ai nevoie de mașină la schimb sau de platformă.",
      },
      {
        title: "Predare rapidă",
        text: "Semnăm procesul verbal și pleci cu mașina la schimb în câteva minute.",
      },
      {
        title: "Returnare la finalizare",
        text: "Îți recuperezi mașina reparată și predai mașina la schimb — simplu.",
      },
    ],
    related: ["tinichigerie", "vopsitorie", "mecanica"],
  },
];

/** Slugs valide pentru rutele /servicii/[slug] */
export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

/** Opțiunile câmpului „Serviciu” din formularul de contact */
export const FORM_SERVICE_OPTIONS = [
  { value: "constatare-daune", label: "Constatare daune RCA/CASCO" },
  ...SERVICES.map((s) => ({ value: s.slug, label: s.title })),
  { value: "altele", label: "Altele / nu sunt sigur" },
] as const;
