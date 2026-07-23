"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { LanguageProvider, useLanguage } from "./i18n/LanguageContext";

function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { locale, dir } = useLanguage();

  const hideLayout =
    pathname.includes("/Login") ||
    pathname.includes("/Regester") ||
    pathname.includes("/checkout") ||
    pathname.includes("/Payment") ||
    pathname.includes("/offline");

  useEffect(() => {
    function handleOffline() {
      if (!pathname.includes("/offline")) {
        router.push("/offline");
      }
    }

    function handleOnline() {
      if (pathname.includes("/offline")) {
        router.push("/");
      }
    }

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [pathname, router]);

  return (
    <div dir={dir} lang={locale === "ar" ? "ar" : "en"}>
      <Toaster position={locale === "ar" ? "top-left" : "top-right"} />
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </div>
  );
}

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <AppChrome>{children}</AppChrome>
    </LanguageProvider>
  );
}
