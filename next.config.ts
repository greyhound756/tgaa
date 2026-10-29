import type { NextConfig } from "next";

// Static export: the site builds to /out and can be hosted on any static host.
// If you later add server features (e.g. an API route for the contact form),
// remove `output: "export"`.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
