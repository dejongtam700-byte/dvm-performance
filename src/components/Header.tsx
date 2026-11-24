"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { site, whatsappLink } from "@/config/site";
import { Wordmark } from "./Wordmark";
import { ArrowUpRight, Close, Menu, WhatsApp } from "./ui/Icons";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#top");
  const reduce = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const wa = whatsappLink();

  // Donkere achtergrond na scrollen
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Actieve sectie volgen voor de navigatie
  useEffect(() => {
    const ids = site.nav.map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Menu: scroll lock + Escape
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <a href="#main" className="sr-only z-[100] bg-signal px-4 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Naar de inhoud
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || open ? "border-b border-line bg-ink/92 backdrop-blur-md" : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="wrap flex h-[72px] items-center justify-between gap-6">
          <a href="#top" className="relative z-[60] -m-2 p-2" aria-label="DVM Performance — naar boven" onClick={() => setOpen(false)}>
            <Wordmark />
          </a>

          <nav aria-label="Hoofdnavigatie" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {site.nav.map((item) => {
                const isActive = active === item.href;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={`group relative block whitespace-nowrap px-3 py-3 text-[14px] font-medium xl:px-4 transition-colors ${isActive ? "text-paper" : "text-mute hover:text-paper"}`}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={`absolute inset-x-3 bottom-1.5 xl:inset-x-4 h-[2px] origin-left bg-signal transition-transform duration-500 ease-out-expo ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-hover:bg-paper/40"}`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.cta.href}
              className="group hidden min-h-[44px] items-center gap-3 whitespace-nowrap bg-signal px-5 font-display text-[15px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-signal-hi md:inline-flex lg:hidden xl:inline-flex"
            >
              {site.cta.label}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Menu sluiten" : "Menu openen"}
              className="relative z-[60] -mr-2 flex h-12 w-12 items-center justify-center text-paper lg:hidden"
            >
              {open ? <Close className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="blueprint fixed inset-0 z-40 flex flex-col bg-ink pt-[72px] lg:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav aria-label="Mobiele navigatie" className="wrap flex flex-1 flex-col justify-center">
              <ul className="border-t border-line">
                {site.nav.map((item, i) => (
                  <li key={item.href} className="border-b border-line">
                    <motion.a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-4"
                      initial={reduce ? false : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className={`display text-[clamp(2.6rem,11vw,4rem)] ${active === item.href ? "text-paper" : "text-paper/70"}`}>
                        {item.label}
                      </span>
                      <span className="tech">0{i + 1}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="wrap grid gap-3 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              <a href={site.cta.href} onClick={() => setOpen(false)} className="flex min-h-[56px] items-center justify-between bg-signal px-6 font-display text-lg font-semibold uppercase tracking-[0.06em] text-white">
                {site.cta.label} <ArrowUpRight />
              </a>
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="flex min-h-[56px] items-center justify-between border border-line px-6 font-display text-lg font-semibold uppercase tracking-[0.06em]">
                  WhatsApp <WhatsApp />
                </a>
              )}
              <p className="tech pt-2">{site.location.city}, {site.location.region}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
