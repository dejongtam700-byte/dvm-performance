import { activeSocials, site } from "@/config/site";

/**
 * Schema.org AutoRepair — bevat uitsluitend bevestigde gegevens.
 * Telefoon, e-mail, adres en socials worden pas toegevoegd zodra ze in
 * /src/config/site.ts zijn ingevuld.
 */
export function localBusinessJsonLd() {
  const { location, contact } = site;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: site.name,
    description: site.seo.description,
    url: site.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: location.city,
      addressRegion: location.region,
      addressCountry: location.countryCode,
      ...(location.street ? { streetAddress: location.street } : {}),
      ...(location.postalCode ? { postalCode: location.postalCode } : {}),
    },
    areaServed: { "@type": "Country", name: "Nederland" },
    knowsAbout: ["Honda Civic EG", "Honda Civic EK", "Honda B-serie motoren", "Restauratie", "Onderhoud", "Modificaties"],
  };
  if (contact.phone) data.telephone = contact.phone;
  if (contact.email) data.email = contact.email;
  const sameAs = activeSocials().map((s) => s.url);
  if (sameAs.length) data.sameAs = sameAs;
  return data;
}
