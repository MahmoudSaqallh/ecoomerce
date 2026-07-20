import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PREFIXES = [
  "/Ui-components/Pages/Login",
  "/Ui-components/Pages/Regester",
];

function isPublicPath(pathname: string) {
  return PUBLIC_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.get("fashique_session")?.value === "1";
  const publicPage = isPublicPath(pathname);

  if (!publicPage && !hasSession) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/Ui-components/Pages/Login";
    loginUrl.searchParams.set("next", pathname || "/");
    return NextResponse.redirect(loginUrl);
  }

  if (publicPage && hasSession && pathname.includes("/Login")) {
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
