"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
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

const CATEGORY_LABELS: Record<string, string> = {
  "cat-001": "Shirt",
  "cat-002": "Pants",
  "cat-003": "Jacket",
  "cat-004": "Jenz",
  "cat-005": "Jenz",
  shirt: "Shirt",
  pants: "Pants",
  jacket: "Jacket",
  jeans: "Jenz",
  jenz: "Jenz",
};

function getCategoryLabel(categoryId: string) {
  const key = String(categoryId || "").toLowerCase().trim();
  return CATEGORY_LABELS[key] || String(categoryId);
}

export default function ProductDetailsPage() {
  const params = useParams();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeSize, setActiveSize] = useState("");
  const [activeColor, setActiveColor] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);

  const totalPrice = product ? product.price * quantity : 0;
  const isOutOfStock = product ? product.stock <= 0 : false;

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await fetch("http://localhost:3001/api/items");
        const data = await response.json();

        const foundProduct = data.items.find(
          (item: ProductType) => item.id === params.id
        );

        if (!foundProduct) {
          toast.error("Product Not Found");
          return;
        }

        setProduct(foundProduct);
        setActiveSize(foundProduct.sizes?.[0] || "");
        setActiveColor(foundProduct.colors?.[0] || "");
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    getProduct();
  }, [params.id]);

  function addToCart() {
    if (!product) return;
    if (isOutOfStock) {
      toast.error("This product is out of stock");
      return;
    }

    const stored = localStorage.getItem("cart");
    const cart = stored ? JSON.parse(stored) : [];

    const exists = cart.find((item: any) => item.id === product.id);

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

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Added to cart");
  }

  function addToWishlist() {
    if (!product) return;

    const stored = localStorage.getItem("wishlist");
    const wishlist = stored ? JSON.parse(stored) : [];

    const exists = wishlist.find((item: any) => item.id === product.id);
    if (exists) {
      const updated = wishlist.filter((item: any) => item.id !== product.id);
      localStorage.setItem("wishlist", JSON.stringify(updated));
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

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    setIsWishlisted(true);
    toast.success("Added to wishlist");
  }

  useEffect(() => {
    if (!product) return;
    const stored = localStorage.getItem("wishlist");
    const wishlist = stored ? JSON.parse(stored) : [];
    const exists = wishlist.find((item: any) => item.id === product.id);
    setIsWishlisted(!!exists);
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
      <div className="min-h-screen flex items-center justify-center text-4xl font-bold">
        Product Not Found
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
                  e.currentTarget.src = "/no-image.png";
                }}
              />
            ) : (
              <div className="w-full h-150 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">
              {getCategoryLabel(product.categoryId)}
            </p>

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

            <div className="mb-5">
              <h3 className="font-bold mb-2">Sizes</h3>

              <div className="flex gap-2 flex-wrap">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
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

            <div className="mb-5">
              <h3 className="font-bold mb-2">Colors</h3>

              <div className="flex gap-2 flex-wrap">
                {product.colors?.map((color) => (
                  <button
                    key={color}
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

            <p className="mb-6 text-gray-700">Stock: {product.stock}</p>

            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="w-10 h-10 rounded-full bg-black text-white hover:bg-gray-800 transition-all"
              >
                -
              </button>

              <span className="text-xl">{quantity}</span>

              <button
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
                <span className="font-bold text-xl">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={addToCart}
                disabled={isOutOfStock}
                className="bg-black text-white px-8 py-4 rounded-xl w-full hover:bg-(--second) transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add To Cart
              </button>
              <button
                onClick={addToWishlist}
                className={`border border-black px-5 py-4 rounded-xl transition-all ${
                  isWishlisted
                    ? "bg-red-500 text-white border-red-500"
                    : "hover:bg-black hover:text-white"
                }`}
                title="Add to wishlist"
              >
                <i className={`bi ${isWishlisted ? "bi-heart-fill" : "bi-heart"}`}></i>
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
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={1500} />
    </>
  );
}