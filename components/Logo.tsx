import Link from "next/link";

/**
 * The VECHTEL mark is used exactly as supplied. It sits on a square
 * white plate — a "stamp" on the drawing — so it reads cleanly on both
 * the graphite and warm-white surfaces without recolouring the artwork.
 */
export function LogoMark({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      className={`inline-grid shrink-0 place-items-center bg-white ${className}`}
      style={{ width: size, height: size, padding: Math.round(size * 0.06) }}
    >
      <img
        src="/brand/vechtel-logo-160.webp"
        srcSet="/brand/vechtel-logo-160.webp 160w, /brand/vechtel-logo-320.webp 320w, /brand/vechtel-logo-640.webp 640w"
        sizes={`${size}px`}
        width={size}
        height={size}
        alt=""
        className="h-full w-full object-contain"
      />
    </span>
  );
}

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3"
      aria-label="VECHTEL Engineering & Construction — home"
    >
      <LogoMark size={46} />
      <span
        className={`hidden flex-col leading-none sm:flex ${tone === "light" ? "text-paper" : "text-graphite"}`}
        aria-hidden="true"
      >
        <span className="text-[0.95rem] font-bold tracking-[0.08em] [font-stretch:80%]">VECHTEL</span>
        <span className={`mt-1 font-mono text-[0.6rem] tracking-[0.16em] uppercase ${tone === "light" ? "text-steel-light" : "text-steel-dark"}`}>
          Engineering &amp; Construction
        </span>
      </span>
    </Link>
  );
}
