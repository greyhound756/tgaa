import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Button, Label, Lines, TextLink, IllustrativeNote, Arrow } from "@/components/ui";
import { ExpertiseExplorer } from "@/components/ExpertiseExplorer";
import { Approach } from "@/components/Approach";
import { ContactForm } from "@/components/ContactForm";
import { Intro } from "@/components/Intro";
import { Milestones } from "@/components/Milestones";
import { sectors, job, site } from "@/lib/content";
import { hasPhoto } from "@/lib/media";

export default function Home() {
  return (
    <>
      <Intro />
      {/* ——— 01 Hero ——— */}
      <section aria-labelledby="hero-title" className="on-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-graphite text-paper">
        <div className="hero-media absolute inset-0 -z-20">
          <Photo name="hero" priority parallax className="h-full w-full" sizes="100vw" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-graphite/95 via-graphite/65 to-graphite/25" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-graphite via-graphite/10 to-graphite/50" />
        {/* drafting grid */}
        <div aria-hidden="true" className="shell pointer-events-none absolute inset-0 -z-10 hidden grid-cols-4 lg:grid">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="border-l border-paper/[0.07] last:border-r" />
          ))}
        </div>

        <div className="shell flex flex-1 flex-col pt-32 pb-8 lg:pt-40">
          <p className="hero-fade eyebrow flex items-center gap-3 text-paper/75" style={{ ["--d" as string]: "200ms" }}>
            <span aria-hidden="true" className="h-px w-10 bg-red" />
            Engineering · Procurement · Construction · Commissioning
          </p>

          <div className="mt-auto pt-20">
            <h1 id="hero-title" className="display text-[clamp(3rem,8.6vw,10rem)]">
              <span className="hero-line block overflow-hidden pb-[0.06em]">
                <span style={{ ["--d" as string]: "120ms" }}>Engineering ambition.</span>
              </span>
              <span className="hero-line block overflow-hidden pb-[0.06em]">
                <span style={{ ["--d" as string]: "240ms" }}>
                  Building what’s next<span className="text-red">.</span>
                </span>
              </span>
            </h1>

            <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:items-end">
              <p className="hero-fade lede max-w-[34rem] text-paper/85 lg:col-span-6" style={{ ["--d" as string]: "520ms" }}>
                Design, construction and commissioning for industrial, commercial and logistics facilities.
              </p>
              <div
                className="hero-fade flex flex-col gap-3 xs:flex-row lg:col-span-6 lg:justify-end"
                style={{ ["--d" as string]: "640ms" }}
              >
                <Button href="/expertise/" variant="red" className="xs:min-w-60">
                  Explore Our Expertise
                </Button>
                <Button href="/contact/" variant="ghost-light" className="xs:min-w-52">
                  Contact VECHTEL
                </Button>
              </div>
            </div>
          </div>

          <div className="hero-fade mt-14 flex items-center justify-between gap-6 border-t border-paper/20 pt-5 lg:mt-20" style={{ ["--d" as string]: "800ms" }}>
            <p className="eyebrow text-paper/70">Chicago, Illinois · Engineering &amp; Construction</p>
            <p className="eyebrow hidden text-paper/50 md:block">41.88° N&nbsp;&nbsp;87.63° W</p>
          </div>
        </div>
      </section>

      {/* ——— 02 Company ——— */}
      <section aria-labelledby="about-title" className="relative bg-paper py-24 lg:py-40">
        <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7 lg:pr-10">
            <Label n="01">Company</Label>
            <h2 id="about-title" className="headline reveal mt-8 text-[2.6rem] sm:text-[3.6rem] lg:text-[4.6rem] xl:text-[5.4rem]">
              <Lines lines={["From technical", "vision to", "operational", "readiness."]} />
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:mt-16">
              <p className="reveal lede text-graphite" style={{ ["--d" as string]: "100ms" }}>
                Founded in 2020 by Chris Vectol, VECHTEL is a young company that brings design, construction and the
                verification of building and process systems under one accountable team.
              </p>
              <div className="reveal space-y-5 leading-relaxed text-graphite/75" style={{ ["--d" as string]: "200ms" }}>
                <p>
                  We work from the first statement of requirements to the day a facility is ready to operate:
                  engineering the design, coordinating equipment, managing construction, and proving — through
                  testing and commissioning — that every system performs as intended.
                </p>
                <p>Fewer handoffs between disciplines means fewer gaps between what was designed, what was built and what works.</p>
                <TextLink href="/company/" className="pt-2 text-graphite">
                  About VECHTEL
                </TextLink>
              </div>
            </div>
          </div>

          {hasPhoto("blueprints") && (
          <figure className="relative lg:col-span-5 lg:-mt-6">
            <div className="reveal relative aspect-[4/5] lg:aspect-[3/4]">
              <Photo name="blueprints" parallax className="absolute inset-0" sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
            <figcaption className="mt-4 flex items-start justify-between gap-6 border-t border-line-light pt-3">
              <span className="text-sm text-graphite/70">Design intent is carried through to the field — and verified at the end.</span>
              <IllustrativeNote tone="dark" className="shrink-0 pt-0.5" />
            </figcaption>
            <span aria-hidden="true" className="absolute -top-4 -left-4 hidden h-24 w-24 border-t border-l border-red lg:block" />
          </figure>
          )}
        </div>

        <div className="shell mt-24 lg:mt-36">
          <p className="eyebrow mb-8 text-steel-dark">Since 2020</p>
          <Milestones />
        </div>
      </section>

      {/* ——— Cinematic photo band ——— */}
      {hasPhoto("craneTwilight") && (
      <section aria-label="Engineering in the field" className="on-dark relative isolate overflow-hidden bg-graphite text-paper">
        <div className="relative h-[70svh] min-h-[26rem] lg:h-[88svh]">
          <Photo name="craneTwilight" parallax className="absolute inset-0 -z-20" sizes="100vw" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-graphite via-graphite/30 to-graphite/40" />
          <div className="shell flex h-full flex-col justify-end pb-12 lg:pb-20">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
              <p className="display reveal text-[clamp(2.6rem,7.4vw,8rem)] lg:col-span-9">
                <Lines lines={["Built to be", <>operated<span className="text-red">.</span></>]} />
              </p>
              <div className="reveal flex items-end justify-between gap-6 lg:col-span-3 lg:flex-col lg:items-end" style={{ ["--d" as string]: "200ms" }}>
                <p className="max-w-xs text-paper/75 lg:text-right">
                  Every system is designed, installed and verified with the people who will run it in mind.
                </p>
                <IllustrativeNote />
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ——— 03 Expertise ——— */}
      <section aria-labelledby="expertise-title" className="on-dark relative bg-graphite py-24 text-paper lg:py-36">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Label n="02" tone="light">
                Expertise
              </Label>
              <h2 id="expertise-title" className="headline reveal mt-8 text-[2.6rem] sm:text-[3.6rem] lg:text-[4.6rem]">
                <Lines lines={["Six disciplines.", "One line of responsibility."]} />
              </h2>
            </div>
            <div className="reveal lg:col-span-5 lg:pb-3" style={{ ["--d" as string]: "150ms" }}>
              <p className="leading-relaxed text-paper/70">
                Each discipline can be engaged on its own or as part of an integrated delivery — from the first design
                decision to commissioned, documented systems.
              </p>
            </div>
          </div>
          <div className="mt-16 lg:mt-24">
            <ExpertiseExplorer />
          </div>
          <div className="mt-12">
            <TextLink href="/expertise/" className="text-paper">
              All expertise
            </TextLink>
          </div>
        </div>
      </section>

      {/* ——— 04 Sectors ——— */}
      <section aria-labelledby="sectors-title" className="relative bg-paper py-24 lg:py-36">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Label n="03">Sectors</Label>
              <h2 id="sectors-title" className="headline reveal mt-8 text-[2.6rem] sm:text-[3.6rem] lg:text-[4.6rem]">
                <Lines lines={["Facilities built", "around how they operate."]} />
              </h2>
            </div>
            <p className="reveal leading-relaxed text-graphite/70 lg:col-span-4 lg:pb-3">
              Industrial, commercial and logistics buildings each bring their own technical demands. We plan for them
              from the first drawing.
            </p>
          </div>
        </div>

        <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-32">
          {sectors.map((s, i) => {
            const flip = i % 2 === 1;
            const pic = hasPhoto(s.image);
            return (
              <article key={s.slug} aria-labelledby={`sector-${s.slug}`} className="shell">
                <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                  {!pic && (
                    <div className="reveal border-t border-graphite pt-6 lg:col-span-4">
                      <span className="display block text-[5rem] leading-none text-graphite/90 sm:text-[7rem] lg:text-[9rem]" aria-hidden="true">
                        {s.n}
                      </span>
                    </div>
                  )}
                  {pic && (
                  <div className={`reveal relative lg:col-span-8 ${flip ? "lg:order-2" : ""}`}>
                    <div className="relative aspect-[4/3] sm:aspect-[16/10]">
                      <Photo name={s.image} parallax className="absolute inset-0" sizes="(min-width: 1024px) 66vw, 100vw" />
                      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-graphite/75 via-graphite/5 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-paper sm:p-8">
                        <span className="display text-[4.5rem] leading-none sm:text-[7rem] lg:text-[9rem]" aria-hidden="true">
                          {s.n}
                        </span>
                        <IllustrativeNote className="pb-2" />
                      </div>
                    </div>
                  </div>
                  )}
                  <div className={`flex flex-col ${pic ? `lg:col-span-4 ${flip ? "lg:order-1" : ""}` : "border-t border-line-light pt-6 lg:col-span-7 lg:col-start-6"}`}>
                    <p className="eyebrow text-red">Sector {s.n}</p>
                    <h3 id={`sector-${s.slug}`} className="headline mt-4 text-[2.2rem] sm:text-[2.8rem]">
                      {s.title}
                    </h3>
                    <p className="mt-5 leading-relaxed text-graphite/75">{s.lede}</p>
                    <p className="eyebrow mt-10 text-steel-dark">Typical challenges</p>
                    <ul className="mt-3 border-t border-line-light" role="list">
                      {s.challenges.map((c) => (
                        <li key={c.title} className="flex gap-3 border-b border-line-light py-3 text-[0.98rem]">
                          <span aria-hidden="true" className="mt-[0.6rem] h-px w-3 shrink-0 bg-red" />
                          {c.title}
                        </li>
                      ))}
                    </ul>
                    <TextLink href={`/sectors/#${s.slug}`} className="mt-8 text-graphite">
                      {s.title}
                    </TextLink>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ——— 05 Approach ——— */}
      <section aria-labelledby="approach-title" className="on-dark relative overflow-hidden bg-graphite-2 py-24 text-paper lg:py-36">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Label n="04" tone="light">
                Our Approach
              </Label>
              <h2 id="approach-title" className="headline reveal mt-8 text-[2.6rem] sm:text-[3.6rem] lg:text-[4.6rem]">
                <Lines lines={["Five stages.", "Each with a defined result."]} />
              </h2>
            </div>
            <p className="reveal leading-relaxed text-paper/70 lg:col-span-5 lg:pb-3">
              Every stage closes with a deliverable the owner can review. Nothing moves forward on assumption.
            </p>
          </div>
          <div className="mt-16 lg:mt-28">
            <Approach />
          </div>
        </div>
      </section>

      {/* ——— 06 Careers ——— */}
      <section aria-labelledby="careers-title" className="relative bg-paper py-24 lg:py-36">
        <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-10">
          {hasPhoto("rebar") && (
            <div className="lg:col-span-5">
              <div className="reveal relative aspect-[4/5]">
                <Photo name="rebar" parallax className="absolute inset-0" sizes="(min-width: 1024px) 40vw, 100vw" />
                <IllustrativeNote className="absolute top-4 left-4" />
              </div>
            </div>
          )}
          <div className={hasPhoto("rebar") ? "lg:col-span-7 lg:pl-10" : "lg:col-span-9"}>
            <Label n="05">Careers</Label>
            <h2 id="careers-title" className="headline reveal mt-8 text-[2.6rem] sm:text-[3.6rem] lg:text-[4.4rem]">
              <Lines lines={["Bring your", "expertise to the", "next build."]} />
            </h2>
            <p className="reveal lede mt-8 max-w-2xl text-graphite/80">
              Our engineers, testing specialists and project teams work where design meets the field — solving real
              technical problems and seeing them through to systems that work.
            </p>

            <Link
              href={`/careers/${job.slug}/`}
              className="group reveal mt-12 block border border-graphite/20 bg-paper p-6 transition-colors duration-300 hover:border-graphite hover:bg-graphite hover:text-paper sm:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="eyebrow text-red">Open position</p>
                <Arrow className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
              <p className="headline mt-5 text-[1.8rem] sm:text-[2.3rem]">{job.title}</p>
              <dl className="mt-6 grid gap-4 border-t border-current/15 pt-5 text-sm sm:grid-cols-2">
                <div>
                  <dt className="eyebrow opacity-60">Location</dt>
                  <dd className="mt-1.5">{job.location}</dd>
                </div>
                <div>
                  <dt className="eyebrow opacity-60">Work arrangement</dt>
                  <dd className="mt-1.5">{job.arrangement}</dd>
                </div>
              </dl>
            </Link>

            <div className="mt-8">
              <TextLink href="/careers/" className="text-graphite">
                Careers at VECHTEL
              </TextLink>
            </div>
          </div>
        </div>
      </section>

      {/* ——— 07 Contact ——— */}
      <section aria-labelledby="contact-title" className="on-dark relative bg-graphite-2 py-24 text-paper lg:py-36">
        <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Label n="06" tone="light">
              Contact
            </Label>
            <h2 id="contact-title" className="headline reveal mt-8 text-[2.6rem] sm:text-[3.6rem] lg:text-[4.4rem]">
              <Lines lines={["Let’s talk about", "your facility."]} />
            </h2>
            <p className="reveal mt-8 max-w-md leading-relaxed text-paper/70">
              Tell us about a project, a role you are interested in, or a question for our team. A VECHTEL
              representative will respond.
            </p>
            <div className="reveal mt-12 border-t border-line-dark pt-6">
              <p className="eyebrow text-steel">Location</p>
              <p className="mt-3 text-xl">{site.location}</p>
            </div>
          </div>
          <div className="lg:col-span-7 lg:pl-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
