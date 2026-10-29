import { approach } from "@/lib/content";

/**
 * Define → Design → Build → Verify → Handover
 * Desktop: a horizontal "drawing" with a datum line, numbered nodes and
 * staggered columns. Mobile: a vertical sequence on a single rail.
 */
export function Approach({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  const line = dark ? "bg-line-dark" : "bg-line-light";
  const muted = dark ? "text-paper/70" : "text-graphite/70";
  const outcomeLabel = dark ? "text-steel" : "text-steel-dark";

  return (
    <>
      {/* Desktop */}
      <div className="relative hidden lg:block">
        <div aria-hidden="true" className={`absolute top-[2.15rem] right-0 left-0 h-px ${line}`} />
        <div aria-hidden="true" className="draw-line absolute top-[2.15rem] left-0 h-px w-full bg-red" />
        <ol className="relative grid grid-cols-5" role="list">
          {approach.map((s, i) => (
            <li key={s.n} className="relative pr-8">
              <p className="flex h-6 items-center gap-3 font-mono text-xs">
                <span className="text-red">{s.n}</span>
                {i < approach.length - 1 && (
                  <span aria-hidden="true" className={outcomeLabel}>
                    →
                  </span>
                )}
              </p>
              <span
                aria-hidden="true"
                className={`relative z-10 mt-[0.4rem] block h-3 w-3 -translate-x-[5.5px] border border-red ${dark ? "bg-graphite" : "bg-paper"}`}
              />
              <span
                aria-hidden="true"
                className={`absolute top-[2.4rem] left-0 w-px ${line}`}
                style={{ height: `${2 + i * 2.5}rem` }}
              />
              <div className="reveal pl-6" style={{ ["--d" as string]: `${200 + i * 120}ms`, paddingTop: `${2 + i * 2.5}rem` }}>
                <h3 className="headline text-[2.4rem] xl:text-[3rem]">{s.title}</h3>
                <p className={`mt-4 text-[0.98rem] leading-relaxed ${muted}`}>{s.body}</p>
                <p className={`eyebrow mt-8 ${outcomeLabel}`}>Outcome</p>
                <p className="mt-2 text-[0.98rem] font-medium leading-snug">{s.outcome}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Mobile */}
      <ol className={`relative lg:hidden before:absolute before:top-2 before:bottom-2 before:left-[5px] before:w-px ${dark ? "before:bg-line-dark" : "before:bg-line-light"}`} role="list">
        {approach.map((s, i) => (
          <li key={s.n} className="reveal relative pb-12 pl-10 last:pb-0" style={{ ["--d" as string]: `${i * 60}ms` }}>
            <span aria-hidden="true" className={`absolute top-2 left-0 h-[11px] w-[11px] border border-red ${dark ? "bg-graphite" : "bg-paper"}`} />
            <p className="font-mono text-xs text-red">{s.n}</p>
            <h3 className="headline mt-2 text-[2.25rem]">{s.title}</h3>
            <p className={`mt-3 leading-relaxed ${muted}`}>{s.body}</p>
            <p className={`mt-5 border-t pt-4 text-[0.95rem] ${dark ? "border-line-dark" : "border-line-light"}`}>
              <span className={`eyebrow mr-2 ${outcomeLabel}`}>Outcome</span>
              <span className="font-medium">{s.outcome}</span>
            </p>
          </li>
        ))}
      </ol>
    </>
  );
}
