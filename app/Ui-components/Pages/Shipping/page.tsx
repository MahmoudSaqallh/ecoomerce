"use client";

import Link from "next/link";

export default function ShippingPage() {
  return (
    <>
      <div className="page-section flex justify-center items-center text-center">
        <div className="z-10 px-4">
          <h2 className="text-white text-5xl md:text-7xl GolosText font-semibold">
            Shipping
          </h2>
          <div className="flex mt-5 text-lg md:text-2xl justify-center gap-1">
            <Link href="/" className="hover:text-(--prim) text-white">
              Home
            </Link>
            <i className="ri-arrow-right-wide-line pt-1 px-2 text-white"></i>
            <span className="text-(--prim)">Shipping</span>
          </div>
        </div>
      </div>
      <div className="px-[8%] lg:px-[16%] py-14 md:py-20 max-w-4xl mx-auto">
        <div className="rounded-3xl border border-black/10 bg-white p-8 md:p-10 Lufga text-gray-700 space-y-4 leading-relaxed">
          <p>Orders are typically prepared within 1–2 business days.</p>
          <p>
            Standard shipping usually arrives in 3–7 business days depending on
            your location.
          </p>
          <p>
            You will receive in-app notifications when your order status
            changes (preparing, shipped, delivered).
          </p>
        </div>
      </div>
    </>
  );
}
