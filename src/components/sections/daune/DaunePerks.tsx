import { Icon, type IconName } from "@/components/ui/Icon";

const PERKS: { title: string; text: string; icon: IconName }[] = [
  {
    title: "Mașină la schimb",
    text: "Rămâi mobil pe toată durata reparației — în dosarele RCA poate fi decontată de asigurator.",
    icon: "car-swap",
  },
  {
    title: "Platformă la nevoie",
    text: "Mașina nu rulează? Venim noi după ea, oriunde în București și împrejurimi.",
    icon: "truck",
  },
  {
    title: "Dosarul, treaba noastră",
    text: "Acte, fotografii, deviz, corespondență cu asiguratorul — gestionăm tot, de la A la Z.",
    icon: "file-text",
  },
  {
    title: "Garanție pentru lucrări",
    text: "Tinichigeria și vopsitoria executate la noi vin cu garanție scrisă.",
    icon: "badge-check",
  },
];

export function DaunePerks() {
  return (
    <section className="wrap py-20 md:py-24">
      <p className="eyebrow" data-reveal>
        Inclus, fără costuri ascunse
      </p>
      <h2 className="mt-4 max-w-xl" data-reveal data-reveal-delay="80">
        Tot ce-ți ia o grijă de pe cap
      </h2>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group>
        {PERKS.map((perk) => (
          <div
            key={perk.title}
            data-reveal-child
            className="red-edge rounded-2xl border border-coal-700 bg-coal-850 p-6"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-coal-700 bg-coal-800 text-red-bright">
              <Icon name={perk.icon} size={20} />
            </span>
            <h3 className="mt-4 !text-base">{perk.title}</h3>
            <p className="mt-2 text-sm text-steel-300">{perk.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
