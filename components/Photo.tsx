import { imgProps, type MediaKey } from "@/lib/media";

type Props = {
  name: MediaKey;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  parallax?: boolean;
  /** Visually-hidden context for screen readers is the alt; decorative=true hides it */
  decorative?: boolean;
  max?: number;
};

/**
 * Responsive photograph with a graphite fallback surface.
 * The wrapper must be sized by the parent (absolute fill or aspect ratio).
 */
export function Photo({
  name,
  sizes = "100vw",
  className = "",
  imgClassName = "",
  priority = false,
  parallax = false,
  decorative = false,
  max,
}: Props) {
  const m = imgProps(name, 1440, max);
  if (!m) return null;
  const pos = /\b(absolute|fixed|sticky)\b/.test(className) ? "" : "relative";
  return (
    <div className={`photo overflow-hidden ${pos} ${className}`}>
      <img
        src={m.src}
        srcSet={m.srcSet}
        data-fb={m["data-fb"]}
        sizes={sizes}
        alt={decorative ? "" : m.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        style={{ objectPosition: m.position }}
        className={`absolute inset-0 h-full w-full object-cover text-transparent ${parallax ? "parallax" : ""} ${imgClassName}`}
        data-parallax={parallax ? "" : undefined}
      />
    </div>
  );
}
