"use client";

import Link from "next/link";

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-[#fffaf3] flex items-center justify-center px-6 py-16">
      <div className="max-w-2xl w-full text-center bg-white border border-black/10 rounded-3xl p-10 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#FEEB9D] flex items-center justify-center">
          <i className="bi bi-wifi-off text-4xl text-(--second)"></i>
        </div>

        <p className="text-sm uppercase tracking-[0.2em] text-gray-500 Lufga mb-2">
          Network Issue
        </p>
        <h1 className="GolosText text-4xl md:text-6xl font-bold mb-4">
          You Are Offline
        </h1>
        <p className="text-gray-600 Lufga text-base md:text-lg mb-8">
          Your internet connection appears to be down. Reconnect and try again.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn bg-black text-white px-6 py-3 rounded-xl GolosText text-lg cursor-pointer"
          >
            Retry
          </button>
          <Link
            href="/"
            className="border border-black px-6 py-3 rounded-xl GolosText text-lg hover:bg-black hover:text-white transition-all"
          >
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
}
