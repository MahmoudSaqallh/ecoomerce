"use client";
import { ToastContainer, toast } from "react-toastify";
import proudectData from "@/app/jsonData/ProudectData.json";
import Link from "next/link";
import Image from "next/image";
import retuernPolicy from "@/public/boat.png";
import packBox from "@/public/pack-box.png";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "next/navigation";
import { useState } from "react";
import Follower from "../../Index/Follower/Page";

type proudectType = {
  id: number;
  title: string;
  price: string;
  image: string;
  off?: string;
  cate: string;
};

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


export default function ProudectDetaielsPage() {
  const { id } = useParams();
  const proudect = proudectData.find((p) => p.id.toString() === id);

  if (!proudect) {
    return (
      <div className="text-center py-40 text-3x1 font-semibold">
        product Not found
      </div>
    );
  }

  const addwishlist = (proudect: proudectType): void => {
    const stored = localStorage.getItem("wishlist");
    let wishlist: proudectType[] = stored ? JSON.parse(stored) : [];

    const existi = wishlist.find(
      (item: proudectType) => item.id === proudect.id,
    );

    if (existi) {
      toast.info("Already in Wishlist");
      return;
    }

    wishlist.push(proudect);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    toast.success("Add to Whishlist");
  };

  const [qauntity, setqauntity] = useState(1);
  const priceNumber = Number(proudect.price.replace("$", ""));
  const totalPrice = priceNumber * qauntity;

  const [activeSize, setactiveSize] = useState("S");

  const addtocart = (proudect: proudectType): void => {
    const stored = localStorage.getItem("cart");
    let cart: (proudectType & { qty: number })[] = stored
      ? JSON.parse(stored)
      : [];

    const existi = cart.find((item: any) => item.id === proudect.id);

    if (existi) {
      toast.info("Already in cart");
      return;
    }

    cart.push({ ...proudect, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Add to cart");
  };

  return (
    <>
      <div className="page-section flex justify-center items-center text-center">
        <div className="z-10 flex flex-col justify-center items-center text-center">
          <h2 className="text-white text-8xl GolosText font-semibold ">
            Progect Detaiels
          </h2>
          <div className="flex mt-5 text-2xl items-center text-center ">
            <Link href="/" className="hover:text-(--prim) text-white">
              Home
            </Link>
            <i className="ri-arrow-right-wide-line pt-2 px-2 text-white"></i>
            <Link
              href="/Ui-components/shop"
              className="hover:text-(--prim) text-white"
            >
              Shop
            </Link>
            <i className="ri-arrow-right-wide-line pt-2 px-2 text-white"></i>
            <span className=" text-white">{proudect.title}</span>
          </div>
        </div>
      </div>

      <div className="px-[8%] lg:px-[13%] gap-5 py-10 ">

        
        <div className="flex flex-col lg:flex-row gap-2">
          
          <div className="w-full lg:w-full">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <div className="rounded-2xl overflow-hidden">
                  <Image
                    src={proudect.image}
                    alt={"sss"}
                    width={700}
                    height={700}
                    className="w-full has-focus-within:object-cover rounded-2xl"
                  />
                </div>

              </div>
              

              <div className="flex flex-col">
                <div className="flex items-center gap-5">
                  <span className="text-4xl font-bold GolosText">
                    {proudect.price}
                  </span>
                  <span className="text-lg bg-black text-white px-6 rounded-full py-1">
                    {proudect.off}
                  </span>
                </div>

                <h1 className="text-4xl font-medium Lufga mt-4">
                  {proudect.title}
                </h1>

                <div className="mb-3 mt-1 flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <i className="bi bi-star-fill text-yellow-300"></i>
                    <i className="bi bi-star-fill text-yellow-300"></i>
                    <i className="bi bi-star-fill text-yellow-300"></i>
                    <i className="bi bi-star text-yellow-300"></i>
                  </div>

                  <p className="GolosText">4.7 Rating</p>
                  <p className="GolosText">(5 customer reviews)</p>
                </div>

                <p className="GolosText text-gray-600">
                  This product is part of our high-quality collection, crafted
                  with comfort, style, and premium fit. Perfect for casual and
                  formal occasions.
                </p>
                <div className="flex items-center gap-10 my-5 border-b border-gray-400 pb-5">
                  <div className="">
                    <h2 className="GolosText text-2xl font-semibold mb-2">
                      Quantity
                    </h2>
                    <div className="flex items-center gap-2">
                      <span
                        onClick={() =>
                          qauntity > 1 && setqauntity(qauntity - 1)
                        }
                        className="w-10 h-10 bg-black text-white rounded-full flex justify-center items-center text-center text-5xl pb-2 cursor-pointer"
                      >
                        -
                      </span>

                      <span className="w-10  h-10 border rounded-full flex justify-center items-center text-center text-2xl pb-1 cursor-pointer">
                        {qauntity}
                      </span>

                      <span
                        onClick={() => setqauntity(qauntity + 1)}
                        className="w-10 h-10 bg-black text-white rounded-full flex justify-center items-center text-center text-5xl pb-2 cursor-pointer"
                      >
                        +
                      </span>
                    </div>
                  </div>

                  <div className="">
                    <h2 className="GolosText text-xl font-semibold mb-2">
                      Size
                    </h2>
                    <div className="flex items-center gap-2">
                      {["S", "M", "L"].map((size) => (
                        <button
                          onClick={() => {
                            setactiveSize(size);
                          }}
                          className={`w-10 h-10 rounded-full flex justify-center items-center text-center text-xl pb-1 cursor-pointer transition-all duration-300 ${activeSize === size ? "bg-black text-white border-black" : "bg-transparent text-black"}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h2 className="mb-2">
                    <span className="GolosText font-semibold pe-2">SKU: </span>
                    <span className="text-gray-800 text-md">PRTHS334AF</span>
                  </h2>
                  <h2 className="mb-2">
                    <span className="GolosText font-semibold pe-2">
                      Category:{" "}
                    </span>
                    <span className="text-gray-800 text-md">
                      Dresses, Jeans, Swimwear, Summer, Clothing{" "}
                    </span>
                  </h2>
                  <h2 className="mb-2">
                    <span className="GolosText font-semibold pe-2">Tags: </span>
                    <span className="text-gray-800 text-md">
                      Casual, Athletic, Workwear, Accessories
                    </span>
                  </h2>
                  <h2 className="mb-2">
                    <span className="GolosText">Tags: </span>
                    <i className="ri-facebook-fill ps-1 text-xl"></i>
                    <i className="ri-linkedin-fill ps-1 text-xl"></i>
                    <i className="ri-twitter-x-fill ps-1 text-xl"></i>
                    <i className="ri-behance-fill ps-1 text-xl"></i>
                  </h2>
                </div>
              </div>

            </div>

            <div className="mt-10">
              <h2 className="Lufga text-4xl font-semibold ">Description :</h2>
              <h2 className="Lufga text-xl font-semibold mt-5 ">
                Flawless Denim Delights
              </h2>
              <p className="GolosText mt-2 tracking-wide text-gray-700">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>

                <h2 className="mt-5 flex items-center gap-2 GolosText text-xl md:text-2xl">
                  <i className="bi bi-check2-circle text-2xl text-(--second)"></i>
                  Versatile, enduring style for all occasions
                </h2>
                <h2 className="mt-5 flex items-center gap-2 GolosText text-xl md:text-2xl">
                  <i className="bi bi-check2-circle text-2xl text-(--second)"></i>
                  Handcrafted Elegance, Comfort
                </h2>
                <h2 className="mt-5 flex items-center gap-2 GolosText text-xl md:text-2xl">
                  <i className="bi bi-check2-circle text-2xl text-(--second)"></i>
                  Versatile, enduring style for all occasions
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
                  <div className="border rounded-2xl flex flex-col justify-center p-4 text-center">
                    <h2 className="text-2xl GolosText font-semibold">All-in-One-Dress</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  </div>
                  <div className="border rounded-2xl flex flex-col justify-center p-4 text-center">
                    <h2 className="text-2xl GolosText font-semibold">Looking wise good</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  </div>
                  <div className="border rounded-2xl flex flex-col justify-center p-4 text-center">
                    <h2 className="text-2xl GolosText font-semibold">100% Made In Uk</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  </div>
                  <div className="border rounded-2xl flex flex-col justify-center p-4 text-center">
                    <h2 className="text-2xl GolosText font-semibold">100% Cotton</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  </div>
                </div>
                
            </div>

      

          </div>

            <div className="w-full lg:w-1/2 sticky top-25 left-0 h-full ">
                <div className="border rounded-2xl p-4">
                  <button className="btn border w-full border-black cursor-pointer hover:bg-black hover:text-white transition-all duration-300 GolosText text-xl px-6 py-3 rounded-md">
                    Bank Offer 5% Cashback 
                  </button>

                  <div className="mt-5 border w-full px-6 py-3 rounded-md border-black  cursor-pointer">
                    <div className="flex items-center gap-5">
                      <Image src={retuernPolicy} alt="retuernPolicy" width={70} height={70} className="opacity-80" />
                      <div className="flex flex-col">
                        <h2 className="GolosText">Eesy Returns</h2>
                        <h2 className="Lufga font-medium">30 Days</h2>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 border w-full px-6 py-3 rounded-md border-black  cursor-pointer">
                    <div className="flex items-center gap-5">
                      <Image src={packBox} alt="packBox" width={70} height={70} className="opacity-80" />
                      <div className="flex flex-col">
                        <h2 className="GolosText">Enjoy The Product</h2>
                        <p className="Lufga font-medium text-gray-600 text-[14px]">Lorem Ipsum is simply dummy text of the printing and typesetting</p>
                      </div>
                    </div>
                  </div>
                  <h2 className="mt-3 flex items-center gap-2 GolosText">
                    <i className="bi bi-check2-circle text-2xl"></i>
                    You will save ₹504 on this order
                  </h2>

                  <div className="flex justify-between items-center gap-3 border-t border-gray-400 my-3 pt-3">
                    <h2 className="text-xl GolosText">Total</h2>
                    <h2 className="text-2xl GolosText font-semibold">${totalPrice}</h2>
                  </div>

                <button onClick={() => addwishlist(proudect)} className="btn border w-full border-black cursor-pointer hover:bg-black hover:text-white transition-all duration-300 GolosText text-xl px-6 py-3 rounded-md" ><i className="bi bi-balloon-heart"></i>
                  Add To Wishlist
                  </button>
                <button onClick={() => addtocart(proudect)} className="btn border w-full border-black cursor-pointer hover:bg-black hover:text-white transition-all duration-300 GolosText text-xl px-6 py-3 rounded-md mt-4 bg-black text-white"><i className="bi bi-balloon-heart "></i>
                  Add To Cart
                  </button>

                </div>
            </div>

            
        </div>


      </div>

            <Follower/>
          < ToastContainer position="top-right" autoClose={1500}/>
    </>
  );
}
