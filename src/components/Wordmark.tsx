/**
 * Typografisch woordmerk DVM PERFORMANCE.
 * Een schuin rood "schakel"-streepje scheidt DVM en PERFORMANCE — verwijst
 * naar een schakelpatroon / gauge-naald zonder merklogo's te gebruiken.
 */
export function Wordmark({ size = "sm", className = "" }: { size?: "sm" | "xl"; className?: string }) {
  if (size === "xl") {
    // SVG met vaste tekstlengtes: past altijd exact op de breedte, op elk scherm.
    return (
      <svg viewBox="0 0 1000 118" className={`block h-auto w-full ${className}`} role="img" aria-label="DVM Performance">
        <text x="0" y="112" textLength="218" lengthAdjust="spacingAndGlyphs" style={{ fontFamily: "var(--font-display)" }} fontWeight="800" fontSize="150" fill="currentColor">DVM</text>
        <path d="M 256 14 L 276 14 L 252 112 L 232 112 Z" fill="#c62828" />
        <text x="292" y="112" textLength="706" lengthAdjust="spacingAndGlyphs" style={{ fontFamily: "var(--font-display)" }} fontWeight="700" fontSize="150" fill="none" stroke="currentColor" strokeWidth="1.6">PERFORMANCE</text>
      </svg>
    );
  }
  return (
    <span className={`flex items-center gap-2.5 ${className}`} aria-label="DVM Performance">
      <span aria-hidden className="font-display text-[26px] font-extrabold leading-none tracking-[-0.01em]">DVM</span>
      <span aria-hidden className="h-5 w-[3px] skew-x-[-18deg] bg-signal" />
      <span aria-hidden className="font-display text-[13px] font-semibold uppercase leading-none tracking-[0.32em] text-paper/85">
        Performance
      </span>
    </span>
  );
}
