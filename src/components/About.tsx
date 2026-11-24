import { site } from "@/config/site";
import { Reveal, RevealLines } from "./ui/Reveal";
import { SectionTag } from "./ui/SectionTag";

export function About() {
  const { city, region, country } = site.location;
  return (
    <section id="over-ons" aria-labelledby="about-title" className="relative overflow-hidden border-t border-line bg-ink py-24 sm:py-32 lg:py-44">
      <div className="wrap">
        <SectionTag index="05">Over DVM Performance</SectionTag>

        <h2 id="about-title" className="display mt-8 text-[clamp(2.9rem,8.6vw,9rem)]">
          <RevealLines
            lines={[
              <span key="1">Geen standaard <span className="text-signal">auto.</span></span>,
              <span key="2" className="outline-text">Geen standaard</span>,
              <span key="3" className="outline-text">werkplaats.</span>,
            ]}
          />
        </h2>

        <div className="grid-12 mt-14 gap-y-12 lg:mt-20">
          {/* locatiekaart (typografisch) */}
          <Reveal className="col-span-12 sm:col-span-6 lg:col-span-4">
            <div className="relative border border-line p-6 sm:p-8">
              <span aria-hidden className="absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-signal" />
              <p className="tech">Vestiging</p>
              <p className="display mt-4 text-5xl">{city}</p>
              <p className="mt-1 text-mute">{region}, {country}</p>
              <div aria-hidden className="relative mt-8 h-28 overflow-hidden border-t border-line">
                {/* abstracte rivierlijnen — Gameren ligt tussen Waal en Maas */}
                <svg viewBox="0 0 300 110" className="absolute inset-0 h-full w-full text-paper/25" fill="none" stroke="currentColor" preserveAspectRatio="none">
                  <path d="M0 30 C 60 10, 120 50, 180 28 S 270 16, 300 26" strokeWidth="1" />
                  <path d="M0 88 C 70 70, 140 104, 210 84 S 280 76, 300 82" strokeWidth="1" />
                </svg>
                <span className="absolute left-[46%] top-[52%] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 bg-signal" />
                <span className="tech absolute left-[46%] top-[52%] ml-3 -translate-y-1/2 text-[10px] text-paper">{city}</span>
                <span className="tech absolute right-0 top-1 text-[9px]">Waal</span>
                <span className="tech absolute bottom-1 right-0 text-[9px]">Maas</span>
              </div>
            </div>
          </Reveal>

          <div className="col-span-12 space-y-6 text-[17px] leading-[1.75] text-mute sm:col-span-6 lg:col-span-5 lg:col-start-7">
            <Reveal>
              <p className="text-lg text-paper sm:text-xl sm:leading-relaxed">
                Bij DVM Performance draait het om Honda&apos;s en de mensen die ermee bezig zijn.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p>
                Of je nu net begint aan je eerste Civic-project of al jaren aan je auto sleutelt, we kijken graag samen naar de mogelijkheden.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p>
                Van kleine aanpassingen tot grotere projecten: jouw Honda staat centraal. Je vindt ons in {city}, in de Bommelerwaard ({region}).
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
