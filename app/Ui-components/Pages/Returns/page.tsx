"use client";

import Link from "next/link";

export default function ReturnsPage() {
  return (
    <>
      <div className="page-section flex justify-center items-center text-center">
        <div className="z-10 px-4">
          <h2 className="text-white text-5xl md:text-7xl GolosText font-semibold">
            Returns
          </h2>
          <div className="flex mt-5 text-lg md:text-2xl justify-center gap-1">
            <Link href="/" className="hover:text-(--prim) text-white">
              Home
            </Link>
            <i className="ri-arrow-right-wide-line pt-1 px-2 text-white"></i>
            <span className="text-(--prim)">Returns</span>
          </div>
        </div>
      </div>
      <div className="px-[8%] lg:px-[16%] py-14 md:py-20 max-w-4xl mx-auto">
        <div className="rounded-3xl border border-black/10 bg-white p-8 md:p-10 Lufga text-gray-700 space-y-4 leading-relaxed">
          <p>
            Unworn items with tags can be returned within 14 days of delivery.
          </p>
          <p>
            Open a complaint from your account with your order ID and we will
            guide you through the return.
          </p>
          <p>
            Refunds are issued to the original payment method after the return
            is inspected.
          </p>
        </div>
      </div>
    </>
  );
}
