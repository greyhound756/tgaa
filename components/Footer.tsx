import Link from "next/link";
import { nav, site, expertise, sectors } from "@/lib/content";
import { LogoMark } from "./Logo";
import { Arrow } from "./ui";

export function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-graphite text-paper">
      <div className="shell pt-20 pb-10 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow text-steel-light">Start a conversation</p>
            <p className="headline mt-6 max-w-[14ch] text-[2.5rem] sm:text-[3.5rem] lg:text-[4.25rem]">
              Have a facility to deliver?
            </p>
            <Link
              href="/contact/"
              className="group mt-10 inline-flex items-center gap-4 border-b border-paper/30 pb-2 text-lg transition-colors hover:border-red"
            >
              Contact VECHTEL
              <Arrow className="text-red transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6">
            <div>
              <p className="eyebrow text-steel">Company</p>
              <ul className="mt-5 space-y-3">
                {nav.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="ulink text-paper/80 hover:text-paper">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-steel">Expertise</p>
              <ul className="mt-5 space-y-3">
                {expertise.map((e) => (
                  <li key={e.slug}>
                    <Link href={`/expertise/#${e.slug}`} className="ulink text-paper/80 hover:text-paper">
                      {e.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="eyebrow text-steel">Sectors</p>
              <ul className="mt-5 space-y-3">
                {sectors.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/sectors/#${s.slug}`} className="ulink text-paper/80 hover:text-paper">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-20 flex flex-col gap-8 border-t border-line-dark pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <LogoMark size={56} />
            <div>
              <p className="font-medium">{site.name}</p>
              <p className="mt-1 font-mono text-xs tracking-[0.12em] text-steel-light uppercase">{site.location}</p>
            </div>
          </div>
          <p className="font-mono text-xs text-steel">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-steel">
        </p>
      </div>
    </footer>
  );
}
