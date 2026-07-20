"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  isAuthenticated,
  syncAuthCookie,
} from "../../Ui-components/api/session";

const PUBLIC_ROUTES = [
  "/Ui-components/Pages/Login",
  "/Ui-components/Pages/Regester",
];

function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
}

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const publicPage = isPublicRoute(pathname);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const check = () => {
      const loggedIn = isAuthenticated();
      syncAuthCookie();

      if (publicPage) {
        // Already logged in? send to home (or ?next=)
        if (loggedIn && pathname.includes("/Login")) {
          const params = new URLSearchParams(window.location.search);
          const raw = params.get("next") || "/";
          const next =
            raw.startsWith("/") && !raw.startsWith("//") ? raw : "/";
          router.replace(next);
          return;
        }
        setAllowed(true);
        return;
      }

      if (loggedIn) {
        setAllowed(true);
        return;
      }

      setAllowed(false);
      router.replace(
        `/Ui-components/Pages/Login?next=${encodeURIComponent(pathname || "/")}`
      );
    };

    check();
    window.addEventListener("fashique-auth-change", check);
    window.addEventListener("storage", check);

    return () => {
      window.removeEventListener("fashique-auth-change", check);
      window.removeEventListener("storage", check);
    };
  }, [pathname, router, publicPage]);

  if (!allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#ffedd4]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 rounded-full border-4 border-black/10 border-t-black animate-spin" />
          <p className="text-lg font-medium text-gray-700">
            {publicPage ? "Loading..." : "Redirecting to login..."}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
