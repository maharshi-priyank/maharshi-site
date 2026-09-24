import type { NextConfig } from "next";

// Static export → deployable to GitHub Pages / any static host.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
