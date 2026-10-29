import { company } from "@/lib/content";

/** Company timeline: 2020 founding → 2021 Ford Rouge EVC → today */
export function Milestones({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div>
      <ol className={`grid border-t md:grid-cols-3 ${dark ? "border-paper/40" : "border-graphite"}`} role="list">
        {company.milestones.map((m, i) => (
          <li
            key={m.year}
            className={`group reveal relative py-8 md:px-8 md:first:pl-0 ${
              dark ? "border-b border-line-dark md:border-b-0 md:border-l md:first:border-l-0" : "border-b border-line-light md:border-b-0 md:border-l md:first:border-l-0"
            }`}
            style={{ ["--d" as string]: `${i * 110}ms` }}
          >
            <span aria-hidden="true" className="absolute -top-[5px] left-0 h-[9px] w-[9px] border border-red bg-red md:left-8 md:group-first:left-0" />
            <p className={`display text-[3.4rem] leading-none sm:text-[4rem] ${i === 2 ? "text-red" : ""}`}>{m.year}</p>
            <h3 className="headline mt-5 text-[1.5rem] sm:text-[1.7rem]">{m.title}</h3>
            <p className={`mt-3 max-w-sm leading-relaxed ${dark ? "text-paper/70" : "text-graphite/70"}`}>{m.body}</p>
          </li>
        ))}
      </ol>
      <p className={`mt-6 max-w-3xl text-xs leading-relaxed ${dark ? "text-steel" : "text-steel-dark"}`}>{company.trademarkNote}</p>
    </div>
  );
}
