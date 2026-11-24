import { whatsappLink } from "@/config/site";
import { WhatsApp } from "./ui/Icons";

/** Zwevende WhatsApp-knop (alleen mobiel/tablet) — verschijnt pas als er een nummer is ingesteld. */
export function WhatsAppFloat() {
  const wa = whatsappLink();
  if (!wa) return null;
  return (
    <a
      href={wa}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Stuur DVM Performance een WhatsApp-bericht"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex h-14 w-14 items-center justify-center bg-[#1f8f4e] text-white shadow-[0_10px_30px_-10px_rgb(0_0_0/0.8)] transition-transform hover:scale-105 lg:hidden"
    >
      <WhatsApp className="h-7 w-7" />
    </a>
  );
}
