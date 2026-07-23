"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/app/i18n/LanguageContext";

type ApiProduct = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  categoryId?: string;
};

export default function PoplouerProudect() {
  const ContainerRef = useRef(null);
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const { t, dir } = useLanguage();

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

  useEffect(() => {
    async function loadMix() {
      if (typeof window !== "undefined" && ContainerRef.current) {
        const mixitup = (await import("mixitup")).default;
        mixitup(ContainerRef.current, {
          animation: { duration: 400 },
        });
      }
    }
    if (products.length) loadMix();
  }, [products]);

  const addwishlist = (proudect: ApiProduct) => {
    import("../../api/session").then(
      ({ getWishlist, setWishlist, requireLoginForAction, redirectToLogin }) => {
        if (!requireLoginForAction()) {
          toast.info(t.common.pleaseLoginWishlist);
          redirectToLogin("/");
          return;
        }
        const wishlist = getWishlist();
        if (wishlist.find((item: { id: string }) => item.id === proudect.id)) {
          toast.info(t.common.alreadyInWishlist);
          return;
        }
        wishlist.push({
          id: proudect.id,
          title: proudect.name,
          price: `$${proudect.price}`,
          image: proudect.imageUrl,
        });
        setWishlist(wishlist);
        toast.success(t.common.addedToWishlist);
      }
    );
  };

  const addtocart = (proudect: ApiProduct) => {
    import("../../api/session").then(
      ({ getCart, setCart, requireLoginForAction, redirectToLogin }) => {
        if (!requireLoginForAction()) {
          toast.info(t.common.pleaseLoginCart);
          redirectToLogin("/");
          return;
        }
        const cart = getCart();
        if (cart.find((item: { id: string }) => item.id === proudect.id)) {
          toast.info(t.common.alreadyInCart);
          return;
        }
        cart.push({
          id: proudect.id,
          title: proudect.name,
          price: `$${proudect.price}`,
          image: proudect.imageUrl,
          qty: 1,
        });
        setCart(cart);
        toast.success(t.common.addedToCart);
      }
    );
  };

  return (
    <>
      <div className="px-[14%] lg-px-[16%] py-20 mt-20" dir={dir}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="text-center md:text-start">
            <h2 className="text-5xl font-medium Lufga">{t.home.popularTitle}</h2>
            <p className="GolosText text-lg mt-1">
              {t.home.popularSubtitle}
            </p>
          </div>
          <Link
            href="/Ui-components/shop"
            className="btn bg-black text-white cursor-pointer GolosText text-xl px-6 py-3 rounded-md transition-all duration-300"
          >
            {t.nav.allProducts}
          </Link>
        </div>

        <div className="mt-10">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
            ref={ContainerRef}
          >
            {products.map((item) => (
              <div key={item.id} className="mix">
                <div className="proudect-card popular-product cursor-pointer py-5">
                  <Link href={`/Ui-components/shop/${item.id}`} className="group block">
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
                        <p className="Lufga text-base md:text-lg font-semibold text-(--second) i18n-ltr" dir="ltr">
                          ${item.price}
                        </p>
                        <span className="Lufga text-sm text-gray-500 underline underline-offset-4 group-hover:text-black transition-colors">
                          Details
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="mt-3 flex gap-3">
                    <button
                      type="button"
                      className="text-sm Lufga text-gray-600 hover:text-black transition-colors"
                      onClick={() => addtocart(item)}
                    >
                      Add to cart
                    </button>
                    <button
                      type="button"
                      className="text-sm Lufga text-gray-600 hover:text-black transition-colors"
                      onClick={() => addwishlist(item)}
                    >
                      Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={1500} />
    </>
  );
}
