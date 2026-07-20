"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useEffect, useState } from "react";

type ApiProduct = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};

export default function Trending() {
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
      <div className="px-[14%] lg-px-[16%] py-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">
          <div>
            <h2 className="text-5xl font-medium Lufga">What is Trending now</h2>
            <p className="GolosText text-lg mt-1">
              Discover the most trending products in FashiQue.
            </p>
          </div>
          <div>
            <Link
              href="/Ui-components/shop"
              className="btn bg-black text-white cursor-pointer GolosText text-xl px-6 py-3 rounded-md transition-all duration-300"
            >
              View all
            </Link>
          </div>
        </div>

        <div className="trending-swiper">
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
                <Link href={`/Ui-components/shop/${item.id}`} className="group block">
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
                      <h3 className="GolosText text-lg md:text-xl font-bold text-black line-clamp-1 tracking-tight">
                        {item.name}
                      </h3>
                      <div className="flex items-center justify-between gap-3">
                        <p className="Lufga text-base md:text-lg font-semibold text-(--second)">
                          ${item.price}
                        </p>
                        <span className="Lufga text-sm text-gray-500 underline underline-offset-4 group-hover:text-black transition-colors">
                          Details
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
      <ToastContainer position="top-right" autoClose={1500} />
    </>
  );
}
