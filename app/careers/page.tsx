import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { Arrow, Button, Label, Lines, IllustrativeNote } from "@/components/ui";
import { job } from "@/lib/content";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Careers at VECHTEL Engineering & Construction: engineering, validation and testing, and project delivery roles in the Chicago area.",
  alternates: { canonical: "/careers/" },
};

const teams = [
  {
    n: "01",
    title: "Engineers",
    body: "Design engineers turn operational requirements into coordinated designs across architectural, structural, mechanical, electrical and process disciplines — and stay involved as those designs are procured and built.",
  },
  {
    n: "02",
    title: "Validation & testing specialists",
    body: "Testing specialists write validation plans and test protocols, define acceptance criteria, witness and analyze tests, and manage non-conformances through to corrective action and closure.",
  },
  {
    n: "03",
    title: "Project teams",
    body: "Project and construction managers plan and sequence the work, coordinate trades and vendors, and keep safety, quality, cost and schedule in view from mobilization to handover.",
  },
];

const work = [
  ["Real technical problems", "Industrial plants, commercial buildings and logistics facilities, each with its own systems and constraints."],
  ["Design through to operation", "Work that does not stop at the drawing — you see how decisions perform when systems are tested and commissioned."],
  ["Cross-discipline teams", "Daily collaboration between design, construction, testing and client teams."],
  ["Field and office", "Time on site is part of the job: inspections, witnessing tests, resolving issues where the work happens."],
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        label="Careers"
        title={["Bring your", "expertise to the", "next build."]}
        intro={
          <p>
            We look for engineers, testing specialists and project professionals who want to see their work through —
            from the first calculation to a facility that runs.
          </p>
        }
        image="frameWorker"
      />

      {/* Teams */}
      <section aria-labelledby="teams-title" className="bg-paper py-24 lg:py-36">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Label n="01">The work</Label>
            </div>
            <h2 id="teams-title" className="headline reveal text-[2.3rem] sm:text-[3rem] lg:col-span-8 lg:text-[3.8rem]">
              <Lines lines={["Three kinds of expertise,", "one delivery team."]} />
            </h2>
          </div>
          <ol className="mt-16 grid border-t border-graphite lg:grid-cols-3" role="list">
            {teams.map((t, i) => (
              <li
                key={t.n}
                className="reveal border-b border-line-light py-10 lg:border-b-0 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0"
                style={{ ["--d" as string]: `${i * 100}ms` }}
              >
                <p className="font-mono text-xs text-red">{t.n}</p>
                <h3 className="headline mt-4 text-[1.9rem] sm:text-[2.2rem]">{t.title}</h3>
                <p className="mt-4 leading-relaxed text-graphite/75">{t.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What to expect */}
      <section aria-labelledby="expect-title" className="on-dark bg-graphite py-24 text-paper lg:py-36">
        <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Label n="02" tone="light">
              What to expect
            </Label>
            <h2 id="expect-title" className="headline reveal mt-8 text-[2.3rem] sm:text-[3rem] lg:text-[3.6rem]">
              Work where design meets the field.
            </h2>
            <div className="reveal relative mt-12 aspect-[4/3]">
              <Photo name="pipework" parallax className="absolute inset-0" sizes="(min-width: 1024px) 40vw, 100vw" />
              <IllustrativeNote className="absolute top-4 left-4" />
            </div>
          </div>
          <ul className="border-t border-line-dark lg:col-span-6 lg:col-start-7 lg:mt-28" role="list">
            {work.map(([t, d], i) => (
              <li key={t} className="reveal border-b border-line-dark py-8" style={{ ["--d" as string]: `${i * 70}ms` }}>
                <h3 className="headline text-[1.6rem] sm:text-[1.9rem]">{t}</h3>
                <p className="mt-3 leading-relaxed text-paper/70">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Open positions */}
      <section aria-labelledby="open-title" className="bg-paper py-24 lg:py-36">
        <div className="shell">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Label n="03">Open positions</Label>
              <h2 id="open-title" className="headline reveal mt-8 text-[2.3rem] sm:text-[3rem] lg:text-[3.8rem]">
                Current openings
              </h2>
            </div>
            <p className="font-mono text-sm text-steel-dark">1 position</p>
          </div>

          <ul className="mt-12 border-t border-graphite" role="list">
            <li>
              <Link
                href={`/careers/${job.slug}/`}
                className="group grid gap-6 border-b border-line-light py-8 transition-colors duration-300 hover:bg-graphite hover:text-paper sm:px-4 lg:grid-cols-12 lg:items-center lg:px-6"
              >
                <div className="lg:col-span-6">
                  <p className="eyebrow text-red">{job.discipline}</p>
                  <p className="headline mt-3 text-[1.9rem] sm:text-[2.6rem]">{job.title}</p>
                </div>
                <dl className="grid gap-4 text-sm sm:grid-cols-2 lg:col-span-5">
                  <div>
                    <dt className="eyebrow opacity-60">Location</dt>
                    <dd className="mt-1.5">{job.location}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow opacity-60">Work arrangement</dt>
                    <dd className="mt-1.5">{job.arrangement}</dd>
                  </div>
                </dl>
                <span className="flex items-center gap-3 lg:col-span-1 lg:justify-end">
                  <span className="text-sm lg:sr-only">View role</span>
                  <Arrow className="h-6 w-6 text-red transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          </ul>

          <div className="mt-16 grid gap-8 border border-graphite/20 p-6 sm:p-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <p className="headline text-[1.7rem] sm:text-[2.1rem]">Don’t see your role?</p>
              <p className="mt-3 max-w-2xl leading-relaxed text-graphite/75">
                Tell us about your discipline and experience. Choose “Careers” as the inquiry type and we will keep your
                message on file for future openings.
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Button href="/contact/?type=careers" variant="dark">
                Send a careers inquiry
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
