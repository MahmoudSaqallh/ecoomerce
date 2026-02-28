"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type CartItem = {
  id: number;
  title: string;
  price: string;
  image: string;
  off?: string;
  qty: number;
};

export default function Cheackout() {
  const [deliveryOption, setdeliveryOption] = useState<"ship" | "pick">("ship");
  const [cartitem, setcartitem] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      const parsed = JSON.parse(saved).map((item: CartItem) => ({
        ...item,
        qty: item.qty ?? 1,
      }));
      setcartitem(parsed);
    }
  }, []);

  const totalPrice = cartitem.reduce((acc, item) => {
    const price = parseFloat(item.price.replace("$", "")) || 0;
    const quantity = item.qty ?? 1;
    return acc + price * quantity;
  }, 0);

  const handelpalceholder = () => {
    toast.success("Order be Successfully !");
  };

  return (
    <>
      <ToastContainer />


      <div className="page-section flex justify-center items-center text-center">
        <div className="z-10 flex flex-col justify-center items-center text-center">
          <h2 className="text-white text-8xl GolosText font-semibold">Cheackout</h2>
          <div className="flex mt-5 text-2xl items-center text-center">
            <Link href="/" className="hover:text-(--prim) text-white">
              Home
            </Link>
            <i className="ri-arrow-right-wide-line pt-2 px-2 text-white"></i>
            <Link href="/Ui-components/Pages/Cart" className="hover:text-(--prim) text-white">
              Cart
            </Link>
            <i className="ri-arrow-right-wide-line pt-2 px-2 text-white"></i>
            <span className="text-white">Cheackout</span>
          </div>
        </div>
      </div>



      <div className="px-[8%] lg:px-[16%] gap-5 py-10">
      
        <div className="grid lg:grid-cols-12 gap-4 items-start">
          {/* Left */}
          <div className="lg:col-span-7">
            <h5 className="mb-2 GolosText text-4xl">Contact</h5>

            <input
              type="email"
              className="border border-gray-300 bg-white rounded p-2 mb-3 w-full outline-none"
              placeholder="Enter Your Email"
            />

            <div className="mb-4">
              <input type="checkbox" id="newsCheak" className="me-2" />
              <label htmlFor="newsCheak">Email me With new and Offers</label>
            </div>

            <h5 className="mb-2 GolosText text-3xl">Delivery</h5>
            <div className="mb-3 flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="deliveryOption"
                  checked={deliveryOption === "ship"}
                  onChange={() => setdeliveryOption("ship")}
                />
                ship
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="deliveryOption"
                  checked={deliveryOption === "pick"}
                  onChange={() => setdeliveryOption("pick")}
                />
                pick in store
              </label>
            </div>

            {deliveryOption === "ship" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <select className="w-full border border-gray-300 bg-white rounded appearance-none px-2 py-2 md:col-span-2">
                  <option value="">United state</option>
                  <option value="">Uk</option>
                  <option value="">india</option>
                </select>

                <input
                  type="text"
                  className="border bg-white rounded w-full p-2"
                  placeholder="First Name (Optional)"
                />
                <input
                  type="text"
                  className="border bg-white rounded w-full p-2"
                  placeholder="Last Name (Optional)"
                />
              </div>
            )}

            {deliveryOption === "pick" && (
              <div className="my-4 p-3 border rounded bg-red-50 text-red-700">
                <strong>No stores available with your item</strong>
                <div>
                  <button
                    type="button"
                    onClick={() => setdeliveryOption("ship")}
                    className="underline"
                  >
                    ship to address
                  </button>{" "}
                  instead
                </div>
              </div>
            )}

            <input type="text" className="border bg-white rounded w-full p-2 mb-3" placeholder="Address" />
            <input
              type="text"
              className="border bg-white rounded w-full p-2 mb-3"
              placeholder="Apartment, suite (optional)"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <input type="text" className="border bg-white rounded w-full p-2" placeholder="City" />
              <input type="text" className="border bg-white rounded w-full p-2" placeholder="The code" />
            </div>

            <div className="mb-4">
              <input type="checkbox" id="saveinfo" className="me-3" />
              <label htmlFor="saveinfo">Save the data for next time</label>
            </div>

            <h3 className="mb-3 GolosText text-3xl">Shipping method</h3>
            <div className="p-3 flex justify-between items-center border border-gray-300 rounded-md bg-green-50">
              <span>Standard</span>
              <span className="text-green-700">free</span>
            </div>

            <h5 className="mb-2 GolosText text-3xl mt-4">Payment</h5>
            <p className="text-gray-500 mb-3">Save this information for next time</p>

            <div className="border border-gray-300 py-4 px-4 rounded-2xl">
              <input type="text" className="border bg-white rounded w-full p-2 mb-3" placeholder="Card number" />

              <div className="flex gap-4">
                <input
                  type="text"
                  className="border bg-white rounded w-full p-2 mb-3"
                  placeholder="Expiration date (MM/YY)"
                />
                <input type="text" className="border bg-white rounded w-full p-2 mb-3" placeholder="Security Code" />
              </div>

              <input type="text" className="border bg-white rounded w-full p-2 mb-3" placeholder="Name on Card" />
            </div>

            <button
              type="button"
              onClick={handelpalceholder}
              className="btn mt-3 bg-black text-white cursor-pointer GolosText text-xl px-6 py-3 rounded-md transition-all duration-150 w-full"
            >
              <i className="bi bi-cart3"></i> Pay now
            </button>
          </div>


      {/* Right */}
<div className="lg:col-span-4 sticky top-25 self-start">
  <div className="border rounded-2xl p-4">
    <span className="font-semibold">
      <i className="bi bi-cart3 mx-2 text-(--second) text-2xl"></i>
      Order Summary
    </span>

    {/* CART ITEMS */}
    <div className="mt-4 flex flex-col gap-3">
      {cartitem.length === 0 ? (
        <div className="p-3 border rounded-md text-gray-600">
          No items in cart
        </div>
      ) : (
        cartitem.map((item) => (
          <div
            key={item.id}
            className="border w-full px-4 py-3 rounded-md border-black"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-md border"
              />

              <div className="flex-1">
                <h2 className="GolosText text-lg">{item.title}</h2>

                <div className="flex justify-between items-center mt-1 text-sm text-gray-700">
                  <span className="font-medium">{item.price}</span>
                  <span className="font-medium">Qty: {item.qty}</span>
                </div>

                {item.off && (
                  <p className="text-xs mt-1 text-(--prim)">Off: {item.off}</p>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>

    <h2 className="mt-3 flex items-center gap-2 GolosText">
      <i className="bi bi-check2-circle text-2xl"></i>
      Total: <span className="font-semibold">${totalPrice.toFixed(2)}</span>
    </h2>

    <Link href="/Ui-components/Pages/Cheackout">
      <button
        type="button"
        onClick={handelpalceholder}
        className="btn border w-full border-black cursor-pointer hover:bg-black hover:text-white transition-all duration-300 GolosText text-xl px-6 py-3 rounded-md mt-4 bg-black text-white"
      >
        <i className="bi bi-balloon-heart"></i> Place Order
      </button>
    </Link>
    <Link href="/Ui-components/Pages/Cart">
      <button
        type="button"
        onClick={handelpalceholder}
        className="btn border w-full border-black cursor-pointer hover:bg-black hover:text-white transition-all duration-300 GolosText text-xl px-6 py-3 rounded-md mt-4 bg-black text-white"
      >
      Back to Cart
      </button>
    </Link>
  </div>
</div>


        </div>
      </div>
    </>
  );
}
