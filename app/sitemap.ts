import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com";
const routes = ["/", "/company/", "/expertise/", "/sectors/", "/careers/", "/careers/validation-testing-engineer/", "/contact/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({ url: `${base}${r}`, changeFrequency: "monthly", priority: r === "/" ? 1 : 0.7 }));
}
