"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  isAuthenticated,
  syncAuthCookie,
} from "../../Ui-components/api/session";

/** Only these need login. Home, Shop, product details stay public. */
const PROTECTED_ROUTES = [
  "/Ui-components/Pages/Cart",
  "/Ui-components/Pages/WishList",
  "/Ui-components/Pages/Payment",
  "/Ui-components/Pages/Cheackout",
  "/Ui-components/Pages/Account",
  "/Ui-components/Pages/Notifications",
  "/Ui-components/Pages/Complaints",
  "/checkout",
];

function isProtectedRoute(pathname: string) {
  return PROTECTED_ROUTES.some(
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
  const protectedPage = isProtectedRoute(pathname);
  const [allowed, setAllowed] = useState(!protectedPage);

  useEffect(() => {
    const check = () => {
      const loggedIn = isAuthenticated();
      syncAuthCookie();

      if (pathname.includes("/Pages/Login") && loggedIn) {
        const params = new URLSearchParams(window.location.search);
        const raw = params.get("next") || "/";
        const next =
          raw.startsWith("/") && !raw.startsWith("//") ? raw : "/";
        router.replace(next);
        return;
      }

      if (!protectedPage) {
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
  }, [pathname, router, protectedPage]);

  if (!allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#ffedd4]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 rounded-full border-4 border-black/10 border-t-black animate-spin" />
          <p className="text-lg font-medium text-gray-700">
            Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
