"use client";

import Link from "next/link";
import Image from "next/image";
import aboutimg1 from "@/public/about-1.webp";
import aboutimg3 from "@/public/about-3.webp";
import aboutimg5 from "@/public/about-5.webp";
import aboutimg6 from "@/public/about-6.webp";
import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useLanguage } from "@/app/i18n/LanguageContext";

export default function Aboutus() {
  const { t, dir, locale } = useLanguage();
  const a = t.pages.about;
  const f = t.pages.faq;
  const [openindex, setopenindex] = useState<number | null>(null);

  const faqData = useMemo(
    () => [
      { questions: f.q1, answer: f.a1 },
      { questions: f.q2, answer: f.a2 },
      { questions: f.q3, answer: f.a3 },
      { questions: f.q4, answer: f.a4 },
      { questions: f.q5, answer: f.a5 },
    ],
    [f]
  );

  const testComents = useMemo(
    () =>
      [1, 2, 3, 4].map((id) => ({
        id,
        text: a.testimonial,
        img: aboutimg3,
        name: a.ceo,
        role: a.ceoRole,
      })),
    [a]
  );

  const toggle = (index: number) => {
    setopenindex(openindex === index ? null : index);
  };

  return (
    <div dir={dir}>
      <div className="page-section flex justify-center items-center text-center">
        <div className="z-10 flex flex-col justify-center items-center text-center">
          <h2 className="text-white text-8xl GolosText font-semibold">
            {a.title}
          </h2>
          <div className="flex mt-5 text-2xl items-center text-center">
            <Link href="/" className="hover:text-(--prim) text-white">
              {a.home}
            </Link>
            <i className="ri-arrow-right-wide-line pt-2 px-2 text-white i18n-flip"></i>
            <span className="text-white">{a.title}</span>
          </div>
        </div>
      </div>

      <div className="px-[8%] lg:px-[16%] py-20">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2 text-start">
            <h2 className="text-4xl text-black GolosText font-bold">
              {a.headline}
            </h2>
            <p className="text-gray-400 mt-3">{a.body}</p>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="about-image flex gap-5 h-62.5">
              <Image src={aboutimg1} alt="about" className="rounded-2xl" />
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-5 lg:gap-8 py-6">
          <div className="w-full">
            <div className="about-autohr flex items-center gap-5">
              <Image
                src={aboutimg3}
                alt="ceo"
                className="rounded-full w-25"
              />
              <div className="text-start">
                <h2 className="Lufga text-2xl text-black font-bold">
                  {a.ceo}
                </h2>
                <span className="GolosText text-black text-lg">
                  {a.ceoRole}
                </span>
              </div>
            </div>

            <div className="space-y-1 w-full py-10">
              {faqData.map((item, index) => (
                <div
                  key={index}
                  className={`overflow-hidden py-2 transition-all duration-300 ${
                    openindex === index ? "rounded-2xl" : ""
                  }`}
                >
                  <button
                    className="w-full flex justify-between items-center text-start focus:outline-none cursor-pointer border border-black rounded-lg px-6 py-4"
                    onClick={() => toggle(index)}
                  >
                    <span className="text-xl GolosText font-semibold hover:text-(--second) transition-all duration-300">
                      {item.questions}
                    </span>
                    {openindex === index ? (
                      <i className="bi bi-dash-circle-fill text-xl text-black"></i>
                    ) : (
                      <i className="bi bi-plus-circle-fill text-xl text-black"></i>
                    )}
                  </button>

                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      openindex === index
                        ? "max-h-75 opacity-100 py-3"
                        : "max-h-0 opacity-0 py-0"
                    }`}
                  >
                    <p className="GolosText text-black text-start">
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-8 py-6">
          <div className="w-full lg:w-1/2">
            <div className="about-section flex gap-15 flex-col lg:flex-row">
              <div className="about-heading text-start">
                <h2 className="GolosText font-bold text-black text-7xl">
                  50+
                </h2>
                <span className="text-black text-xl font-semibold">
                  {a.itemsSale}
                </span>
              </div>
              <div className="about-heading text-start">
                <h2 className="GolosText font-bold text-black text-7xl">
                  400%
                </h2>
                <span className="text-black text-xl font-semibold">
                  {a.roi}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 mt-10">
            <div className="about-image">
              <Image src={aboutimg5} alt="about" className="rounded-2xl" />
            </div>
          </div>
        </div>

        <div className="px-[8%] lg:px-[11%] py-20 pb-0 bg-[#ffedd4] -mx-[8%] lg:-mx-[16%]">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-8 px-[8%] lg:px-[11%]">
            <div className="w-full lg:w-1/2 testing-img relative">
              <Image src={aboutimg6} alt="about" />
            </div>

            <div className="w-full lg:w-1/2 text-start">
              <h2 className="GolosText text-3xl md:text-4xl font-bold mb-5">
                {a.clientsSay}
              </h2>

              <Swiper
                key={locale}
                slidesPerView={1}
                spaceBetween={20}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                modules={[Autoplay]}
              >
                {testComents.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className="test-card bg-white rounded-2xl p-8">
                      <p className="text-black text-md mb-5">{item.text}</p>
                      <div className="flex items-center gap-5">
                        <Image
                          src={item.img}
                          alt=""
                          className="rounded-full w-20"
                        />
                        <div>
                          <h2 className="Lufga text-2xl text-black">
                            {item.name}
                          </h2>
                          <span className="text-gray-500">{item.role}</span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
