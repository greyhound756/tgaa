import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { Button, Label, IllustrativeNote } from "@/components/ui";
import { sectors, expertise } from "@/lib/content";
import { hasPhoto } from "@/lib/media";

export const metadata: Metadata = {
  title: "Sectors",
  description:
    "Industrial & manufacturing, commercial buildings, and logistics & distribution facilities — the sectors VECHTEL Engineering & Construction serves.",
  alternates: { canonical: "/sectors/" },
};

const related: Record<string, string[]> = {
  "industrial-manufacturing": ["engineering-design", "procurement", "building-systems", "validation-testing"],
  "commercial-buildings": ["engineering-design", "construction-management", "building-systems", "commissioning-handover"],
  "logistics-distribution": ["construction-management", "procurement", "building-systems", "commissioning-handover"],
};

export default function SectorsPage() {
  return (
    <>
      <PageHero
        label="Sectors"
        title={["Facilities built", "around how", "they operate."]}
        intro={
          <p>
            Three facility types, three different sets of technical demands. Below are the challenges we plan for in
            each.
          </p>
        }
      >
        <p className="hero-fade mt-14 max-w-2xl border-l-2 border-red pl-4 text-sm leading-relaxed text-paper/60" style={{ ["--d" as string]: "600ms" }}>
          Photographs illustrate each sector in general and are not VECHTEL projects.
        </p>
      </PageHero>

      {sectors.map((s, i) => (
        <section
          key={s.slug}
          id={s.slug}
          aria-labelledby={`${s.slug}-title`}
          className={`scroll-mt-20 ${i % 2 === 0 ? "bg-paper" : "bg-paper-2"}`}
        >
          {/* Full-bleed photographic header */}
          <div className={`on-dark relative isolate overflow-hidden bg-graphite text-paper ${hasPhoto(s.image) ? "min-h-[26rem] lg:min-h-[38rem]" : ""}`}>
            <Photo name={s.image} parallax className="absolute inset-0 -z-20" sizes="100vw" />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-graphite/90 via-graphite/50 to-graphite/10" />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-graphite/80 to-transparent" />
            <div className={`shell flex flex-col justify-between py-10 lg:py-14 ${hasPhoto(s.image) ? "min-h-[26rem] lg:min-h-[38rem]" : "gap-16 lg:gap-24"}`}>
              <div className="flex items-center justify-between">
                <p className="eyebrow text-paper/80">
                  <span className="text-red">{s.n}</span> / 03
                </p>
                {hasPhoto(s.image) && <IllustrativeNote />}
              </div>
              <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
                <h2 id={`${s.slug}-title`} className="display reveal text-[clamp(2.75rem,7vw,7rem)] lg:col-span-8">
                  {s.title}
                </h2>
                <p className="reveal lede text-paper/85 lg:col-span-4 lg:pb-2">{s.lede}</p>
              </div>
            </div>
          </div>

          <div className="shell grid gap-14 py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
            <div className="lg:col-span-4">
              <Label n={s.n}>Facility types</Label>
              <ul className="mt-6 border-t border-graphite" role="list">
                {s.facilities.map((f) => (
                  <li key={f} className="border-b border-line-light py-4 text-lg">
                    {f}
                  </li>
                ))}
              </ul>
              <p className="eyebrow mt-12 text-steel-dark">Relevant expertise</p>
              <ul className="mt-4 flex flex-wrap gap-2" role="list">
                {related[s.slug].map((slug) => {
                  const e = expertise.find((x) => x.slug === slug)!;
                  return (
                    <li key={slug}>
                      <a
                        href={`/expertise/#${slug}`}
                        className="inline-flex min-h-10 items-center gap-2 border border-graphite/25 px-3 text-sm transition-colors hover:border-graphite hover:bg-graphite hover:text-paper"
                      >
                        <span className="font-mono text-[0.65rem] text-red">{e.n}</span>
                        {e.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <p className="eyebrow text-steel-dark">Typical challenges</p>
              <ol className="mt-6 grid gap-x-10 sm:grid-cols-2" role="list">
                {s.challenges.map((c, j) => (
                  <li key={c.title} className="reveal border-t border-graphite py-6" style={{ ["--d" as string]: `${(j % 2) * 100}ms` }}>
                    <p className="font-mono text-xs text-red">
                      {s.n}.{j + 1}
                    </p>
                    <h3 className="headline mt-3 text-[1.6rem]">{c.title}</h3>
                    <p className="mt-3 leading-relaxed text-graphite/75">{c.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      ))}

      <section className="on-dark bg-graphite py-20 text-paper lg:py-28">
        <div className="shell flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <p className="headline max-w-3xl text-[2.3rem] sm:text-[3.2rem]">
            Industrial, commercial or logistics — let’s discuss your facility.
          </p>
          <Button href="/contact/?type=project" className="shrink-0">
            Discuss a Project
          </Button>
        </div>
      </section>
    </>
  );
}
