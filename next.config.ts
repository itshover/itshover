import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/index.md", destination: "/md/home" },
      { source: "/icons.md", destination: "/md/icons" },
      { source: "/icons/:slug.md", destination: "/md/icons/:slug" },
      { source: "/example.md", destination: "/md/example" },
      { source: "/example/:slug.md", destination: "/md/example/:slug" },
    ];
  },
};

export default nextConfig;
