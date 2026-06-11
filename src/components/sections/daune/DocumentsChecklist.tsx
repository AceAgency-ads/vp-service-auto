import { Icon } from "@/components/ui/Icon";

const RCA_DOCS = [
  "Constatare amiabilă completată și semnată de ambii șoferi (sau proces-verbal de la poliție)",
  "Copia poliței RCA a șoferului vinovat (dacă o ai)",
  "Talonul mașinii (certificatul de înmatriculare)",
  "Cartea de identitate a proprietarului / utilizatorului",
  "Permisul de conducere al șoferului din momentul accidentului",
];

const CASCO_DOCS = [
  "Polița CASCO și dovada plății ratelor la zi",
  "Talonul mașinii (certificatul de înmatriculare)",
  "Cartea de identitate a proprietarului / utilizatorului",
  "Permisul de conducere al șoferului din momentul accidentului",
  "Documentul de constatare a evenimentului (amiabilă, proces-verbal sau autorizație de reparație, după caz)",
];

export function DocumentsChecklist() {
  return (
    <section className="border-y border-coal-800 bg-coal-900 py-20 md:py-28">
      <div className="wrap">
        <p className="eyebrow" data-reveal>
          Checklist acte
        </p>
        <h2 className="mt-4 max-w-2xl" data-reveal data-reveal-delay="80">
          Ce aduci cu tine la constatare
        </h2>
        <p className="mt-4 max-w-2xl text-steel-300" data-reveal data-reveal-delay="160">
          Nu-ți face griji dacă lipsește ceva — sună-ne și găsim soluția
          împreună, de cele mai multe ori se poate completa ulterior.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2" data-reveal-group>
          {[
            { tag: "Dosar RCA", docs: RCA_DOCS },
            { tag: "Dosar CASCO", docs: CASCO_DOCS },
          ].map((col) => (
            <div
              key={col.tag}
              data-reveal-child
              className="red-edge rounded-2xl border border-coal-700 bg-coal-850 p-8"
            >
              <h3 className="flex items-center gap-2.5">
                <Icon name="clipboard" size={20} className="text-red-bright" />
                {col.tag}
              </h3>
              <ul className="mt-6 flex flex-col gap-3.5">
                {col.docs.map((doc) => (
                  <li key={doc} className="flex items-start gap-3">
                    <Icon
                      name="check"
                      size={17}
                      className="mt-0.5 shrink-0 text-red-bright"
                    />
                    <span className="text-sm text-steel-200">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
