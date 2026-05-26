"use client";

import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import Follower from "../../Index/Follower/Page";
import retuernPolicy from "@/public/boat.png";
import packBox from "@/public/pack-box.png";

type CartType = {
  id: string;
  title: string;
  price: string;
  image: string;
  off?: string;
  qty: number;
};

export default function CartPage() {
  const [cart, setcart] = useState<CartType[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setcart(JSON.parse(stored));
  }, []);

  const removeItem = (id: string): void => {
    const updated = cart.filter((item) => item.id !== id);
    setcart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    toast.error("Removed From Cart");
  };

  const updateQty = (id: string, change: number): void => {
    const update = cart.map((item) =>
      item.id === id
        ? { ...item, qty: Math.max(1, item.qty + change) }
        : item
    );

    setcart(update);
    localStorage.setItem("cart", JSON.stringify(update));
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => {
      const price = Number(item.price.replace("$", ""));
      return sum + price * item.qty;
    }, 0);
  };

  return (
    <>
      <div className="px-[8%] lg:px-[16%] gap-5 py-10">
        {cart.length === 0 ? (
          <p className="text-2xl text-(--second) GolosText border border-gray-400 px-5 py-2 rounded-2xl">
            Your Cart is Empty
          </p>
        ) : (
          <div className="flex flex-col lg:flex-row gap-5 justify-between">
            <div className="w-full lg:w-1/1">
              <div className="flex flex-col gap-10">
                {cart.map((proudect) => (
                  <div
                    key={proudect.id}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-gray-400 pb-8"
                  >
                    <div className="flex items-center gap-5">
                      <img
                        src={proudect.image || "/no-image.png"}
                        alt={proudect.title}
                        className="w-24 h-24 md:w-28 md:h-28 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/no-image.png";
                        }}
                      />

                      <div className="flex flex-col lg-flex-row py-4">
                        <h2 className="text-2xl font-semibold">
                          {proudect.title}
                        </h2>

                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-2xl font-bold">
                            {proudect.price}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 md:mt-0 flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span
                          onClick={() => updateQty(proudect.id, -1)}
                          className="w-10 h-10 bg-black text-white rounded-full flex justify-center items-center text-center text-5xl pb-2 cursor-pointer"
                        >
                          -
                        </span>

                        <span className="w-10 h-10 border rounded-full flex justify-center items-center text-center text-2xl pb-1">
                          {proudect.qty}
                        </span>

                        <span
                          onClick={() => updateQty(proudect.id, 1)}
                          className="w-10 h-10 bg-black text-white rounded-full flex justify-center items-center text-center text-5xl pb-2 cursor-pointer"
                        >
                          +
                        </span>
                      </div>

                      <button
                        onClick={() => removeItem(proudect.id)}
                        className="px-6 py-3 border hover:bg-(--second) hover:border-transparent hover:text-white transition-all duration-300 rounded-lg md:rounded-full cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-1/2 sticky top-25 left-0 h-full">
              <div className="border rounded-2xl p-4">
                <button className="btn border w-full border-black cursor-pointer hover:bg-black hover:text-white transition-all duration-300 GolosText text-xl px-6 py-3 rounded-md">
                  Bank Offer 5% Cashback
                </button>

                <div className="mt-5 border w-full px-6 py-3 rounded-md border-black cursor-pointer">
                  <div className="flex items-center gap-5">
                    <Image
                      src={retuernPolicy}
                      alt="retuernPolicy"
                      width={70}
                      height={70}
                      className="opacity-80"
                    />
                    <div className="flex flex-col">
                      <h2 className="GolosText">Easy Returns</h2>
                      <h2 className="Lufga font-medium">30 Days</h2>
                    </div>
                  </div>
                </div>

                <div className="mt-5 border w-full px-6 py-3 rounded-md border-black cursor-pointer">
                  <div className="flex items-center gap-5">
                    <Image
                      src={packBox}
                      alt="packBox"
                      width={70}
                      height={70}
                      className="opacity-80"
                    />
                    <div className="flex flex-col">
                      <h2 className="GolosText">Enjoy The Product</h2>
                      <p className="Lufga font-medium text-gray-600 text-[14px]">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center gap-3 border-t border-gray-400 my-3 pt-3">
                  <h2 className="text-xl GolosText">Total</h2>
                  <h2 className="text-2xl GolosText font-semibold">
                    ${calculateTotal().toFixed(2)}
                  </h2>
                </div>

                <Link href="/checkout">
                  <button className="btn border w-full border-black cursor-pointer hover:bg-black hover:text-white transition-all duration-300 GolosText text-xl px-6 py-3 rounded-md mt-4 bg-black text-white">
                    Place Order
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <Follower />

      <ToastContainer position="top-right" autoClose={1500} />
    </>
  );
}