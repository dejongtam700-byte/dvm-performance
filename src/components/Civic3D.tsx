"use client";

import { useEffect, useRef } from "react";

/**
 * 3D-draadmodel van een jaren-90 Civic hatchback (EG/EK-silhouet), zonder 3D-bibliotheek:
 * eigen geometrie + perspectiefprojectie op een <canvas>. ±10 kB, geen dependencies.
 *
 * - draait langzaam rond, slepen met muis/vinger draait mee (met naloop)
 * - pijltjestoetsen draaien als het model focus heeft
 * - stopt met tekenen buiten beeld; geen autorotatie bij prefers-reduced-motion
 *
 * Coördinaten volgen de 2D-tekening (CivicDrawing): x = lengte (0–1000), y = tekening-y
 * (grond op 340), z = breedte. Hieronder omgezet naar een 3D-ruimte met Y omhoog.
 */

type V3 = [number, number, number];
type Tone = "body" | "detail" | "red" | "ground" | "wheel";
type Line = { pts: V3[]; tone: Tone; closed?: boolean; fill?: string };
/** Een vlak (gevuld, met lichtval) met daarop getekende details. */
type Face = { kind: "face"; pts: V3[]; decals: Line[]; edges?: boolean };
/** Een groep (wiel) die als geheel op diepte wordt gesorteerd. */
type Group = { kind: "group"; lines: Line[]; center: V3 };
type Item = Face | Group;

const GROUND = 340;
const to3 = (x: number, y: number, z: number): V3 => [x - 500, GROUND - y, z];

/** halve breedte: smaller bij de ruiten (tumblehome) en afgerond bij neus en staart */
function halfWidth(x: number, y: number) {
  const base = y >= 190 ? 172 : 172 - (190 - y) * 0.34;
  const taper = x < 120 ? (120 - x) * 0.9 : x > 890 ? (x - 890) * 0.9 : 0;
  return base - taper;
}
const side = (pts: [number, number][], s: number, inset = 0): V3[] => pts.map(([x, y]) => to3(x, y, s * (halfWidth(x, y) - inset)));

function arch(cx: number, from: [number, number], to: [number, number]): [number, number][] {
  const cy = 282, r = 80, out: [number, number][] = [from];
  for (let a = 2.95; a <= 6.47; a += 0.16) out.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  out.push(to);
  return out;
}

const TOP: [number, number][] = [
  [80, 300], [68, 262], [72, 232], [92, 222], [150, 215], [220, 206], [330, 192], [400, 142], [470, 92],
  [540, 84], [620, 82], [700, 83], [760, 88], [820, 118], [885, 150], [912, 168], [922, 200], [924, 250], [922, 292], [905, 305],
];
const BOTTOM: [number, number][] = [
  [80, 300], ...arch(245, [167, 300], [323, 300]), ...arch(787, [709, 302], [865, 302]), [905, 305],
];

function buildModel(): { ground: Line[]; items: Item[] } {
  const items: Item[] = [];

  // zijpanelen met details
  for (const s of [-1, 1]) {
    const outline = [...side(TOP, s), ...side(BOTTOM, s).reverse().slice(1, -1)];
    items.push({
      kind: "face",
      pts: outline,
      edges: true,
      decals: [
        { pts: side([[352, 188], [478, 104], [735, 99], [818, 168], [820, 184]], s, 1), tone: "detail", closed: true, fill: "glass" },
        { pts: side([[606, 96], [616, 96], [618, 186], [608, 187]], s, 1), tone: "detail", closed: true, fill: "body" },
        { pts: side([[338, 194], [332, 296], [628, 298], [622, 186]], s, 0.5), tone: "detail" },
        { pts: side([[82, 250], [166, 250]], s), tone: "detail" },
        { pts: side([[330, 250], [708, 252]], s), tone: "detail" },
        { pts: side([[868, 252], [921, 252]], s), tone: "detail" },
        { pts: side([[568, 208], [600, 208]], s), tone: "body" },
        { pts: side([[78, 234], [94, 224], [150, 219], [150, 233]], s, 0.5), tone: "detail", closed: true, fill: "light" },
        { pts: side([[893, 166], [914, 172], [921, 228], [902, 226]], s, 0.5), tone: "red", closed: true, fill: "red" },
      ],
    });
  }

  // dak, motorkap, neus en achterklep als stroken tussen links en rechts
  for (let i = 0; i < TOP.length - 1; i++) {
    const [x1, y1] = TOP[i], [x2, y2] = TOP[i + 1];
    const w1 = halfWidth(x1, y1), w2 = halfWidth(x2, y2);
    const strip: Face = { kind: "face", pts: [to3(x1, y1, -w1), to3(x2, y2, -w2), to3(x2, y2, w2), to3(x1, y1, w1)], decals: [], edges: true };
    // voorruit en achterruit als glas
    if (x1 >= 330 && x2 <= 470) strip.decals.push({ pts: [to3(x1 + 4, y1 - 3, -w1 + 12), to3(x2 + 2, y2 + 3, -w2 + 12), to3(x2 + 2, y2 + 3, w2 - 12), to3(x1 + 4, y1 - 3, w1 - 12)], tone: "detail", closed: true, fill: "glass" });
    if (x1 >= 760 && x2 <= 885) strip.decals.push({ pts: [to3(x1 + 3, y1 + 3, -w1 + 14), to3(x2 - 3, y2 - 1, -w2 + 14), to3(x2 - 3, y2 - 1, w2 - 14), to3(x1 + 3, y1 + 3, w1 - 14)], tone: "detail", closed: true, fill: "glass" });
    // neus: koplampen en grille
    if (i === 1) {
      const fx = (y: number) => 68 + (262 - y) * (4 / 30) - 1;
      for (const sgn of [-1, 1]) {
        strip.decals.push({ pts: [to3(fx(239), 239, sgn * 62), to3(fx(239), 239, sgn * 138), to3(fx(252), 252, sgn * 132), to3(fx(252), 252, sgn * 62)], tone: "detail", closed: true, fill: "light" });
      }
      strip.decals.push({ pts: [to3(fx(244), 244, -48), to3(fx(244), 244, 48)], tone: "detail" }, { pts: [to3(fx(249), 249, -48), to3(fx(249), 249, 48)], tone: "detail" });
    }
    // staart: achterlichten en (Europees, leeg) kentekenvlak
    if (i === 16) {
      const fx = (y: number) => 922 + (y - 200) * (2 / 50) + 1;
      for (const sgn of [-1, 1]) {
        strip.decals.push({ pts: [to3(fx(204), 204, sgn * 92), to3(fx(204), 204, sgn * 150), to3(fx(228), 228, sgn * 146), to3(fx(228), 228, sgn * 92)], tone: "red", closed: true, fill: "red" });
      }
      strip.decals.push({ pts: [to3(fx(233), 233, -56), to3(fx(233), 233, 56), to3(fx(246), 246, 56), to3(fx(246), 246, -56)], tone: "detail", closed: true });
    }
    items.push(strip);
  }

  // wielen
  const seg = 28;
  for (const wx of [245, 787]) {
    for (const s of [-1, 1]) {
      const zi = s * 118, zo = s * 166;
      const ring = (r: number, z: number): V3[] => Array.from({ length: seg }, (_, i) => {
        const a = (i / seg) * Math.PI * 2;
        return to3(wx + r * Math.cos(a), 278 + r * Math.sin(a), z);
      });
      const lines: Line[] = [{ pts: ring(62, zi), tone: "wheel", closed: true, fill: "tire" }];
      for (let i = 0; i < 16; i++) {
        const a = (i / 16) * Math.PI * 2;
        lines.push({ pts: [to3(wx + 62 * Math.cos(a), 278 + 62 * Math.sin(a), zi), to3(wx + 62 * Math.cos(a), 278 + 62 * Math.sin(a), zo)], tone: "ground" });
      }
      lines.push({ pts: ring(62, zo), tone: "wheel", closed: true, fill: "tire" });
      lines.push({ pts: ring(45, zo), tone: "wheel", closed: true, fill: "rim" });
      lines.push({ pts: ring(9, zo), tone: "wheel", closed: true });
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
        lines.push({ pts: [to3(wx + 11 * Math.cos(a), 278 + 11 * Math.sin(a), zo), to3(wx + 42 * Math.cos(a), 278 + 42 * Math.sin(a), zo)], tone: "wheel" });
      }
      // far-side wielen: binnenkant en buitenkant omdraaien zodat de buitenkant als laatste komt
      items.push({ kind: "group", lines, center: to3(wx, 278, s * 142) });
    }
  }

  // draaiplateau op de grond
  const ground: Line[] = [];
  const R = 540;
  ground.push({ pts: Array.from({ length: 96 }, (_, i) => { const a = (i / 96) * Math.PI * 2; return [Math.cos(a) * R, 0, Math.sin(a) * R] as V3; }), tone: "ground", closed: true });
  for (let i = 0; i < 48; i++) {
    const a = (i / 48) * Math.PI * 2, r2 = i % 12 === 0 ? R + 50 : R + 22;
    ground.push({ pts: [[Math.cos(a) * R, 0, Math.sin(a) * R], [Math.cos(a) * r2, 0, Math.sin(a) * r2]], tone: "ground" });
  }
  ground.push({ pts: [[-R, 0, 0], [R, 0, 0]], tone: "ground" }, { pts: [[0, 0, -R], [0, 0, R]], tone: "ground" });
  return { ground, items };
}

const MODEL = buildModel();
const TILT = 0.32;         // camera iets van boven
const CAM = 2000;          // camera-afstand (perspectief)
const START = -0.62;       // driekwart vooraanzicht
const LIGHT: V3 = (() => { const v: V3 = [-0.45, 0.75, 0.5]; const n = Math.hypot(...v); return [v[0] / n, v[1] / n, v[2] / n]; })();

export function Civic3D({ className = "", label = "3D-model van een Honda Civic hatchback uit de jaren 90. Sleep om te draaien." }: { className?: string; label?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let angle = START, velocity = 0, dragging = false, lastX = 0, lastT = 0;
    let visible = true, raf = 0, w = 0, h = 0, dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      draw();
    };

    const draw = () => {
      if (!w || !h) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const cos = Math.cos(angle), sin = Math.sin(angle), ct = Math.cos(TILT), st = Math.sin(TILT);
      const k = Math.min(w / 1100, h / 470);
      const cx = w / 2, cy = h * 0.52;
      // naar camera-ruimte
      const cam = ([X, Y, Z]: V3): V3 => {
        const x1 = X * cos + Z * sin;
        const z1 = -X * sin + Z * cos;
        const y1 = Y - 130;
        return [x1, y1 * ct - z1 * st, y1 * st + z1 * ct];
      };
      const scr = ([x, y, z]: V3) => { const f = CAM / (CAM - z); return [cx + x * f * k, cy - y * f * k] as const; };
      const nearOf = (z: number) => Math.max(0, Math.min(1, (z + 520) / 1040));

      const path = (pts: V3[], closed?: boolean) => {
        ctx.beginPath();
        pts.forEach((p, i) => { const [x, y] = scr(p); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); });
        if (closed) ctx.closePath();
      };
      const fills: Record<string, string> = { glass: "rgba(4,4,6,0.9)", body: "#141416", light: "rgba(244,244,245,0.14)", red: "rgba(198,40,40,0.75)", tire: "#060607", rim: "#121214" };
      const strokeLine = (l: Line, camPts: V3[]) => {
        const near = nearOf(camPts.reduce((a, p) => a + p[2], 0) / camPts.length);
        path(camPts, l.closed);
        if (l.fill) { ctx.fillStyle = fills[l.fill]; ctx.fill(); }
        const a = l.tone === "ground" ? 0.1 + near * 0.12 : l.tone === "detail" ? 0.25 + near * 0.45 : 0.4 + near * 0.6;
        ctx.strokeStyle = l.tone === "red" ? `rgba(224,64,63,${0.5 + near * 0.5})` : `rgba(244,244,245,${a})`;
        ctx.lineWidth = l.tone === "body" ? 1.4 : l.tone === "wheel" ? 1.1 : 0.9;
        ctx.stroke();
      };

      // grond eerst
      for (const g of MODEL.ground) strokeLine(g, g.pts.map(cam));

      // 1) wielen eerst (ver → dichtbij); de carrosserie dekt ze daarna af, behalve in de wielkasten
      const wheels = MODEL.items.filter((it): it is Group => it.kind === "group")
        .map((g) => ({ g, d: cam(g.center)[2] })).sort((a, b) => a.d - b.d);
      for (const { g } of wheels) {
        const ls = g.lines.map((l) => ({ l, c: l.pts.map(cam) }));
        const inner = ls[0], rest = ls.slice(1);
        const outerZ = rest[rest.length - 7].c[0][2];
        if (outerZ >= inner.c[0][2]) { strokeLine(inner.l, inner.c); for (const r of rest) strokeLine(r.l, r.c); }
        else { for (const r of rest) strokeLine(r.l, r.c); strokeLine(inner.l, inner.c); }
      }

      // 2) carrosserie: alleen vlakken die naar de camera wijzen (backface culling), ver → dichtbij
      const O = cam([0, 150, 0]);
      const faces = MODEL.items.filter((it): it is Face => it.kind === "face").map((f) => {
        const pts = f.pts.map(cam);
        let nx = 0, ny = 0, nz = 0, cxs = 0, cys = 0, czs = 0;
        for (let i = 0; i < pts.length; i++) {
          const [x1, y1, z1] = pts[i], [x2, y2, z2] = pts[(i + 1) % pts.length];
          nx += (y1 - y2) * (z1 + z2); ny += (z1 - z2) * (x1 + x2); nz += (x1 - x2) * (y1 + y2);
          cxs += x1; cys += y1; czs += z1;
        }
        const C: V3 = [cxs / pts.length, cys / pts.length, czs / pts.length];
        // normaal naar buiten richten
        if (nx * (C[0] - O[0]) + ny * (C[1] - O[1]) + nz * (C[2] - O[2]) < 0) { nx = -nx; ny = -ny; nz = -nz; }
        const facing = nx * -C[0] + ny * -C[1] + nz * (CAM - C[2]) > 0;
        return { f, pts, n: [nx, ny, nz] as V3, depth: C[2], facing };
      }).filter((x) => x.facing).sort((a, b) => a.depth - b.depth);

      for (const { f, pts, n } of faces) {
        const nl = Math.hypot(...n) || 1;
        const lit = Math.max(0, (n[0] * LIGHT[0] + n[1] * LIGHT[1] + n[2] * LIGHT[2]) / nl);
        const c = Math.round(14 + lit * 26);
        path(pts, true);
        ctx.fillStyle = `rgb(${c},${c},${c + 2})`;
        ctx.fill();
        if (f.edges) {
          ctx.strokeStyle = `rgba(244,244,245,${0.22 + nearOf(pts.reduce((a, p) => a + p[2], 0) / pts.length) * 0.55})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
        for (const d of f.decals) strokeLine(d, d.pts.map(cam));
      }
    };

    let prev = performance.now();
    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - prev) / 1000);
      prev = t;
      if (!dragging) {
        if (Math.abs(velocity) > 0.002) { angle += velocity * dt; velocity *= 0.94; }
        else if (!reduce) angle += 0.22 * dt;
      }
      draw();
      raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const start = () => { if (!raf && visible) { prev = performance.now(); raf = requestAnimationFrame(loop); } };

    const onDown = (e: PointerEvent) => {
      dragging = true; lastX = e.clientX; lastT = performance.now(); velocity = 0;
      canvas.setPointerCapture(e.pointerId);
      start();
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const now = performance.now(), dx = e.clientX - lastX;
      const delta = (dx / Math.max(w, 1)) * Math.PI * 1.6;
      angle += delta;
      velocity = delta / Math.max((now - lastT) / 1000, 0.008);
      lastX = e.clientX; lastT = now;
      if (reduce) draw();
    };
    const onUp = () => { dragging = false; velocity = Math.max(-6, Math.min(6, velocity)); };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        angle += e.key === "ArrowLeft" ? -0.2 : 0.2;
        velocity = 0;
        draw();
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(canvas);
    const onVis = () => { if (!document.hidden) start(); };
    document.addEventListener("visibilitychange", onVis);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("keydown", onKey);
    resize();
    start();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={label}
      tabIndex={0}
      className={`block h-full w-full cursor-grab touch-pan-y select-none outline-none active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-hi ${className}`}
    />
  );
}
