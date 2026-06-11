import { Icon, type IconName } from "@/components/ui/Icon";

const STEPS: { title: string; text: string; icon: IconName }[] = [
  {
    title: "Ne suni sau vii direct",
    text: "Imediat după accident, un telefon e tot ce ai de făcut. Îți spunem pe loc ce acte aduci și când venim cu platforma, dacă mașina nu rulează.",
    icon: "phone",
  },
  {
    title: "Avizăm dauna împreună",
    text: "Deschidem dosarul la asiguratorul corect (RCA al vinovatului sau CASCO al tău) în termenul cerut — fără drumuri la sediile asiguratorilor.",
    icon: "calendar-check",
  },
  {
    title: "Constatarea și fotografierea",
    text: "Inspectăm mașina în centrul nostru, documentăm foto fiecare avarie — inclusiv pe cele ascunse — și întocmim devizul estimativ.",
    icon: "camera",
  },
  {
    title: "Dosarul complet la asigurator",
    text: "Depunem actele, răspundem solicitărilor și urmărim aprobarea. Tu primești doar vești, nu sarcini.",
    icon: "file-text",
  },
  {
    title: "Reparația și predarea",
    text: "Tinichigerie, vopsitorie, mecanică — totul în atelierul propriu, cu garanție. Îți predăm mașina curată, ca înainte de accident.",
    icon: "wrench",
  },
];

export function DauneProcess() {
  return (
    <section className="wrap py-20 md:py-28">
      <p className="eyebrow" data-reveal>
        Procesul, pas cu pas
      </p>
      <h2 className="mt-4 max-w-2xl" data-reveal data-reveal-delay="80">
        De la telefon la cheile înapoi în mâna ta
      </h2>

      <div className="relative mt-14 max-w-3xl">
        {/* conectorul LED vertical care se „desenează" la scroll */}
        <div
          className="absolute top-2 bottom-2 left-[23px] w-0.5"
          style={{
            background:
              "linear-gradient(180deg, var(--color-red) 0%, var(--color-red-bright) 50%, var(--color-red) 100%)",
            boxShadow: "0 0 12px rgba(227,6,19,0.55)",
          }}
          data-line-draw="y"
          aria-hidden
        />
        <ol className="flex flex-col gap-10">
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative flex gap-6" data-reveal>
              <span className="led-frame relative z-10 flex h-12 w-12 shrink-0 items-center justify-center !rounded-full bg-coal-900 font-heading text-lg font-extrabold text-red-bright">
                {i + 1}
              </span>
              <div className="pt-1.5">
                <h3 className="flex items-center gap-2.5 !text-lg">
                  <Icon name={step.icon} size={18} className="text-red-bright" />
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-steel-300">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
