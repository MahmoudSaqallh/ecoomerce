"use client";

import Image from "next/image";
import cricleText from "@/public/banner-shop-circle.png";
import playIcons from "@/public/banner-play-icon.png";
import starShap from "@/public/star-shape.svg";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/react-splide/css";
import { useLanguage } from "@/app/i18n/LanguageContext";

export default function Banner() {
  const { t, locale } = useLanguage();
  // Same motion/layout as English — only labels change
  const categories = [...t.home.bannerCats];

  return (
    <>
      <div className="banner relative">
        <div>
          <Image
            className="banner-shop-img"
            src={cricleText}
            alt=""
            width={300}
            height={300}
          />
          <Image
            className="banner-play-img"
            src={playIcons}
            alt=""
            width={100}
            height={100}
          />
        </div>
      </div>

      <div
        className={`w-full overflow-hidden splide-slide-texts ${
          locale === "ar" ? "is-ar" : ""
        }`}
        dir="ltr"
      >
        <Splide
          options={{
            type: "loop",
            drag: "free",
            focus: "center",
            arrows: false,
            pagination: false,
            autoWidth: true,
            gap: "1px",
            speed: 1,
            autoScroll: {
              speed: 1,
              pauseOnHover: false,
              pauseOnFocus: false,
            },
          }}
          extensions={{ AutoScroll }}
        >
          {categories.map((item, index) => (
            <SplideSlide key={`${locale}-${index}-${item}`}>
              <h2 className="text-2xl flex items-center gap-3 font-bold">
                <Image src={starShap} alt="" width={60} height={60} />
                {item}
              </h2>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </>
  );
}
