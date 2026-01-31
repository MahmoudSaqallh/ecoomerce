"use client"
import { ToastContainer , toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from "next/image";
import proudectData from "@/app/jsonData/ProudectData.json"
import { useEffect, useRef } from "react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

export default function PoplouerProudect() {
  const ContainerRef = useRef(null);
  const categories = ["Dresses", "Dresses","Dresses","Tops" , "Tops","OuterWear","Jacket", "Jacket"];

  useEffect(() =>  {
    async function loadMix() {
      if (typeof window !== "undefined" && ContainerRef.current) {
        const mixitup = (await import("mixitup")).default;


        mixitup(ContainerRef.current, {
        animation: { duration: 400 }
      });
      }
    }

    loadMix();
  } ,[]



)


  // function addwishlist(item: { id: number; title: string; image: string; price: string; off: string; cate: string; }): void {
  //   throw new Error("Function not implemented.");
  // }

  // function addtocart(item: { id: number; title: string; image: string; price: string; off: string; cate: string; }) {
  //   throw new Error("Function not implemented.");
  // }


  
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
     <div className="px-[14%] lg-px-[16%] py-20 mt-20">
    <div className="flex flex-col md:flex-row justify-between items-center gap-5">
      <div>
        <h2 className='text-5xl font-medium  Lufga '>Most Popular  Proudects</h2>
        <p className='GolosText text-lg mt-1'>Discover the most treding proudects in FashiQue.</p>
      </div>

          {/* filter Buttons */}
      <div>
          <div className=" border rounded-full px-4 py-2 flex flex-wrap  items-center justify-center gap-0 text-[11px] md:text-[14px]  box-b  md:gap-3">
    <button data-filter="all" className="px-4 py-1 rounded-full ...">All</button>
  <button data-filter=".Dresses" className="px-4 py-1 rounded-full ...">Dresses</button>
  <button data-filter=".Tops" className="px-4 py-1 rounded-full ...">Tops</button>
  <button data-filter=".OuterWear" className="px-4 py-1 rounded-full ...">Outerwear</button>
  <button data-filter=".Jacket" className="px-4 py-1 rounded-full ...">Jacket</button>
          </div>
      </div>

    </div>

      <div className="mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"  ref={ContainerRef}>
          {proudectData.slice(0,8).map((item,index) => {
            const cat = categories[index];
            return(
              <div key={index} className={`mix ${cat}`}>
                  <div className="proudect-card popular-product cursor-pointer py-5">
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
               </div>
            )
          })}
        </div>
      </div>

   </div>

 < ToastContainer position="top-right" autoClose={1500}/>
    
    </>
  )


}