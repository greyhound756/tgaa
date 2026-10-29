import Link from "next/link";
import type { ReactNode } from "react";

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      className={`h-4 w-4 ${className}`}
    >
      <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="square" />
    </svg>
  );
}

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "red" | "ghost-light" | "ghost-dark" | "dark";
  className?: string;
};

const variants = {
  red: "bg-red text-white hover:bg-red-dark",
  dark: "bg-graphite text-paper hover:bg-graphite-3",
  "ghost-light": "border border-paper/40 text-paper hover:border-paper hover:bg-paper hover:text-graphite",
  "ghost-dark": "border border-graphite/30 text-graphite hover:border-graphite hover:bg-graphite hover:text-paper",
};

export function Button({ href, children, variant = "red", className = "" }: BtnProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-12 items-center justify-between gap-6 px-5 py-3 text-[0.95rem] font-medium tracking-[-0.005em] transition-colors duration-300 ${variants[variant]} ${className}`}
    >
      <span>{children}</span>
      <Arrow className="transition-transform duration-300 ease-out-quart group-hover:translate-x-1" />
    </Link>
  );
}

export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-3 font-medium ${className}`}>
      <span className="ulink pb-0.5">{children}</span>
      <Arrow className="text-red transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

/** Section index label: "02 — Company" with a technical tick mark */
export function Label({
  n,
  children,
  tone = "dark",
  className = "",
}: {
  n?: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={`eyebrow flex items-center gap-3 ${tone === "light" ? "text-steel-light" : "text-steel-dark"} ${className}`}
    >
      {n && <span className="text-red">{n}</span>}
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
      <span>{children}</span>
    </p>
  );
}

/** Wraps lines for the masked line-by-line headline reveal */
export function Lines({ lines, step = 90 }: { lines: ReactNode[]; step?: number }) {
  return (
    <>
      {lines.map((l, i) => (
        <span key={i} className="line-mask">
          <span style={{ ["--d" as string]: `${i * step}ms` }}>{l}</span>
        </span>
      ))}
    </>
  );
}

export function IllustrativeNote({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <span
      className={`font-mono text-[0.6rem] tracking-[0.14em] uppercase ${tone === "light" ? "text-paper/60" : "text-graphite/55"} ${className}`}
    >
      Illustrative image
    </span>
  );
}
