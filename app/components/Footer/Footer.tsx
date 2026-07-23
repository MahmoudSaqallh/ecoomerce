"use client";

import Link from "next/link";
import { useLanguage } from "@/app/i18n/LanguageContext";

export default function Footer() {
  const { t, dir } = useLanguage();

  const columns = [
    {
      title: t.footer.shop,
      links: [
        { label: t.footer.allProducts, href: "/Ui-components/shop" },
        { label: t.footer.wishlist, href: "/Ui-components/Pages/WishList" },
        { label: t.footer.cart, href: "/Ui-components/Pages/Cart" },
        { label: t.footer.myAccount, href: "/Ui-components/Pages/Account" },
      ],
    },
    {
      title: t.footer.customerCare,
      links: [
        { label: t.footer.contact, href: "/Ui-components/Pages/Contact" },
        { label: t.footer.shipping, href: "/Ui-components/Pages/Shipping" },
        { label: t.footer.returns, href: "/Ui-components/Pages/Returns" },
        { label: t.footer.faq, href: "/Ui-components/Pages/Faq" },
        {
          label: t.footer.complaints,
          href: "/Ui-components/Pages/Complaints",
        },
      ],
    },
    {
      title: t.footer.about,
      links: [
        { label: t.footer.ourStory, href: "/Ui-components/Pages/AboutAs" },
        { label: t.footer.blog, href: "/Ui-components/Blogs" },
        { label: t.footer.privacy, href: "/Ui-components/Pages/Privacy" },
        { label: t.footer.terms, href: "/Ui-components/Pages/Terms" },
      ],
    },
  ];

  return (
    <footer className="px-[8%] lg:px-[16%] pt-20" dir={dir}>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 pb-10 border-b">
        <div className="lg:col-span-1">
          <Link
            href="/"
            className="text-4xl lg:text-3xl font-bold Audiowide text-black inline-block"
          >
            Fashi<span className="text-[var(--second)]"> Que</span>
          </Link>

          <div className="mt-6 space-y-3">
            <p className="GolosText">{t.footer.address}</p>
            <p className="GolosText">{t.footer.email}</p>
            <p className="GolosText" dir="ltr">{t.footer.phone}</p>
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
          © {new Date().getFullYear()} {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
