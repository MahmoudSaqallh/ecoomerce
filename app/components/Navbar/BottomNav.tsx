"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import menuDot from "@/public/Menu-dot.svg";
import {
  clearSessionData,
  getCart,
  getWishlist,
  isAuthenticated,
} from "../../Ui-components/api/session";
import { useLanguage } from "@/app/i18n/LanguageContext";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

type NavLink = {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
};

export default function BottomNav() {
  const router = useRouter();
  const { t, dir } = useLanguage();

  const [isFixed, setIsFixed] = useState(false);
  const [menu, setMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<Record<string, boolean>>({});
  const [wishlistCount, setwishlistCount] = useState(0);
  const [countCart, setcountCart] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifCount, setNotifCount] = useState(0);
  const [countsReady, setCountsReady] = useState(false);

  const navLink: NavLink[] = useMemo(
    () => [
      { label: t.nav.home, href: "/" },
      {
        label: t.nav.shop,
        href: "/Ui-components/shop",
        dropdown: [
          { label: t.nav.allProducts, href: "/Ui-components/shop" },
          { label: t.nav.sale, href: "/sale" },
          { label: t.nav.cart, href: "/Ui-components/Pages/Cart" },
          { label: t.nav.wishlist, href: "/Ui-components/Pages/WishList" },
        ],
      },
      {
        label: t.nav.blog,
        href: "/Ui-components/Blogs",
        dropdown: [{ label: t.nav.allPosts, href: "/Ui-components/Blogs" }],
      },
      {
        label: t.nav.pages,
        href: "/Ui-components/Pages/AboutAs",
        dropdown: [
          { label: t.nav.aboutMe, href: "/Ui-components/Pages/AboutAs" },
          { label: t.nav.faq, href: "/Ui-components/Pages/Faq" },
          { label: t.nav.contactUs, href: "/Ui-components/Pages/Contact" },
          { label: t.nav.trackOrder, href: "/track-order" },
          { label: t.nav.complaints, href: "/Ui-components/Pages/Complaints" },
          { label: t.common.login, href: "/Ui-components/Pages/Login" },
          { label: t.common.register, href: "/Ui-components/Pages/Regester" },
        ],
      },
      {
        label: t.nav.complaints,
        href: "/Ui-components/Pages/Complaints",
      },
      {
        label: t.nav.notifications,
        href: "/Ui-components/Pages/Notifications",
      },
    ],
    [t]
  );

  const updateCounts = () => {
    if (!isAuthenticated()) {
      setwishlistCount(0);
      setcountCart(0);
      return;
    }
    setwishlistCount(getWishlist().length);
    setcountCart(getCart().length);
  };

  const updateNotifications = async () => {
    if (!isAuthenticated()) {
      setNotifCount(0);
      return;
    }
    try {
      const { fetchNotifications } = await import(
        "../../Ui-components/api/auth"
      );
      const data = await fetchNotifications();
      const unread = (data.notifications || []).filter(
        (n: { read?: boolean; type?: string }) =>
          !n.read && n.type !== "account"
      ).length;
      setNotifCount(unread);
    } catch {
      setNotifCount(0);
    }
  };

  useEffect(() => {
    const syncAuth = () => {
      const loggedIn = isAuthenticated();
      setIsLoggedIn(loggedIn);
      if (!loggedIn) {
        setwishlistCount(0);
        setcountCart(0);
        setNotifCount(0);
      } else {
        updateCounts();
        void updateNotifications();
      }
      setCountsReady(true);
    };

    syncAuth();

    const handler = () => {
      syncAuth();
    };

    window.addEventListener("storage", handler);
    window.addEventListener("fashique-auth-change", handler);
    window.addEventListener("fashique-notifications-change", handler);

    const timer = setInterval(() => {
      if (isAuthenticated()) void updateNotifications();
    }, 30000);

    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("fashique-auth-change", handler);
      window.removeEventListener("fashique-notifications-change", handler);
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsFixed(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => ({
      ...Object.fromEntries(Object.keys(prev).map((key) => [key, false])),
      [label]: !prev[label],
    }));
  };

  const toggleMenu = () => {
    setMenu((prev) => !prev);
    setOpenDropdown({});
  };

  function logout() {
    setIsLoggedIn(false);
    setNotifCount(0);
    setwishlistCount(0);
    setcountCart(0);
    clearSessionData();
    updateCounts();
    setMenu(false);
    router.replace("/Ui-components/Pages/Login");
  }

  return (
    <div
      className={`w-full bg-white shadow-sm transition-all py-5 duration-500 ${
        isFixed ? "fixed top-0 inset-x-0 z-50" : ""
      }`}
      dir={dir}
    >
      <div className="w-full flex items-center justify-between px-[8%] lg:px-[16%] text-gray-700 gap-3">
        <Link
          href="/"
          className={`text-4xl font-bold Audiowide text-black lg:hidden transition-all duration-300 ${
            isFixed
              ? "max-w-0 opacity-0 pointer-events-none overflow-hidden"
              : "max-w-[200px] opacity-100"
          }`}
        >
          Fashi<span className="text-(--second)"> Que</span>
        </Link>

        <nav className="menu-link hidden lg:flex gap-6 relative z-40">
          {navLink.map((link) =>
            link.dropdown ? (
              <div key={link.label} className="relative group">
                <Link
                  href={link.href}
                  className="flex GolosText items-center gap-1"
                >
                  {link.label}
                  <Image src={menuDot} alt="" />
                </Link>
                <div className="absolute bg-white top-full start-0 hidden group-hover:block shadow-xl p-2 border border-gray-100 rounded-lg min-w-[170px] z-50">
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2 rounded-md transition-all hover:bg-gray-50"
                    >
                      <div className="flex gap-2 items-center">
                        <Image src={menuDot} alt="" />
                        {item.label}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="flex GolosText items-center gap-2"
              >
                {link.label}
                <Image src={menuDot} alt="" />
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-4 sm:gap-5">
          <div className="lg:hidden">
            <LanguageSwitcher />
          </div>

          {isLoggedIn ? (
            <button
              onClick={logout}
              className="login-link border-b border-gray-400 GolosText font-semibold hidden lg:block cursor-pointer"
            >
              {t.common.logout}
            </button>
          ) : (
            <Link
              href="/Ui-components/Pages/Login"
              className="login-link border-b border-gray-400 GolosText font-semibold hidden lg:block"
            >
              {t.common.loginRegister}
            </Link>
          )}

          <div className="flex items-center gap-6">
            {isLoggedIn ? (
              <Link
                href="/Ui-components/Pages/Account"
                className="relative"
                title={t.nav.myAccount}
                aria-label={t.nav.myAccount}
              >
                <i className="bi bi-person text-3xl"></i>
              </Link>
            ) : null}

            <Link
              href={
                isLoggedIn
                  ? "/Ui-components/Pages/Notifications"
                  : "/Ui-components/Pages/Login?next=/Ui-components/Pages/Notifications"
              }
              className="relative"
              title={t.nav.notifications}
              onClick={(e) => {
                if (!isLoggedIn) {
                  e.preventDefault();
                  router.push(
                    "/Ui-components/Pages/Login?next=/Ui-components/Pages/Notifications"
                  );
                }
              }}
            >
              <i className="bi bi-bell text-3xl"></i>
              {countsReady && notifCount > 0 && (
                <span className="absolute -top-2 -end-1 bg-(--second) text-white text-sm min-w-5 h-5 px-1 flex justify-center items-center rounded-full">
                  {notifCount > 9 ? "9+" : notifCount}
                </span>
              )}
            </Link>

            <Link
              href={
                isLoggedIn
                  ? "/Ui-components/Pages/WishList"
                  : "/Ui-components/Pages/Login?next=/Ui-components/Pages/WishList"
              }
              className="relative"
              onClick={(e) => {
                if (!isLoggedIn) {
                  e.preventDefault();
                  router.push(
                    "/Ui-components/Pages/Login?next=/Ui-components/Pages/WishList"
                  );
                }
              }}
            >
              <i className="bi bi-balloon-heart text-3xl"></i>
              {countsReady && wishlistCount > 0 && (
                <span className="absolute -top-2 -end-1 bg-black text-white text-sm min-w-5 h-5 px-1 flex justify-center items-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href={
                isLoggedIn
                  ? "/Ui-components/Pages/Cart"
                  : "/Ui-components/Pages/Login?next=/Ui-components/Pages/Cart"
              }
              className="relative"
              onClick={(e) => {
                if (!isLoggedIn) {
                  e.preventDefault();
                  router.push(
                    "/Ui-components/Pages/Login?next=/Ui-components/Pages/Cart"
                  );
                }
              }}
            >
              <i className="bi bi-cart3 text-3xl"></i>
              {countsReady && countCart > 0 && (
                <span className="absolute -top-2 -end-1 bg-black text-white text-sm min-w-5 h-5 px-1 flex justify-center items-center rounded-full">
                  {countCart}
                </span>
              )}
            </Link>
          </div>

          <button
            onClick={toggleMenu}
            className="text-2xl focus:outline-none lg:hidden cursor-pointer"
            aria-label="Menu"
          >
            <i className="ri-menu-line"></i>
          </button>
        </div>
      </div>

      {menu && (
        <div className="lg:hidden bg-white border-t border-gray-200 mt-3 transition-all duration-500">
          {navLink.map((link) => (
            <div key={link.label} className="border-b border-gray-100">
              {!link.dropdown && (
                <Link
                  href={link.href}
                  className="block px-6 py-3 text-gray-700"
                  onClick={() => setMenu(false)}
                >
                  {link.label}
                </Link>
              )}

              {link.dropdown && (
                <>
                  <button
                    onClick={() => toggleDropdown(link.label)}
                    className="w-full flex justify-between items-center px-6 py-3 text-gray-700 cursor-pointer"
                  >
                    {link.label}
                    <span
                      className={`transition-transform ${
                        openDropdown[link.label] ? "rotate-180" : ""
                      }`}
                    >
                      <i className="ri-arrow-down-s-line"></i>
                    </span>
                  </button>

                  {openDropdown[link.label] && (
                    <div className="ps-8 pb-2">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block py-2 text-sm text-gray-600"
                          onClick={() => setMenu(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}

          <div className="border-b border-gray-100 px-6 py-3 space-y-2">
            {isLoggedIn ? (
              <>
                <Link
                  href="/Ui-components/Pages/Account"
                  className="block text-gray-700"
                  onClick={() => setMenu(false)}
                >
                  {t.nav.myAccount}
                </Link>
                <button
                  type="button"
                  className="block text-start text-(--second) font-semibold cursor-pointer"
                  onClick={logout}
                >
                  {t.common.logout}
                </button>
              </>
            ) : (
              <Link
                href="/Ui-components/Pages/Login"
                className="block text-gray-700"
                onClick={() => setMenu(false)}
              >
                {t.common.loginRegister}
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
