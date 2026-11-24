import { drawingCrops, type DrawingCrop } from "@/config/drawing";

type Props = {
  crop?: DrawingCrop;
  /** Maatlijnen en labels tonen (alleen zinvol bij volledige weergave). */
  annotations?: boolean;
  /** Lijnen intekenen bij laden. */
  animate?: boolean;
  /** Onderdeel dat rood oplicht. */
  highlight?: string | null;
  className?: string;
  title?: string;
  /** "meet" = hele uitsnede zichtbaar, "slice" = vult het kader (close-up). */
  fit?: "meet" | "slice";
};

const S = { vectorEffect: "non-scaling-stroke" as const };

/* Wiel met velg (5 spaken), remschijf en optioneel remklauw */
function Wheel({ cx, cy, caliper, hot }: { cx: number; cy: number; caliper?: boolean; hot?: { wheel: boolean; brake: boolean } }) {
  const spokes = Array.from({ length: 5 }, (_, i) => {
    const a = (i * 72 - 90) * (Math.PI / 180);
    return {
      x1: cx + Math.cos(a) * 12, y1: cy + Math.sin(a) * 12,
      x2: cx + Math.cos(a) * 41, y2: cy + Math.sin(a) * 41,
    };
  });
  const a1 = (-60 * Math.PI) / 180, a2 = (-10 * Math.PI) / 180;
  const p = (r: number, a: number) => `${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}`;
  const caliperPath = `M ${p(36, a1)} A 36 36 0 0 1 ${p(36, a2)} L ${p(23, a2)} A 23 23 0 0 0 ${p(23, a1)} Z`;
  return (
    <g>
      <circle cx={cx} cy={cy} r={62} pathLength={1} className={hot?.wheel ? "text-signal-hi" : undefined} stroke="currentColor" strokeWidth={1.6} fill="#09090b" {...S} />
      <circle cx={cx} cy={cy} r={56} pathLength={1} opacity={0.35} {...S} />
      <circle cx={cx} cy={cy} r={46} pathLength={1} className={hot?.wheel ? "text-signal-hi" : undefined} stroke="currentColor" {...S} />
      <circle cx={cx} cy={cy} r={34} pathLength={1} strokeDasharray="3 3" opacity={0.5} {...S} />
      {spokes.map((s, i) => (
        <line key={i} {...s} pathLength={1} strokeWidth={4} opacity={0.9} {...S} />
      ))}
      <circle cx={cx} cy={cy} r={9} pathLength={1} {...S} />
      {caliper && (
        <path d={caliperPath} pathLength={1} fill={hot?.brake ? "#c62828" : "#19191c"} stroke={hot?.brake ? "#e0403f" : "currentColor"} {...S} />
      )}
    </g>
  );
}

/**
 * Technische zijaanzicht-tekening van een jaren-90 Honda Civic hatchback (EG/EK-silhouet).
 * Coördinatenstelsel: 1000 × 400, grondlijn op y = 340, neus links.
 */
export function CivicDrawing({ crop = "full", annotations = false, animate = false, highlight = null, className, title, fit = "meet" }: Props) {
  const hot = (id: string) => highlight === id;
  const ghost = (id: string) => ({
    stroke: hot(id) ? "#e0403f" : "currentColor",
    opacity: hot(id) ? 1 : 0.38,
    strokeDasharray: hot(id) ? undefined : "4 4",
  });

  return (
    <svg
      viewBox={drawingCrops[crop]}
      preserveAspectRatio={`xMidYMid ${fit}`}
      className={[className, animate ? "draw-in" : ""].join(" ")}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    >

      {/* grond + schaduw */}
      <ellipse cx={500} cy={342} rx={470} ry={16} fill="#000" opacity={0.55} stroke="none" />
      <path d="M -200 340 H 1200" pathLength={1} opacity={0.35} {...S} />

      {/* ghost-onderdelen (röntgenblik) */}
      <g className="late">
        {/* motorblok + kleppendeksel */}
        <g {...ghost("motor")}>
          <path d="M 112 258 L 106 232 L 126 206 L 284 204 L 298 232 L 286 262 Z" pathLength={1} {...S} />
          <path d="M 134 214 H 276 M 140 222 H 270 M 146 230 H 262" pathLength={1} {...S} />
          <path d="M 296 222 C 316 214 322 236 304 244" pathLength={1} {...S} />
        </g>
        {/* veerpoten */}
        <g {...ghost("onderstel")}>
          <path d="M 252 266 L 262 206 M 256 254 l 10 -6 l -14 -6 l 14 -6 l -14 -6 l 14 -6 l -10 -6" pathLength={1} {...S} />
          <path d="M 787 266 L 787 204 M 787 252 l 10 -6 l -20 -6 l 20 -6 l -20 -6 l 20 -6 l -10 -6" pathLength={1} {...S} />
        </g>
        {/* interieur: stoel + stuur */}
        <g {...ghost("interieur")}>
          <path d="M 498 262 L 566 262 L 574 236 L 548 232 L 556 172 C 557 160 545 154 538 162 L 526 236 L 500 240 Z" pathLength={1} {...S} />
          <ellipse cx={444} cy={192} rx={6} ry={22} transform="rotate(-24 444 192)" pathLength={1} {...S} />
          <path d="M 448 204 L 470 226" pathLength={1} {...S} />
        </g>
      </g>

      {/* carrosserie */}
      <path
        d="M 80 300 C 66 292 63 252 72 232 L 92 222 L 330 192 L 470 92 C 520 82 700 80 760 88 L 885 150 L 912 168 C 925 200 928 250 922 292 L 905 305 L 865 302 A 80 80 0 1 0 709 302 L 323 300 A 80 80 0 1 0 167 300 Z"
        pathLength={1}
        strokeWidth={1.8}
        fill="#111113"
        {...S}
      />
      {/* ruiten */}
      <path d="M 352 188 L 478 104 C 530 95 680 93 735 99 L 818 168 L 820 184 Z" pathLength={1} fill="#09090b" {...S} />
      <path d="M 606 96 L 616 96 L 618 186 L 608 187 Z" pathLength={1} fill="#111113" {...S} />
      <path d="M 742 100 L 790 128 M 760 90 L 890 156" pathLength={1} opacity={0.5} {...S} />
      {/* deur, lijsten, sierlijnen */}
      <path d="M 338 194 L 332 296 L 628 298 L 622 186" pathLength={1} {...S} />
      <path d="M 82 250 L 166 250 M 330 250 L 708 252 M 868 252 L 921 252" pathLength={1} opacity={0.6} {...S} />
      <path d="M 336 290 L 704 292" pathLength={1} opacity={0.35} {...S} />
      <path d="M 76 262 L 167 262 M 868 268 L 925 266" pathLength={1} opacity={0.6} {...S} />
      {/* koplamp, achterlicht, spiegel, greep, tankklep */}
      <path d="M 78 234 L 94 224 L 150 219 L 150 233 Z" pathLength={1} fill="#19191c" {...S} />
      <path d="M 893 166 L 914 172 C 920 190 922 210 921 228 L 902 226 Z" pathLength={1} fill="rgb(198 40 40 / 0.55)" stroke="#e0403f" {...S} />
      <path d="M 354 186 L 372 172 L 392 174 L 386 190 Z" pathLength={1} fill="#19191c" {...S} />
      <path d="M 568 208 H 600" pathLength={1} strokeWidth={3} {...S} />
      <rect x={652} y={200} width={24} height={16} rx={2} pathLength={1} opacity={0.6} {...S} />
      {/* uitlaat */}
      <g stroke={hot("uitlaat") ? "#e0403f" : "currentColor"}>
        <path d="M 846 308 L 886 312" pathLength={1} {...S} />
        <ellipse cx={892} cy={313} rx={9} ry={6} pathLength={1} fill="#09090b" strokeWidth={hot("uitlaat") ? 2 : 1.25} {...S} />
      </g>

      {/* wielen */}
      <Wheel cx={245} cy={278} caliper hot={{ wheel: hot("wielen"), brake: hot("remmen") }} />
      <Wheel cx={787} cy={278} caliper />

      {annotations && (
        <g className="late" opacity={0.7} style={{ fontFamily: "var(--font-mono)" }} fontSize={10} letterSpacing={1.5} fill="currentColor" stroke="none">
          <g stroke="currentColor" fill="none">
            <path d="M 245 366 V 380 M 787 366 V 380 M 245 373 H 787" pathLength={1} {...S} />
            <path d="M 72 26 V 40 M 922 26 V 40 M 72 33 H 922" pathLength={1} opacity={0.6} {...S} />
            <path d="M 958 84 H 972 M 958 340 H 972 M 965 84 V 340" pathLength={1} opacity={0.6} {...S} />
          </g>
          <text x={516} y={392} textAnchor="middle">WIELBASIS</text>
          <text x={497} y={22} textAnchor="middle">LENGTE</text>
          <text x={984} y={212} textAnchor="middle" transform="rotate(90 984 212)">HOOGTE</text>
          <text x={245} y={392} textAnchor="middle">VA</text>
          <text x={787} y={392} textAnchor="middle">AA</text>
        </g>
      )}
    </svg>
  );
}
