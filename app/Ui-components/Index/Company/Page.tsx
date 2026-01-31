"use client"
import Image from "next/image"
import company1 from"@/public/company-1.webp"
import company2 from"@/public/company-2.webp"
import company3 from"@/public/company-3.webp"
import company4 from"@/public/company-4.webp"
import company5 from"@/public/company-5.webp"
import company6 from"@/public/company-6.webp"
import company7 from"@/public/company-7.webp"
import company8 from"@/public/company-8.webp"
import bannerStar from "@/public/banner-star.svg"
import bannerCircle from "@/public/banner-2-circle.png"
import { Splide, SplideSlide } from "@splidejs/react-splide";
import {AutoScroll} from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/react-splide/css";


const companys = [company1, company2 , company3 , company4 , company5 , company6 ,company7 , company8];


export default function Company() {
  return (
    <>
    <div className="px-[8%] py-20 pt-30">
      <div className="compaines-banner py-20">
          <div className="company-shape hidden lg:block">
              <Image src={bannerCircle} alt={"bannerCircle"}  width={200} height={200}/>
              <Image src={bannerStar} alt={"bannerStar"} width={70} height={70} />
          </div>


          <div className="px-[5%] md:px-[8%]">
            <h1 className="GolosText text-white text-3xl md:text-5xl lg:text-7xl font-semibold w-full lg:w-[74%]"> We are just keeping growing with 6.3 trusted companies</h1>
          </div>


          <div className="w-full md:mt-20 mt-10 overflow-hidden ">
            <Splide 
            options={{
              type:"loop",
              drag:"free",
              arrows:false,
              pagination: false,
              autoWidth: true,
              gap:"40px",
              autoScroll : {
                speed:-0.5,
                pauseOnHover : true,
                pauseOnFocus : false,
              }
            }}
            
            extensions ={{AutoScroll}}
            >
              
              {companys.map((logo , index) => (
                <SplideSlide key={index}>
                    <div className="company-card cursor-pointer bg-white px-10 py-8 rounded-2xl">
                          <Image src={logo} alt="Image" />
                    </div>
                </SplideSlide>
              ))}
              
            </Splide>
          </div>
          <div className="w-full md:mt-20 mt-10 overflow-hidden ">
            <Splide 
            options={{
              type:"loop",
              drag:"free",
              arrows:false,
              pagination: false,
              autoWidth: true,
              gap:"60px",
              autoScroll : {
                speed:0.6,
                pauseOnHover : true,
                pauseOnFocus : false,
              }
            }}
            
            extensions ={{AutoScroll}}
            >
              
              {companys.map((logo , index) => (
                <SplideSlide key={index}>
                    <div className="company-card cursor-pointer bg-white px-10 py-8 rounded-2xl">
                          <Image src={logo} alt="Image" />
                    </div>
                </SplideSlide>
              ))}
              
            </Splide>
          </div>
      </div>
    </div>
    </>
  )
}
