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

        // wishlist

  const addwishlist = (proudect : any) => {
      const stored = localStorage.getItem("wishlist" );
      let wishlist = stored  ? JSON.parse(stored) : [];

      const existi = wishlist.find((item: any) => item.id === proudect.id);

      if(existi){
        toast.info("Already in Wishlist");
        return
      }

      wishlist.push(proudect)
      localStorage.setItem("wishlist" , JSON.stringify(wishlist));
      toast.success("Add to Whishlist")
  }


    const addtocart = (proudect : any) => {
      const stored = localStorage.getItem("cart" );
      let cart = stored  ? JSON.parse(stored) : [];

      const existi = cart.find((item: any) => item.id === proudect.id);

      if(existi){
        toast.info("Already in cart");
        return
      }

      cart.push({...proudect , qty: 1})
      localStorage.setItem("cart" , JSON.stringify(cart));
      toast.success("Add to cart")
  }


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
                        <span className="absolute top-3 left-3 px-4 py-1 GolosText bg-white rounded-full ">
                          {item.off }
                        </span>

                        <div className="absolute top-11 right-5 flex flex-col gap-2">
                          <i onClick={() => addwishlist(item)}
                          className="bi bi-balloon-heart produect-icon w-10 h-10 flex items-center justify-center text-white bg-black/40 cursor-pointer  rounded-full">
                          </i>
                          <i onClick={() => {addtocart(item)}} 
                          className="bi bi-cart3 produect-icon w-10 h-10 flex items-center justify-center text-white bg-black/40 cursor-pointer  rounded-full">
                          </i>
                        </div>


                        <div className=" relative left-0 bottom-0 lg:absolute lg:bottom-[-20px] lg:left-10 ">
                            <Link href={`/Ui-components/Shop/${item.id}`}>
                                <button className=" btn bg-black text-white cursor-pointer GolosText text-xl px-6 py-3 rounded-2xl w-full lg:w-auto lg:rounded-full border-3 border-white ">
                                  View Details
                                  </button>
                            </Link>
                        </div>
                      </div>
                              <Link href={`/Ui-components/Shop/${item.id}`}>
                              <div className="prodect-content mt-5 md:mt-10 z-10 py-2">
                                <div className="flex justify-between">
                                  <h2 className="Lufga font-medium text-[18px] pr-5">{item.title}</h2>
                                  <h3 className="GolosText font-semibold text-2xl ">{item.price}</h3>
                                </div>
                              </div>
                          </Link>
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
