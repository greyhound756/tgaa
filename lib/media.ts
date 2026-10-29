/**
 * Photography — TEMPORARY.
 *
 * Until VECHTEL supplies its own photographs, every slot uses licensed stock
 * images from Unsplash (Unsplash License, free for commercial use). They
 * illustrate types of work and facilities, are labelled "Illustrative image"
 * on the site, and must never be presented as VECHTEL projects.
 *
 * How a slot is resolved:
 *   1. `local`  — if set, the file in /public is used (e.g. "/photos/hero.jpg").
 *                 This is where the permanent photos go.
 *   1b. lib/local-photos.json — temporary photos saved into the project by
 *                 `npm run photos` (scripts/download-photos.mjs).
 *   2. `ids[0]` — Unsplash CDN image, resized on the fly (auto=format → AVIF/WebP).
 *   3. `ids[1..]` — fallbacks, swapped in automatically if an image fails to load.
 *   4. If everything fails, the slot keeps its graphite drafting-grid surface.
 */

import localPhotos from "./local-photos.json";

export type Media = {
  ids: string[];
  alt: string;
  /** CSS object-position, keeps the subject in frame when cropped */
  position?: string;
  /** Path under /public for a permanent photo, e.g. "/photos/hero.jpg" */
  local?: string;
};

export const media = {
  hero: {
    ids: ["photo-1504307651254-35680f356dfd", "photo-1579847188804-ecba0e2ea330", "photo-1527335988388-b40ee248d80c"],
    alt: "Structural steelwork and a tower crane on an active construction site",
    position: "50% 40%",
  },
  steelFrame: {
    ids: ["photo-1527335988388-b40ee248d80c", "photo-1536895058696-a69b1c7ba34f"],
    alt: "Steel building frame rising beside a tower crane",
  },
  blueprints: {
    ids: ["photo-1772442198624-4fc4d7281e89", "photo-1503387762-592deb58ef4e"],
    alt: "Engineer reviewing drawings on a construction site",
    position: "50% 45%",
  },
  valves: {
    ids: ["photo-1759148414485-5f624fe9d1ea", "photo-1744113627248-8c9ba859be91"],
    alt: "Row of industrial valves with red handwheels",
  },
  pipework: {
    ids: ["photo-1781330169385-8df0629c99b6", "photo-1744113627248-8c9ba859be91", "photo-1641293148065-ef450aa0e356"],
    alt: "Network of process pipes, valves and gauges",
  },
  plantRoom: {
    ids: ["photo-1769695832228-ab959c7c7e0d", "photo-1735494034604-cab3f6a42683"],
    alt: "Industrial machinery with pipes and tanks inside a plant room",
  },
  factoryInterior: {
    ids: ["photo-1496247749665-49cf5b1022e9", "photo-1735494034604-cab3f6a42683"],
    alt: "Interior of a large industrial manufacturing hall",
  },
  officeFacade: {
    ids: ["photo-1761937841713-6b43e3f50efa", "photo-1660893978186-04bb33247dc0", "photo-1486406146926-c627a92ad1ab"],
    alt: "Glass facade of a modern office building against the sky",
  },
  warehouse: {
    ids: ["photo-1553413077-190dd305871c", "photo-1586528116311-ad8dd3c8310d"],
    alt: "Interior of a large distribution warehouse with high-bay racking",
  },
  crane: {
    ids: ["photo-1703585571126-07d02f357d2b", "photo-1429497419816-9ca5cfb4571a"],
    alt: "Tower crane beside a building under construction",
  },
  rebar: {
    ids: ["photo-1626885930974-4b69aa21bbf9", "photo-1768677903496-becc4be07258", "photo-1541888946425-d81bb19240f5"],
    alt: "Two construction professionals in safety vests on site",
    position: "50% 40%",
  },
  frameWorker: {
    ids: ["photo-1587582423116-ec07293f0395", "photo-1553946550-4b8f3eea5451", "photo-1652303518372-79ad122e3181"],
    alt: "Construction professional in a hard hat on site",
    position: "50% 35%",
  },
  craneTwilight: {
    ids: ["photo-1734268026296-7c990db7a91a", "photo-1579847188804-ecba0e2ea330", "photo-1551711974-faf378be34b2"],
    alt: "Construction crane silhouetted against a sunset sky",
    position: "50% 60%",
  },
  contact: {
    ids: ["photo-1494891848038-7bd202a2afeb"],
    alt: "Dark metal-clad building facade with a red edge",
  },
  commissioning: {
    ids: ["photo-1495603491717-3d3374928dc6"],
    alt: "White building with a glazed top floor against a blue sky",
  },
  construction: {
    ids: ["photo-1468325089340-2ec20e175048"],
    alt: "High-rise building facade emerging from white fog",
    position: "88% 50%", // the building sits on the right of this photo
  },
} satisfies Record<string, Media>;

export type MediaKey = keyof typeof media;

const WIDTHS = [480, 768, 1080, 1440, 1920, 2560];

export function src(id: string, w: number, q = 72) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}

export function srcSet(id: string, max = 2560) {
  return WIDTHS.filter((w) => w <= max)
    .map((w) => `${src(id, w)} ${w}w`)
    .join(", ");
}

type Stored = { src: string; srcSet?: string; alt?: string };
const stored = localPhotos as Record<string, Stored>;

/**
 * A slot is shown only when its photo is stored in the project
 * (`local`, or an entry in lib/local-photos.json). Slots without a stored
 * photo render nothing, so the site never shows empty grey boxes.
 * `npm run photos` downloads the missing ones; they then appear automatically.
 */
export function hasPhoto(key: MediaKey): boolean {
  const m: Media = media[key];
  return Boolean(m.local || stored[key]);
}

/** Everything an <img> needs for a slot (null when the slot has no stored photo) */
export function imgProps(key: MediaKey, _width = 1440, _max?: number) {
  const m: Media = media[key];
  if (m.local) {
    return { src: m.local, srcSet: undefined as string | undefined, "data-fb": undefined as string | undefined, alt: m.alt, position: m.position };
  }
  const d = stored[key];
  if (d) {
    return { src: d.src, srcSet: d.srcSet, "data-fb": undefined as string | undefined, alt: d.alt || m.alt, position: m.position };
  }
  return null;
}
