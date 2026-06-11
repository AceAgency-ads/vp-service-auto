/* FAQ constatare daune — același array randează accordionul
   (<details> native) ȘI generează FAQPage JSON-LD: nu pot diverge. */

export interface FaqItem {
  q: string;
  a: string;
}

export const DAUNE_FAQ: FaqItem[] = [
  {
    q: "Ce trebuie să fac imediat după accident?",
    a: "Dacă sunt victime sau vehiculele nu mai pot rula, suni la 112. Dacă e doar daună materială și ambii șoferi sunt de acord asupra circumstanțelor, completați formularul de constatare amiabilă. Apoi ne suni — te ghidăm pas cu pas și programăm constatarea.",
  },
  {
    q: "În cât timp trebuie avizată dauna?",
    a: "Termenul diferă în funcție de asigurator și de tipul poliței: la CASCO este prevăzut în contract (de regulă 24–48 de ore), iar la RCA este recomandat să avizezi cât mai repede. Sună-ne imediat după accident și ne asigurăm că nu pierzi niciun termen.",
  },
  {
    q: "Care este diferența dintre dosarul RCA și cel CASCO?",
    a: "La RCA, despăgubirea o plătește asiguratorul șoferului vinovat — repari fără să plătești tu. La CASCO, folosești propria poliță, indiferent cine a fost vinovat, iar condițiile (franșiză, termene) sunt cele din contractul tău. Te ajutăm cu ambele tipuri de dosare.",
  },
  {
    q: "Ce acte îmi trebuie pentru deschiderea dosarului de daună?",
    a: "În general: constatarea amiabilă sau procesul-verbal de la poliție, talonul și cartea de identitate, permisul de conducere și polița de asigurare. Lista exactă diferă între RCA și CASCO — o găsești pe această pagină, iar la telefon îți confirmăm exact ce ai nevoie.",
  },
  {
    q: "Primesc mașină la schimb pe durata reparației?",
    a: "Da. Oferim mașină la schimb pe durata reparației, iar în dosarele RCA costul poate fi decontat de asiguratorul vinovatului. Spune-ne la programare că ai nevoie și o pregătim.",
  },
  {
    q: "Cât durează reparația după constatare?",
    a: "Depinde de avarii și de aprobarea asiguratorului: lucrările simple durează câteva zile, cele complexe 1–2 săptămâni după primirea acceptului și a pieselor. Primești termen estimat la constatare și te ținem la curent pe tot parcursul.",
  },
  {
    q: "Mașina nu mai poate rula. Cum ajunge la voi?",
    a: "Trimitem platforma după ea — suni, ne spui unde e mașina, iar noi o transportăm în siguranță la centrul nostru din Splaiul Unirii 969. În dosarele RCA, transportul poate fi inclus în despăgubire.",
  },
];
