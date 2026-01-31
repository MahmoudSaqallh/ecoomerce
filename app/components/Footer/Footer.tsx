"use client";

import Link from "next/link";

export default function Footer() {
  const columns = [
    {
      title: "Our Stores",
      links: ["New York", "London", "Paris", "Dubai", "Tokyo"],
    },
    {
      title: "Customer Care",
      links: ["Contact", "Shipping", "Returns", "FAQ", "Support"],
    },
    {
      title: "About",
      links: ["Our Story", "Careers", "Blog", "Privacy Policy", "Terms"],
    },
  ];

  return (
    <footer className="px-[8%] lg:px-[16%] pt-20">

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 pb-10 border-b">
      
        <div className="lg:col-span-1">
          <Link
            href="/"
            className="text-4xl lg:text-3xl font-bold Audiowide text-black inline-block"
          >
            Fashi<span className="text-[var(--second)]"> Que</span>
          </Link>

          <div className="mt-6 space-y-3">
            <p className="GolosText">Address: 451 Wall Street, UK</p>
            <p className="GolosText">E-mail: name@info.com</p>
            <p className="GolosText">Phone: 324245333535</p>
          </div>

          <h4 className="mt-8 GolosText font-semibold">
            Subscribe to our newsletter
          </h4>

          <div className="mt-3 bg-yellow-100 px-4 py-2 rounded-md border">
            <input
              type="email"
              placeholder="Your Email Address..."
              className="focus:outline-none w-full bg-transparent text-black GolosText"
            />
          </div>
        </div>

        {/* Links */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="GolosText mb-5 font-semibold text-2xl">
                  {col.title}
                </h2>

                <div className="flex flex-col gap-3">
                  {col.links.map((label) => (
                    <Link
                      key={`${col.title}-${label}`}
                      href="#"
                      className="GolosText font-semibold hover:text-[var(--second)] transition-all duration-300"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className="py-6 text-center">
        <p className="GolosText text-sm text-black/70">
          © 2025. All Rights Reserved by me
        </p>
      </div>
    </footer>
  );
}
