"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedUser = localStorage.getItem("loggedUser");

    const publicRoutes = [
      "/Ui-components/Pages/Login",
      "/Ui-components/Pages/Regester",
    ];

    const isPublicRoute =
      publicRoutes.includes(pathname);

    if (!token && !loggedUser && !isPublicRoute) {
      router.replace("/Ui-components/Pages/Login");
      return;
    }

    setLoading(false);
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#ffedd4]">
        <h1 className="text-3xl font-bold">
          Loading...
        </h1>
      </div>
    );
  }

  return <>{children}</>;
}