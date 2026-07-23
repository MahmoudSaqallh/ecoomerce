"use client";

import Image from "next/image";
import company1 from "@/public/company-1.webp";
import company2 from "@/public/company-2.webp";
import company3 from "@/public/company-3.webp";
import company4 from "@/public/company-4.webp";
import company5 from "@/public/company-5.webp";
import company6 from "@/public/company-6.webp";
import company7 from "@/public/company-7.webp";
import company8 from "@/public/company-8.webp";
import bannerStar from "@/public/banner-star.svg";
import bannerCircle from "@/public/banner-2-circle.png";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/react-splide/css";
import { useLanguage } from "@/app/i18n/LanguageContext";

const companys = [
  company1,
  company2,
  company3,
  company4,
  company5,
  company6,
  company7,
  company8,
];

export default function Company() {
  const { t, locale } = useLanguage();

  return (
    <div className="px-[8%] py-20 pt-30">
      {/* Keep same visual layout as English (badge right, logos LTR) */}
      <div className="compaines-banner relative py-20" dir="ltr">
        <div className="company-shape hidden lg:block">
          <Image src={bannerCircle} alt="partner" width={200} height={200} />
          <Image src={bannerStar} alt="" width={70} height={70} />
        </div>

        <div className="company-banner-copy relative z-10 px-[5%] md:px-[8%]">
          <h1
            className={`GolosText text-white text-3xl md:text-5xl lg:text-7xl font-semibold w-full mx-auto text-center leading-[1.15] ${
              locale === "ar"
                ? "max-w-[78%] lg:max-w-[58%] company-title-ar"
                : "max-w-[90%] lg:max-w-[74%]"
            }`}
            dir={locale === "ar" ? "rtl" : "ltr"}
            lang={locale}
          >
            {t.home.companiesTitle}
          </h1>
        </div>

        <div className="w-full md:mt-20 mt-10 overflow-hidden">
          <Splide
            options={{
              type: "loop",
              drag: "free",
              arrows: false,
              pagination: false,
              autoWidth: true,
              gap: "40px",
              autoScroll: {
                speed: -0.5,
                pauseOnHover: true,
                pauseOnFocus: false,
              },
            }}
            extensions={{ AutoScroll }}
          >
            {companys.map((logo, index) => (
              <SplideSlide key={`a-${index}`}>
                <div className="company-card cursor-pointer bg-white px-10 py-8 rounded-2xl">
                  <Image src={logo} alt="" />
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>

        <div className="w-full md:mt-20 mt-10 overflow-hidden">
          <Splide
            options={{
              type: "loop",
              drag: "free",
              arrows: false,
              pagination: false,
              autoWidth: true,
              gap: "60px",
              autoScroll: {
                speed: 0.6,
                pauseOnHover: true,
                pauseOnFocus: false,
              },
            }}
            extensions={{ AutoScroll }}
          >
            {companys.map((logo, index) => (
              <SplideSlide key={`b-${index}`}>
                <div className="company-card cursor-pointer bg-white px-10 py-8 rounded-2xl">
                  <Image src={logo} alt="" />
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </div>
  );
}
