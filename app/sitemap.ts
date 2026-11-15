import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { accompaniments } from "@/lib/accompaniments";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...accompaniments.map((item) => ({
      url: `${siteUrl}/accompagnements/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
