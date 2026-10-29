import type { ReactNode } from "react";
import { hasPhoto, type MediaKey } from "@/lib/media";
import { Photo } from "./Photo";
import { IllustrativeNote } from "./ui";

type Props = {
  label: string;
  title: string[];
  intro: ReactNode;
  image?: MediaKey;
  crumbs?: { href: string; label: string }[];
  children?: ReactNode;
};

/**
 * Inner-page opening: an editorial title block on graphite, followed by a
 * wide photographic band that overlaps into the next (light) section.
 */
export function PageHero({ label, title, intro, image, children }: Props) {
  return (
    <section className="on-dark relative bg-graphite text-paper">
      <div className="shell pt-36 pb-16 lg:pt-48 lg:pb-24">
        <p className="hero-fade eyebrow flex items-center gap-3 text-steel-light">
          <span aria-hidden="true" className="h-px w-10 bg-red" />
          {label}
        </p>
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <h1 className="display text-[clamp(2.75rem,7vw,7.5rem)] lg:col-span-8">
            {title.map((t, i) => (
              <span key={i} className="hero-line block overflow-hidden pb-[0.06em]">
                <span style={{ ["--d" as string]: `${80 + i * 110}ms` }}>{t}</span>
              </span>
            ))}
          </h1>
          <div className="hero-fade lede text-paper/75 lg:col-span-4 lg:pb-3" style={{ ["--d" as string]: "400ms" }}>
            {intro}
          </div>
        </div>
        {children}
      </div>
      {image && hasPhoto(image) && (
        <div className="relative">
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-paper" />
          <div className="shell relative">
            <div className="hero-fade relative aspect-[16/10] sm:aspect-[21/9]" style={{ ["--d" as string]: "300ms" }}>
              <Photo name={image} priority parallax className="absolute inset-0" sizes="(min-width: 1536px) 1408px, 100vw" />
              <IllustrativeNote className="absolute right-4 bottom-4" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
