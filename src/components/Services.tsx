"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { services } from "@/config/services";
import { preselectService as preselect } from "@/lib/events";
import { ImageSlot } from "./ui/ImageSlot";
import { ArrowUpRight } from "./ui/Icons";
import { Reveal, RevealLines } from "./ui/Reveal";
import { SectionTag } from "./ui/SectionTag";


export function Services() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = services[active];

  return (
    <section id="diensten" aria-labelledby="diensten-title" className="relative border-t border-line bg-coal py-24 sm:py-32 lg:py-40">
      <div className="wrap">
        <div className="grid-12 gap-y-8">
          <SectionTag index="02" className="col-span-12">Diensten</SectionTag>
          <h2 id="diensten-title" className="display col-span-12 text-[clamp(3rem,7.5vw,7rem)] lg:col-span-8">
            <RevealLines lines={["Alles voor", <span key="c" className="outline-text">jouw Civic.</span>]} />
          </h2>
          <Reveal className="col-span-12 max-w-md self-end text-[17px] leading-relaxed text-mute lg:col-span-4">
            <p>Van een kleine aanpassing tot een complete opbouw. Kies waar je mee bezig wilt en we kijken samen naar de mogelijkheden.</p>
          </Reveal>
        </div>

        <div className="grid-12 mt-16 lg:mt-24">
          {/* lijst */}
          <ol className="col-span-12 border-t border-line lg:col-span-7">
            {services.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={s.id} className="border-b border-line">
                  <a
                    href="#contact"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => preselect(s.title)}
                    className="group relative grid grid-cols-[3.25rem_1fr_auto] items-start gap-x-4 py-7 sm:grid-cols-[5.5rem_1fr_auto] sm:py-9"
                  >
                    {/* rode voortgangslijn bij actief */}
                    <span aria-hidden className={`absolute -top-px left-0 h-[2px] bg-signal transition-[width] duration-700 ease-out-expo ${isActive ? "w-full lg:w-full" : "w-0"}`} />
                    <span className={`display text-[clamp(2.25rem,5vw,4rem)] leading-[0.8] transition-colors duration-300 ${isActive ? "text-signal" : "outline-text opacity-60 group-hover:opacity-100"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <span className="display block text-[clamp(1.75rem,3.6vw,3rem)] transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5">
                        {s.title}
                      </span>
                      <span className="mt-3 block max-w-[46ch] text-[15px] leading-relaxed text-mute sm:text-base">{s.summary}</span>
                      {s.points.length > 0 && (
                        <span className={`tech mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[10px] transition-opacity duration-500 lg:opacity-0 ${isActive ? "lg:opacity-100" : ""}`}>
                          {s.points.map((p) => <span key={p}>— {p}</span>)}
                        </span>
                      )}
                      {/* mobiel: eigen beeld per dienst, wisselende formaten */}
                      <ImageSlot
                        image={s.image}
                        crop={s.crop}
                        sizes="(min-width:1024px) 1px, 90vw"
                        showBrief={false}
                        className={`mt-6 lg:hidden ${i % 3 === 0 ? "aspect-[4/3]" : i % 3 === 1 ? "aspect-[16/9]" : "aspect-[3/2] w-4/5"}`}
                      />
                    </div>
                    <ArrowUpRight className="mt-2 h-6 w-6 text-mute transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal-hi" />
                    <span className="sr-only">— vraag hierover aan via het contactformulier</span>
                  </a>
                </li>
              );
            })}
          </ol>

          {/* desktop: sticky beeld dat met de actieve dienst meewisselt */}
          <div className="relative col-span-5 hidden lg:block">
            <div className="sticky top-28 ml-[8%]">
              <div className="relative aspect-[4/5] overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={current.id}
                    className="absolute inset-0"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 0 100%)" }}
                    animate={reduce ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0 0 0 0%)" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ImageSlot image={current.image} crop={current.crop} sizes="40vw" className="h-full w-full" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="tech mt-4 flex justify-between text-[10px]">
                <span>{String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</span>
                <span className="text-paper/80">{current.title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
