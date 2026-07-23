/** Map short / mistyped paths to real App Router paths. */
const PATH_ALIASES: Record<string, string> = {
  "/shop": "/Ui-components/shop",
  "/cart": "/Ui-components/Pages/Cart",
  "/wishlist": "/Ui-components/Pages/WishList",
  "/wish-list": "/Ui-components/Pages/WishList",
  "/login": "/Ui-components/Pages/Login",
  "/register": "/Ui-components/Pages/Regester",
  "/regester": "/Ui-components/Pages/Regester",
  "/signup": "/Ui-components/Pages/Regester",
  "/sign-up": "/Ui-components/Pages/Regester",
  "/account": "/Ui-components/Pages/Account",
  "/profile": "/Ui-components/Pages/Account",
  "/about": "/Ui-components/Pages/AboutAs",
  "/about-us": "/Ui-components/Pages/AboutAs",
  "/aboutus": "/Ui-components/Pages/AboutAs",
  "/contact": "/Ui-components/Pages/Contact",
  "/contact-us": "/Ui-components/Pages/Contact",
  "/faq": "/Ui-components/Pages/Faq",
  "/blog": "/Ui-components/Blogs",
  "/blogs": "/Ui-components/Blogs",
  "/notifications": "/Ui-components/Pages/Notifications",
  "/complaints": "/Ui-components/Pages/Complaints",
  "/payment": "/Ui-components/Pages/Payment",
  "/shipping": "/Ui-components/Pages/Shipping",
  "/returns": "/Ui-components/Pages/Returns",
  "/privacy": "/Ui-components/Pages/Privacy",
  "/terms": "/Ui-components/Pages/Terms",
  "/sale": "/sale",
  "/track-order": "/track-order",
  "/track": "/track-order",
  "/checkout": "/checkout",
  "/cheackout": "/checkout",
};

/**
 * Resolve banner/CMS/user links to a safe in-app path.
 * Prevents 404s from short aliases like `/shop` stored in the dashboard.
 */
export function resolveSitePath(link?: string | null, fallback = "/Ui-components/shop") {
  if (!link) return fallback;
  const trimmed = String(link).trim();
  if (!trimmed) return fallback;

  // Allow absolute http(s) URLs
  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  // Reject protocol-relative / external junk
  if (trimmed.startsWith("//")) return fallback;

  let path = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;

  // Strip origin if someone pasted full localhost URL
  try {
    if (path.includes("://")) {
      const u = new URL(trimmed);
      path = u.pathname || fallback;
    }
  } catch {
    /* ignore */
  }

  const bare = path.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
  const query = path.includes("?") ? path.slice(path.indexOf("?")) : "";
  const hash = path.includes("#") ? path.slice(path.indexOf("#")) : "";

  const mapped = PATH_ALIASES[bare.toLowerCase()] || bare;
  return `${mapped}${query}${hash}`;
}

export const SITE_REDIRECTS = Object.entries(PATH_ALIASES)
  .filter(([from, to]) => from !== to)
  .map(([source, destination]) => ({
    source,
    destination,
    permanent: false,
  }));
