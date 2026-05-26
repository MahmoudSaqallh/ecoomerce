"use client"

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import proudectData from "@/app/jsonData/ProudectData.json"
import { ToastContainer , toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function Trending() {




  return (
   <>
   <div className="px-[14%] lg-px-[16%] py-20">
    <div className="flex flex-col md:flex-row justify-between items-center gap-5">
      <div>
        <h2 className='text-5xl font-medium  Lufga '>What is Treading now</h2>
        <p className='GolosText text-lg mt-1'>Discover the most treding proudects in FashiQue.</p>
      </div>

      <div>
          <button className='btn bg-black text-white cursor-pointer GolosText text-xl px-6 py-3 rounded-md  transition-all duration-300'>
            View all 
          </button>
      </div>

    </div>


    <div className="trending-swiper">
        <Swiper slidesPerView={4} 
        spaceBetween={20} 
        loop={true} 
        autoplay={{delay:1800}} 
        // modules={[Autoplay]} 
        breakpoints={{
          1200:{slidesPerView :4},
          991:{slidesPerView :3},
          575:{slidesPerView :2},
          0:{slidesPerView :1},
        }}>


          {proudectData.slice(0,8).map((item) => (
              <SwiperSlide key={item.id}>
                <div className="proudect-card cursor-pointer py-5">
                      <div className="proudect-image relative rounded-2xl ">
                        <div className="overflow-hidden">
                        <Image src={item.image} alt={"image"} width={500} height={500} className="w-full h-full object-cover rounded-2xl  "/>
                        </div>
            

      

     
                      </div>
                 
                  </div>
              </SwiperSlide>
              ))}

        </Swiper>
      </div>
   </div>

 < ToastContainer position="top-right" autoClose={1500}/>
   
   </>
  )
}
