/* ============================================================
   VP SERVICE AUTO — date de contact & identitate
   Single source of truth. Placeholder-ele de client sunt
   marcate TODO(client) — grep "TODO(client)" înainte de live.
   ============================================================ */

export const SITE = {
  name: "VP Service Auto",
  legalName: "VP Service Auto SRL", // TODO(client): denumirea exactă din ONRC
  cui: "RO00000000", // TODO(client): CUI real
  tagline: "Ne pasă de mașina ta!",
  url: "https://vpserviceauto.ro",
  description:
    "Centru de constatare daune RCA/CASCO și service auto complet în București: tinichigerie, vopsitorie, mecanică, mașină la schimb.",

  phoneDisplay: "0799 706 706",
  phoneHref: "tel:+40799706706",
  whatsappHref: "https://wa.me/40799706706",
  email: "contact@vpserviceauto.ro", // TODO(client): adresa reală

  address: {
    street: "Splaiul Unirii nr. 969",
    city: "București",
    region: "București",
    postalCode: "030140", // verificat pe fișa Google Business Profile
    country: "RO",
  },
  /** Pinul real din fișa Google (CID 3512668700996052883), nu geocodare de text. */
  geo: {
    lat: 44.3955235,
    lng: 26.2009306,
  },

  /* Linkuri hartă generate din pinul real. `place` = fișa canonică (CID),
     `directions`/`waze` = navigare, `embed` = iframe fără cheie API. */
  maps: {
    place: "https://maps.google.com/?cid=3512668700996052883",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=44.3955235%2C26.2009306&travelmode=driving",
    waze: "https://waze.com/ul?ll=44.3955235%2C26.2009306&navigate=yes",
    embed:
      "https://maps.google.com/maps?q=44.3955235,26.2009306&z=16&hl=ro&output=embed",
    /** Link-ul de share trimis de client → sameAs în JSON-LD. */
    share: "https://share.google/mb9iYNs0aZuuMoqIY",
  },

  hours: [
    { days: "Luni – Vineri", interval: "08:00 – 17:00" },
    { days: "Sâmbătă – Duminică", interval: "Închis" },
  ],
  /** schema.org openingHoursSpecification — zilele închise se omit (convenție schema.org) */
  hoursSchema: [
    { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:00" },
  ],

  /** Asiguratori parteneri — trust signal principal */
  partners: [
    "Allianz Țiriac",
    "Asirom",
    "Groupama",
    "Omniasig",
    "Generali",
    "Grawe",
  ],

  values: [
    {
      title: "Profesionalism",
      text: "Tehnicieni cu experiență și echipamente moderne — fiecare lucrare este executată corect din prima.",
      icon: "shield" as const,
    },
    {
      title: "Rapiditate",
      text: "Constatare pe loc, dosar deschis în aceeași zi și termene de reparație respectate.",
      icon: "zap" as const,
    },
    {
      title: "Calitate",
      text: "Piese de calitate, vopsitorie în cabină profesională și garanție pentru lucrările executate.",
      icon: "badge-check" as const,
    },
    {
      title: "Încredere",
      text: "Estimări transparente, comunicare constantă și sute de clienți care revin.",
      icon: "handshake" as const,
    },
  ],
} as const;

export const NAV_LINKS = [
  { href: "/constatare-daune", label: "Constatare daune" },
  { href: "/servicii", label: "Servicii" },
  { href: "/despre", label: "Despre noi" },
  { href: "/contact", label: "Contact" },
] as const;

export const TRUST_CHIPS = [
  "Dosar de daună complet, fără drumuri",
  "Mașină la schimb pe durata reparației",
  "Lucrăm cu toți asiguratorii",
] as const;

export const STATS = [
  { value: 15, suffix: "+", label: "ani de experiență" },
  { value: 4500, suffix: "+", label: "mașini reparate" },
  { value: 6, suffix: "", label: "asiguratori parteneri" },
  { value: 100, suffix: "%", label: "dosare gestionate complet" },
] as const;
