"use client";

import Link from "next/link";
import Image from "next/image";
import category1 from "@/public/Category-1.webp";
import category2 from "@/public/Category-2.webp";
import category3 from "@/public/Category-3.webp";
import category4 from "@/public/Category-4.webp";
import category5 from "@/public/Category-5.webp";
import category6 from "@/public/Category-6.webp";
import { useLanguage } from "@/app/i18n/LanguageContext";

const categories = [
  { image: category1, labelEn: "Jacket", labelAr: "جاكيت", q: "Jacket" },
  { image: category2, labelEn: "Jeans", labelAr: "جينز", q: "Jeans" },
  { image: category3, labelEn: "Shirts", labelAr: "قمصان", q: "Shirts" },
  { image: category4, labelEn: "Shorts", labelAr: "شورت", q: "Shorts" },
  { image: category5, labelEn: "T-shirt", labelAr: "تيشيرت", q: "T-shirt" },
  { image: category6, labelEn: "Blazer", labelAr: "بليزر", q: "Blazer" },
];

export default function Category() {
  const { locale, dir } = useLanguage();

  return (
    <div className="px-[8%] lg:px-[8%] py-20" dir={dir}>
      <div className="bg-(--prim) px-[8%] py-20 rounded-2xl">
        <div className="category-wrap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {categories.map((cat) => (
            <Link
              key={cat.q}
              href={`/Ui-components/shop?q=${encodeURIComponent(cat.q)}`}
              className="category-cart relative block"
            >
              <Image src={cat.image} alt={cat.labelEn} />
              <span className="bg-white hover:bg-(--second) border-2 border-white hover:text-white cursor-pointer transition-all duration-200 rounded-full GolosText text-2xl px-6 py-3">
                {locale === "ar" ? cat.labelAr : cat.labelEn}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
