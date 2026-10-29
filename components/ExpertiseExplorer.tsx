"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { expertise } from "@/lib/content";
import { imgProps } from "@/lib/media";
import { Arrow } from "./ui";

/**
 * Desktop: a large index list; hovering, focusing or clicking a row swaps
 * the illustration and summary on the right.
 * Mobile: an accessible accordion (one button per discipline).
 */
export function ExpertiseExplorer() {
  const [active, setActive] = useState(0);
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const uid = useId();
  const current = expertise[active];

  return (
    <>
      {/* ——— Desktop ——— */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-12">
        <ol className="col-span-7 border-t border-line-dark" role="list">
          {expertise.map((e, i) => {
            const on = i === active;
            return (
              <li key={e.slug} className="border-b border-line-dark">
                <Link
                  href={`/expertise/#${e.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-describedby={on ? `${uid}-summary` : undefined}
                  className="group grid grid-cols-[4rem_1fr_auto] items-baseline gap-4 py-6 xl:py-7"
                >
                  <span className={`font-mono text-sm transition-colors duration-300 ${on ? "text-red" : "text-steel"}`}>
                    {e.n}
                  </span>
                  <span
                    className={`headline text-[2rem] transition-[color,transform] duration-500 ease-out-quart xl:text-[2.6rem] ${
                      on ? "translate-x-2 text-paper" : "text-paper/45 group-hover:text-paper/80"
                    }`}
                  >
                    {e.title}
                  </span>
                  <Arrow
                    className={`h-6 w-6 self-center transition-[opacity,transform,color] duration-300 ${
                      on ? "translate-x-0 text-red opacity-100" : "-translate-x-2 opacity-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ol>

        <div className="col-span-5">
          <div className="sticky top-28">
            {/* photo panel only when this discipline has a stored photo; otherwise a typographic panel */}
            <div className={`photo relative aspect-[4/5] overflow-hidden ${imgProps(current.image) ? "" : "hidden"}`}>
              {expertise.map((e, i) => {
                const m = imgProps(e.image, 1080, 1440);
                if (!m) return null;
                return (
                  <img
                    key={e.slug}
                    src={m.src}
                    srcSet={m.srcSet}
                    data-fb={m["data-fb"]}
                    sizes="(min-width: 1536px) 560px, 38vw"
                    alt={i === active ? m.alt : ""}
                    aria-hidden={i !== active}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: m.position }}
                    className={`absolute inset-0 h-full w-full object-cover text-transparent transition-[opacity,transform] duration-700 ease-out-quart ${
                      i === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
                    }`}
                  />
                );
              })}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite/70 via-transparent to-transparent" />
              <span className="absolute top-4 left-4 font-mono text-[0.6rem] tracking-[0.14em] text-paper/70 uppercase">
                Illustrative image
              </span>
              <span className="headline absolute right-5 bottom-3 text-[6rem] leading-none text-paper/90" aria-hidden="true">
                {current.n}
              </span>
            </div>
            {!imgProps(current.image) && (
              <div className="border-t border-line-dark pt-6">
                <span className="display block text-[10rem] leading-none text-red" aria-hidden="true">
                  {current.n}
                </span>
                <p className="headline mt-6 text-[2rem] text-paper">{current.title}</p>
              </div>
            )}
            <p id={`${uid}-summary`} className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-paper/75">
              {current.short}
            </p>
          </div>
        </div>
      </div>

      {/* ——— Mobile / tablet accordion ——— */}
      <ul className="border-t border-line-dark lg:hidden">
        {expertise.map((e, i) => {
          const isOpen = openIdx === i;
          const m = imgProps(e.image, 768, 1080);
          return (
            <li key={e.slug} className="border-b border-line-dark">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${uid}-panel-${i}`}
                  id={`${uid}-btn-${i}`}
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="grid w-full grid-cols-[2.75rem_1fr_1.5rem] items-center gap-2 py-5 text-left"
                >
                  <span className={`font-mono text-xs ${isOpen ? "text-red" : "text-steel"}`}>{e.n}</span>
                  <span className={`headline text-[1.45rem] xs:text-[1.6rem] sm:text-[2rem] ${isOpen ? "text-paper" : "text-paper/75"}`}>
                    {e.title}
                  </span>
                  <span aria-hidden="true" className="relative h-4 w-4 justify-self-end text-red">
                    <span className="absolute top-1/2 left-0 h-px w-4 bg-current" />
                    <span
                      className={`absolute top-0 left-1/2 h-4 w-px bg-current transition-transform duration-300 ${isOpen ? "scale-y-0" : ""}`}
                    />
                  </span>
                </button>
              </h3>
              <div
                id={`${uid}-panel-${i}`}
                role="region"
                aria-labelledby={`${uid}-btn-${i}`}
                className={`grid transition-[grid-template-rows] duration-500 ease-out-quart ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                inert={!isOpen}
              >
                <div className="overflow-hidden">
                  <div className={`pb-7 sm:pl-[2.75rem] ${m ? "sm:grid sm:grid-cols-2 sm:gap-6" : ""}`}>
                    {m && (
                    <div className="photo relative aspect-[16/10] overflow-hidden">
                      {isOpen && (
                        <img
                          src={m.src}
                          srcSet={m.srcSet}
                          data-fb={m["data-fb"]}
                          sizes="(min-width: 640px) 45vw, 100vw"
                          alt={m.alt}
                          loading="lazy"
                          decoding="async"
                          style={{ objectPosition: m.position }}
                          className="absolute inset-0 h-full w-full object-cover text-transparent"
                        />
                      )}
                      <span className="absolute top-3 left-3 font-mono text-[0.58rem] tracking-[0.14em] text-paper/75 uppercase">
                        Illustrative image
                      </span>
                    </div>
                    )}
                    <div className={m ? "mt-5 sm:mt-0" : ""}>
                      <p className="leading-relaxed text-paper/80">{e.short}</p>
                      <Link
                        href={`/expertise/#${e.slug}`}
                        className="group mt-5 inline-flex min-h-11 items-center gap-3 text-paper"
                      >
                        <span className="ulink">Scope of work</span>
                        <Arrow className="text-red transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
