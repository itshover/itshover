import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/index.md", destination: "/md/home" },
      { source: "/icons.md", destination: "/md/icons" },
      { source: "/icons/:slug.md", destination: "/md/icons/:slug" },
      { source: "/icons/categories.md", destination: "/md/icons/categories" },
      {
        source: "/icons/category/:slug.md",
        destination: "/md/icons/category/:slug",
      },
      { source: "/docs.md", destination: "/md/docs" },
      { source: "/example.md", destination: "/md/example" },
      { source: "/example/:slug.md", destination: "/md/example/:slug" },
    ];
  },
};

export default nextConfig;
