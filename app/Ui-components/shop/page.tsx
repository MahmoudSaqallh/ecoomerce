"use client";

import Link from "next/link";
import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Follower from "../Index/Follower/Follower";
import { useLanguage } from "@/app/i18n/LanguageContext";

type proudectType = {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  subcategoryId?: string;
  sizes: string[];
  colors: string[];
  stock: number;
  imageUrl: string;
};

function ShopInner() {
  const searchParams = useSearchParams();
  const { t, dir } = useLanguage();

  const [products, setProducts] = useState<proudectType[]>([]);
  const [categories, setCategories] = useState<
    Array<{
      id: string;
      name: string;
      nameAr?: string;
      active?: boolean;
    }>
  >([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<
    "featured" | "price-asc" | "price-desc" | "name-asc"
  >("featured");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedSize, setSelectedSize] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);

  function getCategoryLabel(categoryId: string) {
    const cat = categories.find((c) => c.id === categoryId);
    return cat?.nameAr || cat?.name || "";
  }

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setQuery(q);
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    async function load() {
      try {
        const { fetchItems, fetchCategories } = await import("../api/auth");
        const [itemsData, cats] = await Promise.all([
          fetchItems(),
          fetchCategories(),
        ]);
        setProducts(itemsData.items || []);
        setCategories(cats || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const filterCategories = useMemo(
    () => categories.filter((c) => c.active !== false),
    [categories]
  );

  const allSizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => (p.sizes || []).forEach((s) => set.add(String(s))));
    return Array.from(set);
  }, [products]);

  const allColors = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) =>
      (p.colors || []).forEach((c) => set.add(String(c)))
    );
    return Array.from(set);
  }, [products]);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const min = minPrice !== "" ? Number(minPrice) : null;
    const max = maxPrice !== "" ? Number(maxPrice) : null;

    let next = products.filter((p) => {
      const matchesCategory =
        selectedCategory === "all" ||
        String(p.categoryId || "") === selectedCategory;

      const catLabel = getCategoryLabel(String(p.categoryId || ""));

      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q) ||
        catLabel.toLowerCase().includes(q);

      const matchesSize =
        selectedSize === "all" ||
        (p.sizes || []).some((s) => String(s) === selectedSize);

      const matchesColor =
        selectedColor === "all" ||
        (p.colors || []).some((c) => String(c) === selectedColor);

      const matchesStock = !inStockOnly || p.stock > 0;
      const matchesMin = min == null || Number.isNaN(min) || p.price >= min;
      const matchesMax = max == null || Number.isNaN(max) || p.price <= max;

      return (
        matchesCategory &&
        matchesQuery &&
        matchesSize &&
        matchesColor &&
        matchesStock &&
        matchesMin &&
        matchesMax
      );
    });

    if (sortBy === "price-asc") next = [...next].sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc")
      next = [...next].sort((a, b) => b.price - a.price);
    else if (sortBy === "name-asc")
      next = [...next].sort((a, b) => a.name.localeCompare(b.name));

    return next;
  }, [
    products,
    query,
    selectedCategory,
    sortBy,
    categories,
    minPrice,
    maxPrice,
    selectedSize,
    selectedColor,
    inStockOnly,
  ]);

  const addwishlist = (
    proudect: proudectType
  ): void => {
    import("../api/session").then(
      ({ getWishlist, setWishlist, requireLoginForAction, redirectToLogin }) => {
        if (!requireLoginForAction()) {
          toast.info(t.common.pleaseLoginWishlist);
          redirectToLogin("/Ui-components/shop");
          return;
        }
        const wishlist = getWishlist();
        const existi = wishlist.find(
          (item: { id: string }) => item.id === proudect.id
        );

        if (existi) {
          toast.info(t.common.alreadyInWishlist);
          return;
        }

        wishlist.push({
          id: proudect.id,
          title: proudect.name,
          price: `$${proudect.price}`,
          image: proudect.imageUrl,
        });

        setWishlist(wishlist);
        toast.success(t.common.addedToWishlist);
      }
    );
  };

  const addtocart = (
    proudect: proudectType
  ): void => {
    import("../api/session").then(
      ({ getCart, setCart, requireLoginForAction, redirectToLogin }) => {
        if (!requireLoginForAction()) {
          toast.info(t.common.pleaseLoginCart);
          redirectToLogin("/Ui-components/shop");
          return;
        }
        const cart = getCart();
        const existi = cart.find(
          (item: { id: string }) => item.id === proudect.id
        );

        if (existi) {
          toast.info(t.common.alreadyInCart);
          return;
        }

        cart.push({
          id: proudect.id,
          title: proudect.name,
          price: `$${proudect.price}`,
          image: proudect.imageUrl,
          qty: 1,
        });

        setCart(cart);
        toast.success(t.common.addedToCart);
      }
    );
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
            {t.shop.title}
          </h2>

          <div className="flex mt-5 text-2xl items-center text-center">

            <Link
              href="/"
              className="hover:text-(--prim) text-white"
            >
              {t.shop.home}
            </Link>

            <i className="ri-arrow-right-wide-line pt-2 px-2 text-white i18n-flip"></i>

            <span className="text-white">
              {t.shop.title}
            </span>

          </div>

        </div>

      </div>

      {/* PRODUCTS */}
      <div className="px-[8%] lg:px-[16%] gap-5 py-10" dir={dir}>

        {/* Controls */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-end lg:justify-between">
            <div className="flex-1">
              <label className="block text-sm Lufga text-gray-600 mb-2">
                {t.shop.searchProducts}
              </label>
              <div className="flex items-center gap-3 border border-black/10 bg-white rounded-2xl px-4 py-3">
                <i className="ri-search-line text-2xl text-(--second)"></i>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.shop.searchPlaceholder}
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
                {t.shop.sort}
              </label>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as any)
                }
                className="w-full border border-black/10 bg-white rounded-2xl px-4 py-3 outline-none"
              >
                <option value="featured">{t.shop.featured}</option>
                <option value="price-asc">{t.shop.priceLowHigh}</option>
                <option value="price-desc">{t.shop.priceHighLow}</option>
                <option value="name-asc">{t.shop.nameAZ}</option>
              </select>
            </div>
          </div>

          {filterCategories.length > 0 && (
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
                <span className="Lufga font-medium">{t.common.all}</span>
              </button>
              {filterCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-black/10 hover:border-black/30"
                  }`}
                >
                  <span className="Lufga font-medium">
                    {cat.nameAr || cat.name}
                  </span>
                </button>
              ))}
            </div>
          )}

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div>
              <label className="block text-sm Lufga text-gray-600 mb-2">
                {t.shop.minPrice}
              </label>
              <input
                type="number"
                min={0}
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full border border-black/10 bg-white rounded-2xl px-4 py-3 outline-none"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm Lufga text-gray-600 mb-2">
                {t.shop.maxPrice}
              </label>
              <input
                type="number"
                min={0}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full border border-black/10 bg-white rounded-2xl px-4 py-3 outline-none"
                placeholder="999"
              />
            </div>
            <div>
              <label className="block text-sm Lufga text-gray-600 mb-2">
                {t.shop.size}
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full border border-black/10 bg-white rounded-2xl px-4 py-3 outline-none"
              >
                <option value="all">{t.shop.allSizes}</option>
                {allSizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm Lufga text-gray-600 mb-2">
                {t.shop.color}
              </label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full border border-black/10 bg-white rounded-2xl px-4 py-3 outline-none"
              >
                <option value="all">{t.shop.allColors}</option>
                {allColors.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 border border-black/10 bg-white rounded-2xl px-4 py-3 w-full cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                />
                <span className="Lufga text-sm">{t.shop.inStockOnly}</span>
              </label>
            </div>
          </div>

          <div className="mt-4 text-gray-500 Lufga">
            {t.shop.showing} {filteredProducts.length}{" "}
            {filteredProducts.length !== 1 ? t.shop.items : t.shop.item}.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {filteredProducts.length === 0 ? (
            <div className="md:col-span-2 lg:col-span-3 bg-white border border-black/10 rounded-3xl p-10 text-center">
              <p className="GolosText text-3xl font-bold mb-2">
                {t.shop.noResults}
              </p>
              <p className="text-gray-500 Lufga">
                {t.shop.tryChanging}
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
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/no-image.svg";
                        }}
                      />

                    ) : (

                      <div className="w-full h-[450px] flex items-center justify-center text-gray-500">
                        {t.shop.noImage}
                      </div>

                    )}

                  </div>

                  {/* ICONS */}
                  <div className="product-card-actions absolute top-11 end-5 flex flex-col gap-2">

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
                  <div className="product-card-details relative start-0 bottom-0 lg:absolute lg:bottom-[-20px] lg:start-10">

                    <Link
                      href={`/Ui-components/shop/${proudect.id}`}
                    >

                      <button className="btn bg-black text-white cursor-pointer GolosText text-xl px-6 py-3 rounded-2xl w-full lg:w-auto lg:rounded-full border-3 border-white">

                        {t.shop.viewDetails}

                      </button>

                    </Link>

                  </div>

                </div>

                {/* CONTENT */}
                <Link
                  href={`/Ui-components/shop/${proudect.id}`}
                  className="group block"
                >
                  <div className="prodect-content mt-5 md:mt-10 z-10 py-2">
                    <p className="text-sm text-gray-500 mb-2 Lufga">
                      {getCategoryLabel(String(proudect.categoryId || ""))}
                    </p>

                    <div className="flex items-start justify-between gap-3">
                      <h2 className="GolosText font-bold text-lg md:text-xl text-black line-clamp-2 tracking-tight pr-2">
                        {proudect.name}
                      </h2>
                      <h3 className="Lufga font-semibold text-xl text-(--second) shrink-0">
                        ${proudect.price}
                      </h3>
                    </div>
                    <span className="inline-block mt-2 Lufga text-sm text-gray-500 underline underline-offset-4 group-hover:text-black transition-colors">
                      {t.shop.details}
                    </span>
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
export default function Shop() {
  return (
    <Suspense
      fallback={
        <div className="px-[8%] lg:px-[16%] py-10 min-h-screen">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-black/5 p-4"
              >
                <div className="h-[450px] rounded-2xl bg-gray-100 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      }
    >
      <ShopInner />
    </Suspense>
  );
}
