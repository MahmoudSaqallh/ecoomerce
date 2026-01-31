import Image from "next/image"
import heroshap1 from "@/public/hero-shape1.svg"
import HeroImg from "@/public/Hero.webp"
import HeroSmall from "@/public/hero-small-1.webp"
import HeroTest1 from "@/public/hero-test1.webp"
import HeroTest2 from "@/public/hero-test2.webp"
import HeroTest3 from "@/public/hero-test3.webp"
import { BsBalloonHeart } from "react-icons/bs";
import Link from "next/link"

export default function Hero() {
  return (
    <>
    <div className="px-[8%] lg:px-[10%] lg:ps-[16%] py-10">
      <div className="flex flex-col lg:flex-row gap-5 justify-between items-center relative">
        <div className="hero-shape3"></div>
        <div className="hero-shape4"></div>

        <div className="w-full lg:w-1/2">
            <div className="hero-content">
              <h1 className="GolosText text-4xl md:text-7xl lg-text-[6rem] font-semibold">Your Ultimate</h1>
              <div className="flex items-center gap-2">
                <Image src={heroshap1} alt={"heroshap1"}/>
                  <h1 className="GolosText text-3xl md:text-7xl lg-text-[6rem] font-semibold text-(--second)">Online Store</h1>
              </div>
              <h1 className="GolosText text-3xl md:text-6xl lg-text-[4.5rem] font-semibold">For All you Needs. </h1>
              <p className="GolosText mt-3 text-xl md:text-2xl">No code need. Plus free shopping on <span className="text-(--second)">$99+</span> order!</p>
              <div className="flex items-center gap-5 mt-5 ">
                <Link href="/my-app/app/Ui-components/Shop" >
                <button className="btn bg-black text-white cursor-pointer GolosText text-xl px-6 py-3 rounded-md transition-all duration-300">
                  Our Shop
                </button>
                </Link>
                <Link href="/my-app/app/Ui-components/Shop/12" >
                <button className="btn border border-black hover:bg-black hover:text-white cursor-pointer GolosText text-xl px-6 py-3 rounded-md transition-all duration-300">
                  View Details
                </button>
                </Link>
  
              </div>
            </div>
        </div>



        <div className="w-full lg:w-1/2">
            <div className="hero-image">
              <div className="hero-sapes1"></div>
              <div className="hero-sapes2"></div>
              <div className="border-shap1"></div>
              <div className="border-shap2"></div>
              <div className="star-shap"></div>
              <div className="star-shap2"></div>
              <div className="star-shap3"></div>

              <div className="absolute top-90 right-0 shadow-2xl bg-[#ffffffcb] backdrop-blur-2xl px-3 py-2 flex items-center gap-2 rounded-2xl   ">
                    <Image className="rounded-2xl" src={HeroSmall} alt="HeroSmall"/>
                    <div className="w-full lg:w-[50%] relative">
                      <h2 className="GolosText font-semibold">Cozy Knit Cardigan</h2>
                      <h2 className="GolosText font-semibold text-(--second) mt-2">80$</h2>
                      <i className="bi bi-basket absolute bottom-0 right-0 bg-(--second) hover:bg-(--prim) hover:text-black cursor-pointer text-white px-3 py-2 rounded-full transition-all duration-300"></i>
                    </div>
              </div>
                
          
              <Image className="w-full md: w-[80%] lg: w-[80%]" src={HeroImg} alt="heroimage"/>
            </div>
        </div>

        
      </div>
    </div>
    </>
  )
}
