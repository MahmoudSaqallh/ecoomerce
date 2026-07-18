"use client";

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#fffaf3] flex items-center justify-center px-6 py-16">
      <div className="max-w-2xl w-full text-center bg-white border border-black/10 rounded-3xl p-10 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        <p className="text-sm uppercase tracking-[0.2em] text-gray-500 Lufga mb-2">
          Error 404
        </p>
        <h1 className="GolosText text-4xl md:text-6xl font-bold mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 Lufga text-base md:text-lg mb-8">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="btn bg-black text-white px-6 py-3 rounded-xl GolosText text-lg"
          >
            Back To Home
          </Link>
          <Link
            href="/Ui-components/shop"
            className="border border-black px-6 py-3 rounded-xl GolosText text-lg hover:bg-black hover:text-white transition-all"
          >
            Go To Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
