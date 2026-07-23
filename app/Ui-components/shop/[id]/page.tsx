"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ProductType = {
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

type CategoryType = {
  id: string;
  name: string;
  nameAr?: string;
};

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = useMemo(() => {
    const raw = params?.id;
    return Array.isArray(raw) ? raw[0] : raw;
  }, [params]);

  const [product, setProduct] = useState<ProductType | null>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeSize, setActiveSize] = useState("");
  const [activeColor, setActiveColor] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPrice = product ? product.price * quantity : 0;
  const isOutOfStock = product ? product.stock <= 0 : false;

  const categoryLabel = useMemo(() => {
    if (!product?.categoryId) return "";
    const cat = categories.find((c) => c.id === product.categoryId);
    return cat?.name || cat?.nameAr || product.categoryId;
  }, [categories, product]);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      setError("Invalid product");
      return;
    }

    let cancelled = false;

    async function getProduct() {
      setLoading(true);
      setError(null);
      try {
        const { fetchItemById, fetchCategories } = await import(
          "../../api/auth"
        );
        const [foundProduct, cats] = await Promise.all([
          fetchItemById(productId as string),
          fetchCategories().catch(() => []),
        ]);

        if (cancelled) return;

        if (!foundProduct) {
          setError("Product Not Found");
          setProduct(null);
          return;
        }

        setProduct(foundProduct);
        setCategories(cats || []);
        setActiveSize(foundProduct.sizes?.[0] || "");
        setActiveColor(foundProduct.colors?.[0] || "");
      } catch (err: unknown) {
        if (cancelled) return;
        const message =
          err instanceof Error ? err.message : "Failed to load product";
        setError(message);
        setProduct(null);
        toast.error(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    getProduct();
    return () => {
      cancelled = true;
    };
  }, [productId]);

  function addToCart() {
    if (!product) return;
    if (isOutOfStock) {
      toast.error("This product is out of stock");
      return;
    }

    import("../../api/session").then(
      ({ getCart, setCart, requireLoginForAction, redirectToLogin }) => {
        if (!requireLoginForAction()) {
          toast.info("Please login to add to cart");
          redirectToLogin(`/Ui-components/shop/${product.id}`);
          return;
        }
        const cart = getCart();
        const exists = cart.find(
          (item: { id: string }) => item.id === product.id
        );

        if (exists) {
          toast.info("Already in cart");
          return;
        }

        cart.push({
          id: product.id,
          title: product.name,
          price: `$${product.price}`,
          image: product.imageUrl,
          qty: quantity,
          size: activeSize,
          color: activeColor,
        });

        setCart(cart);
        toast.success("Added to cart");
      }
    );
  }

  function addToWishlist() {
    if (!product) return;

    import("../../api/session").then(
      ({ getWishlist, setWishlist, requireLoginForAction, redirectToLogin }) => {
        if (!requireLoginForAction()) {
          toast.info("Please login to use wishlist");
          redirectToLogin(`/Ui-components/shop/${product.id}`);
          return;
        }
        const wishlist = getWishlist();
        const exists = wishlist.find(
          (item: { id: string }) => item.id === product.id
        );
        if (exists) {
          const updated = wishlist.filter(
            (item: { id: string }) => item.id !== product.id
          );
          setWishlist(updated);
          setIsWishlisted(false);
          toast.info("Removed from wishlist");
          return;
        }

        wishlist.push({
          id: product.id,
          title: product.name,
          price: `$${product.price}`,
          image: product.imageUrl,
        });

        setWishlist(wishlist);
        setIsWishlisted(true);
        toast.success("Added to wishlist");
      }
    );
  }

  useEffect(() => {
    if (!product) return;
    import("../../api/session").then(({ getWishlist }) => {
      const wishlist = getWishlist();
      const exists = wishlist.find(
        (item: { id: string }) => item.id === product.id
      );
      setIsWishlisted(!!exists);
    });
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-4xl font-bold">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-4xl font-bold">Product Not Found</h1>
        {error ? <p className="text-gray-500">{error}</p> : null}
        <Link
          href="/Ui-components/shop"
          className="btn bg-black text-white px-6 py-3 rounded-xl"
        >
          Back to Shop
        </Link>
        <ToastContainer position="top-right" autoClose={1500} />
      </div>
    );
  }

  return (
    <>
      <div className="px-[8%] lg:px-[16%] py-12">
        <div className="text-sm text-gray-500 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-(--second)">
            Home
          </Link>
          <i className="ri-arrow-right-s-line"></i>
          <Link href="/Ui-components/shop" className="hover:text-(--second)">
            Shop
          </Link>
          <i className="ri-arrow-right-s-line"></i>
          <span className="text-black">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
          <div className="bg-gray-100 rounded-3xl overflow-hidden">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-150 object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/no-image.svg";
                }}
              />
            ) : (
              <div className="w-full h-150 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">{categoryLabel}</p>

            <h1 className="text-5xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
              <h2 className="text-4xl font-semibold">${product.price}</h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  isOutOfStock
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {isOutOfStock ? "Out of stock" : "In stock"}
              </span>
            </div>

            <p className="text-gray-600 text-lg leading-8 mb-6">
              {product.description}
            </p>

            {product.sizes?.length ? (
              <div className="mb-5">
                <h3 className="font-bold mb-2">Sizes</h3>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setActiveSize(size)}
                      className={`px-4 py-2 rounded-full border transition-all duration-300 cursor-pointer ${
                        activeSize === size
                          ? "bg-black text-white border-black"
                          : "bg-white text-black hover:bg-black hover:text-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {product.colors?.length ? (
              <div className="mb-5">
                <h3 className="font-bold mb-2">Colors</h3>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setActiveColor(color)}
                      className={`px-4 py-2 rounded-full border transition-all duration-300 cursor-pointer ${
                        activeColor === color
                          ? "bg-black text-white border-black"
                          : "bg-white text-black hover:bg-black hover:text-white"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <p className="mb-6 text-gray-700">Stock: {product.stock}</p>

            <div className="flex items-center gap-4 mb-6">
              <button
                type="button"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="w-10 h-10 rounded-full bg-black text-white hover:bg-gray-800 transition-all"
              >
                -
              </button>

              <span className="text-xl">{quantity}</span>

              <button
                type="button"
                onClick={() =>
                  setQuantity((prev) =>
                    product.stock > 0 ? Math.min(product.stock, prev + 1) : prev
                  )
                }
                className="w-10 h-10 rounded-full bg-black text-white hover:bg-gray-800 transition-all"
              >
                +
              </button>
            </div>

            <div className="bg-[#fff7e8] border border-black/10 rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-between text-gray-700">
                <span>Quantity</span>
                <span className="font-semibold">{quantity}</span>
              </div>
              <div className="flex items-center justify-between text-gray-700 mt-2">
                <span>Total</span>
                <span className="font-bold text-xl">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <button
                type="button"
                onClick={addToCart}
                disabled={isOutOfStock}
                className="bg-black text-white px-8 py-4 rounded-xl w-full hover:bg-(--second) transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add To Cart
              </button>
              <button
                type="button"
                onClick={addToWishlist}
                className={`border border-black px-5 py-4 rounded-xl transition-all ${
                  isWishlisted
                    ? "bg-red-500 text-white border-red-500"
                    : "hover:bg-black hover:text-white"
                }`}
                title="Add to wishlist"
              >
                <i
                  className={`bi ${isWishlisted ? "bi-heart-fill" : "bi-heart"}`}
                ></i>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="border border-black/10 rounded-xl p-3 text-center">
                <i className="bi bi-truck text-xl text-(--second)"></i>
                <p className="text-sm mt-1">Fast Shipping</p>
              </div>
              <div className="border border-black/10 rounded-xl p-3 text-center">
                <i className="bi bi-arrow-repeat text-xl text-(--second)"></i>
                <p className="text-sm mt-1">Easy Returns</p>
              </div>
              <div className="border border-black/10 rounded-xl p-3 text-center">
                <i className="bi bi-shield-check text-xl text-(--second)"></i>
                <p className="text-sm mt-1">Secure Checkout</p>
              </div>
            </div>

            <div className="mt-6 border border-black/10 rounded-2xl p-4 bg-[#fffaf3]">
              <p className="font-semibold Lufga mb-1">Size guide</p>
              <p className="text-sm text-gray-600">
                S (36–38) · M (40–42) · L (44–46) · XL (48). Measure bust/waist
                and pick the closest size. Still unsure? Contact us before
                ordering.
              </p>
            </div>
          </div>
        </div>

        <ProductExtras product={product} />
      </div>

      <ToastContainer position="top-right" autoClose={1500} />
    </>
  );
}

function ProductExtras({ product }: { product: ProductType }) {
  const [related, setRelated] = useState<ProductType[]>([]);
  const [reviews, setReviews] = useState<
    Array<{
      id: string;
      customerName: string;
      rating: number;
      comment: string;
      createdAt: string;
    }>
  >([]);
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const { fetchItems, fetchItemReviews } = await import("../../api/auth");
        const [itemsData, reviewData] = await Promise.all([
          fetchItems({ category: product.categoryId || undefined, limit: 8 }),
          fetchItemReviews(product.id),
        ]);
        if (cancelled) return;
        setRelated(
          (itemsData.items || [])
            .filter((p: ProductType) => p.id !== product.id)
            .slice(0, 4)
        );
        setReviews(reviewData.reviews || []);
        setAverage(reviewData.average || 0);
        setCount(reviewData.count || 0);
      } catch {
        // ignore
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [product.id, product.categoryId]);

  async function handleReview(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    try {
      const { submitReview, fetchItemReviews } = await import("../../api/auth");
      await submitReview({
        itemId: product.id,
        rating,
        comment: comment.trim(),
      });
      toast.success("Review submitted");
      setComment("");
      const reviewData = await fetchItemReviews(product.id);
      setReviews(reviewData.reviews || []);
      setAverage(reviewData.average || 0);
      setCount(reviewData.count || 0);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to review");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mt-16 space-y-12">
      <section>
        <div className="flex items-end justify-between gap-3 mb-6 flex-wrap">
          <div>
            <h3 className="GolosText text-3xl font-bold">Reviews</h3>
            <p className="text-gray-500 Lufga mt-1">
              {count > 0
                ? `${average} / 5 · ${count} review${count === 1 ? "" : "s"}`
                : "No reviews yet — be the first"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            {reviews.length === 0 ? (
              <p className="text-gray-500">No reviews for this product.</p>
            ) : (
              reviews.map((r) => (
                <div
                  key={r.id}
                  className="rounded-2xl border border-black/10 bg-white p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold">{r.customerName}</p>
                    <p className="text-sm text-(--second)">
                      {"★".repeat(r.rating)}
                      {"☆".repeat(5 - r.rating)}
                    </p>
                  </div>
                  {r.comment ? (
                    <p className="text-gray-600 mt-2 whitespace-pre-wrap">
                      {r.comment}
                    </p>
                  ) : null}
                </div>
              ))
            )}
          </div>

          <form
            onSubmit={handleReview}
            className="rounded-2xl border border-black/10 bg-white p-5 space-y-3"
          >
            <p className="font-semibold GolosText text-xl">Write a review</p>
            <p className="text-sm text-gray-500">Login required</p>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-xl px-3 py-2"
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} stars
                </option>
              ))}
            </select>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="Share your experience..."
              className="w-full border border-gray-300 rounded-xl px-3 py-2"
            />
            <button
              type="submit"
              disabled={sending}
              className="btn bg-black text-white px-5 py-2.5 rounded-xl disabled:opacity-60"
            >
              {sending ? "Sending..." : "Submit review"}
            </button>
          </form>
        </div>
      </section>

      {related.length > 0 ? (
        <section>
          <h3 className="GolosText text-3xl font-bold mb-6">You may also like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/Ui-components/shop/${item.id}`}
                className="group rounded-2xl border border-black/10 bg-white p-3 hover:border-black/30 transition"
              >
                <div className="relative h-56 rounded-xl overflow-hidden bg-gray-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl || "/no-image.svg"}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-4 px-1 space-y-1">
                  <p className="GolosText text-lg font-bold text-black line-clamp-1 tracking-tight">
                    {item.name}
                  </p>
                  <div className="flex items-center justify-between gap-3">
                    <p className="Lufga text-base font-semibold text-(--second)">
                      ${item.price}
                    </p>
                    <span className="Lufga text-sm text-gray-500 underline underline-offset-4 group-hover:text-black transition-colors">
                      Details
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
