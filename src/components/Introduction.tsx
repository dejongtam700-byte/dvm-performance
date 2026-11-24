import { images } from "@/config/images";
import { site } from "@/config/site";
import { ImageSlot } from "./ui/ImageSlot";
import { Reveal, RevealLines } from "./ui/Reveal";
import { SectionTag } from "./ui/SectionTag";

export function Introduction() {
  return (
    <section id="intro" aria-labelledby="intro-title" className="relative bg-ink py-24 sm:py-32 lg:py-44">
      <div className="wrap grid-12 gap-y-10">
        <SectionTag index="01" className="col-span-12">Introductie</SectionTag>

        <h2 id="intro-title" className="display col-span-12 text-[clamp(3rem,8.2vw,8rem)] lg:col-span-7">
          <RevealLines lines={["Oude school.", <span key="n">Nieuwe <span className="text-signal">ambities.</span></span>]} />
        </h2>

        <div className="col-span-12 space-y-5 text-[17px] leading-[1.7] text-mute sm:col-span-10 lg:col-span-4 lg:col-start-9 lg:self-end">
          <Reveal>
            <p className="text-paper">
              Een Honda Civic uit de jaren 90 is meer dan alleen een auto. Het is een project, een passie en iets dat je helemaal eigen kunt maken.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              Bij DVM Performance in {site.location.city} staat die passie centraal. Van onderhoud en modificaties tot een complete opbouw: samen kijken we hoe we jouw Honda naar een hoger niveau kunnen brengen.
            </p>
          </Reveal>
        </div>
      </div>

      {/* grote detailfoto, valt rechts buiten het grid */}
      <div className="wrap mt-16 lg:mt-24">
        <div className="grid-12">
          <Reveal className="relative col-span-12 -mr-[calc(max(0px,(100vw-1440px)/2)+clamp(1.25rem,4vw,3.5rem))] lg:col-span-10 lg:col-start-3">
            <ImageSlot image={images.intro} crop="nose" sizes="(min-width:1024px) 85vw, 100vw" className="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]" />
          </Reveal>
        </div>
        <ul className="tech mt-5 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-5 text-[10px] sm:grid-cols-4 lg:ml-[calc(2/12*100%)]">
          <li><span className="text-signal-hi">A</span> — Onderhoud</li>
          <li><span className="text-signal-hi">B</span> — Modificaties</li>
          <li><span className="text-signal-hi">C</span> — Restauratie</li>
          <li><span className="text-signal-hi">D</span> — Complete builds</li>
        </ul>
      </div>
    </section>
  );
}
