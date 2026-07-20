import type { MetadataRoute } from "next";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "http://localhost:3002";
const SITE =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/Ui-components/shop",
    "/Ui-components/Blogs",
    "/Ui-components/Pages/AboutAs",
    "/Ui-components/Pages/Contact",
    "/Ui-components/Pages/Faq",
    "/Ui-components/Pages/Privacy",
    "/Ui-components/Pages/Shipping",
    "/Ui-components/Pages/Returns",
  ].map((path) => ({
    url: `${SITE}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  try {
    const res = await fetch(`${API_URL}/api/items`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return staticRoutes;
    const data = await res.json();
    const products = (data.items || []).map((item: { id: string }) => ({
      url: `${SITE}/Ui-components/shop/${item.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
    return [...staticRoutes, ...products];
  } catch {
    return staticRoutes;
  }
}
