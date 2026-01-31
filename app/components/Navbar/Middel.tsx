"use client"
import Link from "next/link";
import Image from "next/image";
import callImg from "@/public/nav-contact.svg";
import { useState } from "react";

export default function Middel() {
  const [Query, setQuery] = useState("")
  return (
    <div className="w-full bg-(--prim) border-b border-gray-300 relative">
      <div className="flex items-center justify-between py-3 px-[8%] lg:px-[14%]">
    
        {/* logo */}
        <Link href = "/" className = "text-2xl lg:text-4xl font-bold Audiowide text-black">
          Fashi<span className="text-(--second)"> Que</span>


          </Link>
        {/* Search Box */}


        <div className="relative flex flex-col flex-1 ms- mx-0 bg-white rounded-lg  lg:max-w-2xl">
            <div className="flex items-center">
                <input type="text"
                 placeholder="Search for a product or brand" 
                 value={Query} 
                 onChange={(e) => {setQuery(e.target.value)}}
                 className="flex-1 px-4 py-4 outline-none rounded-l-lg"
                 />

                 <button className="px-3 text-2xl cursor-pointer">
                  <i className="bi bi-search" ></i>
                 </button>
            </div>
        </div>


      {/* contact */}

        <div className="flex items-center gap-2">
          <Image src={callImg} alt="callimg" width={50} height={50}/>
          <div className="flex  flex-col">
            <h2 className="GolosText text-xs ps-2 font-semibold">24/7 SUPPORT</h2>
            <h1 className="GolosText font-semibold">+ 123 456 789</h1>


          </div>
        </div>



      </div>
    </div>
  )
}
