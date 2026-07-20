"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Follower from "../Ui-components/Index/Follower/Page";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  discountPercent?: number;
  categoryId: string;
  sizes: string[];
  colors: string[];
  stock: number;
  imageUrl: string;
};

function discountBadge(p: Product) {
  if (p.discountPercent && p.discountPercent > 0) return p.discountPercent;
  if (p.compareAtPrice && p.compareAtPrice > p.price) {
    return Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100);
  }
  return 0;
}

export default function SalePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const { fetchItems, fetchCategories } = await import(
          "../Ui-components/api/auth"
        );
        const [itemsData, cats] = await Promise.all([
          fetchItems({ onSale: true }),
          fetchCategories(),
        ]);
        setProducts(itemsData.items || []);
        const map: Record<string, string> = {};
        for (const c of cats) {
          map[c.id] = c.name || c.nameAr || c.id;
        }
        setCategoryMap(map);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  const categories = useMemo(() => {
    const ids = new Set<string>();
    for (const p of products) {
      if (p.categoryId) ids.add(String(p.categoryId));
    }
    return Array.from(ids);
  }, [products]);

  const filtered = useMemo(() => {
    if (selectedCategory === "all") return products;
    return products.filter((p) => String(p.categoryId) === selectedCategory);
  }, [products, selectedCategory]);

  const addToCart = (product: Product) => {
    import("../Ui-components/api/session").then(({ getCart, setCart }) => {
      const cart = getCart();
      if (cart.find((item: { id: string }) => item.id === product.id)) {
        toast.info("Already in cart");
        return;
      }
      cart.push({
        id: product.id,
        title: product.name,
        price: `$${product.price}`,
        image: product.imageUrl,
        qty: 1,
      });
      setCart(cart);
      toast.success("Added to cart");
    });
  };

  return (
    <>
      <div className="page-section flex justify-center items-center text-center">
        <div className="z-10 flex flex-col justify-center items-center text-center">
          <h2 className="text-white text-6xl md:text-8xl GolosText font-semibold">
            Sale
          </h2>
          <div className="flex mt-5 text-xl md:text-2xl items-center text-center">
            <Link href="/" className="hover:text-(--prim) text-white">
              Home
            </Link>
            <i className="ri-arrow-right-wide-line pt-2 px-2 text-white"></i>
            <span className="text-(--prim)">Sale</span>
          </div>
        </div>
      </div>

      <div className="px-[8%] lg:px-[16%] py-10">
        <p className="Lufga text-gray-600 mb-6 text-center max-w-2xl mx-auto">
          Discover our best deals — hand-picked discounted styles from Fashi Que.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-10">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-xl border transition-all cursor-pointer ${
              selectedCategory === "all"
                ? "bg-black text-white border-black"
                : "bg-white text-black border-black/10 hover:border-black/30"
            }`}
          >
            All
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
              {categoryMap[catId] || catId}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-black/5 p-4"
              >
                <div className="h-[400px] rounded-2xl bg-gray-100 animate-pulse" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white border border-black/10 rounded-3xl p-12 text-center">
            <p className="GolosText text-3xl font-bold mb-2">No sale items yet</p>
            <p className="text-gray-500 Lufga mb-6">
              Check back soon for new discounts.
            </p>
            <Link
              href="/Ui-components/shop"
              className="btn bg-black text-white px-6 py-3 rounded-xl GolosText"
            >
              Browse Shop
            </Link>
          </div>
        ) : (
          <>
            <p className="text-gray-500 Lufga mb-6">
              {filtered.length} item{filtered.length !== 1 ? "s" : ""} on sale
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filtered.map((product) => {
                const pct = discountBadge(product);
                return (
                  <div key={product.id} className="proudect-card popular-product py-5">
                    <div className="proudect-image relative rounded-2xl">
                      <div className="overflow-hidden bg-gray-100 rounded-2xl relative">
                        {pct > 0 && (
                          <span className="absolute top-4 left-4 z-10 bg-(--second) text-white text-sm font-bold px-3 py-1 rounded-full">
                            -{pct}%
                          </span>
                        )}
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-[400px] object-cover rounded-2xl"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = "/no-image.svg";
                            }}
                          />
                        ) : (
                          <div className="w-full h-[400px] flex items-center justify-center text-gray-500">
                            No Image
                          </div>
                        )}
                      </div>
                      <div className="absolute top-4 right-4">
                        <i
                          onClick={() => addToCart(product)}
                          className="bi bi-cart3 produect-icon w-10 h-10 flex items-center justify-center text-white bg-black/40 cursor-pointer rounded-full"
                        ></i>
                      </div>
                    </div>
                    <Link
                      href={`/Ui-components/shop/${product.id}`}
                      className="group block mt-5"
                    >
                      <p className="text-sm text-gray-500 mb-1 Lufga">
                        {categoryMap[product.categoryId] || ""}
                      </p>
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="GolosText font-bold text-lg text-black line-clamp-2">
                          {product.name}
                        </h2>
                        <div className="text-right shrink-0">
                          <h3 className="Lufga font-semibold text-xl text-(--second)">
                            ${product.price}
                          </h3>
                          {product.compareAtPrice &&
                          product.compareAtPrice > product.price ? (
                            <p className="text-sm text-gray-400 line-through Lufga">
                              ${product.compareAtPrice}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      <Follower />
      <ToastContainer position="top-right" autoClose={1500} />
    </>
  );
}
