"use client";

import { useLanguage } from "@/app/i18n/LanguageContext";

export default function LanguageSwitcher({
  className = "",
}: {
  className?: string;
}) {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-black/15 bg-white p-0.5 text-xs sm:text-sm font-semibold shadow-sm ${className}`}
      role="group"
      aria-label={t.common.language}
      dir="ltr"
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`cursor-pointer rounded-full px-2.5 py-1.5 transition ${
          locale === "en"
            ? "bg-black text-white shadow"
            : "text-black/65 hover:text-black"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("ar")}
        className={`cursor-pointer rounded-full px-2.5 py-1.5 transition ${
          locale === "ar"
            ? "bg-black text-white shadow"
            : "text-black/65 hover:text-black"
        }`}
      >
        ع
      </button>
    </div>
  );
}
