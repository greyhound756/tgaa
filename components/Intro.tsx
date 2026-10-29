"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Logo intro (home page only, once per browser session).
 *
 * The VECHTEL wordmark flies along a curved flight path — dive, level out,
 * climb — banking with the direction of travel, and lands in the band of the
 * globe. Both layers are cut from the original logo artwork, so the landed
 * composition is the logo exactly.
 *
 * - Shown only when the boot script in layout.tsx adds `intro-on`
 *   (home page, first visit in the session, no reduced-motion preference;
 *   add ?intro to the URL to force it).
 * - Pure CSS animation, so it starts on first paint, before hydration.
 * - Skippable: button, Escape, click, scroll or touch.
 * - The hero entrance is paused (`intro-hold`) until the curtain lifts.
 */

// Flight path in the 500×500 stage coordinate system; the globe centre is (250, 250).
const FLIGHT = "M -620 -160 C -330 -170, -210 400, 40 390 C 180 384, 150 250, 250 250";

const LAND_AT = 2900; // ms after navigation start when the curtain lifts
const EXIT_MS = 750;

export function Intro() {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const exiting = useRef(false);

  const exit = useCallback(() => {
    if (exiting.current) return;
    exiting.current = true;
    const html = document.documentElement;
    rootRef.current?.classList.add("is-exit");
    html.classList.remove("intro-hold"); // hero entrance starts as the curtain lifts
    window.setTimeout(() => {
      html.classList.remove("intro-on");
      setDone(true);
    }, EXIT_MS);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (!html.classList.contains("intro-on")) {
      setDone(true);
      return;
    }
    try {
      sessionStorage.setItem("vechtel-intro", "1");
    } catch {}

    const fit = () => {
      const size = Math.min(window.innerWidth * 0.8, window.innerHeight * 0.62);
      html.style.setProperty("--intro-k", String(Math.min(size, 540) / 500));
    };
    fit();
    window.addEventListener("resize", fit);

    const t = window.setTimeout(exit, Math.max(400, LAND_AT - performance.now()));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter" || e.key.startsWith("Arrow") || e.key.startsWith("Page")) exit();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", exit, { passive: true });
    window.addEventListener("touchmove", exit, { passive: true });

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", fit);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", exit);
      window.removeEventListener("touchmove", exit);
    };
  }, [exit]);

  if (done) return null;

  return (
    <div ref={rootRef} className="intro" onClick={exit}>
      <div className="intro-bg" aria-hidden="true" />

      {/* drafting crosshair */}
      <div className="intro-cross intro-cross-h" aria-hidden="true" />
      <div className="intro-cross intro-cross-v" aria-hidden="true" />

      <div className="intro-stage" aria-hidden="true">
        <svg className="intro-trail" viewBox="0 0 500 500" width="500" height="500" fill="none">
          <path d={FLIGHT} pathLength={1} />
        </svg>
        <span className="intro-ring" />
        <img className="intro-globe" src="/brand/intro-globe.webp" alt="" width={500} height={500} decoding="sync" />
        <img className="intro-word intro-ghost intro-ghost-2" src="/brand/intro-wordmark.webp" alt="" width={500} height={500} />
        <img className="intro-word intro-ghost intro-ghost-1" src="/brand/intro-wordmark.webp" alt="" width={500} height={500} />
        <img className="intro-word intro-word-main" src="/brand/intro-wordmark.webp" alt="" width={500} height={500} decoding="sync" />
      </div>

      <p className="intro-caption" aria-hidden="true">
        Engineering &amp; Construction
        <span className="hidden text-red sm:inline"> · </span>
        <br className="sm:hidden" />
        Chicago, Illinois
      </p>

      <button
        type="button"
        className="intro-skip"
        onClick={(e) => {
          e.stopPropagation();
          exit();
        }}
      >
        Skip intro
      </button>
    </div>
  );
}

export const INTRO_FLIGHT = FLIGHT;
