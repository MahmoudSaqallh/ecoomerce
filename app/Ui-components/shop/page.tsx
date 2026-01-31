"use client"

import Link from 'next/link'
import { useMemo, useState } from 'react';
import { ToastContainer , toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import proudectData from "@/app/jsonData/ProudectData.json"
import Image from "next/image";
import Follower from '../Index/Follower/Page';
type proudectType = {
  id: number;
  title: string;
  price: string;
  image: string;
  off? :string;
cate: string
}



export default function Shop() {

  const [isopensort, setisopensort] = useState(false);
  const [isOpenCategory, setisOpenCategory] = useState(false);
  const [seclectedFilter, setiseclectedFilter] = useState("Oldest");
  const [selectedCategory, setselectedCategory] = useState("All");  

  const convertPrice =(price:string): number => Number(price.replace("$","").trim( ));


    const addwishlist = (proudect : proudectType):void => {
      const stored = localStorage.getItem("wishlist" );
      let wishlist:proudectType[] = stored  ? JSON.parse(stored) : [];

      const existi = wishlist.find((item: proudectType) => item.id === proudect.id);

      if(existi){
        toast.info("Already in Wishlist");
        return
      }

      wishlist.push(proudect)
      localStorage.setItem("wishlist" , JSON.stringify(wishlist));
      toast.success("Add to Whishlist")
  }


    const addtocart = (proudect : proudectType):void => {
      const stored = localStorage.getItem("cart" );
      let cart:(proudectType & {qty:number})[] = stored  ? JSON.parse(stored) : [];

      const existi = cart.find((item: any) => item.id === proudect.id);

      if(existi){
        toast.info("Already in cart");
        return
      }

      cart.push({...proudect , qty: 1})
      localStorage.setItem("cart" , JSON.stringify(cart));
      toast.success("Add to cart")
  }

const sortData = useMemo(() => {
  let data = [...proudectData];
if (selectedCategory != "All") {
  data = data.filter((item) => item.cate === selectedCategory)
} 

switch (seclectedFilter) {
  case "Latest":
    return data.sort((a , b) => b.id - a.id);
  case "Oldest":
    return data.sort((a , b) => a.id - b.id);
  case "Low to Hight":
    return data.sort((a , b) => convertPrice(a.price) - convertPrice(b.price) );
  case "Hight to Low":
    return data.sort((a , b) => convertPrice(b.price) - convertPrice(a.price) );

    default: 
    return data

}
}, [seclectedFilter , selectedCategory]);


const start = sortData.length > 0 ? 1 : 0; 
const end  = sortData.length;

const handelsoratSelect = (value : any) => {
  setiseclectedFilter(value);
  setisopensort(false);
}


const handeelCategorySelect = (value:any) => {
  setselectedCategory(value);
  setisOpenCategory(false)
}

  return (
    <>
        {/* page Title section */}
        <div className="page-section flex justify-center items-center text-center">
          <div className="z-10 flex flex-col justify-center items-center text-center">

            <h2  className="text-white text-8xl GolosText font-semibold ">Shop</h2>
            <div className="flex mt-5 text-2xl items-center text-center ">
              <Link href="/" className='hover:text-(--prim) text-white'>Home</Link>
              <i className='ri-arrow-right-wide-line pt-2 px-2 text-white'></i>
              <span className='text-white'>Shop</span>
            </div>
          </div>
        </div>


        <div className="px-[8%] lg:px-[16%] gap-5 py-10 ">
            <div className="flex justify-between flex-col md:flex-row  items-center mb-12 gap-5 ">
              <p className='text-lg GolosText text-black/80'>Showing <span className='font-semibold'>{start}-{end}</span> of{" "}
              <span className='font-semibold'>{proudectData.length}</span>
              </p>

              <div className="flex items-center gap-5">
              <div className="relative">
                <button className='px-6 py-3 bg-black text-white GolosText rounded-full flex items-center gap-3 cursor-pointer' onClick={() => setisopensort(!isOpenCategory)}>
                    {seclectedFilter} 
                  <i className='ri-arrow-down-s-line text-xl '></i>
                </button>
                {isopensort && (
                  <div className='absolute right-0 mt-2 w-48 bg-white shadow-xl overflow-hidden z-50'>
                    <div className="px-5 py-5 hover:bg-gray-100 cursor-pointer" onClick={() => handelsoratSelect("Lastest")}>Lastest</div>
                    <div className="px-5 py-5 hover:bg-gray-100 cursor-pointer" onClick={() => handelsoratSelect("Oldest")}>Oldest</div>
                    <div className="px-5 py-5 hover:bg-gray-100 cursor-pointer" onClick={() => handelsoratSelect("Low to Hight")}>Low to Hight</div>
                    <div className="px-5 py-5 hover:bg-gray-100 cursor-pointer" onClick={() => handelsoratSelect("Hight to Low")}>Hight to Low </div>
                  </div>
                )}
              </div>

              
              <div className="relative">
                <button className='px-6 py-3 bg-black text-white GolosText rounded-full flex items-center gap-3 cursor-pointer' onClick={() => setisOpenCategory(!isOpenCategory)}>
                        {selectedCategory}
                  <i className='ri-arrow-down-s-line text-xl '></i>
                </button>
                {isOpenCategory && (
                  <div className='absolute right-0 mt-2 w-48 bg-white shadow-xl overflow-hidden z-50'>
                    <div className="px-5 py-5 hover:bg-gray-100 cursor-pointer" onClick={() => handeelCategorySelect("All")}>All</div>
                    <div className="px-5 py-5 hover:bg-gray-100 cursor-pointer" onClick={() => handeelCategorySelect("Dresses")}>Dresses</div>
                    <div className="px-5 py-5 hover:bg-gray-100 cursor-pointer" onClick={() => handeelCategorySelect("Jacket")}>Jacket</div>
                    <div className="px-5 py-5 hover:bg-gray-100 cursor-pointer" onClick={() => handeelCategorySelect("Outerwear")}>Outerwear </div>
                    <div className="px-5 py-5 hover:bg-gray-100 cursor-pointer" onClick={() => handeelCategorySelect("Tops")}>Tops </div>
                  </div>
                )}
              </div>
              </div>
          </div>  
            
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {sortData.map((proudect , index) => (
              <div key={index}> 
                  <div className="proudect-card popular-product cursor-pointer py-5">
                                  <div className="proudect-image relative rounded-2xl ">
                                    <div className="overflow-hidden">
                                    <Image src={proudect.image} alt={"image"} width={500} height={500} className="w-full h-full object-cover rounded-2xl  "/>
                                    </div>
                                    <span className="absolute top-3 left-3 px-4 py-1 GolosText bg-white rounded-full ">
                                      {proudect.off }
                                    </span>
            
                                    <div className="absolute top-11 right-5 flex flex-col gap-2">
                                      <i onClick={() => addwishlist(proudect)}
                                      className="bi bi-balloon-heart produect-icon w-10 h-10 flex items-center justify-center text-white bg-black/40 cursor-pointer  rounded-full">
                                      </i>
                                      <i onClick={() => {addtocart(proudect)}} 
                                      className="bi bi-cart3 produect-icon w-10 h-10 flex items-center justify-center text-white bg-black/40 cursor-pointer  rounded-full">
                                      </i>
                                    </div>
            
            
                                    <div className=" relative left-0 bottom-0 lg:absolute lg:bottom-[-20px] lg:left-10 ">
                                        <Link href={`/Ui-components/shop/${proudect.id}`}>
                                            <button  className=" btn bg-black text-white cursor-pointer GolosText text-xl px-6 py-3 rounded-2xl w-full lg:w-auto lg:rounded-full border-3 border-white ">
                                              View Details
                                              </button>
                                        </Link>
                                    </div>
                                  </div>
                                          <Link href={`/Ui-components/Shop/${proudect.id}`}>
                                          <div className="prodect-content mt-5 md:mt-10 z-10 py-2">
                                            <div className="flex justify-between">
                                              <h2 className="Lufga font-medium text-[18px] pr-5">{proudect.title}</h2>
                                              <h3 className="GolosText font-semibold text-2xl ">{proudect.price}</h3>
                                            </div>
                                          </div>
                                      </Link>
                              </div>
              </div>
            ))}
          </div>
            
        </div>
              <Follower/>
         < ToastContainer position="top-right" autoClose={1500}/>
    </>
  )
}
