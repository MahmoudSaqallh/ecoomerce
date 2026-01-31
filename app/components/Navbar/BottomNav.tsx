"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import menuDot from "@/public/Menu-dot.svg";

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
      { label: "Shop", href: "/Ui-components/shop" },
      { label: "Detailes", href: "/Ui-components/shop/12" },
      { label: "Cart", href:"/Ui-components/Pages/Cart" },
      { label: "Wishlist", href: "/Ui-components/Pages/WishList" }
    ],
  }, 
  {
    label: "Blog",
    href: "/my-app/app/Ui-components/Shop",
    dropdown: [
      { label: "Blog", href: "/my-app/app/Ui-components/Blogs" },
      { label: "Blog Detailes", href: "/my-app/app/Ui-components/Blogs" },
    ],
  },
  {
    label: "Pages",
    href: "/my-app/app/Ui-components/Shop",
    dropdown: [
      { label: "About Me", href: "/my-app/app/Ui-components/Pages/AboutAs" },
      { label: "Pricing Table", href: "/my-app/app/Ui-components/Pages/Pricing" },
      { label: "Gift Vouchers", href: "/my-app/app/Ui-components/Pages/Cart" },
      { label: "Faq", href: "/my-app/app/Ui-components/Pages/Faq" },
      { label: "Login", href: "/my-app/app/Ui-components/Pages/Login" },
      { label: "Registration", href: "/my-app/app/Ui-components/Pages/Regester" },
      { label: "Contact Us", href: "/my-app/app/Ui-components/Pages/Contact" },
    ],
  },
  {
    label: "Countact Us",
    href: "/my-app/app/Ui-components/Pages/Contact",
  },
];

export default function BottomNav() {
  const [isFixed, setIsFixed] = useState(false);
  const [menu, setMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<Record<string, boolean>>({});
  const [wishlistCount, setwishlistCount] = useState(0);
  const [countCart, setcountCart] = useState(0)
  const updateCounts = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    setwishlistCount(wishlist.length)
    setcountCart(cart.length)
  }

  useEffect(() => {
      updateCounts()
  },[]);

  useEffect (() => {
      const handler  = () =>  updateCounts();
      window.addEventListener("storage" , handler);
      return () => window.removeEventListener("storage" , handler)
  },[]);


useEffect(()=> {
  const interval = setInterval(() =>updateCounts() ,500);
  return ()=>  clearInterval(interval)
} ,[])

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

  return (
    <div
      className={`w-full bg-white shadow-sm transition-all py-5 duration-500 ${
        isFixed ? "fixed top-0 left-0 z-50" : ""
      }`}
    >
      <div className="w-full flex items-center justify-between px-[8%] lg:px-[16%] text-gray-700">

        <Link
          href="/"
          className={`text-4xl lg:text-3xl font-bold Audiowide text-black hidden  ${
            isFixed ? "lg:flex" : "hidden"
          }`}
        >
          Fashi<span className="text-(--second)"> Que</span>
        </Link>

        {/* Logo Mobile */}
        <Link
          href="/"
          className="text-4xl lg:text-3xl font-bold Audiowide text-black block lg:hidden"
        >
          Fashi<span className="text-(--second)"> Que</span>
        </Link>

        {/* Desktop Navbar */}
        <nav className=" menu-link hidden lg:flex space-x-6 relative z-40">
          {navLink.map((link) =>
            link.dropdown ? (
              <div key={link.label} className="relative group">
                <Link href={link.href} className="flex GolosText items-center gap-1">
                  {link.label} <Image src={menuDot} alt="menuDot" />
                </Link>

                {/* Dropdown Desktop */}
                <div className="absolute bg-white left-0 top-full hidden group-hover:block bg-red shadow-xl p-2 border border-gray-100 rounded-lg min-w-[170px]">
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
                {link.label} <Image src={menuDot} alt="menuDot" />
              </Link>
            )
          )}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-5">
          <Link
            href="/my-app/app/Ui-components/Pages/Login"
            className="login-link border-b border-gray-400 GolosText font-semibold  hidden lg:block"
          >
            Login / Regiseter
          </Link>

          <div className=" lg:flex items-center gap-6">
            <Link href= "/Ui-components/Pages/WishList" className="relative">
              <i className="bi bi-balloon-heart text-3xl"></i>
              {wishlistCount > 0 && (
                <span className="absolute -top-2  left-3 bg-black text-white text-sm  w-5 h-5  flex justify-center items-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link href="/Ui-components/Pages/Cart" className="relative">
              <i className="bi bi-cart3 text-3xl"></i>
                  {countCart > 0 && (
                <span className="absolute -top-2  left-3 bg-black text-white text-sm  w-5 h-5  flex justify-center items-center rounded-full">
                  {countCart}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className=" flex items-center gap-4">
            <button onClick={toggleMenu} className="text-2xl focus:outline-none">
              <i className="ri-menu-line lg:hidden flex items-center gap-4 cursor-pointer"></i>
    
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
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

              {/* link مع dropdown */}
              {link.dropdown && (
                <>
                  <button
                    onClick={() => toggleDropdown(link.label)}
                    className="w-full flex justify-between items-center px-6 py-3 text-gray-700"
                  >
                    {link.label}
                    <span
                      className={`transition-transform ${
                        openDropdown[link.label] ? "rotate-180" : ""
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
        </div>
      )}
    </div>
  );
}
