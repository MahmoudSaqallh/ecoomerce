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

export default function ProductDetailsPage() {
  const params = useParams();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeSize, setActiveSize] = useState("");
  const [activeColor, setActiveColor] = useState("");

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
        <Link href="/Ui-components/shop" className="text-gray-500">
          ← Back to Shop
        </Link>

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
            <p className="text-sm text-gray-500 mb-2">{product.categoryId}</p>

            <h1 className="text-5xl font-bold mb-4">{product.name}</h1>

            <h2 className="text-4xl font-semibold mb-6">${product.price}</h2>

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
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full bg-black text-white hover:bg-gray-800 transition-all"
              >
                +
              </button>
            </div>

            <button
              onClick={addToCart}
              className="bg-black text-white px-8 py-4 rounded-xl w-full hover:bg-(--second) transition-all"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={1500} />
    </>
  );
}