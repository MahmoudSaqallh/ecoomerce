"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/app/i18n/LanguageContext";

type ApiProduct = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};

export default function Trending() {
  const { t, dir, locale } = useLanguage();
  const [products, setProducts] = useState<ApiProduct[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const { fetchItems } = await import("../../api/auth");
        const data = await fetchItems();
        setProducts((data.items || []).slice(0, 8));
      } catch (err) {
        console.log(err);
      }
    }
    load();
  }, []);

  return (
    <>
      <div className="px-[14%] lg:px-[16%] py-20" dir={dir}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="text-center md:text-start">
            <h2 className="text-5xl font-medium Lufga">{t.home.trendingTitle}</h2>
            <p className="GolosText text-lg mt-1">{t.home.trendingSubtitle}</p>
          </div>
          <Link
            href="/Ui-components/shop"
            className="btn bg-black text-white cursor-pointer GolosText text-xl px-6 py-3 rounded-md transition-all duration-300 shrink-0"
          >
            {t.home.viewAll}
          </Link>
        </div>

        <div className="trending-swiper mt-8">
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            loop={products.length > 4}
            autoplay={{ delay: 1800 }}
            modules={[Autoplay]}
            breakpoints={{
              1200: { slidesPerView: 4 },
              991: { slidesPerView: 3 },
              575: { slidesPerView: 2 },
              0: { slidesPerView: 1 },
            }}
          >
            {products.map((item) => (
              <SwiperSlide key={item.id}>
                <Link
                  href={`/Ui-components/shop/${item.id}`}
                  className="group block"
                >
                  <div className="proudect-card cursor-pointer py-5">
                    <div className="proudect-image relative rounded-2xl">
                      <div className="overflow-hidden">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            width={500}
                            height={500}
                            className="w-full h-full object-cover rounded-2xl"
                            unoptimized
                          />
                        ) : (
                          <div className="aspect-square rounded-2xl bg-gray-100" />
                        )}
                      </div>
                    </div>
                    <div className="mt-4 space-y-1">
                      <h3 className="GolosText text-lg md:text-xl font-bold text-black line-clamp-1">
                        {item.name}
                      </h3>
                      <div className="flex items-center justify-between gap-3">
                        <p
                          className="Lufga text-base md:text-lg font-semibold text-(--second) i18n-ltr"
                          dir="ltr"
                        >
                          ${item.price}
                        </p>
                        <span className="Lufga text-sm text-gray-500 underline underline-offset-4 group-hover:text-black transition-colors">
                          {t.home.details}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <ToastContainer
        position={locale === "ar" ? "top-left" : "top-right"}
        autoClose={1500}
      />
    </>
  );
}
