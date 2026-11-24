"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { services } from "@/config/services";
import { site, whatsappLink } from "@/config/site";
import { SELECT_SERVICE_EVENT } from "@/lib/events";
import { ArrowRight, WhatsApp } from "./ui/Icons";

type Values = {
  naam: string;
  telefoon: string;
  email: string;
  model: string;
  bouwjaar: string;
  werkzaamheden: string[];
  bericht: string;
  akkoord: boolean;
  website: string; // honeypot
};
type Errors = Partial<Record<keyof Values, string>>;
type Status = "idle" | "sending" | "sent" | "error" | "not-configured";

const MODELS = ["Civic EG (1991–1995)", "Civic EK (1995–2000)", "Andere Civic", "Andere Honda"];
const THIS_YEAR = new Date().getFullYear();

const empty: Values = { naam: "", telefoon: "", email: "", model: "", bouwjaar: "", werkzaamheden: [], bericht: "", akkoord: false, website: "" };

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.naam.trim().length < 2) e.naam = "Vul je naam in.";
  if (!v.email.trim()) e.email = "Vul je e-mailadres in.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Dit e-mailadres lijkt niet te kloppen.";
  if (v.telefoon.trim() && !/^(\+|00)?[\d\s\-()]{9,16}$/.test(v.telefoon.trim())) e.telefoon = "Controleer je telefoonnummer.";
  if (!v.model) e.model = "Kies je automodel.";
  if (v.bouwjaar) {
    const y = Number(v.bouwjaar);
    if (!Number.isInteger(y) || y < 1972 || y > THIS_YEAR) e.bouwjaar = `Vul een bouwjaar tussen 1972 en ${THIS_YEAR} in.`;
  }
  if (v.bericht.trim().length < 10) e.bericht = "Vertel in een paar woorden wat je wilt (minimaal 10 tekens).";
  if (!v.akkoord) e.akkoord = "Geef toestemming om contact met je op te nemen.";
  return e;
}

const fieldBase =
  "peer w-full appearance-none rounded-none border-0 border-b bg-transparent px-0 pb-3 pt-7 text-[16px] text-paper outline-none transition-colors placeholder:text-transparent focus:border-signal-hi focus-visible:outline-none";

function Field({ id, label, error, optional, quiet, children }: { id: string; label: string; error?: string; optional?: boolean; quiet?: boolean; children: ReactNode }) {
  return (
    <div className="relative">
      {children}
      <label htmlFor={id} className="tech pointer-events-none absolute left-0 top-1 whitespace-nowrap text-[10px]">
        {label} {optional ? (quiet ? null : <span className="text-mute/60">(optioneel)</span>) : <span className="text-signal-hi" aria-hidden>*</span>}
      </label>
      {error && <p id={`${id}-error`} className="mt-2 text-[13px] text-signal-hi">{error}</p>}
    </div>
  );
}

export function ContactForm() {
  const [v, setV] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Dienst vooraf aanvinken vanuit de dienstenlijst
  useEffect(() => {
    const onSelect = (e: Event) => {
      const title = (e as CustomEvent<string>).detail;
      setV((prev) => (prev.werkzaamheden.includes(title) ? prev : { ...prev, werkzaamheden: [...prev.werkzaamheden, title] }));
    };
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, []);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    const next = { ...v, [key]: value };
    setV(next);
    if (touched[key] || status !== "idle") setErrors(validate(next));
  };
  const blur = (key: keyof Values) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(v));
  };
  const show = (key: keyof Values) => (touched[key] || status !== "idle" ? errors[key] : undefined);
  const a11y = (key: keyof Values) => ({
    "aria-invalid": show(key) ? true : undefined,
    "aria-describedby": show(key) ? `${key}-error` : undefined,
  });
  const border = (key: keyof Values) => (show(key) ? "border-signal-hi" : "border-line hover:border-paper/40");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(v);
    setErrors(errs);
    setTouched(Object.fromEntries(Object.keys(empty).map((k) => [k, true])));
    if (Object.keys(errs).length) {
      setStatus("idle");
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (v.website) return; // bot

    if (!site.formEndpoint) {
      setStatus("not-configured");
      requestAnimationFrame(() => statusRef.current?.focus());
      return;
    }
    setStatus("sending");
    try {
      const { website: _hp, akkoord: _ok, ...payload } = v;
      void _hp; void _ok;
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...payload, werkzaamheden: v.werkzaamheden.join(", "), _subject: `Nieuwe aanvraag via website — ${v.model}` }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setV(empty);
      setTouched({});
    } catch {
      setStatus("error");
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const waText = `Hoi DVM Performance, ik ben ${v.naam || "…"}. Ik heb een ${v.model || "Honda"}${v.bouwjaar ? ` uit ${v.bouwjaar}` : ""}. ${v.werkzaamheden.length ? `Interesse in: ${v.werkzaamheden.join(", ")}. ` : ""}${v.bericht}`;
  const wa = whatsappLink(waText);

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-x-8 gap-y-7 sm:grid-cols-2" aria-describedby="form-note">
      <Field id="naam" label="Naam" error={show("naam")}>
        <input id="naam" name="naam" autoComplete="name" value={v.naam} onChange={(e) => set("naam", e.target.value)} onBlur={() => blur("naam")} className={`${fieldBase} ${border("naam")}`} {...a11y("naam")} />
      </Field>
      <Field id="telefoon" label="Telefoonnummer" optional error={show("telefoon")}>
        <input id="telefoon" name="telefoon" type="tel" inputMode="tel" autoComplete="tel" value={v.telefoon} onChange={(e) => set("telefoon", e.target.value)} onBlur={() => blur("telefoon")} className={`${fieldBase} ${border("telefoon")}`} {...a11y("telefoon")} />
      </Field>
      <Field id="email" label="E-mailadres" error={show("email")}>
        <input id="email" name="email" type="email" inputMode="email" autoComplete="email" value={v.email} onChange={(e) => set("email", e.target.value)} onBlur={() => blur("email")} className={`${fieldBase} ${border("email")}`} {...a11y("email")} />
      </Field>
      <div className="grid grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-x-6">
        <Field id="model" label="Automodel" error={show("model")}>
          <select id="model" name="model" value={v.model} onChange={(e) => set("model", e.target.value)} onBlur={() => blur("model")} className={`${fieldBase} ${border("model")} cursor-pointer bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none' stroke='%23a1a1aa' stroke-width='1.5'%3E%3Cpath d='M1 1l5 5 5-5'/%3E%3C/svg%3E")] bg-[right_0.25rem_center] bg-no-repeat pr-8 [&>option]:bg-coal`} {...a11y("model")}>
            <option value="" disabled>Kies…</option>
            {MODELS.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </Field>
        <Field id="bouwjaar" label="Bouwjaar" optional quiet error={show("bouwjaar")}>
          <input id="bouwjaar" name="bouwjaar" inputMode="numeric" maxLength={4} value={v.bouwjaar} onChange={(e) => set("bouwjaar", e.target.value.replace(/\D/g, ""))} onBlur={() => blur("bouwjaar")} className={`${fieldBase} ${border("bouwjaar")}`} {...a11y("bouwjaar")} />
        </Field>
      </div>

      <fieldset className="sm:col-span-2">
        <legend className="tech mb-4 text-[10px]">Gewenste werkzaamheden <span className="text-mute/60">(optioneel)</span></legend>
        <div className="flex flex-wrap gap-2">
          {services.map((s) => {
            const checked = v.werkzaamheden.includes(s.title);
            return (
              <label key={s.id} className={`relative flex min-h-[44px] cursor-pointer items-center border px-4 text-[14px] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-signal-hi ${checked ? "border-signal bg-signal/15 text-paper" : "border-line text-mute hover:border-paper/40 hover:text-paper"}`}>
                <input
                  type="checkbox"
                  name="werkzaamheden"
                  value={s.title}
                  checked={checked}
                  onChange={() => set("werkzaamheden", checked ? v.werkzaamheden.filter((x) => x !== s.title) : [...v.werkzaamheden, s.title])}
                  className="sr-only"
                />
                <span aria-hidden className={`mr-2.5 h-2 w-2 ${checked ? "bg-signal-hi" : "border border-mute"}`} />
                {s.title}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="sm:col-span-2">
        <Field id="bericht" label="Bericht" error={show("bericht")}>
          <textarea id="bericht" name="bericht" rows={4} value={v.bericht} onChange={(e) => set("bericht", e.target.value)} onBlur={() => blur("bericht")} className={`${fieldBase} ${border("bericht")} resize-y`} {...a11y("bericht")} />
        </Field>
      </div>

      {/* honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" value={v.website} onChange={(e) => set("website", e.target.value)} />
      </div>

      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-relaxed text-mute">
          <input type="checkbox" name="akkoord" checked={v.akkoord} onChange={(e) => set("akkoord", e.target.checked)} className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-[#c62828]" {...a11y("akkoord")} />
          <span>
            Ik ga akkoord dat DVM Performance mijn gegevens gebruikt om contact met mij op te nemen over deze aanvraag. Zie de <Link href="/privacyverklaring" className="text-paper underline underline-offset-4 hover:text-signal-hi">privacyverklaring</Link>.
          </span>
        </label>
        {show("akkoord") && <p id="akkoord-error" className="mt-2 text-[13px] text-signal-hi">{show("akkoord")}</p>}
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex min-h-[56px] items-center justify-between gap-8 bg-signal px-7 font-display text-lg font-semibold uppercase tracking-[0.06em] text-white transition-colors hover:bg-signal-hi disabled:opacity-60 sm:min-w-[280px]"
        >
          {status === "sending" ? "Versturen…" : "Verstuur aanvraag"}
          <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
        <p id="form-note" className="tech text-[10px]"><span className="text-signal-hi">*</span> verplicht veld</p>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none sm:col-span-2">
        {status === "not-configured" && (
          <div className="border border-paper/20 bg-steel p-5 text-[15px] leading-relaxed">
            <p className="font-semibold text-paper">Je bericht is nog niet verstuurd.</p>
            <p className="mt-1 text-mute">
              Het contactformulier wordt op dit moment ingericht en is nog niet gekoppeld. {wa ? "Stuur je aanvraag gerust via WhatsApp — je ingevulde gegevens staan er al in." : "Probeer het later nog eens of neem op een andere manier contact op."}
            </p>
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-[48px] items-center gap-3 bg-[#1f8f4e] px-5 font-display font-semibold uppercase tracking-[0.06em] text-white">
                <WhatsApp /> Verstuur via WhatsApp
              </a>
            )}
          </div>
        )}
        {status === "sent" && (
          <div className="border border-paper/20 bg-steel p-5 text-[15px]">
            <p className="font-semibold text-paper">Bedankt, je aanvraag is verstuurd.</p>
            <p className="mt-1 text-mute">We nemen zo snel mogelijk contact met je op.</p>
          </div>
        )}
        {status === "error" && (
          <div className="border border-signal/60 bg-signal/10 p-5 text-[15px]">
            <p className="font-semibold text-paper">Versturen is niet gelukt.</p>
            <p className="mt-1 text-mute">Controleer je verbinding en probeer het opnieuw{wa ? ", of stuur je vraag via WhatsApp" : ""}.</p>
          </div>
        )}
      </div>
    </form>
  );
}
