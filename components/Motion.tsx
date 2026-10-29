"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Site-wide, lightweight motion:
 *  - .reveal elements fade/rise in once when they enter the viewport
 *  - [data-parallax] images drift slightly against the scroll
 * Nothing hijacks scrolling; everything is disabled for reduced motion.
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-in), .draw-line:not(.is-in)"));

    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    reveals.forEach((el) => io.observe(el));

    const layers = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const el of layers) {
        const box = el.parentElement!.getBoundingClientRect();
        if (box.bottom < -100 || box.top > vh + 100) continue;
        const progress = (box.top + box.height / 2 - vh / 2) / (vh + box.height);
        el.style.setProperty("--py", `${(-progress * box.height * 0.12).toFixed(1)}px`);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
