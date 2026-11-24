"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { images } from "@/config/images";
import { site } from "@/config/site";
import { Civic3D } from "./Civic3D";
import { Button } from "./ui/Button";

/** Beperkte parallax (max ~60px), uit bij reduced motion. */
function useParallax<T extends HTMLElement>(strength = 0.12) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      const y = Math.min(window.scrollY, window.innerHeight) * strength;
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [strength]);
  return ref;
}

export function Hero() {
  const visual = useParallax<HTMLDivElement>(0.1);
  const hasPhoto = Boolean(images.hero.src);

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink pt-[72px] lg:min-h-[90vh]">
      {/* achtergrond */}
      {hasPhoto ? (
        <div ref={visual} className="absolute inset-0 -z-10">
          <Image src={images.hero.src!} alt={images.hero.alt} fill priority sizes="100vw" className="object-cover object-[70%_center]" />
          <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/70 to-ink/10" />
          <div className="absolute inset-0 bg-linear-to-t from-ink via-transparent to-ink/40" />
        </div>
      ) : (
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="blueprint absolute inset-0 [mask-image:radial-gradient(ellipse_80%_70%_at_70%_55%,#000_30%,transparent_75%)]" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-coal to-transparent" />
        </div>
      )}

      {/*
        Compositie
        mobiel/tablet: label + kop → subtekst → tekening → knoppen
        desktop:       kop over de volle breedte; daaronder links subtekst + knoppen,
                       rechts de tekening die tot de schermrand doorloopt.
      */}
      <div className="wrap relative grid flex-1 grid-cols-12 content-center gap-x-6 gap-y-8 py-10 lg:gap-y-10 lg:py-14">
        <div className="relative z-10 col-span-12 lg:col-span-11">
          <p className="tech mb-6 flex items-center gap-3 [animation:rise_.8s_var(--ease-out-expo)_both]">
            <span className="inline-block h-2 w-2 bg-signal" aria-hidden />
            Honda specialist <span className="text-line">/</span> {site.location.city}, NL
          </p>
          <h1 id="hero-title" className="display text-[clamp(4rem,14vw,7.5rem)] lg:text-[clamp(6.5rem,10vw,11rem)]">
            <span className="block lg:whitespace-nowrap [animation:rise_.9s_.08s_var(--ease-out-expo)_both]">Jouw Honda.</span>
            <span className="block lg:whitespace-nowrap [animation:rise_.9s_.18s_var(--ease-out-expo)_both]">
              Jouw <span className="outline-text">Stijl</span><span className="text-signal">.</span>
            </span>
          </h1>
        </div>

        <p className="relative z-10 col-span-12 max-w-[34ch] text-[17px] leading-relaxed text-mute sm:text-lg lg:col-span-5 lg:row-start-2 lg:self-end xl:col-span-4 [animation:rise_.9s_.3s_var(--ease-out-expo)_both]">
          Van onderhoud tot complete builds. Alles voor jouw Honda Civic uit de jaren 90.
        </p>

        {!hasPhoto && (
          <div
            ref={visual}
            className="relative col-span-12 -mx-[8vw] lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-2 lg:mx-0 lg:-mr-[calc(max(0px,(100vw-1440px)/2)+clamp(1.25rem,4vw,3.5rem))] lg:w-full lg:self-center lg:justify-self-end xl:col-span-8 xl:col-start-5 xl:max-w-[1040px]"
          >
            <div className="relative aspect-[1000/500]">
              <Civic3D className="absolute inset-0" />
              <p className="tech pointer-events-none absolute bottom-1 right-[8vw] flex items-center gap-2 text-[10px] lg:right-[calc(max(0px,(100vw-1440px)/2)+clamp(1.25rem,4vw,3.5rem))]">
                <span className="text-signal-hi">360°</span> Sleep om te draaien
              </p>
            </div>
          </div>
        )}

        <div className="relative z-10 col-span-12 flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:row-start-3 lg:flex-col lg:self-start xl:col-span-4 [animation:rise_.9s_.4s_var(--ease-out-expo)_both]">
          <Button href={site.cta.href} className="sm:min-w-[260px] lg:w-full lg:max-w-[320px]">Start jouw project</Button>
          <Button href="#diensten" variant="ghost" className="sm:min-w-[260px] lg:w-full lg:max-w-[320px]">Ontdek onze diensten</Button>
        </div>
      </div>

      {/* onderrand: scrollindicator + technische meta */}
      <div className="wrap relative z-10 flex items-end justify-between pb-6">
        <a href="#intro" className="group flex items-center gap-4" aria-label="Scroll naar de introductie">
          <span className="relative block h-12 w-px overflow-hidden bg-line">
            <span className="absolute inset-x-0 top-0 h-1/2 bg-paper motion-safe:[animation:scroll-cue_1.8s_ease-in-out_infinite]" />
          </span>
          <span className="tech group-hover:text-paper">Scroll</span>
        </a>
        <ul className="tech hidden gap-8 text-[10px] md:flex">
          <li>EG <span className="text-paper/70">1991–1995</span></li>
          <li>EK <span className="text-paper/70">1995–2000</span></li>
          <li>{site.location.region} <span className="text-paper/70">NL</span></li>
        </ul>
      </div>
    </section>
  );
}
