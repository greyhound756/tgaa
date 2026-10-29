import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { Button, Label, IllustrativeNote } from "@/components/ui";
import { expertise } from "@/lib/content";
import { hasPhoto } from "@/lib/media";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Engineering & design, procurement, construction management, building systems, validation & testing, and commissioning & handover — delivered by VECHTEL Engineering & Construction.",
  alternates: { canonical: "/expertise/" },
};

export default function ExpertisePage() {
  return (
    <>
      <PageHero
        label="Expertise"
        title={["Six disciplines.", "One line of", "responsibility."]}
        intro={
          <p>
            Engage VECHTEL for a single discipline or the full sequence — from requirements and design to commissioned,
            documented systems.
          </p>
        }
      >
        <nav aria-label="Disciplines on this page" className="mt-16 border-t border-line-dark lg:mt-24">
          <ol className="grid sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3" role="list">
            {expertise.map((e, i) => (
              <li
                key={e.slug}
                className="hero-fade border-b border-line-dark"
                style={{ ["--d" as string]: `${500 + i * 50}ms` }}
              >
                <a href={`#${e.slug}`} className="group flex items-baseline gap-4 py-5 text-paper/80 hover:text-paper">
                  <span className="font-mono text-xs text-red">{e.n}</span>
                  <span className="ulink">{e.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </PageHero>

      <div className="bg-paper">
        {expertise.map((e, i) => {
          const flip = i % 2 === 1;
          return (
            <section
              key={e.slug}
              id={e.slug}
              aria-labelledby={`${e.slug}-title`}
              className="scroll-mt-24 border-b border-line-light py-20 last:border-b-0 lg:py-32"
            >
              <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
                <div className={hasPhoto(e.image) ? `lg:col-span-6 ${flip ? "lg:order-2 lg:col-start-7" : ""}` : "lg:col-span-8"}>
                  <div className="flex items-start justify-between gap-6">
                    <Label n={e.n}>Discipline</Label>
                    <span className="display -mt-3 text-[5rem] leading-none text-graphite/10 sm:text-[7rem]" aria-hidden="true">
                      {e.n}
                    </span>
                  </div>
                  <h2 id={`${e.slug}-title`} className="headline reveal mt-6 text-[2.4rem] sm:text-[3.2rem] lg:text-[3.8rem]">
                    {e.title}
                  </h2>
                  <p className="reveal lede mt-6 text-graphite">{e.short}</p>
                  <p className="reveal mt-6 leading-relaxed text-graphite/75">{e.body}</p>

                  <p className="eyebrow mt-12 text-steel-dark">Typical scope</p>
                  <ul className="mt-3 border-t border-graphite" role="list">
                    {e.scope.map((s, j) => (
                      <li key={s} className="reveal flex gap-4 border-b border-line-light py-4" style={{ ["--d" as string]: `${j * 60}ms` }}>
                        <span className="font-mono text-xs text-red tabular-nums">
                          {e.n}.{j + 1}
                        </span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {hasPhoto(e.image) && (
                  <figure className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>
                    <div className="reveal relative aspect-[4/5] lg:sticky lg:top-28">
                      <Photo name={e.image} parallax className="absolute inset-0" sizes="(min-width: 1024px) 40vw, 100vw" />
                      <IllustrativeNote className="absolute top-4 left-4" />
                    </div>
                  </figure>
                )}
              </div>
            </section>
          );
        })}
      </div>

      <section className="on-dark bg-graphite py-20 text-paper lg:py-28">
        <div className="shell flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <p className="headline max-w-3xl text-[2.3rem] sm:text-[3.2rem]">
            Need one discipline, or the full delivery? Tell us about the scope.
          </p>
          <Button href="/contact/?type=project" className="shrink-0">
            Discuss a Project
          </Button>
        </div>
      </section>
    </>
  );
}
