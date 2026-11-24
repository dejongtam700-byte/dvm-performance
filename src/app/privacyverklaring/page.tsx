import Link from "next/link";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Wordmark } from "@/components/Wordmark";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description: `Hoe ${site.name} omgaat met persoonsgegevens die je via de website deelt.`,
  alternates: { canonical: "/privacyverklaring" },
};

/**
 * CONCEPT — laat deze tekst controleren en aanvullen door de eigenaar
 * (bedrijfsgegevens, KvK-nummer, bewaartermijnen, gekozen formulierdienst).
 */
export default function Privacy() {
  const contact = site.contact.email ?? "het contactformulier op de website";
  return (
    <>
      <header className="border-b border-line">
        <div className="wrap flex h-[72px] items-center justify-between">
          <Link href="/" aria-label="DVM Performance — home"><Wordmark /></Link>
          <Link href="/" className="tech hover:text-paper">← Terug naar de site</Link>
        </div>
      </header>
      <main id="main" className="wrap max-w-3xl py-20 text-[17px] leading-[1.75] text-mute [&_h2]:display [&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:text-4xl [&_h2]:text-paper">
        <p className="tech">Laatst bijgewerkt: concept</p>
        <h1 className="display mt-6 text-[clamp(3rem,8vw,6rem)] text-paper">Privacyverklaring</h1>
        <p className="mt-8">
          {site.name} ({site.location.city}, {site.location.region}) gaat zorgvuldig om met je persoonsgegevens. In deze verklaring lees je welke gegevens we verwerken wanneer je contact met ons opneemt via deze website.
        </p>
        <h2>Welke gegevens</h2>
        <p>Via het contactformulier: je naam, e-mailadres, (optioneel) telefoonnummer, automodel, bouwjaar, gewenste werkzaamheden en je bericht.</p>
        <h2>Waarvoor</h2>
        <p>Uitsluitend om je aanvraag te beantwoorden en, als je dat wilt, een afspraak of offerte met je te maken. We gebruiken je gegevens niet voor nieuwsbrieven en verkopen ze niet aan derden.</p>
        <h2>Bewaartermijn</h2>
        <p>We bewaren je gegevens niet langer dan nodig is om je aanvraag af te handelen, tenzij er een wettelijke bewaarplicht geldt (bijvoorbeeld voor facturen).</p>
        <h2>Je rechten</h2>
        <p>Je kunt altijd vragen om inzage, correctie of verwijdering van je gegevens. Neem daarvoor contact op via {contact}.</p>
        <h2>Cookies</h2>
        <p>Deze website plaatst geen tracking- of advertentiecookies.</p>
      </main>
      <Footer />
    </>
  );
}
