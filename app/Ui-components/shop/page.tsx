"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Follower from "../Index/Follower/Page";

type proudectType = {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  sizes: string[];
  colors: string[];
  stock: number;
  imageUrl: string;
};

export default function Shop() {

  const [products, setProducts] =
    useState<proudectType[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function fetchProducts() {

      try {

        const response = await fetch(
          "http://localhost:3001/api/items"
        );

        const data = await response.json();

        setProducts(data.items);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    }

    fetchProducts();

  }, []);

  const addwishlist = (
    proudect: proudectType
  ): void => {

    const stored =
      localStorage.getItem("wishlist");

    let wishlist: any[] =
      stored ? JSON.parse(stored) : [];

    const existi = wishlist.find(
      (item) => item.id === proudect.id
    );

    if (existi) {

      toast.info("Already in Wishlist");

      return;
    }

    wishlist.push({
      id: proudect.id,
      title: proudect.name,
      price: `$${proudect.price}`,
      image: proudect.imageUrl,
    });

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );

    toast.success("Add to Wishlist");
  };

  const addtocart = (
    proudect: proudectType
  ): void => {

    const stored =
      localStorage.getItem("cart");

    let cart: any[] =
      stored ? JSON.parse(stored) : [];

    const existi = cart.find(
      (item) => item.id === proudect.id
    );

    if (existi) {

      toast.info("Already in cart");

      return;
    }

    cart.push({
      id: proudect.id,
      title: proudect.name,
      price: `$${proudect.price}`,
      image: proudect.imageUrl,
      qty: 1,
    });

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    toast.success("Add to cart");
  };

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center text-4xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <>
      {/* TITLE */}
      <div className="page-section flex justify-center items-center text-center">

        <div className="z-10 flex flex-col justify-center items-center text-center">

          <h2 className="text-white text-8xl GolosText font-semibold">
            Shop
          </h2>

          <div className="flex mt-5 text-2xl items-center text-center">

            <Link
              href="/"
              className="hover:text-(--prim) text-white"
            >
              Home
            </Link>

            <i className="ri-arrow-right-wide-line pt-2 px-2 text-white"></i>

            <span className="text-white">
              Shop
            </span>

          </div>

        </div>

      </div>

      {/* PRODUCTS */}
      <div className="px-[8%] lg:px-[16%] gap-5 py-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {products.map((proudect) => (

            <div key={proudect.id}>

              <div className="proudect-card popular-product cursor-pointer py-5">

                {/* IMAGE */}
                <div className="proudect-image relative rounded-2xl">

                  <div className="overflow-hidden bg-gray-100 rounded-2xl">

                    {proudect.imageUrl ? (

                      <img
                        src={proudect.imageUrl}
                        alt={proudect.name}
                        className="w-full h-[450px] object-cover rounded-2xl"
                        onError={(e) => {
                          e.currentTarget.src =
                            "/no-image.png";
                        }}
                      />

                    ) : (

                      <div className="w-full h-[450px] flex items-center justify-center text-gray-500">
                        No Image
                      </div>

                    )}

                  </div>

                  {/* ICONS */}
                  <div className="absolute top-11 right-5 flex flex-col gap-2">

                    <i
                      onClick={() =>
                        addwishlist(proudect)
                      }
                      className="bi bi-balloon-heart produect-icon w-10 h-10 flex items-center justify-center text-white bg-black/40 cursor-pointer rounded-full"
                    ></i>

                    <i
                      onClick={() =>
                        addtocart(proudect)
                      }
                      className="bi bi-cart3 produect-icon w-10 h-10 flex items-center justify-center text-white bg-black/40 cursor-pointer rounded-full"
                    ></i>

                  </div>

                  {/* DETAILS BUTTON */}
                  <div className="relative left-0 bottom-0 lg:absolute lg:bottom-[-20px] lg:left-10">

                    <Link
                      href={`/Ui-components/shop/${proudect.id}`}
                    >

                      <button className="btn bg-black text-white cursor-pointer GolosText text-xl px-6 py-3 rounded-2xl w-full lg:w-auto lg:rounded-full border-3 border-white">

                        View Details

                      </button>

                    </Link>

                  </div>

                </div>

                {/* CONTENT */}
                <Link
                  href={`/Ui-components/shop/${proudect.id}`}
                >

                  <div className="prodect-content mt-5 md:mt-10 z-10 py-2">

                    <div className="flex justify-between">

                      <h2 className="Lufga font-medium text-[18px] pr-5">
                        {proudect.name}
                      </h2>

                      <h3 className="GolosText font-semibold text-2xl">
                        ${proudect.price}
                      </h3>

                    </div>

                  </div>

                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

      <Follower />

      <ToastContainer
        position="top-right"
        autoClose={1500}
      />
    </>
  );
}