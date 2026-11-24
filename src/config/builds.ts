import type { SiteImage } from "./images";
import type { DrawingCrop } from "./drawing";

/**
 * ─────────────────────────────────────────────────────────────
 *  HONDA BUILDS
 *  `styles` = inspirerende bouwstijlen (géén uitgevoerde projecten).
 *  `projects` = echte projecten van DVM Performance. Leeg totdat de
 *  eigenaar projecten aanlevert. Zodra er één project in staat,
 *  verschijnt automatisch het blok "Projecten uit de werkplaats".
 * ─────────────────────────────────────────────────────────────
 */

export type BuildStyle = {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  crop: DrawingCrop;
  image: SiteImage;
};

export type Project = {
  id: string;
  /** bijv. "Honda Civic EK4" */
  model: string;
  /** bijv. 1998 */
  year: number;
  work: string[];
  description: string;
  before?: SiteImage;
  after?: SiteImage;
  /** Alleen door de eigenaar bevestigde specificaties invullen. */
  specs?: { label: string; value: string }[];
  gallery?: SiteImage[];
  cover: SiteImage;
};

export const buildStyles: BuildStyle[] = [
  {
    id: "street",
    title: "Street Build",
    description:
      "Een Civic die je dagelijks rijdt, maar die net wat lager staat, beter stuurt en meer van jou is.",
    keywords: ["Onderstel", "Velgen", "Inlaat & uitlaat"],
    crop: "full",
    image: {
      src: null,
      alt: "Inspiratie: verlaagde Honda Civic EK op een Europese weg",
      brief: "Verlaagde Civic EK, Europese weg, bewolkt",
      inspiration: true,
    },
  },
  {
    id: "oem-plus",
    title: "OEM+ Restoration",
    description:
      "Terug naar hoe Honda het bedoelde, met hier en daar een onderdeel dat het net beter maakt.",
    keywords: ["Restauratie", "Originele onderdelen", "Details"],
    crop: "rear",
    image: {
      src: null,
      alt: "Inspiratie: gerestaureerde Honda Civic EG in originele staat",
      brief: "Strak gerestaureerde Civic EG, bakstenen pand",
      inspiration: true,
    },
  },
  {
    id: "performance",
    title: "Performance Build",
    description:
      "Motor, onderstel en remmen als één geheel opgebouwd, met een duidelijk doel voor ogen.",
    keywords: ["Motor", "Remmen", "Onderstel"],
    crop: "engine",
    image: {
      src: null,
      alt: "Inspiratie: Honda Civic met B-serie motor en open motorkap",
      brief: "Open motorkap, B-serie, werkplaats",
      inspiration: true,
    },
  },
];

export const projects: Project[] = [
  // Voorbeeld (uitcommentariëren en invullen zodra er een echt project is):
  // {
  //   id: "ek4-street",
  //   model: "Honda Civic EK4",
  //   year: 1998,
  //   work: ["Schroefset", "Velgen", "Onderhoud"],
  //   description: "Korte omschrijving van het project.",
  //   cover: { src: "/images/builds/ek4-cover.jpg", alt: "Honda Civic EK4 na de build", brief: "" },
  //   before: { src: "/images/builds/ek4-voor.jpg", alt: "Voor", brief: "" },
  //   after: { src: "/images/builds/ek4-na.jpg", alt: "Na", brief: "" },
  //   specs: [{ label: "Motor", value: "B16A2" }],
  //   gallery: [],
  // },
];
