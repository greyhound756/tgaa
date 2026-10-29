import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Arrow, Button, Label, IllustrativeNote } from "@/components/ui";
import { job } from "@/lib/content";
import { hasPhoto } from "@/lib/media";

export const metadata: Metadata = {
  title: job.title,
  description: `${job.title} — ${job.location}. ${job.arrangement} Join VECHTEL Engineering & Construction.`,
  alternates: { canonical: `/careers/${job.slug}/` },
};

export default function JobPage() {
  return (
    <>
      <section className="on-dark relative bg-graphite text-paper">
        <div className="shell pt-32 pb-16 lg:pt-44 lg:pb-24">
          <nav aria-label="Breadcrumb" className="hero-fade">
            <ol className="eyebrow flex flex-wrap items-center gap-2 text-steel-light">
              <li>
                <Link href="/careers/" className="ulink hover:text-paper">
                  Careers
                </Link>
              </li>
              <li aria-hidden="true" className="text-red">
                /
              </li>
              <li aria-current="page" className="text-paper/80">
                {job.discipline}
              </li>
            </ol>
          </nav>
          <h1 className="display mt-10 max-w-[14ch] text-[clamp(2.6rem,6.6vw,6.8rem)]">
            <span className="hero-line block overflow-hidden pb-[0.06em]">
              <span style={{ ["--d" as string]: "80ms" }}>Validation &amp;</span>
            </span>
            <span className="hero-line block overflow-hidden pb-[0.06em]">
              <span style={{ ["--d" as string]: "190ms" }}>Testing Engineer</span>
            </span>
          </h1>

          <dl
            className="hero-fade mt-14 grid gap-6 border-t border-line-dark pt-6 sm:grid-cols-3"
            style={{ ["--d" as string]: "400ms" }}
          >
            <div>
              <dt className="eyebrow text-steel">Location</dt>
              <dd className="mt-2 text-lg">{job.location}</dd>
            </div>
            <div>
              <dt className="eyebrow text-steel">Work arrangement</dt>
              <dd className="mt-2 text-lg">{job.arrangement}</dd>
            </div>
            <div>
              <dt className="eyebrow text-steel">Discipline</dt>
              <dd className="mt-2 text-lg">{job.discipline}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section aria-labelledby="role-title" className="bg-paper py-20 lg:py-32">
        <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Label n="01">The role</Label>
            <h2 id="role-title" className="headline reveal mt-8 text-[2.1rem] sm:text-[2.8rem]">
              Prove that systems work — and document it.
            </h2>
            <p className="reveal lede mt-6 text-graphite/85">{job.summary}</p>

            <h2 className="eyebrow mt-16 flex items-center gap-3 text-steel-dark">
              <span className="text-red">02</span>
              <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
              Responsibilities
            </h2>
            <ol className="mt-6 border-t border-graphite" role="list">
              {job.responsibilities.map((r, i) => (
                <li key={r} className="reveal grid grid-cols-[3rem_1fr] gap-2 border-b border-line-light py-5" style={{ ["--d" as string]: `${i * 40}ms` }}>
                  <span className="font-mono text-xs leading-7 text-red tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[1.05rem] leading-relaxed">{r}</span>
                </li>
              ))}
            </ol>

            <h2 className="eyebrow mt-16 flex items-center gap-3 text-steel-dark">
              <span className="text-red">03</span>
              <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
              You will work with
            </h2>
            <ul className="mt-6 grid gap-x-8 border-t border-graphite sm:grid-cols-2" role="list">
              {job.workWith.map((w) => (
                <li key={w} className="flex gap-3 border-b border-line-light py-4">
                  <span aria-hidden="true" className="mt-[0.7rem] h-px w-3 shrink-0 bg-red" />
                  {w}
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-28">
              <div className="on-dark bg-graphite p-6 text-paper sm:p-8">
                <p className="eyebrow text-steel-light">Apply</p>
                <p className="headline mt-4 text-[1.8rem]">Interested in this role?</p>
                <p className="mt-4 text-sm leading-relaxed text-paper/70">
                  Send us a message with “Careers” selected and include the role title. A member of the team will
                  follow up about next steps.
                </p>
                <Button href="/contact/?type=careers" className="mt-8 w-full">
                  Apply via contact form
                </Button>
              </div>
              {hasPhoto("plantRoom") && (
                <div className="reveal relative mt-6 hidden aspect-[4/3] lg:block">
                  <Photo name="plantRoom" className="absolute inset-0" sizes="30vw" />
                  <IllustrativeNote className="absolute top-3 left-3" />
                </div>
              )}
              <Link href="/careers/" className="group mt-6 inline-flex items-center gap-3 text-sm">
                <Arrow className="rotate-180 text-red transition-transform group-hover:-translate-x-1" />
                <span className="ulink">All careers</span>
              </Link>
            </div>
          </aside>
        </div>
      </section>

    </>
  );
}
