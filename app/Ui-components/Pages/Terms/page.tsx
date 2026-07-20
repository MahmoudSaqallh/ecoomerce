"use client";

import Link from "next/link";

export default function TermsPage() {
  return (
    <>
      <div className="page-section flex justify-center items-center text-center">
        <div className="z-10 px-4">
          <h2 className="text-white text-5xl md:text-7xl GolosText font-semibold">
            Terms
          </h2>
          <div className="flex mt-5 text-lg md:text-2xl justify-center gap-1">
            <Link href="/" className="hover:text-(--prim) text-white">
              Home
            </Link>
            <i className="ri-arrow-right-wide-line pt-1 px-2 text-white"></i>
            <span className="text-(--prim)">Terms</span>
          </div>
        </div>
      </div>
      <div className="px-[8%] lg:px-[16%] py-14 md:py-20 max-w-4xl mx-auto">
        <div className="rounded-3xl border border-black/10 bg-white p-8 md:p-10 Lufga text-gray-700 space-y-4 leading-relaxed">
          <p>
            By using FashiQue you agree to provide accurate account and shipping
            information and to use the store for lawful purchases only.
          </p>
          <p>
            Product availability and prices are confirmed at checkout based on
            live stock from our catalog.
          </p>
          <p>
            FashiQue may update these terms; continued use means you accept the
            latest version.
          </p>
        </div>
      </div>
    </>
  );
}
