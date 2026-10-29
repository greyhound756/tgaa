"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/content";
import { Logo } from "./Logo";
import { Arrow } from "./ui";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on navigation
  useEffect(() => setOpen(false), [pathname]);

  // Lock scroll, trap focus, close on Escape while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>("a[href], button") ?? []).concat(
        toggleRef.current ? [toggleRef.current] : [],
      );
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab") {
        const f = focusables();
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    const mq = window.matchMedia("(min-width: 64rem)");
    const onMq = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const isActive = (href: string) => pathname?.startsWith(href.replace(/\/$/, ""));
  const solid = scrolled || open;

  return (
    <header
      className={`on-dark fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ${
        solid
          ? "border-b border-line-dark bg-graphite shadow-[0_1px_0_rgba(0,0,0,0.2)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="absolute top-2 left-2 z-[60] -translate-y-24 bg-red px-4 py-2 text-sm text-white focus:translate-y-0"
      >
        Skip to content
      </a>
      {/* Full-screen mobile menu */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-0 overflow-y-auto bg-graphite pt-20 lg:hidden"
      >
        <nav aria-label="Mobile" className="shell flex min-h-full flex-col pt-6 pb-10">
          <ul className="border-t border-line-dark">
            {nav.map((item, i) => (
              <li key={item.href} className="border-b border-line-dark">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="hero-fade flex items-baseline justify-between gap-4 py-5 text-paper"
                  style={{ ["--d" as string]: `${60 + i * 50}ms` }}
                >
                  <span className="headline text-[2.25rem] xs:text-[2.6rem]">{item.label}</span>
                  <span className="font-mono text-xs text-red">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-10">
            <Link
              href="/contact/?type=project"
              className="group flex min-h-14 items-center justify-between bg-red px-5 text-base font-medium text-white"
            >
              Discuss a Project
              <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <p className="eyebrow mt-6 text-steel-light">{site.location}</p>
          </div>
        </nav>
      </div>
      <div className={`relative shell flex items-center justify-between transition-[height] duration-500 ${scrolled ? "h-[4.5rem]" : "h-20 lg:h-24"}`}>
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative py-2 text-[0.92rem] tracking-[0.01em] transition-colors duration-300 hover:text-paper ${
                    isActive(item.href) ? "text-paper" : "text-paper/75"
                  } after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-red after:transition-transform after:duration-500 after:ease-out-quart ${
                    isActive(item.href) ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact/?type=project"
            className="group hidden min-h-11 items-center gap-3 bg-red px-5 text-[0.9rem] font-medium text-white transition-colors duration-300 hover:bg-red-dark sm:inline-flex"
          >
            Discuss a Project
            <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="relative grid h-11 w-11 place-items-center text-paper lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              aria-hidden="true"
              className={`absolute h-px w-6 bg-current transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[4px]"}`}
            />
            <span
              aria-hidden="true"
              className={`absolute h-px w-6 bg-current transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[4px]"}`}
            />
          </button>
        </div>
      </div>

    </header>
  );
}
