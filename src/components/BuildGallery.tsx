import { buildStyles, projects, type Project } from "@/config/builds";
import { ImageSlot } from "./ui/ImageSlot";
import { Reveal, RevealLines } from "./ui/Reveal";
import { SectionTag } from "./ui/SectionTag";

/* Asymmetrische editorial plaatsing per positie */
const layout = [
  { fig: "lg:col-span-7", img: "aspect-[4/3] lg:aspect-[5/6]", cap: "sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]" },
  { fig: "lg:col-span-4 lg:col-start-9 lg:mt-56", img: "aspect-[4/3] lg:aspect-[3/4]", cap: "sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:grid-cols-1" },
  { fig: "lg:col-span-9 lg:col-start-3 lg:mt-8", img: "aspect-[16/10] lg:aspect-[21/9]", cap: "sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]" },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="border-t border-line pt-6">
      <ImageSlot image={project.cover} sizes="(min-width:1024px) 45vw, 100vw" className="aspect-[4/3]" showInspirationTag={false} />
      <p className="tech mt-5">{project.model} — {project.year}</p>
      <h4 className="display mt-2 text-3xl">{project.work.join(" · ")}</h4>
      <p className="mt-3 text-mute">{project.description}</p>
      {project.before && project.after && (
        <div className="mt-5 grid grid-cols-2 gap-2">
          <figure><ImageSlot image={project.before} className="aspect-[4/3]" sizes="25vw" showInspirationTag={false} /><figcaption className="tech mt-2">Voor</figcaption></figure>
          <figure><ImageSlot image={project.after} className="aspect-[4/3]" sizes="25vw" showInspirationTag={false} /><figcaption className="tech mt-2">Na</figcaption></figure>
        </div>
      )}
      {project.specs && project.specs.length > 0 && (
        <dl className="mt-5 grid grid-cols-2 gap-px bg-line">
          {project.specs.map((s) => (
            <div key={s.label} className="bg-ink p-3"><dt className="tech">{s.label}</dt><dd className="mt-1 font-display text-xl uppercase">{s.value}</dd></div>
          ))}
        </dl>
      )}
      {project.gallery && project.gallery.length > 0 && (
        <div className="mt-2 grid grid-cols-3 gap-2">
          {project.gallery.map((g, i) => <ImageSlot key={i} image={g} className="aspect-square" sizes="15vw" showInspirationTag={false} />)}
        </div>
      )}
    </article>
  );
}

export function BuildGallery() {
  return (
    <section id="builds" aria-labelledby="builds-title" className="relative border-t border-line bg-coal py-24 sm:py-32 lg:py-40">
      <div className="wrap">
        <div className="grid-12 gap-y-6">
          <SectionTag index="04" className="col-span-12">Honda Builds</SectionTag>
          <h2 id="builds-title" className="display col-span-12 text-[clamp(3rem,8vw,7.5rem)] lg:col-span-9">
            <RevealLines lines={["Van idee", <span key="b">naar <span className="outline-text">build.</span></span>]} />
          </h2>
          <p className="col-span-12 max-w-md self-end text-[17px] leading-relaxed text-mute lg:col-span-3">
            Drie richtingen om over na te denken. Jouw project kan alle kanten op.
          </p>
        </div>

        <p className="tech mt-10 flex items-center gap-3 border-y border-line py-3 text-[10px]">
          <span className="bg-paper px-1.5 py-0.5 text-ink">Inspiratie</span>
          Bouwstijlen ter inspiratie — geen uitgevoerde projecten van DVM Performance.
        </p>

        <div className="grid-12 mt-12 gap-y-16 lg:mt-20">
          {buildStyles.map((b, i) => {
            const l = layout[i % layout.length];
            return (
              <Reveal as="figure" key={b.id} className={`group col-span-12 ${l.fig}`}>
                <div className="relative">
                  <ImageSlot image={b.image} crop={b.crop} sizes="(min-width:1024px) 60vw, 100vw" className={l.img} />
                  <span className="display pointer-events-none absolute -bottom-[0.18em] right-3 text-[clamp(4rem,10vw,9rem)] leading-none text-paper/10 transition-colors duration-500 group-hover:text-signal/40" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <figcaption className={`mt-6 grid gap-x-8 gap-y-3 ${l.cap}`}>
                  <h3 className="display text-[clamp(2rem,3.4vw,3rem)]">{b.title}</h3>
                  <div>
                    <p className="text-[15px] leading-relaxed text-mute sm:text-base">{b.description}</p>
                    <ul className="tech mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[10px]">
                      {b.keywords.map((k) => <li key={k}><span className="text-signal-hi">+</span> {k}</li>)}
                    </ul>
                  </div>
                </figcaption>
              </Reveal>
            );
          })}
        </div>

        {projects.length > 0 && (
          <div className="mt-28">
            <h3 className="display text-[clamp(2.25rem,5vw,4rem)]">Projecten uit de werkplaats</h3>
            <div className="mt-10 grid gap-12 md:grid-cols-2">
              {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
