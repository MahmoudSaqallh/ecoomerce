import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Pages that need login (cart, checkout, account…). Browse Home/Shop freely. */
const PROTECTED_PREFIXES = [
  "/Ui-components/Pages/Cart",
  "/Ui-components/Pages/WishList",
  "/Ui-components/Pages/Payment",
  "/Ui-components/Pages/Cheackout",
  "/Ui-components/Pages/Account",
  "/Ui-components/Pages/Notifications",
  "/Ui-components/Pages/Complaints",
  "/checkout",
];

function isProtectedPath(pathname: string) {
  return PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.get("fashique_session")?.value === "1";

  if (isProtectedPath(pathname) && !hasSession) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/Ui-components/Pages/Login";
    loginUrl.searchParams.set("next", pathname || "/");
    return NextResponse.redirect(loginUrl);
  }

  // Already logged in on Login → go home or ?next=
  if (hasSession && pathname.includes("/Pages/Login")) {
    const raw = request.nextUrl.searchParams.get("next") || "/";
    const next =
      raw.startsWith("/") && !raw.startsWith("//") ? raw : "/";
    return NextResponse.redirect(new URL(next, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|woff2?)$).*)",
  ],
};
