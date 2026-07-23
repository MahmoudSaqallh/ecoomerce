"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { dictionaries, type Dictionary, type Locale } from "./dictionaries";

const STORAGE_KEY = "fashique_locale";

type LanguageContextValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: Dictionary;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "ar" || saved === "en") return saved;
  } catch {
    /* ignore */
  }
  return "en";
}

function applyDocumentDir(locale: Locale) {
  const dir = locale === "ar" ? "rtl" : "ltr";
  const root = document.documentElement;
  root.lang = locale;
  root.dir = dir;
  root.classList.remove("lang-en", "lang-ar");
  root.classList.add(locale === "ar" ? "lang-ar" : "lang-en");
  document.body.dir = dir;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initial = readStoredLocale();
    setLocaleState(initial);
    applyDocumentDir(initial);
    setReady(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    applyDocumentDir(next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "ar" : "en");
  }, [locale, setLocale]);

  const dir: "ltr" | "rtl" = locale === "ar" ? "rtl" : "ltr";
  const t = dictionaries[locale] as Dictionary;

  const value = useMemo((): LanguageContextValue => {
    return { locale, dir, t, setLocale, toggleLocale };
  }, [locale, dir, t, setLocale, toggleLocale]);

  return (
    <LanguageContext.Provider value={value}>
      <div
        className={`site-i18n ${ready ? "is-ready" : ""}`}
        dir={dir}
        lang={locale}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
