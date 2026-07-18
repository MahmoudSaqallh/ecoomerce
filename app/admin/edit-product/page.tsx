"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  sizes?: string[];
  colors?: string[];
  stock: number;
  imageUrl?: string;
};

const CATEGORY_LABELS: Record<string, string> = {
  "cat-001": "Shirt",
  "cat-002": "Pants",
  "cat-003": "Jacket",
  "cat-004": "Jenz",
  "cat-005": "Jenz",
};

function EditProductContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    if (!productId) {
      router.replace("/admin/products");
      return;
    }

    async function loadProduct() {
      try {
        const response = await fetch("http://localhost:3001/api/items");
        const data = await response.json();

        const product = (data.items || []).find(
          (item: Product) => item.id === productId
        );

        if (!product) {
          toast.error("Product not found");
          router.replace("/admin/products");
          return;
        }

        setSelectedProduct(product);
        setForm({
          name: product.name || "",
          description: product.description || "",
          price: String(product.price || ""),
          stock: String(product.stock || ""),
        });
      } catch {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [productId, router]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login as admin first");
      return;
    }

    if (!selectedProduct) {
      toast.error("Product not loaded");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/items/${selectedProduct.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: form.name,
            description: form.description,
            price: Number(form.price),
            stock: Number(form.stock),
            categoryId: selectedProduct.categoryId,
            sizes: selectedProduct.sizes ?? [],
            colors: selectedProduct.colors ?? [],
            imageUrl: selectedProduct.imageUrl ?? "",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Update Failed");
      }

      const updatedProduct: Product = {
        ...selectedProduct,
        name: form.name,
        description: form.description,
        price: Number(form.price),
        stock: Number(form.stock),
      };

      setSelectedProduct(updatedProduct);
      toast.success("Product Updated Successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to update product");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f2ea] p-8 flex items-center justify-center">
        <p className="text-lg font-medium">Loading product...</p>
      </div>
    );
  }

  if (!selectedProduct) {
    return null;
  }

  const categoryLabel =
    CATEGORY_LABELS[selectedProduct.categoryId] || selectedProduct.categoryId;

  return (
    <div className="min-h-screen bg-[#f6f2ea] p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl border border-black">
        <h1 className="text-3xl font-bold mb-2">Edit Product</h1>

        <p className="text-gray-600 mb-6">
          Editing: <span className="font-semibold">{selectedProduct.name}</span>
        </p>

        {selectedProduct.imageUrl && (
          <img
            src={selectedProduct.imageUrl}
            alt={selectedProduct.name}
            className="w-full h-48 object-cover rounded-xl mb-4 border border-black"
          />
        )}

        <p className="mb-6 px-4 py-3 bg-[#f6f2ea] border border-black rounded-xl">
          Category: <span className="font-semibold">{categoryLabel}</span>
          <span className="text-gray-500 text-sm ml-2">
            ({selectedProduct.categoryId})
          </span>
        </p>

        <form onSubmit={handleUpdate} className="space-y-5">
          <input
            placeholder="Product Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="w-full px-4 py-3 border border-black rounded-xl"
          />

          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            className="w-full px-4 py-3 border border-black rounded-xl"
          />

          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({
                ...form,
                price: e.target.value,
              })
            }
            className="w-full px-4 py-3 border border-black rounded-xl"
          />

          <input
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) =>
              setForm({
                ...form,
                stock: e.target.value,
              })
            }
            className="w-full px-4 py-3 border border-black rounded-xl"
          />

          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-xl w-full cursor-pointer"
          >
            Update Product
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="bg-gray-700 text-white px-6 py-3 rounded-xl w-full cursor-pointer"
          >
            Back To Products
          </button>
        </form>
      </div>
    </div>
  );
}

export default function EditProductPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f6f2ea] p-8 flex items-center justify-center">
          <p className="text-lg font-medium">Loading...</p>
        </div>
      }
    >
      <EditProductContent />
    </Suspense>
  );
}
