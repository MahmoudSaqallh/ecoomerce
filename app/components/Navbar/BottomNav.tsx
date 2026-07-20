"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import menuDot from "@/public/Menu-dot.svg";
import {
  clearSessionData,
  getCart,
  getWishlist,
  isAuthenticated,
} from "../../Ui-components/api/session";

type NavLink = {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
};

const navLink: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Shop",
    href: "/Ui-components/shop",
    dropdown: [
      { label: "All Products", href: "/Ui-components/shop" },
      { label: "Sale", href: "/sale" },
      { label: "Cart", href: "/Ui-components/Pages/Cart" },
      { label: "Wishlist", href: "/Ui-components/Pages/WishList" },
    ],
  },
  {
    label: "Blog",
    href: "/Ui-components/Blogs",
    dropdown: [
      { label: "All Posts", href: "/Ui-components/Blogs" },
    ],
  },
  {
    label: "Pages",
    href: "/Ui-components/Pages/AboutAs",
    dropdown: [
      { label: "About Me", href: "/Ui-components/Pages/AboutAs" },
      { label: "FAQ", href: "/Ui-components/Pages/Faq" },
      { label: "Contact Us", href: "/Ui-components/Pages/Contact" },
      { label: "Track Order", href: "/track-order" },
      { label: "Complaints", href: "/Ui-components/Pages/Complaints" },
      { label: "Login", href: "/Ui-components/Pages/Login" },
      { label: "Registration", href: "/Ui-components/Pages/Regester" },
    ],
  },
  {
    label: "Complaints",
    href: "/Ui-components/Pages/Complaints",
  },
  {
    label: "Notifications",
    href: "/Ui-components/Pages/Notifications",
  },
];

export default function BottomNav() {
  const router = useRouter();

  const [isFixed, setIsFixed] = useState(false);
  const [menu, setMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<Record<string, boolean>>({});
  const [wishlistCount, setwishlistCount] = useState(0);
  const [countCart, setcountCart] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifCount, setNotifCount] = useState(0);
  const [countsReady, setCountsReady] = useState(false);

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
        (n) => !n.read && n.type !== "account"
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
      ...Object.fromEntries(
        Object.keys(prev).map((key) => [key, false])
      ),
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
        isFixed ? "fixed top-0 left-0 z-50" : ""
      }`}
    >

      <div className="w-full flex items-center justify-between px-[8%] lg:px-[16%] text-gray-700">

        {/* Mobile logo — hidden when navbar sticks on scroll */}
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

        {/* DESKTOP NAV */}
        <nav className="menu-link hidden lg:flex space-x-6 relative z-40">

          {navLink.map((link) =>
            link.dropdown ? (

              <div key={link.label} className="relative group">

                <Link
                  href={link.href}
                  className="flex GolosText items-center gap-1"
                >
                  {link.label}

                  <Image src={menuDot} alt="menuDot" />
                </Link>

                {/* DROPDOWN */}
                <div className="absolute bg-white left-0 top-full hidden group-hover:block shadow-xl p-2 border border-gray-100 rounded-lg min-w-[170px]">

                  {link.dropdown.map((item) => (

                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2 rounded-md transition-all hover:bg-gray-50"
                    >

                      <div className="flex gap-2 items-center">

                        <Image src={menuDot} alt="menuDot" />

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

                <Image src={menuDot} alt="menuDot" />
              </Link>

            )
          )}

        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-5">

          {/* LOGIN / LOGOUT */}
          {isLoggedIn ? (
            <button
              onClick={logout}
              className="login-link border-b border-gray-400 GolosText font-semibold hidden lg:block cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/Ui-components/Pages/Login"
              className="login-link border-b border-gray-400 GolosText font-semibold hidden lg:block"
            >
              Login / Register
            </Link>
          )}

          {/* ICONS */}
          <div className="flex items-center gap-6">

            {isLoggedIn ? (
              <Link
                href="/Ui-components/Pages/Account"
                className="relative"
                title="My Account"
                aria-label="My Account"
              >
                <i className="bi bi-person text-3xl"></i>
              </Link>
            ) : null}

            <Link
              href="/Ui-components/Pages/Notifications"
              className="relative"
              title="Notifications"
            >
              <i className="bi bi-bell text-3xl"></i>

              {countsReady && notifCount > 0 && (
                <span className="absolute -top-2 left-3 bg-(--second) text-white text-sm w-5 h-5 flex justify-center items-center rounded-full">
                  {notifCount > 9 ? "9+" : notifCount}
                </span>
              )}
            </Link>

            <Link
              href="/Ui-components/Pages/WishList"
              className="relative"
            >
              <i className="bi bi-balloon-heart text-3xl"></i>

              {countsReady && wishlistCount > 0 && (
                <span className="absolute -top-2 left-3 bg-black text-white text-sm w-5 h-5 flex justify-center items-center rounded-full">
                  {wishlistCount}
                </span>
              )}

            </Link>

            <Link
              href="/Ui-components/Pages/Cart"
              className="relative"
            >

              <i className="bi bi-cart3 text-3xl"></i>

              {countsReady && countCart > 0 && (
                <span className="absolute -top-2 left-3 bg-black text-white text-sm w-5 h-5 flex justify-center items-center rounded-full">
                  {countCart}
                </span>
              )}

            </Link>

          </div>

          {/* MOBILE MENU */}
          <div className="flex items-center gap-4">

            <button
              onClick={toggleMenu}
              className="text-2xl focus:outline-none"
            >
              <i className="ri-menu-line lg:hidden flex items-center gap-4 cursor-pointer"></i>
            </button>

          </div>

        </div>

      </div>

      {/* MOBILE MENU */}
      {menu && (

        <div className="lg:hidden bg-white border-t border-gray-200 mt-3 transition-all duration-500">

          {navLink.map((link) => (

            <div
              key={link.label}
              className="border-b border-gray-100"
            >

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
                    className="w-full flex justify-between items-center px-6 py-3 text-gray-700"
                  >
                    {link.label}

                    <span
                      className={`transition-transform ${
                        openDropdown[link.label]
                          ? "rotate-180"
                          : ""
                      }`}
                    >
                      <i className="ri-arrow-down-s-line transition-transform"></i>
                    </span>

                  </button>

                  {openDropdown[link.label] && (

                    <div className="pl-8 pb-2">

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
                  My Account
                </Link>
                <button
                  type="button"
                  className="block text-left text-(--second) font-semibold"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/Ui-components/Pages/Login"
                className="block text-gray-700"
                onClick={() => setMenu(false)}
              >
                Login / Register
              </Link>
            )}
          </div>

        </div>

      )}

    </div>
  );
}