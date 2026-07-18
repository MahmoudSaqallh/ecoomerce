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

const CATEGORY_LABELS: Record<string, string> = {
  "cat-001": "Shirt",
  "cat-002": "Pants",
  "cat-003": "Jacket",
  "cat-004": "Jenz",
  "cat-005": "Jenz",
  shirt: "Shirt",
  pants: "Pants",
  jeans: "Jenz",
  jenz: "Jenz",
  jacket: "Jacket",
};

function getCategoryLabel(categoryId: string) {
  const key = String(categoryId || "").toLowerCase().trim();
  return CATEGORY_LABELS[key] || String(categoryId);
}

export default function Shop() {

  const [products, setProducts] =
    useState<proudectType[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<string>("all");
  const [sortBy, setSortBy] = useState<
    "featured" | "price-asc" | "price-desc" | "name-asc"
  >("featured");

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

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const p of products) {
      if (p.categoryId) set.add(String(p.categoryId));
    }
    return Array.from(set);
  }, [products]);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();

    let next = products.filter((p) => {
      const matchesCategory =
        selectedCategory === "all" ||
        String(p.categoryId) === selectedCategory;

      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        getCategoryLabel(p.categoryId).toLowerCase().includes(q) ||
        String(p.categoryId).toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });

    if (sortBy === "price-asc") {
      next = next.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      next = next.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-asc") {
      next = next.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return next;
  }, [products, query, selectedCategory, sortBy]);

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
      <div className="px-[8%] lg:px-[16%] py-10 min-h-screen">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="w-full h-12 bg-gray-100 border border-gray-200 rounded-2xl animate-pulse" />
          <div className="w-56 h-12 bg-gray-100 border border-gray-200 rounded-2xl animate-pulse hidden md:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-black/5 p-4"
            >
              <div className="h-[450px] rounded-2xl bg-gray-100 animate-pulse" />
              <div className="mt-4 h-6 bg-gray-100 rounded animate-pulse" />
              <div className="mt-3 h-4 bg-gray-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
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

        {/* Controls */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-end lg:justify-between">
            <div className="flex-1">
              <label className="block text-sm Lufga text-gray-600 mb-2">
                Search products
              </label>
              <div className="flex items-center gap-3 border border-black/10 bg-white rounded-2xl px-4 py-3">
                <i className="ri-search-line text-2xl text-(--second)"></i>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, description, or category..."
                  className="w-full outline-none text-base bg-transparent"
                />
                {query.trim() && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="text-gray-500 hover:text-black transition-colors"
                  >
                    <i className="ri-close-circle-fill text-2xl"></i>
                  </button>
                )}
              </div>
            </div>

            <div className="w-full lg:w-72">
              <label className="block text-sm Lufga text-gray-600 mb-2">
                Sort
              </label>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as any)
                }
                className="w-full border border-black/10 bg-white rounded-2xl px-4 py-3 outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="name-asc">Name: A → Z</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-black/10 hover:border-black/30"
              }`}
            >
              <span className="Lufga font-medium">All</span>
            </button>

            {categories.map((catId) => (
              <button
                key={catId}
                type="button"
                onClick={() => setSelectedCategory(catId)}
                className={`px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                  selectedCategory === catId
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-black/10 hover:border-black/30"
                }`}
              >
                <span className="Lufga font-medium">
                  {getCategoryLabel(catId)}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-4 text-gray-500 Lufga">
            Showing {filteredProducts.length} item
            {filteredProducts.length !== 1 ? "s" : ""}.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {filteredProducts.length === 0 ? (
            <div className="md:col-span-2 lg:col-span-3 bg-white border border-black/10 rounded-3xl p-10 text-center">
              <p className="GolosText text-3xl font-bold mb-2">
                No results
              </p>
              <p className="text-gray-500 Lufga">
                Try changing search or category filter.
              </p>
            </div>
          ) : (
            filteredProducts.map((proudect) => (

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
                    <p className="text-sm text-gray-500 mb-2 Lufga">
                      {getCategoryLabel(proudect.categoryId)}
                    </p>

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

            ))
          )}

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