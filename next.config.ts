import type { NextConfig } from "next";
import { SITE_REDIRECTS } from "./app/lib/sitePaths";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3002",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3002",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3001",
        pathname: "/uploads/**",
      },
    ],
  },
  async redirects() {
    return [
      ...SITE_REDIRECTS,
      // Extra typo / legacy paths
      {
        source: "/Ui-components/Pages/AboutUs",
        destination: "/Ui-components/Pages/AboutAs",
        permanent: false,
      },
      {
        source: "/Ui-components/Pages/Register",
        destination: "/Ui-components/Pages/Regester",
        permanent: false,
      },
      {
        source: "/Ui-components/Pages/Checkout",
        destination: "/checkout",
        permanent: false,
      },
      {
        source: "/Ui-components/Pages/Cheackout",
        destination: "/checkout",
        permanent: false,
      },
      {
        source: "/Ui-components/Pages/Wishlist",
        destination: "/Ui-components/Pages/WishList",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
