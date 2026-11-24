import type { SiteImage } from "./images";
import type { DrawingCrop } from "./drawing";

/**
 * ─────────────────────────────────────────────────────────────
 *  DIENSTEN — voorlopige categorieën.
 *  Teksten, volgorde en aantal zijn vrij aan te passen totdat de
 *  eigenaar het definitieve aanbod bevestigt. `points` mag leeg blijven.
 * ─────────────────────────────────────────────────────────────
 */

export type Service = {
  id: string;
  title: string;
  summary: string;
  points: string[];
  /** Uitsnede van de technische tekening die als beeld dient zolang er geen foto is. */
  crop: DrawingCrop;
  image: SiteImage;
};

export const services: Service[] = [
  {
    id: "motor-performance",
    title: "Motor & Performance",
    summary: "Werkzaamheden gericht op het verbeteren en optimaliseren van jouw Honda.",
    points: ["B- en D-serie motoren", "Inlaat, uitlaat en afstelling", "Motorswaps in overleg"],
    crop: "engine",
    image: {
      src: null,
      alt: "Honda B-serie motorblok in de motorruimte van een Civic",
      brief: "B-serie motorblok, kleppendeksel, motorruimte EG/EK",
      inspiration: true,
    },
  },
  {
    id: "onderhoud-reparatie",
    title: "Onderhoud & Reparatie",
    summary: "Van regulier onderhoud tot het oplossen van technische problemen.",
    points: ["Periodiek onderhoud", "Storingen en diagnose", "Distributie, koppeling, remmen"],
    crop: "front-wheel",
    image: {
      src: null,
      alt: "Monteur werkt aan de voorwielophanging van een Honda Civic",
      brief: "Civic op de brug, wiel eraf, handen aan het werk",
      inspiration: true,
    },
  },
  {
    id: "restauratie",
    title: "Restauratie",
    summary: "Geef jouw klassieke Honda een nieuw leven.",
    points: ["Roest- en plaatwerk in overleg", "Originele onderdelen terugbrengen", "OEM-details"],
    crop: "full",
    image: {
      src: null,
      alt: "Honda Civic EG tijdens restauratie, deels gedemonteerd",
      brief: "Kaal of deels gedemonteerde Civic, betonvloer, werkplaatslicht",
      inspiration: true,
    },
  },
  {
    id: "onderstel-handling",
    title: "Onderstel & Handling",
    summary: "Verbeter de wegligging en het rijgedrag van jouw Civic.",
    points: ["Schroefsets en veren", "Bussen en stabilisatoren", "Uitlijnen"],
    crop: "rear-wheel",
    image: {
      src: null,
      alt: "Schroefset en wielophanging van een verlaagde Honda Civic",
      brief: "Close-up schroefset / wielkast, verlaagde Civic",
      inspiration: true,
    },
  },
  {
    id: "styling-modificaties",
    title: "Styling & Modificaties",
    summary: "Maak jouw Honda persoonlijk met passende aanpassingen.",
    points: ["Velgen en banden", "Interieur en stoelen", "Exterieurdetails"],
    crop: "greenhouse",
    image: {
      src: null,
      alt: "Zijaanzicht van een gemodificeerde Honda Civic met sportvelgen",
      brief: "Zijaanzicht gemodde Civic, sportvelgen, Europese weg",
      inspiration: true,
    },
  },
  {
    id: "complete-builds",
    title: "Complete Builds",
    summary: "Van een eerste idee naar een volledig samengesteld project.",
    points: ["Plan en budget samen bepalen", "Stap voor stap uitvoeren", "Eén aanspreekpunt"],
    crop: "full",
    image: {
      src: null,
      alt: "Volledig opgebouwde Honda Civic hatchback op een bedrijventerrein",
      brief: "Complete build, driekwart achter, bedrijventerrein, bewolkt",
      inspiration: true,
    },
  },
];
