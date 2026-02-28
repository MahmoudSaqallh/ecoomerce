
"use client";

import Link from 'next/link'
import Image from 'next/image'
import aboutimg1 from "@/public/about-1.webp"
import aboutimg2 from "@/public/about-2.webp"
import aboutimg3 from "@/public/about-3.webp"
import aboutimg4 from "@/public/about-4.webp"
import aboutimg5 from "@/public/about-5.webp"
import aboutimg6 from "@/public/about-6.webp"
import { useState } from 'react'
import { Swiper , SwiperSlide } from "swiper/react";
import {Autoplay} from 'swiper/modules';
import "swiper/css" 

const fagData = [
  {questions :  "How can I contact customer support?" , answer :"If your order has not yet shipped, you can contact us to change your shipping address. If your order has already shipped, we may not be able to change the address."},
  {questions : "Can I cancel my order?" , answer : "If your order has not yet shipped, you can contact us to change your shipping address. If your order has already shipped, we may not be able to change the address."},
  {questions : "Do you offer international shipping?" , answer : "If your order has not yet shipped, you can contact us to change your shipping address. If your order has already shipped, we may not be able to change the address."},
  {questions : "Can I track my order in real-time?" , answer : "If your order has not yet shipped, you can contact us to change your shipping address. If your order has already shipped, we may not be able to change the address."}, 
  {questions: "How do I know if a product is in stock?" , answer: "If your order has not yet shipped, you can contact us to change your shipping address. If your order has already shipped, we may not be able to change the address." }
];




const testComents = [
{
    id: 1,
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    img: aboutimg3,
    name: "Kenneth Fong",
    role: "Postgraduate Student",
},
{
    id: 2,
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    img: aboutimg3,
    name: "Kenneth Fong",
    role: "Postgraduate Student",
},
{
    id: 3,
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    img: aboutimg3,
    name: "Kenneth Fong",
    role: "Postgraduate Student",
},
{
    id: 4,
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    img: aboutimg3,
    name: "Kenneth Fong",
    role: "Postgraduate Student",
},
]


export default function Aboutus() {

  const [openindex, setopenindex] = useState(null);
  const toggle = (index:any) => {
    setopenindex(openindex === index ? null :index)
  }

  return (
      <>
      <div className="page-section flex justify-center items-center text-center">
        <div className="z-10 flex flex-col justify-center items-center text-center">
          <h2 className="text-white text-8xl GolosText font-semibold">About</h2>
          <div className="flex mt-5 text-2xl items-center text-center">
            <Link href="/Ui-components/Blogs" className="hover:text-(--prim) text-white">
              Blog
            </Link>
            <i className="ri-arrow-right-wide-line pt-2 px-2 text-white"></i>

            <span className='text-white'>About</span>
          </div>
        </div>
      </div>



      <div className="px-[8%] lg:px-[16%] py-20">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
              <h2 className='text-4xl text-black GolosText font-bold'>
                Fashique Your Style, Quality, Individuality - Redefining Fashion Together.
              </h2> 
              <p className='text-gray-400'>At Fashique, we are on a mission to redefine fashion by blending style, quality, and individuality into every garment we offer. We believe that what you wear is an extension of your unique personality, and it should reflect your values and aspirations.</p>
          </div>

          <div className="w-full lg:w-1/2">
              <div className="about-image flex gap-5 h-62.5">
                  <Image src={aboutimg1} alt='aboutimg1' className='rounded-2xl'  />
              </div>
          </div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-5 lg:gap-8 py-6">
          <div className="w-full ">
              <div className="about-autohr flex items-center gap-5">
                  <Image src={aboutimg3} alt='aboutimg1' className='rounded-full w-25' />
                  <div>
                    <h2 className='Lufga text-2xl text-black font-bold '>kenneth fong</h2>
                    <span className='GolosText text-black text-lg'>ceo and founder</span>
                  </div>
              </div>


          <div className="space-y-1 w-full py-10 ">
              {fagData.map((item , index) => (
                  <div key={index} className={`overflow-hidden py-2 transition-all duration-300 ${openindex === index ? "rounded-2xl" : ""}`}>
                    <button className='w-full  flex justify-between items-center text-left focus:outline-none  cursor-pointer border border-black  rounded-lg px-6 py-4' 
                    onClick={() => toggle(index)}>
                      <span className='text-xl GolosText font-semibold hover:text-(--second) transition-all duration-300'>
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
          </div>


        </div>

      
      <div className="flex flex-col lg:flex-row lg:gap-8 py-6">
          <div className="w-full lg:w-1/2">
              <div className="about-section flex gap-15 flex-col lg:flex-row ">
                  <div className="about-heading">
                    <h2 className='GolosText font-bold  text-black text-7xl'>50+</h2>
                    <span className='text-black text-xl font-semibold '>Items sale</span>
                  </div>
                  <div className="about-heading">
                    <h2 className='GolosText font-bold  text-black text-7xl'>400%</h2>
                    <span className='text-black text-xl font-semibold '>Retuern on investmen</span>
                  </div>
              </div>
          </div>



          <div className="w-full lg:w-1/2 mt-10">
                <div className="about-image">
                  <Image src={aboutimg5} alt='aboutimg5' className='rounded-2xl' />
                </div>
          </div>
      </div>


  <div className="px-[8%] lg:px-[11%] py-20 pb-0 bg-[#ffedd4]">
    <div className="flex flex-col-reverse lg:flex-row items-center gap-8">
        <div className="w-full lg:w-1/2 testing-img relative">
              <Image src={aboutimg6} alt='aboutimg6'  />
        </div>

        <div className="w-full lg:w-1/2">
            <h2 className='GolosText text-3xl md:text-4xl font-bold mb-5'>What Our Clents Say About Us</h2>

            <Swiper slidesPerView={1} spaceBetween={20} loop={true} autoplay={{delay: 3000 , disableOnInteraction: false}} modules={[Autoplay]}>
              {testComents.map((item) => (
                <SwiperSlide key={item.id}>
                    <div className="test-card bg-white rounded-2xl p-8">
                      <p className='text-black text-md mb-5'>
                        {item.text}
                      </p>


                    <div className="flex items-center gap-5">
                        <Image src={item.img}  alt='sssss' className='rounded-full w-20'/>
                      <div className="s">
                          <h2 className='Lufga text-2xl text-black'>{item.name}</h2>
                        <span className='text-gray-500'>{item.role}</span>
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



      </>
  )
}
