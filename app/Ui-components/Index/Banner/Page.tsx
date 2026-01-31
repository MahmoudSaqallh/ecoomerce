"use client";

import Image from "next/image";
import cricleText from "@/public/banner-shop-circle.png";
import playIcons from "@/public/banner-play-icon.png";
import starShap from "@/public/star-shape.svg";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import {AutoScroll} from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/react-splide/css";


export default function Banner() {
  const categories = [
    "Shorts" ,
    "T-shirt" ,
    "Blazer" ,
    "Jacket" ,
    "Jeanes" ,
    "Shirts" ,
  ]
  return (
    <>
      <div className="banner relative ">
            <div>
                <Image className="banner-shop-img "  src={cricleText} alt="cricleText" width={300} height={300}/>
                <Image className="banner-play-img "  src={playIcons} alt="cricleText" width={100} height={100}/>
            </div>
      </div>


      <div className="w-full  overflow-hidden  splide-slide-texts">
        <Splide options={{
          type:"loop",
          drag: "free",
          focus: "center",
          arrows: false ,
          pagination: false,
          autoWidth: true,
          gap:"1px",
          speed: 1,
          autoScroll: {speed:1, pauseOnHover: false,pauseOnFocuse:false}
        }}
        extensions={{AutoScroll}}
        >
          {categories.map((item,index) => (
            <SplideSlide key={index}>
                <h2 className="text-2xl flex items-center gap-3 font-bold ">
                  <Image src={starShap} alt="startshap" width={60} height={60} />
                  {item}
                </h2>
                
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </>
  )
}
