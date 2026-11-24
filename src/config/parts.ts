import type { SiteImage } from "./images";
import type { DrawingCrop } from "./drawing";

/**
 * ─────────────────────────────────────────────────────────────
 *  "ELK DETAIL TELT" — hotspots op de technische tekening.
 *  x / y zijn coördinaten in de tekening (viewBox 0 0 1000 400),
 *  dus ze blijven altijd exact op hun plek, op elk scherm.
 * ─────────────────────────────────────────────────────────────
 */

export type CarPart = {
  id: string;
  label: string;
  code: string;
  x: number;
  y: number;
  title: string;
  text: string;
  crop: DrawingCrop;
  image: SiteImage;
};

export const parts: CarPart[] = [
  {
    id: "motor",
    label: "Motor",
    code: "ENG",
    x: 190,
    y: 214,
    title: "Het hart van de build",
    text: "Of het nu gaat om goed onderhoud van je D-serie of plannen voor een B-serie: we kijken eerst naar de staat van je motor en wat past bij jouw doel en budget.",
    crop: "engine",
    image: { src: null, alt: "Honda B-serie motor in een Civic EG", brief: "Motorruimte, B-serie", inspiration: true },
  },
  {
    id: "wielen",
    label: "Wielen",
    code: "WHL",
    x: 222,
    y: 326,
    title: "Maat, offset en passing",
    text: "De juiste velg en band maken of breken de stand van je Civic. We kijken samen naar maat, offset en hoe alles past bij je onderstel.",
    crop: "front-wheel",
    image: { src: null, alt: "Sportvelg op een Honda Civic EK", brief: "Sportvelg close-up, laag standpunt", inspiration: true },
  },
  {
    id: "remmen",
    label: "Remmen",
    code: "BRK",
    x: 266,
    y: 262,
    title: "Stoppen is net zo belangrijk",
    text: "Meer vermogen vraagt om remmen die het bijhouden. Van nieuwe blokken en schijven tot een upgrade van de complete remset.",
    crop: "front-wheel",
    image: { src: null, alt: "Remklauw en remschijf achter een velg", brief: "Remklauw achter spaakvelg", inspiration: true },
  },
  {
    id: "onderstel",
    label: "Onderstel",
    code: "SUS",
    x: 787,
    y: 222,
    title: "Stand en wegligging",
    text: "Een verlaagde Civic moet ook goed rijden. Schroefset, bussen en uitlijning stemmen we af op hoe jij de auto gebruikt.",
    crop: "rear-wheel",
    image: { src: null, alt: "Schroefset in de wielkast van een Civic", brief: "Wielkast met schroefset", inspiration: true },
  },
  {
    id: "uitlaat",
    label: "Uitlaat",
    code: "EXH",
    x: 892,
    y: 316,
    title: "Geluid met verstand",
    text: "Een uitlaat die bij je motor en je wensen past, en die je ook op de lange rit nog prettig vindt.",
    crop: "rear",
    image: { src: null, alt: "Uitlaateinde onder de achterbumper van een Civic", brief: "Uitlaateinde, achterbumper", inspiration: true },
  },
  {
    id: "interieur",
    label: "Interieur",
    code: "INT",
    x: 540,
    y: 150,
    title: "Waar jij zit",
    text: "Stoelen, stuur, schakelpook of gewoon alles weer netjes: het interieur is waar je je build elke rit beleeft.",
    crop: "greenhouse",
    image: { src: null, alt: "Interieur van een Honda Civic uit de jaren 90", brief: "Interieur: stuur, kuipstoelen, dashboard", inspiration: true },
  },
];
