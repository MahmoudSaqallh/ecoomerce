import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/Ui-components/Pages/Login",
        "/Ui-components/Pages/Regester",
        "/Ui-components/Pages/Account",
        "/Ui-components/Pages/Payment",
        "/checkout",
      ],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
