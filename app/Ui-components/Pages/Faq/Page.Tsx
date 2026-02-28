
"use client";

import Link from 'next/link'
import Image from "next/image";
import FagImg from "@/public/faq-img.webp";
import { useState } from 'react';

const fagData = [
  {questions :  "How can I contact customer support?" , answer :"If your order has not yet shipped, you can contact us to change your shipping address. If your order has already shipped, we may not be able to change the address."},
  {questions : "Can I cancel my order?" , answer : "If your order has not yet shipped, you can contact us to change your shipping address. If your order has already shipped, we may not be able to change the address."},
  {questions : "Do you offer international shipping?" , answer : "If your order has not yet shipped, you can contact us to change your shipping address. If your order has already shipped, we may not be able to change the address."},
  {questions : "Can I track my order in real-time?" , answer : "If your order has not yet shipped, you can contact us to change your shipping address. If your order has already shipped, we may not be able to change the address."}, 
  {questions: "How do I know if a product is in stock?" , answer: "If your order has not yet shipped, you can contact us to change your shipping address. If your order has already shipped, we may not be able to change the address." }
];


export default function Page() {
    const [openindex, setopenindex] = useState(null);
    const toggle = (index:any) => {
      setopenindex(openindex === index ? null :index)
    }
  return (
    <>
    <div className="flex flex-col lg:flex-row justify-between items-center h-full lg:h-[75vh] gap-5">
      
        <div className="w-full lg:w-1/2 flex justify-center items-center bg-[#ffedd4] h-full py-10 lg:py-0 ps-[8%] lg:px-[5%] pe-10">
          <div className="">
            <h2 className='text-4xl GolosText'>
              Have any questions?
            </h2>

            <div className="flex text-2x1 items-center">
              <Link href="/" className='hover:text-(--second)'> Home</Link>
              <i className='ri-arrow-right-wide-line pt-2 px-2'></i>
              <span>Faq's</span>
            </div>

            <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="border hover:border-(--second) cursor-pointer hover:text-(--second) transition-all rounded-md py-2 flex items-center justify-center gap-3 p-5">
                    <i className='bi bi-box text-2x1 text-black'></i>
                    <h2 className='text-2xl GolosText '>General</h2>
              </div>
              <div className="border hover:border-(--second) cursor-pointer hover:text-(--second) transition-all rounded-md py-2 flex items-center justify-center gap-3">
                    <i className='bi bi-cart3 text-2x1 text-black'></i>
                    <h2 className='text-2xl GolosText '>Returns</h2>
              </div>
              <div className="border hover:border-(--second) cursor-pointer hover:text-(--second) transition-all rounded-md py-2 flex items-center justify-center gap-3">
                    <i className='bi bi-gift text-2x1 text-black'></i>
                    <h2 className='text-2xl GolosText '>Gift</h2>
              </div>
              <div className="border hover:border-(--second) cursor-pointer hover:text-(--second) transition-all rounded-md py-2 flex items-center justify-center gap-3">
                    <i className='bi bi-bi bi-currency-dollar text-2xl text-black'></i>
                    <h2 className='text-2xl GolosText '>Refunds</h2>
              </div>
              <div className="border hover:border-(--second) cursor-pointer hover:text-(--second) transition-all rounded-md py-2 flex items-center justify-center gap-3">
                    <i className='bi bi-credit-card text-2x1 text-black'></i>
                    <h2 className='text-2xl GolosText '>Payments</h2>
              </div>
              <div className="border hover:border-(--second) cursor-pointer hover:text-(--second) transition-all rounded-md py-2 flex items-center justify-center gap-3">
                    <i className='bi bi-truck text-2x1 text-black'></i>
                    <h2 className='text-2xl GolosText '>Shipping</h2>
              </div>

            </div>

            <div className="mt-5">
              <Image src= {FagImg} alt={'FagImg'} className='w-full h-full' />
            </div>
          </div>
        </div>

      <div className="w-full lg:w-1/2 pe:[8%] lg:[16%] ps-10">
      <div className="space-y-1 w-1/2 py-10 ">
              {fagData.map((item , index) => (
                  <div key={index} className={`overflow-hidden py-2 transition-all duration-300 ${openindex === index ? "rounded-2xl" : ""}`}>
                    <button className='w-full  flex justify-between items-center text-left focus:outline-none  cursor-pointer border border-black  rounded-lg px-6 py-4' 
                    onClick={() => toggle(index)}>
                      <span className='text-xs GolosText font-semibold hover:text-(--second) transition-all duration-300'>
                        {item.questions}
                      </span>

                      {openindex === index ? (
                        <i className='bi bi-dash-circle-fill text-xl text-black'></i>
                      ): (
                        <i className='bi bi-plus-circle-fill text-xl text-black'></i>
                      )
                    }
                    </button>


                    <div className={`transition-all duration-500 ease-in-out overflow-hidden 
                      ${openindex === index ? "max-h-75 opacity-100 py-3" :  "max-h-0 opacity-0 py-0"}`}>
                        <p className='GolosText text-black'>{item.answer}</p>
                      </div>
                  </div>



              ))}
      </div>

      <p className='w-xl'>If your order has not yet shipped, you can contact us to change your shipping address. If your order has already shipped, we may not be able to change the address.</p>
      </div>

      </div>


    </>
  )
}
