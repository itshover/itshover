import { MetadataRoute } from "next";
import { LINKS } from "@/constants";
import { getIconSlugs } from "@/lib/icons-data";
import { getExamples } from "@/lib/examples";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = LINKS.SITE_URL;

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/icons`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/example`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/sponsor`, changeFrequency: "monthly", priority: 0.7 },
  ];

  const slugs = [...new Set(getIconSlugs())];
  const iconPages: MetadataRoute.Sitemap = slugs.map((name) => ({
    url: `${baseUrl}/icons/${name}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const examplePages: MetadataRoute.Sitemap = getExamples().map((example) => ({
    url: `${baseUrl}/example/${example.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...iconPages, ...examplePages];
}
