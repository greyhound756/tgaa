import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Approach } from "@/components/Approach";
import { Photo } from "@/components/Photo";
import { Button, Label, Lines, TextLink, IllustrativeNote } from "@/components/ui";
import { expertise, sectors, site, company } from "@/lib/content";
import { Milestones } from "@/components/Milestones";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Founded in 2020 by Chris Vectol, VECHTEL Engineering & Construction is a Chicago-based company that integrates engineering, procurement, construction, testing and commissioning for industrial, commercial and logistics facilities.",
  alternates: { canonical: "/company/" },
};

const principles = [
  {
    title: "Requirements first",
    body: "We begin with how the facility has to perform — capacity, utilities, occupancy, compliance, future change — and design to that, not to a generic building.",
  },
  {
    title: "Disciplines coordinated early",
    body: "Architecture, structure, building systems and process equipment are coordinated in design, where changes are fast and inexpensive, instead of resolved in the field.",
  },
  {
    title: "Quality verified, not assumed",
    body: "Acceptance criteria are written before work starts. Equipment and systems are tested against them, and deviations are tracked to closure.",
  },
  {
    title: "Documentation is a deliverable",
    body: "Owners receive the records needed to operate and maintain what was built: test results, as-built information, manuals and training.",
  },
];

export default function CompanyPage() {
  return (
    <>
      <PageHero
        label="Company"
        title={["One team, from", "first drawing", "to handover."]}
        intro={
          <p>
            Founded in {company.founded} by {company.founder}, VECHTEL Engineering &amp; Construction integrates design,
            procurement, construction and commissioning for industrial, commercial and logistics facilities.
          </p>
        }
        image="steelFrame"
      />

      {/* What we do */}
      <section aria-labelledby="what-title" className="bg-paper py-24 lg:py-36">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Label n="01">What we do</Label>
          </div>
          <div className="lg:col-span-8">
            <h2 id="what-title" className="headline reveal text-[2.3rem] sm:text-[3rem] lg:text-[3.8rem]">
              <Lines lines={["We take responsibility for the", "whole path between a technical", "vision and a facility that works."]} />
            </h2>
            <div className="mt-12 grid gap-8 text-graphite/75 md:grid-cols-2">
              <p className="reveal leading-relaxed">
                Facilities fail at the interfaces — between design and construction, between equipment and the
                building that houses it, between “installed” and “working.” VECHTEL is organized to close those gaps:
                the people who design a system stay connected to how it is procured, built, tested and handed over.
              </p>
              <p className="reveal leading-relaxed" style={{ ["--d" as string]: "100ms" }}>
                Clients can engage us for a complete engineering-procurement-construction scope or for individual
                disciplines — from design and construction management to validation, testing and commissioning of
                systems built by others.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our story */}
      <section aria-labelledby="story-title" className="border-t border-line-light bg-paper py-24 lg:py-32">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Label n="02">Our story</Label>
            </div>
            <div className="lg:col-span-8">
              <h2 id="story-title" className="headline reveal text-[2.3rem] sm:text-[3rem] lg:text-[3.8rem]">
                <Lines lines={["A young company,", "built on real projects."]} />
              </h2>
              <p className="reveal mt-8 max-w-2xl leading-relaxed text-graphite/75">
                {company.founder} founded VECHTEL in {company.founded} to bring engineering, construction and
                commissioning together in one accountable team. In {company.founded + 1}, the company helped on the Ford
                Rouge Electric Vehicle Center in Dearborn, Michigan.
              </p>
            </div>
          </div>
          <div className="mt-16 lg:mt-20">
            <Milestones />
          </div>
        </div>
      </section>

      {/* Principles */}
      <section aria-labelledby="principles-title" className="border-t border-line-light bg-paper pb-24 lg:pb-36">
        <div className="shell pt-24 lg:pt-32">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Label n="03">How we work</Label>
            </div>
            <h2 id="principles-title" className="headline reveal text-[2.3rem] sm:text-[3rem] lg:col-span-8 lg:text-[3.8rem]">
              Four working principles.
            </h2>
          </div>
          <ol className="mt-16 grid border-t border-graphite md:grid-cols-2" role="list">
            {principles.map((p, i) => (
              <li
                key={p.title}
                className={`reveal border-b border-line-light py-10 md:px-10 ${i % 2 === 0 ? "md:border-r md:pl-0" : "md:pr-0"}`}
                style={{ ["--d" as string]: `${(i % 2) * 100}ms` }}
              >
                <div className="flex items-baseline gap-6">
                  <span className="font-mono text-sm text-red">0{i + 1}</span>
                  <h3 className="headline text-[1.8rem] sm:text-[2.2rem]">{p.title}</h3>
                </div>
                <p className="mt-5 max-w-lg leading-relaxed text-graphite/75 md:pl-12">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Approach */}
      <section aria-labelledby="approach-title" className="on-dark bg-graphite py-24 text-paper lg:py-36">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Label n="04" tone="light">
                Delivery model
              </Label>
              <h2 id="approach-title" className="headline reveal mt-8 text-[2.6rem] sm:text-[3.6rem] lg:text-[4.4rem]">
                <Lines lines={["Define. Design. Build.", "Verify. Handover."]} />
              </h2>
            </div>
            <p className="reveal leading-relaxed text-paper/70 lg:col-span-5 lg:pb-3">
              A single sequence, shared by every discipline, with a reviewable outcome at the end of each stage.
            </p>
          </div>
          <div className="mt-16 lg:mt-28">
            <Approach />
          </div>
        </div>
      </section>

      {/* Scope + base */}
      <section aria-labelledby="scope-title" className="bg-paper py-24 lg:py-36">
        <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Label n="05">Scope</Label>
            <h2 id="scope-title" className="headline reveal mt-8 text-[2.3rem] sm:text-[3rem] lg:text-[3.6rem]">
              What we deliver, and where we deliver it.
            </h2>
            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              <div className="reveal">
                <p className="eyebrow text-steel-dark">Disciplines</p>
                <ul className="mt-4 border-t border-line-light" role="list">
                  {expertise.map((e) => (
                    <li key={e.slug} className="border-b border-line-light">
                      <a href={`/expertise/#${e.slug}`} className="group flex items-baseline gap-3 py-3 hover:text-red">
                        <span className="font-mono text-xs text-red">{e.n}</span>
                        <span className="ulink">{e.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="reveal" style={{ ["--d" as string]: "100ms" }}>
                <p className="eyebrow text-steel-dark">Facility types</p>
                <ul className="mt-4 border-t border-line-light" role="list">
                  {sectors.flatMap((s) => s.facilities.slice(0, 2)).map((f) => (
                    <li key={f} className="border-b border-line-light py-3">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="reveal mt-14 flex flex-col gap-6 border-t border-graphite pt-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow text-steel-dark">Based in</p>
                <p className="headline mt-3 text-[2rem]">{site.location}</p>
              </div>
              <TextLink href="/sectors/" className="text-graphite">
                Sectors we serve
              </TextLink>
            </div>
          </div>
          <figure className="relative lg:col-span-5 lg:col-start-8">
            <div className="reveal relative aspect-[3/4]">
              <Photo name="crane" parallax className="absolute inset-0" sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
            <figcaption className="mt-3 flex justify-end">
              <IllustrativeNote tone="dark" />
            </figcaption>
          </figure>
        </div>
      </section>

      {/* CTA */}
      <section className="on-dark bg-graphite-2 text-paper">
        <div className="shell grid gap-px py-6 md:grid-cols-2">
          <div className="py-12 md:pr-12">
            <p className="eyebrow text-steel-light">Clients</p>
            <p className="headline mt-4 text-[2rem] sm:text-[2.6rem]">Planning a facility?</p>
            <Button href="/contact/?type=project" className="mt-8">
              Discuss a Project
            </Button>
          </div>
          <div className="border-t border-line-dark py-12 md:border-t-0 md:border-l md:pl-12">
            <p className="eyebrow text-steel-light">Candidates</p>
            <p className="headline mt-4 text-[2rem] sm:text-[2.6rem]">Looking for your next build?</p>
            <Button href="/careers/" variant="ghost-light" className="mt-8">
              View Careers
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
