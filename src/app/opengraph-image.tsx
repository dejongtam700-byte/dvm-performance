import { ImageResponse } from "next/og";

export const alt = "DVM Performance — Honda Civic specialist in Gameren";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Typografische social-preview (geen foto nodig). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#09090B", color: "#F4F4F5", padding: 72, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, letterSpacing: 6, color: "#A1A1AA" }}>
          <div style={{ width: 14, height: 14, background: "#C62828" }} />
          HONDA SPECIALIST / GAMEREN, NL
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 150, fontWeight: 800, lineHeight: 0.9, letterSpacing: -2 }}>
          <span>JOUW HONDA.</span>
          <span>JOUW STIJL<span style={{ color: "#C62828" }}>.</span></span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, borderTop: "1px solid #29292D", paddingTop: 28 }}>
          <span style={{ fontWeight: 800 }}>DVM PERFORMANCE</span>
          <span style={{ color: "#A1A1AA" }}>Civic EG · EK · onderhoud · builds</span>
        </div>
      </div>
    ),
    size,
  );
}
