/**
 * ─────────────────────────────────────────────────────────────
 *  DVM PERFORMANCE — CENTRALE BEDRIJFSGEGEVENS
 *  Pas hier telefoon, e-mail, WhatsApp, socials en domein aan.
 *  Velden met `null` zijn nog niet bevestigd door de eigenaar en
 *  worden automatisch verborgen of als "volgt" getoond.
 * ─────────────────────────────────────────────────────────────
 */

export type SocialChannel = {
  label: string;
  /** Volledige URL, bijv. "https://www.instagram.com/dvmperformance". `null` = nog niet bekend. */
  url: string | null;
};

export const site = {
  name: "DVM Performance",
  shortName: "DVM",
  tagline: "Honda specialist in Gameren",

  /** Domein van de live site. Zet bij voorkeur NEXT_PUBLIC_SITE_URL in Vercel. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  location: {
    city: "Gameren",
    region: "Gelderland",
    country: "Nederland",
    countryCode: "NL",
    /** Straat + huisnummer + postcode: nog niet bevestigd. */
    street: null as string | null,
    postalCode: null as string | null,
  },

  contact: {
    /** Bijv. "+31 6 12345678" (weergave). `null` = verborgen. */
    phone: null as string | null,
    /** Bijv. "info@dvmperformance.nl". `null` = verborgen. */
    email: null as string | null,
    /**
     * WhatsApp-nummer in internationaal formaat ZONDER + en spaties,
     * bijv. "31612345678". Zodra dit is ingevuld verschijnen de
     * WhatsApp-knoppen automatisch (header-mobiel, contact, zwevende knop).
     */
    whatsapp: null as string | null,
    whatsappMessage: "Hoi DVM Performance, ik heb een vraag over mijn Honda.",
    /** Openingstijden als tekst. `null` = verborgen. */
    hours: null as string | null,
  },

  /**
   * Endpoint voor het contactformulier (bijv. Formspree, Basin, eigen API-route).
   * Zolang dit `null` is, valideert het formulier wel maar verstuurt het niets
   * en ziet de bezoeker een eerlijke melding. Zie README → Contactformulier.
   */
  formEndpoint: (process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? null) as string | null,

  socials: {
    instagram: { label: "Instagram", url: null } as SocialChannel,
    facebook: { label: "Facebook", url: null } as SocialChannel,
  },

  nav: [
    { label: "Home", href: "#top" },
    { label: "Diensten", href: "#diensten" },
    { label: "Honda Builds", href: "#builds" },
    { label: "Over ons", href: "#over-ons" },
    { label: "Contact", href: "#contact" },
  ],

  cta: { label: "Start jouw project", href: "#contact" },

  seo: {
    title: "DVM Performance — Honda Civic specialist in Gameren",
    description:
      "Gespecialiseerde werkplaats in Gameren (Gelderland) voor Honda Civics uit de jaren 90: onderhoud, restauratie, modificaties, performance en complete builds voor EG en EK.",
    keywords: [
      "Honda Civic specialist",
      "Honda specialist Gameren",
      "Honda Civic tuning",
      "Honda Civic restauratie",
      "Honda Civic onderhoud",
      "Honda EG specialist",
      "Honda EK specialist",
      "Honda modificaties",
      "Honda performance Nederland",
    ],
  },
} as const;

export const whatsappLink = (message: string = site.contact.whatsappMessage) =>
  site.contact.whatsapp
    ? `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`
    : null;

export const activeSocials = () =>
  Object.values(site.socials).filter((s): s is SocialChannel & { url: string } => Boolean(s.url));
