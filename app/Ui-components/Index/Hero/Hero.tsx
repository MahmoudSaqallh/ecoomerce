"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeroImg from "@/public/Hero.webp";
import HeroSmall from "@/public/hero-small-1.webp";
import { useLanguage } from "@/app/i18n/LanguageContext";
import { resolveSitePath } from "@/app/lib/sitePaths";

type Banner = {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  buttonText: string;
  link: string;
};

function isUploadedImage(url: string) {
  return url.startsWith("http") || url.includes("/uploads/");
}

export default function Hero() {
  const { t, dir } = useLanguage();
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const { fetchBanners } = await import("../../api/auth");
        const data = await fetchBanners();
        setBanners(Array.isArray(data) ? data : data?.banners || []);
      } catch {
        setBanners([]);
      }
    }
    void load();
  }, []);

  const mainBanner = banners[0];
  const cardBanner = banners[1];

  const title = mainBanner?.title || t.home.heroTitle;
  const description = mainBanner?.description || t.home.heroDescription;
  const primaryLabel = mainBanner?.buttonText || t.home.ourShop;
  const primaryLink = resolveSitePath(mainBanner?.link);

  const cardTitle = cardBanner?.title || t.home.summerCollection;
  const cardDescription = cardBanner?.description || t.home.summerDesc;
  const cardLink = resolveSitePath(cardBanner?.link);

  const mainUpload =
    mainBanner?.imageUrl && isUploadedImage(mainBanner.imageUrl)
      ? mainBanner.imageUrl
      : null;
  const cardUpload =
    cardBanner?.imageUrl && isUploadedImage(cardBanner.imageUrl)
      ? cardBanner.imageUrl
      : null;

  return (
    <div className="hero-section px-[8%] lg:px-[10%] lg:ps-[16%] py-10" dir={dir}>
      <div className="flex flex-col lg:flex-row gap-5 justify-between items-center relative">
        <div className="hero-shape3"></div>
        <div className="hero-shape4"></div>

        <div className="w-full lg:w-1/2">
          <div className="hero-content text-start">
            <h1 className="GolosText text-4xl md:text-7xl lg:text-[4rem] font-semibold leading-tight">
              {title}
            </h1>
            <p className="GolosText mt-3 text-xl md:text-[1rem]">{description}</p>
            <div className="flex items-center gap-5 mt-5 flex-wrap">
              <Link href={primaryLink}>
                <button className="btn bg-black text-white cursor-pointer GolosText text-xl px-6 py-3 rounded-md transition-all duration-300">
                  {primaryLabel}
                </button>
              </Link>
              <Link href="/sale">
                <button className="btn border border-black hover:bg-black hover:text-white cursor-pointer GolosText text-xl px-6 py-3 rounded-md transition-all duration-300">
                  {t.home.viewSale}
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="hero-image min-h-[320px] md:min-h-[420px]">
            <div className="hero-sapes1"></div>
            <div className="hero-sapes2"></div>
            <div className="border-shap1"></div>
            <div className="border-shap2"></div>
            <div className="star-shap"></div>
            <div className="star-shap2"></div>
            <div className="star-shap3"></div>

            <Link
              href={cardLink}
              className="absolute bottom-6 start-2 md:start-6 z-30 max-w-[280px] shadow-2xl bg-[#ffffffcb] backdrop-blur-2xl px-3 py-2 flex items-center gap-2 rounded-2xl"
            >
              {cardUpload ? (
                <img
                  src={cardUpload}
                  alt={cardTitle}
                  className="h-16 w-16 shrink-0 rounded-2xl object-cover"
                />
              ) : (
                <Image
                  src={HeroSmall}
                  alt={cardTitle}
                  width={64}
                  height={64}
                  className="h-16 w-16 shrink-0 rounded-2xl object-cover"
                />
              )}
              <div className="min-w-0 flex-1 relative pe-10">
                <h2 className="GolosText text-sm font-semibold line-clamp-1">
                  {cardTitle}
                </h2>
                <p className="GolosText text-xs text-gray-600 line-clamp-1">
                  {cardDescription}
                </p>
                <i className="bi bi-basket absolute bottom-0 end-0 bg-(--second) hover:bg-(--prim) hover:text-black cursor-pointer text-white px-3 py-2 rounded-full transition-all duration-300"></i>
              </div>
            </Link>

            <div className="relative z-20 flex justify-center lg:justify-end pt-2">
              {mainUpload ? (
                <img
                  src={mainUpload}
                  alt={title}
                  className="w-full md:w-[80%] lg:w-[80%] max-h-[520px] rounded-2xl object-cover"
                />
              ) : (
                <Image
                  src={HeroImg}
                  alt={title}
                  width={720}
                  height={900}
                  priority
                  className="w-full md:w-[80%] lg:w-[80%] h-auto max-h-[520px] rounded-2xl object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
