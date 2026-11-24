"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState, type KeyboardEvent } from "react";
import { DRAWING_SIZE } from "@/config/drawing";
import { parts } from "@/config/parts";
import { CivicDrawing } from "./CivicDrawing";
import { ImageSlot } from "./ui/ImageSlot";
import { RevealLines } from "./ui/Reveal";
import { SectionTag } from "./ui/SectionTag";

export function InteractiveCivic() {
  const [activeId, setActiveId] = useState(parts[0].id);
  const reduce = useReducedMotion();
  const hotspotRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const chipRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const active = parts.find((p) => p.id === activeId) ?? parts[0];
  const index = parts.indexOf(active);

  // Pijltjestoetsen tussen onderdelen (tablist-patroon)
  const onKey = (e: KeyboardEvent, group: "hotspot" | "chip") => {
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    const jump = e.key === "Home" ? 0 : e.key === "End" ? parts.length - 1 : null;
    if (!dir && jump === null) return;
    e.preventDefault();
    const next = parts[jump ?? (index + dir + parts.length) % parts.length];
    setActiveId(next.id);
    const refs = group === "hotspot" ? hotspotRefs : chipRefs;
    refs.current[next.id]?.focus();
    if (group === "chip") refs.current[next.id]?.scrollIntoView({ block: "nearest", inline: "center", behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section id="detail" aria-labelledby="detail-title" className="relative overflow-hidden border-t border-line bg-ink py-24 sm:py-32 lg:py-40">
      <div aria-hidden className="blueprint absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,#000_20%,#000_80%,transparent)]" />
      <div className="wrap relative">
        <div className="grid-12 gap-y-6">
          <SectionTag index="03" className="col-span-12">Interactief</SectionTag>
          <h2 id="detail-title" className="display col-span-12 text-[clamp(3rem,8vw,7.5rem)] lg:col-span-8">
            <RevealLines lines={[<span key="e">Elk detail <span className="text-signal">telt.</span></span>]} />
          </h2>
          <p className="col-span-12 max-w-md self-end text-[17px] leading-relaxed text-mute lg:col-span-4">
            Kies een onderdeel van de Civic en lees waar we op letten.
          </p>
        </div>

        <div className="grid-12 mt-12 items-start gap-y-8 lg:mt-20">
          {/* tekening + hotspots */}
          <div className="relative col-span-12 -mx-[clamp(1.25rem,4vw,3.5rem)] lg:col-span-8 lg:mx-0">
            <div className="relative" style={{ aspectRatio: `${DRAWING_SIZE.w} / ${DRAWING_SIZE.h}` }}>
              <CivicDrawing crop="canvas" annotations highlight={active.id} className="absolute inset-0 h-full w-full text-paper/85" title="Technische tekening van een Honda Civic met selecteerbare onderdelen" />

              <div role="tablist" aria-label="Onderdelen van de Civic" aria-orientation="horizontal" className="absolute inset-0">
                {parts.map((p) => {
                  const isActive = p.id === active.id;
                  const labelLeft = p.x > 700;
                  return (
                    <button
                      key={p.id}
                      ref={(el) => { hotspotRefs.current[p.id] = el; }}
                      type="button"
                      role="tab"
                      id={`hotspot-${p.id}`}
                      aria-selected={isActive}
                      aria-controls="detail-panel"
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setActiveId(p.id)}
                      onKeyDown={(e) => onKey(e, "hotspot")}
                      className="group absolute flex h-9 w-9 -translate-x-1/2 sm:h-11 sm:w-11 -translate-y-1/2 items-center justify-center"
                      style={{ left: `${(p.x / DRAWING_SIZE.w) * 100}%`, top: `${(p.y / DRAWING_SIZE.h) * 100}%` }}
                    >
                      <span className="sr-only">{p.label}</span>
                      {isActive && <span aria-hidden className="absolute h-5 w-5 rounded-full border border-signal-hi motion-safe:[animation:pulse-ring_1.8s_ease-out_infinite]" />}
                      <span
                        aria-hidden
                        className={`relative flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-300 sm:h-6 sm:w-6 ${
                          isActive ? "scale-110 border-signal bg-signal" : "border-paper/70 bg-ink/80 group-hover:border-paper group-hover:bg-paper/20"
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-white" : "bg-paper"}`} />
                      </span>
                      {/* leader-lijn + label (vanaf tablet) */}
                      <span
                        aria-hidden
                        className={`tech pointer-events-none absolute top-1/2 hidden -translate-y-1/2 items-center gap-2 whitespace-nowrap text-[10px] md:flex ${labelLeft ? "right-full flex-row-reverse pr-1" : "left-full pl-1"} ${isActive ? "text-paper" : "text-mute"}`}
                      >
                        <span className={`h-px transition-all duration-500 ease-out-expo ${isActive ? "w-10 bg-signal-hi" : "w-5 bg-paper/40 group-hover:w-8"}`} />
                        <span className="bg-ink/85 px-1.5 py-0.5"><span className={isActive ? "text-signal-hi" : ""}>{p.code}</span> {p.label}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* mobiel: horizontale selector */}
            <div className="mt-4 px-[clamp(1.25rem,4vw,3.5rem)] lg:hidden">
              <div role="tablist" aria-label="Kies een onderdeel" className="-mx-[clamp(1.25rem,4vw,3.5rem)] flex snap-x snap-mandatory gap-2 overflow-x-auto px-[clamp(1.25rem,4vw,3.5rem)] pb-2 [scrollbar-width:none]">
                {parts.map((p) => {
                  const isActive = p.id === active.id;
                  return (
                    <button
                      key={p.id}
                      ref={(el) => { chipRefs.current[p.id] = el; }}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="detail-panel"
                      tabIndex={isActive ? 0 : -1}
                      onClick={(e) => { setActiveId(p.id); e.currentTarget.scrollIntoView({ block: "nearest", inline: "center", behavior: reduce ? "auto" : "smooth" }); }}
                      onKeyDown={(e) => onKey(e, "chip")}
                      className={`flex min-h-[44px] shrink-0 snap-center items-center gap-2 border px-4 font-display text-[15px] font-semibold uppercase tracking-[0.06em] transition-colors ${
                        isActive ? "border-signal bg-signal text-white" : "border-line text-mute"
                      }`}
                    >
                      <span className="font-mono text-[10px] opacity-70">{p.code}</span>
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* informatiepaneel */}
          <div className="col-span-12 lg:col-span-4 lg:pl-4">
            <div id="detail-panel" role="tabpanel" aria-live="polite" aria-labelledby={`hotspot-${active.id}`} className="relative border border-line bg-coal/90">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ImageSlot image={active.image} crop={active.crop} sizes="(min-width:1024px) 30vw, 100vw" showBrief={false} className="aspect-[16/10] border-b border-line" />
                  <div className="p-6 sm:p-8">
                    <p className="tech flex justify-between text-[10px]">
                      <span><span className="text-signal-hi">{active.code}</span> — {active.label}</span>
                      <span>{String(index + 1).padStart(2, "0")} / {String(parts.length).padStart(2, "0")}</span>
                    </p>
                    <h3 className="display mt-4 text-[clamp(1.9rem,3vw,2.6rem)]">{active.title}</h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-mute sm:text-base">{active.text}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
              <span aria-hidden className="absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-signal" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
