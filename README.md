# DVM Performance — website

Website voor DVM Performance, Honda Civic-specialist in Gameren (Gelderland).
Gebouwd met Next.js (App Router), TypeScript, Tailwind CSS 4 en Motion.

## Installeren en starten

Vereist: Node.js 20 of nieuwer.

```bash
npm install
npm run dev        # ontwikkelserver op http://localhost:3000
npm run build      # productiebuild
npm run start      # productiebuild lokaal draaien
npm run lint       # ESLint
npm run typecheck  # TypeScript-controle
```

## Automatische controle

Bij elke push naar `main` draait GitHub Actions (`.github/workflows/build.yml`): installeren, lint,
productiebuild en typecheck. Een groen vinkje bij de commit op GitHub betekent dat de site bouwt.

## Online zetten via Vercel

1. Zet deze map in een GitHub-repository.
2. Ga naar vercel.com → **Add New → Project** → kies de repository. Vercel herkent Next.js automatisch.
3. Voeg onder **Settings → Environment Variables** toe:
   - `NEXT_PUBLIC_SITE_URL` = het definitieve domein, bijv. `https://www.dvmperformance.nl` (nodig voor sitemap, canonical-URL's en social previews)
   - `NEXT_PUBLIC_FORM_ENDPOINT` = adres van de formulierdienst (zie hieronder), zodra die er is
4. Deploy. Koppel daarna het eigen domein onder **Settings → Domains**.

## Waar staat wat?

Alle aanpasbare inhoud staat in **`src/config/`**. Je hoeft niet door de componenten te zoeken.

| Bestand | Inhoud |
| --- | --- |
| `src/config/site.ts` | Bedrijfsnaam, plaats, telefoon, e-mail, WhatsApp, openingstijden, socials, navigatie, SEO-teksten |
| `src/config/services.ts` | De zes diensten (titel, korte tekst, punten, beeld) |
| `src/config/parts.ts` | Onderdelen en teksten van de interactieve sectie "Elk detail telt" |
| `src/config/builds.ts` | Bouwstijlen (inspiratie) en straks echte projecten |
| `src/config/images.ts` | Hero-, intro- en contactbeeld |
| `src/config/drawing.ts` | Uitsnedes van de technische Civic-tekening |
| `src/app/globals.css` | Kleuren, lettertypes en designtokens |

Velden die op `null` staan zijn nog niet bevestigd en worden automatisch verborgen of als "volgt binnenkort" getoond.

## Afbeeldingen

Foto's horen in **`public/images/`**:

```
public/images/
├── hero/       hoofdbeeld bovenaan
├── intro/      detailfoto bij de introductie
├── services/   één foto per dienst
├── builds/     bouwstijlen en echte projecten
├── parts/      detailfoto's voor "Elk detail telt"
└── og/         (optioneel) eigen social-preview
```

Een foto plaatsen: zet het bestand in de juiste map en vul in het config-bestand het pad in, bijvoorbeeld
`src: "/images/hero/civic-ek-hero.jpg"`. Zolang `src` op `null` staat, toont de site een vormgegeven
technische tekening van een Civic, met in kleine letters welke foto daar hoort.

Bij elke foto staat een veld `inspiration`. Staat dat op `true`, dan krijgt de foto het label **Inspiratie**,
zodat sfeerbeelden nooit als eigen werk van DVM Performance worden gepresenteerd. Zet het op `false` bij
eigen foto's uit de werkplaats.

De volledige lijst met gewenste foto's staat in `public/images/BEELDEN-NODIG.md`.

**Waarom nog geen foto's?** Er waren geen eigen bedrijfsfoto's, en tijdens de bouw kon ik geen externe
afbeeldingen ophalen en controleren. In plaats van niet-gecontroleerde stockfoto's (vaak van andere
merken of moderne Civics) gebruikt de site daarom een eigen technische lijntekening als tijdelijk beeld.

## WhatsApp en sociale media

In `src/config/site.ts`:

```ts
whatsapp: "31612345678",  // internationaal, zonder + en spaties
```

Zodra dit is ingevuld verschijnen automatisch: de WhatsApp-knop in het contactblok, in het mobiele menu,
een zwevende knop op mobiel, een link in de footer, en een "Verstuur via WhatsApp"-knop als het formulier
nog niet gekoppeld is (met de ingevulde gegevens al in het bericht).

Instagram en Facebook: vul `socials.instagram.url` en `socials.facebook.url` in met de volledige URL.
Ze verschijnen dan als actieve links en worden ook aan de structured data toegevoegd.

## Contactformulier koppelen

Het formulier valideert alle velden, maar **verstuurt nog niets**. Een bezoeker ziet dan eerlijk dat het
bericht niet is verzonden. Het formulier meldt nooit "verzonden" zonder dat dat echt gebeurd is.

Koppelen kan zonder eigen server, bijvoorbeeld met Formspree:

1. Maak een formulier aan op formspree.io en kopieer het endpoint (`https://formspree.io/f/xxxxxxx`).
2. Zet dat als `NEXT_PUBLIC_FORM_ENDPOINT` in Vercel (of in `.env.local` bij lokaal testen).
3. Opnieuw deployen. Het formulier stuurt dan een JSON-POST met: naam, telefoon, email, model, bouwjaar,
   werkzaamheden, bericht.

Een andere dienst of een eigen API-route kan ook, zolang die JSON accepteert en bij succes HTTP 200 teruggeeft.

## Nog ontbrekende bedrijfsinformatie

- [ ] Telefoonnummer
- [ ] E-mailadres
- [ ] WhatsApp-nummer
- [ ] Straat, huisnummer en postcode (alleen als bezoek op locatie gewenst is)
- [ ] Openingstijden / werkwijze (op afspraak?)
- [ ] Instagram- en Facebook-URL
- [ ] Definitief domein
- [ ] Bevestiging van de diensten en de teksten per dienst
- [ ] Eigen foto's (zie `public/images/BEELDEN-NODIG.md`)
- [ ] Echte projecten voor "Honda Builds"
- [ ] Controle van de privacyverklaring (`src/app/privacyverklaring/page.tsx`) en eventueel KvK-nummer
- [ ] Formulierdienst kiezen en koppelen

## Technische keuzes

- **3D-Civic in de hero:** een eigen 3D-model (`src/components/Civic3D.tsx`) getekend op een `<canvas>`,
  zonder 3D-bibliotheek (circa 10 kB). Draait langzaam rond, is te slepen met muis of vinger en te draaien
  met de pijltjestoetsen. Stopt met tekenen buiten beeld en draait niet vanzelf bij "beweging verminderen".
  Zodra er een echte hero-foto is ingesteld (`images.hero.src`), toont de hero de foto in plaats van het model.
- **Interactieve Civic:** geen 3D-bibliotheek. De auto is een eigen SVG-tekening; de hotspots gebruiken
  dezelfde coördinaten als de tekening en staan daardoor op elk scherm precies goed. Werkt met muis,
  touch en toetsenbord (pijltjes, Home/End). Op mobiel kies je onderdelen via een horizontale selector.
- **Animaties:** Motion voor het onthullen van koppen en het wisselen van panelen; CSS voor de hero, zodat
  de belangrijkste tekst niet op JavaScript hoeft te wachten. `prefers-reduced-motion` zet alles uit.
- **Iconen:** een handvol inline iconen in Lucide-stijl (`src/components/ui/Icons.tsx`) in plaats van een
  hele iconenbibliotheek.
- **SEO:** metadata, Open Graph-afbeelding (`src/app/opengraph-image.tsx`), `sitemap.xml`, `robots.txt`
  en schema.org `AutoRepair`-data met alleen bevestigde gegevens (`src/lib/structured-data.ts`).
