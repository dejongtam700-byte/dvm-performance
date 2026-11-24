import type { ReactNode } from "react";
import { ArrowRight } from "./Icons";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  external?: boolean;
  icon?: ReactNode;
};

/** Hoekige knop met schuivende pijl. Primair = rood, ghost = dunne lijn. */
export function Button({ href, children, variant = "primary", className = "", external, icon }: Props) {
  const styles =
    variant === "primary"
      ? "bg-signal text-white hover:bg-signal-hi"
      : "border border-paper/25 text-paper hover:border-paper hover:bg-paper hover:text-ink";
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex min-h-[52px] items-center justify-between gap-6 px-6 font-display text-[17px] font-semibold uppercase tracking-[0.06em] transition-colors duration-300 ${styles} ${className}`}
    >
      <span className="whitespace-nowrap">{children}</span>
      <span className="relative flex h-5 w-5 overflow-hidden">
        <span className="flex transition-transform duration-500 ease-out-expo group-hover:translate-x-full">
          {icon ?? <ArrowRight />}
        </span>
        <span className="absolute inset-0 flex -translate-x-full transition-transform duration-500 ease-out-expo group-hover:translate-x-0">
          {icon ?? <ArrowRight />}
        </span>
      </span>
    </a>
  );
}
