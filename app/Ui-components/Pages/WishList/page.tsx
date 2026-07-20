"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import Follower from "../../Index/Follower/Page";

type ProductType = {
  id: string;
  title: string;
  price: string;
  image: string;
  off?: string;
  qty?: number;
};

export default function Wishlist() {
  const [wishList, setWishList] = useState<ProductType[]>([]);

  useEffect(() => {
    import("../../api/session").then(({ getWishlist }) => {
      setWishList(getWishlist());
    });
  }, []);

  const removeItem = (id: string): void => {
    const updated = wishList.filter((item) => item.id !== id);

    setWishList(updated);
    import("../../api/session").then(({ setWishlist }) => setWishlist(updated));

    toast.error("Removed From Wishlist");
  };

  const addtocart = (product: ProductType): void => {
    import("../../api/session").then(({ getCart, setCart }) => {
      const cart = getCart();
      const existi = cart.find((item: { id: string }) => item.id === product.id);

      if (existi) {
        toast.info("Already in cart");
        return;
      }

      cart.push({
        ...product,
        qty: 1,
      });

      setCart(cart);
      toast.success("Add to cart");
    });
  };

  return (
    <>
      <div className="page-section flex justify-center items-center text-center">
        <div className="z-10 flex flex-col justify-center items-center text-center">
          <h2 className="text-white text-8xl GolosText font-semibold">
            Wishlist
          </h2>

          <div className="flex mt-5 text-2xl items-center text-center">
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

            <span className="text-white">Wishlist</span>
          </div>
        </div>
      </div>

      <div className="px-[8%] lg:px-[20%] gap-5 py-10">
        {wishList.length === 0 ? (
          <p className="text-2xl text-(--second) GolosText border border-gray-400 px-5 py-2 rounded-2xl">
            Your Wishlist is Empty
          </p>
        ) : (
          <div className="flex flex-col gap-5">
            {wishList.map((product) => (
              <div
                key={product.id}
                className="flex flex-col lg:flex-row items-start md:items-center justify-between border-b border-gray-400 pb-8 gap-5"
              >
                <div className="flex items-center gap-5">
                  <img
                    src={product.image || "/no-image.svg"}
                    alt={product.title}
                    className="w-24 h-24 md:w-28 md:h-28 object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/no-image.svg";
                    }}
                  />
                </div>

                <div className="flex flex-col py-4 flex-1">
                  <h2 className="text-2xl font-semibold">
                    {product.title}
                  </h2>

                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-2xl font-bold">
                      {product.price}
                    </span>

                    {product.off && (
                      <span className="bg-black rounded-full text-white px-3 py-1">
                        {product.off}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-5 md:mt-0">
                  <p className="text-lg text-green-600 font-semibold">
                    In Stock
                  </p>
                </div>

                <div className="flex items-center gap-5 mt-5 md:mt-0">
                  <button
                    onClick={() => addtocart(product)}
                    className="px-6 py-3 bg-black text-white rounded-lg md:rounded-full cursor-pointer"
                  >
                    Add To Cart
                  </button>

                  <button
                    onClick={() => removeItem(product.id)}
                    className="px-6 py-3 border hover:bg-(--second) hover:border-transparent hover:text-white transition-all duration-300 rounded-lg md:rounded-full cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <Link href="/Ui-components/Pages/Cart">
              <button className="btn mt-3 bg-black text-white cursor-pointer GolosText text-xl px-6 py-3 rounded-md transition-all duration-150">
                <i className="bi bi-cart3"></i> View Cart
              </button>
            </Link>
          </div>
        )}
      </div>

      <Follower />

      <ToastContainer position="top-right" autoClose={1500} />
    </>
  );
}