"use client";

import Link from "next/link";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import callImg from "@/public/nav-contact.svg";
import { useLanguage } from "@/app/i18n/LanguageContext";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

export default function Middel() {
  const router = useRouter();
  const { t, dir } = useLanguage();
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
    <div className="w-full bg-(--prim) border-b border-gray-300 relative" dir={dir}>
      <div className="flex items-center justify-between py-3 px-[8%] lg:px-[14%] gap-3">
        <Link
          href="/"
          className="text-2xl lg:text-4xl font-bold Audiowide text-black shrink-0"
        >
          Fashi<span className="text-(--second)"> Que</span>
        </Link>

        <form
          onSubmit={handleSearch}
          className="relative flex flex-col flex-1 mx-1 bg-white rounded-lg lg:max-w-2xl min-w-0"
        >
          <div className="flex items-center">
            <input
              type="search"
              placeholder={t.common.searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="nav-search-input flex-1 px-4 py-4 outline-none rounded-s-lg min-w-0"
              aria-label={t.common.search}
            />
            <button
              type="submit"
              className="px-3 text-2xl cursor-pointer shrink-0"
              aria-label={t.common.search}
            >
              <i className="bi bi-search"></i>
            </button>
          </div>
        </form>

        <div className="flex items-center gap-3 shrink-0">
          <LanguageSwitcher />
          <div className="hidden xl:flex items-center gap-2">
            <Image src={callImg} alt="" width={44} height={44} />
            <div className="flex flex-col text-start">
              <h2 className="GolosText text-[11px] font-semibold leading-tight">
                {t.nav.support}
              </h2>
              <h1 className="GolosText font-semibold text-sm tracking-wide" dir="ltr">
                +123 456 789
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
