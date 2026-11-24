import Image from "next/image";
import type { SiteImage } from "@/config/images";
import type { DrawingCrop } from "@/config/drawing";
import { CivicDrawing } from "../CivicDrawing";

type Props = {
  image: SiteImage;
  /** Uitsnede van de technische tekening als er (nog) geen foto is. */
  crop?: DrawingCrop;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Toon het "Inspiratie"-label op foto's die geen eigen werk zijn. */
  showInspirationTag?: boolean;
  /** Toon de beeldomschrijving in de placeholder (handig voor de eigenaar). */
  showBrief?: boolean;
};

/**
 * Eén plek voor alle beelden: toont de foto zodra `image.src` is ingevuld,
 * anders een vormgegeven technische placeholder. Zo hoeft er later alleen
 * in /src/config iets te veranderen.
 */
export function ImageSlot({ image, crop = "full", sizes = "100vw", priority, className = "", showInspirationTag = true, showBrief = true }: Props) {
  return (
    <div className={`group/img relative overflow-hidden bg-coal ${className}`}>
      {image.src ? (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover/img:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-transparent" />
        </>
      ) : (
        <div className="grain blueprint absolute inset-0 flex items-center justify-center" role="img" aria-label={image.alt}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgb(255_255_255/0.06),transparent_65%)]" />
          <CivicDrawing
            crop={crop}
            fit={crop.startsWith("full") ? "meet" : "slice"}
            className={`relative text-paper/80 ${crop.startsWith("full") ? "h-[78%] w-[88%]" : "h-full w-full"} transition-transform duration-[1200ms] ease-out-expo group-hover/img:scale-[1.04]`}
          />
          {/* hoekmarkeringen */}
          <span aria-hidden className="absolute left-3 top-3 h-3 w-3 border-l border-t border-paper/40" />
          <span aria-hidden className="absolute right-3 top-3 h-3 w-3 border-r border-t border-paper/40" />
          <span aria-hidden className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-paper/40" />
          <span aria-hidden className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-paper/40" />
          {showBrief && (
            <span className="tech absolute bottom-3 left-7 right-7 truncate text-[10px] text-mute/80">
              Foto volgt — {image.brief}
            </span>
          )}
        </div>
      )}
      {image.src && image.inspiration && showInspirationTag && (
        <span className="tech absolute right-3 top-3 bg-ink/80 px-2 py-1 text-[10px] text-paper">Inspiratie</span>
      )}
    </div>
  );
}
