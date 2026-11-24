/**
 * ─────────────────────────────────────────────────────────────
 *  CENTRAAL BEELDREGISTER
 *  Alle foto's staan in /public/images/<map>/.
 *  Zet `src` op het pad van een foto (bijv. "/images/hero/civic-ek-hero.jpg")
 *  en de site toont die foto. Zolang `src` null is, toont de site een
 *  vormgegeven technische tekening/placeholder met de beschrijving hieronder.
 *
 *  `inspiration: true` = sfeerbeeld, géén werk van DVM Performance.
 *  Er wordt dan automatisch een label "Inspiratie" bij getoond.
 * ─────────────────────────────────────────────────────────────
 */

export type SiteImage = {
  src: string | null;
  alt: string;
  /** Wat voor foto hier hoort — wordt in de placeholder getoond. */
  brief: string;
  inspiration?: boolean;
  /** Fotograaf / licentie wanneer een externe foto wordt gebruikt. */
  credit?: string;
};

export const images: Record<"hero" | "intro" | "contact", SiteImage> = {
  hero: {
    src: null,
    alt: "Honda Civic EK in een donkere industriële hal op een Nederlands bedrijventerrein",
    brief: "Civic EG/EK driekwart vóór, auto rechts in beeld, donkere hal of bedrijfsterrein, bewolkte lucht",
    inspiration: true,
  },
  intro: {
    src: null,
    alt: "Detail van een Honda Civic uit de jaren 90: koplamp en motorkap",
    brief: "Detailfoto: koplamp/motorkap of velg van een Civic EG/EK, laag standpunt, betonvloer",
    inspiration: true,
  },
  contact: {
    src: null,
    alt: "Honda Civic in een donkere werkplaats bij avondlicht",
    brief: "Donkere werkplaats, Civic op de brug of bij open roldeur, avond",
    inspiration: true,
  },
};
