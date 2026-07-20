"use client";

import Link from "next/link";

function PolicyLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="page-section flex justify-center items-center text-center">
        <div className="z-10 px-4">
          <h2 className="text-white text-5xl md:text-7xl GolosText font-semibold">
            {title}
          </h2>
          <div className="flex mt-5 text-lg md:text-2xl justify-center gap-1">
            <Link href="/" className="hover:text-(--prim) text-white">
              Home
            </Link>
            <i className="ri-arrow-right-wide-line pt-1 px-2 text-white"></i>
            <span className="text-(--prim)">{title}</span>
          </div>
        </div>
      </div>
      <div className="px-[8%] lg:px-[16%] py-14 md:py-20 max-w-4xl mx-auto">
        <div className="rounded-3xl border border-black/10 bg-white p-8 md:p-10 Lufga text-gray-700 space-y-4 leading-relaxed">
          {children}
        </div>
      </div>
    </>
  );
}

export default function PrivacyPage() {
  return (
    <PolicyLayout title="Privacy Policy">
      <p>
        FashiQue collects account details (name, email, phone) and order data
        only to process purchases, support, and notifications.
      </p>
      <p>
        We do not sell your personal data. Payment card details entered on the
        checkout mock form are not stored on our servers.
      </p>
      <p>
        You may request account data deletion by contacting support through the
        Contact page.
      </p>
    </PolicyLayout>
  );
}
