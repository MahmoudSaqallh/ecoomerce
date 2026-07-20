"use client";

import Link from "next/link";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import callImg from "@/public/nav-contact.svg";

export default function Middel() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(e?: FormEvent) {
    e?.preventDefault();
    const q = query.trim();
    if (!q) {
      router.push("/Ui-components/shop");
      return;
    }
    router.push(`/Ui-components/shop?q=${encodeURIComponent(q)}`);
  }

  return (
    <div className="w-full bg-(--prim) border-b border-gray-300 relative">
      <div className="flex items-center justify-between py-3 px-[8%] lg:px-[14%]">
        <Link
          href="/"
          className="text-2xl lg:text-4xl font-bold Audiowide text-black"
        >
          Fashi<span className="text-(--second)"> Que</span>
        </Link>

        <form
          onSubmit={handleSearch}
          className="relative flex flex-col flex-1 mx-4 bg-white rounded-lg lg:max-w-2xl"
        >
          <div className="flex items-center">
            <input
              type="search"
              placeholder="Search for a product or brand"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-4 outline-none rounded-l-lg"
              aria-label="Search products"
            />
            <button
              type="submit"
              className="px-3 text-2xl cursor-pointer"
              aria-label="Search"
            >
              <i className="bi bi-search"></i>
            </button>
          </div>
        </form>

        <div className="flex items-center gap-2">
          <Image src={callImg} alt="" width={50} height={50} />
          <div className="flex flex-col">
            <h2 className="GolosText text-xs ps-2 font-semibold">24/7 SUPPORT</h2>
            <h1 className="GolosText font-semibold">+ 123 456 789</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
