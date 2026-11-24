/**
 * Uitsnedes van de technische Civic-tekening (viewBox 0 0 1000 400).
 * Wordt gebruikt als beeld zolang er geen foto is.
 */
export const DRAWING_SIZE = { w: 1000, h: 400 } as const;

export const drawingCrops = {
  canvas: "0 0 1000 400",
  full: "30 40 940 330",
  "full-wide": "-60 10 1120 390",
  engine: "50 150 340 175",
  nose: "40 165 450 195",
  "front-wheel": "140 190 220 150",
  "rear-wheel": "680 180 220 150",
  greenhouse: "300 60 600 230",
  rear: "700 70 260 270",
} as const;

export type DrawingCrop = keyof typeof drawingCrops;
