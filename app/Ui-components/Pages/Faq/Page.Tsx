"use client";

import Link from "next/link";
import Image from "next/image";
import FagImg from "@/public/faq-img.webp";
import { useMemo, useState } from "react";
import { useLanguage } from "@/app/i18n/LanguageContext";

export default function Page() {
  const { t, dir } = useLanguage();
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

  const categories = useMemo(
    () => [
      { icon: "bi bi-box", label: f.general },
      { icon: "bi bi-cart3", label: f.returns },
      { icon: "bi bi-gift", label: f.gift },
      { icon: "bi bi-currency-dollar", label: f.refunds },
      { icon: "bi bi-credit-card", label: f.payments },
      { icon: "bi bi-truck", label: f.shipping },
    ],
    [f]
  );

  const toggle = (index: number) => {
    setopenindex(openindex === index ? null : index);
  };

  return (
    <div dir={dir}>
      <div className="flex flex-col lg:flex-row justify-between items-center h-full lg:h-[75vh] gap-5">
        <div className="w-full lg:w-1/2 flex justify-center items-center bg-[#ffedd4] h-full py-10 lg:py-0 ps-[8%] lg:px-[5%] pe-10">
          <div>
            <h2 className="text-4xl GolosText text-start">{f.haveQuestions}</h2>

            <div className="flex text-2xl items-center">
              <Link href="/" className="hover:text-(--second)">
                {f.home}
              </Link>
              <i className="ri-arrow-right-wide-line pt-2 px-2 i18n-flip"></i>
              <span>{f.title}</span>
            </div>

            <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {categories.map((cat) => (
                <div
                  key={cat.label}
                  className="border hover:border-(--second) cursor-pointer hover:text-(--second) transition-all rounded-md py-2 flex items-center justify-center gap-3 p-5"
                >
                  <i className={`${cat.icon} text-2xl text-black`}></i>
                  <h2 className="text-2xl GolosText">{cat.label}</h2>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <Image src={FagImg} alt="faq" className="w-full h-full" />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 pe-[8%] lg:pe-[16%] ps-10">
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
                  <span className="text-sm md:text-base GolosText font-semibold hover:text-(--second) transition-all duration-300 pe-3">
                    {item.questions}
                  </span>
                  {openindex === index ? (
                    <i className="bi bi-dash-circle-fill text-xl text-black shrink-0"></i>
                  ) : (
                    <i className="bi bi-plus-circle-fill text-xl text-black shrink-0"></i>
                  )}
                </button>

                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    openindex === index
                      ? "max-h-75 opacity-100 py-3"
                      : "max-h-0 opacity-0 py-0"
                  }`}
                >
                  <p className="GolosText text-black text-start">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
