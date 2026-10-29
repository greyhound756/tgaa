import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/content";
import { Photo } from "@/components/Photo";
import { IllustrativeNote } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact VECHTEL Engineering & Construction about a project, a career, or a general question. Chicago, Illinois, USA.",
  alternates: { canonical: "/contact/" },
};

const guidance = [
  {
    t: "Project",
    d: "Facility type and location, the scope you need (design, construction, testing, commissioning), and your target schedule.",
  },
  {
    t: "Careers",
    d: "The role or discipline you are interested in, and a short summary of your experience.",
  },
  {
    t: "General",
    d: "Any other question for the VECHTEL team.",
  },
];

export default function ContactPage() {
  return (
    <section className="on-dark relative bg-graphite text-paper">
      <div className="shell pt-36 pb-24 lg:pt-48 lg:pb-36">
        <p className="hero-fade eyebrow flex items-center gap-3 text-steel-light">
          <span aria-hidden="true" className="h-px w-10 bg-red" />
          Contact
        </p>

        <div className="mt-10 grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <h1 className="display text-[clamp(2.75rem,6.4vw,6.5rem)]">
              <span className="hero-line block overflow-hidden pb-[0.06em]">
                <span style={{ ["--d" as string]: "80ms" }}>Talk to</span>
              </span>
              <span className="hero-line block overflow-hidden pb-[0.06em]">
                <span style={{ ["--d" as string]: "180ms" }}>
                  VECHTEL<span className="text-red">.</span>
                </span>
              </span>
            </h1>
            <p className="hero-fade lede mt-8 max-w-md text-paper/75" style={{ ["--d" as string]: "350ms" }}>
              Use the form to reach a VECHTEL representative about a project, a career, or a general question.
            </p>

            <div className="hero-fade mt-14 border-t border-line-dark pt-6" style={{ ["--d" as string]: "450ms" }}>
              <p className="eyebrow text-steel">Location</p>
              <p className="headline mt-3 text-[1.9rem]">{site.location}</p>
            </div>

            <div className="hero-fade relative mt-14 aspect-[16/10]" style={{ ["--d" as string]: "500ms" }}>
              <Photo name="contact" className="absolute inset-0" sizes="(min-width: 1024px) 40vw, 100vw" />
              <IllustrativeNote className="absolute top-3 left-3" />
            </div>

            <div className="hero-fade mt-14" style={{ ["--d" as string]: "550ms" }}>
              <p className="eyebrow text-steel">Helpful to include</p>
              <dl className="mt-4 border-t border-line-dark">
                {guidance.map((g) => (
                  <div key={g.t} className="grid grid-cols-[6rem_1fr] gap-4 border-b border-line-dark py-4 text-sm">
                    <dt className="font-medium">{g.t}</dt>
                    <dd className="leading-relaxed text-paper/70">{g.d}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="hero-fade lg:col-span-6 lg:col-start-7" style={{ ["--d" as string]: "300ms" }}>
            <div className="border-t border-paper/30 pt-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
