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

  phoneDisplay: "07XX XXX XXX", // TODO(client): numărul real
  phoneHref: "tel:+40700000000", // TODO(client): numărul real în format E.164
  whatsappHref: "https://wa.me/40700000000", // TODO(client): numărul real
  email: "contact@vpserviceauto.ro", // TODO(client): adresa reală

  address: {
    street: "Splaiul Unirii nr. 969",
    city: "București",
    region: "București",
    postalCode: "040000", // TODO(client): codul poștal real
    country: "RO",
  },
  geo: {
    lat: 44.3936, // TODO(client): pin exact Google Maps
    lng: 26.1893,
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Splaiul+Unirii+969+Bucuresti",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Splaiul+Unirii+969+Bucuresti&output=embed",

  hours: [
    { days: "Luni – Vineri", interval: "08:00 – 18:00" }, // TODO(client): program real
    { days: "Sâmbătă", interval: "09:00 – 14:00" },
    { days: "Duminică", interval: "Închis" },
  ],
  /** schema.org openingHoursSpecification */
  hoursSchema: [
    { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
    { dayOfWeek: ["Saturday"], opens: "09:00", closes: "14:00" },
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
