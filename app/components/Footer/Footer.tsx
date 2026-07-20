"use client";

import Link from "next/link";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All products", href: "/Ui-components/shop" },
      { label: "Wishlist", href: "/Ui-components/Pages/WishList" },
      { label: "Cart", href: "/Ui-components/Pages/Cart" },
      { label: "My Account", href: "/Ui-components/Pages/Account" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "Contact", href: "/Ui-components/Pages/Contact" },
      { label: "Shipping", href: "/Ui-components/Pages/Shipping" },
      { label: "Returns", href: "/Ui-components/Pages/Returns" },
      { label: "FAQ", href: "/Ui-components/Pages/Faq" },
      { label: "Complaints", href: "/Ui-components/Pages/Complaints" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", href: "/Ui-components/Pages/AboutAs" },
      { label: "Blog", href: "/Ui-components/Blogs" },
      { label: "Privacy Policy", href: "/Ui-components/Pages/Privacy" },
      { label: "Terms", href: "/Ui-components/Pages/Terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="px-[8%] lg:px-[16%] pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 pb-10 border-b">
        <div className="lg:col-span-1">
          <Link
            href="/"
            className="text-4xl lg:text-3xl font-bold Audiowide text-black inline-block"
          >
            Fashi<span className="text-[var(--second)]"> Que</span>
          </Link>

          <div className="mt-6 space-y-3">
            <p className="GolosText">Address: 451 Wall Street, UK</p>
            <p className="GolosText">E-mail: hello@fashique.com</p>
            <p className="GolosText">Phone: +123 456 789</p>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="GolosText mb-5 font-semibold text-2xl">
                  {col.title}
                </h2>
                <div className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <Link
                      key={`${col.title}-${link.label}`}
                      href={link.href}
                      className="GolosText font-semibold hover:text-[var(--second)] transition-all duration-300"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-6 text-center">
        <p className="GolosText text-sm text-black/70">
          © {new Date().getFullYear()} FashiQue. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
