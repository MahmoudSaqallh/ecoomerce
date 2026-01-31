import React from 'react'
import category1 from "@/public/Category-1.webp"
import category2 from "@/public/Category-2.webp"
import category3 from "@/public/Category-3.webp"
import category4 from "@/public/Category-4.webp"
import category5 from "@/public/Category-5.webp"
import category6 from "@/public/Category-6.webp"
import Image from "next/image"

export default function Category() {
  return (
    <>
    
    <div className="px-[8%] lg:px-[8%] py-20">
      <div className="bg-(--prim) px-[8%] py-20 rounded-2xl">
        <div className="category-wrap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 ">
          <div className="category-cart relative ">
                <Image  src={category1} alt="category1"/>
                <span className='bg-white hover:bg-(--second) border-2 border-white hover:text-white cursor-pointer transition-all border-white  duration-200 rounded-full GolosText text-2xl px-6 py-3'>
                  Jaket
                </span>
          </div>
          <div className="category-cart relative ">
                <Image  src={category2} alt="category2"/>
                <span className='bg-white hover:bg-(--second) border-2 border-white hover:text-white cursor-pointer transition-all border-white  duration-200 rounded-full GolosText text-2xl px-6 py-3'>
                  Jens
                </span>
          </div>
          <div className="category-cart relative ">
                <Image  src={category3} alt="category3"/>
                <span className='bg-white hover:bg-(--second) border-2 border-white hover:text-white cursor-pointer transition-all border-white  duration-200 rounded-full GolosText text-2xl px-6 py-3'>
                  Shirts
                </span>
          </div>
          <div className="category-cart relative ">
                <Image  src={category4} alt="category4"/>
                <span className='bg-white hover:bg-(--second) border-2 border-white hover:text-white cursor-pointer transition-all border-white  duration-200 rounded-full GolosText text-2xl px-6 py-3'>
                  shorts
                </span>
          </div>
          <div className="category-cart relative ">
                <Image  src={category5} alt="category5"/>
                <span className='bg-white hover:bg-(--second) border-2 border-white hover:text-white cursor-pointer transition-all border-white  duration-200 rounded-full GolosText text-2xl px-6 py-3'>
                  T-shirt
                </span>
          </div>
          <div className="category-cart relative ">
                <Image  src={category6} alt="category6"/>
                <span className='bg-white hover:bg-(--second) border-2 border-white hover:text-white cursor-pointer transition-all border-white  duration-200 rounded-full GolosText text-2xl px-6 py-3'>
                  Blazer
                </span>
          </div>
        </div>
      </div>
    </div>
    
    </>
  )
}
