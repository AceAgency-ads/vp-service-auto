import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { Icon } from "@/components/ui/Icon";

const CARDS = [
  {
    tag: "RCA",
    title: "Dosar RCA — nu ai fost tu vinovat",
    points: [
      "Plătește asiguratorul șoferului vinovat — tu nu scoți bani din buzunar",
      "Ai nevoie de constatare amiabilă sau proces-verbal de la poliție",
      "Mașina la schimb și transportul pot fi decontate din dosar",
      "Funcționează indiferent la ce asigurator are RCA vinovatul",
    ],
  },
  {
    tag: "CASCO",
    title: "Dosar CASCO — polița ta, orice s-ar fi întâmplat",
    points: [
      "Se aplică indiferent de vinovat: accident, grindină, vandalism, parcare",
      "Condițiile (franșiză, termen de avizare) sunt cele din contractul tău",
      "Avizarea rapidă e esențială — de regulă 24–48h conform poliței",
      "Reparația se face cu acordul asiguratorului tău, la noi în atelier",
    ],
  },
];

export function RcaVsCasco() {
  return (
    <section className="border-y border-coal-800 bg-coal-900 py-20 md:py-28">
      <div className="wrap">
        <p className="eyebrow" data-reveal>
          RCA sau CASCO?
        </p>
        <h2 className="mt-4 max-w-2xl" data-reveal data-reveal-delay="80">
          Două tipuri de dosare, același rezultat: mașina reparată
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2" data-reveal-group>
          {CARDS.map((card) => (
            <div key={card.tag} data-reveal-child>
              <SpotlightCard className="h-full p-8">
                <span className="slash-strip inline-block !skew-y-0 rounded-md px-3.5 py-1.5 text-sm">
                  <span className="!skew-y-0">{card.tag}</span>
                </span>
                <h3 className="mt-5">{card.title}</h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {card.points.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <Icon
                        name="check"
                        size={17}
                        className="mt-1 shrink-0 text-red-bright"
                      />
                      <span className="text-sm text-steel-200">{p}</span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-steel-400" data-reveal>
          Nu ești sigur ce tip de dosar ți se potrivește? Sună-ne — îți spunem
          în 2 minute, gratuit.
        </p>
      </div>
    </section>
  );
}
