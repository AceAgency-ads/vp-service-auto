import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

const STEPS = [
  {
    title: "Avizare",
    text: "Ne suni sau vii direct — avizăm dauna la asigurator împreună.",
    icon: "phone" as const,
  },
  {
    title: "Constatare",
    text: "Inspectăm și fotografiem avariile, pe loc, în centrul nostru.",
    icon: "camera" as const,
  },
  {
    title: "Dosar",
    text: "Întocmim dosarul complet și îl depunem la asigurator pentru tine.",
    icon: "file-text" as const,
  },
  {
    title: "Reparație",
    text: "Reparăm în atelierul propriu și îți predăm mașina ca înainte.",
    icon: "wrench" as const,
  },
];

export function ProcessTeaser() {
  return (
    <section className="wrap py-20 md:py-28">
      <p className="eyebrow" data-reveal>
        Cum funcționează
      </p>
      <h2 className="mt-4 max-w-2xl" data-reveal data-reveal-delay="80">
        4 pași — și dauna devine problema noastră, nu a ta
      </h2>

      <div className="relative mt-14">
        {/* linia LED care se „desenează" pe desktop */}
        <div
          className="led-line absolute top-6 right-[12%] left-[12%] hidden lg:block"
          data-line-draw
          aria-hidden
        />
        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group>
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative" data-reveal-child>
              <div className="flex items-center gap-4 lg:flex-col lg:text-center">
                <span className="led-frame relative z-10 flex h-12 w-12 shrink-0 items-center justify-center !rounded-full font-heading text-lg font-extrabold text-red-bright">
                  {i + 1}
                </span>
                <div className="lg:mt-5">
                  <h3 className="flex items-center gap-2 !text-lg lg:justify-center">
                    <Icon name={step.icon} size={17} className="text-red-bright" />
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-steel-300">{step.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-12 text-center" data-reveal>
        <Link href="/constatare-daune" className="btn btn-primary">
          Procesul complet, pas cu pas
          <Icon name="arrow-right" size={17} />
        </Link>
      </div>
    </section>
  );
}
