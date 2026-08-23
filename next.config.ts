import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build the site into plain static files (the `out/` folder).
  output: "export",
  // Image optimization needs a server, so turn it off for a static site.
  images: { unoptimized: true },
};

export default nextConfig;