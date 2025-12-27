import { MetadataRoute } from "next";
import { ICON_LIST } from "@/icons/index";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://intent-ui.com";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/icons`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sponsor`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamic icon pages
  const iconPages: MetadataRoute.Sitemap = ICON_LIST.map((icon) => ({
    url: `${baseUrl}/icons/${icon.name}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...iconPages];
}
