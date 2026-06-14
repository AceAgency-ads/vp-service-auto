import { STATS } from "@/lib/site";
import { VIDEOS } from "@/lib/videos";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";

/* Banda diagonală roșie a fațadei + counterele anime.js. */

export function StatsBand() {
  return (
    <section className="overflow-hidden py-10">
      <div className="slash-strip -mx-2 py-3.5">
        <p className="text-center text-[13px] sm:text-[15px]">
          Rapid <span aria-hidden>\</span> Calitate garantată{" "}
          <span aria-hidden>\</span> Prețuri corecte
        </p>
      </div>

      {/* accent inline — clip mic încadrat (cabină de vopsitorie) */}
      <div className="wrap pt-14" data-reveal>
        <div className="led-frame relative mx-auto aspect-video w-full max-w-3xl overflow-hidden rounded-xl">
          <BackgroundVideo
            src={VIDEOS.paintLoop.src}
            poster={VIDEOS.paintLoop.poster}
            alt={VIDEOS.paintLoop.alt}
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      </div>

      <div className="wrap py-14 md:py-16">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4" data-reveal-group>
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center" data-reveal-child>
              <dd className="font-heading text-[clamp(38px,5vw,58px)] leading-none font-extrabold text-paper">
                <span data-count-to={stat.value} data-count-suffix={stat.suffix}>
                  0{stat.suffix}
                </span>
              </dd>
              <dt className="mt-2 text-sm font-medium text-steel-400">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>

      <hr className="led-line" />
    </section>
  );
}
