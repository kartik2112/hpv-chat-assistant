import type { NextConfig } from "next";

const repoName =
  process.env.GITHUB_PAGES_BASE_PATH ||
  (process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split("/")[1] : "");

const basePath = repoName ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  // Export the app as static HTML (next export)
  output: "export",

  // Generate trailing slashes so exported pages become folder/index.html
  trailingSlash: true,

  // When deploying to a GitHub Pages repo (username.github.io/repo),
  // set basePath and assetPrefix to the repo name. Leave empty for root pages.
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,

  // Static export doesn't support Next/Image optimization — disable it for export
  images: {
    unoptimized: true,
  },

  // other config options here
};

export default nextConfig;
